#!/usr/bin/env python3
"""Run: python3 build.py  -> writes state pages, sitemap.xml, robots.txt, assets/state.css
AFFILIATE LINKS: when approved, paste each link into AFFILIATE below. Rebuild. Done."""
import html, json, os
from datetime import date

SITE = "https://uscableinternet.com"
PHONE_DISPLAY, PHONE_TEL = "888-630-3881", "8886303881"
TODAY = date.today().isoformat()

# ---- ONE PLACE FOR ALL PROVIDER LINKS ------------------------------------
OFFICIAL = {
 "att": "https://www.att.com/internet/fiber/", "xfinity": "https://www.xfinity.com/learn/internet-service",
 "spectrum": "https://www.spectrum.com/internet", "cox": "https://www.cox.com/",
 "optimum": "https://www.optimum.com/", "fios": "https://www.verizon.com/home/fios-fastest-internet/",
 "frontier": "https://frontier.com/", "gfiber": "https://fiber.google.com/",
 "altafiber": "https://www.altafiber.com/", "wow": "https://www.wowway.com/",
 "tmobile": "https://www.t-mobile.com/home-internet", "starlink": "https://www.starlink.com/",
 "brightspeed": "https://www.brightspeed.com/", "ziply":"https://ziplyfiber.com/", "astound":"https://www.astound.com/", "shentel":"https://www.shentel.com/", "quantum":"https://www.quantumfiber.com/", "epb":"https://epb.com/", "tds":"https://tdstelecom.com/", "comporium":"https://comporium.com/", "metronet":"https://www.metronetinc.com/",
}
AFFILIATE = {k: "" for k in OFFICIAL}   # e.g. AFFILIATE["spectrum"] = "https://your-cj-link"

def link(key, label):
    aff = AFFILIATE.get(key, "")
    if aff:
        return f'<a class="btn" href="{html.escape(aff)}" rel="sponsored nofollow noopener" target="_blank">{label}</a>'
    return f'<a class="btn" href="{OFFICIAL[key]}" rel="noopener" target="_blank">{label}</a>'

NAMES = {"att":"AT&T Fiber","xfinity":"Xfinity","spectrum":"Spectrum","cox":"Cox","optimum":"Optimum","fios":"Verizon Fios",
 "frontier":"Frontier","gfiber":"Google Fiber","altafiber":"Altafiber","wow":"WOW!","tmobile":"T-Mobile Home Internet",
 "starlink":"Starlink","brightspeed":"Brightspeed","ziply":"Ziply Fiber","astound":"Astound","shentel":"Shentel","quantum":"Quantum Fiber","epb":"EPB Fiber","tds":"TDS","comporium":"Comporium","metronet":"Metronet"}

