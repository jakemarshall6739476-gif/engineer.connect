# Engineer Connect

A website where engineers can share ideas and make connections.

## Pages
1. `index.html`: home page. Choose your area (Mechanical, Electrical, Chemical, Civil, Aerospace, Software).
2. `goals.html`: choose what you want: **Ideas** or **Connections**.
3. `ideas.html`: post ideas, filter by area, and back the ones you like.
4. `connections.html`: browse engineers, search by skill or location, and send connection requests.
5. `news.html`: News & Links: engineering news, science, magazines and professional bodies,
   filtered by area and type. The links themselves live in `links.js` (easy to add to).

Shared look: `style.css`. Shared code and starter content: `app.js`.

## Current limits
Everything is saved in your own browser only, so other people can't see your ideas yet.
The engineers on the Connections page are made-up examples. Real sign-up, shared data
and messaging need a server and a database, which is the next stage.

## When you change style.css or app.js
Every page loads them as `style.css?v=7` and `app.js?v=7` (and `links.js?v=7` on the News page). Bump the number on all pages
after a change, so browsers fetch the new version instead of an old saved copy.

## The live news banner
The scrolling "Latest" banner under the top bar shows real headlines from science and
engineering sites (IEEE Spectrum, ScienceDaily, Tech Xplore, NASA, New Civil Engineer and more).
- `update_news.py` reads those sites' news feeds and saves the newest headlines to `news.json`.
- On this PC: double-click `Refresh news.bat` to get the latest headlines.
- Online: `.github/workflows/news.yml` runs the script every hour on GitHub, so the banner keeps
  itself up to date (this needs the site hosted from GitHub, see "Putting it online").
- To add or remove a news site, edit the `FEEDS` list at the top of `update_news.py`.
