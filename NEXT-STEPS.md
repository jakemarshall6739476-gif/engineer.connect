# Engineer Connect: where we are and what's next

Last updated 25 October 2026. Start each session here, then `git log`.

## Live site
https://jakemarshall6739476-gif.github.io/engineer.connect/
- GitHub repository: `jakemarshall6739476-gif/engineer.connect` (public). Push to `main` and it's live in about a minute.
- Online database: Supabase project `xvrvysogsjwdaezzkxyi` (London, free plan).

## Done
- Pages: Home (choose your area), Goals, Ideas, Connections, Jobs (find and post vacancies, with templates), News & Links, My account, Privacy, Terms.
- Opening animation, blueprint background, live news banner (refreshed hourly), founder footer.
- **Accounts:** sign up with email confirmation, sign in, password reset, profile, delete account.
- **Shared through the database** (tested by the owner with two accounts):
  - Ideas, including backing
  - Connections: profiles, plus Connect, Accept and Decline
  - Jobs, plus job templates
- Examples, marked "Example", show while a page has fewer than 3 real items.
- Hourly publish job: fresh headlines, plus a "keep awake" check so the free database isn't paused.

## Next (the 3-month growth plan)
**Finish Month 1**
1. **Sign-up emails with Brevo (in progress, paused 26 October 2026).** Supabase's built-in email only sends a few an hour, so finish this before inviting people.
   - ✅ Brevo account created (signed up with Google). The gmail sender is already verified.
   - **To do, Step 3:** Brevo → your name (top right) → **SMTP & API** → **SMTP** tab. Note the server (`smtp-relay.brevo.com`), port (`587`) and Login (`…@smtp-brevo.com`). Click **Generate a new SMTP key** and name it `Supabase`. The key is a password: never share it, paste it only into Supabase.
   - **To do, Step 4:** Supabase → **Authentication** → **Emails** → **SMTP Settings** → **Enable Custom SMTP**. Sender email: the gmail address. Sender name: `Engineer Connect`. Host and port as above. Username: the Brevo Login. Password: the SMTP key. Save. Then **Authentication** → **Rate Limits** → emails per hour: `100`.
   - **To do, Step 5:** on the live site's Sign in page, type your email and press **Forgot password?**. An email from "Engineer Connect" should arrive (check spam).
2. ✅ The hourly scheduled runs are working (141 successful by 26 October 2026).

**Month 2: make it worth coming back to**
- Private messages between connected engineers.
- Profile pages with a shareable link, and a "Founding member" badge for the first 100.
- Home page activity: latest ideas, new members, new jobs.
- Safety: a Report button, an admin view to hide posts, and limits on posting speed.

**Month 3: grow UK-wide**
- Page titles and descriptions, `sitemap.xml`, LinkedIn preview cards, Google Search Console.
- Cloudflare Web Analytics (free, no cookies). Needs the owner's token.
- Launch: seed about 20 real ideas and jobs, invite 50 founding members, then post on LinkedIn and with student engineering societies.
- Remove the "Early preview" note once there's real content.

## Handy facts
- **Make someone an admin:** Supabase → Table Editor → profiles → tick `is_admin`.
- **After changing `supabase/schema.sql`:** run it again in Supabase → SQL Editor. It's safe to re-run.
- **After changing `style.css` or a `.js` file:** bump `?v=N` on every page (currently v=15).
- **Test locally:** the `engineer-connect` preview on port 5180 (see `.claude/skills/verify/SKILL.md`).
