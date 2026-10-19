"""Engineer Connect: fetch the latest science and engineering headlines.

Reads the news feeds (RSS) of trusted sites and saves the newest headlines to
news.json, which the scrolling news banner on every page shows.

Run it with:  py update_news.py
Online, a scheduled job runs it every hour (see .github/workflows/news.yml).
Uses only Python's built-in modules, so there is nothing to install.
"""
import html
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

# (source name, feed address, area). Area matches the areas in app.js, or "general".
FEEDS = [
    ("IEEE Spectrum", "https://spectrum.ieee.org/feeds/feed.rss", "electrical"),
    ("ScienceDaily", "https://www.sciencedaily.com/rss/matter_energy/engineering.xml", "general"),
    ("ScienceDaily", "https://www.sciencedaily.com/rss/top/science.xml", "general"),
    ("Tech Xplore", "https://techxplore.com/rss-feed/", "general"),
    ("Phys.org", "https://phys.org/rss-feed/", "general"),
    ("New Atlas", "https://newatlas.com/index.rss", "general"),
    ("Interesting Engineering", "https://interestingengineering.com/feed", "general"),
    ("Engineer Live", "https://www.engineerlive.com/rss.xml", "general"),
    ("NASA", "https://www.nasa.gov/news-release/feed/", "aerospace"),
    ("SpaceNews", "https://spacenews.com/feed/", "aerospace"),
    ("World Nuclear News", "https://www.world-nuclear-news.org/rss", "nuclear"),
    ("New Civil Engineer", "https://www.newcivilengineer.com/feed/", "civil"),
]

PER_SOURCE = 6        # most headlines taken from any one site, so the banner stays varied
MAX_AGE_DAYS = 10     # ignore anything older than this
MAX_ITEMS = 60
OUT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "news.json")
ATOM = "{http://www.w3.org/2005/Atom}"


def clean(text):
    """Turn feed text into plain text: no HTML tags, no &amp; codes, single spaces."""
    text = re.sub(r"<[^>]+>", "", text or "")
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def parse_date(text):
    if not text:
        return None
    text = text.strip()
    try:
        d = parsedate_to_datetime(text)                          # RSS style
    except (TypeError, ValueError):
        try:
            d = datetime.fromisoformat(text.replace("Z", "+00:00"))  # Atom style
        except ValueError:
            return None
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)


def fetch(feed):
    source, url, area = feed
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 EngineerConnect-news/1.0"})
        root = ET.fromstring(urllib.request.urlopen(req, timeout=25).read())
    except Exception as e:  # one broken feed must not stop the rest
        print(f"  skipped {source}: {type(e).__name__}", file=sys.stderr)
        return []

    items = []
    for it in root.iter():
        if it.tag == "item":                                      # RSS
            title, link = it.findtext("title"), it.findtext("link")
            date = it.findtext("pubDate") or it.findtext("{http://purl.org/dc/elements/1.1/}date")
        elif it.tag == ATOM + "entry":                            # Atom
            title = it.findtext(ATOM + "title")
            link_el = it.find(ATOM + "link")
            link = link_el.get("href") if link_el is not None else None
            date = it.findtext(ATOM + "updated") or it.findtext(ATOM + "published")
        else:
            continue
        title, link, when = clean(title), (link or "").strip(), parse_date(date)
        if title and link.startswith(("https://", "http://")) and when:
            items.append({"title": title, "link": link, "source": source, "area": area,
                          "published": when.astimezone(timezone.utc).isoformat(timespec="seconds")})
    return items


def main():
    print("Fetching headlines...")
    with ThreadPoolExecutor(len(FEEDS)) as pool:
        results = list(pool.map(fetch, FEEDS))

    cutoff = datetime.now(timezone.utc) - timedelta(days=MAX_AGE_DAYS)
    now = datetime.now(timezone.utc) + timedelta(hours=1)  # allow small clock differences
    seen, per_source, chosen = set(), {}, []
    everything = sorted((i for r in results for i in r), key=lambda i: i["published"], reverse=True)
    for item in everything:
        when = datetime.fromisoformat(item["published"])
        key = item["title"].lower()
        if when < cutoff or when > now or key in seen:
            continue
        if per_source.get(item["source"], 0) >= PER_SOURCE:
            continue
        seen.add(key)
        per_source[item["source"]] = per_source.get(item["source"], 0) + 1
        chosen.append(item)
        if len(chosen) >= MAX_ITEMS:
            break

    if not chosen:
        print("No headlines fetched (no internet?). Keeping the old news.json.")
        return 1

    data = {"updated": datetime.now(timezone.utc).isoformat(timespec="seconds"), "items": chosen}
    tmp = OUT_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT_FILE)
    print(f"Saved {len(chosen)} headlines from {len(per_source)} sites to news.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
