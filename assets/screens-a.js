/* Lantern playtest: start, onboarding and the nightly loop. */
(function () {
  'use strict';
  var L = window.L, S = L.S, A = L.A, ic = L.ic, scr = L.scr, esc = L.esc, T = window.LanternTelemetry;
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }

  /* ---------- start ---------- */
  def('start', 'Start', function () {
    return scr(
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px">' +
      '<div style="width:76px;height:76px;border-radius:26px;background:var(--card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--hi);box-shadow:0 0 60px rgba(230,194,122,.25)">' + ic('lantern', 42, 1.6) + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><p class="eyebrow">Project Lantern · playtest</p><h1 style="font-size:32px">Thanks for trying Lantern</h1>' +
      '<p class="muted" style="font-size:16px">A clickable preview of the app and the pages a loved one sees. Nothing here is real: no sign-up, no payments, no messages are sent.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><label for="tcode" style="font-size:14px;font-weight:700">Your first name or tester code</label>' +
      '<input id="tcode" class="field" maxlength="40" autocomplete="off" autocapitalize="words" enterkeyhint="done" placeholder="e.g. Priya or T-07" value="' + esc(S.tester) + '"></div>' +
      '<div class="start-roles">' +
      '<button class="role" data-a="role" data-v="app" data-k="start_role"><span style="color:var(--hi)">' + ic('moon', 28) + '</span><span><b>I\'m trying the app</b><span class="s">Onboarding, nightly routine, mornings, Circles, Premium</span></span></button>' +
      '<button class="role" data-a="role" data-v="sender" data-k="start_role"><span style="color:var(--hi)">' + ic('chat', 28) + '</span><span><b>I\'m sending a message</b><span class="s">Record a message, WhatsApp gift note, UPI gift page</span></span></button></div>' +
      '<p class="muted" style="font-size:12px">To help improve the design, this preview records which screens you open and which buttons you tap, with times. It never records anything you type, including messages.</p>' +
      '</div>');
  });
  A.role = function (v) {
    var el = document.getElementById('tcode'), code = el ? el.value.trim() : '';
    if (!code) { if (el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); el.focus(); } L.toast('Please enter your first name or a code'); return false; }
    S.tester = code; L.setRole(v); T.setTester(code, v);
    L.go(v === 'app' ? 'welcome' : 'sender-record');
    return false;
  };

  /* ---------- onboarding ---------- */
  def('welcome', 'Welcome', function () {
    return scr(
      '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:32px">' +
      '<div style="width:88px;height:88px;border-radius:28px;background:var(--card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--hi);box-shadow:0 0 60px rgba(230,194,122,.25)">' + ic('lantern', 48, 1.6) + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:14px"><p class="eyebrow">Lantern</p><h1 style="font-size:38px">Don\'t fight the night.<br>Give it an ending.</h1>' +
      '<p class="muted" style="font-size:17px">Keep your scroll time. Lantern helps it end when you planned, and makes going to sleep the best part of the night.</p></div></div>' +
      '<div class="card row" style="gap:14px;padding:14px 16px;box-shadow:0 0 25px rgba(230,194,122,.15),0 12px 30px rgba(5,9,18,.5)"><span style="width:40px;height:40px;flex:none;border-radius:16px;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center">' + ic('sparkle') + '</span>' +
      '<div style="flex:1"><p style="font-weight:800;font-size:15px">Your 14-day trial starts today</p><p class="muted" style="font-size:13px">Everything included, no payment details. Then Rs 99 a month or Rs 599 a year.</p></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><a href="#/o2" class="btn primary" data-k="welcome_start">Start my 14 days</a><p class="muted" style="text-align:center;font-size:13px">No sign-up needed. About 3 minutes.</p></div>');
  });

  function stepper(label, val, aMinus, aPlus, size, k) {
    return '<div class="card" style="display:flex;flex-direction:column;gap:12px"><p class="muted" style="font-size:14px;font-weight:600">' + label + '</p><div class="row" style="justify-content:space-between">' +
      '<button class="step" data-a="ostep" data-v="' + aMinus + '" data-k="' + k + '" aria-label="Earlier">&#8722;</button><span style="font-size:' + size + 'px;font-weight:800">' + val + '</span>' +
      '<button class="step" data-a="ostep" data-v="' + aPlus + '" data-k="' + k + '" aria-label="Later">+</button></div></div>';
  }
  def('o2', 'Onboarding 2 · Sleep times', function () {
    var g = Math.max(0, S.ob - S.oa), h = Math.floor(g / 60), m = g % 60;
    var gap = ((h ? h + ' h' : '') + (h && m ? ' ' : '') + (m ? m + ' min' : '')) || '0 min';
    return scr(L.prog(18, 2) +
      '<div style="display:flex;flex-direction:column;gap:10px"><h1>When does sleep usually find you?</h1><p class="muted">A rough guess is fine.</p></div>' +
      stepper('I start feeling sleepy around', L.fmt(20, S.oa), 'a-', 'a+', 30, 'onb_sleepy') +
      stepper('I actually fall asleep around', L.fmt(20, S.ob), 'b-', 'b+', 30, 'onb_asleep') +
      '<div style="display:flex;flex-direction:column;gap:6px;padding:0 4px"><p style="font-size:18px;font-weight:700">That\'s ' + gap + ' of night with no ending.</p><p class="muted">Most of it is time you enjoy. Lantern keeps the fun and gives it a finish line you choose.</p></div>' +
      '<a href="#/o3" class="btn primary" style="margin-top:auto">Continue</a>');
  });
  A.ostep = function (v) {
    if (v === 'a-') S.oa = Math.max(60, S.oa - 15);
    if (v === 'a+') S.oa = Math.min(S.ob, S.oa + 15);
    if (v === 'b-') S.ob = Math.max(S.oa, S.ob - 15);
    if (v === 'b+') S.ob = Math.min(480, S.ob + 15);
  };

  var CARDS = [
    { kicker: '1 · Me-Time', head: 'A guilt-free window that is all yours', body: 'Scroll, watch, play. One quiet hello when it starts, then silence. A small ring shows how much is left.', icon: 'play' },
    { kicker: '2 · Final Reel', head: 'Finish the one you are on', body: 'At your last-scroll time you get a Final Reel, then a short closing ritual: plug in, flip it over, lights out.', icon: 'moon' },
    { kicker: '3 · Morning Drop', head: 'Wake up to something worth it', body: 'Sleep on time and a sealed message from someone who loves you opens in the morning, plus a note from last-night you.', icon: 'mail' }
  ];
  def('o3', 'Onboarding 3 · How the night works', function () {
    var i = S.loopI, c = CARDS[i], dots = '';
    CARDS.forEach(function (x, k) { dots += '<div style="height:8px;border-radius:8px;background:' + (k === i ? 'var(--hi);width:24px' : 'var(--line);width:8px') + '"></div>'; });
    return scr(L.prog(27, 3) +
      '<div style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">How your night works</p><h1>Three moments. That\'s the whole app.</h1></div>' +
      '<div class="card" style="flex:1;display:flex;flex-direction:column;gap:18px;justify-content:center;align-items:flex-start;padding:28px;background:var(--card2)">' +
      '<div style="width:96px;height:96px;border-radius:50%;border:1px solid rgba(230,194,122,.25);box-shadow:0 0 25px rgba(230,194,122,.18);display:flex;align-items:center;justify-content:center;color:var(--hi)">' + ic(c.icon, 40) + '</div>' +
      '<p class="eyebrow">' + c.kicker + '</p><h2 style="font-size:26px">' + c.head + '</h2><p class="muted" style="font-size:16px">' + c.body + '</p></div>' +
      '<div class="row" style="justify-content:center"><div class="row" style="gap:6px">' + dots + '</div></div>' +
      '<div class="row">' + (i > 0 ? '<button class="btn ghost" style="width:120px" data-a="loop" data-v="prev" data-k="onb_loop">Back</button>' : '') +
      (i < 2 ? '<button class="btn primary" data-a="loop" data-v="next" data-k="onb_loop">Next</button>' : '<a href="#/o4" class="btn primary">Set my first plan</a>') + '</div>');
  });
  A.loop = function (v) { S.loopI = v === 'next' ? Math.min(2, S.loopI + 1) : Math.max(0, S.loopI - 1); };

  /* shared plan controls (onboarding 4 + plan check-in) */
  function planControls() {
    var lens = [20, 30, 45].map(function (v) { return L.pill(v === S.len, v + ' min', 'plan', 'len' + v, 'plan_length'); }).join('');
    return '<div class="card" style="display:flex;flex-direction:column;gap:14px"><p class="muted" style="font-size:14px;font-weight:600">Last scroll</p>' +
      '<div class="row" style="justify-content:space-between"><button class="step" data-a="plan" data-v="t-" data-k="plan_time" aria-label="15 minutes earlier">&#8722;</button>' +
      '<span style="font-size:34px;font-weight:800;letter-spacing:-.02em">' + L.fmtMin(S.t) + '</span><button class="step" data-a="plan" data-v="t+" data-k="plan_time" aria-label="15 minutes later">+</button></div>' +
      '<p class="muted" style="font-size:13px;text-align:center">15-minute steps, 10:00 pm to 1:30 am</p></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><p class="muted" style="font-size:14px;font-weight:600">Me-Time before it</p><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px">' + lens + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;padding:4px 4px 0"><div class="row" style="justify-content:space-between"><span class="muted">Me-Time starts</span><strong>' + L.fmtMin(S.t - S.len) + '</strong></div>' +
      '<div class="row" style="justify-content:space-between"><span class="muted">Final Reel</span><strong>' + L.fmtMin(S.t) + '</strong></div>' +
      '<div class="row" style="justify-content:space-between"><span class="muted">Lights out by</span><strong>' + L.fmtMin(S.t + 30) + '</strong></div></div>';
  }
  A.plan = function (v) {
    if (v === 't-') S.t = Math.max(0, S.t - 15);
    else if (v === 't+') S.t = Math.min(210, S.t + 15);
    else if (v.indexOf('len') === 0) S.len = parseInt(v.slice(3), 10);
    else if (v === 'off') S.planOff = !S.planOff;
    else if (v === 'confirm') S.planDone = true;
    else if (v === 'edit') S.planDone = false;
  };
  def('o4', 'Onboarding 4 · First plan', function () {
    return scr(L.prog(36, 4) + '<div style="display:flex;flex-direction:column;gap:8px"><h1>Set tonight\'s plan</h1><p class="muted">When should the last scroll be? You can change it every evening.</p></div>' +
      planControls() + '<a href="#/o5" class="btn primary" style="margin-top:auto" data-k="plan_confirm" data-v="onboarding">Set tonight\'s plan</a>');
  });
  def('o5', 'Onboarding 5 · Invite a loved one', function () {
    if (!S.invOtp) {
      return scr(L.prog(45, 5) + '<div style="display:flex;flex-direction:column;gap:20px;flex:1">' +
        '<div style="display:flex;flex-direction:column;gap:8px"><h1>Who would you love to hear from in the morning?</h1><p class="muted">Invite one person to record a Morning Drop. They don\'t need the app, just WhatsApp.</p></div>' +
        '<div class="card" style="display:flex;flex-direction:column;gap:10px;background:var(--card2)"><div class="row muted" style="font-size:13px;font-weight:600">' + ic('chat', 18) + '<span>WhatsApp message preview</span></div>' +
        '<p style="background:var(--card);border-radius:18px 14px 14px 4px;padding:12px 14px;font-size:15px">Hi Amma, I\'m trying to sleep on time. Will you record a good-morning message for me? It takes a minute, no app needed: [INVITE LINK]</p></div>' +
        '<div class="row" style="gap:8px;flex-wrap:wrap"><span class="tag">Amma</span><span class="tag">Papa</span><span class="tag">Partner</span><span class="tag">Best friend</span></div>' +
        '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><button class="btn primary" data-a="otp" data-v="on" data-k="invite_whatsapp">' + ic('chat') + 'Invite via WhatsApp</button><a href="#/o6" class="btn quiet" data-k="invite_skip">Skip for now</a></div></div>');
    }
    return scr(L.prog(45, 5) + '<div style="display:flex;flex-direction:column;gap:18px;flex:1">' +
      '<div style="display:flex;flex-direction:column;gap:8px"><h1>Quick check: your number</h1><p class="muted">So Amma\'s message reaches only you. We ask for this only when you invite someone or join a Circle.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><label for="ph" style="font-size:14px;font-weight:600">Mobile number</label><div class="row" style="gap:8px"><span class="field" style="width:72px;display:flex;align-items:center;justify-content:center">+91</span><input id="ph" class="field" inputmode="numeric" autocomplete="off" placeholder="98765 43210"></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><label for="otp" style="font-size:14px;font-weight:600">6-digit code</label><input id="otp" class="field" inputmode="numeric" autocomplete="off" placeholder="&#8226; &#8226; &#8226; &#8226; &#8226; &#8226;" style="letter-spacing:.3em;text-align:center"><p class="muted" style="font-size:13px">Code sent by SMS. Resend in 0:24</p></div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/o6" class="btn primary" data-k="invite_verify">Verify and open WhatsApp</a><button class="btn quiet" data-a="otp" data-v="off">Back</button></div></div>');
  });
  A.otp = function (v) { S.invOtp = v === 'on'; };

  def('o6', 'Onboarding 6 · Notifications', function () {
    function row(a, b) { return '<div class="card row" style="align-items:flex-start"><strong style="color:var(--hi);min-width:64px">' + a + '</strong><p>' + b + '</p></div>'; }
    return scr(L.prog(55, 6) + '<div style="width:72px;height:72px;border-radius:22px;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center">' + ic('bell', 34) + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><h1>Two quiet notifications a night. That\'s it.</h1><p class="muted">No nagging, no countdown alarms.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + row('7-9 pm', 'Tonight\'s plan, pre-filled. One tap to confirm.') + row('Me-Time', '"Your Me-Time has started. Enjoy it." Then silence.') + row('Always', 'A silent progress ring in your notification shade.') + '</div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/o7" class="btn primary" data-k="consent_notifications" data-v="allow">Allow notifications</a><a href="#/o7" class="btn quiet" data-k="consent_notifications" data-v="skip">Not now</a></div>');
  });
  def('o7', 'Onboarding 7 · Usage Access', function () {
    function no(t) { return '<div class="row"><span style="color:var(--hi)">' + ic('x', 20, 2.2) + '</span><p style="font-weight:600">' + t + '</p></div>'; }
    function yes(t) { return '<div class="row"><span style="color:var(--muted)">' + ic('check', 20, 2.2) + '</span><p>' + t + '</p></div>'; }
    return scr(L.prog(64, 7) + '<div style="display:flex;flex-direction:column;gap:8px"><h1>Usage Access, in plain words</h1><p class="muted">Android needs this so Lantern knows when Me-Time ends and when you\'re down for the night.</p></div>' +
      '<div class="card" style="border:1px solid rgba(230,194,122,.25);box-shadow:0 0 25px rgba(230,194,122,.18);display:flex;flex-direction:column;gap:14px"><p class="eyebrow">Lantern never</p>' + no('Reads your messages or chats') + no('Sees what you watch, post or type') + no('Blocks, limits or closes any app') + '</div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><p class="eyebrow" style="color:var(--muted)">Lantern only uses</p>' + yes('When your screen is in use, to mark on-time nights') + yes('Which app is open, only to show your Final Reel card on top of it') + '</div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/o8" class="btn primary" data-k="consent_usage_access" data-v="open">Open Usage Access settings</a><p class="muted" style="text-align:center;font-size:13px">Find Lantern in the list and switch it on.</p></div>');
  });
  def('o8', 'Onboarding 8 · Display over apps', function () {
    return scr(L.prog(73, 8) + '<div style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Optional</p><h1>A small ring over your apps</h1><p class="muted">See how much Me-Time is left without leaving your feed. Move it, resize it or switch it off any time.</p></div>' +
      '<div style="position:relative;height:300px;border-radius:24px;overflow:hidden;border:1px solid var(--line)">' + L.mockApp(1) +
      '<div style="position:absolute;top:18px;right:18px;width:56px;height:56px;border-radius:50%;background:rgba(11,18,34,.9);display:flex;align-items:center;justify-content:center"><svg width="48" height="48" viewBox="0 0 48 48" role="img" aria-label="Me-Time ring, 18 minutes left"><circle cx="24" cy="24" r="20" fill="none" stroke="#22304D" stroke-width="4"/><circle cx="24" cy="24" r="20" fill="none" stroke="#E6C27A" stroke-width="4" stroke-linecap="round" stroke-dasharray="125.7" stroke-dashoffset="50" transform="rotate(-90 24 24)"/><text x="24" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#ECE8DF" font-family="Nunito, sans-serif">18m</text></svg></div></div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/o9" class="btn primary" data-k="consent_overlay" data-v="allow">Allow display over apps</a><a href="#/o9" class="btn quiet" data-k="consent_overlay" data-v="skip">Skip, the notification ring is enough</a></div>');
  });
  var BR = {
    Xiaomi: [['Long-press Lantern, then App info', 'Autostart'], ['Battery saver, then choose No restrictions', 'No restrictions'], ['In Recent apps, pull Lantern down to lock it', 'Lock in Recents']],
    Samsung: [['Settings, Battery, Background usage limits', 'Never sleeping apps'], ['Tap + and add Lantern', 'Lantern added'], ['App info, Battery, choose Unrestricted', 'Unrestricted']],
    Vivo: [['Settings, Battery, Background power consumption', 'Lantern'], ['Allow high background power use', 'Allow in background'], ['i Manager, App manager, Autostart', 'Autostart Lantern']],
    Oppo: [['Settings, Apps, App management, Lantern', 'Battery usage'], ['Allow background activity', 'Background activity'], ['Allow auto launch', 'Auto launch']],
    realme: [['Settings, Apps, App management, Lantern', 'Battery usage'], ['Allow background activity', 'Background activity'], ['Allow auto launch', 'Auto launch']]
  };
  def('o9', 'Onboarding 9 · Battery setup', function () {
    var brands = Object.keys(BR).map(function (k) { return '<button class="pill' + (k === S.brand ? ' on' : '') + '" style="min-height:40px;padding:0 14px" data-a="brand" data-v="' + k + '" data-k="battery_brand">' + k + '</button>'; }).join('');
    var steps = BR[S.brand].map(function (s, i) {
      return '<div class="card" style="display:flex;flex-direction:column;gap:10px;padding:14px"><div class="row" style="align-items:flex-start"><span style="width:26px;height:26px;flex:none;border-radius:50%;background:var(--hi);color:var(--accInk);font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center">' + (i + 1) + '</span><p style="font-size:14px;font-weight:600">' + s[0] + '</p></div>' +
        '<div class="row" style="justify-content:space-between;background:var(--card2);border-radius:16px;padding:10px 12px;margin-left:38px"><span style="font-size:13px">' + s[1] + '</span><span style="width:36px;height:20px;border-radius:20px;background:var(--hi);position:relative;flex:none"><span style="position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:var(--accInk)"></span></span></div></div>';
    }).join('');
    return scr(L.prog(82, 9) + '<div style="display:flex;flex-direction:column;gap:8px"><h1>Keep Lantern awake at night</h1><p class="muted">Some phones pause apps to save battery. Three taps fix it. Which phone do you have?</p></div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap">' + brands + '</div><div style="display:flex;flex-direction:column;gap:10px">' + steps + '</div>' +
      '<p class="muted" style="font-size:12px">Menu names vary a little by phone model and Android version.</p>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/o10" class="btn primary" data-k="battery_done">Done, it\'s set</a><a href="#/o10" class="btn quiet" data-k="battery_open_settings">Open battery settings</a></div>');
  });
  A.brand = function (v) { S.brand = v; };
  def('o10', 'Onboarding 10 · Lights-Out preview', function () {
    if (!S.placed) {
      return scr(L.prog(91, 10) + '<div style="flex:1;display:flex;flex-direction:column;gap:24px"><div style="display:flex;flex-direction:column;gap:8px"><h1>Feel what an on-time night feels like</h1><p class="muted">Place your phone face-down on a table, right now.</p></div>' +
        '<div style="flex:1;display:flex;align-items:center;justify-content:center"><div style="width:150px;height:260px;border-radius:28px;border:2px dashed var(--line);display:flex;align-items:center;justify-content:center;color:var(--muted);transform:rotate(-8deg)">' + ic('facedown', 56, 1.4) + '</div></div>' +
        '<button class="btn ghost" data-a="place" data-k="preview_place">Simulate: phone placed face-down</button></div>');
    }
    return scr(L.prog(91, 10) + '<div class="abs-fill" style="box-shadow:inset 0 0 0 3px var(--glow),inset 0 0 80px rgba(230,194,122,.4);pointer-events:none;animation:glowin .6s ease-out both"></div>' +
      '<div style="flex:1;display:flex;flex-direction:column;gap:22px;justify-content:center;align-items:center;text-align:center;animation:rise .5s ease-out both"><div style="width:120px;height:120px;border-radius:50%;background:var(--card2);color:var(--glow);display:flex;align-items:center;justify-content:center;box-shadow:0 0 80px rgba(230,194,122,.5)">' + ic('moon', 54, 1.6) + '</div>' +
      '<h1>Down for the night</h1><p class="muted" style="font-size:16px;max-width:290px">A soft chime, a gentle buzz and this glow. That\'s your reward every on-time night.</p><div class="row" style="gap:8px"><span class="tag">Chime</span><span class="tag">Haptic</span><span class="tag">Edge glow</span></div></div>' +
      '<a href="#/o11" class="btn primary">Continue</a>');
  });
  A.place = function () { S.placed = true; };
  def('o11', 'Onboarding 11 · Done', function () {
    return scr(L.prog(100, 11) + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:24px">' +
      '<div style="width:88px;height:88px;border-radius:28px;background:var(--card);border:1px solid var(--line);color:var(--hi);display:flex;align-items:center;justify-content:center;box-shadow:0 0 60px rgba(230,194,122,.25)">' + ic('lantern', 46, 1.6) + '</div>' +
      '<h1 style="font-size:36px">See you at Me-Time.</h1>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="row" style="justify-content:space-between"><span class="muted">Me-Time starts</span><strong>11:00 pm</strong></div><div class="row" style="justify-content:space-between"><span class="muted">Final Reel</span><strong>11:30 pm</strong></div><div class="row" style="justify-content:space-between"><span class="muted">Lights out by</span><strong>12:00 am</strong></div></div>' +
      '<a href="#/premium" class="card row" style="text-decoration:none;color:var(--ink);gap:14px;padding:14px 16px;box-shadow:0 0 25px rgba(230,194,122,.15),0 12px 30px rgba(5,9,18,.5)"><span style="width:40px;height:40px;flex:none;border-radius:16px;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center">' + ic('sparkle') + '</span>' +
      '<div style="flex:1"><p style="font-weight:800;font-size:15px">Your 14-day trial has started</p><p class="muted" style="font-size:13px">Day 1 of 14. 3 on-time nights in a row add 7 bonus days.</p></div></a>' +
      '<p class="muted">Enjoy your evening. We\'ll say hello when it\'s time.</p></div><a href="#/home" class="btn primary">Go to Tonight</a>');
  });

  /* ---------- home ---------- */
  function clock(s) { var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; function p(n) { return n < 10 ? '0' + n : '' + n; } return h + ':' + p(m) + ':' + p(x); }
  def('home', 'Home · Tonight', function () {
    var days = [['M', 1], ['T', 1], ['W', 0], ['T', 1], ['F', 1]].map(function (d) {
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px">' + (d[1] ? '<span style="width:26px;height:26px;border-radius:50%;background:var(--hi);color:var(--accInk);display:flex;align-items:center;justify-content:center">' + ic('moon', 15, 2.2) + '</span>' : '<span style="width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line)"></span>') + '<span class="muted" style="font-size:11px;font-weight:600">' + d[0] + '</span></div>';
    }).join('');
    days += '<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><span style="width:26px;height:26px;border-radius:50%;border:1px solid rgba(230,194,122,.25);box-shadow:0 0 25px rgba(230,194,122,.18)"></span><span class="muted" style="font-size:11px;font-weight:600">Tonight</span></div>' +
      '<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><span style="width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line)"></span><span class="muted" style="font-size:11px;font-weight:600">S</span></div>';
    return scr(
      '<div style="flex:1;display:flex;flex-direction:column;gap:14px;min-height:0">' +
      '<div class="row" style="justify-content:space-between"><div><p class="muted" style="font-size:14px">Saturday evening · <a href="#/premium" style="font-weight:700;text-decoration:none" data-k="home_trial_link">Trial: 15 days left</a></p><h1 style="font-size:26px">Good evening, Arjun</h1></div>' +
      '<div class="row" style="gap:8px"><a href="#/premium" class="iconbtn" aria-label="Lantern Premium" style="color:var(--hi);box-shadow:0 0 18px rgba(230,194,122,.15)" data-k="home_premium">' + ic('sparkle2') + '</a><a href="#/settings" class="iconbtn" aria-label="Settings">' + ic('sliders') + '</a></div></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:16px;padding:20px;box-shadow:0 0 25px rgba(230,194,122,.15),0 12px 30px rgba(5,9,18,.5)"><div class="row" style="gap:18px">' +
      '<a href="#/metime-start" aria-label="Sleep timer, preview tonight" style="position:relative;width:112px;height:112px;flex:none;border-radius:50%;display:block;box-shadow:0 0 25px rgba(230,194,122,.15)" data-k="home_timer"><svg width="112" height="112" viewBox="0 0 112 112" aria-hidden="true"><circle cx="56" cy="56" r="48" fill="none" stroke="#22304D" stroke-width="7"/><circle id="hdash" cx="56" cy="56" r="48" fill="none" stroke="#E6C27A" stroke-width="7" stroke-linecap="round" stroke-dasharray="301.6" stroke-dashoffset="' + (301.6 * (1 - S.secs / 10800)) + '" transform="rotate(-90 56 56)"/></svg>' +
      '<span style="position:absolute;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span id="hclock" style="font-size:20px;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums">' + clock(S.secs) + '</span><span style="font-size:11px;font-weight:700;color:var(--muted)">to Me-Time</span></span></a>' +
      '<div style="flex:1;display:flex;flex-direction:column;gap:4px"><p class="eyebrow">Sleep timer</p><p style="font-size:21px;font-weight:800;line-height:1.2">Me-Time at 11:00 pm</p><span class="tag" style="align-self:flex-start">' + ic('check', 13, 2.4) + 'Plan confirmed</span></div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;background:rgba(11,18,34,.35);border-radius:18px;padding:12px"><div><p style="font-size:11px;font-weight:700;color:var(--muted)">Me-Time</p><p style="font-weight:800">11:00 pm</p></div><div><p style="font-size:11px;font-weight:700;color:var(--muted)">Final Reel</p><p style="font-weight:800">11:30 pm</p></div><div><p style="font-size:11px;font-weight:700;color:var(--muted)">Lights out</p><p style="font-weight:800">12:00 am</p></div></div>' +
      '<a href="#/plan" class="btn ghost" style="min-height:44px;font-size:15px" data-k="home_change_plan">' + ic('edit', 18) + 'Change plan</a></div>' +
      '<a href="#/ritual" class="card row" style="text-decoration:none;color:var(--ink);gap:14px;padding:14px 16px" data-k="home_ritual"><span aria-hidden="true" style="width:58px;height:58px;flex:none;border-radius:20px;background:linear-gradient(180deg,#E6C27A 0%,#16213A 75%,#0B1222 100%);position:relative;overflow:hidden;box-shadow:0 0 25px rgba(230,194,122,.15)"><span style="position:absolute;left:50%;bottom:-8px;margin-left:-15px;width:30px;height:30px;border-radius:50%;background:#ECE8DF;opacity:.8"></span></span>' +
      '<div style="flex:1"><p class="eyebrow">Night ritual</p><p style="font-weight:800">' + ({ sunset: 'Sunset', lamp: 'Lamp', book: 'Book' }[S.theme]) + ' · 6 seconds</p><p class="muted" style="font-size:13px">Plug in, flip it over, lights out</p></div><span style="color:var(--slate)">' + ic('chev', 18) + '</span></a>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px;padding:16px"><div class="row" style="justify-content:space-between"><h2 style="font-size:17px">4 of 7 on-time nights</h2><span class="muted" style="font-size:12px">This week</span></div><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px">' + days + '</div></div>' +
      '<a href="#/morning-held" class="card row" style="text-decoration:none;color:var(--ink);padding:12px 16px" data-k="home_message"><span style="width:40px;height:40px;flex:none;border-radius:16px;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center">' + ic('mail') + '</span><div style="flex:1"><p style="font-weight:700;font-size:15px">A message from Amma is waiting</p><p class="muted" style="font-size:12px">Opens after an on-time night</p></div></a></div>' +
      L.nav('tonight'));
  }, function () {
    function upd() {
      var c = document.getElementById('hclock'), d = document.getElementById('hdash');
      if (c) c.textContent = clock(S.secs); if (d) d.setAttribute('stroke-dashoffset', String(301.6 * (1 - S.secs / 10800)));
    }
    L.every(function () { S.secs = Math.max(0, S.secs - 1); upd(); }, 1000);
  });

  /* ---------- plan check-in ---------- */
  def('plan', 'Tonight\'s Plan check-in', function () {
    var top = '<div class="card row" style="padding:12px 14px;border-radius:16px;background:var(--card2)"><span style="color:var(--hi)">' + ic('lantern', 22) + '</span><div style="flex:1"><p style="font-size:12px" class="muted">Lantern · 8:04 pm</p><p style="font-size:14px;font-weight:600">Tonight: last scroll 11:30 pm. Tap to confirm.</p></div></div>';
    if (S.planDone) {
      return scr(top + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;animation:rise .4s ease-out both"><span style="width:64px;height:64px;border-radius:50%;background:var(--hi);color:var(--accInk);display:flex;align-items:center;justify-content:center">' + ic('check', 30, 2.4) + '</span><h1>All set for tonight.</h1>' +
        (S.planOff ? '<p class="muted" style="font-size:17px">Night off. See you tomorrow evening.</p>' : '<p class="muted" style="font-size:17px">Me-Time starts at ' + L.fmtMin(S.t - S.len) + '. Last scroll ' + L.fmtMin(S.t) + '.</p>') + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><a href="#/home" class="btn primary">Done</a><button class="btn quiet" data-a="plan" data-v="edit" data-k="plan_edit">Edit plan</button></div>');
    }
    return scr(top + '<div style="display:flex;flex-direction:column;gap:14px;flex:1"><div class="row" style="justify-content:space-between"><h1 style="font-size:26px">Tonight\'s plan</h1>' +
      '<button class="pill' + (S.planOff ? ' on' : '') + '" data-a="plan" data-v="off" data-k="plan_night_off" data-v2="' + (S.planOff ? 'off' : 'on') + '" style="min-height:40px">' + ic('moon', 16) + 'Night off</button></div>' +
      (S.planOff ? '<div class="card" style="display:flex;flex-direction:column;gap:10px;padding:24px"><h2>Night off, enjoy it.</h2><p class="muted">No reminders tonight, and tonight stays out of your weekly count.</p></div>' :
        '<div style="display:flex;flex-direction:column;gap:14px"><p class="muted" style="font-size:14px">Same as last night. Adjust if today is different.</p>' + planControls() + '</div>') +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><button class="btn primary" data-a="plan" data-v="confirm" data-k="plan_confirm" data-v2="checkin">Confirm</button><p class="muted" style="font-size:12px;text-align:center">Not set by 9:30 pm? Last night\'s plan applies quietly.</p></div></div>', { cls: '' });
  });

  /* ---------- Me-Time ---------- */
  def('metime-start', 'Me-Time start notification', function () {
    return scr('<div class="abs-fill" style="background:#0B1222"></div>' +
      '<div style="position:relative;display:flex;flex-direction:column;gap:4px;align-items:center;padding-top:70px"><p style="font-size:76px;font-weight:300;letter-spacing:-.03em;line-height:1">11:00</p><p class="muted">Saturday</p></div>' +
      '<div style="position:relative;display:flex;flex-direction:column;gap:10px;margin-top:40px">' +
      '<a href="#/metime-ring" class="card" style="text-decoration:none;color:var(--ink);display:flex;flex-direction:column;gap:6px;background:rgba(22,33,58,.94)" data-k="metime_notification"><div class="row muted" style="font-size:12px;gap:8px"><span style="color:var(--hi)">' + ic('lantern', 16, 2) + '</span><span>Lantern · now</span></div><p style="font-size:16px;font-weight:700">Your Me-Time has started. Enjoy it.</p></a>' +
      '<a href="#/metime-ring" class="card row" style="text-decoration:none;color:var(--ink);background:rgba(22,33,58,.94)"><svg width="44" height="44" viewBox="0 0 48 48" role="img" aria-label="30 minutes left"><circle cx="24" cy="24" r="20" fill="none" stroke="#22304D" stroke-width="4"/><circle cx="24" cy="24" r="20" fill="none" stroke="#E6C27A" stroke-width="4" stroke-linecap="round" stroke-dasharray="125.7" stroke-dashoffset="2" transform="rotate(-90 24 24)"/></svg>' +
      '<div style="flex:1"><p style="font-weight:700">Me-Time · 30 min left</p><p class="muted" style="font-size:13px">Final Reel at 11:30 pm · silent</p></div><span class="tag">Pause</span></a></div>' +
      '<p class="muted" style="position:relative;margin-top:auto;text-align:center;font-size:13px">One soft hello, then silence until your Final Reel.</p>');
  });
  def('metime-ring', 'Me-Time floating ring', function () {
    var px = { S: 44, M: 56, L: 72 }[S.ringSize], left = S.ringWarn ? 5 : 18, dash = 125.7 * (1 - left / 30);
    var panel = '';
    if (S.ringOpen) {
      var sizes = ['S', 'M', 'L'].map(function (z) { return '<button class="pill' + (z === S.ringSize ? ' on' : '') + '" style="min-height:36px;padding:0" data-a="ring" data-v="size' + z + '" data-k="ring_size">' + z + '</button>'; }).join('');
      panel = '<div class="card" style="width:250px;display:flex;flex-direction:column;gap:12px;background:rgba(22,33,58,.96);animation:rise .25s ease-out both"><div><p style="font-weight:800;font-size:17px">' + (S.ringPaused ? 'Paused · 15 min of pause left' : (S.ringWarn ? '5 min left. Pick your last one.' : '18 min of Me-Time left')) + '</p><p class="muted" style="font-size:13px">Final Reel at 11:30 pm</p></div>' +
        '<button class="btn ghost" style="min-height:44px;font-size:14px" data-a="ring" data-v="pause" data-k="ring_pause" data-v2="' + (S.ringPaused ? 'resume' : 'pause') + '">' + (S.ringPaused ? 'Resume Me-Time' : 'Pause (up to 15 min)') + '</button>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><p class="muted" style="font-size:12px;font-weight:600">Ring size</p><div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px">' + sizes + '</div></div>' +
        '<div class="row" style="justify-content:space-between"><button class="btn quiet" style="width:auto;padding:0;min-height:36px;font-size:13px" data-a="ring" data-v="warn" data-k="ring_preview_5min">Preview 5-min state</button><a href="#/final-reel" style="font-size:13px;font-weight:700" data-k="ring_jump_1130">Jump to 11:30</a></div>' +
        '<p class="muted" style="font-size:12px">Hide the ring any time from Settings. The notification ring stays.</p></div>';
    }
    return scr(L.mockApp(1) + '<div style="position:absolute;top:28px;right:20px;display:flex;flex-direction:column;align-items:flex-end;gap:10px">' +
      '<button data-a="ring" data-v="toggle" data-k="ring_tap" aria-label="Me-Time ring, tap for options" style="width:' + px + 'px;height:' + px + 'px;border-radius:50%;border:0;padding:0;cursor:pointer;background:rgba(11,18,34,.9);display:flex;align-items:center;justify-content:center;animation:' + (S.ringWarn ? 'ringpulse 1.6s ease-in-out 2' : 'none') + '">' +
      '<svg width="' + (px - 8) + '" height="' + (px - 8) + '" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="none" stroke="#22304D" stroke-width="4"/><circle cx="24" cy="24" r="20" fill="none" stroke="' + (S.ringWarn ? '#ECE8DF' : '#E6C27A') + '" stroke-width="4" stroke-linecap="round" stroke-dasharray="125.7" stroke-dashoffset="' + dash + '" transform="rotate(-90 24 24)"/><text x="24" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#ECE8DF" font-family="Nunito, sans-serif">' + (S.ringPaused ? 'II' : left + 'm') + '</text></svg></button>' + panel + '</div>');
  });
  A.ring = function (v) {
    if (v === 'toggle') S.ringOpen = !S.ringOpen;
    else if (v === 'pause') S.ringPaused = !S.ringPaused;
    else if (v === 'warn') { S.ringWarn = !S.ringWarn; S.ringPaused = false; }
    else if (v.indexOf('size') === 0) S.ringSize = v.slice(4);
  };
  def('final-reel', 'Final Reel overlay', function () {
    var inner;
    if (!S.encore) {
      inner = '<div style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:14px;background:rgba(22,33,58,.97);border:1px solid rgba(230,194,122,.5);border-radius:26px;padding:24px;animation:rise .4s ease-out both"><div class="row" style="gap:10px"><span style="color:var(--hi)">' + ic('lantern', 24) + '</span><p class="eyebrow">11:30 pm</p></div><h1>This is your Final Reel</h1><p class="muted" style="font-size:16px">Finish the one you\'re on. Then we\'ll close the night together.</p>' +
        '<a href="#/ritual" class="btn primary" data-k="final_reel_done">I\'m done, close the night</a><button class="btn ghost" data-a="encore" data-k="final_reel_encore">Encore · 10 more minutes</button><p class="muted" style="font-size:12px;text-align:center">One Encore per night. Lights out moves to 12:10 am.</p></div>';
    } else {
      inner = '<div style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:14px;background:rgba(22,33,58,.97);border-radius:26px;padding:24px;animation:rise .3s ease-out both"><h2 style="font-size:22px">Encore on. Enjoy 10 more.</h2><p class="muted">Your Final Reel card comes back at 11:40 pm.</p><a href="#/ritual" class="btn primary" data-k="final_reel_skip_encore">Skip to 11:40 pm</a></div>';
    }
    return scr(L.mockApp(0.45) + inner);
  });
  A.encore = function () { S.encore = true; };

  /* ---------- ritual ---------- */
  def('ritual', 'Closing ritual', function () {
    var th = S.theme, art = '';
    if (th === 'sunset') art = '<div class="abs-fill" style="animation:skyfade 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:150px;width:130px;height:130px;margin-left:-65px;border-radius:50%;background:#E6C27A;animation:sunset 6s ease-in-out both"></div><div style="position:absolute;left:0;right:0;bottom:0;height:150px;background:#0B1222"></div>';
    else if (th === 'lamp') art = '<div class="abs-fill" style="background:#0B1222"></div><div style="position:absolute;left:50%;top:90px;width:260px;height:260px;margin-left:-130px;border-radius:50%;background:rgba(230,194,122,.33);animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:150px;margin-left:-50px;width:100px;height:70px;background:#E6C27A;border-radius:50px 50px 8px 8px;animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:220px;margin-left:-3px;width:6px;height:110px;background:#22304D"></div><div style="position:absolute;left:50%;top:328px;margin-left:-40px;width:80px;height:10px;border-radius:6px;background:#22304D"></div>';
    else art = '<div class="abs-fill" style="background:#0B1222"></div><div style="position:absolute;left:50%;top:70px;width:300px;height:300px;margin-left:-150px;border-radius:50%;background:rgba(230,194,122,.25);animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:120px;margin-left:-120px;width:240px;height:160px;perspective:900px"><div style="position:absolute;left:0;top:0;width:120px;height:160px;background:#ECE8DF;border-radius:10px 2px 2px 10px;padding:22px 16px;display:flex;flex-direction:column;gap:10px"><div style="height:6px;border-radius:3px;background:#3A4A6B"></div><div style="height:6px;width:80%;border-radius:3px;background:#3A4A6B"></div><div style="height:6px;border-radius:3px;background:#3A4A6B"></div><div style="height:6px;width:60%;border-radius:3px;background:#3A4A6B"></div></div><div style="position:absolute;left:120px;top:0;width:120px;height:160px;background:#E6C27A;border-radius:2px 10px 10px 2px;transform-origin:left center;animation:bookclose 5s ease-in-out .6s both"></div></div>';
    function tb(id, lab) { return '<button class="pill' + (th === id ? ' on' : '') + '" style="flex:1" data-a="theme" data-v="' + id + '" data-k="ritual_theme">' + lab + '</button>'; }
    return scr('<div class="row" style="justify-content:space-between;position:relative;z-index:2"><p class="eyebrow">Closing ritual</p><button class="btn quiet" style="width:auto;min-height:36px;padding:0" data-a="replay" data-k="ritual_replay">Replay</button></div>' +
      '<div style="position:relative;height:430px;border-radius:28px;overflow:hidden;border:1px solid var(--line);flex:none">' + art +
      '<div style="position:absolute;left:0;right:0;bottom:36px;text-align:center;padding:0 24px;animation:textin 6.5s ease-out both"><p style="font-size:22px;font-weight:800;color:#ECE8DF">Plug in, flip it over, lights out.</p></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><p class="muted" style="font-size:13px;font-weight:600">Theme</p><div class="row" style="gap:8px">' + tb('sunset', 'Sunset') + tb('lamp', 'Lamp') + tb('book', 'Book') + '</div></div>' +
      '<a href="#/note" class="btn primary" style="margin-top:auto" data-k="ritual_continue">Continue</a>');
  });
  A.theme = function (v) { S.theme = v; S.run++; };
  A.replay = function () { S.run++; };

  /* ---------- note, lights out ---------- */
  var CHIPS = ['You did the hard part.', 'Big day. Breathe first.', 'Call Amma back.'];
  def('note', 'Note to morning self', function () {
    return scr('<div style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Optional</p><h1>Note to morning self</h1><p class="muted">One line. You\'ll read it at 7:00 am, whatever kind of night it turns out to be.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><label for="note" style="font-size:14px;font-weight:600">Your note</label><textarea id="note" class="field" rows="4" data-f="note" maxlength="120" placeholder="Start slow. Chai first, emails later." style="resize:none;line-height:1.5">' + esc(S.note) + '</textarea><p id="ncount" class="muted" style="font-size:12px;text-align:right">' + S.note.length + ' / 120</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><p class="muted" style="font-size:13px;font-weight:600">Need a nudge?</p><div class="row" style="gap:8px;flex-wrap:wrap">' +
      CHIPS.map(function (c, i) { return '<button class="pill" style="min-height:40px;font-size:14px" data-a="chip" data-v="' + i + '" data-k="note_nudge">' + c + '</button>'; }).join('') + '</div></div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/lights-out" class="btn primary" data-k="note_save">Save and lights out</a><a href="#/lights-out" class="btn quiet" data-k="note_skip">Skip tonight</a></div>');
  });
  A.chip = function (v) { S.note = CHIPS[parseInt(v, 10)]; };
  def('lights-out', 'Lights-Out waiting', function () {
    function item(icon, label, ok) {
      return '<div class="card row" style="padding:14px 16px"><span style="width:40px;height:40px;flex:none;border-radius:16px;background:var(--card2);color:' + (ok ? 'var(--hi)' : 'var(--muted)') + ';display:flex;align-items:center;justify-content:center">' + ic(icon) + '</span><p style="flex:1;font-weight:600">' + label + '</p>' +
        (ok ? '<span style="color:var(--hi)">' + ic('check', 20, 2.4) + '</span>' : '<span class="muted" style="font-size:13px;font-weight:600">Waiting</span>') + '</div>';
    }
    return scr('<div style="display:flex;flex-direction:column;gap:8px;padding-top:20px"><p class="eyebrow">Lights out by 12:00 am</p><h1>Plug in, flip it over, lights out.</h1><p class="muted">The moment all three happen, you\'re down for the night.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + item('plug', 'Charging', true) + item('facedown', 'Face-down', false) + item('moon', 'Room is dark', false) + '</div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><a href="#/lights-out-reward" class="btn ghost" data-k="lights_out_simulate">Simulate: phone flipped in a dark room</a><a href="#/lights-out-reward" class="btn primary" data-k="lights_out_sleep">' + ic('moon') + 'I\'m going to sleep</a></div>');
  });
  def('lights-out-reward', 'Lights-Out reward', function () {
    return scr('<div class="abs-fill" style="box-shadow:inset 0 0 0 3px var(--glow),inset 0 0 90px rgba(230,194,122,.44);pointer-events:none;animation:glowin .8s ease-out both"></div>' +
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;animation:rise .6s ease-out both"><div style="width:132px;height:132px;border-radius:50%;background:var(--card2);color:var(--glow);display:flex;align-items:center;justify-content:center;box-shadow:0 0 90px rgba(230,194,122,.53)">' + ic('moon', 58, 1.5) + '</div>' +
      '<p class="eyebrow">11:52 pm</p><h1 style="font-size:34px">Down for the night</h1><p class="muted" style="font-size:16px">Nicely done. That\'s 5 of 7 on-time nights this week.</p>' +
      '<div class="card" style="width:100%;display:flex;flex-direction:column;gap:10px;text-align:left"><div class="row">' + ic('people', 18) + '<p style="font-size:14px">Your Circle sees: <strong>Down for the night</strong></p></div><div class="row">' + ic('mail', 18) + '<p style="font-size:14px">Amma\'s message opens at 7:00 am</p></div></div></div>' +
      '<a href="#/morning-sealed" class="btn quiet" data-k="skip_to_morning">Skip to 7:00 am (demo)</a>');
  });
})();
