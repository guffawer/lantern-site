/* Lantern playtest telemetry.
   Records: tester code, role, screens visited with timestamps, taps on key buttons, consent toggles, session length.
   Never records: message text, notes, phone numbers, codes or anything typed into a field.
   Storage: this phone only (localStorage). No GitHub token is shipped on this public site.
   The tester shares the report from the menu (Share / Copy / Download). If LANTERN_CFG.relayUrl is ever set,
   the same JSON is also POSTed there (path convention: lantern/<YYYY-MM-DD>/<session-id>.json in guffawer/playtest-logs). */
(function () {
  'use strict';
  var CFG = window.LANTERN_CFG || {};
  var KEY = 'lantern.pt.sessions', TKEY = 'lantern.pt.tester', MAX = 5;
  var LS = null; try { LS = window.localStorage; } catch (e) {}
  function sget(k) { try { return LS.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { LS.setItem(k, v); } catch (e) {} }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function iso(ms) { return new Date(ms).toISOString(); }
  function hex(n) {
    var s = '', a, i;
    try { a = new Uint8Array(n); crypto.getRandomValues(a); for (i = 0; i < n; i++) s += pad(a[i].toString(16)).slice(-2); return s; } catch (e) {}
    return String(Date.now()).slice(-n * 2);
  }
  var t0 = Date.now(), d = new Date(t0);
  var S = {
    schema: 1, app: 'lantern-playtest',
    sessionId: d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z-' + hex(3),
    tester: sget(TKEY) || '', role: '', startedAt: iso(t0), endedAt: iso(t0), activeSec: 0,
    device: {
      ua: (navigator.userAgent || '').replace(/\s+/g, ' ').slice(0, 160), screen: [screen.width, screen.height],
      inner: [window.innerWidth, window.innerHeight], dpr: window.devicePixelRatio || 1, lang: navigator.language || null,
      cores: navigator.hardwareConcurrency || null, mem: navigator.deviceMemory || null, standalone: !!(window.matchMedia && matchMedia('(display-mode: standalone)').matches)
    },
    screens: [], taps: [], backgrounds: 0, errors: 0, errorSamples: []
  };
  var curScreen = null, curAt = 0, lastTick = t0, saveT = 0;

  function load() { try { return JSON.parse(sget(KEY)) || []; } catch (e) { return []; } }
  function save() {
    S.endedAt = iso(Date.now());
    var all = load().filter(function (x) { return x.sessionId !== S.sessionId; });
    all.push(S); if (all.length > MAX) all = all.slice(all.length - MAX);
    try { sset(KEY, JSON.stringify(all)); } catch (e) {}
  }
  function sched() { if (!saveT) saveT = setTimeout(function () { saveT = 0; save(); }, 800); }
  function closeScreen(now) {
    if (curScreen && S.screens.length) { var cur = S.screens[S.screens.length - 1]; cur.sec = Math.round((now - curAt) / 100) / 10; }
  }
  function touch() {
    var now = Date.now();
    if (!document.hidden && now - lastTick < 60000) S.activeSec += (now - lastTick) / 1000;
    lastTick = now;
  }

  var T = {
    session: S,
    setTester: function (code, role) {
      S.tester = String(code || '').slice(0, 40); S.role = role || S.role; sset(TKEY, S.tester); sched();
    },
    screen: function (id) {
      var now = Date.now(); touch(); closeScreen(now);
      if (curScreen === id) { sched(); return; }
      curScreen = id; curAt = now;
      S.screens.push({ s: id, at: iso(now), t: Math.round((now - t0) / 100) / 10 });
      if (S.screens.length > 400) S.screens.shift();
      sched();
    },
    tap: function (k, v) {
      var now = Date.now(); touch();
      var o = { t: Math.round((now - t0) / 100) / 10, s: curScreen, k: k };
      if (v !== undefined && v !== null && v !== '') o.v = typeof v === 'string' ? v.slice(0, 40) : v;
      S.taps.push(o); if (S.taps.length > 1500) S.taps.shift(); sched();
    },
    report: function () {
      touch(); closeScreen(Date.now()); curAt = Date.now(); save();
      var all = load();
      all.forEach(function (x) { x.lengthSec = Math.round((new Date(x.endedAt) - new Date(x.startedAt)) / 1000); x.activeSec = Math.round(x.activeSec); });
      return { schema: 1, app: 'lantern-playtest', tester: S.tester, role: S.role, generatedAt: iso(Date.now()), note: 'No message text, notes or typed values are recorded.', sessions: all };
    },
    reportText: function () { return JSON.stringify(T.report()); },
    clear: function () { try { LS.removeItem(KEY); } catch (e) {} S.screens = []; S.taps = []; S.errors = 0; S.errorSamples = []; save(); }
  };

  document.addEventListener('visibilitychange', function () {
    var now = Date.now();
    if (document.hidden) { touch(); S.backgrounds++; T.tap('app_background'); save(); relay(); }
    else lastTick = now;
  });
  window.addEventListener('pagehide', function () { touch(); closeScreen(Date.now()); save(); relay(); });
  window.addEventListener('error', function (e) {
    S.errors++; if (S.errorSamples.length < 5) S.errorSamples.push(String(e.message || '').slice(0, 120) + ' @' + String(e.filename || '').split('/').pop() + ':' + (e.lineno || 0));
    sched();
  });
  setInterval(function () { if (!document.hidden) { touch(); save(); } }, 15000);

  var relayed = 0;
  function relay() {
    if (!CFG.relayUrl || !S.tester) return;
    var now = Date.now(); if (now - relayed < 5000) return; relayed = now;
    try {
      var body = JSON.stringify({ path: 'lantern/' + S.startedAt.slice(0, 10) + '/' + S.sessionId + '.json', report: T.report() });
      if (navigator.sendBeacon) navigator.sendBeacon(CFG.relayUrl, new Blob([body], { type: 'text/plain' }));
      else fetch(CFG.relayUrl, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' });
    } catch (e) {}
  }
  T.relay = relay;
  window.LanternTelemetry = T;
  save();
})();
