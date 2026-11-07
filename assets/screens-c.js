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
    ['clock', '5 minutes left', 'The ring turns orange. Pick your last one.'], ['moon', 'Final Reel', '11:30 pm. Finish this one, then wind down.']];
  var STEPS = [['play', 'Starts'], ['ring', 'Ring'], ['clock', '5 min'], ['moon', 'Final Reel']];
  var C = 2 * Math.PI * 21;
  def('demo', 'See it in action (reels simulation)', function () {
    var reels = ''; for (var i = 0; i < 12; i++) reels += reel(i);
    return L.scr('<div class="topbar"><button class="gbtn" data-a="goback" aria-label="Back">' + ic('back', 20, 2.4) + '</button><div class="mid"><span class="fn">See Lantern in action</span></div><span style="width:44px"></span></div>' +
      '<div class="sim" role="img" aria-label="Simulation of a reels app with the Lantern Me-Time ring">' +
      '<div class="sim-feed" id="sfeed">' + reels + '</div><div class="sim-fing" id="sfing"></div>' +
      '<div class="sim-status"><span id="sclk" class="num">10:59</span><span class="row" style="gap:4px">' + ic('battery', 16, 2) + '</span></div>' +
      '<div class="sim-ban plat glass" id="sban"><div class="appicon" style="width:30px;height:30px;border-radius:7px;box-shadow:none">' + ic('lantern', 18, 1.8) + '</div><div style="flex:1"><div class="row between"><b class="cap">Lantern</b><span class="cap l2">now</span></div><p class="fn">Your Me-Time has started. Enjoy it.</p></div></div>' +
      '<div class="sim-ring glass" id="sring"><svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="4" transform="translate(0 0) scale(1)" style="transform-origin:center;transform:scale(.95)"/><circle id="sarc" cx="23" cy="23" r="21" fill="none" stroke="#7D7AFF" stroke-width="4" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="0" transform="rotate(-90 23 23)" style="transition:stroke .4s"/>' +
      '<text id="smin" x="23" y="23" dy=".35em" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="ui-rounded,-apple-system,system-ui,sans-serif">30m</text></svg></div>' +
      '<div class="sim-warn glass" id="swarn">5 min left</div><div class="sim-dim" id="sdim"></div>' +
      '<div class="sim-final pop" id="sfin"><div class="row" style="gap:8px"><div class="appicon" style="width:24px;height:24px;border-radius:6px;box-shadow:none">' + ic('lantern', 14, 1.8) + '</div><span class="cap l2">11:30 pm</span></div><p class="hl">This is your Final Reel</p><p class="cap l2">Finish the one you\'re on. Then we\'ll close the night together.</p><span class="btn fill" style="min-height:38px;font-size:14px">I\'m done, close the night</span></div></div>' +
      '<div class="simsteps" id="ssteps">' + STEPS.map(function (s, k) { return '<div data-i="' + k + '"><span>' + ic(s[0], 18, 2.2) + '</span>' + s[1] + '</div>'; }).join('') + '</div>' +
      '<div class="stack c" style="gap:4px;min-height:62px"><p class="hl" id="scap1" style="font-size:19px"></p><p class="sub l2" id="scap2"></p></div>' +
      '<div class="row" style="justify-content:center;gap:10px"><button class="btn glass sm" id="splay" data-a="demo" data-v="toggle" data-k="demo_play_pause">Pause</button><button class="btn plain sm" data-a="demo" data-v="replay" data-k="demo_replay">Replay</button></div>' +
      '<div class="foot">' + (S.demoFrom === 'welcome' ? '<a href="#/o2" class="btn fill" data-k="demo_continue">Continue setup</a>' : '<a href="#/home" class="btn fill" data-k="demo_continue">Go to Tonight</a>') + '</div>', { cls: '' });
  }, function () {
    var t = 0, playing = true, swipes = 0, nextSwipe = 1.2, phase = -1, done = false;
    var $ = function (id) { return document.getElementById(id); };
    function setPhase(p) {
      if (p === phase) return; phase = p;
      $('scap1').textContent = PH[p][1]; $('scap2').textContent = PH[p][2];
      var st = $('ssteps').children;
      for (var k = 0; k < st.length; k++) st[k].className = k + 1 === p ? 'on' : (k + 1 < p ? 'done' : '');
    }
    function frame() {
      // timeline: 0-2s before 11:00; 2-22s = 30 minutes of Me-Time; 22s Final Reel
      var mins = Math.max(0, Math.min(30, (t - 2) / 20 * 30));
      var clk = t < 2 ? '10:59' : '11:' + (Math.floor(mins) < 10 ? '0' : '') + Math.floor(mins);
      $('sclk').textContent = clk;
      $('sban').classList.toggle('show', t >= 2 && t < 4.6);
      $('sring').classList.toggle('show', t >= 4.6 && t < 22);
      var left = Math.ceil(30 - mins), warn = left <= 5;
      $('smin').textContent = left + 'm';
      $('sarc').setAttribute('stroke-dashoffset', (C * mins / 30).toFixed(1));
      $('sarc').setAttribute('stroke', warn ? '#FF9F0A' : '#7D7AFF');
      if (warn && !$('sring').classList.contains('warn')) $('sring').classList.add('warn');
      $('swarn').classList.toggle('show', warn && t < 21);
      $('sdim').classList.toggle('show', t >= 22); $('sfin').classList.toggle('show', t >= 22);
      setPhase(t < 2 ? 0 : t < 4.6 ? 1 : !warn ? 2 : t < 22 ? 3 : 4);
      if (t < 22 && t >= nextSwipe) {
        swipes++; nextSwipe += 2.3;
        $('sfeed').style.transform = 'translateY(-' + (swipes % 12) * 100 + '%)';
        var f = $('sfing'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
      }
      if (t >= 22 && !done) { done = true; T.tap('demo_finished'); $('splay').textContent = 'Play'; playing = false; }
    }
    L._demo = function (v) {
      if (v === 'replay') { t = 0; swipes = 0; nextSwipe = 1.2; done = false; playing = true; $('sring').classList.remove('warn'); $('sfeed').style.transform = 'none'; }
      else if (done) { L._demo('replay'); return; }
      else playing = !playing;
      $('splay').textContent = playing ? 'Pause' : 'Play'; frame();
    };
    frame();
    L.every(function () { if (playing) { t += 0.1; frame(); } }, 100);
  });
  A.demofrom = function (v) { S.demoFrom = v; return false; };
  A.demo = function (v) { if (L._demo) L._demo(v); return false; };
  function def(id, title, html, mount) { L.SC[id] = { title: title, html: html, mount: mount }; }
})();
