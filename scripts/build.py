#!/usr/bin/env python3
"""Build a static directory of public repositories with GitHub Pages enabled."""

import argparse
import base64
import binascii
from datetime import datetime, timezone
from html import escape
from http.client import HTTPException
import json
import os
from pathlib import Path
import re
import shutil
from string import Template
import sys
from time import sleep
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urlsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
API = "https://api.github.com"
API_VERSION = "2026-03-10"


class BuildError(Exception):
    """An incomplete or invalid scan must never become a deployment."""


class GitHub:
    def __init__(self, token=None):
        self.token = token

    def get(self, path, *, allow_missing=False):
        url = path if path.startswith("https://") else API + path
        # Pagination URLs come from GitHub. Never send a credential elsewhere.
        if urlsplit(url).netloc != "api.github.com":
            raise BuildError("Refusing a GitHub API URL on another host.")
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": API_VERSION,
            "User-Agent": "github-pages-project-directory",
        }
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        for attempt in range(3):
            try:
                with urlopen(Request(url, headers=headers), timeout=30) as response:
                    return json.load(response), response.headers
            except HTTPError as error:
                error.close()
                if error.code == 404 and allow_missing:
                    return None, error.headers
                hint = ""
                if error.code in (403, 429):
                    hint = " Check token permissions and the GitHub API rate limit."
                raise BuildError(f"GitHub API returned HTTP {error.code} for {url}.{hint}") from error
            except (URLError, TimeoutError, HTTPException) as error:
                # A disconnected or truncated response is safe to retry for a GET.
                if attempt == 2:
                    raise BuildError(f"Could not read GitHub API response from {url}: {error}") from error
                sleep(2 ** attempt)
            except ValueError as error:
                raise BuildError(f"Invalid JSON response from {url}: {error}") from error

    def repositories(self, owner):
        path = f"/users/{quote(owner, safe='')}/repos?" + urlencode(
            {"type": "owner", "sort": "full_name", "per_page": 100}
        )
        repositories = []
        while path:
            page, headers = self.get(path)
            if not isinstance(page, list):
                raise BuildError("GitHub did not return a repository list.")
            repositories.extend(page)
            match = re.search(r'<([^>]+)>;\s*rel="next"', headers.get("Link", ""))
            path = match.group(1) if match else None
        return repositories

    def cname(self, repository):
        """Read common Pages publishing locations without requiring Pages API access."""
        owner = quote(repository["owner"]["login"], safe="")
        name = quote(repository["name"], safe="")
        default_branch = repository["default_branch"]
        locations = [("gh-pages", "CNAME"), (default_branch, "CNAME"), (default_branch, "docs/CNAME")]
        for branch, path in dict.fromkeys(locations):
            query = urlencode({"ref": branch})
            content, _ = self.get(f"/repos/{owner}/{name}/contents/{path}?{query}", allow_missing=True)
            if content is None:
                continue
            if not isinstance(content, dict) or content.get("encoding") != "base64":
                raise BuildError(f"Cannot read CNAME in {repository['full_name']} ({branch}/{path}).")
            try:
                encoded = "".join(content["content"].split())
                domain = base64.b64decode(encoded, validate=True).decode("utf-8").strip()
            except (KeyError, ValueError, UnicodeError, binascii.Error) as error:
                raise BuildError(f"Invalid CNAME in {repository['full_name']}.") from error
            if not domain:
                continue
            try:
                return domain_url(domain)
            except BuildError:
                print(
                    f"Warning: ignoring invalid CNAME in {repository['full_name']} ({branch}/{path}); expected one hostname.",
                    file=sys.stderr,
                )
        return None


def domain_url(domain):
    """CNAME is one hostname, never a URL, path, or an HTML attribute."""
    try:
        hostname = domain.encode("idna").decode("ascii").lower()
    except UnicodeError as error:
        raise BuildError(f"Invalid CNAME hostname: {domain!r}") from error
    labels = hostname.split(".")
    if len(hostname) > 253 or len(labels) < 2 or any(
        not re.fullmatch(r"[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?", label)
        for label in labels
    ):
        raise BuildError(f"Invalid CNAME hostname: {domain!r}")
    return f"https://{hostname}/"


def validate_url(url):
    try:
        parsed = urlsplit(url)
        if parsed.scheme not in ("https", "http") or not parsed.hostname or parsed.username or parsed.password:
            raise ValueError("expected an http(s) URL without credentials")
        if any(character.isspace() or ord(character) < 32 for character in url):
            raise ValueError("unexpected whitespace")
    except ValueError as error:
        raise BuildError(f"Invalid project URL: {url!r}") from error
    return url


