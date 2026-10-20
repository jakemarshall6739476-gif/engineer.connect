// Engineer Connect: shared code for every page.
// For now everything is saved in the browser (localStorage). Later this can
// be swapped for a real server so engineers on different computers see each other.

var DISCIPLINES = {
  mechanical: { name: "Mechanical", icon: "⚙️", blurb: "Machines, design, manufacturing and thermal systems." },
  electrical: { name: "Electrical", icon: "⚡", blurb: "Power, electronics, controls and embedded systems." },
  chemical:   { name: "Chemical",   icon: "⚗️", blurb: "Processes, materials, reactions and plant design." },
  civil:      { name: "Civil",      icon: "🏗️", blurb: "Structures, infrastructure, geotechnics and water." },
  aerospace:  { name: "Aerospace",  icon: "✈️", blurb: "Aircraft, spacecraft, propulsion and aerodynamics." },
  software:   { name: "Software",   icon: "💻", blurb: "Code, data, automation and engineering tools." },
  nuclear:    { name: "Nuclear",    icon: "☢️", blurb: "Reactors, radiation safety, fuel and decommissioning." }
};

// ---------- Saving and loading ----------
function load(key, fallback) {
  try {
    var value = localStorage.getItem("ec_" + key);
    return value ? JSON.parse(value) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem("ec_" + key, JSON.stringify(value)); } catch (e) {}
}

// The discipline the user picked on the home page.
function currentDiscipline() {
  var fromUrl = new URLSearchParams(location.search).get("d");
  if (fromUrl && DISCIPLINES[fromUrl]) { save("discipline", fromUrl); return fromUrl; }
  var saved = load("discipline", null);
  return DISCIPLINES[saved] ? saved : null;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Shows the chosen discipline in the top bar, with a link to change it.
function showDisciplineChip(d) {
  var chip = document.getElementById("discipline-chip");
  if (!chip || !d) return;
  chip.innerHTML = DISCIPLINES[d].icon + " " + DISCIPLINES[d].name + " · change";
  chip.href = "index.html";
  chip.hidden = false;
}

// Filter tabs: "All" plus one per discipline.
function buildTabs(container, selected, onChange) {
  var keys = ["all"].concat(Object.keys(DISCIPLINES));
  container.innerHTML = keys.map(function (k) {
    var label = k === "all" ? "All" : DISCIPLINES[k].name;
    return '<button class="tab' + (k === selected ? " active" : "") + '" data-key="' + k + '">' + label + "</button>";
  }).join("");
  container.onclick = function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    container.querySelectorAll(".tab").forEach(function (t) { t.classList.toggle("active", t === btn); });
    onChange(btn.dataset.key);
  };
}

// ---------- Starter content so the pages are not empty ----------
var SAMPLE_IDEAS = [
  { id: 1, discipline: "mechanical", title: "Low-cost vibration monitor for workshop machines", body: "Clip-on accelerometer that warns before bearings fail. Looking for help with the sensor mounting and data analysis.", tags: ["sensors", "maintenance"], author: "Priya S.", votes: 12 },
  { id: 2, discipline: "electrical", title: "Open-source battery management board", body: "Modular BMS for small electric vehicles and e-bikes. Need someone to review the balancing circuit.", tags: ["batteries", "PCB"], author: "Tom H.", votes: 9 },
  { id: 3, discipline: "chemical", title: "Recycling waste heat from small breweries", body: "Heat exchanger design to reuse wort-boiling heat for cleaning water. Seeking a mechanical partner.", tags: ["energy", "heat transfer"], author: "Lena M.", votes: 7 },
  { id: 4, discipline: "civil", title: "Sensor network for ageing footbridges", body: "Cheap strain gauges and a dashboard so councils can spot problems early.", tags: ["structures", "IoT"], author: "Marcus O.", votes: 5 },
  { id: 5, discipline: "aerospace", title: "3D-printed drone frame stress testing", body: "Comparing infill patterns for strength vs weight. Would love lab access or FEA help.", tags: ["3D printing", "FEA"], author: "Aisha K.", votes: 8 },
  { id: 6, discipline: "software", title: "Plain-English tolerance stack-up calculator", body: "A web tool that explains each step of a tolerance stack so apprentices can learn from it.", tags: ["tools", "education"], author: "Dan R.", votes: 11 },
  { id: 7, discipline: "nuclear", title: "Remote inspection crawler for decommissioning", body: "Small tracked robot with a radiation-hardened camera for checking old pipework. Looking for help with shielding and controls.", tags: ["robotics", "decommissioning"], author: "Owen T.", votes: 6 }
];

