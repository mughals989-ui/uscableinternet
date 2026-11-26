/* Shared USCableInternet visitor-event tracking.
   Keep both existing measurement IDs active: G-5VCZGZE76Q (legacy site tag)
   and G-ZPV8JCZYVZ (the web stream connected to the current GA4 property). */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.documentElement.dataset.uciSharedTracking === "1") return;
  document.documentElement.dataset.uciSharedTracking = "1";

  var measurementIds = ["G-5VCZGZE76Q", "G-ZPV8JCZYVZ"];
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }

  var hasJsCommand = window.dataLayer.some(function (entry) {
    return entry && entry[0] === "js";
  });
  if (!hasJsCommand) window.gtag("js", new Date());

  measurementIds.forEach(function (id) {
    var configured = window.dataLayer.some(function (entry) {
      return entry && entry[0] === "config" && entry[1] === id;
    });
    if (!configured) window.gtag("config", id);
  });

  var hasGtagLoader = Array.prototype.some.call(document.scripts, function (script) {
    return (script.src || "").indexOf("googletagmanager.com/gtag/js") !== -1;
  });
  if (!hasGtagLoader) {
    var loader = document.createElement("script");
    loader.async = true;
    loader.src = "https://www.googletagmanager.com/gtag/js?id=G-ZPV8JCZYVZ";
    (document.head || document.documentElement).appendChild(loader);
  }

  function send(name, params) {
    if (typeof window.gtag !== "function") return;
    try {
      window.gtag("event", name, Object.assign({ page_path: window.location.pathname }, params || {}));
    } catch (error) {}
  }

  var providerDomains = [
    "spectrum.com", "xfinity.com", "att.com", "verizon.com", "t-mobile.com",
    "cox.com", "optimum.com", "frontier.com", "fiber.google.com", "googlefiber.net",
    "hughesnet.com", "starlink.com", "viasat.com", "directv.com", "dish.com",
    "youtube.com", "sling.com", "fubo.tv", "hulu.com", "philo.com",
    "frndlytv.com", "peacocktv.com", "paramountplus.com"
  ];

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var linkText = String(link.textContent || "").trim().slice(0, 80);

    if (/^tel:/i.test(href)) {
      send("phone_click", {
        phone_number: href.replace(/^tel:/i, ""),
        link_text: linkText
      });
      return;
    }

    if (/^\/check-address(?:[?#]|$)/i.test(href)) {
      send("address_checker_click", { link_text: linkText });
    }

    var host = "";
    try { host = new URL(link.href, window.location.href).hostname.toLowerCase(); } catch (error) {}
    if (host && providerDomains.some(function (domain) {
      return host === domain || host.endsWith("." + domain);
    })) {
      send("provider_click", {
        provider_domain: host,
        link_text: linkText,
        link_url: link.href
      });
    }
  });

  var addressStartSent = false;
  document.addEventListener("focusin", function (event) {
    var field = event.target;
    if (addressStartSent || !field) return;
    if (field.id !== "a-query" && field.id !== "home-q") return;
    addressStartSent = true;
    send("address_check_start", {
      form_id: field.id,
      page_path: window.location.pathname
    });
  });

  // The homepage sends its address form to /check-address with a GET query.
  // The address-checker form itself is tracked by app.js to avoid double events.
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || form.id !== "home-zip-form") return;
    var field = form.querySelector("#home-q");
    var value = field ? String(field.value || "").trim() : "";
    var zip = /^\d{5}(?:-\d{4})?$/.test(value);
    send("address_check_submit", {
      lookup_type: zip ? "zip_code" : "full_address",
      form_id: form.id
    });
  });

  // First-party CRM visitor beacon. Session IDs are random and scoped to this tab.
  // Never send IP addresses, form values, ZIP codes, or street addresses.
  try {
    var crmSession = sessionStorage.getItem("uci_crm_session");
    if (!crmSession) {
      crmSession = (window.crypto && window.crypto.randomUUID)
        ? window.crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            return (c === "x" ? r : (r & 3 | 8)).toString(16);
          });
      sessionStorage.setItem("uci_crm_session", crmSession);
    }
    var crmSentPage = false;
    function crmBeacon(type) {
      var payload = JSON.stringify({
        session_id: crmSession,
        event_type: type,
        page_path: window.location.pathname.slice(0, 180)
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("https://collect.uscableinternet.com/event",
          new Blob([payload], { type: "application/json" }));
      } else {
        fetch("https://collect.uscableinternet.com/event", {
          method: "POST", mode: "cors", keepalive: true,
          headers: { "content-type": "application/json" }, body: payload
        }).catch(function () {});
      }
    }
    crmBeacon("page_view");
    window.setInterval(function () { crmBeacon("heartbeat"); }, 60000);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) crmBeacon("heartbeat");
    });
    document.addEventListener("click", function (event) {
      var a = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!a) return;
      var host = "";
      try { host = new URL(a.href, location.href).hostname.toLowerCase(); } catch (error) {}
      if (providerDomains.some(function (domain) { return host === domain || host.endsWith("." + domain); })) crmBeacon("provider_click");
      if (/^tel:/i.test(a.getAttribute("href") || "")) crmBeacon("phone_click");
      if (/^\/check-address(?:[?#]|$)/i.test(a.getAttribute("href") || "")) crmBeacon("address_checker_click");
    });
  } catch (error) {}

})();
