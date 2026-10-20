---
name: verify
description: How to run and check Engineer Connect in the browser preview (static site, no build step).
---

# Verifying Engineer Connect

## Launch
- Static HTML/CSS/JS, no build. Serve the folder on localhost (pages use `fetch("news.json")`,
  which fails from `file://`).
- In the Claude desktop app the preview entry is `engineer-connect` (port 5180) in the
  A13 Workshop App's git-ignored `.claude/launch.json`:
  `py -m http.server 5180 --bind 127.0.0.1 --directory "C:/Users/jakem/Documents/Engineer Connect"`.
- Pages pick the area from `?d=<area>` (e.g. `jobs.html?d=electrical`), else from localStorage.

## Gotchas
- Browsers cache old CSS/JS: pages load `style.css?v=N` / `app.js?v=N`. If a change doesn't show,
  check the version was bumped on every page, or load the page with a fresh query string.
- All user data is in localStorage under `ec_*` keys (ideas, jobs, job_templates, job_draft,
  employer, requested, voted). Clear the ones you touched after testing.
- `alert()`/`confirm()` (posting a job, Remove) block automation: stub them in the page first.
- The opening animation only plays once per tab session (`sessionStorage.ec_splash_seen`).
- The user may click in the shared preview pane at the same time; a sudden navigation may be them.

## Flows worth driving
- Home → pick area → goals → each card (Ideas, Connections, Jobs, News & Links).
- Jobs: filters (area tabs, job type, pattern), View details pop-up (Esc closes), Post a vacancy
  (template → fill → bad email / reversed pay / past closing date are blocked → post → listed
  as "Your vacancy" → Remove), draft survives reload, Save as template.
- News banner: needs `news.json` (run `py update_news.py`); check it scrolls and links open.
- Check at phone width (375px): no sideways scrolling.
