# Engineer Connect

A website where engineers can share ideas and make connections.

## Pages
1. `index.html`: home page. Choose your area (Mechanical, Electrical, Chemical, Civil, Aerospace, Software).
2. `goals.html`: choose what you want: **Ideas** or **Connections**.
3. `ideas.html`: post ideas, filter by area, and back the ones you like.
4. `connections.html`: browse engineers, search by skill or location, and send connection requests.
5. `news.html`: News & Links: engineering news, science, magazines and professional bodies,
   filtered by area and type. The links themselves live in `links.js` (easy to add to).
6. `jobs.html`: Jobs. Find a job (filter by area, job type, on-site/hybrid/remote, search)
   or Post a vacancy: a 5-part form (company, role, ideal candidate, what you offer, how to apply)
   with a live preview. Employers can start from a ready-made template or save their own.
   Option lists, templates and example jobs live in `jobs.js`.

Shared look: `style.css`. Shared code and starter content: `app.js`.

## Current limits
Everything is saved in your own browser only, so other people can't see your ideas yet.
The engineers on the Connections page are made-up examples. Real sign-up, shared data
and messaging need a server and a database, which is the next stage.

## When you change style.css or app.js
Every page loads them as `style.css?v=13` and `app.js?v=13` (and `links.js?v=13` on the News page). Bump the number on all pages
after a change, so browsers fetch the new version instead of an old saved copy.

## The live news banner
The scrolling "Latest" banner under the top bar shows real headlines from science and
engineering sites (IEEE Spectrum, ScienceDaily, Tech Xplore, NASA, New Civil Engineer and more).
- `update_news.py` reads those sites' news feeds and saves the newest headlines to `news.json`.
- On this PC: double-click `Refresh news.bat` to get the latest headlines.
- Online: the publishing job (below) runs the script every hour, so the banner keeps itself up to date.
- To add or remove a news site, edit the `FEEDS` list at the top of `update_news.py`.

## Publishing (GitHub Pages)
The site lives at https://jakemarshall6739476-gif.github.io/engineer.connect/
- To update it: commit your changes, then `git push`. It's live about a minute later.
- `.github/workflows/pages.yml` publishes the site on every push and again every hour (fresh headlines).
  Only the website files are published: README, `update_news.py`, `Refresh news.bat` and `.claude/` are not.
- To publish by hand: GitHub → Actions → "Publish site" → "Run workflow".
- GitHub pauses the hourly job if the project has had no changes for 60 days. It sends an email;
  switch it back on from the Actions tab.
- Something wrong online? Undo the change (or go back to an earlier commit) and push again.
