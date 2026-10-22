var FS = "";
var PHONE = "888-630-3881";
var PHONE_LINK = "tel:8886303881";

// Verified official provider destinations for names returned by the FCC map.
var providerUrls = {
  "Kinetic":"https://www.gokinetic.com/",
  "Kinetic by Windstream":"https://www.gokinetic.com/",
  "Smart Way Communications":"https://thinksmartway.com/"
};

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
  ["w","Verizon Unlimited Plus","https://www.verizon.com/plans/unlimited/","5G Unlimited","Unlimited data",65,"$65/line"],
  ["w","T-Mobile Go5G Plus","https://www.t-mobile.com/cell-phone-plans","5G Unlimited","Unlimited data",70,"$70/line with AutoPay"],
  ["w","AT&T Unlimited Premium","https://www.att.com/plans/unlimited-data-plans/","5G Unlimited","Unlimited data",65.99,"$65.99/line with AutoPay"],
  ["i","Cox Internet","https://www.cox.com/","Cable","Up to 2 Gbps",99,"See price at your address"],
  ["i","Optimum","https://www.optimum.com/","Cable","Up to 8 Gbps",99,"See price at your address"],
  ["i","Frontier Fiber","https://frontier.com/","Fiber","Up to 7 Gbps",99,"See price at your address"],
  ["i","Google Fiber","https://fiber.google.com/","Fiber","Up to 8 Gbps",99,"See price at your address"],
  ["i","Verizon 5G Home","https://www.verizon.com/home/internet/5g/","5G Home","Up to 1 Gbps",99,"See price at your address"],
  ["i","AT&T Internet Air","https://www.att.com/internet/internet-air/","5G Home","Up to 300 Mbps",99,"See price at your address"],
  ["i","Viasat","https://www.viasat.com/","Satellite","Up to 150 Mbps",99,"See price at your address"],
  ["i","Kinetic by Windstream","https://www.windstream.com/","Fiber & DSL","Up to 8 Gbps",99,"See price at your address"],
  ["i","Brightspeed","https://www.brightspeed.com/","Fiber & DSL","Up to 2 Gbps",99,"See price at your address"],
  ["i","Mediacom","https://mediacomcable.com/","Cable","Up to 2 Gbps",99,"See price at your address"],
  ["i","Quantum Fiber","https://www.quantumfiber.com/","Fiber","Up to 8 Gbps",99,"See price at your address"],
  ["i","Ziply Fiber","https://ziplyfiber.com/","Fiber","Up to 10 Gbps",99,"See price at your address"]
];

var $ = function(id) {
  return document.getElementById(id);
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    }[c];
  });
}

/* Provider states */
var FOOT = {
  "Spectrum Internet":"AL CA CO CT FL GA HI ID IL IN KS KY LA MA ME MD MI MN MO MS MT NC NE NH NM NV NY OH OR PA SC SD TN TX UT VA VT WA WI WV WY",
  "AT&T Internet & Fiber":"AL AR CA FL GA IL IN KS KY LA MI MS MO NV NC OH OK SC TN TX WI",
  "Verizon Fios & 5G":"NY NJ PA MA RI MD VA DE DC",
  "Xfinity":"AL AR AZ CA CO CT DC DE FL GA IL IN KS KY LA MA MD ME MI MN MO MS NH NJ NM NY OR PA SC TN TX UT VA VT WA WI WV",
  "Cox Internet":"AZ AR CA CT FL GA ID IA KS LA MA NE NV NC OH OK RI VA",
  "Optimum":"AZ AR CA CT ID KS KY LA MO MS NC NJ NY OH OK PA TX WV",
  "Frontier Fiber":"AL AZ CA CT FL GA IA IL IN MI MN MS NC NE NM NV NY OH PA SC TN TX UT WI WV",
  "Google Fiber":"AL AZ CO GA IA ID KS MO NC NE NV TN TX UT",
  "Kinetic by Windstream":"AL AR FL GA IA KY MN MS MO NE NM NY NC OH OK PA SC TX",
  "Brightspeed":"AR GA IL IN KS LA MI MS MO NJ NC OH OK PA SC TN TX VA WI",
  "Mediacom":"FL GA IA IL IN KS MN MO VA WI",
  "Quantum Fiber":"AZ CO FL IA ID MN NE NV OR UT WA",
  "Ziply Fiber":"ID MT OR WA"
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
  for (var k in STN) {
    if (STN[k] === name) return k;
  }
  return "";
}