def discover_projects(github, config):
    owner = config["owner"]
    repositories = github.repositories(owner)
    # Exclude forks; keep archived original projects when Pages is still enabled.
    published = [
        repository for repository in repositories
        if repository.get("has_pages") is True
        and not repository.get("fork", False)
        and not repository.get("private", False)
        and repository["owner"]["login"].casefold() == owner.casefold()
    ]
    overrides = config.get("url_overrides", {})
    user_site = f"{owner}.github.io".casefold()
    domains = {repository["name"]: github.cname(repository) for repository in published}
    # Project sites inherit the custom domain of the account's user site.
    base_url = f"https://{owner.lower()}.github.io/"
    for repository in published:
        if repository["name"].casefold() == user_site:
            base_url = overrides.get(repository["name"]) or domains[repository["name"]] or base_url
            base_url = validate_url(base_url).rstrip("/") + "/"
    projects = []
    for repository in published:
        name = repository["name"]
        fallback = base_url if name.casefold() == user_site else base_url + quote(name, safe="") + "/"
        url = validate_url(overrides.get(name) or domains[name] or fallback)
        projects.append({
            "name": name,
            "description": repository.get("description") or "",
            "url": url,
            "source_url": validate_url(repository["html_url"]),
            "language": repository.get("language") or "",
            "topics": repository.get("topics") or [],
            "updated_at": repository.get("pushed_at") or repository["updated_at"],
            "archived": repository.get("archived", False),
        })
    return sorted(projects, key=lambda project: project["name"].casefold())


def render_project(project, index):
    updated = datetime.fromisoformat(project["updated_at"].replace("Z", "+00:00"))
    description = escape(project["description"] or "Explore this project on the web.")
    badges = []
    if project["language"]:
        badges.append(f'<span class="language">{escape(project["language"])}</span>')
    if project["archived"]:
        badges.append('<span class="badge">Archived</span>')
    search = " ".join([project["name"], project["description"], project["language"], *project["topics"]])
    return f'''<li class="project" data-search="{escape(search, quote=True)}" data-name="{escape(project['name'], quote=True)}" data-updated="{escape(project['updated_at'], quote=True)}">
          <span class="project-number" aria-hidden="true">{index:02d}</span>
          <article class="project-body">
            <h2><a class="project-title" href="{escape(project['url'], quote=True)}">{escape(project['name'])}<span class="project-arrow" aria-hidden="true">↗</span></a></h2>
            <p class="project-description">{description}</p>
            <div class="project-meta">{' '.join(badges)}<span>Updated <time datetime="{updated.date().isoformat()}">{updated.strftime('%b %d, %Y').replace(' 0', ' ')}</time></span></div>
          </article>
          <a class="source-link" href="{escape(project['source_url'], quote=True)}" aria-label="Source code for {escape(project['name'], quote=True)}">Source <span aria-hidden="true">↗</span></a>
        </li>'''


def build_site(config, projects, output, *, now=None):
    now = now or datetime.now(timezone.utc)
    owner = config["owner"]
    template = Template((ROOT / "site/index.html").read_text(encoding="utf-8"))
    html = template.substitute(
        owner=escape(owner),
        profile_url=f"https://github.com/{quote(owner, safe='')}",
        name=escape(config.get("name", owner)),
        title=escape(config.get("title", "Web projects")),
        description=escape(config.get("description", "A directory of my projects on GitHub Pages.")),
        count=len(projects),
        noun="project" if len(projects) == 1 else "projects",
        projects="\n        ".join(render_project(project, index) for index, project in enumerate(projects, 1)),
        empty_hidden="hidden" if projects else "",
        updated_iso=now.isoformat(timespec="seconds"),
        updated_label=now.strftime("%b %d, %Y · %H:%M UTC").replace(" 0", " "),
    )
    # Discovery and rendering finish before touching the output directory.
    output.mkdir(parents=True, exist_ok=True)
    shutil.copytree(ROOT / "site/assets", output / "assets", dirs_exist_ok=True)
    (output / "index.html").write_text(html, encoding="utf-8")
    (output / ".nojekyll").touch()
    (output / "projects.json").write_text(
        json.dumps({"owner": owner, "generated_at": now.isoformat(), "projects": projects}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=ROOT / "site.json")
    parser.add_argument("--owner", help="Override the GitHub account in site.json")
    parser.add_argument("--output", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    try:
        config = json.loads(args.config.read_text(encoding="utf-8"))
        if args.owner:
            config["owner"] = args.owner
            config["name"] = args.owner
        if not re.fullmatch(r"[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?", config["owner"]):
            raise BuildError("Set a valid GitHub account in site.json or --owner.")
        github = GitHub(os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN"))
        projects = discover_projects(github, config)
        build_site(config, projects, args.output)
    except (BuildError, OSError, ValueError, KeyError, TypeError) as error:
        print(f"Build failed: {error}", file=sys.stderr)
        return 1
    print(f"Built {len(projects)} projects for @{config['owner']} → {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
