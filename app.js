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
lookupArea(mode=="zip"?{zip:zz}:{street:st,unit:un,city:ci,state:sa,zip:zi},label)}})();
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

/* ---- Photo collage behind homepage hero ---- */
(function(){
  var hero=document.querySelector(".hero-home");
  if(!hero||hero.querySelector(".hero-collage"))return;
  // To use your own photos: upload them to an /images/ folder and replace these with "/images/1.jpg", "/images/2.jpg", etc.
  var PHOTOS=["family,television","wifi,router","laptop,home","city,night","smartphone,streaming","gaming,console","living,room","satellite,dish"];
  var ORDER=[[0,1,2,3],[4,5,6,7],[2,0,5,1],[6,3,7,4],[1,7,0,5],[5,2,4,6],[3,6,1,4]];
  var wall=document.createElement("div");wall.className="hero-collage";wall.setAttribute("aria-hidden","true");
  ORDER.forEach(function(list){
    var col=document.createElement("div");col.className="col";
    list.concat(list,list).forEach(function(i){
      var img=document.createElement("img"),p=PHOTOS[i];
      img.alt="";img.decoding="async";
      img.src=(p.charAt(0)=="/"||p.indexOf("http")==0)?p:"https://loremflickr.com/800/500/"+p+"?lock="+(i+21);
      img.onerror=function(){img.onerror=null;img.src="https://picsum.photos/seed/uscable"+i+"/800/500";};
      col.appendChild(img);
    });
    wall.appendChild(col);
  });
  var shade=document.createElement("div");shade.className="hero-shade";
  hero.insertBefore(shade,hero.firstChild);
  hero.insertBefore(wall,hero.firstChild);
})();