function providersIn(state) {
  var nationwideSatellite = ["HughesNet", "Starlink", "Viasat"];
  return D.filter(function(p) {
    if (p[0] !== "i") return false;
    if (FOOT[p[1]]) {
      return !!state && FOOT[p[1]].split(" ").indexOf(state) > -1;
    }
    return nationwideSatellite.indexOf(p[1]) > -1;
  }).sort(function(a,b) {
    return a[5] - b[5];
  });
}

function geo(params) {
  var url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=1&countrycodes=us";
  for (var k in params) {
    if (params[k]) url += "&" + k + "=" + encodeURIComponent(params[k]);
  }
  return fetch(url, {headers:{"Accept-Language":"en"}})
    .then(function(r) { return r.json(); })
    .then(function(data) { return data && data[0] ? data[0] : null; })
    .catch(function() { return null; });
}

/* Address form */
(function() {
  var form = $("af");
  if (!form) return;

  var mode = "full";

  document.querySelectorAll(".mode").forEach(function(button) {
    button.onclick = function() {
      mode = button.dataset.mode;
      document.querySelectorAll(".mode").forEach(function(item) {
        item.classList.toggle("on", item === button);
      });
      document.querySelectorAll(".fr.full").forEach(function(row) {
        row.hidden = mode !== "full";
      });
      document.querySelector(".fr.zip").hidden = mode !== "zip";
      $("ae").textContent = "";
    };
  });

  try {
    var saved = JSON.parse(sessionStorage.getItem("addr") || "null");
    if (saved) {
      $("a-street").value = saved.street || "";
      $("a-unit").value = saved.unit || "";
      $("a-city").value = saved.city || "";
      $("a-state").value = saved.state || "";
      $("a-zip").value = saved.zip || "";
    }
  } catch(e) {}

  form.onsubmit = function(e) {
    e.preventDefault();

    var err = $("ae");
    var zipPattern = /^\d{5}(-\d{4})?$/;
    err.textContent = "";

    if (mode === "zip") {
      var zipOnly = $("z-zip").value.trim();

      if (!zipPattern.test(zipOnly)) {
        err.textContent = "Enter a valid 5-digit ZIP code.";
        $("z-zip").focus();
        return;
      }

      lookupArea({zip:zipOnly}, "ZIP code " + zipOnly);
      return;
    }

    var street = $("a-street").value.trim();
    var unit = $("a-unit").value.trim();
    var city = $("a-city").value.trim();
    var state = $("a-state").value;
    var zip = $("a-zip").value.trim();

    if (street.length < 3 || !/\d/.test(street)) {
      err.textContent = "Enter your street address with the house number, for example 123 Main St.";
      $("a-street").focus();
      return;
    }
    if (city.length < 2) {
      err.textContent = "Enter your city.";
      $("a-city").focus();
      return;
    }
    if (!state) {
      err.textContent = "Select your state.";
      $("a-state").focus();
      return;
    }
    if (!zipPattern.test(zip)) {
      err.textContent = "Enter a valid 5-digit ZIP code.";
      $("a-zip").focus();
      return;
    }

    var label = street + (unit ? ", " + unit : "") + ", " + city + ", " + state + " " + zip;

    try {
      sessionStorage.setItem("addr", JSON.stringify({
        street:street, unit:unit, city:city, state:state, zip:zip
      }));
    } catch(x) {}

    lookupArea({
      street:street, unit:unit, city:city, state:state, zip:zip
    }, label);
  };
})();

