/* Lantern playtest: start, onboarding and the nightly loop (iOS 26 design language). */
(function () {
  'use strict';
  var L = window.L, S = L.S, A = L.A, ic = L.ic, scr = L.scr, esc = L.esc, T = window.LanternTelemetry;
  var cell = L.cell, list = L.list;
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }
  function icon(sz) { return '<div class="appicon' + (sz ? ' sm' : '') + '">' + ic('lantern', sz ? 36 : 52, 1.7) + '</div>'; }
  function head(t, sub, center) { return '<div class="stack' + (center ? ' c' : '') + '"><h1' + (t.length > 30 ? ' class="t1"' : '') + '>' + t + '</h1>' + (sub ? '<p class="l2">' + sub + '</p>' : '') + '</div>'; }
  function foot(h) { return '<div class="foot">' + h + '</div>'; }
  function times() {
    return list([cell({ t: 'Me-Time starts', val: L.fmtMin(S.t - S.len) }), cell({ t: 'Final Reel', val: L.fmtMin(S.t) }), cell({ t: 'Lights out by', val: L.fmtMin(S.t + 30) })]);
  }

  /* ---------- start ---------- */
  def('start', 'Start', function () {
    return scr('<div class="stack c" style="padding-top:28px;gap:14px">' + icon() + '<h1>Lantern playtest</h1><p class="l2">A clickable preview of the app and the pages a loved one sees. Nothing here is real: no sign-up, no payments, no messages sent.</p></div>' +
      '<div class="sec"><label class="hdr" for="tcode">Your first name or tester code</label><input id="tcode" class="field" maxlength="40" autocomplete="off" autocapitalize="words" enterkeyhint="done" placeholder="e.g. Priya or T-07" value="' + esc(S.tester) + '"></div>' +
      list([cell({ a: 'role', v: 'app', k: 'start_role', icon: 'moon', color: 'indigo', t: 'I\'m trying the app', s: 'Onboarding, nightly routine, mornings, Circles, Premium', chev: true }),
        cell({ a: 'role', v: 'sender', k: 'start_role', icon: 'chat', color: 'green', t: 'I\'m sending a message', s: 'Record a message, WhatsApp gift note, UPI gift page', chev: true })],
        { ic: 1, f: 'To improve the design, this preview records which screens you open and which buttons you tap, with times. It never records anything you type.' }), { cls: 'pad' });
  });
  A.role = function (v) {
    var el = document.getElementById('tcode'), code = el ? el.value.trim() : '';
    if (!code) { if (el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); el.focus(); } L.toast('Enter your first name or a code'); return false; }
    S.tester = code; L.setRole(v); T.setTester(code, v);
    L.go(v === 'app' ? 'welcome' : 'sender-record');
    return false;
  };

  /* ---------- onboarding ---------- */
  def('welcome', 'Welcome', function () {
    return scr('<div class="stack c" style="gap:12px">' + icon(1) + '<h1 class="t1">Don\'t fight the night.<br>Give it an ending.</h1><span class="badge o" style="align-self:center">' + ic('sparkle', 13, 2.4) + '14 days free · no payment details</span></div>' +
      '<div class="sec"><p class="hdr">How Lantern works</p><div class="card" style="padding:10px 18px">' + L.howV() + '</div></div>' +
      '<a href="#/demo" class="btn glass" data-a="demofrom" data-v="welcome" data-k="welcome_demo">' + ic('play', 18, 2.4) + 'Watch it on a reels app · 25 sec</a>' +
      foot('<a href="#/o2" class="btn fill" data-k="welcome_start">Start my 14 days</a><p class="fn l2 c">No sign-up needed. About 3 minutes.</p>'), { cls: 'pad' });
  });

  def('o2', 'Onboarding 2 · Sleep times', function () {
    var g = Math.max(0, S.ob - S.oa), h = Math.floor(g / 60), m = g % 60;
    var gap = ((h ? h + ' h' : '') + (h && m ? ' ' : '') + (m ? m + ' min' : '')) || '0 min';
    return scr(L.prog(2, 'welcome') + head('When does sleep usually find you?', 'A rough guess is fine.') +
      list([cell({ t: 'Feel sleepy', val: '<span class="num">' + L.fmt(20, S.oa) + '</span>', right: L.stp('oa', 'onb_sleepy') }),
        cell({ t: 'Fall asleep', val: '<span class="num">' + L.fmt(20, S.ob) + '</span>', right: L.stp('ob', 'onb_asleep') })]) +
      '<div class="stack" style="padding:0 4px"><h3>That\'s ' + gap + ' of night with no ending.</h3><p class="l2 sub">Most of it is time you enjoy. Lantern keeps the fun and gives it a finish line you choose.</p></div>' +
      foot('<a href="#/o3" class="btn fill">Continue</a>'));
  });
  A.oa = function (v) { S.oa = v === '-' ? Math.max(60, S.oa - 15) : Math.min(S.ob, S.oa + 15); };
  A.ob = function (v) { S.ob = v === '-' ? Math.max(S.oa, S.ob - 15) : Math.min(480, S.ob + 15); };

  var CARDS = [
    { kicker: 'Me-Time', head: 'A guilt-free window that is all yours', body: 'Scroll, watch, play. One quiet hello when it starts, then silence. A small ring shows how much is left.', icon: 'play', c: 'indigo' },
    { kicker: 'Final Reel', head: 'Finish the one you are on', body: 'At your last-scroll time you get one Final Reel. Then: plug in your phone, turn it face-down, turn off the light.', icon: 'moon', c: 'purple' },
    { kicker: 'Morning Drop', head: 'Wake up to something worth it', body: 'Sleep on time and a sealed message from someone who loves you opens in the morning, plus a note from last-night you.', icon: 'mail', c: 'orange' }
  ];
  def('o3', 'Onboarding 3 · How the night works', function () {
    var i = S.loopI, c = CARDS[i];
    return scr(L.prog(3, 'o2') + '<div class="stack"><p class="fn l2">How your night works</p><h1 class="t1">Three moments. That\'s the whole app.</h1></div>' +
      '<div class="card stack c" style="flex:1;justify-content:center;gap:14px;padding:30px 22px;animation:rise .35s ease-out both">' +
      '<span style="width:84px;height:84px;border-radius:24px;background:' + L.COL[c.c] + ';color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)">' + ic(c.icon, 40, 2) + '</span>' +
      '<p class="fn l2">' + (i + 1) + ' of 3 · ' + c.kicker + '</p><h2>' + c.head + '</h2><p class="l2">' + c.body + '</p>' + (i === 1 ? '<div class="row" style="gap:10px;justify-content:center">' + L.pic('plug', { size: 56 }) + L.pic('flip', { size: 56 }) + L.pic('lights', { size: 56 }) + '</div>' : '') + '</div>' +
      '<div class="dots" aria-hidden="true">' + CARDS.map(function (x, k) { return '<i class="' + (k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      foot((i < 2 ? '<button class="btn fill" data-a="loop" data-v="next" data-k="onb_loop">Next</button>' : '<a href="#/o4" class="btn fill">Set my first plan</a>') +
        (i > 0 ? '<button class="btn plain" data-a="loop" data-v="prev" data-k="onb_loop">Back</button>' : '')));
  });
  A.loop = function (v) { S.loopI = v === 'next' ? Math.min(2, S.loopI + 1) : Math.max(0, S.loopI - 1); };

  /* shared plan controls (onboarding 4 + plan check-in) */
  function planControls() {
    return '<div class="card stack c" style="gap:14px"><p class="fn l2">Last scroll</p><p class="big">' + L.fmtMin(S.t) + '</p>' + L.stp('pt', 'plan_time', 1, ['15 minutes earlier', '15 minutes later']) + '<p class="cap l2">15-minute steps, 10:00 pm to 1:30 am</p></div>' +
      '<div class="sec"><p class="hdr">Me-Time before it</p>' + L.seg([[20, '20 min'], [30, '30 min'], [45, '45 min']], S.len, 'plen', 'plan_length') + '</div>' + times();
  }
  A.pt = function (v) { S.t = v === '-' ? Math.max(0, S.t - 15) : Math.min(210, S.t + 15); };
  A.plen = function (v) { S.len = parseInt(v, 10); };
  A.plan = function (v) { if (v === 'confirm') S.planDone = true; else if (v === 'edit') S.planDone = false; };
  A.planoff = function (v) { S.planOff = v === 'on'; };
  def('o4', 'Onboarding 4 · First plan', function () {
    return scr(L.prog(4, 'o3') + head('Set tonight\'s plan', 'When should the last scroll be? You can change it every evening.') + planControls() +
      foot('<a href="#/o5" class="btn fill" data-k="plan_confirm" data-v="onboarding">Set tonight\'s plan</a>'));
  });

  def('o5', 'Onboarding 5 · Invite a loved one', function () {
    if (!S.invOtp) {
      return scr(L.prog(5, 'o4') + head('Who would you love to hear from in the morning?', 'Invite one person to record a Morning Drop. They don\'t need the app, just WhatsApp.') +
        '<div class="sec"><p class="hdr">Message preview</p><div class="card stack" style="gap:10px"><div class="row fn l2" style="gap:8px">' + L.sym('chat', 'green') + '<span>WhatsApp</span></div>' +
        '<p class="bubble">Hi Amma, I\'m trying to sleep on time. Will you record a good-morning message for me? It takes a minute, no app needed: [INVITE LINK]</p></div></div>' +
        '<div class="chips"><span class="badge">Amma</span><span class="badge">Papa</span><span class="badge">Partner</span><span class="badge">Best friend</span></div>' +
        foot('<button class="btn fill" data-a="otp" data-v="on" data-k="invite_whatsapp">Invite via WhatsApp</button><a href="#/o6" class="btn plain" data-k="invite_skip">Skip for now</a>'));
    }
    return scr(L.prog(5, 'o4') + head('Verify your number', 'So Amma\'s message reaches only you. We ask only when you invite someone or join a Circle.') +
      list([cell({ lead: '<span class="l2" style="width:48px">+91</span>', t: '<input id="ph" inputmode="numeric" autocomplete="off" placeholder="Mobile number" aria-label="Mobile number">' }),
        cell({ lead: '<span class="l2" style="width:48px">Code</span>', t: '<input id="otp" inputmode="numeric" autocomplete="one-time-code" placeholder="6 digits" aria-label="6-digit code" style="letter-spacing:.2em">' })],
        { f: 'Code sent by SMS. Resend in 0:24' }) +
      foot('<a href="#/o6" class="btn fill" data-k="invite_verify">Verify and open WhatsApp</a><button class="btn plain" data-a="otp" data-v="off">Back</button>'));
  });
  A.otp = function (v) { S.invOtp = v === 'on'; };

  def('o6', 'Onboarding 6 · Notifications', function () {
    return scr(L.prog(6, 'o5') + '<div class="hero" style="padding-top:8px">' + ic('bell', 60, 1.6) + '</div>' + head('Two quiet notifications a night. That\'s it.', 'No nagging, no countdown alarms.', 1) +
      list([cell({ icon: 'clock', color: 'orange', t: '7 to 9 pm', s: 'Tonight\'s plan, pre-filled. One tap to confirm.' }),
        cell({ icon: 'play', color: 'indigo', t: 'When Me-Time starts', s: '"Your Me-Time has started. Enjoy it." Then silence.' }),
        cell({ icon: 'ring', color: 'gray', t: 'Always', s: 'A silent progress ring in your notification shade.' })], { ic: 1 }) +
      foot('<a href="#/o7" class="btn fill" data-k="consent_notifications" data-v="allow">Allow notifications</a><a href="#/o7" class="btn plain" data-k="consent_notifications" data-v="skip">Not now</a>'));
  });
  def('o7', 'Onboarding 7 · Usage Access', function () {
    function no(t) { return cell({ icon: 'x', color: 'red', t: t }); }
    function yes(t) { return cell({ icon: 'check', color: 'green', t: t }); }
    return scr(L.prog(7, 'o6') + '<div class="hero">' + ic('shield', 60, 1.6) + '</div>' + head('Usage Access, in plain words', 'Android needs this so Lantern knows when Me-Time ends and when you\'re down for the night.', 1) +
      list([no('Reads your messages or chats'), no('Sees what you watch, post or type'), no('Blocks, limits or closes any app')], { h: 'Lantern never', ic: 1 }) +
      list([yes('When your screen is in use, to mark on-time nights'), yes('Which app is open, only to show your Final Reel card on top of it')], { h: 'Lantern only uses', ic: 1 }) +
      foot('<a href="#/o8" class="btn fill" data-k="consent_usage_access" data-v="open">Open Usage Access settings</a><p class="fn l2 c">Find Lantern in the list and switch it on.</p>'));
  });
  function floatRing(px, mins, frac, warn) {
    return L.ring(px - 10, px > 50 ? 5 : 4, frac, warn ? '#FF9F0A' : '#7D7AFF', 'rgba(255,255,255,.18)',
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" font-size="' + (px > 60 ? 15 : 12) + '" font-weight="700" fill="#fff" font-family="ui-rounded,-apple-system,system-ui,sans-serif">' + mins + '</text>');
  }
  def('o8', 'Onboarding 8 · Display over apps', function () {
    return scr(L.prog(8, 'o7') + '<div class="stack"><span class="badge">Optional</span><h1 class="t1">A small ring over your apps</h1><p class="l2">See how much Me-Time is left without leaving your feed. Move it, resize it or switch it off any time.</p></div>' +
      '<div class="phone">' + L.mockApp(1) + '<div class="glass" style="position:absolute;top:18px;right:18px;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center">' + floatRing(58, '18m', .6) + '</div></div>' +
      foot('<a href="#/o9" class="btn fill" data-k="consent_overlay" data-v="allow">Allow display over apps</a><a href="#/o9" class="btn plain" data-k="consent_overlay" data-v="skip">Skip, the notification ring is enough</a>'));
  });
  var BR = {
    Xiaomi: [['Long-press Lantern, then App info', 'Autostart'], ['Battery saver, then choose No restrictions', 'No restrictions'], ['In Recent apps, pull Lantern down to lock it', 'Lock in Recents']],
    Samsung: [['Settings, Battery, Background usage limits', 'Never sleeping apps'], ['Tap + and add Lantern', 'Lantern added'], ['App info, Battery, choose Unrestricted', 'Unrestricted']],
    Vivo: [['Settings, Battery, Background power consumption', 'Lantern'], ['Allow high background power use', 'Allow in background'], ['i Manager, App manager, Autostart', 'Autostart Lantern']],
    Oppo: [['Settings, Apps, App management, Lantern', 'Battery usage'], ['Allow background activity', 'Background activity'], ['Allow auto launch', 'Auto launch']],
    realme: [['Settings, Apps, App management, Lantern', 'Battery usage'], ['Allow background activity', 'Background activity'], ['Allow auto launch', 'Auto launch']]
  };
  def('o9', 'Onboarding 9 · Battery setup', function () {
    var steps = BR[S.brand].map(function (s, i) {
      return cell({ lead: '<span class="av" style="background:var(--fill);width:30px;height:30px;font-size:14px">' + (i + 1) + '</span>', t: s[0], s: s[1], right: '<span class="sw on" aria-hidden="true" style="pointer-events:none"><span class="tr"><span class="kn"></span></span></span>' });
    });
    return scr(L.prog(9, 'o8') + '<div class="hero">' + ic('battery', 60, 1.6) + '</div>' + head('Keep Lantern awake at night', 'Some phones pause apps to save battery. Three taps fix it. Which phone do you have?', 1) +
      '<div class="chips scroll">' + Object.keys(BR).map(function (k) { return L.chip(k === S.brand, k, 'brand', k, 'battery_brand'); }).join('') + '</div>' +
      list(steps, { ic: 1, f: 'Menu names vary a little by phone model and Android version.' }) +
      foot('<a href="#/o10" class="btn fill" data-k="battery_done">Done, it\'s set</a><a href="#/o10" class="btn plain" data-k="battery_open_settings">Open battery settings</a>'));
  });
  A.brand = function (v) { S.brand = v; };
  def('o10', 'Onboarding 10 · Lights-Out preview', function () {
    if (!S.placed) {
      return scr(L.prog(10, 'o9') + head('Feel what an on-time night feels like', 'Turn your phone over so the screen faces the table, right now.') +
        '<div style="flex:1;display:flex;align-items:center;justify-content:center;min-height:240px">' + L.pic('flip', { size: 200 }) + '</div>' +
        foot('<button class="btn glass" data-a="place" data-k="preview_place">Simulate: phone placed face-down</button>'));
    }
    return scr('<div class="edge"></div>' + L.prog(10, 'o9') +
      '<div class="stack c" style="flex:1;justify-content:center;gap:16px;animation:rise .5s ease-out both"><span style="width:112px;height:112px;border-radius:50%;background:rgba(94,92,230,.2);color:#B3B1FF;display:flex;align-items:center;justify-content:center">' + ic('moon', 54, 1.6) + '</span>' +
      '<h1>Down for the night</h1><p class="l2" style="max-width:300px">A soft chime, a gentle buzz and this glow. That\'s your reward every on-time night.</p><div class="chips" style="justify-content:center"><span class="badge">Chime</span><span class="badge">Haptic</span><span class="badge">Edge glow</span></div></div>' +
      foot('<a href="#/o11" class="btn fill">Continue</a>'));
  });
  A.place = function () { S.placed = true; };
  def('o11', 'Onboarding 11 · Done', function () {
    return scr(L.prog(11, 'o10') + '<div class="stack c" style="gap:14px;padding-top:12px">' + icon() + '<h1>See you at Me-Time.</h1><p class="l2">Enjoy your evening. We\'ll say hello when it\'s time.</p></div>' + times() +
      list([cell({ href: 'premium', icon: 'sparkle', color: 'orange', t: 'Your 14-day trial has started', s: 'Day 1 of 14. 3 on-time nights in a row add 7 bonus days.', k: 'onb_trial' })], { ic: 1 }) +
      foot('<a href="#/home" class="btn fill">Go to Tonight</a>'));
  });

  /* ---------- home ---------- */
  function clock(s) { var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; function p(n) { return n < 10 ? '0' + n : '' + n; } return h + ':' + p(m) + ':' + p(x); }
  def('home', 'Home · Tonight', function () {
    var wk = [['M', 1], ['T', 1], ['W', 0], ['T', 1], ['F', 1], ['S', 2], ['S', 0]];
    var days = wk.map(function (d) {
      var dot = d[1] === 1 ? '<span style="width:30px;height:30px;border-radius:50%;background:#5E5CE6;color:#fff;display:flex;align-items:center;justify-content:center">' + ic('moon', 15, 2.4) + '</span>'
        : d[1] === 2 ? '<span style="width:30px;height:30px;border-radius:50%;border:2px solid #7D7AFF"></span>' : '<span style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.08)"></span>';
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px">' + dot + '<span class="cap" style="color:' + (d[1] === 2 ? '#8E8CFF' : 'var(--l2)') + ';font-weight:600">' + (d[1] === 2 ? 'Today' : d[0]) + '</span></div>';
    }).join('');
    return scr(
      '<div class="row between" style="padding-top:6px"><div><p class="fn l2">Saturday</p><h1>Tonight</h1></div><div class="row" style="gap:10px">' +
      L.gbtn('sparkle2', 'Lantern Premium', 'premium', 'home_premium') + L.gbtn('gear', 'Settings', 'settings', 'home_settings') + '</div></div>' +
      '<div class="row between" style="margin-top:-12px"><p class="l2">Good evening, Arjun</p><a href="#/premium" class="badge o" data-k="home_trial_link">Trial · 15 days left</a></div>' +
      '<div class="mat p stack" style="gap:16px"><div class="row" style="gap:18px">' +
      '<a href="#/metime-start" aria-label="Sleep timer, preview tonight" data-k="home_timer" style="position:relative;width:120px;height:120px;flex:none;display:block">' +
      '<svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" fill="none" stroke="rgba(94,92,230,.25)" stroke-width="12"/><circle id="hdash" cx="60" cy="60" r="48" fill="none" stroke="#5E5CE6" stroke-width="12" stroke-linecap="round" stroke-dasharray="301.6" stroke-dashoffset="' + (301.6 * (1 - S.secs / 10800)) + '" transform="rotate(-90 60 60)"/></svg>' +
      '<span class="abs" style="display:flex;flex-direction:column;align-items:center;justify-content:center"><span id="hclock" class="num" style="font-size:20px;font-weight:600;color:#fff">' + clock(S.secs) + '</span><span class="cap l2">to Me-Time</span></span></a>' +
      '<div class="stack" style="gap:6px;flex:1"><p class="fn l2">Sleep timer</p><h3 style="font-size:18px">Me-Time at ' + L.fmtMin(S.t - S.len) + '</h3><span class="badge g">' + ic('check', 13, 2.6) + 'Plan confirmed</span></div></div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;text-align:center"><div><p class="cap l2">Me-Time</p><p class="hl num">' + L.fmtMin(S.t - S.len) + '</p></div><div><p class="cap l2">Final Reel</p><p class="hl num">' + L.fmtMin(S.t) + '</p></div><div><p class="cap l2">Lights out</p><p class="hl num">' + L.fmtMin(S.t + 30) + '</p></div></div>' +
      '<a href="#/plan" class="btn glass sm" style="align-self:center" data-k="home_change_plan">' + ic('edit', 16, 2) + 'Change plan</a></div>' +
      '<div class="mat">' + cell({ href: 'ritual', k: 'home_ritual', lead: '<span aria-hidden="true" style="width:46px;height:46px;flex:none;border-radius:12px;background:linear-gradient(180deg,#F4A259 0%,#B5577A 45%,#2C2466 100%);position:relative;overflow:hidden"><span style="position:absolute;left:50%;bottom:-7px;margin-left:-12px;width:24px;height:24px;border-radius:50%;background:#FFE0A3"></span></span>', t: 'Night ritual · ' + ({ sunset: 'Sunset', lamp: 'Lamp', book: 'Book' }[S.theme]), s: '6 seconds · then charge, face-down, lights off' }) +
      cell({ href: 'morning-held', k: 'home_message', icon: 'mail', color: 'orange', t: 'A message from Amma is waiting', s: 'Opens after an on-time night' }) + '</div>' +
      '<div class="mat p stack" style="gap:14px"><div class="row between"><h3 style="font-size:17px">How Lantern works</h3><a href="#/demo" class="fn hl" data-a="demofrom" data-v="home" data-k="home_demo">' + ic('play', 13, 2.6) + ' Watch demo</a></div>' + L.howH() + '</div>' +
      '<div class="mat p stack" style="gap:14px"><div class="row between"><h3 style="font-size:17px">4 of 7 on-time nights</h3><span class="fn l2">This week</span></div><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px">' + days + '</div></div>' +
      L.nav('tonight'), { cls: 'sky tabs' });
  }, function () {
    L.every(function () {
      S.secs = Math.max(0, S.secs - 1);
      var c = document.getElementById('hclock'), d = document.getElementById('hdash');
      if (c) c.textContent = clock(S.secs); if (d) d.setAttribute('stroke-dashoffset', String(301.6 * (1 - S.secs / 10800)));
    }, 1000);
  });

  /* ---------- plan check-in ---------- */
  function banner(when, text) {
    return '<div class="plat glass"><div class="appicon mini" style="width:38px;height:38px;border-radius:9px;box-shadow:none">' + ic('lantern', 22, 1.8) + '</div><div style="flex:1;min-width:0"><div class="row between"><b class="fn">Lantern</b><span class="cap l2">' + when + '</span></div><p class="sub">' + text + '</p></div></div>';
  }
  def('plan', 'Tonight\'s Plan check-in', function () {
    if (S.planDone) {
      return scr(L.top('home') + '<div class="stack c" style="flex:1;justify-content:center;gap:14px;animation:rise .4s ease-out both"><span style="width:76px;height:76px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center">' + ic('check', 38, 2.8) + '</span><h1>All set for tonight.</h1>' +
        '<p class="l2">' + (S.planOff ? 'Night off. See you tomorrow evening.' : 'Me-Time starts at ' + L.fmtMin(S.t - S.len) + '. Last scroll ' + L.fmtMin(S.t) + '.') + '</p></div>' +
        foot('<a href="#/home" class="btn fill">Done</a><button class="btn plain" data-a="plan" data-v="edit" data-k="plan_edit">Edit plan</button>'));
    }
    return scr(L.top('home') + banner('8:04 pm', 'Tonight: last scroll ' + L.fmtMin(S.t) + '. Tap to confirm.') + head('Tonight\'s plan', S.planOff ? '' : 'Same as last night. Adjust if today is different.') +
      list([cell({ icon: 'moon', color: 'purple', t: 'Night off', s: 'No reminders, and tonight stays out of your weekly count', right: L.sw(S.planOff, 'Night off', 'planoff', 'plan_night_off') })], { ic: 1 }) +
      (S.planOff ? '' : planControls()) +
      foot('<button class="btn fill" data-a="plan" data-v="confirm" data-k="plan_confirm">Confirm</button><p class="fn l2 c">Not set by 9:30 pm? Last night\'s plan applies quietly.</p>'));
  });

  /* ---------- Me-Time ---------- */
  var WALL = 'background:radial-gradient(120% 60% at 20% 10%,#5E5CE6 0%,rgba(94,92,230,0) 60%),radial-gradient(90% 60% at 90% 60%,#BF5AF2 0%,rgba(191,90,242,0) 60%),radial-gradient(100% 50% at 30% 100%,#FF375F 0%,rgba(255,55,95,0) 60%),#120F2E';
  def('metime-start', 'Me-Time start notification', function () {
    return scr('<div class="abs" style="' + WALL + '"></div>' +
      '<div class="stack c" style="position:relative;padding-top:56px;gap:2px"><p class="hl" style="font-size:19px;opacity:.9">Saturday 7 November</p><p style="font:700 96px/1 var(--round);letter-spacing:-.03em;color:rgba(255,255,255,.92)">11:00</p></div>' +
      '<div class="stack" style="position:relative;margin-top:auto;gap:8px">' +
      '<a href="#/metime-ring" class="plat glass" data-k="metime_notification"><div class="appicon" style="width:38px;height:38px;border-radius:9px;box-shadow:none">' + ic('lantern', 22, 1.8) + '</div><div style="flex:1"><div class="row between"><b class="fn">Lantern</b><span class="cap l2">now</span></div><p class="sub">Your Me-Time has started. Enjoy it.</p></div></a>' +
      '<a href="#/metime-ring" class="plat glass" style="align-items:center"><span style="flex:none">' + floatRing(48, '30', 1) + '</span><div style="flex:1"><p class="hl">Me-Time · 30 min left</p><p class="fn l2">Final Reel at 11:30 pm · silent</p></div><span class="badge">Pause</span></a></div>' +
      '<p class="fn c" style="position:relative;color:rgba(255,255,255,.7)">One soft hello, then silence until your Final Reel.</p>');
  });
  def('metime-ring', 'Me-Time floating ring', function () {
    var px = { S: 48, M: 60, L: 76 }[S.ringSize], left = S.ringWarn ? 5 : 18;
    var panel = '';
    if (S.ringOpen) {
      panel = '<div class="pop" style="width:268px;border-radius:28px;padding:16px;display:flex;flex-direction:column;gap:12px;animation:rise .25s ease-out both"><div><p class="hl" style="font-size:18px">' + (S.ringPaused ? 'Paused · 15 min of pause left' : (S.ringWarn ? '5 min left. Pick your last one.' : '18 min of Me-Time left')) + '</p><p class="fn l2">Final Reel at 11:30 pm</p></div>' +
        '<button class="btn gray sm" style="width:100%" data-a="ring" data-v="pause" data-k="ring_pause" data-v2="' + (S.ringPaused ? 'resume' : 'pause') + '">' + ic(S.ringPaused ? 'play' : 'pause', 16, 2.2) + (S.ringPaused ? 'Resume Me-Time' : 'Pause (up to 15 min)') + '</button>' +
        '<div class="stack" style="gap:6px"><p class="cap l2">Ring size</p>' + L.seg([['S', 'S'], ['M', 'M'], ['L', 'L']], S.ringSize, 'ringsz', 'ring_size') + '</div>' +
        '<div class="row between"><button class="btn plain" style="width:auto;padding:0;font-size:15px" data-a="ring" data-v="warn" data-k="ring_preview_5min">Preview 5-min state</button><a href="#/final-reel" class="fn hl" data-k="ring_jump_1130">Jump to 11:30</a></div>' +
        '<p class="cap l2">Hide the ring any time in Settings. The notification ring stays.</p></div>';
    }
    return scr(L.mockApp(1) + '<div style="position:absolute;top:24px;right:16px;display:flex;flex-direction:column;align-items:flex-end;gap:10px">' +
      '<button class="glass" data-a="ring" data-v="toggle" data-k="ring_tap" aria-label="Me-Time ring, tap for options" style="width:' + px + 'px;height:' + px + 'px;border-radius:50%;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;animation:' + (S.ringWarn ? 'ringpulse 1.6s ease-in-out 2' : 'none') + '">' +
      floatRing(px, S.ringPaused ? 'II' : left + 'm', left / 30, S.ringWarn) + '</button>' + panel + '</div>');
  });
  A.ring = function (v) {
    if (v === 'toggle') S.ringOpen = !S.ringOpen;
    else if (v === 'pause') S.ringPaused = !S.ringPaused;
    else if (v === 'warn') { S.ringWarn = !S.ringWarn; S.ringPaused = false; }
  };
  A.ringsz = function (v) { S.ringSize = v; };
  def('final-reel', 'Final Reel overlay', function () {
    var inner = !S.encore ?
      '<div class="pop" style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:12px;border-radius:34px;padding:22px;animation:rise .4s cubic-bezier(.2,.8,.3,1) both"><div class="row" style="gap:10px"><div class="appicon" style="width:30px;height:30px;border-radius:7px;box-shadow:none">' + ic('lantern', 18, 1.8) + '</div><p class="fn l2">11:30 pm</p></div><h2>This is your Final Reel</h2><p class="l2">Finish the one you\'re on. Then we\'ll close the night together.</p>' +
      '<a href="#/ritual" class="btn fill" data-k="final_reel_done">I\'m done, close the night</a><button class="btn gray" data-a="encore" data-k="final_reel_encore">Encore · 10 more minutes</button><p class="cap l2 c">One Encore per night. Lights out moves to 12:10 am.</p></div>'
      : '<div class="pop" style="position:relative;margin-top:auto;display:flex;flex-direction:column;gap:12px;border-radius:34px;padding:22px;animation:rise .3s ease-out both"><h2>Encore on. Enjoy 10 more.</h2><p class="l2">Your Final Reel card comes back at 11:40 pm.</p><a href="#/ritual" class="btn fill" data-k="final_reel_skip_encore">Skip to 11:40 pm</a></div>';
    return scr(L.mockApp(1) + inner);
  });
  A.encore = function () { S.encore = true; };

  /* ---------- ritual ---------- */
  def('ritual', 'Closing ritual', function () {
    var th = S.theme, art = '';
    if (th === 'sunset') art = '<div class="abs" style="animation:skyfade 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:140px;width:120px;height:120px;margin-left:-60px;border-radius:50%;background:radial-gradient(circle,#FFE7B0 0%,#FFC870 60%,#FF9F0A 100%);box-shadow:0 0 60px rgba(255,200,112,.6);animation:sunset 6s ease-in-out both"></div><div style="position:absolute;left:0;right:0;bottom:0;height:140px;background:linear-gradient(180deg,#0B0A1C,#000)"></div>';
    else if (th === 'lamp') art = '<div class="abs" style="background:#07061A"></div><div style="position:absolute;left:50%;top:70px;width:280px;height:280px;margin-left:-140px;border-radius:50%;background:radial-gradient(circle,rgba(255,206,130,.45),rgba(255,206,130,0) 65%);animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:150px;margin-left:-50px;width:100px;height:66px;background:linear-gradient(180deg,#FFD9A0,#F2B35E);border-radius:50px 50px 8px 8px;animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:216px;margin-left:-3px;width:6px;height:110px;background:#3A3A3C"></div><div style="position:absolute;left:50%;top:324px;margin-left:-40px;width:80px;height:10px;border-radius:6px;background:#3A3A3C"></div>';
    else art = '<div class="abs" style="background:#07061A"></div><div style="position:absolute;left:50%;top:60px;width:300px;height:300px;margin-left:-150px;border-radius:50%;background:radial-gradient(circle,rgba(255,206,130,.35),rgba(255,206,130,0) 65%);animation:lampdim 6s ease-in-out both"></div><div style="position:absolute;left:50%;top:120px;margin-left:-120px;width:240px;height:160px;perspective:900px"><div style="position:absolute;left:0;top:0;width:120px;height:160px;background:#F2F2F7;border-radius:10px 2px 2px 10px;padding:22px 16px;display:flex;flex-direction:column;gap:10px"><div style="height:5px;border-radius:3px;background:#C7C7CC"></div><div style="height:5px;width:80%;border-radius:3px;background:#C7C7CC"></div><div style="height:5px;border-radius:3px;background:#C7C7CC"></div><div style="height:5px;width:60%;border-radius:3px;background:#C7C7CC"></div></div><div style="position:absolute;left:120px;top:0;width:120px;height:160px;background:linear-gradient(135deg,#5E5CE6,#3634A3);border-radius:2px 10px 10px 2px;transform-origin:left center;animation:bookclose 5s ease-in-out .6s both"></div></div>';
    return scr(L.top('final-reel', '<span class="fn">Closing ritual</span>', '<button class="btn glass sm" data-a="replay" data-k="ritual_replay">Replay</button>') +
      '<div data-run="' + S.run + '" style="position:relative;height:340px;border-radius:32px;overflow:hidden;flex:none">' + art +
      '<div style="position:absolute;left:0;right:0;bottom:34px;text-align:center;padding:0 24px;animation:textin 6.5s ease-out both"><p style="font-size:22px;font-weight:700;color:#fff">Time to close the night.</p></div></div>' +
      '<div class="sec"><p class="hdr">Next, three quick steps</p>' + L.wind3({ size: 64 }) + '</div>' +
      '<div class="sec"><p class="hdr">Theme</p>' + L.seg([['sunset', 'Sunset'], ['lamp', 'Lamp'], ['book', 'Book']], th, 'theme', 'ritual_theme') + '</div>' +
      foot('<a href="#/note" class="btn fill" data-k="ritual_continue">Continue</a>'));
  });
  A.theme = function (v) { S.theme = v; S.run++; };
  A.replay = function () { S.run++; };

  /* ---------- note, lights out ---------- */
  var CHIPS = ['You did the hard part.', 'Big day. Breathe first.', 'Call Amma back.'];
  def('note', 'Note to morning self', function () {
    return scr(L.top('ritual', '<span class="fn">Optional</span>') + head('Note to morning self', 'One line. You\'ll read it at 7:00 am, whatever kind of night it turns out to be.') +
      '<div class="sec"><textarea id="note" class="field" rows="4" data-f="note" maxlength="120" aria-label="Your note" placeholder="Start slow. Chai first, emails later.">' + esc(S.note) + '</textarea><p id="ncount" class="ftr" style="text-align:right">' + S.note.length + ' / 120</p></div>' +
      '<div class="sec"><p class="hdr">Need a nudge?</p><div class="chips">' + CHIPS.map(function (c, i) { return L.chip(S.note === c, c, 'chip', i, 'note_nudge'); }).join('') + '</div></div>' +
      foot('<a href="#/lights-out" class="btn fill" data-k="note_save">Save and lights out</a><a href="#/lights-out" class="btn plain" data-k="note_skip">Skip tonight</a>'));
  });
  A.chip = function (v) { S.note = CHIPS[parseInt(v, 10)]; };
  def('lights-out', 'Lights-Out waiting', function () {
    return scr(L.top('note') + '<div class="stack"><p class="fn l2">Lights out by 12:00 am</p><h1 class="t1">Three last steps</h1><p class="l2">Do all three and you\'re down for the night.</p></div>' +
      L.wind3({ status: [true, false, false], size: 78 }) +
      list([cell({ icon: 'plug', color: 'green', t: 'Phone charging', s: 'Connect the charger cable to your phone' }), cell({ icon: 'phone', color: 'indigo', t: 'Screen facing down', s: 'Turn the phone over so the screen touches the table or bed' }), cell({ icon: 'moon', color: 'purple', t: 'Room is dark', s: 'Switch off the light in your room' })], { ic: 1 }) +
      foot('<a href="#/lights-out-reward" class="btn fill" data-k="lights_out_sleep">' + ic('moon', 18, 2.2) + 'I\'m going to sleep</a><a href="#/lights-out-reward" class="btn glass" data-k="lights_out_simulate">Simulate: phone face-down in a dark room</a>'));
  });
  def('lights-out-reward', 'Lights-Out reward', function () {
    return scr('<div class="edge"></div>' +
      '<div class="stack c" style="flex:1;justify-content:center;gap:14px;padding-top:40px;animation:rise .6s ease-out both"><span style="width:124px;height:124px;border-radius:50%;background:rgba(94,92,230,.2);color:#B3B1FF;display:flex;align-items:center;justify-content:center">' + ic('moon', 58, 1.5) + '</span>' +
      '<p class="fn l2">11:52 pm</p><h1>Down for the night</h1><p class="l2">Nicely done. That\'s 5 of 7 on-time nights this week.</p></div>' +
      list([cell({ icon: 'people', color: 'indigo', t: 'Your Circle sees', s: 'Down for the night' }), cell({ icon: 'mail', color: 'orange', t: 'Amma\'s message', s: 'Opens at 7:00 am' })], { ic: 1 }) +
      foot('<a href="#/morning-sealed" class="btn plain" data-k="skip_to_morning">Skip to 7:00 am (demo)</a>'));
  });
})();
