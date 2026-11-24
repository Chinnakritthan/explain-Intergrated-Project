// ==========================================================
// ITB-CSV Explained — shared site script (no framework)
// - injects top bar, footer, TOC, pager
// - turns <script type="text/x-code"> into highlighted code blocks
// - tabs, steppers, copy buttons, mermaid diagrams
// ==========================================================

const PAGES = [
  { id: 'home', href: 'index.html', label: '🏠 ภาพรวม' },
  { id: 'sprint1', href: 'sprint1.html', label: 'Sprint 1' },
  { id: 'sprint2', href: 'sprint2.html', label: 'Sprint 2' },
  { id: 'sprint3', href: 'sprint3.html', label: 'Sprint 3' },
  { sep: true },
  { id: 'frontend', href: 'frontend.html', label: '🎨 Frontend' },
  { id: 'backend', href: 'backend.html', label: '⚙️ Backend' },
  { id: 'database', href: 'database.html', label: '🗄️ Database' },
  { id: 'devops', href: 'devops.html', label: '🚀 Deploy & CI' },
  { id: 'filemap', href: 'filemap.html', label: '🗺️ File Map' },
];

const page = document.body.dataset.page || 'home';

// ---------- top bar ----------
function buildTopbar() {
  const bar = document.createElement('header');
  bar.className = 'topbar';
  const links = PAGES.map(p => p.sep
    ? '<span class="sep"></span>'
    : `<a href="${p.href}" class="${p.id === page ? 'active' : ''}">${p.label}</a>`).join('');
  bar.innerHTML = `
    <a class="brand" href="index.html">
      <span class="logo">⚡</span>
      <span>ITB-CSV Explained<small>INT504 · Team zap (Group 43)</small></span>
    </a>
    <button class="menu-btn" aria-label="เมนู">☰</button>
    <nav class="nav">${links}</nav>`;
  document.body.prepend(bar);
  bar.querySelector('.menu-btn').addEventListener('click', () => bar.querySelector('.nav').classList.toggle('open'));
}

// ---------- footer + pager ----------
function buildFooter() {
  const main = document.querySelector('main');
  const real = PAGES.filter(p => !p.sep);
  const idx = real.findIndex(p => p.id === page);
  if (main && idx >= 0) {
    const prev = real[idx - 1];
    const next = real[idx + 1];
    const pager = document.createElement('div');
    pager.className = 'pager';
    pager.innerHTML = `
      ${prev ? `<a href="${prev.href}"><small>← ก่อนหน้า</small>${prev.label}</a>` : '<span></span>'}
      ${next ? `<a class="next" href="${next.href}"><small>ถัดไป →</small>${next.label}</a>` : '<span></span>'}`;
    main.appendChild(pager);
  }
  const f = document.createElement('footer');
  f.innerHTML = `เว็บอธิบายโค้ดโปรเจกต์ <b>IT-Bangmod Class Schedule Viewing System (itb-csv)</b> · INT504 Integrated Project 2026 · Team zap (Group 43)<br>
  ทำเพื่อการเรียนรู้ภายในทีม — โค้ดตัวอย่างในเว็บนี้ตัดมาจาก <code>int504-2026-project-group-43</code>`;
  document.body.appendChild(f);
}

// ---------- code blocks ----------
function dedent(text) {
  const lines = text.replace(/\t/g, '    ').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map(l => l.slice(min)).join('\n');
}

function buildCodeBlocks() {
  document.querySelectorAll('script[type="text/x-code"]').forEach(s => {
    const lang = s.dataset.lang || 'javascript';
    const path = s.dataset.path || '';
    const note = s.dataset.note || '';
    const code = dedent(s.textContent).replace(/<\\\/script>/g, '</script>');
    const wrap = document.createElement('div');
    wrap.className = 'code';
    const head = document.createElement('div');
    head.className = 'code-head';
    head.innerHTML = `<span>${langIcon(lang)}</span><span class="path"></span><span class="muted"></span><button class="copy" type="button">คัดลอก</button>`;
    head.querySelector('.path').textContent = path || lang;
    head.querySelector('.muted').textContent = note;
    const pre = document.createElement('pre');
    const c = document.createElement('code');
    const hl = ({ prisma: 'graphql', html: 'xml' })[lang] || lang;
    c.className = `language-${hl}`;
    c.textContent = code;
    pre.appendChild(c);
    wrap.append(head, pre);
    head.querySelector('.copy').addEventListener('click', async (e) => {
      try { await navigator.clipboard.writeText(code); e.target.textContent = 'คัดลอกแล้ว ✓'; }
      catch { e.target.textContent = 'คัดลอกไม่ได้'; }
      setTimeout(() => (e.target.textContent = 'คัดลอก'), 1400);
    });
    s.replaceWith(wrap);
  });
  if (window.hljs) document.querySelectorAll('.code pre code').forEach(el => window.hljs.highlightElement(el));
}

