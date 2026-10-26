#!/usr/bin/env python3
"""Sitewide static SEO/link audit for USCableInternet.com. Uses only Python stdlib."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE_HOSTS = {"uscableinternet.com", "www.uscableinternet.com"}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.description = []
        self.in_title = False
        self.images_missing_alt = 0
        self.canonicals = []
        self.h1 = 0
        self.ids = set()
        self.links = []
        self.robots = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "meta" and (a.get("name") or "").lower() == "description":
            self.description.append((a.get("content") or "").strip())
        if tag == "img" and "alt" not in a:
            self.images_missing_alt += 1
        if tag == "h1":
            self.h1 += 1
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "link" and "canonical" in (a.get("rel") or "").lower().split():
            self.canonicals.append(a.get("href", ""))
        if tag == "meta" and (a.get("name") or "").lower() == "robots":
            self.robots.append(a.get("content", ""))
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)

def parse_page(path):
    p = PageParser()
    try:
        p.feed(path.read_text(encoding="utf-8", errors="replace"))
    except Exception as e:
        print(f"ERROR: cannot parse {path.relative_to(ROOT)}: {e}")
        return None
    return p

def url_to_file(pathpart):
    pathpart = unquote(pathpart.split("?", 1)[0])
    if not pathpart or pathpart == "/":
        return ROOT / "index.html"
    rel = pathpart.lstrip("/")
    if rel.endswith("/"):
        rel += "index.html"
    candidate = ROOT / rel
    if candidate.is_file():
        return candidate
    if not Path(rel).suffix:
        candidate = ROOT / (rel + ".html")
        if candidate.is_file():
            return candidate
    return candidate

def main():
    html_files = sorted(ROOT.glob("*.html"))
    pages = {}
    errors = []
    warnings = []
    title_owners = {}
    description_owners = {}
    for path in html_files:
        p = parse_page(path)
        if p is None:
            continue
        pages[path] = p
        name = path.name
        expected = "https://uscableinternet.com/" if name == "index.html" else "https://uscableinternet.com/" + name[:-5]
        if name == "404.html":
            if p.canonicals:
                warnings.append(f"{name}: 404 page has a canonical tag; check whether intentional")
            continue
        title = " ".join("".join(p.title).split())
        if not title:
            errors.append(f"{name}: missing title")
        else:
            title_owners.setdefault(title.casefold(), []).append(name)
            if len(title) < 25 or len(title) > 65:
                warnings.append(f"{name}: title is {len(title)} characters; review the 25–65 character range")
        if len(p.description) != 1 or not p.description[0]:
            warnings.append(f"{name}: expected exactly one non-empty meta description, found {len(p.description)}")
        else:
            description = p.description[0]
            description_owners.setdefault(description.casefold(), []).append(name)
            if len(description) < 70 or len(description) > 170:
                warnings.append(f"{name}: meta description is {len(description)} characters; review the 70–170 character range")
        if p.images_missing_alt:
            warnings.append(f"{name}: {p.images_missing_alt} image(s) missing an alt attribute")
        if len(p.canonicals) != 1:
            errors.append(f"{name}: expected exactly one canonical, found {len(p.canonicals)}")
        elif p.canonicals[0].rstrip("/") != expected.rstrip("/"):
            errors.append(f"{name}: canonical mismatch: {p.canonicals[0]} (expected {expected})")
        if p.h1 != 1:
            warnings.append(f"{name}: expected one H1, found {p.h1}")
        if any("noindex" in x.lower() for x in p.robots):
            warnings.append(f"{name}: robots meta contains noindex")
        for href in p.links:
            u = urlparse(href)
            if u.scheme and u.scheme not in {"http", "https"}:
                continue
            if u.netloc and u.netloc.lower() not in SITE_HOSTS:
                continue
            if href.startswith("//"):
                continue
            pathpart = u.path if u.netloc else href.split("#", 1)[0]
            # Empty paths such as href="#plans" point to this page, not the homepage.
            target = path if not pathpart else url_to_file(pathpart)
            if not target.is_file():
                errors.append(f"{name}: internal link target missing: {href}")
                continue
            if u.fragment:
                dest = parse_page(target)
                if dest and unquote(u.fragment) not in dest.ids:
                    warnings.append(f"{name}: anchor not found: {href}")
    # Keep joined owner lists separate to avoid nested-expression f-string syntax issues.
    for title, owners in title_owners.items():
        if len(owners) > 1:
            owner_list = ", ".join(owners)
            warnings.append(f"duplicate title used by {len(owners)} pages: {owner_list}")
    for description, owners in description_owners.items():
        if len(owners) > 1:
            owner_list = ", ".join(owners)
            warnings.append(f"duplicate meta description used by {len(owners)} pages: {owner_list}")
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        errors.append("sitemap.xml is missing")
    else:
        try:
            root = ET.parse(sitemap).getroot()
            locs = [el.text.strip() for el in root.iter() if el.tag.endswith("loc") and el.text]
            if len(locs) != len(set(locs)):
                errors.append("sitemap.xml contains duplicate URLs")
            for loc in locs:
                u = urlparse(loc)
                if u.netloc.lower() not in SITE_HOSTS:
                    errors.append(f"sitemap URL uses unexpected host: {loc}")
                    continue
                target = url_to_file(u.path)
                if not target.is_file():
                    errors.append(f"sitemap URL has no matching file: {loc}")
                elif target.name == "404.html":
                    errors.append(f"sitemap must not include 404 page: {loc}")
                page = pages.get(target)
                if page and page.canonicals and page.canonicals[0].rstrip("/") != loc.rstrip("/"):
                    errors.append(f"sitemap/canonical mismatch: {loc} vs {page.canonicals[0]}")
            print(f"Audited {len(html_files)} HTML files and {len(locs)} sitemap URLs.")
        except Exception as e:
            errors.append(f"Could not parse sitemap.xml: {e}")
    for item in warnings:
        print("WARNING:", item)
    for item in errors:
        print("ERROR:", item)
    print(f"Summary: {len(errors)} errors, {len(warnings)} warnings.")
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())
