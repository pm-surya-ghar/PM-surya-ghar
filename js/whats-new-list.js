(function () {
  var MONTHS = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function parseDate(d) {
    var p = d.split(".");
    if (p.length !== 3) return { day: "", mon: "", y: "" };
    return {
      day: String(parseInt(p[0], 10)),
      mon: MONTHS[parseInt(p[1], 10)] || p[1],
      y: p[2],
    };
  }

  function tagClass(cat) {
    if (cat.indexOf("General Notices") === 0) return "notice-tag--general";
    if (cat.indexOf("Scheme Guidelines") === 0) return "notice-tag--scheme";
    if (cat.indexOf("Technical Documents") === 0) return "notice-tag--technical";
    if (cat.indexOf("Capacity Building") === 0) return "notice-tag--capacity";
    if (cat === "Meeting Notices") return "notice-tag--meeting";
    if (cat.indexOf("Meeting / Workshop") === 0) return "notice-tag--workshop";
    if (cat.indexOf("CFA related") === 0) return "notice-tag--cfa";
    if (cat.indexOf("Subsidy Released") === 0) return "notice-tag--subsidy";
    return "notice-tag--scheme";
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var OFFICIAL = "https://pmsuryaghar.gov.in/";

  function render(list) {
    var el = document.getElementById("whatsnewList");
    var empty = document.getElementById("whatsnewEmpty");
    if (!el) return;
    if (!list.length) {
      el.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    el.innerHTML = list
      .map(function (item) {
        var dt = parseDate(item.date);
        var tc = tagClass(item.cat);
        return (
          '<article class="notice-card">' +
          '<div class="notice-card__date"><div class="day">' +
          esc(dt.day) +
          '</div><div class="mon">' +
          esc(dt.mon) +
          '</div><div class="notice-card__yr">' +
          esc(dt.y) +
          '</div></div><div class="notice-card__divider" aria-hidden="true"></div>' +
          '<div class="notice-card__body"><span class="notice-tag ' +
          tc +
          '"><i class="fa-solid fa-bell" aria-hidden="true"></i> ' +
          esc(item.cat) +
          "</span><h4>" +
          esc(item.title) +
          '</h4><a class="notice-card__link" href="' +
          OFFICIAL +
          '" target="_blank" rel="noopener noreferrer">Click To View</a></div></article>'
        );
      })
      .join("");
  }

  var all = window.WHATS_NEW_NOTICES || [];
  var sel = document.getElementById("whatsnewCategory");
  var search = document.getElementById("whatsnewSearch");

  if (sel) {
    var uniq = [];
    all.forEach(function (i) {
      if (uniq.indexOf(i.cat) === -1) uniq.push(i.cat);
    });
    uniq.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      sel.appendChild(o);
    });
  }

  function applyFilter() {
    var q = (search && search.value ? search.value : "").toLowerCase().trim();
    var c = sel && sel.value ? sel.value : "";
    var filtered = all.filter(function (i) {
      if (c && i.cat !== c) return false;
      if (!q) return true;
      return (i.title + " " + i.cat).toLowerCase().indexOf(q) !== -1;
    });
    render(filtered);
  }

  if (search) {
    search.addEventListener("input", applyFilter);
    search.addEventListener("search", applyFilter);
  }
  if (sel) sel.addEventListener("change", applyFilter);

  render(all);
})();
