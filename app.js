```javascript
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
  return D.filter(function(p) {
    return p[0] === "i" &&
      (!state || !FOOT[p[1]] || FOOT[p[1]].split(" ").indexOf(state) > -1);
  }).sort(function(a,b) {
    return a[5] - b[5];
  });
}

/* Search address using OpenStreetMap */
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
  var wiredCount = list.filter(function(p) { return !!FOOT[p[1]]; }).length;

  var rows = [
    ["Address", area.street],
    ["City", area.city],
    ["County", area.county],
    ["State", stateName ? stateName + " (" + area.state + ")" : area.state],
    ["ZIP code", area.zip]
  ];

  var map = "";
  if (isFinite(area.lat) && isFinite(area.lon)) {
    var delta = 0.02;
    map = '<iframe title="Map of your area" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=' +
      (area.lon-delta) + ',' + (area.lat-delta*0.6) + ',' +
      (area.lon+delta) + ',' + (area.lat+delta*0.6) +
      '&layer=mapnik&marker=' + area.lat + ',' + area.lon + '"></iframe>';
  }

  var result = $("res");

  result.innerHTML =
    '<div class="area">' +
      '<h2>Internet providers in ' + esc(place) + '</h2>' +
      (location ? "" : '<p class="err">We could not place this address on the map. Results may be less specific.</p>') +
      '<p class="nt">' + list.length + ' providers to check in this area. Exact availability must be confirmed on each provider website.</p>' +
      '<dl>' + rows.filter(function(row) { return row[1]; }).map(function(row) {
        return '<dt>' + row[0] + '</dt><dd>' + esc(row[1]) + '</dd>';
      }).join("") + '</dl>' +
      map +
      '<a class="fcc" href="https://broadbandmap.fcc.gov/home" target="_blank" rel="noopener">Verify availability on the FCC Broadband Map →</a>' +
      '<p><strong>Need help? Call <a href="' + PHONE_LINK + '">' + PHONE + '</a></strong></p>' +
    '</div>' +
    '<div class="chips rchips">' +
      [["all","All"],["Fiber","Fiber"],["Cable","Cable"],["5G Home","5G Home"],["Satellite","Satellite"]].map(function(c,i) {
        return '<button type="button" class="chip' + (i ? "" : " on") + '" data-f="' + c[0] + '">' + c[1] + '</button>';
      }).join("") +
    '</div>' +
    '<p class="nt">Availability depends on your exact address. Visit the provider website to confirm coverage and current prices.</p>' +
    '<button type="button" class="ghost" id="cp">Copy address</button>' +
    '<div id="rlist"></div>';

  function draw(filter) {
    var filtered = list.filter(function(p) {
      return filter === "all" || p[3].indexOf(filter) > -1;
    });

    $("rlist").innerHTML = filtered.length ? filtered.map(function(p) {
      return '<div class="row">' +
        '<div><b>' + esc(p[1]) + '</b><br>' +
        '<span class="nt">' + esc(p[3]) + ' · ' + esc(p[4]) + ' · ' + esc(p[6]) +
        (FOOT[p[1]] && stateName ? ' · Serves parts of ' + esc(stateName) : '') +
        '</span></div>' +
        '<a class="btn" href="' + esc(p[2]) + '" target="_blank" rel="sponsored noopener">Visit Website</a>' +
      '</div>';
    }).join("") : '<p class="nt">No ' + esc(filter) + ' providers listed for this area.</p>';
  }

  draw("all");

  result.querySelector(".rchips").onclick = function(e) {
    var button = e.target.closest(".chip");
    if (!button) return;
    this.querySelectorAll(".chip").forEach(function(item) {
      item.classList.toggle("on", item === button);
    });
    draw(button.dataset.f);
  };

  $("cp").onclick = function() {
    var button = this;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(label).then(function() {
        button.textContent = "Copied";
      }).catch(function() {
        button.textContent = "Copy failed";
      });
    }
  };

  result.scrollIntoView({behavior:"smooth", block:"nearest"});
}

/* Address autocomplete */
(function() {
  var input = $("a-street");
  if (!input) return;

  var list = document.createElement("ul");
  list.className = "sug";
  input.parentNode.appendChild(list);

  var timer, items = [], active = -1;

  function close() {
    list.innerHTML = "";
    list.classList.remove("open");
    active = -1;
  }

  function pick(i) {
    var p = items[i];
    if (!p) return;

    input.value = [p.housenumber,p.street].filter(Boolean).join(" ") || p.name || input.value;
    if ($("a-city")) $("a-city").value = p.city || p.town || p.village || p.district || "";
    if ($("a-state") && stCode(p.state)) $("a-state").value = stCode(p.state);
    if ($("a-zip") && p.postcode) $("a-zip").value = p.postcode;
    close();
  }

  input.addEventListener("input", function() {
    clearTimeout(timer);
    var query = input.value.trim();
    if (query.length < 4) {
      close();
      return;
    }

    timer = setTimeout(function() {
      fetch("https://photon.komoot.io/api/?limit=8&lang=en&bbox=-179.2,18.9,-66.9,71.4&q=" + encodeURIComponent(query))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          items = (data.features || []).map(function(f) { return f.properties || {}; })
            .filter(function(p) { return p.countrycode === "US" && p.street && stCode(p.state); })
            .slice(0,6);

          if (!items.length) {
            close();
            return;
          }

          list.innerHTML = items.map(function(p,i) {
            return '<li data-i="' + i + '">' +
              esc([p.housenumber,p.street].filter(Boolean).join(" ")) +
              '<small>' + esc([p.city || p.town || p.village || p.district,stCode(p.state),p.postcode].filter(Boolean).join(", ")) + '</small>' +
            '</li>';
          }).join("");
          list.classList.add("open");
          active = -1;
        }).catch(close);
    },300);
  });

  input.addEventListener("keydown", function(e) {
    if (!list.classList.contains("open")) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      active = Math.max(0, Math.min(items.length-1, active + (e.key === "ArrowDown" ? 1 : -1)));
      [].forEach.call(list.children, function(li,i) {
        li.classList.toggle("on", i === active);
      });
    } else if (e.key === "Enter" && active > -1) {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      close();
    }
  });

  list.addEventListener("mousedown", function(e) {
    var li = e.target.closest("li");
    if (li) {
      e.preventDefault();
      pick(+li.dataset.i);
    }
  });

  input.addEventListener("blur", function() {
    setTimeout(close,150);
  });
})();

/* Contact form */
if ($("cf")) {
  $("cf").onsubmit = async function(e) {
    e.preventDefault();

    var form = e.target;
    var data = new FormData(form);
    var message = $("cm");

    if (data.get("website")) return;

    if (!FS) {
      location.href = "mailto:info@uscableinternet.com?subject=" +
        encodeURIComponent("[" + data.get("topic") + "] " + data.get("name")) +
        "&body=" + encodeURIComponent(data.get("message") + "\n\nFrom: " + data.get("name") + " (" + data.get("email") + ")");
      message.textContent = "Opening your email app...";
      return;
    }

    message.textContent = "Sending...";

    try {
      var response = await fetch("https://formspree.io/f/" + FS, {
        method:"POST",
        headers:{Accept:"application/json"},
        body:data
      });

      if (response.ok) {
        form.reset();
        message.textContent = "Thanks! Your message was sent.";
      } else {
        message.textContent = "Could not send. Please email info@uscableinternet.com.";
      }
    } catch(error) {
      message.textContent = "Could not send. Please email info@uscableinternet.com.";
    }
  };
}

/* Speed test */
if ($("sb")) {
  $("sb").onclick = async function() {
    var button = $("sb");
    var base = "https://speed.cloudflare.com/";
    button.disabled = true;

    try {
      $("ss").textContent = "Testing ping...";
      var minimum = 1e9;

      for (var i=0; i<4; i++) {
        var start = performance.now();
        await fetch(base + "__down?bytes=0&r=" + Math.random(), {cache:"no-store"});
        minimum = Math.min(minimum, performance.now()-start);
      }

      $("sp").textContent = Math.round(minimum);
      $("ss").textContent = "Testing download...";

      var startDownload = performance.now();
      var response = await fetch(base + "__down?bytes=25000000&r=" + Math.random(), {cache:"no-store"});
      var buffer = await response.arrayBuffer();

      $("sd").textContent = (buffer.byteLength*8/((performance.now()-startDownload)/1000)/1e6).toFixed(1);
      $("ss").textContent = "Testing upload...";

      var data = new Uint8Array(5000000);
      var startUpload = performance.now();
      await fetch(base + "__up", {method:"POST",body:data});

      $("su").textContent = (data.length*8/((performance.now()-startUpload)/1000)/1e6).toFixed(1);
      $("ss").textContent = "Done.";
    } catch(error) {
      $("ss").textContent = "Test failed. Check your connection and try again.";
    }

    button.disabled = false;
    button.textContent = "Test Again";
  };
}

/* Homepage hero collage */
(function() {
  var hero = document.querySelector(".hero-home");
  if (!hero || hero.querySelector(".hero-collage")) return;

  var photos = [
    "family,television","wifi,router","laptop,home","city,night",
    "smartphone,streaming","gaming,console","living,room","satellite,dish"
  ];
  var order = [[0,1,2,3],[4,5,6,7],[2,0,5,1],[6,3,7,4],[1,7,0,5],[5,2,4,6],[3,6,1,4]];
  var wall = document.createElement("div");
  wall.className = "hero-collage";
  wall.setAttribute("aria-hidden","true");

  order.forEach(function(items) {
    var column = document.createElement("div");
    column.className = "col";

    items.concat(items,items).forEach(function(i) {
      var img = document.createElement("img");
      var photo = photos[i];
      img.alt = "";
      img.decoding = "async";
      img.src = "https://loremflickr.com/800/500/" + photo + "?lock=" + (i+21);
      img.onerror = function() {
        img.onerror = null;
        img.src = "https://picsum.photos/seed/uscable" + i + "/800/500";
      };
      column.appendChild(img);
    });

    wall.appendChild(column);
  });

  var shade = document.createElement("div");
  shade.className = "hero-shade";
  hero.insertBefore(shade,hero.firstChild);
  hero.insertBefore(wall,hero.firstChild);
})();

/* Provider logos */
var LOGOS = {
  spectrum:"/spectrum.png",xfinity:"/xfinity.png",att:"/att.png",verizon:"/verizon.png",
  tmobile:"/tmobile.png",cox:"/Cox.png",optimum:"/Optimum.png",frontier:"/Frontier.png",
  googlefiber:"/Google%20Fiber.png",hughesnet:"/Hugesnet.png",starlink:"/Starlink.png",
  viasat:"/Viasat.png",directv:"/Directv.png",dish:"/Dish.png",kinetic:"/Kinetic.png",
  brightspeed:"/Brightspeed.png",mediacom:"/Mediacom.png",quantum:"/Quantum%20Fiber.png",
  ziply:"/Ziply.png"
};

function logoKey(name) {
  var value = String(name).toLowerCase();
  var keys = [
    ["google fiber","googlefiber"],["t-mobile","tmobile"],["at&t","att"],
    ["spectrum","spectrum"],["xfinity","xfinity"],["verizon","verizon"],
    ["cox","cox"],["optimum","optimum"],["frontier","frontier"],
    ["hughesnet","hughesnet"],["starlink","starlink"],["viasat","viasat"],
    ["directv","directv"],["dish","dish"],["kinetic","kinetic"],
    ["windstream","kinetic"],["brightspeed","brightspeed"],["mediacom","mediacom"],
    ["quantum","quantum"],["ziply","ziply"]
  ];

  for (var i=0; i<keys.length; i++) {
    if (value.indexOf(keys[i][0]) > -1) return keys[i][1];
  }
  return "";
}

function logoTag(name) {
  var key = logoKey(name);
  if (!key || !LOGOS[key]) return "";
  return '<img class="plogo" src="' + LOGOS[key] + '" alt="" onerror="this.remove()">';
}

(function() {
  document.querySelectorAll(".strip .names span").forEach(function(span) {
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
      heading.parentNode.insertBefore(image,heading.parentNode.firstChild);
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
```
