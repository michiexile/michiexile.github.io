import base64
from datetime import datetime, timezone
from html.parser import HTMLParser
from http.client import IncompleteRead
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError

from scripts.build import BuildError, GitHub, build_site, discover_projects, domain_url, main


def repository(name="demo", **changes):
    result = {
        "name": name,
        "full_name": f"octocat/{name}",
        "owner": {"login": "octocat"},
        "html_url": f"https://github.com/octocat/{name}",
        "default_branch": "main",
        "has_pages": True,
        "private": False,
        "description": "A useful project.",
        "language": "JavaScript",
        "topics": ["math"],
        "pushed_at": "2026-11-01T12:00:00Z",
        "fork": False,
        "archived": False,
    }
    return result | changes


def cname_file(domain):
    return {"encoding": "base64", "content": base64.b64encode(domain.encode()).decode()}


class GitHubTests(unittest.TestCase):
    def test_follows_all_repository_pages(self):
        github = GitHub()
        second_page = "https://api.github.com/users/octocat/repos?page=2"
        with patch.object(github, "get", side_effect=[
            ([repository("first")], {"Link": f'<{second_page}>; rel="next", <{second_page}>; rel="last"'}),
            ([repository("last")], {}),
        ]) as get:
            self.assertEqual([repo["name"] for repo in github.repositories("octocat")], ["first", "last"])
            self.assertEqual(get.call_args_list[1].args, (second_page,))

    def test_reads_cname_on_published_branch(self):
        github = GitHub()
        with patch.object(github, "get", return_value=(cname_file("tools.example.org\n"), {})) as get:
            self.assertEqual(github.cname(repository()), "https://tools.example.org/")
            self.assertIn("ref=gh-pages", get.call_args.args[0])

    def test_checks_default_branch_and_docs_when_gh_pages_is_absent(self):
        github = GitHub()
        with patch.object(github, "get", side_effect=[
            (None, {}), (None, {}), (cname_file("docs.example.org"), {}),
        ]) as get:
            self.assertEqual(github.cname(repository(default_branch="release/site")), "https://docs.example.org/")
            self.assertIn("/contents/CNAME?ref=release%2Fsite", get.call_args_list[1].args[0])
            self.assertIn("/contents/docs/CNAME?ref=release%2Fsite", get.call_args_list[2].args[0])

    def test_missing_cname_is_normal(self):
        github = GitHub()
        with patch.object(github, "get", return_value=(None, {})):
            self.assertIsNone(github.cname(repository()))

    def test_does_not_repeat_locations_when_default_is_gh_pages(self):
        github = GitHub()
        with patch.object(github, "get", return_value=(None, {})) as get:
            github.cname(repository(default_branch="gh-pages"))
            self.assertEqual(get.call_count, 2)

    def test_api_authentication_errors_and_rate_limits_fail_the_build(self):
        github = GitHub("secret-token")
        for code in (401, 403, 429, 500, 503):
            with self.subTest(code=code):
                error = HTTPError("https://api.github.com/test", code, "failure", {}, None)
                with patch("scripts.build.urlopen", side_effect=error):
                    with self.assertRaises(BuildError) as result:
                        github.get("/test", allow_missing=True)
                    self.assertIn(f"HTTP {code}", str(result.exception))
                    self.assertNotIn("secret-token", str(result.exception))

    def test_only_optional_404s_are_ignored(self):
        error = HTTPError("https://api.github.com/test", 404, "missing", {}, None)
        with patch("scripts.build.urlopen", side_effect=error):
            self.assertIsNone(GitHub().get("/test", allow_missing=True)[0])
            with self.assertRaises(BuildError):
                GitHub().get("/test")

    def test_network_and_malformed_json_errors_fail_the_build(self):
        with patch("scripts.build.urlopen", side_effect=URLError("unreachable")), patch("scripts.build.sleep"):
            with self.assertRaises(BuildError):
                GitHub().get("/test")
        response = io.BytesIO(b"this is not JSON")
        response.headers = {}
        with patch("scripts.build.urlopen", return_value=response):
            with self.assertRaises(BuildError):
                GitHub().get("/test")

    def test_retries_truncated_responses_but_fails_if_they_persist(self):
        response = io.BytesIO(b'{"ok": true}')
        response.headers = {}
        with patch("scripts.build.urlopen", side_effect=[IncompleteRead(b"partial"), response]), patch("scripts.build.sleep"):
            self.assertEqual(GitHub().get("/test")[0], {"ok": True})
        with patch("scripts.build.urlopen", side_effect=IncompleteRead(b"partial")), patch("scripts.build.sleep"):
            with self.assertRaises(BuildError):
                GitHub().get("/test")

    def test_refuses_to_send_token_to_pagination_on_another_host(self):
        with patch("scripts.build.urlopen") as opener:
            with self.assertRaises(BuildError):
                GitHub("secret-token").get("https://other.example.org/repos")
            opener.assert_not_called()

    def test_malformed_cname_api_response_fails_the_build(self):
        github = GitHub()
        for content in ({"type": "dir"}, {"encoding": "base64", "content": "%%%"}):
            with self.subTest(content=content):
                with patch.object(github, "get", return_value=(content, {})):
                    with self.assertRaises(BuildError):
                        github.cname(repository())

    def test_invalid_or_multiline_cname_warns_and_uses_the_standard_url(self):
        github = GitHub()
        for domain in ("https://example.org/path", "example.org\nwww.example.org"):
            with self.subTest(domain=domain):
                with patch.object(github, "get", side_effect=[(cname_file(domain), {}), (None, {}), (None, {})]):
                    with patch("sys.stderr", new_callable=io.StringIO) as warnings:
                        self.assertIsNone(github.cname(repository()))
                        self.assertIn("Warning:", warnings.getvalue())