/* ---- Address checker: area lookup, provider matching by state, type filters, address suggestions ---- */
D=D.concat([
 ["i","Cox Internet","https://www.cox.com/","Cable","Up to 2 Gbps",99,"See price at your address"],
 ["i","Optimum","https://www.optimum.com/","Cable","Up to 8 Gbps",99,"See price at your address"],
 ["i","Frontier Fiber","https://frontier.com/","Fiber","Up to 7 Gbps",99,"See price at your address"],
 ["i","Google Fiber","https://fiber.google.com/","Fiber","Up to 8 Gbps",99,"See price at your address"],
 ["i","Verizon 5G Home","https://www.verizon.com/home/internet/5g/","5G Home","Up to 1 Gbps",99,"See price at your address"],
 ["i","AT&T Internet Air","https://www.att.com/internet/internet-air/","5G Home","Up to 300 Mbps",99,"See price at your address"],
 ["i","Viasat","https://www.viasat.com/","Satellite","Up to 150 Mbps",99,"See price at your address"]
]);
// States each wired provider serves (providers not listed here are shown everywhere)
var FOOT={
 "Spectrum Internet":"AL CA CO CT FL GA HI ID IL IN KS KY LA MA ME MD MI MN MO MS MT NC NE NH NM NV NY OH OR PA SC SD TN TX UT VA VT WA WI WV WY",
 "AT&T Internet & Fiber":"AL AR CA FL GA IL IN KS KY LA MI MS MO NV NC OH OK SC TN TX WI",
 "Verizon Fios & 5G":"NY NJ PA MA RI MD VA DE DC",
 "Xfinity":"AL AR AZ CA CO CT DC DE FL GA IL IN KS KY LA MA MD ME MI MN MO MS NH NJ NM NY OR PA SC TN TX UT VA VT WA WI WV",
 "Cox Internet":"AZ AR CA CT FL GA ID IA KS LA MA NE NV NC OH OK RI VA",
 "Optimum":"AZ AR CA CT ID KS KY LA MO MS NC NJ NY OH OK PA TX WV",
 "Frontier Fiber":"AL AZ CA CT FL GA IA IL IN MI MN MS NC NE NM NV NY OH PA SC TN TX UT WI WV",
 "Google Fiber":"AL AZ CO GA IA ID KS MO NC NE NV TN TX UT"
};
var STN={AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
function stCode(name){for(var k in STN){if(STN[k]==name)return k}return ""}
function providersIn(sa){return D.filter(function(p){return p[0]=="i"&&(!sa||!FOOT[p[1]]||FOOT[p[1]].split(" ").indexOf(sa)>-1)}).sort(function(a,b){return a[5]-b[5]})}
function geo(params){
 var u="https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&countrycodes=us";
 for(var k in params){if(params[k])u+="&"+k+"="+encodeURIComponent(params[k])}
 return fetch(u,{headers:{"Accept-Language":"en"}}).then(function(x){return x.json()}).then(function(d){return d&&d[0]?d[0]:null}).catch(function(){return null});
}
function lookupArea(info,label){
 var r=$("res");r.hidden=false;r.innerHTML='<p class="nt">Finding your area&hellip;</p>';
 var tries=info.street?[{street:info.street,city:info.city,state:info.state,postalcode:info.zip},{city:info.city,state:info.state,postalcode:info.zip},{postalcode:info.zip}]:[{postalcode:info.zip}];
 (function next(i){
  if(i>=tries.length){showArea(info,null,label);return}
  geo(tries[i]).then(function(g){if(g)showArea(info,g,label);else next(i+1)});
 })(0);
}
function showArea(info,g,label){
 var a=(g&&g.address)||{},code=(a["ISO3166-2-lvl4"]||"").replace("US-","");
 var area={street:info.street?info.street+(info.unit?", "+info.unit:""):"",city:info.city||a.city||a.town||a.village||a.hamlet||a.suburb||"",
  county:a.county||"",state:info.state||code||stCode(a.state),zip:info.zip||a.postcode||"",lat:g?parseFloat(g.lat):NaN,lon:g?parseFloat(g.lon):NaN};
 var sName=STN[area.state]||"",place=[area.city,area.state].filter(Boolean).join(", ")||("ZIP "+area.zip);
 var list=providersIn(area.state),wired=list.filter(function(p){return FOOT[p[1]]}).length;
 var rows=[["Address",area.street],["City",area.city],["County",area.county],["State",sName?sName+" ("+area.state+")":area.state],["ZIP code",area.zip]];
 var map="";
 if(isFinite(area.lat)&&isFinite(area.lon)){var d=.02;map='<iframe title="Map of your area" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox='+(area.lon-d)+','+(area.lat-d*.6)+','+(area.lon+d)+','+(area.lat+d*.6)+'&layer=mapnik&marker='+area.lat+','+area.lon+'"></iframe>'}
 var r=$("res");
 r.innerHTML='<div class="area"><h2>Internet providers in '+esc(place)+'</h2>'+
  (g?'':'<p class="err">We couldn&#x27;t place this address on the map, so these results are based on '+(sName?esc(sName):"the whole US")+'.</p>')+
  '<p class="nt">'+list.length+' providers may serve this area ('+wired+' cable/fiber in '+(sName?esc(sName):"your state")+', plus nationwide 5G and satellite).</p>'+
  '<dl>'+rows.filter(function(x){return x[1]}).map(function(x){return '<dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd>'}).join("")+'</dl>'+map+
  '<a class="fcc" href="https://broadbandmap.fcc.gov/home" target="_blank" rel="noopener">Verify exact availability on the FCC Broadband Map &rarr;</a></div>'+
  '<div class="chips rchips">'+[["all","All"],["Fiber","Fiber"],["Cable","Cable"],["5G Home","5G Home"],["Satellite","Satellite"]].map(function(c,i){return '<button type="button" class="chip'+(i?'':' on')+'" data-f="'+c[0]+'">'+c[1]+'</button>'}).join("")+'</div>'+
  '<p class="nt">Availability depends on your exact address. Open a provider and enter this address to confirm. Sorted by starting price.</p>'+
  '<button type="button" class="ghost" id="cp">Copy address</button><div id="rlist"></div>';
 function draw(f){
  var l=list.filter(function(p){return f=="all"||p[3]==f});
  $("rlist").innerHTML=l.length?l.map(function(p){return '<div class="row"><div>'+logoTag(p[1])+'<b>'+esc(p[1])+'</b><br><span class="nt">'+esc(p[3])+' &middot; '+esc(p[4])+' &middot; '+esc(p[6])+(FOOT[p[1]]&&sName?' &middot; Serves parts of '+esc(sName):'')+'</span></div><a class="btn" href="'+esc(p[2])+'" target="_blank" rel="sponsored noopener">Check</a></div>'}).join(""):'<p class="nt">No '+esc(f)+' providers listed for this area.</p>';
 }
 draw("all");
 r.querySelector(".rchips").onclick=function(e){var b=e.target.closest(".chip");if(!b)return;
  this.querySelectorAll(".chip").forEach(function(x){x.classList.toggle("on",x==b)});draw(b.dataset.f)};
 $("cp").onclick=function(){var b=this;if(navigator.clipboard){navigator.clipboard.writeText(label).then(function(){b.textContent="Copied"},function(){b.textContent="Copy failed"})}};
 r.scrollIntoView({behavior:"smooth",block:"nearest"});
}
// Address suggestions as you type the street (fills city, state and ZIP)
(function(){
 var inp=$("a-street");if(!inp)return;
 var ul=document.createElement("ul");ul.className="sug";inp.parentNode.appendChild(ul);
 var t,items=[],act=-1;
 function close(){ul.innerHTML="";ul.classList.remove("open");act=-1}
 function pick(i){var p=items[i];if(!p)return;
  inp.value=[p.housenumber,p.street].filter(Boolean).join(" ")||p.name||inp.value;
  if($("a-city"))$("a-city").value=p.city||p.town||p.village||p.district||"";
  if($("a-state")&&STN[stCode(p.state)])$("a-state").value=stCode(p.state);
  if($("a-zip")&&p.postcode)$("a-zip").value=p.postcode;
  close();
 }
 inp.addEventListener("input",function(){
  clearTimeout(t);var q=inp.value.trim();if(q.length<4){close();return}
  t=setTimeout(function(){
   fetch("https://photon.komoot.io/api/?limit=8&lang=en&bbox=-179.2,18.9,-66.9,71.4&q="+encodeURIComponent(q)).then(function(x){return x.json()}).then(function(d){
    items=(d.features||[]).map(function(f){return f.properties||{}}).filter(function(p){return p.countrycode=="US"&&p.street&&stCode(p.state)}).slice(0,6);
    if(!items.length){close();return}
    ul.innerHTML=items.map(function(p,i){return '<li data-i="'+i+'">'+esc([p.housenumber,p.street].filter(Boolean).join(" "))+'<small>'+esc([p.city||p.town||p.village||p.district,stCode(p.state),p.postcode].filter(Boolean).join(", "))+'</small></li>'}).join("");
    ul.classList.add("open");act=-1;
   }).catch(close);
  },300);
 });
 inp.addEventListener("keydown",function(e){
  if(!ul.classList.contains("open"))return;
  if(e.key=="ArrowDown"||e.key=="ArrowUp"){e.preventDefault();act=Math.max(0,Math.min(items.length-1,act+(e.key=="ArrowDown"?1:-1)));
   [].forEach.call(ul.children,function(li,i){li.classList.toggle("on",i==act)})}
  else if(e.key=="Enter"&&act>-1){e.preventDefault();pick(act)}
  else if(e.key=="Escape")close();
 });
 ul.addEventListener("mousedown",function(e){var li=e.target.closest("li");if(li){e.preventDefault();pick(+li.dataset.i)}});
 inp.addEventListener("blur",function(){setTimeout(close,150)});
})();

/* ---- Provider logos ----
   Put each provider's official logo in the main folder of your repo, using these exact file names.
   Use .png or .svg (change the extension below to match). If a file is missing, the name shows as text. */
var LOGOS={
 spectrum:"/spectrum.png", xfinity:"/xfinity.png", att:"/att.png", verizon:"/verizon.png",
 tmobile:"/tmobile.png", cox:"/Cox.png", optimum:"/Optimum.png", frontier:"/Frontier.png",
 googlefiber:"/Google%20Fiber.png", hughesnet:"/Hugesnet.png", starlink:"/Starlink.png",
 viasat:"/Viasat.png", directv:"/Directv.png", dish:"/Dish.png"
};
function logoKey(name){
 var n=String(name).toLowerCase().replace(/&amp;/g,"&");
 var keys=[["google fiber","googlefiber"],["t-mobile","tmobile"],["at&t","att"],["spectrum","spectrum"],["xfinity","xfinity"],["verizon","verizon"],
  ["cox","cox"],["optimum","optimum"],["frontier","frontier"],["hughesnet","hughesnet"],["starlink","starlink"],["viasat","viasat"],["directv","directv"],["dish","dish"]];
 for(var i=0;i<keys.length;i++){if(n.indexOf(keys[i][0])>-1)return keys[i][1]}
 return "";
}
function logoTag(name){
 var k=logoKey(name);if(!k||!LOGOS[k])return "";
 return '<img class="plogo" src="'+LOGOS[k]+'" alt="" onerror="this.remove()">';
}
(function(){
 // Provider name strip: swap each name for its logo once the logo file loads
 document.querySelectorAll(".strip .names span").forEach(function(sp){
  var k=logoKey(sp.textContent);if(!k||!LOGOS[k])return;
  var img=new Image();img.className="slogo";img.alt=sp.textContent;
  img.onload=function(){sp.textContent="";sp.appendChild(img);sp.classList.add("haslogo")};
  img.src=LOGOS[k];
 });
 // Provider cards: add the logo above the name
 document.querySelectorAll("article.card h3").forEach(function(h){
  var k=logoKey(h.textContent);if(!k||!LOGOS[k])return;
  var img=new Image();img.className="clogo";img.alt="";
  img.onload=function(){h.parentNode.insertBefore(img,h.parentNode.firstChild)};
  img.src=LOGOS[k];
 });
})();

/* ---- Site logo (Option C: Star Signal) on every page, plus favicon ---- */
(function(){
  var STAR="M22 22L24.35 28.76 31.51 28.91 25.8 33.24 27.88 40.09 22 36 16.12 40.09 18.2 33.24 12.49 28.91 19.65 28.76Z";
  function icon(bg,fg,acc){return '<svg width="40" height="40" viewBox="0 0 56 56" aria-hidden="true" focusable="false"><circle cx="28" cy="28" r="27" fill="'+bg+'"/><path d="'+STAR+'" fill="'+fg+'"/><path d="M25.88 17.51A15 15 0 0 1 36.49 28.12" fill="none" stroke="'+fg+'" stroke-width="3.6" stroke-linecap="round"/><path d="M27.44 11.72A21 21 0 0 1 42.28 26.56" fill="none" stroke="'+acc+'" stroke-width="3.6" stroke-linecap="round"/></svg>'}
  var TEXT='<span class="lt"><span class="l1">US CABLE</span><span class="l2">INTERNET</span></span>';
  var h=document.querySelector("header a.logo");
  if(h&&!h.querySelector("svg")){h.innerHTML=icon("#0b1f4d","#fff","#d61f45")+TEXT;h.setAttribute("aria-label","US Cable Internet home")}
  var fw=document.querySelector("footer .w");
  if(fw&&!fw.querySelector(".flogo")){var a=document.createElement("a");a.className="logo flogo";a.href="/";a.setAttribute("aria-label","US Cable Internet home");a.innerHTML=icon("#fff","#0b1f4d","#d61f45")+TEXT;fw.insertBefore(a,fw.firstChild)}
  function addLink(rel,href,extra){if(document.querySelector('link[rel="'+rel+'"][href="'+href+'"]'))return;var l=document.createElement("link");l.rel=rel;l.href=href;for(var k in extra)l.setAttribute(k,extra[k]);document.head.appendChild(l)}
  addLink("icon","/favicon.svg",{type:"image/svg+xml"});
  addLink("apple-touch-icon","/apple-touch-icon.png",{});
  addLink("stylesheet","https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&display=swap",{});
})();
