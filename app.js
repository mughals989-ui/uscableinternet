var FS = "";
var PHONE = "888-630-3881";
var PHONE_LINK = "tel:8886303881";

var D = [
  ["i","Spectrum Internet","https://www.spectrum.com/internet","Cable","Up to 500 Mbps",30,"$30/mo"],
  ["i","Verizon Fios & 5G","https://www.verizon.com/home/fios-fastest-internet/","Fiber","300-940 Mbps",30,"$30/mo with mobile plan"],
  ["i","AT&T Internet & Fiber","https://www.att.com/internet/","Fiber","300-1,000 Mbps",35,"$35/mo"],
  ["i","T-Mobile 5G Home","https://www.t-mobile.com/home-internet","5G Home","72-245 Mbps",35,"$35/mo with voice line"],
  ["i","Xfinity","https://www.xfinity.com/learn/internet-service","Cable","Up to 800 Mbps",40,"$40/mo"],
  ["i","HughesNet","https://www.hughesnet.com/","Satellite","Up to 100 Mbps",39.99,"$39.99/mo"],
  ["i","Starlink","https://www.starlink.com/","Satellite","50-220 Mbps",55,"$55/mo"],
  ["t","Spectrum TV Select Plus","https://www.spectrum.com/cable-tv","Cable TV","160+ channels",69.99,"$69.99/mo for 12 mos"],
  ["t","Xfinity X1 TV","https://www.xfinity.com/learn/digital-cable-tv","Cable TV","185+ channels",70,"$70/mo"],
  ["t","DIRECTV Stream","https://www.directv.com/","Streaming","165+ channels",84.99,"$84.99/mo"],
  ["t","DISH Top 120","https://www.dish.com/","Satellite","190 channels",84.99,"$84.99/mo"],
  ["i","Cox Internet","https://www.cox.com/","Cable","Up to 2 Gbps",99,"See price at your address"],
  ["i","Optimum","https://www.optimum.com/","Cable","Up to 8 Gbps",99,"See price at your address"],
  ["i","Frontier Fiber","https://frontier.com/","Fiber","Up to 7 Gbps",99,"See price at your address"],
  ["i","Google Fiber","https://fiber.google.com/","Fiber","Up to 8 Gbps",99,"See price at your address"],
  ["i","Viasat","https://www.viasat.com/","Satellite","Up to 150 Mbps",99,"See price at your address"]
];

var $ = function(id) { return document.getElementById(id); };

