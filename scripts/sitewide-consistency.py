#!/usr/bin/env python3
"""Repeatable sitewide footer and compensation-disclosure standardization."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DISCLOSURE = (
    "We link directly to official provider websites and do not currently participate in "
    "affiliate programs. Some calls, including certain DIRECTV inquiries, may be handled "
    "by an independent authorized dealer or sales partner, and qualifying referrals or "
    "sales may generate compensation."
)
BANNER = (
    '<div class="disc">' + DISCLOSURE +
    ' <a href="/affiliate-disclosure">Affiliate disclosure</a></div>'
)
FOOTER_COPY = (
    "© 2026 USCableInternet.com. Independent comparison resource. " +
    DISCLOSURE +
    ' <a href="tel:8886303881">888-630-3881</a>'
)

def about_footer_template():
    about = (ROOT / "about.html").read_text(encoding="utf-8")
    match = re.search(r"<footer\b[^>]*>[\s\S]*?</footer>", about, flags=re.I)
    if not match:
        raise RuntimeError("about.html does not contain the required footer template")
    footer = match.group(0)
    footer, count = re.subn(
        r"© 2026 USCableInternet\.com\.[\s\S]*?<a href=[\"']tel:8886303881[\"']>888-630-3881</a>",
        FOOTER_COPY,
        footer,
        count=1,
        flags=re.I,
    )
    if count != 1:
        raise RuntimeError("Could not safely update the about.html footer disclosure")
    required = (
        'href="/privacy"', 'href="/terms"', 'href="/affiliate-disclosure"',
        'href="/privacy#do-not-sell"',
    )
    if not all(item in footer for item in required):
        raise RuntimeError("about.html footer is missing one or more required Legal links")
    return footer

def replace_or_add_banner(html):
    pattern = r'<div\b(?=[^>]*\bclass\s*=\s*["\'][^"\']*\bdisc\b[^"\']*["\'])[^>]*>[\s\S]*?</div>'
    updated, count = re.subn(pattern, BANNER, html, count=1, flags=re.I)
    if count:
        # Remove any accidental duplicate disclosure banners while retaining one.
        updated = re.sub(pattern, "", updated, count=10, flags=re.I)
        return updated
    body = re.search(r"<body\b[^>]*>", html, flags=re.I)
    if not body:
        raise RuntimeError("HTML document has no body element; cannot place disclosure banner")
    return html[:body.end()] + "\n" + BANNER + html[body.end():]

def main():
    footer = about_footer_template()
    files = sorted(ROOT.rglob("*.html"))
    changed = 0
    errors = []
    for path in files:
        if any(part in {".git", "_site"} for part in path.parts):
            continue
        original = path.read_text(encoding="utf-8")
        updated = replace_or_add_banner(original)
        footer_pattern = r"<footer\b[^>]*>[\s\S]*?</footer>"
        updated, count = re.subn(footer_pattern, lambda _: footer, updated, count=1, flags=re.I)
        if count == 0:
            body_end = re.search(r"</body\s*>", updated, flags=re.I)
            if not body_end:
                errors.append(f"{path.relative_to(ROOT)}: missing footer and body close")
                continue
            updated = updated[:body_end.start()] + footer + "\n" + updated[body_end.start():]
        if re.search(footer_pattern, updated, flags=re.I) is None:
            errors.append(f"{path.relative_to(ROOT)}: footer insertion failed")
            continue
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Standardized disclosure banner and about.html footer across {len(files)} HTML files; changed {changed}.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
