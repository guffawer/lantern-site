/* Lantern playtest: visual explainers (pictograms, how-it-works timeline) and the reels-app simulation. */
(function () {
  'use strict';
  var L = window.L, S = L.S, A = L.A, ic = L.ic, T = window.LanternTelemetry;

  /* ---------- pictograms: what to plug in, what to flip, what to switch off ---------- */
  L.pic = function (kind, o) {
    o = o || {};
    var cls = 'pic pic-' + kind + (o.anim === false ? '' : ' a') + (o.done ? ' done' : ''), st = ' style="--s:' + (o.size || 92) + 'px"';
    if (kind === 'plug') {
      return '<div class="' + cls + '"' + st + ' aria-hidden="true"><svg viewBox="0 0 100 100"><rect x="32" y="4" width="36" height="66" rx="8" fill="#2C2C2E" stroke="rgba(255,255,255,.55)" stroke-width="2"/><rect x="36" y="10" width="28" height="52" rx="4" fill="#0B0B12"/>' +
        '<rect x="41" y="26" width="15" height="9" rx="2" fill="none" stroke="#30D158" stroke-width="1.8"/><rect class="lvl" x="43" y="28" width="6" height="5" rx="1" fill="#30D158"/><rect x="56.6" y="28.5" width="1.8" height="4" rx=".6" fill="#30D158"/>' +
        '<path class="bolt" d="M52 40l-7 10h5l-2 8 8-11h-5l3-7z" fill="#30D158"/><rect x="45" y="67" width="10" height="3" rx="1" fill="#000"/>' +
        '<g class="plg"><rect x="44" y="72" width="12" height="13" rx="2.5" fill="#E5E5EA"/><path d="M50 85v13" stroke="#E5E5EA" stroke-width="4" stroke-linecap="round"/></g></svg></div>';
    }
    if (kind === 'flip') {
      return '<div class="' + cls + '"' + st + ' aria-hidden="true"><svg class="arr" viewBox="0 0 100 100"><path d="M18 46a34 34 0 0 1 30-32" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3" stroke-linecap="round"/><path d="M42 8l7 6-7 6" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<div class="tbl"></div><div class="fl"><div class="f front"><b>11:42</b><i></i><i></i></div><div class="f back"><i></i></div></div></div>';
    }
    return '<div class="' + cls + '"' + st + ' aria-hidden="true"><div class="halo"></div><svg viewBox="0 0 100 100"><g class="rays" stroke="#FFD60A" stroke-width="3.5" stroke-linecap="round"><path d="M50 4v8M18 18l6 6M82 18l-6 6M8 48h8M84 48h8"/></g>' +
      '<path class="gl" d="M50 18a24 24 0 0 0-14 43c3 3 5 6 5 10h18c0-4 2-7 5-10a24 24 0 0 0-14-43z" fill="#FFD60A"/><rect x="41" y="74" width="18" height="6" rx="2" fill="#8E8E93"/><rect x="43" y="82" width="14" height="6" rx="2" fill="#8E8E93"/>' +
      '<path class="mn" d="M86 66a12 12 0 1 1-12-14 9 9 0 0 0 12 14z" fill="#B3B1FF"/></svg></div>';
  };
  var WIND = [['plug', 'Plug in your phone'], ['flip', 'Turn it face-down'], ['lights', 'Turn off the light']];
  /* three steps as picture tiles; status: array of true/false/undefined per step */
  L.wind3 = function (o) {
    o = o || {};
    return '<div class="wind3">' + WIND.map(function (w, i) {
      var st = o.status ? o.status[i] : undefined;
      return '<div class="wtile' + (st ? ' ok' : '') + '"><span class="wn">' + (st ? ic('check', 13, 3) : i + 1) + '</span>' + L.pic(w[0], { size: o.size || 76, anim: o.anim !== false && !st, done: !!st }) +
        '<p>' + w[1] + '</p>' + (o.status ? '<span class="cap" style="color:' + (st ? 'var(--green)' : 'var(--l2)') + '">' + (st ? 'Done' : 'Waiting') + '</span>' : '') + '</div>';
    }).join('') + '</div>';
  };

  /* ---------- how Lantern works: vertical timeline (welcome) and compact strip (home) ---------- */
  var HOW = [
    ['11:00 pm', 'play', 'indigo', 'Me-Time', 'Scroll guilt-free'],
    ['11:30 pm', 'ring', 'purple', 'Final Reel', 'Finish your last one'],
    ['11:35 pm', 'moon', 'blue', 'Wind down', 'Charge it, face-down, lights off'],
    ['7:00 am', 'mail', 'orange', 'Morning Drop', 'A message from someone you love']
  ];
  L.howV = function () {
    return '<div class="howv">' + HOW.map(function (h, i) {
      return '<div class="hrow" style="animation-delay:' + (i * 0.12) + 's"><span class="hdot" style="background:' + L.COL[h[2]] + '">' + ic(h[1], 24, 2.2) + '</span>' +
        '<div class="htx"><p class="cap l2 num">' + h[0] + '</p><p class="hl" style="font-size:18px">' + h[3] + '</p><p class="sub l2">' + h[4] + '</p>' +
        (i === 2 ? '<div class="row" style="gap:6px;margin-top:6px">' + L.pic('plug', { size: 44, anim: false, done: true }) + L.pic('flip', { size: 44, anim: false, done: true }) + L.pic('lights', { size: 44, anim: false, done: true }) + '</div>' : '') + '</div></div>';
    }).join('') + '</div>';
  };
  L.howH = function () {
    return '<div class="howh">' + HOW.map(function (h) {
      return '<div><span class="hdot sm" style="background:' + L.COL[h[2]] + '">' + ic(h[1], 18, 2.2) + '</span><p class="cap hl">' + h[3] + '</p><p class="cap l2 num">' + h[0] + '</p></div>';
    }).join('') + '</div>';
  };

  A.goback = function () { if (history.length > 1) history.back(); else L.go('home'); return false; };

  /* ---------- reels-app simulation ---------- */
  var PAL = [['#F2A65A', '#D9576B', '#5B2A86'], ['#43C6AC', '#2B5876', '#191654'], ['#FFD86F', '#FC6262', '#8E2DE2'], ['#4FACFE', '#00C9FF', '#0F2027'], ['#FA709A', '#FEE140', '#C850C0'],
    ['#30CFD0', '#5B42F3', '#330867'], ['#A18CD1', '#FBC2EB', '#6A3093'], ['#F83600', '#F9D423', '#B21F1F'], ['#11998E', '#38EF7D', '#0B3D2E'], ['#FF9A8B', '#FF6A88', '#4A00E0']];
  function reel(i) {
    var p = PAL[i % PAL.length], x = [20, 60, 35, 70, 45][i % 5], y = [25, 40, 55, 30, 45][i % 5];
    return '<div class="reel" style="background:linear-gradient(' + (150 + i * 23) + 'deg,' + p[0] + ' 0%,' + p[1] + ' 50%,' + p[2] + ' 100%)">' +
      '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:' + (i % 3 ? '50%' : '36px') + ';background:radial-gradient(circle,rgba(255,255,255,.75),rgba(255,255,255,0) 70%)"></div>' +
      '<div style="position:absolute;left:0;right:0;bottom:0;height:45%;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.5))"></div>' +
      '<div style="position:absolute;right:10px;bottom:70px;display:flex;flex-direction:column;gap:16px;color:#fff">' + ic('heart', 24, 2) + ic('chat', 24, 2) + ic('send', 24, 2) + '</div>' +
      '<div style="position:absolute;left:12px;bottom:26px;right:56px;display:flex;flex-direction:column;gap:6px"><div class="row" style="gap:6px"><span style="width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.85)"></span><span style="height:8px;width:70px;border-radius:4px;background:rgba(255,255,255,.9)"></span></div><span style="height:7px;width:100%;border-radius:4px;background:rgba(255,255,255,.55)"></span><span style="height:7px;width:60%;border-radius:4px;background:rgba(255,255,255,.55)"></span></div></div>';
  }
  var PH = [['phone', 'Just scrolling', '10:59 pm. A normal night of reels.'], ['play', 'Me-Time starts', '11:00 pm. One quiet hello. Scroll guilt-free.'], ['ring', 'Ring shows time left', 'A small ring sits on top of your app.'],
    ['clock', '5 minutes left', 'The ring turns orange. Pick your last one.'], ['moon', 'Final Reel', '11:30 pm. Finish this one, then tap I\'m done.'],
    ['sun', 'Closing ritual', 'A 6-second sunset to end the night.'], ['plug', 'Three last steps', 'Plug in your phone, turn it face-down, lights off.'],
    ['moon', 'Down for the night', 'A soft chime and glow. Your Circle sees it.'], ['mail', 'Morning Drop', '7:00 am. A message from Amma opens.']];
  var STEPS = [['play', 'Start'], ['ring', 'Ring'], ['clock', '5 min'], ['moon', 'Final Reel'], ['sun', 'Ritual'], ['plug', 'Lights out'], ['mail', 'Morning']];
  var P2S = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 5, 8: 6 };
  var C = 2 * Math.PI * 21, END = 46;
  /* timeline (seconds): 0-2 before 11:00 | 2-22 Me-Time (30 min) | 22 Final Reel | 24 tap I'm done | 24.6-30.6 ritual | 30.6 three steps | 36 down for the night | 39.5 morning | 41.5 tap open | 46 end */
  var EV = { tapDone: 24, ritual: 24.6, wind: 30.6, w1: 32, w2: 33.6, w3: 35.2, down: 36.4, morn: 39.8, tapOpen: 41.6, open: 42.1 };
  def('demo', 'See it in action (reels simulation)', function () {
    var reels = ''; for (var i = 0; i < 12; i++) reels += reel(i);
    var bars = ''; for (var j = 0; j < 22; j++) bars += '<i style="animation-delay:' + (j * 0.07).toFixed(2) + 's;height:' + [10, 18, 26, 14, 30, 20, 12, 28][j % 8] + 'px"></i>';
    return L.scr('<div class="topbar"><button class="gbtn" data-a="goback" aria-label="Back">' + ic('back', 20, 2.4) + '</button><div class="mid"><span class="fn">See Lantern in action</span></div><span style="width:44px"></span></div>' +
      '<div class="sim" role="img" aria-label="Simulation of a night with Lantern: reels app, Me-Time ring, Final Reel, closing ritual, lights out and the morning message">' +
      '<div class="sim-feed" id="sfeed">' + reels + '</div><div class="sim-fing" id="sfing"></div>' +
      '<div class="sim-ban plat glass" id="sban"><div class="appicon" style="width:30px;height:30px;border-radius:7px;box-shadow:none">' + ic('lantern', 18, 1.8) + '</div><div style="flex:1"><div class="row between"><b class="cap">Lantern</b><span class="cap l2">now</span></div><p class="fn">Your Me-Time has started. Enjoy it.</p></div></div>' +
      '<div class="sim-ring glass" id="sring"><svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="4"/><circle id="sarc" cx="23" cy="23" r="21" fill="none" stroke="#7D7AFF" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="0" transform="rotate(-90 23 23)" style="transition:stroke .4s"/>' +
      '<text id="smin" x="23" y="23" dy=".35em" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="ui-rounded,-apple-system,system-ui,sans-serif">30m</text></svg></div>' +
      '<div class="sim-warn glass" id="swarn">5 min left</div><div class="sim-dim" id="sdim"></div>' +
      '<div class="sim-final pop" id="sfin"><div class="row" style="gap:8px"><div class="appicon" style="width:24px;height:24px;border-radius:6px;box-shadow:none">' + ic('lantern', 14, 1.8) + '</div><span class="cap l2">11:30 pm</span></div><p class="hl">This is your Final Reel</p><p class="cap l2">Finish the one you\'re on. Then we\'ll close the night together.</p><span class="btn fill" id="sdone" style="min-height:38px;font-size:14px">I\'m done, close the night</span></div>' +
      /* ritual */
      '<div class="lay" id="srit"><div class="abs rsky"></div><div class="rsun"></div><div class="rground"></div><p class="rtxt">Time to close the night.</p></div>' +
      /* three steps */
      '<div class="lay" id="swind" style="background:#07061A;padding:44px 10px 12px;display:flex;flex-direction:column;gap:12px"><p class="cap l2">Lights out by 12:00 am</p><p class="hl" style="font-size:20px">Three last steps</p>' + L.wind3({ status: [false, false, false], size: 50 }) + '<div id="swbig" class="stack c" style="flex:1;justify-content:center;gap:10px"></div><p class="cap l2" id="swmsg" style="text-align:center;margin-top:auto">Do all three and you\'re down for the night.</p></div>' +
      /* down for the night */
      '<div class="lay" id="sdown" style="background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:20px"><div class="edge"></div><span style="width:84px;height:84px;border-radius:50%;background:rgba(94,92,230,.22);color:#B3B1FF;display:flex;align-items:center;justify-content:center">' + ic('moon', 40, 1.6) + '</span><p class="cap l2">11:52 pm</p><p style="font-size:22px;font-weight:700">Down for the night</p><p class="fn l2">5 of 7 on-time nights this week</p><span class="badge" style="align-self:center;margin-top:6px">' + ic('people', 13, 2.2) + 'Your Circle sees it</span></div>' +
      /* morning */
      '<div class="lay" id="smorn" style="background:linear-gradient(180deg,#2E3570 0%,#6A5486 30%,#2A1D33 65%,#000 100%);padding:46px 14px 14px;display:flex;flex-direction:column;gap:10px"><p class="cap" style="color:rgba(255,255,255,.75)">Sunday · 7:00 am</p><p style="font-size:22px;font-weight:700;line-height:1.2">Good morning, Arjun.</p>' +
      '<div class="mat" id="smcard" style="padding:16px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;margin-top:8px"><div class="mclosed" style="display:flex;flex-direction:column;align-items:center;gap:8px"><span style="width:52px;height:52px;border-radius:50%;background:#FF9F0A;color:#fff;display:flex;align-items:center;justify-content:center">' + ic('mail', 26, 2) + '</span><p class="hl">A message from Amma</p><p class="cap l2">Sealed until this morning</p><span class="btn fill" id="sopen" style="min-height:36px;font-size:14px;width:auto;padding:0 20px">Open it</span></div>' +
      '<div class="mopen" style="display:none;width:100%;flex-direction:column;gap:10px;text-align:left"><div class="row" style="gap:10px"><span class="av" style="background:#FF375F;width:32px;height:32px;font-size:13px">A</span><div><p class="hl fn">Amma</p><p class="cap l2">Voice note · 0:42</p></div></div><div class="row" style="gap:10px"><span style="width:38px;height:38px;border-radius:50%;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;flex:none">' + ic('pause', 16, 2.6) + '</span><div class="wave">' + bars + '</div></div></div></div>' +
      '<div class="mat" style="padding:12px 14px"><p class="cap l2">Last night, you wrote</p><p class="fn hl">Big day. Breathe first.</p></div></div>' +
      '<div class="sim-tap" id="stap"></div>' +
      '<div class="sim-status" id="sstat"><span id="sclk" class="num">10:59</span><span class="row" style="gap:4px">' + ic('battery', 16, 2) + '</span></div></div>' +
      '<div class="simsteps" id="ssteps">' + STEPS.map(function (s, k) { return '<div data-i="' + k + '"><span>' + ic(s[0], 16, 2.2) + '</span>' + s[1] + '</div>'; }).join('') + '</div>' +
      '<div class="stack c" style="gap:4px;min-height:62px"><p class="hl" id="scap1" style="font-size:19px"></p><p class="sub l2" id="scap2"></p></div>' +
      '<div class="row" style="justify-content:center;gap:10px"><button class="btn glass sm" id="splay" data-a="demo" data-v="toggle" data-k="demo_play_pause">Pause</button><button class="btn plain sm" data-a="demo" data-v="replay" data-k="demo_replay">Replay</button></div>' +
      '<div class="foot">' + (S.demoFrom === 'welcome' ? '<a href="#/o2" class="btn fill" data-k="demo_continue">Continue setup</a>' : '<a href="#/home" class="btn fill" data-k="demo_continue">Go to Tonight</a>') + '</div>', { cls: '' });
  }, function () {
    var t = 0, playing = true, swipes = 0, nextSwipe = 1.2, phase = -1, fired = {};
    var $ = function (id) { return document.getElementById(id); };
    function tog(id, on) { $(id).classList.toggle('show', on); }
    function tap(x, y) { var f = $('stap'); f.style.left = x; f.style.top = y; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
    function once(k, fn) { if (t >= EV[k] && !fired[k]) { fired[k] = 1; fn(); } }
    function setPhase(p) {
      if (p === phase) return; phase = p;
      $('scap1').textContent = PH[p][1]; $('scap2').textContent = PH[p][2];
      var st = $('ssteps').children, cur = P2S[p];
      for (var k = 0; k < st.length; k++) st[k].className = cur === k ? 'on' : (cur > k ? 'done' : '');
    }
    function big(i, done) {
      var w = [['plug', 'Plug in your phone'], ['flip', 'Turn it face-down'], ['lights', 'Turn off the light']][i];
      $('swbig').innerHTML = L.pic(w[0], { size: 120, anim: !done, done: !!done }) + '<p class="hl" style="font-size:17px">' + w[1] + '</p>';
    }
    function tick(i) {
      var tl = $('swind').querySelectorAll('.wtile')[i], pic = tl.querySelector('.pic'), lab = tl.querySelector('.cap');
      tl.classList.remove('cur'); tl.classList.add('ok'); pic.classList.remove('a'); pic.classList.add('done');
      tl.querySelector('.wn').innerHTML = ic('check', 13, 3); lab.textContent = 'Done'; lab.style.color = 'var(--green)';
      var nx = $('swind').querySelectorAll('.wtile')[i + 1]; if (nx) { nx.classList.add('cur'); big(i + 1); } else big(i, true);
    }
    function reset() {
      fired = {}; t = 0; swipes = 0; nextSwipe = 1.2; phase = -1;
      $('sring').classList.remove('warn'); $('sfeed').style.transform = 'none'; $('sdone').classList.remove('pressed');
      $('srit').classList.remove('run'); $('smcard').classList.remove('opened'); big(0); $('swmsg').textContent = 'Do all three and you\'re down for the night.';
      $('swind').querySelectorAll('.wtile').forEach(function (tl, i) {
        var pic = tl.querySelector('.pic'), lab = tl.querySelector('.cap');
        tl.classList.remove('ok'); tl.classList.toggle('cur', i === 0); pic.classList.add('a'); pic.classList.remove('done');
        tl.querySelector('.wn').textContent = i + 1; lab.textContent = 'Waiting'; lab.style.color = 'var(--l2)';
      });
    }
    function frame() {
      var mins = Math.max(0, Math.min(30, (t - 2) / 20 * 30));
      var clk = t < 2 ? '10:59' : t < EV.ritual ? '11:' + (Math.floor(mins) < 10 ? '0' : '') + Math.floor(mins) : t < EV.wind ? '11:31' : t < EV.down ? '11:37' : t < EV.morn ? '11:52' : '7:00';
      $('sclk').textContent = clk;
      tog('sban', t >= 2 && t < 4.6);
      tog('sring', t >= 4.6 && t < 22);
      var left = Math.ceil(30 - mins), warn = left <= 5;
      $('smin').textContent = left + 'm';
      $('sarc').setAttribute('stroke-dashoffset', (C * mins / 30).toFixed(1));
      $('sarc').setAttribute('stroke', warn ? '#FF9F0A' : '#7D7AFF');
      if (warn && !$('sring').classList.contains('warn')) $('sring').classList.add('warn');
      tog('swarn', warn && t < 21);
      tog('sdim', t >= 22 && t < EV.ritual); tog('sfin', t >= 22 && t < EV.ritual);
      tog('srit', t >= EV.ritual && t < EV.wind + 0.4); tog('swind', t >= EV.wind && t < EV.down + 0.4);
      tog('sdown', t >= EV.down && t < EV.morn + 0.4); tog('smorn', t >= EV.morn);
      once('tapDone', function () { tap('50%', '88%'); setTimeout(function () { var d = $('sdone'); if (d) d.classList.add('pressed'); }, 250); });
      once('ritual', function () { var r = $('srit'); r.classList.remove('run'); void r.offsetWidth; r.classList.add('run'); });
      once('w1', function () { tick(0); }); once('w2', function () { tick(1); }); once('w3', function () { tick(2); $('swmsg').textContent = 'All done. Sleep well.'; });
      once('tapOpen', function () { tap('50%', '50%'); });
      once('open', function () { $('smcard').classList.add('opened'); });
      setPhase(t < 2 ? 0 : t < 4.6 ? 1 : !warn ? 2 : t < 22 ? 3 : t < EV.ritual ? 4 : t < EV.wind ? 5 : t < EV.down ? 6 : t < EV.morn ? 7 : 8);
      if (t < 22 && t >= nextSwipe) {
        swipes++; nextSwipe += 2.3;
        $('sfeed').style.transform = 'translateY(-' + (swipes % 12) * 100 + '%)';
        var f = $('sfing'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
      }
      if (t >= END && !fired.end) { fired.end = 1; T.tap('demo_finished'); $('splay').textContent = 'Play'; playing = false; }
    }
    L._demo = function (v) {
      if (v === 'replay' || (v === 'toggle' && fired.end)) { reset(); playing = true; }
      else playing = !playing;
      $('splay').textContent = playing ? 'Pause' : 'Play'; frame();
    };
    reset(); frame();
    L.every(function () { if (playing) { t += 0.1; frame(); } }, 100);
  });
  A.demofrom = function (v) { S.demoFrom = v; return false; };
  A.demo = function (v) { if (L._demo) L._demo(v); return false; };
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }
})();
