<!-- js/include.js -->
<script>
(async function () {
  // 部品HTMLを読み込んで差し込む（data-include="partials/header.html" など）
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
      }
    }
  }

  // ナビの開閉（☰）
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

  // 現在ページ（パス）に一致するリンクに active を付ける
  function highlightActive() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    const here = location.pathname.split('/').pop() || 'index.html';
    for (const a of nav.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (href === here) a.classList.add('active');
    }
  }

  // 実行順：差し込み → 初期化 → active付与
  await injectIncludes();
  initMenu();
  highlightActive();
})();
</script>