function lookupArea(info, label) {
  var result = $("res");
  result.hidden = false;
  result.innerHTML = '<p class="nt">Finding your area...</p>';

  var attempts = info.street ? [
    {street:info.street, city:info.city, state:info.state, postalcode:info.zip},
    {city:info.city, state:info.state, postalcode:info.zip},
    {postalcode:info.zip}
  ] : [{postalcode:info.zip}];

  function tryNext(i) {
    if (i >= attempts.length) {
      showArea(info, null, label);
      return;
    }
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
    city:info.city || address.city || address.town || address.village || address.hamlet || address.suburb || "",
    county:address.county || "",
    state:info.state || stateCode || stCode(address.state),
    zip:info.zip || address.postcode || "",
    lat:location ? parseFloat(location.lat) : NaN,
    lon:location ? parseFloat(location.lon) : NaN
  };

  var stateName = STN[area.state] || "";
  var place = [area.city, area.state].filter(Boolean).join(", ") || "ZIP " + area.zip;
  var list = providersIn(area.state);
  var apiStatus = "fallback";
  var providerUrls = {
    "Verizon":"https://www.verizon.com/home/internet/",
    "Skywire Networks":"https://www.skywirenetworks.com/",
    "Astound Broadband":"https://www.astound.com/",
    "Spectrum":"https://www.spectrum.com/internet",
    "Starry Inc":"https://starry.com/",
    "Starlink":"https://www.starlink.com/",
    "HughesNet":"https://www.hughesnet.com/",
    "T-Mobile":"https://www.t-mobile.com/home-internet",
    "Viasat Inc":"https://www.viasat.com/",
    "AT&T":"https://www.att.com/internet/",
    "Xfinity":"https://www.xfinity.com/learn/internet-service",
    "Cox":"https://www.cox.com/",
    "Optimum":"https://www.optimum.com/",
    "Frontier":"https://frontier.com/",
    "Google Fiber":"https://fiber.google.com/",
    "Kinetic":"https://www.gokinetic.com/",
    "Kinetic by Windstream":"https://www.gokinetic.com/",
    "Smart Way Communications":"https://thinksmartway.com/",
    "Brightspeed":"https://www.brightspeed.com/",
    "Mediacom":"https://mediacomcable.com/",
    "Quantum Fiber":"https://www.quantumfiber.com/",
    "Ziply Fiber":"https://ziplyfiber.com/"
  };

  var rows = [
    ["Address", area.street],
    ["City", area.city],
    ["County", area.county],
    ["State", stateName ? stateName + " (" + area.state + ")" : area.state],
    ["ZIP code", area.zip]
  ];

  var result = $("res");

  result.innerHTML =
    '<div class="area">' +
      '<h2>Internet providers to check in ' + esc(place) + '</h2>' +
      (location ? "" : '<p class="err">We could not locate this address precisely. Results may be less specific.</p>') +
      '<p class="nt" id="availability-note">' + (apiStatus === "area" ? list.length + ' providers reported for this geographic area. This does not guarantee service at your exact address.' : list.length + ' potential providers to check based on state-level coverage. Exact-address availability is not confirmed.</p>' ) +
      '<dl>' + rows.filter(function(row) { return row[1]; }).map(function(row) {
        return '<dt>' + row[0] + '</dt><dd>' + esc(row[1]) + '</dd>';
      }).join("") + '</dl>' +
      '<a class="fcc" href="https://broadbandmap.fcc.gov/home" target="_blank" rel="noopener">Verify availability on the FCC Broadband Map →</a>' +
      '<p><strong>Need help? Call <a href="' + PHONE_LINK + '">' + PHONE + '</a></strong></p>' +
    '</div>' +
    '<div class="chips rchips">' +
      [["all","All"],["Fiber","Fiber"],["Cable","Cable"],["Fixed Wireless","Fixed Wireless"],["5G Home","5G Home"],["Satellite","Satellite"]].map(function(c,i) {
        return '<button type="button" class="chip' + (i ? "" : " on") + '" data-f="' + c[0] + '">' + c[1] + '</button>';
      }).join("") +
    '</div>' +
    '<p class="nt">For a free independent check, open the official FCC National Broadband Map below. Then confirm service directly with each provider; map data can be incomplete and does not guarantee service at your address.</p>' +
    '<button type="button" class="ghost" id="cp">Copy address</button>' +
    '<div id="rlist"></div>';

  function draw(filter) {
    var filtered = list.filter(function(p) {
      return filter === "all" || String(p[3]).toLowerCase().indexOf(String(filter).toLowerCase()) > -1;
    });

    var logoFiles = {
      "Spectrum Internet":"spectrum.png",
      "Verizon Fios & 5G":"verizon.png",
      "AT&T Internet & Fiber":"att.png",
      "T-Mobile 5G Home":"tmobile.png",
      "Xfinity":"xfinity.png",
      "HughesNet":"Hugesnet.png",
      "Starlink":"Starlink.png",
      "Cox Internet":"Cox.png",
      "Optimum":"Optimum.png",
      "Frontier Fiber":"Frontier.png",
      "Google Fiber":"Google Fiber.png",
      "Verizon 5G Home":"verizon.png",
      "AT&T Internet Air":"att.png",
      "Viasat":"Viasat.png",
      "Kinetic":"Kinetic by Windstream.png",
      "Kinetic by Windstream":"Kinetic by Windstream.png"
    };

    $("rlist").innerHTML = filtered.length ? filtered.map(function(p) {
      var logo = logoFiles[p[1]];
      var logoHtml = logo
        ? '<img src="/' + encodeURIComponent(logo).replace(/%2F/g, '/') + '" alt="' + esc(p[1]) + ' logo" loading="lazy" style="width:92px;height:42px;object-fit:contain;display:inline-block;vertical-align:middle;margin:0 12px 0 0">'
        : (p[1] === "Smart Way Communications"
          ? '<img src="https://www.google.com/s2/favicons?domain=thinksmartway.com&sz=128" alt="Smart Way Communications logo" loading="lazy" style="width:42px;height:42px;object-fit:contain;display:inline-block;vertical-align:middle;margin:0 12px 0 0">'
          : '<span class="provider-mark" aria-hidden="true">' + esc(p[1].split(/\s+/).map(function(part){return part.charAt(0);}).join("").slice(0,3).toUpperCase()) + '</span>');
      return '<div class="row">' +
        '<div style="min-width:0;flex:1">' + logoHtml + '<b>' + esc(p[1]) + '</b><br>' +
        '<span class="nt">' + esc(p[3]) + ' · ' + esc(p[4]) + ' · ' + esc(p[6]) +
        (apiStatus === "area" ? ' · Reported in this area; confirm with provider' : (FOOT[p[1]] && stateName ? ' · Serves parts of ' + esc(stateName) : '')) +
        '</span></div>' +
        (p[2] && p[2] !== "#" ?
          '<a class="btn" href="' + esc(p[2]) + '" target="_blank" rel="noopener">Visit Website</a>' :
          '<span class="nt">Website not verified</span>') +
      '</div>';
    }).join("") : '<p class="nt">No ' + esc(filter) + ' providers listed for this area.</p>';
  }

  draw("all");

  if (isFinite(area.lat) && isFinite(area.lon)) {
    fetch("https://uscableinternet-availability.mughals989.workers.dev/?lat=" +
      encodeURIComponent(area.lat) + "&lng=" + encodeURIComponent(area.lon))
      .then(function(response) {
        if (!response.ok) throw new Error("Availability lookup failed");
        return response.json();
      })
      .then(function(data) {
        if (!data || !Array.isArray(data.providers)) throw new Error("Unexpected API response");
        var mapped = data.providers.map(function(item) {
          var name = String(item.name || "Internet provider");
          var technology = String(item.technology || "Internet");
          var down = Number(item.max_download_mbps);
          var up = Number(item.max_upload_mbps);
          var speed = (Number.isFinite(down) ? "Up to " + down.toLocaleString() + " Mbps download" : "Speed varies") +
            (Number.isFinite(up) ? " / " + up.toLocaleString() + " Mbps upload" : "");
          return ["i", name, providerUrls[name] || (name === "MINTernet" ? "" : "#"), technology, speed, 999, "Check price with provider"];
        });
        if (!mapped.length) throw new Error("No providers returned");
        list = mapped;
        apiStatus = "area";
        var note = $("availability-note");
        if (note) note.textContent = list.length +
          " provider entries reported for this geographic area. This does not guarantee service at your exact address.";
        draw("all");
      })
      .catch(function() {});
  }

  document.querySelectorAll(".rchips .chip").forEach(function(button) {
    button.onclick = function() {
      document.querySelectorAll(".rchips .chip").forEach(function(item) {
        item.classList.toggle("on", item === button);
      });
      draw(button.dataset.f);
    };
  });

  $("cp").onclick = function() {
    var text = label || [area.street, area.city, area.state, area.zip].filter(Boolean).join(", ");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
  };
}

