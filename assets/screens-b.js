/* Lantern playtest: mornings, Circles, Premium, Settings, sender pages (iOS 26 design language). */
(function () {
  'use strict';
  var L = window.L, S = L.S, A = L.A, ic = L.ic, scr = L.scr, esc = L.esc, cell = L.cell, list = L.list;
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }
  function foot(h) { return '<div class="foot">' + h + '</div>'; }
  function head(t, sub, center) { return '<div class="stack' + (center ? ' c' : '') + '"><h1' + (t.length > 30 ? ' class="t1"' : '') + '>' + t + '</h1>' + (sub ? '<p class="l2">' + sub + '</p>' : '') + '</div>'; }
  function circ(icon, bg, size) { return '<span style="width:' + (size || 76) + 'px;height:' + (size || 76) + 'px;border-radius:50%;background:' + bg + ';color:#fff;display:flex;align-items:center;justify-content:center;flex:none">' + icon + '</span>'; }
  function noteCard() {
    var t = S.note && S.note.trim() ? S.note : 'Big day. Breathe first.';
    return '<div class="mat p stack" style="gap:6px"><p class="fn l2">Last night, you wrote</p><p style="font-size:19px;font-weight:600">' + esc(t) + '</p><p class="cap l2">11:41 pm</p></div>';
  }
  var H = [10, 18, 28, 16, 34, 22, 12, 30, 20, 36, 14, 26, 32, 18, 24, 10, 28, 16, 22, 12];

  /* ---------- morning ---------- */
  def('morning-sealed', 'Morning · Sealed', function () {
    return scr('<div class="stack" style="padding-top:10px"><p class="fn" style="color:rgba(255,255,255,.75)">Sunday · 7:00 am</p><h1>Good morning, Arjun.</h1><p class="l2">You were down at 11:52 pm. Something is waiting for you.</p></div>' +
      '<a href="#/morning-unlocked" class="mat p stack c" style="gap:12px;color:#fff;padding:28px 20px;animation:rise .5s ease-out both" data-k="morning_open">' + circ(ic('mail', 34, 2), '#FF9F0A', 72) +
      '<h2>A message from Amma</h2><p class="l2">Sealed until this morning</p><span class="btn fill sm" style="margin-top:4px">Open it</span></a>' + noteCard() + L.nav('mornings'), { cls: 'dawn tabs' });
  });
  def('morning-unlocked', 'Morning · Message', function () {
    var bars = H.map(function (h, i) { return '<span style="width:4px;height:' + h + 'px;border-radius:2px;background:' + (S.playing && i < 9 ? '#fff' : 'rgba(255,255,255,.35)') + '"></span>'; }).join('');
    var recT = ['Record a reply', 'Recording 0:12 · tap to stop', 'Reply recorded 0:12 · tap to send'][S.rec] || '';
    return scr(L.top('home', '<span class="fn">Morning Drop</span>') + head('Amma says good morning') +
      '<div class="mat p stack" style="gap:16px"><div class="row">' + L.av('Amma', 'pink') + '<div style="flex:1"><p class="hl">Amma</p><p class="fn l2">Voice note · 0:42</p></div>' +
      '<button class="gbtn" data-a="heart" data-k="morning_heart" data-v="' + (S.hearted ? 'off' : 'on') + '" aria-label="' + (S.hearted ? 'Remove heart' : 'Send a heart') + '" style="color:' + (S.hearted ? '#FF375F' : '#fff') + '">' + ic('heart', 20, 2.2) + '</button></div>' +
      '<div class="row" style="gap:14px"><button data-a="play" data-k="morning_play" data-v="' + (S.playing ? 'pause' : 'play') + '" aria-label="' + (S.playing ? 'Pause' : 'Play') + '" style="width:52px;height:52px;border-radius:50%;border:0;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none">' + ic(S.playing ? 'pause' : 'play', 22, 2.6) + '</button>' +
      '<div class="row" style="gap:3px;flex:1;height:40px;justify-content:space-between" aria-hidden="true">' + bars + '</div></div>' + (S.hearted ? '<span class="badge" style="color:#FF375F">' + ic('heart', 13, 2.4) + 'Heart sent to Amma</span>' : '') + '</div>' +
      '<div class="mat">' + cell({ a: 'rec', k: 'morning_reply', v: S.rec, icon: S.rec === 1 ? 'stop' : (S.rec === 2 ? 'send' : 'mic'), color: S.rec === 1 ? 'red' : 'indigo', t: recT, s: '30-second voice note' }) + '</div>' +
      noteCard() + foot('<a href="#/home" class="btn plain">Back to Tonight</a>'), { cls: 'dawn' });
  });
  A.play = function (v) { S.playing = v === 'play'; };
  A.heart = function (v) { S.hearted = v === 'on'; };
  A.rec = function () { S.rec = (S.rec + 1) % 3; };
  def('morning-held', 'Morning · Held', function () {
    return scr(L.top('home') + '<div class="stack" style="gap:20px;flex:1;justify-content:center"><div class="stack"><p class="fn l2">Saturday</p><h1>Saved and sealed.</h1><p class="l2">Amma\'s message opens at 7:00 am after an on-time night. You\'re at 4 of 7 this week.</p></div>' +
      '<div class="mat">' + cell({ icon: 'mail', color: 'orange', t: 'From Amma', s: 'Voice note · sealed', right: '<span class="l3">' + ic('lock', 18, 2.2) + '</span>' }) + '</div>' +
      '<a href="#/lights-out" class="btn glass" data-k="held_start_night">Start tonight\'s wind-down</a></div>' + L.nav('mornings'), { cls: 'dawn tabs' });
  });
  def('morning-self', 'Morning · Self', function () {
    return scr('<div class="stack" style="padding-top:10px"><p class="fn" style="color:rgba(255,255,255,.75)">Sunday · 7:00 am</p><h1>Four early nights this week.</h1><p class="l2">That\'s you, keeping a promise. No message today, but you left one for yourself.</p></div>' +
      noteCard() + '<a href="#/o5" class="btn glass" data-k="self_ask_drop">Ask someone for a Morning Drop</a><a href="#/morning-self-none" class="btn plain">See the no-note version</a>' + L.nav('mornings'), { cls: 'dawn tabs' });
  });
  def('morning-self-none', 'Morning · Self (no note)', function () {
    return scr('<div class="stack" style="padding-top:10px"><p class="fn" style="color:rgba(255,255,255,.75)">Sunday · 7:00 am</p><h1>Four early nights this week.</h1><p class="l2">A quiet morning is a good one. Want someone to start your day with a voice note?</p></div>' +
      '<a href="#/o5" class="btn fill" data-k="self_ask_drop">Ask someone for a Morning Drop</a>' + L.nav('mornings'), { cls: 'dawn tabs' });
  });

  /* ---------- circles ---------- */
  var PPL = [['Amma', 'pink', 1], ['Rhea', 'teal', 0], ['Karan', 'orange', 0], ['Dev', 'green', 0]];
  def('circle-night', 'Circle · Tonight', function () {
    S.gnSent = S.gnSent || {};
    var rows = [cell({ lead: L.av('You', 'indigo'), t: 'You', s: 'Down for the night', right: '<span class="badge g">On time</span>' })].concat(PPL.map(function (p) {
      var on = S.gnSent[p[0]];
      return cell({ lead: L.av(p[0], p[1]), t: p[0], s: p[2] ? 'Down for the night' : 'Still up', right: '<button class="chip' + (on ? ' on' : '') + '" data-a="gn" data-v="' + p[0] + '" data-k="circle_goodnight">' + (on ? ic('check', 14, 2.6) + 'Sent' : 'Goodnight') + '</button>' });
    }));
    return scr('<div class="row between" style="padding-top:6px"><div><p class="fn l2">Family Circle</p><h1>The 12:30 Club</h1></div><button class="gbtn" aria-label="Circle options" data-a="cmenu" data-k="circle_menu">' + ic('dots', 20, 3) + '</button></div>' +
      (S.menu ? '<div class="pop" style="border-radius:24px;overflow:hidden;animation:rise .2s ease-out both">' + cell({ t: 'Mute tonight', right: L.sw(S.mute, 'Mute tonight', 'mute', 'circle_mute') }) + cell({ a: 'leave', k: 'circle_leave', t: 'Leave Circle quietly', tc: 'var(--red)' }) + '</div>' : '') +
      '<div class="card stack" style="gap:10px"><p class="fn l2">Shared goal</p><h3>Everyone down by 12:30 am</h3><div class="prog" style="max-width:none;height:8px;border-radius:4px"><i style="width:40%;background:var(--green)"></i></div><p class="fn l2">2 of 5 down so far</p></div>' +
      list(rows, { h: 'Tonight' }) +
      '<a href="#/circle-invite" class="btn glass" data-k="circle_invite">' + ic('plus', 18, 2.4) + 'Invite to Circle</a>' + L.nav('circle'), { cls: 'tabs' });
  });
  A.cmenu = function () { S.menu = !S.menu; };
  A.mute = function (v) { S.mute = v === 'on'; };
  A.leave = function () { S.menu = false; L.toast('You left the Circle quietly (demo)'); };
  A.gn = function (n) { S.gnSent = S.gnSent || {}; S.gnSent[n] = !S.gnSent[n]; };
  var CN = [['Rhea', 'teal'], ['Karan', 'orange'], ['Amma', 'pink'], ['Dev', 'green'], ['Meera', 'purple']];
  def('circle-invite', 'Circle · Invite', function () {
    var mem = [cell({ lead: L.av('You', 'indigo'), t: 'You', val: 'Owner' })].concat(CN.slice(0, S.cn).map(function (n) { return cell({ lead: L.av(n[0], n[1]), t: n[0], val: 'Invited' }); }));
    if (S.cn < 4) mem.push(cell({ a: 'cadd', k: 'circle_add', lead: '<span class="av" style="background:var(--fill);color:var(--tint2)">' + ic('plus', 18, 2.4) + '</span>', t: 'Add someone', tc: 'var(--tint2)' }));
    return scr(L.top('circle-night') + head('Invite your Circle', 'Up to 5 people. A shared goal, a goodnight, nothing more.') +
      '<div class="card stack c" style="gap:12px"><p class="fn l2">Everyone down by</p><p class="big">' + L.fmtMin(S.cg) + '</p>' + L.stp('cg', 'circle_goal', 1) + '</div>' +
      list(mem, { h: 'Members · ' + (S.cn + 1) + ' of 5' }) +
      foot('<a href="#/circle-night" class="btn fill" data-k="circle_invite_whatsapp">Invite via WhatsApp</a>'));
  });
  A.cg = function (v) { S.cg = Math.max(60, Math.min(240, S.cg + (v === '+' ? 15 : -15))); };
  A.cadd = function () { if (S.cn < 4) S.cn++; else L.toast('A Circle has up to 5 people'); };

  /* ---------- premium ---------- */
  var LIST = [['ring', 'indigo', 'Floating Me-Time ring'], ['play', 'purple', 'Final Reel and Encore'], ['moon', 'blue', 'Closing rituals and themes'], ['mail', 'orange', 'Morning Drops from your Circle'], ['people', 'green', 'Circles with shared goals'], ['sparkle', 'pink', 'Lights-Out rewards']];
  def('premium', 'Premium', function () {
    var yr = S.cplan === 'yearly';
    function opt(id, name, price, sub) { var on = S.cplan === id; return cell({ a: 'cplan', v: id, k: 'premium_plan', attr: ' role="radio" aria-checked="' + on + '"', lead: '<span class="chk' + (on ? ' on' : '') + '">' + (on ? ic('check', 14, 3) : '') + '</span>', t: '<b style="font-weight:600">' + name + '</b>', s: sub, val: '<span class="hl" style="color:var(--l1)">' + price + '</span>' }); }
    return scr(L.top('home') + '<div class="stack c" style="gap:12px"><div class="appicon sm">' + L.ic('lantern', 36, 1.7) + '</div><h1>Lantern Premium</h1><p class="l2">Keep every night as good as the first.</p><span class="badge o" style="align-self:center">Trial · 18 days left</span></div>' +
      '<div class="list" role="radiogroup" aria-label="Plan">' + opt('monthly', 'Monthly', 'Rs 99', 'Cancel any time') + opt('yearly', 'Yearly', 'Rs 599', 'Best value · about Rs 50 a month') + '</div>' +
      list(LIST.map(function (x) { return cell({ icon: x[0], color: x[1], t: x[2] }); }), { h: 'Everything included', ic: 1 }) +
      list([cell({ t: 'No ads, ever.' }), cell({ t: 'We never read your messages or sell your data.' }), cell({ t: 'Cancel in two taps, any time.' })], { h: 'Our promises' }) +
      (S.cdone ? '<span class="badge t" style="align-self:center">Google Play payment sheet opens here (demo)</span>' : '') +
      foot('<button class="btn fill" data-a="cdone" data-k="premium_continue" data-v="' + S.cplan + '">Continue with ' + (yr ? 'Rs 599 a year' : 'Rs 99 a month') + '</button>' +
        '<a href="#/settings" class="btn glass" data-k="premium_circle_gift">Let my Circle gift it</a><a href="#/home" class="btn plain" data-k="premium_not_now">Not now</a>' +
        '<p class="cap l2 c">Renews at ' + (yr ? 'Rs 599 a year' : 'Rs 99 a month') + '. Cancel any time in Google Play.</p><button class="btn plain" style="min-height:36px;font-size:15px" data-a="restore" data-k="premium_restore">Restore purchase</button>'));
  });
  A.cplan = function (v) { S.cplan = v; S.cdone = false; };
  A.cdone = function () { S.cdone = true; };
  A.restore = function () { L.toast('No purchase to restore (demo)'); return false; };
  def('trial', 'Trial bonus', function () {
    return scr(L.top('settings') + '<div class="stack c" style="flex:1;justify-content:center;gap:16px">' + circ(ic('sparkle', 40, 2), 'linear-gradient(160deg,#FFB340,#FF7A00)', 92) +
      '<h1>3 on-time nights in a row</h1><p class="hl" style="font-size:20px;color:var(--orange)">7 bonus days added to your trial</p>' +
      '<div class="card stack" style="gap:10px;width:100%;text-align:left"><div class="row between"><span>Day 3 of 21</span><span class="fn l2">18 days left</span></div><div class="prog" style="max-width:none;height:8px;border-radius:4px"><i style="width:14%;background:var(--orange)"></i></div></div></div>' +
      foot('<a href="#/home" class="btn fill">Back to tonight</a><a href="#/premium" class="btn plain" data-k="trial_see_plans">See plans</a>'));
  });

  /* ---------- settings ---------- */
  def('settings', 'Settings', function () {
    function segCell(label, items, cur, a, k) { return cell({ cls: 'col', t: label, right: L.seg(items, cur, a, k) }); }
    return scr(L.top('home') + '<h1>Settings</h1>' +
      list([cell({ href: 'premium', k: 'settings_premium', lead: '<div class="appicon" style="width:52px;height:52px;border-radius:12px;box-shadow:none">' + ic('lantern', 28, 1.7) + '</div>', t: '<b style="font-weight:600">Lantern Premium</b>', s: 'Trial · 18 days left' }),
        cell({ href: 'trial', k: 'settings_bonus', icon: 'sparkle', color: 'orange', t: 'Bonus days earned', val: '+7' })], { ic: 1 }) +
      list([cell({ icon: 'ring', color: 'indigo', t: 'Show floating ring', right: L.sw(S.sRing, 'Show floating ring', 'sring', 'consent_ring') }),
        segCell('Size', [['S', 'Small'], ['M', 'Medium'], ['L', 'Large']], S.sSize, 'ssize', 'settings_ring_size'),
        segCell('Opacity', [[60, '60%'], [80, '80%'], [100, '100%']], S.sOp, 'sop', 'settings_ring_opacity')], { h: 'Floating ring', ic: 1 }) +
      list([segCell('Ritual theme', [['sunset', 'Sunset'], ['lamp', 'Lamp'], ['book', 'Book']], S.theme, 'theme', 'settings_theme'),
        segCell('Lights-Out reward', [['moonrise', 'Moonrise'], ['starfield', 'Starfield'], ['fireflies', 'Fireflies']], S.reward, 'reward', 'settings_reward')], { h: 'Night' }) +
      list([segCell('Repeat', [['weekdays', 'Weekdays'], ['weekend', 'Weekend'], ['custom', 'Custom']], S.schedule, 'sched', 'plan_schedule'),
        cell({ t: 'Me-Time', val: L.fmtMin(S.t - S.len) }), cell({ t: 'Final Reel', val: L.fmtMin(S.t) }), cell({ t: 'Lights out', val: L.fmtMin(S.t + 30) }),
        cell({ href: 'plan', k: 'settings_edit_times', t: 'Edit times', tc: 'var(--tint2)', chev: false })], { h: 'Plan schedule' }) +
      list([cell({ icon: 'bell', color: 'red', t: 'Mute Family Circle', right: L.sw(S.mute, 'Mute Family Circle', 'mute', 'consent_mute') }),
        cell({ icon: 'gift', color: 'green', t: 'Let my Circle gift Lantern', right: L.sw(S.gift, 'Let my Circle gift Lantern', 'gift', 'consent_gift') }),
        cell({ href: 'circle-invite', k: 'settings_add_circle', icon: 'plus', color: 'gray', t: 'Add another Circle', val: '1 of 3 used' })],
        { h: 'Circle', ic: 1, f: 'Near the end of your trial, your Circle gets one WhatsApp message asking if they would like to gift you Premium. They can stop these any time.' }) +
      list([cell({ href: 'trial-ended', k: 'settings_preview_ended', t: 'Preview: trial ended' })], { h: 'Playtest' }));
  });
  A.sring = function (v) { S.sRing = v === 'on'; };
  A.ssize = function (v) { S.sSize = v; };
  A.sop = function (v) { S.sOp = parseInt(v, 10); };
  A.reward = function (v) { S.reward = v; };
  A.sched = function (v) { S.schedule = v; };
  A.gift = function (v) { S.gift = v === 'on'; };
  def('trial-ended', 'Trial ended', function () {
    var lock = ['Floating Me-Time ring', 'Final Reel and Encore', 'Closing rituals', 'Circles'].map(function (t) { return cell({ t: '<span class="l2">' + t + '</span>', right: '<span class="l3">' + ic('lock', 17, 2.2) + '</span>' }); });
    return scr('<div class="stack" style="padding-top:22px"><h1>Your trial has ended</h1><p class="l2">Tonight\'s plan is paused. Your streak and notes are safe.</p></div>' +
      '<div class="stack" style="gap:8px"><a href="#/premium" class="btn fill" data-k="ended_see_plans">See plans · from Rs 99 a month</a>' +
      (S.asked ? '<span class="badge g" style="align-self:center">' + ic('check', 13, 2.6) + 'Your Family Circle gets one WhatsApp message</span>' : '<button class="btn glass" data-a="asked" data-k="ended_ask_circle">Ask my Circle to gift it</button>') + '</div>' +
      list([cell({ href: 'morning-unlocked', k: 'ended_message', icon: 'mail', color: 'orange', t: 'A message from Amma', s: 'Still yours to open' })], { ic: 1 }) +
      list(lock, { h: 'Paused until you subscribe' }) + L.nav('tonight'), { cls: 'tabs' });
  });
  A.asked = function () { S.asked = true; };

  /* ---------- sender pages (web, light appearance, larger type) ---------- */
  var BIG = 'font-size:19px';
  def('sender-record', 'Sender · Record', function () {
    var voice = S.smode !== 'text', rt = ['Tap to record', 'Recording 0:24 · tap to stop', 'Recorded 0:38 · tap to redo'][S.srec];
    return scr('<div class="stack c" style="gap:12px;padding-top:18px"><div class="appicon sm">' + ic('lantern', 36, 1.7) + '</div><p class="fn l2">Lantern · a message for Arjun</p><h1 class="t1">Arjun is trying to sleep on time</h1><p class="l2" style="' + BIG + '">A good-morning message from you will open when he wakes up. It takes a minute.</p></div>' +
      L.seg([['voice', 'Voice'], ['text', 'Text']], voice ? 'voice' : 'text', 'smode', 'sender_mode') +
      (voice ? '<div class="card stack c" style="gap:14px;padding:28px"><button data-a="srec" data-k="sender_record" aria-label="' + rt + '" style="width:88px;height:88px;border-radius:50%;border:4px solid var(--bg4);background:#fff;padding:6px;cursor:pointer;display:flex;align-items:center;justify-content:center">' +
        '<span style="display:block;background:var(--red);width:' + (S.srec === 1 ? '34px;height:34px;border-radius:8px' : '100%;height:100%;border-radius:50%') + ';transition:all .25s"></span></button><p class="hl" style="' + BIG + '">' + rt + '</p></div>'
        : '<div class="sec"><textarea id="smsg" class="field" rows="5" maxlength="500" data-f="smsg" aria-label="Your message" style="' + BIG + '" placeholder="Good morning, beta. Proud of you.">' + esc(S.smsg) + '</textarea><p id="scount" class="ftr" style="text-align:right">' + S.smsg.length + ' / 500</p></div>') +
      '<div class="list"><label class="cell" style="align-items:flex-start;cursor:pointer"><input type="checkbox" class="chk" data-f="consent" ' + (S.consent ? 'checked' : '') + ' style="margin-top:2px"><span class="tx"><span class="t" style="font-size:16px;line-height:1.4">Send me Lantern updates about Arjun on WhatsApp, including a gift reminder near the end of his trial. Stop any time.</span></span></label></div>' +
      foot('<a href="#/sender-sent" class="btn fill" style="' + BIG + '" data-k="sender_send">Send to Arjun</a>'), { cls: 'light' });
  });
  A.smode = function (v) { S.smode = v; };
  A.srec = function () { S.srec = (S.srec + 1) % 3; };
  def('sender-sent', 'Sender · Sent', function () {
    return scr('<div class="stack c" style="gap:14px;padding-top:40px">' + circ(ic('check', 40, 2.8), 'var(--green)') + '<h1>Sent. Thank you.</h1><p class="l2" style="' + BIG + '">Arjun will hear it the morning after an on-time night.</p></div>' +
      list([cell({ icon: 'people', color: 'indigo', t: 'Join Arjun\'s Circle', s: 'Share a bedtime goal together' }),
        cell({ href: 'sender-gift', k: 'sender_gift_card', icon: 'gift', color: 'orange', t: 'Gift Arjun a year of Premium', s: 'Pay with UPI', val: '&#8377;599' })], { ic: 1 }) +
      foot('<a href="#/gift-nudge" class="btn plain" data-k="sender_see_reminder">See the reminder you would get later</a>'), { cls: 'light' });
  });
  def('gift-nudge', 'WhatsApp gift message', function () {
    function qr(label, a, v, k, href) {
      var st = 'display:flex;align-items:center;justify-content:center;min-height:46px;width:100%;border:0;border-top:.5px solid var(--sep);background:none;color:var(--tint2);font:500 17px var(--font);cursor:pointer';
      return href ? '<a href="#/' + href + '" data-k="' + k + '" style="' + st + '">' + label + '</a>' : '<button data-a="' + a + '" data-v="' + v + '" data-k="' + k + '" style="' + st + '">' + label + '</button>';
    }
    return scr('<div class="row" style="padding:10px 0 6px;border-bottom:.5px solid var(--sep);margin:0 -16px;padding-left:16px">' + '<div class="appicon" style="width:38px;height:38px;border-radius:50%;box-shadow:none">' + ic('lantern', 20, 1.8) + '</div><div><p class="hl">Lantern</p><p class="cap l2">Business account</p></div></div>' +
      '<p class="cap l2 c">Today</p>' +
      '<div style="align-self:flex-start;max-width:320px;background:var(--bg2);border-radius:20px 20px 20px 6px;overflow:hidden;box-shadow:0 1px 1px rgba(0,0,0,.06);animation:rise .4s ease-out both"><p style="padding:13px 15px;font-size:17px;line-height:1.42">Hi Amma, Arjun has slept on time 6 of the last 7 nights. His Lantern trial ends in 3 days. Would you like to gift him Premium?</p>' +
      qr('Gift Lantern', '', '', 'nudge_gift', 'sender-gift') + qr('Not now', 'nudge', 'notnow', 'nudge_not_now') + qr('Stop gift messages', 'nudge', 'stop', 'nudge_stop_messages') + '</div>' +
      (S.reminder ? '<p style="align-self:flex-start;max-width:300px;background:var(--bg2);border-radius:20px 20px 20px 6px;padding:13px 15px;font-size:17px;animation:rise .3s ease-out both">No problem. We will remind you once more tomorrow.</p>' : '') +
      (S.stopped ? '<span class="badge g" style="align-self:center">' + ic('check', 13, 2.6) + 'Done. No more gift messages about Arjun.</span>' : ''), { cls: 'light', style: 'background:#EFEFF4' });
  });
  A.nudge = function (v) { if (v === 'stop') { S.stopped = true; S.reminder = false; } else { S.reminder = true; S.stopped = false; } };
  def('sender-gift', 'Sender · UPI gift', function () {
    if (S.gsent) {
      return scr('<div class="stack c" style="flex:1;justify-content:center;gap:14px">' + circ(ic('gift', 38, 2), 'var(--orange)') + '<h1>Gift sent</h1><p class="l2" style="' + BIG + '">Arjun gets ' + (S.gplan === 'year' ? 'a year' : 'a month') + ' of Premium. Want to add a few words?</p></div>' +
        foot('<a href="#/sender-record" class="btn fill" style="' + BIG + '" data-k="gift_record_message">Record a message for him</a>'), { cls: 'light' });
    }
    function opt(id, n, p, s) { var on = S.gplan === id; return cell({ a: 'gplan', v: id, k: 'gift_plan', attr: ' role="radio" aria-checked="' + on + '"', lead: '<span class="chk' + (on ? ' on' : '') + '">' + (on ? ic('check', 14, 3) : '') + '</span>', t: '<b style="font-weight:600;font-size:18px">' + n + '</b>', s: s, val: '<span class="hl" style="color:var(--l1);font-size:18px">' + p + '</span>' }); }
    return scr(L.top('sender-sent') + head('Gift Lantern to Arjun', 'One payment. No subscription for you.') +
      '<div class="list" role="radiogroup" aria-label="Gift">' + opt('year', 'One year', 'Rs 599', 'Best value') + opt('month', 'One month', 'Rs 99', 'Try it out') + '</div>' +
      foot('<button class="btn fill" style="' + BIG + '" data-a="gpay" data-k="gift_pay_upi" data-v="' + S.gplan + '">Pay ' + (S.gplan === 'year' ? 'Rs 599' : 'Rs 99') + ' with UPI</button><a href="#/sender-sent" class="btn plain" data-k="gift_not_now">Not now</a>'), { cls: 'light' });
  });
  A.gplan = function (v) { S.gplan = v; };
  A.gpay = function () { S.gsent = true; };
})();