var SAMPLE_PEOPLE = [
  { id: 1, name: "Priya Shah", role: "Design Engineer", discipline: "mechanical", location: "Birmingham", skills: ["SolidWorks", "GD&T", "Sheet metal"], looking: "Collaborators for a condition-monitoring project" },
  { id: 2, name: "Tom Hughes", role: "Electronics Engineer", discipline: "electrical", location: "Bristol", skills: ["PCB design", "Power electronics", "C"], looking: "Mechanical partner for enclosures" },
  { id: 3, name: "Lena Müller", role: "Process Engineer", discipline: "chemical", location: "Leeds", skills: ["Aspen HYSYS", "Heat exchangers", "HAZOP"], looking: "Mentoring graduate engineers" },
  { id: 4, name: "Marcus Owusu", role: "Structural Engineer", discipline: "civil", location: "London", skills: ["Steel design", "Eurocodes", "Revit"], looking: "Sensor and software people for bridge monitoring" },
  { id: 5, name: "Aisha Khan", role: "Aerospace Engineer", discipline: "aerospace", location: "Derby", skills: ["ANSYS", "Composites", "CFD"], looking: "Access to a test rig" },
  { id: 6, name: "Dan Reid", role: "Software Engineer", discipline: "software", location: "Manchester", skills: ["Python", "Web apps", "Automation"], looking: "Engineers with problems worth automating" },
  { id: 7, name: "Grace Liu", role: "Manufacturing Engineer", discipline: "mechanical", location: "Coventry", skills: ["Lean", "Welding", "CNC"], looking: "Swapping shop-floor improvement ideas" },
  { id: 8, name: "Sam Patel", role: "Controls Engineer", discipline: "electrical", location: "Sheffield", skills: ["PLC", "SCADA", "Motor drives"], looking: "Side projects in robotics" },
  { id: 9, name: "Owen Thomas", role: "Nuclear Safety Engineer", discipline: "nuclear", location: "Cumbria", skills: ["Safety cases", "Shielding", "MCNP"], looking: "Robotics engineers for remote inspection" }
];

// ---------- Live news banner (under the top bar on every page) ----------
// Headlines come from news.json, which update_news.py refreshes from real news feeds.
function timeAgo(iso) {
  var mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return Math.max(mins, 1) + "m ago";
  if (mins < 60 * 24) return Math.round(mins / 60) + "h ago";
  return Math.round(mins / 1440) + "d ago";
}

function addNewsTicker() {
  var topbar = document.querySelector(".topbar");
  if (!topbar) return;
  var bar = document.createElement("div");
  bar.className = "ticker";
  bar.innerHTML = '<a class="ticker-label" href="news.html"><span class="live-dot"></span>Latest</a>' +
    '<div class="ticker-window"><div class="ticker-track"></div></div>';
  topbar.insertAdjacentElement("afterend", bar);
  var track = bar.querySelector(".ticker-track");
  // Stick just under the top bar, whose height changes on narrow screens. Also tell the
  // browser how much of the top is covered, so when it scrolls to a box (for example one
  // that needs filling in) it stops below the top bar and banner instead of behind them.
  function stickUnderTopbar() {
    bar.style.top = topbar.offsetHeight + "px";
    var covered = topbar.offsetHeight + (bar.isConnected ? bar.offsetHeight : 0);
    document.documentElement.style.scrollPaddingTop = (covered + 44) + "px"; // room for the box's label too
  }
  function removeBar() { bar.remove(); stickUnderTopbar(); }
  stickUnderTopbar();
  window.addEventListener("resize", stickUnderTopbar);

  function show(data) {
    var me = currentDiscipline();
    var items = (data.items || []).filter(function (i) { return /^https?:\/\//.test(i.link); }).slice(0, 30);
    if (!items.length) { removeBar(); return; }
    // Headlines from your own area go first
    if (me) items.sort(function (a, b) { return (b.area === me) - (a.area === me); });
    var html = items.map(function (i) {
      return '<a class="ticker-item" href="' + escapeHtml(i.link) + '" target="_blank" rel="noopener">' +
        '<span class="ticker-source">' + escapeHtml(i.source) + "</span>" + escapeHtml(i.title) +
        '<span class="ticker-time">' + timeAgo(i.published) + "</span></a>";
    }).join("");
    track.innerHTML = html + '<span aria-hidden="true" class="ticker-copy">' + html + "</span>"; // twice, so the loop is seamless
    track.querySelectorAll(".ticker-copy a").forEach(function (a) { a.tabIndex = -1; });
    // Same reading speed however many headlines there are (about 70 pixels a second)
    track.style.animationDuration = Math.max(track.scrollWidth / 2 / 70, 20) + "s";
    bar.title = "Updated " + timeAgo(data.updated) + ". Hover to pause.";
    stickUnderTopbar();
  }

  function load() {
    fetch("news.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(show)
      .catch(function () { if (!track.children.length) removeBar(); });
  }
  load();
  setInterval(load, 15 * 60 * 1000); // check for new headlines every 15 minutes
}
addNewsTicker();

// ---------- "Early preview" notice (top of every page until dismissed) ----------
// Until the site has a shared database, posts only live in each visitor's own browser.
function addPreviewNotice() {
  var main = document.querySelector("main");
  if (!main || load("preview_dismissed", false)) return;
  var note = document.createElement("div");
  note.className = "preview-notice";
  note.setAttribute("role", "note");
  note.innerHTML = "<span><strong>Early preview.</strong> Ideas, connection requests and job adverts are saved " +
    "on this device only for now, and the engineers, ideas and jobs shown are examples.</span>" +
    '<button type="button" class="btn secondary">Got it</button>';
  note.querySelector("button").onclick = function () { save("preview_dismissed", true); note.remove(); };
  main.insertBefore(note, main.firstChild);
}
addPreviewNotice();

// ---------- Footer with the founder's details (bottom of every page) ----------
var FOUNDER = { name: "Jake Marshall", email: "jake.marshall6739476@gmail.com" };

function addFooter() {
  if (!document.querySelector("main")) return;
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = '<div class="founder"><span class="founder-label">Founder</span>' +
    "<strong>" + escapeHtml(FOUNDER.name) + "</strong>" +
    '<a href="mailto:' + escapeHtml(FOUNDER.email) + '">' + escapeHtml(FOUNDER.email) + "</a></div>" +
    '<div class="meta">© ' + new Date().getFullYear() + " Engineer Connect</div>";
  document.body.appendChild(footer);
}
addFooter();
