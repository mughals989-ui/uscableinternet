var FS = "";
var PHONE = "888-630-3881";
var PHONE_LINK = "tel:8886303881";

var D = [
  ["i","Spectrum Internet","https://www.spectrum.com/internet","Cable","100 Mbps starting tier; up to 2 Gbps in select areas",30,"$30/mo for 12 months; standard rates apply after"],
  ["i","Verizon Fios & 5G","https://www.verizon.com/home/internet/","Fiber / 5G","Fios 300 Mbps starting tier; 5G speeds vary by address",30,"Fios from $30/mo; 5G from $35/mo with qualifying mobile plan"],
  ["i","AT&T Internet & Fiber","https://www.att.com/Internet/fiber/","Fiber","300 Mbps starting tier; higher tiers available",50,"$50/mo after eligible AutoPay and paperless billing discount; taxes/fees extra"],
  ["i","T-Mobile 5G Home","https://www.t-mobile.com/home-internet/plans","5G Home","Typical speeds vary; some plans report about 170-498 Mbps",35,"$50/mo with AutoPay; $35 with eligible voice line"],
  ["i","Xfinity","https://www.xfinity.com/learn/internet-service","Cable","300 Mbps plan; faster tiers vary by area",45,"$45/mo for 5 years with AutoPay/paperless discount; verify terms"],
  ["i","HughesNet","https://www.hughesnet.com/home-satellite-internet-plans","Satellite","Plans advertised up to 100 Mbps",39.99,"From $39.99/mo for 12 months; minimum-term terms apply"],
  ["i","Starlink","https://starlink.com/us/service-plans","Satellite","100 Mbps tier in select areas; faster tiers cost more",55,"$55/mo for Residential 100 Mbps where available"],
  ["t","Spectrum TV Select Plus","https://www.spectrum.com/cable-tv","Cable TV","160+ channels",69.99,"$69.99/mo for 12 mos"],
  ["t","Xfinity X1 TV","https://www.xfinity.com/learn/digital-cable-tv","Cable TV","185+ channels",70,"$70/mo"],
  ["t","DIRECTV Stream","https://www.directv.com/","Streaming","165+ channels",84.99,"$84.99/mo"],
  ["t","DISH Top 120","https://www.dish.com/","Satellite","190 channels",84.99,"$84.99/mo"],
  ["i","Cox Internet","https://www.cox.com/residential/mdu-community/quick-connect.html","Cable","Qualifying community offer up to 300 Mbps; other areas vary",55,"Published qualifying-community offer: $55/mo for 300 Mbps; verify address-specific pricing"],
  ["i","Optimum","https://www.optimum.com/rate-card","Cable","Official rate card: 100 Mbps cable tier; fiber tiers vary by market",94.99,"July 2026 standard cable rate card lists $94.99/mo for 100 Mbps; promos vary"],
  ["i","Frontier Fiber","https://go.frontier.com/fiber/internet","Fiber","500 Mbps symmetrical starting tier; up to 7 Gbps in select areas",44.99,"$44.99/mo for 500/500 Mbps with AutoPay/paperless billing"],
  ["i","Google Fiber","https://fiber.google.com/","Fiber","1 Gbps symmetrical; multi-gig in select metro areas",70,"$70/mo for 1 Gig; availability varies by metro"],
  ["i","Viasat","https://www.viasat.com/isg/availability/","Satellite","Essentials baseline up to 80 Mbps; burst speeds up to 150 Mbps",39.99,"From $39.99/mo for 12 months with a 24-month term"],
];