/* Speed test */
function setupSpeedTest() {
  var button = $("sb");
  if (!button) return;

  button.onclick = async function() {
    button.disabled = true;
    button.textContent = "Testing...";
    $("ss").textContent = "Running download test...";
    $("sd").textContent = "--";
    $("su").textContent = "--";
    $("sp").textContent = "--";

    try {
      var base = "https://speed.cloudflare.com/";
      var startPing = performance.now();
      await fetch(base + "__down?bytes=0", {cache:"no-store"});
      $("sp").textContent = Math.round(performance.now() - startPing);

      var startDown = performance.now();
      var downRes = await fetch(base + "__down?bytes=25000000", {cache:"no-store"});
      var downBuf = await downRes.arrayBuffer();
      var downMbps = (downBuf.byteLength * 8 / ((performance.now() - startDown) / 1000) / 1e6).toFixed(1);
      $("sd").textContent = downMbps;

      $("ss").textContent = "Running upload test...";
      var data = new Uint8Array(10000000);
      var startUpload = performance.now();
      await fetch(base + "__up", {method:"POST", body:data});
      $("su").textContent = (data.length * 8 / ((performance.now() - startUpload) / 1000) / 1e6).toFixed(1);
      $("ss").textContent = "Done.";
    } catch(error) {
      $("ss").textContent = "Test failed. Check your connection and try again.";
    }

    button.disabled = false;
    button.textContent = "Test Again";
  };
}
setupSpeedTest();