# ---- STATE DATA (edit freely; verify footprints before publishing) --------
S = [
 dict(slug="california", name="California", cities=["Los Angeles","San Diego","San Jose","San Francisco","Sacramento"],
  intro="California mixes dense fiber and cable competition in the big metros with long stretches of mountain, desert and farm country where choices shrink fast.",
  prov=[("att","Biggest fiber footprint","AT&T Fiber reaches many neighborhoods across Southern California and the Bay Area, with symmetrical speeds."),
        ("spectrum","Cable","Spectrum is a major cable provider across much of the Los Angeles and San Diego regions."),
        ("xfinity","Cable","Xfinity serves much of the San Francisco Bay Area and the Sacramento region."),
        ("cox","Cable","Cox serves parts of San Diego County, Orange County and Santa Barbara."),
        ("frontier","Select areas","Frontier Fiber covers parts of Southern California. Test your address first."),
        ("starlink","Rural and mountain","Starlink and 5G home internet are the usual fallback outside wired networks.")],
  rural="Mountain, desert and Central Valley towns often have one wired provider or none. Check 5G home internet and fixed wireless first, then satellite. Ask neighbors and your county broadband office about local fiber builds.",
  hz=("Wildfire and power-shutoff season","Planned power shutoffs and wildfires can take down any provider. Put your modem and router on a battery backup and keep a phone hotspot ready for work calls."),
  li="AT&T Access, Xfinity Internet Essentials and Spectrum Internet Assist, plus the federal Lifeline program.",
  faq=[("Is fiber available in Los Angeles and the Bay Area?","In many neighborhoods, yes. AT&T Fiber and Frontier cover parts of Southern California. Fiber is address-specific, so test your exact address."),
       ("What is the best internet option in rural California?","Start with 5G home internet if you have a strong signal, then Starlink. Wired options may be limited outside towns.")]),
 dict(slug="florida", name="Florida", cities=["Jacksonville","Miami","Tampa","Orlando","St. Petersburg"],
  intro="Florida has strong cable and fiber options in its metro areas, plus many retirement communities and coastal towns where the best plan depends on the building and the street.",
  prov=[("xfinity","Cable","Xfinity serves much of South Florida and the Jacksonville area."),
        ("spectrum","Cable","Spectrum is a major cable provider around Orlando and Tampa Bay."),
        ("att","Biggest fiber footprint","AT&T Fiber reaches many neighborhoods in the major metros. Fiber gives symmetrical upload and download."),
        ("frontier","Select areas","Frontier Fiber serves parts of the Tampa Bay area."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns, with no contract."),
        ("starlink","Rural","Starlink covers rural areas where wired choices are limited.")],
  rural="Inland and Panhandle counties often rely on 5G home internet, fixed wireless or satellite. Check each provider's address tool before you commit.",
  hz=("Hurricane season","Hurricanes can cause multi-day outages for every provider. Keep a battery backup for the modem and router, and a mobile hotspot as a backup connection."),
  li="AT&T Access, Xfinity Internet Essentials and Spectrum Internet Assist, plus the federal Lifeline program.",
  faq=[("Which internet is best in South Florida?","Xfinity cable and AT&T Fiber are the common choices. Fiber is better for uploads where it is available at your address."),
       ("Can I get internet in a condo or apartment?","It depends on the building. Many buildings have exclusive or preferred provider agreements, so ask management first.")]),
 dict(slug="new-york", name="New York", cities=["New York City","Buffalo","Rochester","Yonkers","Syracuse"],
  intro="New York has some of the most competitive internet markets in the country in and around the city, and very different options upstate.",
  prov=[("fios","Fiber","Verizon Fios serves much of New York City, Long Island and parts of the Hudson Valley."),
        ("optimum","Cable and fiber","Optimum serves the New York City area and Long Island."),
        ("spectrum","Cable","Spectrum is a major provider across upstate New York and parts of New York City."),
        ("frontier","Select areas","Frontier serves some upstate communities."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers rural areas in the Adirondacks and Catskills.")],
  rural="Upstate and mountain areas have fewer wired choices. Check 5G home and fixed wireless, then satellite.",
  hz=("Winter storms","Ice and snow can interrupt service. A router battery backup and a phone hotspot keep remote work running during short outages."),
  li="Optimum Advantage Internet, Spectrum Internet Assist, Verizon Fios Forward and the federal Lifeline program.",
  faq=[("Is Verizon Fios or Optimum better in New York City?","It depends on the building and the plan. Compare the full monthly price, equipment fees and the price after the promotion ends."),
       ("What can I get upstate?","Spectrum is the most widespread wired option, with fiber and 5G home in select places.")]),
 dict(slug="pennsylvania", name="Pennsylvania", cities=["Philadelphia","Pittsburgh","Allentown","Erie","Reading"],
  intro="Pennsylvania has cable, fiber and fixed wireless competition in its cities and suburbs, and a lot of hills and rural land where service varies by road.",
  prov=[("xfinity","Cable","Xfinity is a major provider in the Philadelphia and Pittsburgh regions."),
        ("fios","Fiber","Verizon Fios serves parts of the Philadelphia area."),
        ("frontier","Fiber","Frontier Fiber serves parts of the Pittsburgh area."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers rural and hilly areas.")],
  rural="Hills and long rural roads limit wired service. Check local cable companies and fixed wireless, then 5G home and satellite.",
  hz=("Winter weather and storms","Snow, ice and storms can cause outages. A battery backup for the modem and router helps, and a mobile hotspot gives you a backup line."),
  li="Xfinity Internet Essentials, Verizon Fios Forward and the federal Lifeline program.",
  faq=[("What is the best internet in Philadelphia?","Fios and Xfinity are the main choices in many neighborhoods. Compare price after the promo period."),
       ("Is fiber available in Pittsburgh?","In parts of the metro. Check your exact address.")]),
 dict(slug="ohio", name="Ohio", cities=["Columbus","Cleveland","Cincinnati","Toledo","Akron"],
  intro="Ohio's cities have cable and fiber choices, and its smaller towns and farm country often rely on one wired provider or fixed wireless.",
  prov=[("spectrum","Cable","Spectrum serves much of Columbus, Cleveland and the Dayton area."),
        ("altafiber","Fiber and cable","Altafiber, formerly Cincinnati Bell, serves the Cincinnati region."),
        ("frontier","Select areas","Frontier serves parts of Ohio. Availability varies by town."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers farm country where wired choices are limited.")],
  rural="Farm country and small towns may have one wired provider. Check fixed wireless and 5G home, then satellite.",
  hz=("Storm and winter outages","Severe storms and winter weather can interrupt service. A battery backup for the modem and router and a hotspot cover short outages."),
  li="Spectrum Internet Assist and the federal Lifeline program. Ask your provider about current low-income plans.",
  faq=[("Who offers fiber in Cincinnati?","Altafiber is the main fiber provider in the Cincinnati area."),
       ("What internet is available in rural Ohio?","Fixed wireless, 5G home and satellite are the usual options. Check each at your address.")]),
 dict(slug="illinois", name="Illinois", cities=["Chicago","Aurora","Naperville","Joliet","Rockford"],
  intro="The Chicago area has strong cable and fiber competition. Downstate Illinois and farm country look very different, with fewer wired providers.",
  prov=[("xfinity","Cable","Xfinity is a major cable provider in Chicago and many suburbs."),
        ("att","Fiber","AT&T Fiber reaches parts of Chicago and the suburbs."),
        ("wow","Cable","WOW! serves some Chicago suburbs."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers farm country and small towns.")],
  rural="Downstate towns and farms often have limited wired service. Check fixed wireless and 5G home, then satellite.",
  hz=("Winter storms and flooding","Heavy snow, ice storms and spring flooding can cause outages. Keep a battery backup for the modem and router and a hotspot for backup."),
  li="Xfinity Internet Essentials and the federal Lifeline program. Ask your provider about current low-income plans.",
  faq=[("Is fiber available in Chicago?","In many neighborhoods. AT&T Fiber is address-specific, so test your exact address."),
       ("Which cable provider serves Chicago suburbs?","Xfinity serves many, and WOW! serves some. Compare both where they overlap.")]),
 dict(slug="georgia", name="Georgia", cities=["Atlanta","Augusta","Columbus","Savannah","Athens"],
  intro="Metro Atlanta has fiber and cable competition. Outside the metro, coastal and rural Georgia have fewer choices.",
  prov=[("xfinity","Cable","Xfinity serves much of metro Atlanta and other Georgia cities."),
        ("att","Biggest fiber footprint","AT&T Fiber reaches many neighborhoods in metro Atlanta."),
        ("gfiber","Select areas","Google Fiber serves parts of metro Atlanta."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers rural south Georgia and areas without wired service.")],
  rural="South Georgia and rural counties often rely on fixed wireless, 5G home or satellite. Check each at your address.",
  hz=("Storm and hurricane season","Severe storms and coastal hurricanes can cause outages. A battery backup for the modem and router and a hotspot keep you connected during short outages."),
  li="AT&T Access, Xfinity Internet Essentials and the federal Lifeline program.",
  faq=[("Who offers fiber in Atlanta?","AT&T Fiber and Google Fiber cover parts of the metro. Check your exact address."),
       ("What is the best internet for rural Georgia?","5G home internet or Starlink, depending on your signal and tree cover.")]),
 dict(slug="north-carolina", name="North Carolina", cities=["Charlotte","Raleigh","Greensboro","Durham","Winston-Salem"],
  intro="Charlotte and the Triangle have fiber and cable competition. The mountains and rural east have fewer wired providers.",
  prov=[("spectrum","Cable","Spectrum is a major cable provider across North Carolina."),
        ("att","Fiber","AT&T Fiber reaches parts of Charlotte, Raleigh and other metro areas."),
        ("gfiber","Select areas","Google Fiber serves parts of Charlotte and the Raleigh-Durham area."),
        ("brightspeed","Rural","Brightspeed serves parts of rural North Carolina."),
        ("tmobile","5G home","T-Mobile and Verizon 5G home internet work in many towns."),
        ("starlink","Rural","Starlink covers mountain and rural areas.")],
  rural="Mountain and rural eastern counties often have limited wired choices. Check fixed wireless and 5G home, then satellite.",
  hz=("Hurricane and storm season","Hurricanes and mountain storms can cause long outages. Keep a battery backup for the modem and router and a hotspot as a backup connection."),
  li="Spectrum Internet Assist, AT&T Access and the federal Lifeline program.",
  faq=[("Is Google Fiber in North Carolina?","In parts of Charlotte and the Raleigh-Durham area. Check your exact address."),
       ("What internet options exist in the NC mountains?","Fixed wireless, 5G home and satellite are common. Wired service is limited.")]),
]

import re
from data_more import S2
from data_batch3 import S3
S += S2 + S3
def cid(c): return "city-"+re.sub(r"[^a-z0-9]+","-",c.lower()).strip("-")

def header(): return f'''<header class="top"><div class="wrap bar"><a class="logo" href="/">US Cable Internet</a>
<nav aria-label="Main"><a href="/internet">Internet</a><a href="/fiber">Fiber</a><a href="/tv">TV</a><a href="/wireless">5G Wireless</a><a href="/check-address">Check Address</a><a href="/speed-test">Speed Test</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
<a class="call" href="tel:{PHONE_TEL}">Call {PHONE_DISPLAY}</a></div></header>'''

def footer(): return f'''<footer><div class="wrap"><nav aria-label="Footer"><a href="/internet">Internet Plans</a><a href="/fiber">Fiber</a><a href="/tv">TV</a><a href="/wireless">5G Wireless</a><a href="/states">Internet by State</a><a href="/about#methodology">Methodology</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/affiliate-disclosure">Affiliate disclosure</a><a href="/contact">Contact</a></nav>
<p>&copy; 2026 USCableInternet.com. Independent telecom comparison. Call <a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></p></div></footer>'''

def page(st):
    n, e = st["name"], html.escape
    url = f'{SITE}/internet-providers-{st["slug"]}.html'
    title = f"Internet Providers in {n}: Compare Fiber, Cable, 5G & Satellite (2026)"
    desc = f"Compare internet providers in {n}: " + ", ".join(NAMES[p[0]] for p in st["prov"][:4]) + ", 5G home and satellite. Check availability at your exact address."
    cards = "".join(f'<article class="card"><p class="tag">{e(t)}</p><h3>{e(NAMES[k])}</h3><p>{e(d)}</p>{link(k, "Check "+NAMES[k]+" availability")}</article>' for k,t,d in st["prov"])
    cities = "<ul class=\"cities\">" + "".join(f'<li id="{cid(c)}"><a href="/check-address#check">{e(c)}: check providers at your address</a></li>' for c in st["cities"]) + "</ul>"
    faq = "".join(f'<h3>{e(q)}</h3><p>{e(a)}</p>' for q,a in st["faq"])
    jsonld = json.dumps([
     {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Home","item":SITE+"/"},
        {"@type":"ListItem","position":2,"name":"All States","item":SITE+"/states"},
        {"@type":"ListItem","position":3,"name":n,"item":url}]},
     {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in st["faq"]]}])
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><link rel="canonical" href="{url}">
<meta property="og:type" content="article"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{url}"><meta property="og:site_name" content="US Cable Internet">
<link rel="stylesheet" href="/assets/state.css"><script type="application/ld+json">{jsonld}</script></head><body>
<p class="notice">US Cable Internet may earn commissions from some providers listed. <a href="/about#methodology">Learn more</a></p>
{header()}<main class="wrap"><p class="crumbs"><a href="/">Home</a> / <a href="/states">All States</a> / {e(n)}</p>
<h1>Internet Providers in {e(n)}</h1><p class="lead">{e(st["intro"])}</p>
<p class="meta">Last reviewed: {date.today().strftime("%B %Y")}. Plans, prices and availability change often. Confirm with the provider for your address.</p>
<section class="cta"><h2>See what reaches your address</h2><p>Enter your full street address. Availability can change from street to street.</p><a class="btn big" href="/check-address#check">Check my address</a> <a class="btn ghost" href="tel:{PHONE_TEL}">Call {PHONE_DISPLAY}</a></section>
<h2>Major internet providers in {e(n)}</h2><div class="grid">{cards}</div>
<h2>{e(n)} cities to start with</h2><p>{cities}</p>
<h2>Rural {e(n)} internet</h2><p>{e(st["rural"])}</p>
<h2>{e(st["hz"][0])}</h2><p>{e(st["hz"][1])}</p>
<h2>Low-income internet plans in {e(n)}</h2><p>The federal Affordable Connectivity Program has ended, but providers still offer discounted plans. Look at {e(st["li"])} Eligibility often depends on programs like SNAP, Medicaid or SSI. Confirm current rules on the provider's website.</p>
<h2>How to choose the right plan in {e(n)}</h2><p><strong>Check your exact address.</strong> Coverage changes from street to street, even in one city.</p><p><strong>Pick speed for your household.</strong> 300 to 500 Mbps suits most homes. Several remote workers or heavy gaming and streaming may need 1 Gig.</p><p><strong>Prefer fiber when you can get it.</strong> It is the most consistent option for uploads and video calls.</p><p><strong>Read the price details.</strong> Compare the promo price, how long it lasts, equipment fees and the regular rate after.</p>
<h2>Frequently asked questions</h2>{faq}
<p class="meta">Disclosure: some links on this page may be affiliate links. We may earn a commission at no extra cost to you. Plans, speeds and prices are set by providers and can change. Availability depends on your exact address.</p></main>{footer()}</body></html>'''

CSS = """*{box-sizing:border-box}body{margin:0;font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1b2430;background:#fff}
.wrap{max-width:1000px;margin:0 auto;padding:0 20px}a{color:#0b57d0}.notice{margin:0;padding:6px 20px;background:#f1f4f9;font-size:13px;text-align:center}
.top{border-bottom:1px solid #e3e8ef}.bar{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center;padding-top:12px;padding-bottom:12px}
.logo{font-weight:700;font-size:18px;text-decoration:none;color:#0b2a5b}nav a{margin-right:14px;text-decoration:none;font-size:15px}
.call{margin-left:auto;background:#0b57d0;color:#fff;padding:8px 14px;border-radius:6px;text-decoration:none;font-weight:600}
h1{font-size:2rem;line-height:1.2;margin:.4em 0}h2{margin-top:1.8em}.lead{font-size:1.1rem;max-width:70ch}.meta,.crumbs{font-size:14px;color:#51607a}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}.card{border:1px solid #e3e8ef;border-radius:8px;padding:16px}.card h3{margin:.2em 0}.tag{margin:0;font-size:13px;color:#51607a}
.btn{display:inline-block;background:#0b57d0;color:#fff;padding:8px 14px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600}.btn.big{padding:12px 20px;font-size:16px}
.btn.ghost{background:#fff;color:#0b57d0;border:1px solid #0b57d0;padding:11px 20px;font-size:16px}.cta{background:#f1f4f9;border-radius:8px;padding:8px 20px 20px;margin:20px 0}
ul.cities{padding-left:20px}footer{margin-top:48px;border-top:1px solid #e3e8ef;padding:20px 0;font-size:14px}footer nav a{display:inline-block;margin:0 14px 6px 0}
@media(max-width:640px){.call{margin-left:0}}"""

ALL_STATES = "alabama alaska arizona arkansas california colorado connecticut delaware florida georgia hawaii idaho illinois indiana iowa kansas kentucky louisiana maine maryland massachusetts michigan minnesota mississippi missouri montana nebraska nevada new-hampshire new-jersey new-mexico new-york north-carolina north-dakota ohio oklahoma oregon pennsylvania rhode-island south-carolina south-dakota tennessee texas utah vermont virginia washington west-virginia wisconsin wyoming".split()
CORE = ["", "internet","fiber","tv","wireless","check-address","speed-test","about","contact","privacy","terms","states","affiliate-disclosure"]

def disclosure():
    t="Affiliate Disclosure | US Cable Internet"
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{t}</title>
<meta name="description" content="How US Cable Internet earns money, how we compare internet providers, and what an affiliate link means for you."><link rel="canonical" href="{SITE}/affiliate-disclosure"><link rel="stylesheet" href="/assets/state.css"></head><body>
{header()}<main class="wrap"><h1>Affiliate Disclosure</h1>
<p>US Cable Internet is a free, independent comparison website. Some links on our pages are affiliate links. If you click one and sign up for a service, we may earn a commission from the provider. You pay the same price either way.</p>
<h2>How this affects our pages</h2><p>Commissions do not change the facts we show. We describe provider coverage and plan types as accurately as we can, and we tell you to confirm availability at your exact address on the provider's website.</p>
<h2>What we do not control</h2><p>Plans, prices, speeds, promotions and availability are set by providers and change often. Always confirm details with the provider before you order.</p>
<h2>Phone calls</h2><p>If you call {PHONE_DISPLAY}, you may be connected to a provider or an authorized sales partner.</p>
<h2>Questions</h2><p>Email <a href="mailto:info@uscableinternet.com">info@uscableinternet.com</a> or call <a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a>.</p>
<p class="meta">Last updated: {date.today().strftime("%B %Y")}</p></main>{footer()}</body></html>'''

if __name__ == "__main__":
    open("affiliate-disclosure.html","w").write(disclosure())
    os.makedirs("assets", exist_ok=True)
    open("assets/state.css","w").write(CSS)
    for st in S: open(f'internet-providers-{st["slug"]}.html',"w").write(page(st))
    urls = [f"{SITE}/{p}" for p in CORE] + [f"{SITE}/internet-providers-{s}.html" for s in ALL_STATES] \
         + [f"{SITE}/internet-providers-{c}-tx.html" for c in ("houston","dallas","san-antonio")]
    open("sitemap.xml","w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        "".join(f"<url><loc>{u}</loc><lastmod>{TODAY}</lastmod></url>\n" for u in urls) + "</urlset>\n")
    open("robots.txt","w").write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    print("built", len(S), "state pages,", len(urls), "sitemap URLs")
