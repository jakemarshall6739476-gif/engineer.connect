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
7. `account.html`: My account. Create an account (email confirmation), sign in, reset password,
   edit your profile, sign out, delete your account.
8. `privacy.html` and `terms.html`: Privacy notice and Terms, linked from the footer.

Shared look: `style.css`. Shared code and starter content: `app.js`.

## Accounts and the online database (Supabase)
- Accounts and profiles are stored in Supabase (project `xvrvysogsjwdaezzkxyi`, London).
  `config.js` holds its public address and publishable key (safe to publish); `data.js` is
  the one place pages talk to it. Never put the secret or service_role key in this project.
- `supabase/schema.sql` creates the tables and security rules. Run it in Supabase -> SQL Editor
  after changing it (safe to run again).
- Make someone an admin: Supabase -> Table Editor -> profiles -> tick `is_admin`.
- Still to do: Ideas, Connections and Jobs are saved in each browser only until they're
  switched over to the database; the people and jobs shown there are examples.

## When you change style.css or app.js
Every page loads them as `style.css?v=14` and `app.js?v=14` (and `links.js?v=14` on the News page). Bump the number on all pages
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