class DiscoveryTests(unittest.TestCase):
    def discover(self, repositories, domains=None, overrides=None):
        github = GitHub()
        domains = domains or {}
        with patch.object(github, "repositories", return_value=repositories):
            with patch.object(github, "cname", side_effect=lambda repo: domains.get(repo["name"])) as cname:
                projects = discover_projects(github, {"owner": "octocat", "url_overrides": overrides or {}})
                return projects, cname

    def test_includes_original_pages_projects_and_excludes_forks(self):
        projects, cname = self.discover([
            repository("zulu", fork=True),
            repository("Alpha", archived=True),
            repository("not-published", has_pages=False),
            repository("private", private=True),
            repository("someone-elses", owner={"login": "someone"}),
        ])
        self.assertEqual([project["name"] for project in projects], ["Alpha"])
        self.assertEqual(cname.call_count, 1)
        self.assertEqual(projects[0]["url"], "https://octocat.github.io/Alpha/")

    def test_custom_domain_and_root_user_site_urls(self):
        projects, _ = self.discover(
            [repository("demo"), repository("octocat.github.io")],
            {"demo": "https://tools.example.org/"},
        )
        self.assertEqual([project["url"] for project in projects], ["https://tools.example.org/", "https://octocat.github.io/"])

    def test_project_inherits_user_site_domain_unless_it_has_its_own(self):
        projects, _ = self.discover(
            [repository("one"), repository("two"), repository("octocat.github.io")],
            {"octocat.github.io": "https://example.org/", "two": "https://two.example.org/"},
        )
        urls = {project["name"]: project["url"] for project in projects}
        self.assertEqual(urls["one"], "https://example.org/one/")
        self.assertEqual(urls["two"], "https://two.example.org/")
        self.assertEqual(urls["octocat.github.io"], "https://example.org/")

    def test_does_not_read_cname_or_publish_links_for_forks(self):
        projects, cname = self.discover([repository(fork=True)])
        self.assertEqual(projects, [])
        cname.assert_not_called()

    def test_does_not_treat_arbitrary_homepages_as_the_published_url(self):
        projects, _ = self.discover([repository(homepage="https://other.example.org/")])
        self.assertEqual(projects[0]["url"], "https://octocat.github.io/demo/")

    def test_url_override_for_custom_workflow_deployments(self):
        projects, _ = self.discover([repository()], overrides={"demo": "https://example.org/app/"})
        self.assertEqual(projects[0]["url"], "https://example.org/app/")
        with self.assertRaises(BuildError):
            self.discover([repository()], overrides={"demo": "javascript:alert(1)"})

    def test_api_failure_aborts_discovery(self):
        github = GitHub()
        with patch.object(github, "repositories", return_value=[repository("one"), repository("two")]):
            with patch.object(github, "cname", side_effect=[None, BuildError("rate limit")]):
                with self.assertRaises(BuildError):
                    discover_projects(github, {"owner": "octocat"})

    def test_failed_scan_leaves_previous_output_untouched(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            (output / "index.html").write_text("previous successful build")
            config = output / "config.json"
            config.write_text(json.dumps({"owner": "octocat"}))
            argv = ["build.py", "--config", str(config), "--output", str(output)]
            with patch("sys.argv", argv), patch("sys.stderr", new_callable=io.StringIO):
                with patch.object(GitHub, "repositories", side_effect=BuildError("rate limit")):
                    self.assertEqual(main(), 1)
            self.assertEqual((output / "index.html").read_text(), "previous successful build")
            self.assertFalse((output / "projects.json").exists())


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []

    def handle_starttag(self, tag, attributes):
        self.elements.append((tag, dict(attributes)))


class RenderingTests(unittest.TestCase):
    def test_renders_static_links_escaped_metadata_and_json(self):
        github = GitHub()
        with patch.object(github, "repositories", return_value=[repository(description='<script>alert("bad")</script> & more')]):
            with patch.object(github, "cname", return_value=None):
                projects = discover_projects(github, {"owner": "octocat"})
        config = {"owner": "octocat", "name": 'Someone & "Friends"'}
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            build_site(config, projects, output, now=datetime(2026, 11, 8, 9, 23, tzinfo=timezone.utc))
            html = (output / "index.html").read_text()
            parser = PageParser()
            parser.feed(html)
            self.assertIn("https://octocat.github.io/demo/", [attrs.get("href") for tag, attrs in parser.elements if tag == "a"])
            self.assertNotIn('<script>alert("bad")</script>', html)
            self.assertIn("&lt;script&gt;", html)
            self.assertIn("Someone &amp; &quot;Friends&quot;", html)
            self.assertIn("1 project on GitHub Pages", html)
            self.assertEqual(json.loads((output / "projects.json").read_text())["projects"], projects)
            for filename in (".nojekyll", "assets/style.css", "assets/directory.js", "assets/favicon.svg"):
                self.assertTrue((output / filename).exists(), filename)

    def test_empty_directory_is_a_valid_static_page(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            build_site({"owner": "octocat"}, [], output)
            parser = PageParser()
            parser.feed((output / "index.html").read_text())
            state = next(attrs for _, attrs in parser.elements if attrs.get("id") == "empty-state")
            self.assertNotIn("hidden", state)

    def test_rejects_cname_paths_schemes_credentials_and_bad_hostnames(self):
        for domain in ("https://example.org", "example.org/path", "example.org:443", "user@example.org", "one\ntwo.org", "-bad.example", "example..org"):
            with self.subTest(domain=domain):
                with self.assertRaises(BuildError):
                    domain_url(domain)
        self.assertEqual(domain_url("Tools.Example.org"), "https://tools.example.org/")


if __name__ == "__main__":
    unittest.main()
