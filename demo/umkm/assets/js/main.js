/* Landing Page UMKM — AsetKode
   Logika halaman. Anda tidak perlu mengedit file ini; semua data ada di config.js */
(function () {
  'use strict';
  const C = window.CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rupiah = (n) => `${C.mataUang || 'Rp'} ${Number(n).toLocaleString('id-ID')}`;

  const ICONS = {
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5-6"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.2.3 1.6 1.2 2.7 2.5 2.7z"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.2-.6l-3.5-4.4a1 1 0 0 0-.8-.4H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r=".5"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
  };

  /* ---------- Warna & teks dasar ---------- */
  if (C.warnaUtama) {
    document.documentElement.style.setProperty('--primary', C.warnaUtama);
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = C.warnaUtama;
  }
  if (C.namaUsaha) document.title = `${C.namaUsaha} — ${C.tagline || ''}`;
  $$('[data-bind]').forEach((el) => { const v = C[el.dataset.bind]; if (v !== undefined && v !== '') el.textContent = v; });
  $('#year').textContent = new Date().getFullYear();

  /* ---------- WhatsApp ---------- */
  const waLink = (extra = '') => {
    const base = (C.pesanWhatsapp || 'Halo {nama},').replace('{nama}', C.namaUsaha || '');
    return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(extra ? `${base}\n${extra}` : base)}`;
  };
  const bindWa = (root = document) => $$('.js-wa', root).forEach((a) => {
    a.href = waLink(a.dataset.waMsg || ''); a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Statistik (animasi hitung) ---------- */
  const stats = $('#stats');
  (C.statistik || []).forEach((s) => {
    const d = document.createElement('div'); d.className = 'stat';
    d.innerHTML = `<strong data-target="${Number(s.angka)}" data-suffix="${esc(s.akhiran)}">0</strong><span>${esc(s.label)}</span>`;
    stats.appendChild(d);
  });
  const countUp = (el) => {
    const target = parseFloat(el.dataset.target), dec = target % 1 ? 1 : 0, t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1), v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + el.dataset.suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Keunggulan ---------- */
  $('#featureGrid').innerHTML = (C.keunggulan || []).map((f) => `
    <div class="feature reveal">
      <div class="feature-ico"><svg viewBox="0 0 24 24">${ICONS[f.ikon] || ICONS.star}</svg></div>
      <h3>${esc(f.judul)}</h3><p>${esc(f.teks)}</p>
    </div>`).join('');

  /* ---------- Menu + filter ---------- */
  const menu = C.menu || [];
  const cats = ['Semua', ...new Set(menu.map((m) => m.kategori).filter(Boolean))];
  const filters = $('#filters'), grid = $('#menuGrid');
  filters.innerHTML = cats.map((c, i) => `<button class="filter-btn${i ? '' : ' active'}" role="tab" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  const renderMenu = (cat) => {
    const list = cat === 'Semua' ? menu : menu.filter((m) => m.kategori === cat);
    grid.innerHTML = list.map((m) => `
      <article class="menu-card">
        <div class="menu-img">
          <img src="${esc(m.gambar)}" alt="${esc(m.nama)}" loading="lazy">
          ${m.label ? `<span class="badge">${esc(m.label)}</span>` : ''}
        </div>
        <div class="menu-body">
          <h3>${esc(m.nama)}</h3>
          <p>${esc(m.deskripsi)}</p>
          <div class="menu-foot">
            <span class="price">${rupiah(m.harga)}</span>
            <a href="#" class="btn btn-primary btn-sm js-wa" data-wa-msg="${esc(`1x ${m.nama} (${rupiah(m.harga)})`)}">Pesan</a>
          </div>
        </div>
      </article>`).join('');
    bindWa(grid);
  };
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('.filter-btn'); if (!b) return;
    $$('.filter-btn', filters).forEach((x) => x.classList.toggle('active', x === b));
    renderMenu(b.dataset.cat);
  });
  renderMenu('Semua');

  /* ---------- Testimoni ---------- */
  $('#testiGrid').innerHTML = (C.testimoni || []).map((t) => `
    <figure class="testi reveal">
      <span class="stars">${'★'.repeat(t.bintang || 5)}</span>
      <blockquote>"${esc(t.teks)}"</blockquote>
      <figcaption class="testi-person">
        <span class="avatar">${esc((t.nama || '?').charAt(0))}</span>
        <div><strong>${esc(t.nama)}</strong><small>${esc(t.peran)}</small></div>
      </figcaption>
    </figure>`).join('');

  /* ---------- FAQ ---------- */
  const faq = $('#faqList');
  faq.innerHTML = (C.faq || []).map((f, i) => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-${i}">${esc(f.tanya)}
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
      <div class="faq-a" id="faq-${i}"><div><p>${esc(f.jawab)}</p></div></div>
    </div>`).join('');
  faq.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement, open = !item.classList.contains('open');
    $$('.faq-item', faq).forEach((x) => { x.classList.remove('open'); $('.faq-q', x).setAttribute('aria-expanded', 'false'); });
    if (open) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
  });

  /* ---------- Kontak ---------- */
  const email = $('#emailLink'); email.textContent = C.email || ''; email.href = `mailto:${C.email || ''}`;
  if (C.mapsEmbed) $('#mapFrame').src = C.mapsEmbed;
  const soc = [];
  if (C.instagram) soc.push(`<a href="https://instagram.com/${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  if (C.tiktok) soc.push(`<a href="https://tiktok.com/@${esc(C.tiktok)}" target="_blank" rel="noopener">TikTok</a>`);
  soc.push(`<a href="#" class="js-wa">WhatsApp</a>`);
  $('#socials').innerHTML = soc.join('');
  bindWa();

  /* ---------- Navbar, menu mobile, tema ---------- */
  const nav = $('#navbar'), links = $('#navLinks'), toggle = $('#menuToggle');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach((a) => a.addEventListener('click', () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));

  const root = document.documentElement;
  const saved = localStorage.getItem('lp-theme');
  if (saved) root.dataset.theme = saved;
  else if (matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
  $('#themeToggle').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('lp-theme', root.dataset.theme);
  });

  /* ---------- Animasi saat scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('visible');
    io.unobserve(en.target);
  }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));
  const so = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { $$('[data-target]', en.target).forEach(countUp); so.disconnect(); }
  }));
  so.observe(stats);
})();

