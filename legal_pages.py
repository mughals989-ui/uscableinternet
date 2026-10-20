import html
from datetime import date
from build import header, footer, SITE, PHONE_DISPLAY, PHONE_TEL
BUSINESS = ""   # e.g. "InternetTVSolutionsUSA LLC"  (shown on About, Privacy, Terms when filled in)
ADDRESS = ""    # e.g. "123 Main St, City, ST 12345"
EMAIL = "info@uscableinternet.com"
UPD = date.today().strftime("%B %Y")
def who(): 
    b = f"US Cable Internet is operated by {html.escape(BUSINESS)}." if BUSINESS else ""
    a = f" Mailing address: {html.escape(ADDRESS)}." if ADDRESS else ""
    return (b + a).strip()
def wrap(slug, title, desc, body):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title>
<meta name="description" content="{desc}"><link rel="canonical" href="{SITE}/{slug}"><meta property="og:type" content="website"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:url" content="{SITE}/{slug}"><meta property="og:site_name" content="US Cable Internet">
<link rel="stylesheet" href="/assets/state.css"></head><body><p class="notice">US Cable Internet may earn commissions from some providers listed. <a href="/affiliate-disclosure">Learn more</a></p>{header()}<main class="wrap">{body}<p class="meta">Last updated: {UPD}</p></main>{footer()}</body></html>'''
ABOUT = f'''<h1>About US Cable Internet</h1><p class="lead">US Cable Internet helps people in the United States compare internet, TV and wireless providers and find out who serves their address.</p>
<p>{who()} You can reach us by email at <a href="mailto:{EMAIL}">{EMAIL}</a> or by phone at <a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a>, Monday to Friday, 9:00 AM to 6:00 PM Eastern.</p>
<h2>What we do</h2><p>We organize provider and plan information by state and city, explain the differences between fiber, cable, 5G home internet and satellite, and send you to the provider's official site or to our team to check your exact address.</p>
<h2 id="methodology">How we compare providers</h2><p>We build our pages from the providers' own public plan pages, the FCC National Broadband Map and the FCC broadband labels that providers must publish. We describe coverage in general terms, such as which providers serve which parts of a state. Availability depends on your exact address, so we always tell you to confirm it with the provider.</p>
<p>We review our state pages regularly and show a "last reviewed" date on each one. We do not publish prices unless we can date them, because providers change prices and promotions often.</p>
<h2>How we make money</h2><p>This site is free to use. Some links are affiliate links, and we may earn a commission when you order through them. Calls to our number may be connected to a provider or an authorized sales partner. Commissions do not decide which providers we list or what we say about coverage. See our <a href="/affiliate-disclosure">affiliate disclosure</a>.</p>
<h2>Corrections</h2><p>If you see something wrong, such as a provider that does not serve a state or a plan that has changed, email <a href="mailto:{EMAIL}">{EMAIL}</a>. We check every report and fix errors quickly.</p>'''
PRIVACY = f'''<h1>Privacy Policy</h1><p class="lead">This policy explains what information US Cable Internet collects, how we use it and your choices. {who()}</p>
<h2>Information you give us</h2><p><strong>Address checker.</strong> The address or ZIP code you enter is used in your browser to list providers. To find your area and suggest addresses, it is sent to OpenStreetMap services (Nominatim and Photon). We do not receive or store it on our servers.</p>
<p><strong>Contact form, email and phone.</strong> If you write or call us, we use your name, email, phone number and message to reply and to help with your request. If you ask us to help you order service, we may share the details you give us with the provider or sales partner handling your order.</p>
<h2>Information collected automatically</h2><p>We use Google Analytics to understand how people use the site. It uses cookies and similar technology to collect pages viewed, device and browser type, approximate location and how you arrived at the site. You can block analytics cookies in your browser or use Google's opt-out tools.</p>
<h2>Affiliate and provider links</h2><p>When you click a link to a provider, you leave our site. The provider and any affiliate network may use their own cookies and tracking. Their privacy policies apply to what they collect.</p>
<h2>How we use information</h2><p>To run and improve the site, reply to you, help with orders you ask for, prevent abuse and meet legal duties.</p>
<h2 id="do-not-sell">Do not sell or share my information</h2><p>We do not sell your personal information for money. Affiliate and analytics tools may count as "sharing" under some state laws. To opt out or to make any privacy request, email <a href="mailto:{EMAIL}">{EMAIL}</a> and we will respond within the time your state's law requires.</p>
<h2>Your rights</h2><p>Depending on where you live, you may have the right to know what we hold about you, ask us to correct or delete it, and opt out of sharing. We do not discriminate against you for using these rights.</p>
<h2>Children</h2><p>This site is not for children under 13, and we do not knowingly collect their information.</p>
<h2>Security and retention</h2><p>We keep personal information only as long as needed for the purposes above and use reasonable measures to protect it. No online service is completely secure.</p>
<h2>Changes</h2><p>We will post updates here and change the date below.</p>
<h2>Accessibility</h2><p>We aim to make this site usable for everyone. Report problems to <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>'''
TERMS = f'''<h1>Terms of Use</h1><p class="lead">By using this site you agree to these terms. {who()}</p>
<h2>Information only</h2><p>Content on this site is for general information. Providers can change prices, terms, speeds and availability at any time. We make no guarantee that any provider or plan is available at your address. Confirm details with the provider before you order.</p>
<h2>Third-party sites</h2><p>Links go to websites we do not control. We are not responsible for their content, offers or privacy practices. Your agreement to buy service is with the provider.</p>
<h2>Affiliate relationships</h2><p>We may earn commissions from some providers. See our <a href="/affiliate-disclosure">affiliate disclosure</a>.</p>
<h2>Acceptable use</h2><p>Do not misuse the site, scrape it at scale, attempt to break it or use it for unlawful purposes. Do not copy our content without permission.</p>
<h2>Ownership</h2><p>The site's text, layout and design belong to US Cable Internet. Provider names and logos belong to their owners and are used only to identify them.</p>
<h2>No warranty and limit of liability</h2><p>The site is provided "as is" without warranties. To the fullest extent the law allows, we are not liable for losses arising from your use of the site or from decisions made using its content.</p>
<h2>Changes and contact</h2><p>We may update these terms and will change the date below. Questions: <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>'''
for slug,t,d,b in [("about","About US Cable Internet | Independent Internet & TV Comparison","Who runs US Cable Internet, how we compare providers, how we make money and how to report a correction.",ABOUT),
 ("privacy","Privacy Policy | US Cable Internet","How US Cable Internet handles addresses, messages, analytics and cookies, and how to make a privacy request.",PRIVACY),
 ("terms","Terms of Use | US Cable Internet","Terms of use for US Cable Internet. Content is informational and provider prices and availability can change.",TERMS)]:
    open(f"{slug}.html","w").write(wrap(slug,html.escape(t),html.escape(d),b))
print("legal pages built")
