# Web projects

A static directory of [@michiexile's](https://github.com/michiexile) original public repositories with GitHub Pages enabled. A small Python script fetches GitHub metadata at build time and produces plain HTML, CSS, a little optional JavaScript, and a reusable `projects.json` feed. There are no Python packages or frontend dependencies to install.

The page includes descriptions, live-site and source links, language, last push date, search, and sorting. All project links work with JavaScript disabled. Forks and private repositories are excluded. Archived original repositories remain included when Pages is enabled.

## Build locally

Requires Python 3.10 or newer. An authenticated build is recommended because unauthenticated GitHub API requests have a low rate limit.

```sh
export GH_TOKEN="$(gh auth token)" # If you use the GitHub CLI; otherwise use a GitHub token.
python3 scripts/build.py
python3 -m http.server 8000 --directory dist
```

Open <http://localhost:8000>. Output is generated in `dist/`, which is ignored by Git. The token is used only during the build and is never included in the output.

```sh
python3 -m unittest discover -s tests -v
node --check site/assets/directory.js
```

Edit `site.json` for the account, display name, title, and introduction. The generator also accepts `--owner another-account`, `--config path/to/config.json`, and `--output path/to/output`.

## Discovery and URLs

The generator follows all repository-list pages and includes your public, non-fork repositories where GitHub's `has_pages` flag is true. This covers branch-based publishing and Actions deployments; a `gh-pages` branch is not required. The flag indicates that Pages is enabled, not that the deployment is healthy.

For each included repository, it looks for a `CNAME` file in these locations, in order:

1. The root of `gh-pages`.
2. The root of the default branch.
3. `docs/` on the default branch.

Without a CNAME, the link uses `https://OWNER.github.io/REPOSITORY/`, or `https://OWNER.github.io/` for the account's user site. If the user site has a custom domain, project sites inherit that domain. The repository's `homepage` field is deliberately not used: it can point to an upstream project or an unrelated website.

For a custom domain configured only in GitHub settings, an unusual publishing branch, or a stale CNAME, set the exact live URL in `site.json`:

```json
"url_overrides": {
  "my-project": "https://tools.example.org/"
}
```

URL overrides take precedence over the discovered URL. CNAME discovery still runs, so unexpected API errors still fail the scan. The script uses public repository contents rather than the privileged Pages-settings API, allowing the daily job to run with the built-in token instead of a personal access token.

Network failures, invalid API responses, authentication errors, and rate limits fail the build. Interrupted network reads are retried twice before failing. A 404 for an optional CNAME location is treated as absent. An invalid hostname or multi-domain CNAME produces a warning and is ignored; GitHub Pages supports one custom domain per site. Discovery finishes before output is written; the workflow deploys only after a successful build, leaving the existing site intact on failure.

## GitHub Actions and Pages

The workflow in `.github/workflows/pages.yml` tests and builds on pushes and pull requests. It deploys from the repository's **default branch**, including daily at **09:23 UTC** and manual runs. Build output is uploaded directly to Pages; no generated-file commits or `gh-pages` output branch are needed.

To activate it:

1. Push these files to the intended repository's default branch.
2. Under **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Open **Actions → Build and deploy project directory → Run workflow**, or wait for the next push or daily run.

The built-in `GITHUB_TOKEN` supplies API authentication. Only the deployment job receives `pages: write` and `id-token: write`. Pull requests and non-default branches build without deploying. Review any existing Pages environment rules to ensure the default branch may deploy without manual approval if daily unattended publication is wanted.

The separate, scheduled-only `keepalive` job reuses [`liskin/gh-workflow-keepalive@v1`](https://github.com/liskin/gh-workflow-keepalive) from the previous edition. It uses `actions: write` to refresh this workflow's enabled state through GitHub's API, preventing the 60-day inactivity shutdown without dummy commits. It runs independently of the build and deployment, so their failures do not prevent keepalive. No other job receives `actions: write`. If the workflow has already been disabled, re-enable it once in Actions so scheduled runs can resume.

GitHub schedules run from the default branch and can be delayed. See [GitHub's schedule documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