/* Provider logos */
var LOGOS = {
  spectrum:"/spectrum.png",xfinity:"/xfinity.png",att:"/att.png",verizon:"/verizon.png",
  tmobile:"/tmobile.png",cox:"/Cox.png",optimum:"/Optimum.png",frontier:"/Frontier.png",
  googlefiber:"/Google%20Fiber.png",hughesnet:"/Hugesnet.png",starlink:"/Starlink.png",
  viasat:"/Viasat.png",directv:"/Directv.png",dish:"/Dish.png",kinetic:"/Kinetic%20by%20Windstream.png",
  brightspeed:"/Brightspeed.png",mediacom:"/Mediacom.png",quantum:"/Quantum%20Fiber.png",
  ziply:"/Ziply.png",frndly:"/Frndly%20TV.png",youtube:"/YoutubeTV.png",
  philo:"/Philo.png",hulu:"/Hulu%20%2B%20Live%20TV.png",fubo:"/Fubo%20TV.png",
  sling:"/Sling%20TV.png",peacock:"/Peacock.png",paramount:"/Paramount%2B.png"
};

function logoKey(name) {
  var value = String(name).toLowerCase();
  var keys = [
    ["google fiber","googlefiber"],["youtube tv","youtube"],["frndly","frndly"],
    ["hulu","hulu"],["fubo","fubo"],["sling","sling"],["peacock","peacock"],
    ["paramount","paramount"],["philo","philo"],["t-mobile","tmobile"],["at&t","att"],
    ["spectrum","spectrum"],["xfinity","xfinity"],["verizon","verizon"],
    ["cox","cox"],["optimum","optimum"],["frontier","frontier"],
    ["hughesnet","hughesnet"],["starlink","starlink"],["viasat","viasat"],
    ["directv","directv"],["dish","dish"],["kinetic","kinetic"],
    ["brightspeed","brightspeed"],["mediacom","mediacom"],["quantum","quantum"],
    ["ziply","ziply"]
  ];
  for (var i = 0; i < keys.length; i++) {
    if (value.indexOf(keys[i][0]) !== -1) return keys[i][1];
  }
  return "";
}

(function() {
  document.querySelectorAll(".names span").forEach(function(span) {
    var key = logoKey(span.textContent);
    if (!key || !LOGOS[key]) return;

    var image = new Image();
    image.className = "slogo";
    image.alt = span.textContent;
    image.onload = function() {
      span.textContent = "";
      span.appendChild(image);
      span.classList.add("haslogo");
    };
    image.src = LOGOS[key];
  });

  document.querySelectorAll("article.card h3").forEach(function(heading) {
    var key = logoKey(heading.textContent);
    if (!key || !LOGOS[key]) return;

    var image = new Image();
    image.className = "clogo";
    image.alt = "";
    image.onload = function() {
      heading.parentNode.insertBefore(image, heading.parentNode.firstChild);
    };
    image.src = LOGOS[key];
  });
})();

/* Keep the phone number visible on pages with a header and footer */
(function() {
  var headerBar = document.querySelector("header .bar");
  if (headerBar && !headerBar.querySelector(".phone-cta")) {
    var link = document.createElement("a");
    link.className = "phone-cta";
    link.href = PHONE_LINK;
    link.textContent = "Call Now: " + PHONE;
    headerBar.appendChild(link);
  }

  var footer = document.querySelector("footer .w");
  if (footer && !footer.querySelector(".phone-link")) {
    var p = document.createElement("p");
    p.style.marginTop = "24px";
    p.innerHTML = 'Call: <a class="phone-link" href="' + PHONE_LINK + '">' + PHONE + '</a>';
    footer.appendChild(p);
  }
})();

/* Working category filters for Internet and TV plan cards */
(function() {
  document.querySelectorAll(".chips[data-target]").forEach(function(group) {
    var targetId = group.getAttribute("data-target");
    var grid = document.getElementById(targetId);
    if (!grid) return;

    group.addEventListener("click", function(e) {
      var button = e.target.closest("button[data-f]");
      if (!button) return;

      var filter = String(button.getAttribute("data-f") || "all").toLowerCase();
      group.querySelectorAll("button[data-f]").forEach(function(item) {
        item.classList.toggle("on", item === button);
      });

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
          (filter === "stream" && type === "stream") ||
          (filter === "satellite" && type === "satellite");
        card.style.display = show ? "" : "none";
      });
    });
  });
})();
