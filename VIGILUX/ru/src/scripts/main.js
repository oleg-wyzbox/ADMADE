/**
 * Leadwyz Integration Configuration
 * Universal script for tracker integration and CRM setup
 */

// Global variables required by Leadwyz (matching Acaro structure)
var campaignID = "Z3QbAroXkLv0xlyP";
var product = 2800;
var price = 99;
var region = 1001;
var quantity = 1;
var cost = price * quantity;

// Leadwyz script loader (exact same logic as Acaro)
!(function (e, t, r) {
  function n() {
    for (; d[0] && "loaded" == d[0][f]; )
      (c = d.shift()), (c[o] = !i.parentNode.insertBefore(c, i));
  }
  for (
    var s,
      a,
      c,
      d = [],
      i = e.scripts[0],
      o = "onreadystatechange",
      f = "readyState";
    (s = r.shift());

  )
    (a = e.createElement(t)),
      "async" in i
        ? ((a.async = !1), e.head.appendChild(a))
        : i[f]
        ? (d.push(a), (a[o] = n))
        : e.write("<" + t + ' src="' + s + '" defer></' + t + ">"),
      (a.src = s);
})(document, "script", [
  "https://api.leadwyz.com/script_v4",
  "https://api.leadwyz.com/js/order.js",
]);
