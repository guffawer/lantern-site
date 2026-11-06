/* Lantern playtest: core (state, router, helpers, playtest menu). No external runtime. */
(function () {
  'use strict';
  var T = window.LanternTelemetry;
  var L = window.L = { SC: {}, S: {}, A: {}, order: [] };
  var S = L.S;

  /* ---------- icons ---------- */
  var ICON = {
    lantern: '<path d="M9 3h6"/><path d="M12 3v2"/><path d="M8 7h8l1 3v7l-1 3H8l-1-3v-7z"/><path d="M12 11c1.2 1.3 1.2 3.2 0 4.5c-1.2-1.3-1.2-3.2 0-4.5z"/>',
    sparkle: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>',
    sparkle2: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    check: '<path d="M5 12l5 5L20 7"/>', moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>', chev: '<path d="M9 6l6 6-6 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14c2 .7 3 2.8 3 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    plug: '<path d="M9 2v5M15 2v5"/><path d="M6 7h12v4a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
    facedown: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 9l2-2 2 2M5 7v6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    play: '<path d="M8 5l11 7-11 7z"/>', pause: '<path d="M8 5v14M16 5v14"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>', send: '<path d="M4 12l16-8-6 16-3-7z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>', plus: '<path d="M12 5v14M5 12h14"/>', back: '<path d="M15 6l-6 6 6 6"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-1.5-3-5-4-5-1.5S10 9 12 9c2 0 5-0.5 5-1.5S13.5 6 12 9z"/>',
    gift2: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-2-4-6-4-6-1s6 1 6 1c2-4 6-4 6-1s-6 1-6 1"/>'
  };
  L.ic = function (n, s, w) {
    s = s || 20; w = w || 1.8;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
  };
  var ic = L.ic;

  /* ---------- helpers ---------- */
  L.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  L.fmt = function (base, m) {
    var total = ((base * 60 + m) % 1440 + 1440) % 1440, h = Math.floor(total / 60), mm = total % 60, h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + (mm < 10 ? '0' + mm : mm) + ' ' + (h >= 12 ? 'pm' : 'am');
  };
  L.fmtMin = function (m) { return L.fmt(22, m); };
  L.scr = function (inner, o) {
    o = o || {};
    return '<main class="scr ' + (o.cls || '') + '"' + (o.style ? ' style="' + o.style + '"' : '') + '>' + inner + '</main>';
  };
  L.bg = function (stop, alpha, h) {
    return '--bgimg:radial-gradient(' + (h || '120% 55%') + ' at 50% -12%,rgba(230,194,122,' + alpha + '),rgba(11,18,34,0) 62%),linear-gradient(180deg,#0B1222 55%,#16213A 150%)';
  };
  L.nav = function (on) {
    function a(id, name, icon, k) { return '<a href="#/' + id + '" class="navi' + (on === k ? ' on' : '') + '" data-k="nav" data-v="' + k + '">' + ic(icon, 22) + '<span>' + name + '</span></a>'; }
    return '<nav aria-label="Main" class="navbar">' + a('home', 'Tonight', 'moon', 'tonight') + a('circle-night', 'Circle', 'people', 'circle') + a('morning-sealed', 'Mornings', 'sun', 'mornings') + '</nav>';
  };
  L.prog = function (pct, n) {
    return '<div class="row"><div style="flex:1;height:4px;border-radius:4px;background:var(--line)"><div style="width:' + pct + '%;height:4px;border-radius:4px;background:var(--hi)"></div></div><span class="muted" style="font-size:13px;font-weight:600">' + n + ' of 11</span></div>';
  };
  L.pill = function (on, label, a, v, k, extra) {
    return '<button class="pill' + (on ? ' on' : '') + '" data-a="' + a + '" data-v="' + v + '" data-k="' + (k || a) + '"' + (extra || '') + '>' + label + '</button>';
  };
  L.sw = function (on, label, a, k) {
    return '<button class="sw' + (on ? ' on' : '') + '" role="switch" aria-checked="' + (on ? 'true' : 'false') + '" aria-label="' + label + '" data-a="' + a + '" data-k="' + k + '" data-v="' + (on ? 'off' : 'on') + '"><span class="tr"><span class="kn"></span></span></button>';
  };
  /* mock "another app" backdrop used by ring + final reel + overlay preview (palette-mapped) */
  L.mockApp = function (op, scale) {
    return '<div aria-hidden="true" class="abs-fill" style="background:#16213A;opacity:' + op + '"><div style="position:absolute;left:-60px;top:120px;width:300px;height:300px;border-radius:50%;background:#22304D"></div><div style="position:absolute;right:-40px;top:360px;width:220px;height:220px;border-radius:40px;background:#3A4A6B;transform:rotate(18deg)"></div><div style="position:absolute;left:90px;top:300px;width:140px;height:140px;border-radius:50%;background:#E6C27A"></div><div style="position:absolute;right:16px;bottom:150px;display:flex;flex-direction:column;gap:18px"><div style="width:40px;height:40px;border-radius:50%;border:2px solid rgba(236,232,223,.6)"></div><div style="width:40px;height:40px;border-radius:50%;border:2px solid rgba(236,232,223,.6)"></div><div style="width:40px;height:40px;border-radius:50%;border:2px solid rgba(236,232,223,.6)"></div></div><div style="position:absolute;left:20px;bottom:60px;width:240px;display:flex;flex-direction:column;gap:8px"><div style="height:12px;width:120px;border-radius:6px;background:rgba(236,232,223,.8)"></div><div style="height:10px;width:220px;border-radius:6px;background:rgba(236,232,223,.5)"></div><div style="height:10px;width:170px;border-radius:6px;background:rgba(236,232,223,.5)"></div></div></div>';
  };

  /* ---------- state ---------- */
  var defaults = function () {
    return {
      tester: '', role: '', secs: 8040,
      oa: 180, ob: 360, loopI: 0, t: 90, len: 30, planOff: false, planDone: false, invOtp: false, brand: 'Xiaomi', placed: false,
      ringOpen: true, ringPaused: false, ringWarn: false, ringSize: 'M', encore: false, theme: 'sunset', run: 0, note: '', noteHeart: false,
      playing: false, hearted: false, rec: 0, gn: {}, menu: false, cg: 150, cn: 2, cplan: 'month', cdone: false,
      sRing: true, sSize: 'M', sOp: '100%', reward: 'moon', schedule: 'Weekdays', mute: false, gift: false, asked: false,
      reminder: false, stopped: false, gplan: 'month', gsent: false, smode: 'voice', srec: 0, smsg: '', consent: false
    };
  };
  Object.assign(S, defaults());
  L.reset = function () { var k; for (k in S) delete S[k]; Object.assign(S, defaults()); try { sessionStorage.removeItem('lantern.role'); } catch (e) {} };

  /* ---------- timers ---------- */
  var timers = [];
  L.every = function (fn, ms) { timers.push(setInterval(fn, ms)); };
  function clearTimers() { while (timers.length) clearInterval(timers.pop()); }

  /* ---------- playtest menu ---------- */
  var MENU = [
    ['App · onboarding', ['welcome', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'o10', 'o11'], 'app'],
    ['App · nightly loop', ['home', 'plan', 'metime-start', 'metime-ring', 'final-reel', 'ritual', 'note', 'lights-out', 'lights-out-reward'], 'app'],
    ['App · morning, circles, premium', ['morning-sealed', 'morning-unlocked', 'morning-held', 'morning-self', 'morning-self-none', 'circle-night', 'circle-invite', 'premium', 'trial', 'settings', 'trial-ended'], 'app'],
    ['Sender · no install', ['sender-record', 'sender-sent', 'gift-nudge', 'sender-gift'], 'sender']
  ];
  var roleLabel = { app: 'Trying the app', sender: 'Sending a message', '': 'Start' };
  function bar() {
    var cur = L.cur || 'start';
    return '<div class="ptbar"><span>Lantern playtest · ' + roleLabel[S.role || ''] + '</span><button data-a="menu" data-k="menu_open" aria-label="Playtest menu">Menu</button></div>';
  }
  function menuHtml() {
    var h = '<div class="sheet" data-sheet="1"><div role="dialog" aria-label="Playtest menu"><div class="row" style="justify-content:space-between"><h2>Playtest menu</h2><button class="pill" data-a="closesheet" style="min-height:36px">Close</button></div>' +
      '<p class="muted" style="font-size:13px">Tester: <b>' + L.esc(S.tester || 'not set') + '</b>. Jump to any screen, then keep testing from there.</p>' +
      '<button class="btn primary" data-a="report" data-k="report_open" style="min-height:48px">Send test report</button>';
    MENU.forEach(function (g) {
      if (S.role && g[2] !== S.role) return;
      h += '<p class="grp">' + g[0] + '</p>';
      g[1].forEach(function (id) {
        var sc = L.SC[id]; if (!sc) return;
        h += '<a class="sl' + (id === L.cur ? ' cur' : '') + '" href="#/' + id + '" data-k="menu_jump" data-v="' + id + '"><span>' + sc.title + '</span></a>';
      });
    });
    h += '<p class="grp">Other</p>';
    if (S.role) h += '<a class="sl" href="#/start" data-a="restart" data-k="menu_restart"><span>Back to start (switch role)</span></a>';
    h += '</div></div>';
    return h;
  }
  function reportHtml() {
    var txt = T.reportText();
    var can = !!navigator.share;
    return '<div class="sheet" data-sheet="1"><div role="dialog" aria-label="Test report"><div class="row" style="justify-content:space-between"><h2>Test report</h2><button class="pill" data-a="closesheet" style="min-height:36px">Close</button></div>' +
      '<p class="muted" style="font-size:13px">Lists the screens you opened and the buttons you tapped, with times. It never contains message text, notes or anything you typed. Send it to Sid.</p>' +
      '<textarea id="rpt" readonly aria-label="Report text">' + L.esc(txt) + '</textarea>' +
      (can ? '<button class="btn primary" data-a="share" data-k="report_share" style="min-height:48px">Share (WhatsApp, email...)</button>' : '') +
      '<button class="btn ' + (can ? 'ghost' : 'primary') + '" data-a="copy" data-k="report_copy" style="min-height:48px">Copy report</button>' +
      '<button class="btn ghost" data-a="download" data-k="report_download" style="min-height:48px">Download file</button></div></div>';
  }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2400);
  }
  L.toast = toast;
  function closeSheet() { var s = document.querySelector('[data-sheet]'); if (s) s.parentNode.removeChild(s); }
  function openSheet(html) { closeSheet(); var d = document.createElement('div'); d.innerHTML = html; document.body.appendChild(d.firstChild); }

  /* ---------- render + router ---------- */
  var root = null;
  function render(keepScroll) {
    var sc = L.SC[L.cur]; if (!sc) return;
    var y = keepScroll ? (window.pageYOffset || 0) : 0;
    clearTimers();
    root.innerHTML = bar() + sc.html();
    if (sc.mount) sc.mount();
    window.scrollTo(0, y);
  }
  L.render = function () { render(true); };

  function route() {
    var id = (location.hash || '').replace(/^#\/?/, '') || 'start';
    if (!L.SC[id]) id = 'start';
    if (id !== 'start' && !S.tester) {
      var saved = null; try { saved = localStorage.getItem('lantern.pt.tester'); } catch (e) {}
      var r = null; try { r = sessionStorage.getItem('lantern.role'); } catch (e) {}
      if (saved && r) { S.tester = saved; S.role = r; } else { location.hash = '#/start'; return; }
    }
    closeSheet();
    L.cur = id;
    T.screen(id);
    render(false);
  }
  L.go = function (id) { location.hash = '#/' + id; };

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var tgt = e.target.closest ? e.target.closest('[data-a],[data-k],a.sl') : null;
    if (!tgt) return;
    var k = tgt.getAttribute('data-k'), v = tgt.getAttribute('data-v'), a = tgt.getAttribute('data-a');
    if (k && k !== 'menu_open') T.tap(k, v);
    else if (k === 'menu_open') T.tap(k);
    if (tgt.classList && tgt.classList.contains('sl')) closeSheet();
    if (a && L.A[a]) {
      var res = L.A[a](v, tgt, e);
      if (res !== false) { if (a !== 'menu' && a !== 'report' && a !== 'closesheet' && a !== 'share' && a !== 'copy' && a !== 'download') render(true); }
    }
  });
  document.addEventListener('input', function (e) {
    var el = e.target; if (!el || !el.getAttribute) return;
    var f = el.getAttribute('data-f');
    if (f === 'note') { S.note = el.value.slice(0, 120); var c = document.getElementById('ncount'); if (c) c.textContent = S.note.length + ' / 120'; }
    else if (f === 'smsg') { S.smsg = el.value.slice(0, 500); var c2 = document.getElementById('scount'); if (c2) c2.textContent = S.smsg.length + ' / 500'; }
  });
  document.addEventListener('change', function (e) {
    var el = e.target; if (!el || !el.getAttribute) return;
    if (el.getAttribute('data-f') === 'consent') { S.consent = !!el.checked; T.tap('consent_sender_updates', S.consent ? 'on' : 'off'); }
  });

  /* core actions */
  L.A.menu = function () { openSheet(menuHtml()); return false; };
  L.A.closesheet = function () { closeSheet(); return false; };
  L.A.report = function () { openSheet(reportHtml()); return false; };
  L.A.restart = function () { L.reset(); T.session.role = ''; return false; };
  L.A.share = function () {
    var txt = T.reportText();
    navigator.share({ title: 'Lantern playtest report', text: txt }).then(function () { T.relay && T.relay(); }, function () {});
    return false;
  };
  L.A.copy = function () {
    var txt = T.reportText(), done = function () { toast('Report copied'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(); });
    else fallbackCopy();
    function fallbackCopy() { var ta = document.getElementById('rpt'); if (ta) { ta.focus(); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Press and hold to copy'); } } }
    return false;
  };
  L.A.download = function () {
    try {
      var b = new Blob([T.reportText()], { type: 'application/json' }), u = URL.createObjectURL(b), a = document.createElement('a');
      a.href = u; a.download = 'lantern-playtest-' + (S.tester || 'tester').replace(/[^\w-]+/g, '_') + '.json'; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(u); a.parentNode.removeChild(a); }, 500);
    } catch (e) { toast('Could not download'); }
    return false;
  };

  L.start = function () {
    root = document.getElementById('app');
    window.addEventListener('hashchange', route);
    if (!location.hash) { history.replaceState(null, '', '#/start'); }
    route();
  };
  L.setRole = function (role) {
    S.role = role; try { sessionStorage.setItem('lantern.role', role); } catch (e) {}
  };
})();
