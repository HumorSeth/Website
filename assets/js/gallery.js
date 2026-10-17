/* SETH — 画廊灯箱：打开 / 关闭 / 前后切换 / 键盘 / 触摸滑动 */
(function () {
  'use strict';
  var d = document, w = window;
  var items = Array.prototype.slice.call(d.querySelectorAll('.g-item'));
  var lb = d.getElementById('lightbox');
  if (!items.length || !lb) return;

  var lbImg = d.querySelector('.lb-img');
  var lbCap = d.querySelector('.lb-cap');
  var lbCount = d.querySelector('.lb-count');
  var lbClose = d.querySelector('.lb-close');
  var lbPrev = d.querySelector('.lb-prev');
  var lbNext = d.querySelector('.lb-next');
  var current = -1;
  var lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var item = items[current];
    var img = item.querySelector('img');
    var full = img.getAttribute('data-full') || img.currentSrc || img.src;
    var alt = img.getAttribute('alt') || '';
    var cap = item.getAttribute('data-caption') || '';
    lbImg.setAttribute('alt', alt);
    lbImg.setAttribute('src', full);
    lbImg.classList.add('is-loading');
    lbCap.textContent = cap;
    lbCount.textContent = (current + 1) + ' / ' + items.length;
  }
  function open(i) {
    lastFocus = d.activeElement;
    lb.classList.add('is-open');
    d.body.classList.add('no-scroll');
    lb.setAttribute('aria-hidden', 'false');
    show(i);
    if (lbClose) lbClose.focus();
  }
  function close() {
    lb.classList.remove('is-open');
    d.body.classList.remove('no-scroll');
    lb.setAttribute('aria-hidden', 'true');
    if (lbImg) { lbImg.removeAttribute('src'); lbImg.classList.remove('is-loading'); }
    if (lastFocus) lastFocus.focus();
  }
  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });
  if (lbImg) lbImg.addEventListener('load', function () { lbImg.classList.remove('is-loading'); });
  if (lbClose) lbClose.addEventListener('click', close);
  if (lbPrev) lbPrev.addEventListener('click', prev);
  if (lbNext) lbNext.addEventListener('click', next);

  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb-inner')) close();
  });

  d.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowRight') { next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
    else if (e.key === 'Tab') {
      var focusables = [lbClose, lbPrev, lbNext].filter(Boolean);
      if (!focusables.length) return;
      var first = focusables[0], lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && d.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  });

  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 48) { if (dx < 0) next(); else prev(); }
    sx = null;
  }, { passive: true });

  w.__svGalleryOk = true;
})();