function esc(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {"&":"&","<":"<",">":">",'"':""","'":"&#39;"}[c];
  });
}

var FOOT = {
  "Spectrum Internet":"AL CA CO CT FL GA HI ID IL IN KS KY LA MA ME MD MI MN MO MS MT NC NE NH NM NV NY OH OR PA SC SD TN TX UT VA VT WA WI WV WY",
  "AT&T Internet & Fiber":"AL AR CA FL GA IL IN KS KY LA MI MS MO NV NC OH OK SC TN TX WI",
  "Verizon Fios & 5G":"NY NJ PA MA RI MD VA DE DC",
  "Xfinity":"AL AR AZ CA CO CT DC DE FL GA IL IN KS KY LA MA MD ME MI MN MO MS NH NJ NM NY OR PA SC TN TX UT VA VT WA WI WV",
  "Cox Internet":"AZ AR CA CT FL GA ID IA KS LA MA NE NV NC OH OK RI VA",
  "Optimum":"AZ AR CA CT ID KS KY LA MO MS NC NJ NY OH OK PA TX WV",
  "Frontier Fiber":"AL AZ CA CT FL GA IA IL IN MI MN MS NC NE NM NV NY OH PA SC TN TX UT WI WV",
  "Google Fiber":"AL AZ CO GA IA ID KS MO NC NE NV TN TX UT"
};

var STN = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",
  FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",
  IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",
  ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",
  MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",
  OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",
  SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",
  UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",
  WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"
};

function stCode(name) {
  for (var k in STN) { if (STN[k] === name) return k; }
  return "";
}

function providersIn(state) {
  var nationwideSatellite = ["HughesNet", "Starlink", "Viasat"];
  return D.filter(function(p) {
    if (p[0] !== "i") return false;
    if (FOOT[p[1]]) return !!state && FOOT[p[1]].split(" ").indexOf(state) > -1;
    return nationwideSatellite.indexOf(p[1]) > -1;
  }).sort(function(a,b) { return a[5] - b[5]; });
}

function geo(params) {
  var url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&countrycodes=us";
  for (var k in params) { if (params[k]) url += "&" + k + "=" + encodeURIComponent(params[k]); }
  return fetch(url, {headers:{"Accept-Language":"en"}})
    .then(function(r) { return r.json(); })
    .then(function(data) { return data && data[0] ? data[0] : null; })
    .catch(function() { return null; });
}

(function() {
  var form = $("af");
  if (!form) return;
  var mode = "full";
  document.querySelectorAll(".mode").forEach(function(button) {
    button.onclick = function() {
      mode = button.dataset.mode;
      document.querySelectorAll(".mode").forEach(function(item) { item.classList.toggle("on", item === button); });
      document.querySelectorAll(".fr.full").forEach(function(row) { row.hidden = mode !== "full"; });
      var zipRow = document.querySelector(".fr.zip");
      if (zipRow) zipRow.hidden = mode !== "zip";
      if ($("ae")) $("ae").textContent = "";
    };
  });
  form.onsubmit = function(e) {
    e.preventDefault();
    var err = $("ae");
    var zipPattern = /^\d{5}(-\d{4})?$/;
    if (err) err.textContent = "";
    if (mode === "zip") {
      var zipOnly = $("z-zip") ? $("z-zip").value.trim() : "";
      if (!zipPattern.test(zipOnly)) { if (err) err.textContent = "Enter a valid 5-digit ZIP code."; return; }
      lookupArea({zip:zipOnly}, "ZIP code " + zipOnly);
      return;
    }
    var street = $("a-street") ? $("a-street").value.trim() : "";
    var unit = $("a-unit") ? $("a-unit").value.trim() : "";
    var city = $("a-city") ? $("a-city").value.trim() : "";
    var state = $("a-state") ? $("a-state").value : "";
    var zip = $("a-zip") ? $("a-zip").value.trim() : "";
    if (street.length < 3 || !/\d/.test(street)) { if (err) err.textContent = "Enter your street address with the house number."; return; }
    if (city.length < 2) { if (err) err.textContent = "Enter your city."; return; }
    if (!state) { if (err) err.textContent = "Select your state."; return; }
    if (!zipPattern.test(zip)) { if (err) err.textContent = "Enter a valid 5-digit ZIP code."; return; }
    var label = street + (unit ? ", " + unit : "") + ", " + city + ", " + state + " " + zip;
    lookupArea({street:street, unit:unit, city:city, state:state, zip:zip}, label);
  };
})();

function lookupArea(info, label) {
  var result = $("res");
  if (!result) return;
  result.hidden = false;
  result.innerHTML = '<p class="nt">Finding your area...</p>';
  var attempts = info.street ? [
    {street:info.street, city:info.city, state:info.state, postalcode:info.zip},
    {city:info.city, state:info.state, postalcode:info.zip},
    {postalcode:info.zip}
  ] : [{postalcode:info.zip}];
  function tryNext(i) {
    if (i >= attempts.length) { showArea(info, null, label); return; }
    geo(attempts[i]).then(function(location) {
      if (location) showArea(info, location, label);
      else tryNext(i + 1);
    });
  }
  tryNext(0);
}

function showArea(info, location, label) {
  var address = location && location.address || {};
  var stateCode = (address["ISO3166-2-lvl4"] || "").replace("US-", "");
  var area = {
    street:info.street ? info.street + (info.unit ? ", " + info.unit : "") : "",
    city:info.city || address.city || address.town || address.village || "",
    county:address.county || "",
    state:info.state || stateCode || stCode(address.state),
    zip:info.zip || address.postcode || "",
    lat:location ? parseFloat(location.lat) : NaN,
    lon:location ? parseFloat(location.lon) : NaN
  };
  var stateName = STN[area.state] || "";
  var place = [area.city, area.state].filter(Boolean).join(", ") || "ZIP " + area.zip;
  var list = providersIn(area.state);
  var rows = [["Address", area.street],["City", area.city],["County", area.county],["State", stateName ? stateName + " (" + area.state + ")" : area.state],["ZIP code", area.zip]];
  var result = $("res");
  result.innerHTML =
    '<div class="area"><h2>Internet providers to check in ' + esc(place) + '</h2>' +
    '<p class="nt" id="availability-note">' + list.length + ' potential providers to check. Confirm with each provider.</p>' +
    '<dl>' + rows.filter(function(row) { return row[1]; }).map(function(row) { return '<dt>' + row[0] + '</dt><dd>' + esc(row[1]) + '</dd>'; }).join("") + '</dl>' +
    '<a class="fcc" href="https://broadbandmap.fcc.gov/home" target="_blank" rel="noopener">Verify on FCC Broadband Map →</a>' +
    '<p><strong>Need help? Call <a href="' + PHONE_LINK + '">' + PHONE + '</a></strong></p></div>' +
    '<div class="chips rchips">' +
    [["all","All"],["Fiber","Fiber"],["Cable","Cable"],["5G Home","5G Home"],["Satellite","Satellite"]].map(function(c,i) {
      return '<button type="button" class="chip' + (i ? "" : " on") + '" data-f="' + c[0] + '">' + c[1] + '</button>';
    }).join("") + '</div><div id="rlist"></div>';

  function draw(filter) {
    var filtered = list.filter(function(p) {
      return filter === "all" || String(p[3]).toLowerCase().indexOf(String(filter).toLowerCase()) > -1;
    });
    $("rlist").innerHTML = filtered.length ? filtered.map(function(p) {
      return '<div class="row"><div style="min-width:0;flex:1"><b>' + esc(p[1]) + '</b><br><span class="nt">' + esc(p[3]) + ' · ' + esc(p[4]) + ' · ' + esc(p[6]) + '</span></div>' +
        (p[2] && p[2] !== "#" ? '<a class="btn" href="' + esc(p[2]) + '" target="_blank" rel="noopener">Visit Website</a>' : '') + '</div>';
    }).join("") : '<p class="nt">No providers listed for this filter.</p>';
  }
  draw("all");
  document.querySelectorAll(".rchips .chip").forEach(function(button) {
    button.onclick = function() {
      document.querySelectorAll(".rchips .chip").forEach(function(item) { item.classList.toggle("on", item === button); });
      draw(button.dataset.f);
    };
  });
}

function setupSpeedTest() {
  var button = $("sb");
  if (!button) return;
  button.onclick = async function() {
    button.disabled = true;
    button.textContent = "Testing...";
    if ($("ss")) $("ss").textContent = "Running...";
    if ($("sd")) $("sd").textContent = "--";
    if ($("su")) $("su").textContent = "--";
    if ($("sp")) $("sp").textContent = "--";
    try {
      var base = "https://speed.cloudflare.com/";
      var startPing = performance.now();
      await fetch(base + "__down?bytes=0", {cache:"no-store"});
      if ($("sp")) $("sp").textContent = Math.round(performance.now() - startPing);
      var startDown = performance.now();
      var downRes = await fetch(base + "__down?bytes=25000000", {cache:"no-store"});
      var downBuf = await downRes.arrayBuffer();
      if ($("sd")) $("sd").textContent = (downBuf.byteLength * 8 / ((performance.now() - startDown) / 1000) / 1e6).toFixed(1);
      var data = new Uint8Array(10000000);
      var startUpload = performance.now();
      await fetch(base + "__up", {method:"POST", body:data});
      if ($("su")) $("su").textContent = (data.length * 8 / ((performance.now() - startUpload) / 1000) / 1e6).toFixed(1);
      if ($("ss")) $("ss").textContent = "Done.";
    } catch(error) {
      if ($("ss")) $("ss").textContent = "Test failed. Try again.";
    }
    button.disabled = false;
    button.textContent = "Test Again";
  };
}
setupSpeedTest();



var LOGOS = {
  spectrum:"/spectrum.png",xfinity:"/xfinity.png",att:"/att.png",verizon:"/verizon.png",
  tmobile:"/tmobile.png",cox:"/Cox.png",optimum:"/Optimum.png",frontier:"/Frontier.png",
  googlefiber:"/Google%20Fiber.png",hughesnet:"/Hugesnet.png",starlink:"/Starlink.png",viasat:"/Viasat.png"
};
function logoKey(name) {
  var value = String(name).toLowerCase();
  var keys = [["google fiber","googlefiber"],["t-mobile","tmobile"],["at&t","att"],["spectrum","spectrum"],["xfinity","xfinity"],["verizon","verizon"],["cox","cox"],["optimum","optimum"],["frontier","frontier"],["hughesnet","hughesnet"],["starlink","starlink"],["viasat","viasat"]];
  for (var i = 0; i < keys.length; i++) { if (value.indexOf(keys[i][0]) !== -1) return keys[i][1]; }
  return "";
}
(function() {
  document.querySelectorAll(".names span").forEach(function(span) {
    var key = logoKey(span.textContent);
    if (!key || !LOGOS[key]) return;
    var image = new Image();
    image.className = "slogo";
    image.alt = span.textContent;
    image.onload = function() { span.textContent = ""; span.appendChild(image); span.classList.add("haslogo"); };
    image.src = LOGOS[key];
  });
})();

(function() {
  document.querySelectorAll(".chips[data-target]").forEach(function(group) {
    var grid = document.getElementById(group.getAttribute("data-target"));
    if (!grid) return;
    group.addEventListener("click", function(e) {
      var button = e.target.closest("button[data-f]");
      if (!button) return;
      var filter = String(button.getAttribute("data-f") || "all").toLowerCase();
      group.querySelectorAll("button[data-f]").forEach(function(item) { item.classList.toggle("on", item === button); });
      grid.querySelectorAll(".card[data-t]").forEach(function(card) {
        var type = String(card.getAttribute("data-t") || "").toLowerCase();
        var price = parseFloat(card.getAttribute("data-p"));
        var show = filter === "all" ||
          (filter === "fiber" && type.indexOf("fiber") !== -1) ||
          (filter === "cable" && type === "cable") ||
          (filter === "5g" && type === "5g") ||
          (filter === "satellite" && type.indexOf("satellite") !== -1) ||
          (filter === "u35" && isFinite(price) && price < 35) ||
          (filter === "cabletv" && type === "cabletv") ||
          (filter === "stream" && type === "stream");
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