function langIcon(lang) {
  return ({ javascript: '🟨 JS', js: '🟨 JS', html: '🟧 HTML', css: '🟦 CSS', sql: '🛢️ SQL', bash: '💻 Shell', json: '🔣 JSON', yaml: '⚙️ YAML', prisma: '🔷 Prisma', nginx: '🌐 Nginx', dockerfile: '🐳 Docker', plaintext: '📝' })[lang] || lang;
}

// ---------- tabs ----------
function buildTabs() {
  document.querySelectorAll('.tabs').forEach(tabs => {
    const panels = [...tabs.querySelectorAll(':scope > .tab-panel')];
    const bar = document.createElement('div');
    bar.className = 'tab-bar';
    panels.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p.dataset.label || `Tab ${i + 1}`;
      b.addEventListener('click', () => {
        panels.forEach(x => x.classList.remove('active'));
        bar.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        b.classList.add('active');
      });
      bar.appendChild(b);
      if (i === 0) { p.classList.add('active'); b.classList.add('active'); }
    });
    tabs.prepend(bar);
  });
}

// ---------- steppers ----------
function buildSteppers() {
  document.querySelectorAll('.stepper').forEach(st => {
    const steps = [...st.querySelectorAll(':scope > .step')];
    const body = document.createElement('div');
    body.className = 's-body';
    steps.forEach(s => body.appendChild(s));
    const head = document.createElement('div');
    head.className = 's-head';
    head.innerHTML = `<span class="s-title"></span><span class="s-ctrl"><button type="button" data-d="-1">◀ ก่อนหน้า</button><span class="s-count muted small"></span><button type="button" data-d="1">ถัดไป ▶</button></span>`;
    head.querySelector('.s-title').textContent = st.dataset.title || 'ขั้นตอน';
    const track = document.createElement('div');
    track.className = 's-track';
    steps.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 's-dot';
      d.title = `ขั้นที่ ${i + 1}`;
      d.addEventListener('click', () => go(i));
      track.appendChild(d);
    });
    st.append(head, track, body);
    let cur = 0;
    function go(i) {
      cur = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach((s, k) => s.classList.toggle('active', k === cur));
      track.querySelectorAll('.s-dot').forEach((d, k) => d.classList.toggle('done', k <= cur));
      head.querySelector('.s-count').textContent = `${cur + 1} / ${steps.length}`;
    }
    head.querySelectorAll('button').forEach(b => b.addEventListener('click', () => go(cur + Number(b.dataset.d))));
    go(0);
  });
}

// ---------- TOC ----------
function slug(t, i) {
  const s = t.toLowerCase().replace(/[^\w\u0E00-\u0E7F]+/g, '-').replace(/^-|-$/g, '');
  return s ? `${s}` : `sec-${i}`;
}
function buildToc() {
  const toc = document.querySelector('.toc');
  const main = document.querySelector('main');
  if (!toc || !main) return;
  const heads = [...main.querySelectorAll('h2, h3')].filter(h => !h.closest('.card, .tabs, .stepper, .widget'));
  const used = new Set();
  toc.innerHTML = '<h4>ในหน้านี้</h4>';
  heads.forEach((h, i) => {
    if (!h.id) {
      let id = slug(h.textContent, i);
      while (used.has(id) || document.getElementById(id)) id += '-' + i;
      h.id = id;
    }
    used.add(h.id);
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = h.tagName === 'H3' ? 'lvl3' : '';
    toc.appendChild(a);
  });
  const links = [...toc.querySelectorAll('a')];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  heads.forEach(h => obs.observe(h));
}

// ---------- mermaid ----------
async function buildMermaid() {
  if (!document.querySelector('.mermaid')) return;
  try {
    const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'IBM Plex Sans Thai, sans-serif',
      themeVariables: { primaryColor: '#1b2547', primaryBorderColor: '#7c9cff', lineColor: '#9aa3c7', primaryTextColor: '#e6e9f5' },
    });
    await mermaid.run({ querySelector: '.mermaid' });
  } catch (err) {
    console.warn('mermaid failed', err);
  }
}

buildTopbar();
buildCodeBlocks();
buildTabs();
buildSteppers();
buildToc();
buildFooter();
buildMermaid();
