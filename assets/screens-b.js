/* Lantern playtest: mornings, Circles, Premium, Settings, sender pages. */
(function () {
  'use strict';
  var L = window.L, S = L.S, A = L.A, ic = L.ic, scr = L.scr, esc = L.esc;
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }
  var GLOW = 'radial-gradient(140% 70% at 50% 0%,rgba(230,194,122,.22),transparent 60%)';
  function ico(name, size, color) {
    return '<span style="width:' + (size || 40) + 'px;height:' + (size || 40) + 'px;flex:none;border-radius:16px;background:var(--card2);color:' + (color || 'var(--hi)') + ';display:flex;align-items:center;justify-content:center">' + ic(name) + '</span>';
  }
  function back(href, label) { return '<a href="#/' + href + '" class="btn quiet" style="width:auto;align-self:flex-start;padding:0;min-height:44px">' + ic('chev', 18) + ' ' + (label || 'Back') + '</a>'; }
  function noteCard() {
    var t = S.note && S.note.trim() ? S.note : 'Big day. Breathe first.';
    return '<div class="card" style="display:flex;flex-direction:column;gap:6px"><p class="eyebrow">Last night, you wrote</p><p style="font-size:18px;font-weight:700">' + esc(t) + '</p><p class="muted" style="font-size:12px">11:41 pm</p></div>';
  }
  var H = [10, 18, 28, 16, 34, 22, 12, 30, 20, 36, 14, 26, 32, 18, 24, 10, 28, 16, 22, 12];

  /* ---------- morning ---------- */
  def('morning-sealed', 'Morning · Sealed', function () {
    return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:22px;animation:rise .5s ease-out both">' +
      '<div><p class="eyebrow">Sunday · 7:00 am</p><h1 style="font-size:32px">Good morning, Arjun.</h1><p class="muted" style="font-size:16px">You were down at 11:52 pm. Something is waiting for you.</p></div>' +
      '<a href="#/morning-unlocked" class="card" style="text-decoration:none;color:var(--ink);display:flex;flex-direction:column;gap:14px;align-items:flex-start;padding:24px;border:1px solid rgba(230,194,122,.4);box-shadow:0 0 40px rgba(230,194,122,.25)" data-k="morning_open">' +
      '<span style="width:64px;height:64px;border-radius:50%;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center">' + ic('mail', 30) + '</span><p style="font-size:22px;font-weight:800">A message from Amma</p><p class="muted">Sealed until this morning</p><span class="btn primary" style="width:auto;padding:0 28px">Open it</span></a>' +
      noteCard() + '</div>' + L.nav('mornings'), { style: 'background:' + GLOW });
  });
  def('morning-unlocked', 'Morning · Message', function () {
    var bars = H.map(function (h, i) { return '<span style="width:5px;height:' + h + 'px;border-radius:3px;background:' + (S.playing && i < 9 ? 'var(--hi)' : 'var(--slate)') + '"></span>'; }).join('');
    var recT = ['Tap to record a reply', 'Recording 0:12. Tap to stop', 'Reply recorded 0:12. Tap to send'][S.rec] || '';
    return scr(back('home', 'Tonight') + '<div><p class="eyebrow">Morning Drop</p><h1>Amma says good morning</h1></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:16px;padding:20px;border:1px solid rgba(230,194,122,.3)"><div class="row"><span style="width:44px;height:44px;border-radius:50%;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center;font-weight:800">A</span><div style="flex:1"><p style="font-weight:800">Amma</p><p class="muted" style="font-size:13px">Voice note · 0:42</p></div></div>' +
      '<div class="row" style="gap:14px"><button class="step" style="background:var(--hi);color:var(--accInk);border:0" data-a="play" data-k="morning_play" data-v="' + (S.playing ? 'pause' : 'play') + '" aria-label="' + (S.playing ? 'Pause' : 'Play') + '">' + ic(S.playing ? 'pause' : 'play', 22) + '</button><div class="row" style="gap:4px;flex:1;align-items:center;height:40px;justify-content:space-between">' + bars + '</div></div></div>' +
      '<div class="row" style="gap:10px"><button class="pill' + (S.hearted ? ' on' : '') + '" style="flex:1" data-a="heart" data-k="morning_heart" data-v="' + (S.hearted ? 'off' : 'on') + '">' + ic('heart', 18) + (S.hearted ? 'Hearted' : 'Send a heart') + '</button></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><p style="font-weight:700">Reply with a 30-second voice note</p>' +
      '<button class="btn ' + (S.rec === 2 ? 'primary' : 'ghost') + '" data-a="rec" data-k="morning_reply" data-v="' + S.rec + '">' + ic(S.rec === 1 ? 'stop' : (S.rec === 2 ? 'send' : 'mic'), 20) + recT + '</button></div>' +
      noteCard() + '<a href="#/home" class="btn quiet" style="margin-top:auto">Back to Tonight</a>', { style: 'background:' + GLOW });
  });
  A.play = function (v) { S.playing = v === 'play'; };
  A.heart = function (v) { S.hearted = v === 'on'; };
  A.rec = function () { S.rec = (S.rec + 1) % 3; };
  def('morning-held', 'Morning · Held', function () {
    return scr(back('home', 'Tonight') + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:18px"><div><p class="eyebrow">Saturday</p><h1>Saved and sealed.</h1><p class="muted" style="font-size:16px">Amma\'s message opens at 7:00 am after an on-time night. You\'re at 4 of 7 this week.</p></div>' +
      '<div class="card row" style="padding:16px">' + ico('mail') + '<div style="flex:1"><p style="font-weight:700">From Amma</p><p class="muted" style="font-size:13px">Voice note · sealed</p></div>' + ic('lock', 20) + '</div>' +
      '<a href="#/lights-out" class="btn ghost" data-k="held_start_night">Start tonight\'s wind-down</a></div>' + L.nav('mornings'), { style: 'background:' + GLOW });
  });
  def('morning-self', 'Morning · Self', function () {
    return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px"><div><p class="eyebrow">Sunday · 7:00 am</p><h1 style="font-size:32px">Four early nights this week.</h1><p class="muted" style="font-size:16px">That\'s you, keeping a promise. No message today, but you left one for yourself.</p></div>' +
      noteCard() + '<a href="#/o5" class="btn ghost" data-k="self_ask_drop">Ask someone for a Morning Drop</a><a href="#/morning-self-none" class="btn quiet">See the no-note version</a></div>' + L.nav('mornings'), { style: 'background:' + GLOW });
  });
  def('morning-self-none', 'Morning · Self (no note)', function () {
    return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px"><div><p class="eyebrow">Sunday · 7:00 am</p><h1 style="font-size:32px">Four early nights this week.</h1><p class="muted" style="font-size:16px">A quiet morning is a good one. Want someone to start your day with a voice note?</p></div>' +
      '<a href="#/o5" class="btn primary" data-k="self_ask_drop">Ask someone for a Morning Drop</a></div>' + L.nav('mornings'), { style: 'background:' + GLOW });
  });

  /* ---------- circles ---------- */
  var PPL = ['Amma', 'Rhea', 'Karan', 'Dev'];
  def('circle-night', 'Circle · Tonight', function () {
    S.gnSent = S.gnSent || {};
    var rows = ['You'].concat(PPL).map(function (n, i) {
      var down = n === 'You' || n === 'Amma' ? 1 : 0;
      var right = n === 'You' ? '<span class="tag">Waiting</span>' : '<button class="pill' + (S.gnSent[n] ? ' on' : '') + '" style="min-height:40px;padding:0 14px" data-a="gn" data-v="' + n + '" data-k="circle_goodnight">' + (S.gnSent[n] ? 'Sent' : 'Goodnight') + '</button>';
      return '<div class="row" style="padding:10px 0;border-top:' + (i ? '1px solid var(--line)' : '0') + '"><span style="width:40px;height:40px;border-radius:50%;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center;font-weight:800">' + n[0] + '</span><div style="flex:1"><p style="font-weight:700">' + n + '</p><p class="muted" style="font-size:12px">' + (down ? 'Down for the night' : 'Still up') + '</p></div>' + right + '</div>';
    }).join('');
    return scr('<div class="row" style="justify-content:space-between"><div><p class="eyebrow">Family Circle</p><h1 style="font-size:28px">The 12:30 Club</h1></div><button class="iconbtn" aria-label="Circle menu" data-a="cmenu" data-k="circle_menu">' + ic('dots') + '</button></div>' +
      (S.menu ? '<div class="card" style="display:flex;flex-direction:column;gap:4px;padding:8px"><div class="row" style="justify-content:space-between;padding:6px 8px"><span>Mute tonight</span>' + L.sw(S.mute, 'Mute tonight', 'mute', 'circle_mute') + '</div><button class="btn quiet" style="justify-content:flex-start" data-a="leave" data-k="circle_leave">Leave Circle quietly</button></div>' : '') +
      '<div class="card" style="display:flex;flex-direction:column;gap:6px"><p class="eyebrow">Shared goal</p><p style="font-size:20px;font-weight:800">Everyone down by 12:30 am</p><p class="muted">2 down so far</p></div>' +
      '<div class="card" style="padding:8px 16px">' + rows + '</div>' +
      '<a href="#/circle-invite" class="btn ghost" data-k="circle_invite">' + ic('plus', 18) + 'Invite to Circle</a>' + L.nav('circle'));
  });
  A.cmenu = function () { S.menu = !S.menu; };
  A.mute = function (v) { S.mute = v === 'on'; };
  A.leave = function () { S.menu = false; L.toast('You left the Circle quietly (demo)'); };
  A.gn = function (n) { S.gnSent = S.gnSent || {}; S.gnSent[n] = !S.gnSent[n]; };
  var CN = ['Rhea', 'Karan', 'Amma', 'Dev', 'Meera'];
  def('circle-invite', 'Circle · Invite', function () {
    var tags = '<span class="tag">You</span>' + CN.slice(0, S.cn).map(function (n) { return '<span class="tag">' + n + '</span>'; }).join('');
    return scr(back('circle-night') + '<div><h1>Invite your Circle</h1><p class="muted">Up to 5 people. A shared goal, a goodnight, nothing more.</p></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><p class="muted" style="font-weight:600">Everyone down by</p><div class="row" style="justify-content:space-between"><button class="step" data-a="cg" data-v="-" data-k="circle_goal" aria-label="Earlier">&#8722;</button><span style="font-size:30px;font-weight:800">' + L.fmtMin(S.cg) + '</span><button class="step" data-a="cg" data-v="+" data-k="circle_goal" aria-label="Later">+</button></div></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="row" style="justify-content:space-between"><p style="font-weight:700">Members (' + (S.cn + 1) + ' of 5)</p><button class="pill" style="min-height:40px;padding:0 14px" data-a="cadd" data-k="circle_add">' + ic('plus', 16) + 'Add</button></div><div class="row" style="gap:8px;flex-wrap:wrap">' + tags + '</div></div>' +
      '<a href="#/circle-night" class="btn primary" style="margin-top:auto" data-k="circle_invite_whatsapp">' + ic('chat') + 'Invite via WhatsApp</a>');
  });
  A.cg = function (v) { S.cg = Math.max(60, Math.min(240, S.cg + (v === '+' ? 15 : -15))); };
  A.cadd = function () { if (S.cn < 4) S.cn++; else L.toast('A Circle has up to 5 people'); };

  /* ---------- premium ---------- */
  var LIST = ['Floating Me-Time ring', 'Final Reel and Encore', 'Closing rituals and themes', 'Morning Drops from your Circle', 'Circles with shared goals', 'Lights-Out rewards'];
  def('premium', 'Premium', function () {
    var yr = S.cplan === 'yearly';
    function opt(id, name, price, sub) { return '<button class="opt big' + (S.cplan === id ? ' on' : '') + '" aria-pressed="' + (S.cplan === id) + '" data-a="cplan" data-v="' + id + '" data-k="premium_plan"><span class="dot"><span></span></span><span style="flex:1"><b style="display:block;font-size:17px">' + name + '</b><span class="muted" style="font-size:13px">' + sub + '</span></span><b style="font-size:18px">' + price + '</b></button>'; }
    return scr(back('home', 'Back') + '<div><span class="tag">Trial · 18 days left</span><h1 style="margin-top:10px">Lantern Premium</h1><p class="muted" style="font-size:16px">Keep every night as good as the first.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + opt('monthly', 'Monthly', 'Rs 99', 'Cancel any time') + opt('yearly', 'Yearly', 'Rs 599', 'Best value · about Rs 50 a month') + '</div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:10px"><p class="eyebrow">Everything included</p>' + LIST.map(function (t) { return '<div class="row"><span style="color:var(--hi)">' + ic('check', 18, 2.4) + '</span><span>' + t + '</span></div>'; }).join('') + '</div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:8px"><p class="eyebrow">Our promises</p><p>No ads, ever.</p><p>We never read your messages or sell your data.</p><p>Cancel in two taps, any time.</p></div>' +
      (S.cdone ? '<span class="tag" style="align-self:flex-start">Google Play payment sheet opens here (demo)</span>' : '') +
      '<div style="display:flex;flex-direction:column;gap:6px"><button class="btn primary" data-a="cdone" data-k="premium_continue" data-v="' + S.cplan + '">Continue with ' + (yr ? 'Rs 599 a year' : 'Rs 99 a month') + '</button>' +
      '<a href="#/settings" class="btn ghost" data-k="premium_circle_gift">Let my Circle gift it</a><a href="#/home" class="btn quiet" data-k="premium_not_now">Not now</a>' +
      '<p class="muted" style="font-size:12px;text-align:center">Renews at ' + (yr ? 'Rs 599 a year' : 'Rs 99 a month') + '. Cancel any time in Google Play.</p><button class="btn quiet" style="min-height:36px;font-size:13px" data-a="restore" data-k="premium_restore">Restore purchase</button></div>');
  });
  A.cplan = function (v) { S.cplan = v; S.cdone = false; };
  A.cdone = function () { S.cdone = true; };
  A.restore = function () { L.toast('No purchase to restore (demo)'); return false; };
  def('trial', 'Trial bonus', function () {
    return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px"><span style="width:84px;height:84px;border-radius:50%;background:var(--card2);color:var(--hi);display:flex;align-items:center;justify-content:center;box-shadow:0 0 50px rgba(230,194,122,.35)">' + ic('sparkle', 38) + '</span>' +
      '<div><h1>3 on-time nights in a row</h1><p style="font-size:20px;font-weight:800;color:var(--hi);margin-top:8px">7 bonus days added to your trial</p></div>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="row" style="justify-content:space-between"><span>Day 3 of 21</span><span class="muted">18 days left</span></div><div style="height:8px;border-radius:8px;background:var(--card2)"><div style="width:14%;height:8px;border-radius:8px;background:var(--hi)"></div></div></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><a href="#/home" class="btn primary">Back to tonight</a><a href="#/premium" class="btn quiet" data-k="trial_see_plans">See plans</a></div>');
  });

  /* ---------- settings ---------- */
  var THEMES = [['sunset', 'Sunset'], ['lamp', 'Lamp'], ['book', 'Book']], REW = [['moonrise', 'Moonrise'], ['starfield', 'Starfield'], ['fireflies', 'Fireflies']];
  def('settings', 'Settings', function () {
    function grp(a, items, cur, k) { return '<div class="grid3">' + items.map(function (x) { return L.pill(cur === x[0], x[1], a, x[0], k); }).join('') + '</div>'; }
    return scr(back('home', 'Tonight') + '<h1>Settings</h1>' +
      '<a href="#/premium" class="card row" style="text-decoration:none;color:var(--ink)" data-k="settings_premium">' + ico('sparkle') + '<div style="flex:1"><p style="font-weight:800">Premium trial</p><p class="muted" style="font-size:13px">18 days left</p></div>' + ic('chev', 18) + '</a>' +
      '<a href="#/trial" class="lk" style="text-decoration:none" data-k="settings_bonus">+7 days bonus earned</a>' +
      '<div class="sec card"><div class="row" style="justify-content:space-between"><b>Floating ring</b>' + L.sw(S.sRing, 'Floating ring', 'sring', 'consent_ring') + '</div>' +
      '<p class="muted" style="font-size:13px">Size</p>' + grp('ssize', [['S', 'Small'], ['M', 'Medium'], ['L', 'Large']], S.sSize, 'settings_ring_size') +
      '<p class="muted" style="font-size:13px">Opacity</p>' + grp('sop', [['60', '60%'], ['80', '80%'], ['100', '100%']], String(S.sOp), 'settings_ring_opacity') + '</div>' +
      '<div class="sec card"><b>Ritual theme</b>' + grp('theme', THEMES, S.theme, 'settings_theme') + '</div>' +
      '<div class="sec card"><b>Lights-Out reward</b>' + grp('reward', REW, S.reward, 'settings_reward') + '</div>' +
      '<div class="sec card"><b>Plan schedule</b>' + grp('sched', [['weekdays', 'Weekdays'], ['weekend', 'Weekend'], ['custom', 'Custom']], S.schedule, 'plan_schedule') +
      '<div class="times"><div><p>Me-Time</p><p>' + L.fmtMin(S.t - S.len) + '</p></div><div><p>Final Reel</p><p>' + L.fmtMin(S.t) + '</p></div><div><p>Lights out</p><p>' + L.fmtMin(S.t + 30) + '</p></div></div><a href="#/plan" class="btn ghost" style="min-height:44px" data-k="settings_edit_times">Edit times</a></div>' +
      '<div class="sec card"><b>Circle</b><div class="row" style="justify-content:space-between"><span>Mute Family Circle</span>' + L.sw(S.mute, 'Mute Family Circle', 'mute', 'consent_mute') + '</div>' +
      '<div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px"><div><p>Let my Circle gift Lantern</p><p class="muted" style="font-size:12px">Near the end of your trial, your Circle gets one WhatsApp message asking if they would like to gift you Premium. They can stop these any time.</p></div>' + L.sw(S.gift, 'Let my Circle gift Lantern', 'gift', 'consent_gift') + '</div>' +
      '<a href="#/circle-invite" class="btn ghost" style="min-height:44px" data-k="settings_add_circle">Add another Circle</a><p class="muted" style="font-size:12px;text-align:center">1 of 3 used</p></div>' +
      '<a href="#/trial-ended" class="btn quiet" data-k="settings_preview_ended">Preview: trial ended</a>');
  });
  A.sring = function (v) { S.sRing = v === 'on'; };
  A.ssize = function (v) { S.sSize = v; };
  A.sop = function (v) { S.sOp = parseInt(v, 10); };
  A.reward = function (v) { S.reward = v; };
  A.sched = function (v) { S.schedule = v; };
  A.gift = function (v) { S.gift = v === 'on'; };
  def('trial-ended', 'Trial ended', function () {
    var lock = ['Floating Me-Time ring', 'Final Reel and Encore', 'Closing rituals', 'Circles'].map(function (t) { return '<div class="row" style="padding:6px 0"><span style="color:var(--slate)">' + ic('lock', 18) + '</span><span class="muted">' + t + '</span></div>'; }).join('');
    return scr('<div style="padding-top:20px"><h1>Your trial has ended</h1><p class="muted" style="font-size:16px">Tonight\'s plan is paused. Your streak and notes are safe.</p></div>' +
      '<a href="#/premium" class="btn primary" data-k="ended_see_plans">See plans · from Rs 99 a month</a>' +
      (S.asked ? '<span class="tag" style="align-self:flex-start">Your Family Circle gets one WhatsApp message</span>' : '<button class="btn ghost" data-a="asked" data-k="ended_ask_circle">Ask my Circle to gift it</button>') +
      '<a href="#/morning-unlocked" class="card row" style="text-decoration:none;color:var(--ink)" data-k="ended_message">' + ico('mail') + '<div style="flex:1"><p style="font-weight:700">A message from Amma</p><p class="muted" style="font-size:12px">Still yours to open</p></div></a>' +
      '<div class="card"><p class="eyebrow" style="margin-bottom:6px">Paused until you subscribe</p>' + lock + '</div>' + L.nav('tonight'));
  });
  A.asked = function () { S.asked = true; };

  /* ---------- sender pages ---------- */
  var SB = 'font-size:18px;';
  def('sender-record', 'Sender · Record', function () {
    var voice = S.smode !== 'text', rt = ['Tap to record', 'Recording 0:24. Tap to stop', 'Recorded 0:38. Tap to redo'][S.srec];
    return scr('<div style="' + SB + '"><p class="eyebrow">Lantern · message for Arjun</p><h1 style="font-size:30px">Arjun is trying to sleep on time</h1><p class="muted" style="font-size:18px">A good-morning message from you will open when he wakes up. It takes a minute.</p></div>' +
      '<div class="row" style="gap:8px">' + L.pill(voice, 'Voice', 'smode', 'voice', 'sender_mode') + L.pill(!voice, 'Text', 'smode', 'text', 'sender_mode') + '</div>' +
      (voice ? '<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:26px"><button data-a="srec" data-k="sender_record" aria-label="' + rt + '" style="width:96px;height:96px;border-radius:50%;border:0;cursor:pointer;background:' + (S.srec === 1 ? '#ECE8DF' : 'var(--hi)') + ';color:var(--accInk);display:flex;align-items:center;justify-content:center">' + ic(S.srec === 1 ? 'stop' : 'mic', 40) + '</button><p style="font-size:18px;font-weight:700">' + rt + '</p></div>'
        : '<div style="display:flex;flex-direction:column;gap:6px"><label for="smsg" style="font-size:16px;font-weight:600">Your message</label><textarea id="smsg" class="field" rows="5" maxlength="500" data-f="smsg" style="font-size:18px;resize:none" placeholder="Good morning, beta. Proud of you.">' + esc(S.smsg) + '</textarea><p id="scount" class="muted" style="text-align:right;font-size:13px">' + S.smsg.length + ' / 500</p></div>') +
      '<label class="row" style="align-items:flex-start;gap:12px;cursor:pointer"><input type="checkbox" data-f="consent" data-k="sender_consent" ' + (S.consent ? 'checked' : '') + ' style="width:26px;height:26px;margin-top:2px;accent-color:#E6C27A;flex:none"><span style="font-size:15px">Send me Lantern updates about Arjun on WhatsApp, including a gift reminder near the end of his trial. Stop any time.</span></label>' +
      '<a href="#/sender-sent" class="btn primary" style="margin-top:auto;font-size:18px" data-k="sender_send">Send to Arjun</a>');
  });
  A.smode = function (v) { S.smode = v; };
  A.srec = function () { S.srec = (S.srec + 1) % 3; };
  def('sender-sent', 'Sender · Sent', function () {
    return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px"><span style="width:76px;height:76px;border-radius:50%;background:var(--hi);color:var(--accInk);display:flex;align-items:center;justify-content:center">' + ic('check', 38, 2.4) + '</span><h1 style="font-size:32px">Sent. Thank you.</h1><p class="muted" style="font-size:18px">Arjun will hear it the morning after an on-time night.</p>' +
      '<div class="card row" style="font-size:18px">' + ico('people') + '<div style="flex:1"><p style="font-weight:800">Join Arjun\'s Circle</p><p class="muted" style="font-size:14px">Share a bedtime goal together</p></div></div>' +
      '<a href="#/sender-gift" class="card row" style="text-decoration:none;color:var(--ink);font-size:18px" data-k="sender_gift_card">' + ico('gift') + '<div style="flex:1"><p style="font-weight:800">Gift Arjun a year of Premium &#8377;599</p><p class="muted" style="font-size:14px">Pay with UPI</p></div></a></div>' +
      '<a href="#/gift-nudge" class="btn quiet" data-k="sender_see_reminder">See the reminder you would get later</a>');
  });
  def('gift-nudge', 'WhatsApp gift message', function () {
    return scr('<p class="eyebrow">WhatsApp · Lantern</p><div class="bub" style="font-size:17px"><p>Hi Amma, Arjun has slept on time 6 of the last 7 nights. His Lantern trial ends in 3 days. Would you like to gift him Premium?</p><div class="qr" style="display:flex;flex-direction:column;gap:8px"><a href="#/sender-gift" class="btn ghost" style="min-height:48px" data-k="nudge_gift">Gift Lantern</a><button class="btn ghost" style="min-height:48px" data-a="nudge" data-v="notnow" data-k="nudge_not_now">Not now</button><button class="btn quiet" style="min-height:48px" data-a="nudge" data-v="stop" data-k="nudge_stop_messages">Stop gift messages</button></div></div>' +
      (S.reminder ? '<div class="bub" style="font-size:17px"><p>No problem. We will remind you once more tomorrow.</p></div>' : '') +
      (S.stopped ? '<span class="tag" style="align-self:flex-start">Done. No more gift messages about Arjun.</span>' : ''), { style: 'background:none' });
  });
  A.nudge = function (v) { if (v === 'stop') { S.stopped = true; S.reminder = false; } else { S.reminder = true; S.stopped = false; } };
  def('sender-gift', 'Sender · UPI gift', function () {
    if (S.gsent) {
      return scr('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px"><span style="width:76px;height:76px;border-radius:50%;background:var(--hi);color:var(--accInk);display:flex;align-items:center;justify-content:center">' + ic('gift', 36) + '</span><h1 style="font-size:32px">Gift sent</h1><p class="muted" style="font-size:18px">Arjun gets ' + (S.gplan === 'year' ? 'a year' : 'a month') + ' of Premium. Want to add a few words?</p></div>' +
        '<a href="#/sender-record" class="btn primary" style="font-size:18px" data-k="gift_record_message">Record a message for him</a>');
    }
    function opt(id, n, p) { return '<button class="opt big' + (S.gplan === id ? ' on' : '') + '" aria-pressed="' + (S.gplan === id) + '" data-a="gplan" data-v="' + id + '" data-k="gift_plan" style="font-size:18px"><span class="dot"><span></span></span><b style="flex:1">' + n + '</b><b>' + p + '</b></button>'; }
    return scr(back('sender-sent') + '<div><h1 style="font-size:30px">Gift Lantern to Arjun</h1><p class="muted" style="font-size:18px">One payment. No subscription for you.</p></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + opt('year', 'One year', 'Rs 599') + opt('month', 'One month', 'Rs 99') + '</div>' +
      '<div style="margin-top:auto;display:flex;flex-direction:column;gap:6px"><button class="btn primary" style="font-size:18px" data-a="gpay" data-k="gift_pay_upi" data-v="' + S.gplan + '">Pay ' + (S.gplan === 'year' ? 'Rs 599' : 'Rs 99') + ' with UPI</button><a href="#/sender-sent" class="btn quiet" data-k="gift_not_now">Not now</a></div>');
  });
  A.gplan = function (v) { S.gplan = v; };
  A.gpay = function () { S.gsent = true; };
})();