function trackUciEvent(name, params) {
  if (typeof window.gtag !== "function") return;
  try { window.gtag("event", name, params || {}); } catch (e) {}
}
(function setupUciTracking() {
  if (document.documentElement.dataset.uciTrackingReady === "1") return;
  document.documentElement.dataset.uciTrackingReady = "1";
  document.addEventListener("click", function(event) {
    var link = event.target && event.target.closest ? event.target.closest("a") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (/^tel:/i.test(href)) {
      trackUciEvent("phone_click", {link_text:String(link.textContent || "").trim().slice(0,80)});
      return;
    }
    if (/^\/check-address(?:[?#]|$)/i.test(href)) {
      trackUciEvent("address_checker_click", {link_text:String(link.textContent || "").trim().slice(0,80)});
    }
    var host = "";
    try { host = new URL(link.href, window.location.href).hostname.toLowerCase(); } catch (e) {}
    var domains = ["spectrum.com","xfinity.com","att.com","verizon.com","t-mobile.com","cox.com","optimum.com","frontier.com","fiber.google.com","hughesnet.com","starlink.com","viasat.com","directv.com","dish.com","youtube.com","sling.com","fubo.tv","hulu.com","philo.com","frndlytv.com","peacocktv.com","paramountplus.com"];
    if (host && domains.some(function(d){return host===d || host.endsWith("."+d);})) {
      trackUciEvent("provider_click", {provider_domain:host,link_text:String(link.textContent || "").trim().slice(0,80)});
    }
  });
})();
var $ = function(id) { return document.getElementById(id); };

function esc(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
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
  var value = String(name || "").trim().toLowerCase();
  for (var k in STN) { if (STN[k].toLowerCase() === value) return k; }
  return "";
}

function normalizeState(value) {
  var code = String(value || "").trim().toUpperCase();
  return STN[code] ? code : stCode(value);
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
  var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  var timeout = controller ? setTimeout(function() { controller.abort(); }, 8000) : null;
  var options = {headers:{"Accept-Language":"en"}};
  if (controller) options.signal = controller.signal;
  return fetch(url, options)
    .then(function(r) {
      if (!r.ok) throw new Error("Address search service returned HTTP " + r.status);
      return r.json();
    })
    .then(function(data) {
      return {location:data && data[0] ? data[0] : null, error:false};
    })
    .catch(function(error) {
      return {location:null, error:true, message:error && error.message ? error.message : "Network or timeout error"};
    })
    .then(function(outcome) {
      if (timeout) clearTimeout(timeout);
      return outcome;
    });
}

(function() {
  var form = $("af");
  if (!form) return;
  setupAddressAutocomplete();
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
      trackUciEvent("address_check_submit", {lookup_type:"zip_code"});
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
    trackUciEvent("address_check_submit", {lookup_type:"full_address", state:normalizeState(state)});
    lookupArea({street:street, unit:unit, city:city, state:state, zip:zip}, label);
  };
})();


function setupAddressAutocomplete() {
  var streetInput = $("a-street");
  if (!streetInput || streetInput.dataset.autocompleteReady === "1") return;
  streetInput.dataset.autocompleteReady = "1";
  var label = streetInput.closest("label");
  if (!label) return;
  label.classList.add("address-autocomplete");
  var menu = document.createElement("div");
  menu.className = "address-suggestions";
  menu.id = "address-suggestions";
  menu.setAttribute("role", "listbox");
  menu.hidden = true;
  label.appendChild(menu);
  var timer = null;
  var requestNumber = 0;
  var activeIndex = -1;
  var current = [];

  function closeMenu() {
    menu.hidden = true;
    menu.innerHTML = "";
    current = [];
    activeIndex = -1;
    streetInput.setAttribute("aria-expanded", "false");
  }
  function stateAbbr(value) {
    var upper = String(value || "").toUpperCase().trim();
    if (STN[upper]) return upper;
    return stCode(value || "");
  }
  function displayAddress(p, typedAddress) {
    var street = p.street || p.name || "";
    // Photon often returns a street-level result without a house number.
    // Preserve the house number the visitor already typed in that case.
    var typedMatch = String(typedAddress || "").trim().match(/^(\d+[A-Za-z]?(?:-\d+[A-Za-z]?)?)\s+/);
    var number = p.housenumber || (street && typedMatch ? typedMatch[1] : "");
    var line = [number, street].filter(Boolean).join(" ");
    var city = p.city || p.town || p.village || p.locality || p.district || "";
    var state = stateAbbr(p.state);
    var zip = p.postcode || "";
    return {
      line: line || p.name || "",
      city: city,
      state: state,
      zip: zip,
      label: [line || p.name, city, state, zip].filter(Boolean).join(", ")
    };
  }
  function choose(item) {
    streetInput.value = item.line || "";
    if ($("a-city") && item.city) $("a-city").value = item.city;
    if ($("a-state") && item.state) $("a-state").value = item.state;
    if ($("a-zip") && item.zip) $("a-zip").value = item.zip;
    closeMenu();
    streetInput.dispatchEvent(new Event("change", {bubbles:true}));
    if ($("a-unit")) $("a-unit").focus();
  }
  function render(features, typedAddress) {
    current = features.map(function(feature) {
      return displayAddress(feature.properties || {}, typedAddress);
    }).filter(function(item) { return item.line && item.label; });
    if (!current.length) { closeMenu(); return; }
    menu.innerHTML = current.map(function(item, i) {
      return '<button type="button" role="option" aria-selected="false" class="address-suggestion" data-index="' + i + '">' +
        '<span class="suggestion-main">' + esc(item.label) + '</span><span class="suggestion-hint">Use this address</span></button>';
    }).join("") + '<div class="address-attribution">Address data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a> · Search by Photon</div>';
    menu.hidden = false;
    streetInput.setAttribute("aria-expanded", "true");
    menu.querySelectorAll("button[data-index]").forEach(function(button) {
      button.addEventListener("mousedown", function(event) { event.preventDefault(); });
      button.addEventListener("click", function() {
        var item = current[Number(button.dataset.index)];
        if (item) choose(item);
      });
    });
  }
  streetInput.setAttribute("aria-autocomplete", "list");
  streetInput.setAttribute("aria-controls", menu.id);
  streetInput.setAttribute("aria-expanded", "false");
  streetInput.addEventListener("input", function() {
    if (timer) clearTimeout(timer);
    var value = streetInput.value.trim();
    var city = $("a-city") ? $("a-city").value.trim() : "";
    var state = $("a-state") ? $("a-state").value : "";
    var query = [value, city, state ? (STN[state] || state) : ""].filter(Boolean).join(", ");
    var thisRequest = ++requestNumber;
    if (value.length < 3) { closeMenu(); return; }
    menu.hidden = false;
    menu.innerHTML = '<div class="address-suggestion-status">Searching U.S. addresses…</div>';
    streetInput.setAttribute("aria-expanded", "true");
    timer = setTimeout(function() {
      fetch("https://photon.komoot.io/api/?q=" + encodeURIComponent(query) + "&limit=12&lang=en", {
        headers: {"Accept":"application/json"}
      }).then(function(response) {
        if (!response.ok) throw new Error("Address search unavailable");
        return response.json();
      }).then(function(data) {
        if (thisRequest !== requestNumber) return;
        var features = (data.features || []).filter(function(feature) {
          var p = feature.properties || {};
          return String(p.countrycode || "").toLowerCase() === "us";
        }).slice(0, 6);
        render(features, value);
      }).catch(function() {
        if (thisRequest !== requestNumber) return;
        closeMenu();
      });
    }, 350);
  });
  streetInput.addEventListener("keydown", function(event) {
    if (menu.hidden || !current.length) {
      if (event.key === "Escape") closeMenu();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = event.key === "ArrowDown" ? (activeIndex + 1) % current.length : (activeIndex - 1 + current.length) % current.length;
      menu.querySelectorAll(".address-suggestion").forEach(function(button, i) {
        button.classList.toggle("active", i === activeIndex);
        button.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
      });
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(current[activeIndex]);
    } else if (event.key === "Escape") {
      closeMenu();
    }
  });
  document.addEventListener("click", function(event) {
    if (!label.contains(event.target)) closeMenu();
  });
}

var AVAILABILITY_API = "https://uscableinternet-availability.mughals989.workers.dev/";

function lookupArea(info, label) {
  var result = $("res");
  if (!result) return;
  result.hidden = false;
  result.innerHTML = '<p class="nt">Finding the location and checking reported internet coverage…</p>';
  var query = info.street
    ? {street:info.street + (info.unit ? " " + info.unit : ""), city:info.city, state:info.state, postalcode:info.zip, country:"United States"}
    : {postalcode:info.zip, country:"United States"};

  function usable(location) {
    return location && isFinite(parseFloat(location.lat)) && isFinite(parseFloat(location.lon));
  }
  function showLookupError() {
    result.innerHTML = '<div class="area"><h2>Address lookup is temporarily unavailable.</h2><p class="nt">The address service did not respond reliably. Please wait a moment and try again. You can also use ZIP-code search.</p></div>';
  }
  function showNoMatch() {
    result.innerHTML = '<div class="area"><h2>We couldn’t match that exact U.S. address.</h2><p class="nt">Check the house number, street, city, state and ZIP code. If the address is correct, try the ZIP-code search instead. ZIP results represent reported coverage near the ZIP location, not a confirmed result for an individual home.</p></div>';
  }

  geo(query).then(function(outcome) {
    if (usable(outcome.location)) {
      showArea(info, outcome.location, label);
      return;
    }
    if (outcome.error) {
      showLookupError();
      return;
    }
    if (!info.street) {
      showNoMatch();
      return;
    }

    // Retry a no-match street address as a single free-form query.
    // Keep at least one second between public Nominatim requests.
    result.innerHTML = '<p class="nt">Trying an alternate address match…</p>';
    var fullAddress = [info.street, info.unit, info.city, info.state, info.zip, "United States"].filter(Boolean).join(", ");
    setTimeout(function() {
      geo({q:fullAddress}).then(function(fallback) {
        if (usable(fallback.location)) {
          showArea(info, fallback.location, label);
        } else if (fallback.error) {
          showLookupError();
        } else {
          showNoMatch();
        }
      });
    }, 1100);
  });
}

function providerWebsite(name) {
  var n = String(name || "").toLowerCase();
  var links = [
    ["spectrum","https://www.spectrum.com/internet"],["xfinity","https://www.xfinity.com/learn/internet-service"],
    ["comcast","https://www.xfinity.com/learn/internet-service"],["verizon","https://www.verizon.com/home/internet/"],
    ["at&t","https://www.att.com/internet/"],["att","https://www.att.com/internet/"],
    ["t-mobile","https://www.t-mobile.com/home-internet"],["starlink","https://www.starlink.com/"],
    ["hughesnet","https://www.hughesnet.com/"],["viasat","https://www.viasat.com/"],
    ["cox","https://www.cox.com/residential/internet.html"],["optimum","https://www.optimum.com/internet"],
    ["frontier","https://www.frontier.com/"],["google fiber","https://fiber.google.com/"],
    ["astound","https://www.astound.com/"],["windstream","https://www.windstream.com/"],
    ["brightspeed","https://www.brightspeed.com/"]
  ];
  for (var i=0;i<links.length;i++) if (n.indexOf(links[i][0]) !== -1) return links[i][1];
  return "";
}

function showArea(info, location, label) {
  var address = location && location.address || {};
  var stateCode = (address["ISO3166-2-lvl4"] || "").replace("US-", "");
  var area = {
    street:info.street ? info.street + (info.unit ? ", " + info.unit : "") : "",
    city:info.city || address.city || address.town || address.village || "",
    county:address.county || "",
    state:normalizeState(info.state) || normalizeState(stateCode) || normalizeState(address.state),
    zip:info.zip || address.postcode || "",
    lat:parseFloat(location.lat),
    lon:parseFloat(location.lon)
  };
  var stateName = STN[area.state] || "";
  var place = [area.city, area.state].filter(Boolean).join(", ") || "ZIP " + area.zip;
  var result = $("res");
  result.innerHTML = '<p class="nt">Checking Broadband Map coverage data…</p>';
  fetch(AVAILABILITY_API + "?lat=" + encodeURIComponent(area.lat) + "&lng=" + encodeURIComponent(area.lon), {method:"GET",headers:{"Accept":"application/json"},cache:"no-store"})
    .then(function(response) {
      return response.json().catch(function(){return {};}).then(function(data) {
        if (!response.ok) throw new Error(data.error || "Coverage lookup unavailable");
        return data;
      });
    })
    .then(function(data) {
      var providers = Array.isArray(data.providers) ? data.providers : [];
      function reportedSpeed(value) {
        if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) return null;
        var number = Number(value);
        return isFinite(number) && number >= 0 ? number : null;
      }
      var uniqueProviders = Object.create(null);
      providers.forEach(function(p) {
        if (!p || typeof p !== "object") return;
        var name = String(p.name || "Provider").trim() || "Provider";
        var tech = String(p.technology || "Internet").trim() || "Internet";
        tech = tech.replace("Fixed Wireless","5G / Fixed Wireless").replace("LEO Satellite","Satellite").replace("GSO Satellite","Satellite");
        var key = name.toLowerCase().replace(/\s+/g, " ") + "|" + tech.toLowerCase().replace(/\s+/g, " ");
        var download = reportedSpeed(p.max_download_mbps);
        var upload = reportedSpeed(p.max_upload_mbps);
        if (!uniqueProviders[key]) {
          uniqueProviders[key] = {name:name,tech:tech,download:download,upload:upload};
        } else {
          var existing = uniqueProviders[key];
          if (download !== null && (existing.download === null || download > existing.download)) existing.download = download;
          if (upload !== null && (existing.upload === null || upload > existing.upload)) existing.upload = upload;
        }
      });
      var list = Object.keys(uniqueProviders).map(function(key) {
        var p = uniqueProviders[key];
        var speedText = p.download === null ? "Speed not reported" : "Up to " + p.download + " Mbps download";
        if (p.upload !== null) speedText += (p.download === null ? " · " : " / ") + p.upload + " Mbps upload";
        return {name:p.name,tech:p.tech,speed:speedText,url:providerWebsite(p.name),download:p.download === null ? -1 : p.download};
      }).sort(function(a,b){return b.download-a.download;});
      trackUciEvent("address_check_results", {lookup_type:area.street ? "full_address" : "zip_code",state:area.state || "unknown",provider_count:list.length,source:"broadbandmap"});
      renderAvailability(area,place,stateName,list,"Broadband Map reported coverage in the nearby map cell. A provider listed here may not serve every address in that cell; confirm directly with the provider.");
    })
    .catch(function(error) {
      trackUciEvent("address_check_results", {lookup_type:area.street ? "full_address" : "zip_code",state:area.state || "unknown",provider_count:0,source:"lookup_error"});
      result.innerHTML = '<div class="area"><h2>We couldn’t retrieve coverage data right now.</h2><p class="nt">' + esc(error.message || "Please try again shortly.") + ' Your address was located, but no provider availability is being claimed.</p><p><strong>Need help? Call <a href="' + PHONE_LINK + '">' + PHONE + '</a></strong></p></div>';
    });
}

