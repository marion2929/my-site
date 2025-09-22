// js/include.js（<script> タグは不要！）
(async function () {
  // data-include="partials/header.html" の要素に読み込む
  async function injectIncludes() {
    const targets = document.querySelectorAll('[data-include]');
    for (const el of targets) {
      const url = el.getAttribute('data-include');
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        const html = await res.text();
        el.innerHTML = html;
      } catch (e) {
        console.warn('include failed:', url, e);
        // 目に見える簡易メッセージ（デバッグ用、不要なら消してOK）
        el.innerHTML = '<div style="padding:8px;background:#fee;border:1px solid #fbb;color:#900;">ヘッダー読込に失敗しました: ' + url + '</div>';
      }
    }
  }

  // ☰ メニュー開閉
  function initMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('siteNav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 現在ページに active を付ける
  function highlightActive() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    const here = location.pathname.split('/').pop() || 'index.html';
    for (const a of nav.querySelectorAll('a[href]')) {
      if (a.getAttribute('href') === here) a.classList.add('active');
    }
  }

  await injectIncludes();
  initMenu();
  highlightActive();
})();
