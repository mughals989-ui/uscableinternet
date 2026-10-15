var FS=""; // PASTE YOUR FORMSPREE FORM ID HERE, e.g. var FS="xyzabcde";
var D=[["i", "Spectrum Internet", "https://www.spectrum.com/internet", "Cable", "Up to 500 Mbps", 30, "$30/mo"], ["i", "Verizon Fios & 5G", "https://www.verizon.com/home/fios-fastest-internet/", "Fiber", "300-940 Mbps", 30, "$30/mo with mobile plan"], ["i", "AT&T Internet & Fiber", "https://www.att.com/internet/", "Fiber", "300-1,000 Mbps", 35, "$35/mo"], ["i", "T-Mobile 5G Home", "https://www.t-mobile.com/home-internet", "5G Home", "72-245 Mbps", 35, "$35/mo with voice line"], ["i", "Xfinity", "https://www.xfinity.com/learn/internet-service", "Cable", "Up to 800 Mbps", 40, "$40/mo"], ["i", "HughesNet", "https://www.hughesnet.com/", "Satellite", "Up to 100 Mbps", 39.99, "$39.99/mo"], ["i", "Starlink", "https://www.starlink.com/", "Satellite", "50-220 Mbps", 55, "$55/mo"], ["t", "Spectrum TV Select Plus", "https://www.spectrum.com/cable-tv", "Cable TV", "160+ channels", 69.99, "$69.99/mo for 12 mos"], ["t", "Xfinity X1 TV", "https://www.xfinity.com/learn/digital-cable-tv", "Cable TV", "185+ channels", 70, "$70/mo"], ["t", "DIRECTV Stream", "https://www.directv.com/", "Streaming", "165+ channels", 84.99, "$84.99/mo"], ["t", "DISH Top 120", "https://www.dish.com/", "Satellite", "190 channels", 84.99, "$84.99/mo"], ["w", "Verizon Unlimited Plus", "https://www.verizon.com/plans/unlimited/", "5G Unlimited", "Unlimited data", 65, "$65/line"], ["w", "T-Mobile Go5G Plus", "https://www.t-mobile.com/cell-phone-plans", "5G Unlimited", "Unlimited data", 70, "$70/line with AutoPay"], ["w", "AT&T Unlimited Premium", "https://www.att.com/plans/unlimited-data-plans/", "5G Unlimited", "Unlimited data", 65.99, "$65.99/line with AutoPay"]];
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
document.querySelectorAll(".chips").forEach(function(c){c.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;
c.querySelectorAll(".chip").forEach(function(x){x.classList.remove("on")});b.classList.add("on");var f=b.dataset.f;
document.querySelectorAll("#"+c.dataset.target+" .card").forEach(function(k){k.hidden=!(f=="all"||(f=="u35"?+k.dataset.p<=35:k.dataset.t==f))})})});
(function(){var af=$("af");if(!af)return;var mode="full";
document.querySelectorAll(".mode").forEach(function(b){b.onclick=function(){mode=b.dataset.mode;
document.querySelectorAll(".mode").forEach(function(x){x.classList.toggle("on",x==b)});
document.querySelectorAll(".fr.full").forEach(function(r){r.hidden=mode!="full"});document.querySelector(".fr.zip").hidden=mode!="zip";$("ae").textContent=""}});
try{var s=JSON.parse(sessionStorage.getItem("addr")||"null");if(s){$("a-street").value=s.street||"";$("a-unit").value=s.unit||"";$("a-city").value=s.city||"";$("a-state").value=s.state||"";$("a-zip").value=s.zip||""}}catch(e){}
af.onsubmit=function(e){e.preventDefault();var err=$("ae"),z=/^\d{5}(-\d{4})?$/,label;err.textContent="";
if(mode=="zip"){var zz=$("z-zip").value.trim();if(!z.test(zz)){err.textContent="Enter a valid 5-digit ZIP code.";$("z-zip").focus();return}label="ZIP code "+zz}
else{var st=$("a-street").value.trim(),un=$("a-unit").value.trim(),ci=$("a-city").value.trim(),sa=$("a-state").value,zi=$("a-zip").value.trim();
if(st.length<3||!/\d/.test(st)){err.textContent="Enter your street address with the house number, for example 123 Main St.";$("a-street").focus();return}
if(ci.length<2){err.textContent="Enter your city.";$("a-city").focus();return}
if(!sa){err.textContent="Select your state.";$("a-state").focus();return}
if(!z.test(zi)){err.textContent="Enter a valid 5-digit ZIP code.";$("a-zip").focus();return}
label=st+(un?", "+un:"")+", "+ci+", "+sa+" "+zi;
try{sessionStorage.setItem("addr",JSON.stringify({street:st,unit:un,city:ci,state:sa,zip:zi}))}catch(x){}}
var l=D.filter(function(p){return p[0]=="i"}).sort(function(a,b){return a[5]-b[5]});
var r=$("res");r.hidden=false;
r.innerHTML='<h2>Internet providers to check for '+esc(label)+'</h2><p class="nt">Availability depends on your exact address. Open a provider and enter this address to confirm. Sorted by starting price.</p><button type="button" class="ghost" id="cp">Copy address</button>'+
l.map(function(p){return '<div class="row"><div><b>'+esc(p[1])+'</b><br><span class="nt">'+esc(p[3])+' &middot; '+esc(p[4])+' &middot; '+esc(p[6])+'</span></div><a class="btn" href="'+esc(p[2])+'" target="_blank" rel="sponsored noopener">Check</a></div>'}).join("");
$("cp").onclick=function(){var b=this;if(navigator.clipboard){navigator.clipboard.writeText(label).then(function(){b.textContent="Copied"},function(){b.textContent="Copy failed"})}};
r.scrollIntoView({behavior:"smooth",block:"nearest"})}})();
if($("cf"))$("cf").onsubmit=async function(e){e.preventDefault();var f=e.target,d=new FormData(f),m=$("cm");
if(d.get("website"))return;
if(!FS){location.href="mailto:info@uscableinternet.com?subject="+encodeURIComponent("["+d.get("topic")+"] "+d.get("name"))+"&body="+encodeURIComponent(d.get("message")+"\n\nFrom: "+d.get("name")+" ("+d.get("email")+")");m.textContent="Opening your email app...";return}
m.textContent="Sending...";
try{var r=await fetch("https://formspree.io/f/"+FS,{method:"POST",headers:{Accept:"application/json"},body:d});
if(r.ok){f.reset();m.textContent="Thanks! Your message was sent."}else m.textContent="Could not send. Please email info@uscableinternet.com."}
catch(x){m.textContent="Could not send. Please email info@uscableinternet.com."}};
if($("sb"))$("sb").onclick=async function(){var b=$("sb"),B="https://speed.cloudflare.com/";b.disabled=true;
try{$("ss").textContent="Testing ping...";var m=1e9;
for(var i=0;i<4;i++){var t=performance.now();await fetch(B+"__down?bytes=0&r="+Math.random(),{cache:"no-store"});m=Math.min(m,performance.now()-t)}
$("sp").textContent=Math.round(m);
$("ss").textContent="Testing download...";var t=performance.now();var r=await fetch(B+"__down?bytes=25000000&r="+Math.random(),{cache:"no-store"});var buf=await r.arrayBuffer();
$("sd").textContent=(buf.byteLength*8/((performance.now()-t)/1000)/1e6).toFixed(1);
$("ss").textContent="Testing upload...";var d=new Uint8Array(5000000);t=performance.now();await fetch(B+"__up",{method:"POST",body:d});
$("su").textContent=(d.length*8/((performance.now()-t)/1000)/1e6).toFixed(1);
$("ss").textContent="Done."}catch(e){$("ss").textContent="Test failed. Check your connection and try again."}
b.disabled=false;b.textContent="Test Again"};