function renderAvailability(area,place,stateName,list,note) {
  var rows = [["Address",area.street],["City",area.city],["County",area.county],["State",stateName ? stateName + " (" + area.state + ")" : area.state],["ZIP code",area.zip]];
  var result = $("res");
  result.innerHTML =
    '<div class="area"><h2>Internet providers reported near ' + esc(place) + '</h2>' +
    '<p class="nt" id="availability-note">' + esc(list.length + " provider/technology listings found. " + note) + '</p>' +
    '<dl>' + rows.filter(function(row){return row[1];}).map(function(row){return '<dt>'+row[0]+'</dt><dd>'+esc(row[1])+'</dd>';}).join("") + '</dl>' +
    '<a class="fcc" href="https://broadbandmap.fcc.gov/home" target="_blank" rel="noopener">Verify on FCC Broadband Map →</a>' +
    '<p><strong>Need help comparing plans? Call <a href="' + PHONE_LINK + '">' + PHONE + '</a></strong></p></div>' +
    '<div class="chips rchips">' +
    [["all","All providers"],["Fiber","Fiber"],["Cable","Cable"],["Fixed Wireless","Fixed wireless"],["Satellite","Satellite"],["DSL","DSL"]].map(function(c,i){return '<button type="button" class="chip'+(i?"":" on")+'" data-f="'+c[0]+'">'+c[1]+'</button>';}).join("") +
    '</div><div id="rlist" class="provider-results"></div>';

  function draw(filter) {
    var filtered=list.filter(function(p){
      if(filter==="all") return true;
      var tech=p.tech.toLowerCase();
      if(filter==="fixed wireless") return tech.indexOf("wireless")!==-1;
      if(filter==="satellite") return tech.indexOf("satellite")!==-1;
      return tech.indexOf(filter.toLowerCase())!==-1;
    });
    $("rlist").innerHTML=filtered.length?filtered.map(function(p,index){
      var key=typeof logoKey==="function"?logoKey(p.name):"";
      var logo=key&&typeof LOGOS!=="undefined"&&LOGOS[key]
        ? '<img class="result-provider-logo" src="'+esc(LOGOS[key])+'" alt="'+esc(p.name)+' logo" loading="lazy" width="112" height="54">'
        : '<span class="result-provider-mark" aria-hidden="true">'+esc(p.name.charAt(0).toUpperCase())+'</span>';
      var speed=p.speed==="Speed not reported"?"Speed not reported":esc(p.speed);
      var fastest=index===0&&p.download>=0?'<span class="result-provider-rank">Highest reported speed</span>':"";
      var official=p.url?'<a class="result-provider-cta" href="'+esc(p.url)+'" target="_blank" rel="sponsored nofollow noopener">Check plans</a>':'';
      var fullDetails='<details class="result-provider-details"><summary>Show full details</summary><div class="result-provider-detail-body"><p><strong>Connection:</strong> '+esc(p.tech)+'</p><p><strong>Coverage data:</strong> '+esc(p.speed)+'</p><p><strong>Pricing:</strong> Not supplied by the coverage lookup. Check the provider for current address-specific prices and terms.</p><p>Coverage is reported for a nearby map cell and does not confirm that this provider can connect this exact home.</p></div></details>';
      return '<article class="result-provider-card"><div class="result-provider-main"><div class="result-provider-brand">'+logo+'<div class="result-provider-name-wrap">'+fastest+'<h3>'+esc(p.name)+'</h3><p class="result-provider-sub">'+esc(p.name)+' internet</p></div></div><div class="result-provider-metrics"><div><span class="result-provider-label">Speeds reported</span><strong>'+speed+'</strong></div><div><span class="result-provider-label">Connection</span><strong>'+esc(p.tech)+'</strong></div><div><span class="result-provider-label">Price</span><strong>Check provider</strong></div></div><div class="result-provider-actions">'+official+'<a class="result-provider-phone" href="'+PHONE_LINK+'">Call '+PHONE+'</a></div></div>'+fullDetails+'</article>';
    }).join(""):'<p class="nt">No providers reported for this technology filter.</p>';
  }
  draw("all");
  document.querySelectorAll(".rchips .chip").forEach(function(button){
    button.onclick=function(){
      document.querySelectorAll(".rchips .chip").forEach(function(item){item.classList.toggle("on",item===button);});
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
