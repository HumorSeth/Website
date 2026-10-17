/* The Quiet Atlas — 共享脚本：年份 / 开场 / 导航 / 动效 / 转场 */
(function () {
  'use strict';
  var d = document, w = window;
  var reduced = !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function qs(s, c) { return (c || d).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

    /* 0. 图标描线初始化（pathLength 归一化 + 笔头克隆）——原样保留用户动画逻辑 */
  function initLogo(svg) {
    qsa('.stage', svg).forEach(function (stage) {
      qsa('.draw', stage).forEach(function (line, index) {
        var delay = (index * 0.105).toFixed(3) + 's';
        line.setAttribute('pathLength', '1');
        line.style.setProperty('--line-delay', delay);
        var head = line.cloneNode(false);
        head.setAttribute('class', 'trace-head');
        head.setAttribute('pathLength', '1');
        head.style.setProperty('--line-delay', delay);
        line.insertAdjacentElement('afterend', head);
      });
    });
  }
  qsa('.logo-horizon').forEach(initLogo);

/* 1. 动态版权年份 */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* 2. 品牌开场（每会话一次） */
  var intro = qs('#intro');
  if (intro) {
    var seen = false, brandTimer = null;
    var forced = /[?&]intro=1/.test(w.location.search);
    try { seen = sessionStorage.getItem('sv-intro-done') === '1' && !forced; } catch (e) {}
    function finishIntro() {
      if (intro.dataset.done) return;
      intro.dataset.done = '1';
      intro.classList.add('is-exit');
      var html = d.documentElement;
      html.classList.add('is-intro-done');
      html.classList.remove('intro-lock');
      try { sessionStorage.setItem('sv-intro-done', '1'); } catch (e) {}
      setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 900);
    }
    function showBrand() {
      if (intro.dataset.brand || intro.dataset.done) return;
      intro.dataset.brand = '1';
      intro.classList.add('is-brand');
      brandTimer = setTimeout(finishIntro, 1600);
    }
    if (reduced || seen) {
      d.documentElement.classList.add('is-intro-done');
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    } else {
      d.documentElement.classList.add('intro-lock');
      // 以最后一条线条的实际绘制完成事件驱动站点名称淡入，避免固定延时猜测完成时间
      var draws = qsa('.intro .draw', intro);
      var totalDraws = draws.length;
      var drawn = 0;
      function onDrawEnd() {
        drawn += 1;
        if (drawn >= totalDraws) showBrand();
      }
      if (totalDraws > 0) {
        draws.forEach(function (line) { line.addEventListener('animationend', onDrawEnd); });
      } else {
        showBrand();
      }
      // 兜底：若动画事件异常未触发，确保开场仍能收尾（远晚于正常完成，不会提前）
      var fallback = setTimeout(showBrand, 12000);
      intro.addEventListener('click', function () {
        clearTimeout(fallback);
        if (brandTimer) clearTimeout(brandTimer);
        finishIntro();
      });
    }
  } else {
    d.documentElement.classList.add('is-intro-done');
  }

  /* 3. 顶栏滚动状态 */
  var header = qs('.site-nav');
  function onScroll() { if (header) { header.classList.toggle('is-scrolled', w.scrollY > 24); header.classList.toggle('logo-hidden', w.scrollY > 8); } }
  w.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 4. 移动端菜单 */
  var toggle = qs('.nav-toggle');
  var menu = qs('.nav-menu');
  if (toggle && menu) {
    function setMenu(open) {
      d.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) {
        var first = qs('.nav-menu nav a');
        if (first) first.focus();
      } else {
        toggle.focus();
      }
    }
    toggle.addEventListener('click', function () {
      setMenu(!d.body.classList.contains('menu-open'));
    });
    qsa('.nav-menu nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.body.classList.contains('menu-open')) setMenu(false);
    });
  }

  /* 5. 滚动显现 */
  if ('IntersectionObserver' in w && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    d.documentElement.classList.add('js-io');
    qsa('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    qsa('[data-reveal]').forEach(function (el) { el.classList.add('in-view'); });
  }

  /* 6. 轻量视差 */
  var pxItems = qsa('[data-parallax]');
  var ticking = false;
  function updateParallax() {
    ticking = false;
    for (var i = 0; i < pxItems.length; i++) {
      var el = pxItems[i];
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > w.innerHeight) continue;
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
      var p = (rect.top + rect.height / 2 - w.innerHeight / 2) / w.innerHeight;
      el.style.transform = 'translate3d(0,' + (p * speed * -100).toFixed(2) + 'px,0)';
    }
  }
  if (!reduced && w.innerWidth >= 900 && pxItems.length) {
    w.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; w.requestAnimationFrame(updateParallax); }
    }, { passive: true });
    updateParallax();
  }

  /* 7. 数字滚动 */
  var counts = qsa('[data-count]');
  if (counts.length && !reduced && 'IntersectionObserver' in w) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var target = parseFloat(en.target.getAttribute('data-count')) || 0;
        var start = null, dur = 1500;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          en.target.textContent = String(Math.round(target * eased * 10) / 10);
          if (p < 1) w.requestAnimationFrame(step);
        }
        w.requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counts.forEach(function (el) { cio.observe(el); });
  }

  /* 8. 页面切换过渡（多页结构 + 原生前进后退） */
  qsa('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('http') === 0 || href.indexOf('//') === 0) return;
    if (a.getAttribute('target') === '_blank' || a.hasAttribute('download')) return;
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      if (reduced) { w.location.href = href; return; }
      d.documentElement.classList.add('is-leaving');
      setTimeout(function () { w.location.href = href; }, 360);
    });
  });
  w.addEventListener('pageshow', function () {
    d.documentElement.classList.remove('is-leaving');
  });

  /* 9. 图片加载失败降级 */
  d.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.failed && !t.classList.contains('lb-img') && t.getAttribute('src')) {
      t.dataset.failed = '1';
      var box = d.createElement('div');
      box.className = 'img-fallback';
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', t.getAttribute('alt') || '图片暂不可用');
      var label = d.createElement('span');
      label.textContent = 'IMAGE UNAVAILABLE';
      box.appendChild(label);
      if (t.parentNode) t.parentNode.replaceChild(box, t);
    }
  }, true);

  /* 10. 导航小图标：自动循环描线；页脚小图标：悬停描线一次，播完即停 */
  if (!reduced) {
    // 导航 logo：循环描线（draw-line 完整序列播完 → 短暂停留 → 重新描线）
    qsa('.nav-logo .logo-replay').forEach(function (svg) {
      function loop() {
        svg.classList.remove('playing');
        void svg.getBoundingClientRect();
        svg.classList.add('playing');
        setTimeout(loop, 9800);
      }
      loop();
    });
    // 页脚 logo：悬停描线一次，播完即停（保持不变）
    qsa('.footer-logo .logo-replay').forEach(function (svg) {
      var rt = null;
      function replay() {
        svg.classList.remove('playing');
        void svg.getBoundingClientRect();
        svg.classList.add('playing');
        if (rt) clearTimeout(rt);
        rt = setTimeout(function () { svg.classList.remove('playing'); }, 9800);
      }
      svg.addEventListener('mouseenter', replay);
    });
  }

  w.__svMainOk = true;
})();
