"""Adds share-preview (Open Graph), search and icon tags to every page of Engineer Connect.
Safe to run again: it replaces the block it added before."""
import re
import sys
from pathlib import Path

SITE = Path(sys.argv[1])
BASE = "https://jakemarshall6739476-gif.github.io/engineer.connect/"

PAGES = {
    "index.html": ("Engineer Connect: ideas, connections and jobs for UK engineers",
                   "A free community for engineers across the UK. Share ideas, connect with other engineers, find engineering jobs and keep up with the latest engineering news."),
    "goals.html": ("Get started · Engineer Connect",
                   "Choose what you want from Engineer Connect: share ideas, make connections, find jobs or catch up on engineering news."),
    "ideas.html": ("Engineering ideas · Engineer Connect",
                   "Share engineering project ideas, get feedback, and find people to build them with."),
    "connections.html": ("Find engineers · Engineer Connect",
                         "Find and connect with mechanical, electrical, chemical, civil, aerospace, software and nuclear engineers across the UK."),
    "jobs.html": ("Engineering jobs · Engineer Connect",
                  "Engineering vacancies across the UK, and a free, simple way for employers to advertise jobs to engineers."),
    "news.html": ("Engineering news and links · Engineer Connect",
                  "The latest engineering and science headlines, plus magazines, professional bodies and free tools, all in one place."),
    "account.html": ("Join or sign in · Engineer Connect",
                     "Create a free Engineer Connect account to share ideas, connect with engineers and post jobs."),
    "privacy.html": ("Privacy notice · Engineer Connect",
                     "How Engineer Connect collects, uses and protects your information."),
    "terms.html": ("Terms of use · Engineer Connect",
                   "The rules for using Engineer Connect, posting ideas and advertising jobs."),
}

START, END = "  <!-- share-and-search -->\n", "  <!-- /share-and-search -->\n"


def esc(s):
    return s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")


for page, (title, desc) in PAGES.items():
    path = SITE / page
    html = path.read_text(encoding="utf-8")
    url = BASE if page == "index.html" else BASE + page
    block = (
        START +
        f'  <meta name="description" content="{esc(desc)}">\n'
        f'  <link rel="canonical" href="{url}">\n'
        '  <meta name="theme-color" content="#11161d">\n'
        '  <link rel="icon" href="favicon.svg" type="image/svg+xml">\n'
        '  <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">\n'
        '  <link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
        '  <meta property="og:type" content="website">\n'
        '  <meta property="og:site_name" content="Engineer Connect">\n'
        '  <meta property="og:locale" content="en_GB">\n'
        f'  <meta property="og:title" content="{esc(title)}">\n'
        f'  <meta property="og:description" content="{esc(desc)}">\n'
        f'  <meta property="og:url" content="{url}">\n'
        f'  <meta property="og:image" content="{BASE}og-image.png">\n'
        '  <meta property="og:image:width" content="1200">\n'
        '  <meta property="og:image:height" content="630">\n'
        '  <meta property="og:image:alt" content="Engineer Connect: where engineers build together">\n'
        '  <meta name="twitter:card" content="summary_large_image">\n'
        + END
    )
    html = re.sub(re.escape(START) + ".*?" + re.escape(END), "", html, flags=re.S)
    html = re.sub(r"<title>.*?</title>\n", f"<title>{esc(title)}</title>\n" + block, html, count=1, flags=re.S)
    path.write_text(html, encoding="utf-8", newline="\n")
    print("updated", page)
