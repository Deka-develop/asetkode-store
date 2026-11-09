/* =========================================================
   LOGIKA BIO LINK & MINI PORTFOLIO — ASETKODE
   Semua data dinamis diambil otomatis dari config.js
   ========================================================= */

(function () {
  'use strict';
  const C = window.CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- SVG ICONS DICTIONARY ---------- */
  const ICONS = {
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
  };

  /* ---------- BIND DATA PROFIL ---------- */
  if (C.warnaAksen) {
    document.documentElement.style.setProperty('--primary', C.warnaAksen);
  }

  $('#headerHandle').textContent = C.handle || '';
  $('#profileName').textContent = C.nama || '';
  $('#profileTitle').textContent = C.profesi || '';
  $('#profileBio').textContent = C.bio || '';
  $('#footerName').textContent = C.nama || '';
  $('#currentYear').textContent = new Date().getFullYear();

  if (C.nama) {
    document.title = `${C.nama} — ${C.profesi || 'Bio Link'}`;
  }

  if (C.avatar) {
    $('#profileAvatar').src = C.avatar;
  }

  // Status Badge
  const statusEl = $('#statusBadge');
  if (C.statusTersedia) {
    $('#statusText').textContent = C.teksStatus || 'Tersedia untuk proyek';
  } else {
    statusEl?.remove();
  }

  /* ---------- RENDER SOCIAL ICONS ---------- */
  const socialBar = $('#socialBar');
  const soc = C.sosial || {};
  const socLinks = [];

  const addSoc = (key, iconKey, title) => {
    if (soc[key]) {
      const href = key === 'email' ? `mailto:${soc[key]}` : soc[key];
      socLinks.push(`
        <a href="${esc(href)}" target="_blank" rel="noopener" class="social-link" title="${esc(title)}" aria-label="${esc(title)}">
          <svg viewBox="0 0 24 24">${ICONS[iconKey] || ICONS.globe}</svg>
        </a>
      `);
    }
  };

  addSoc('github', 'github', 'GitHub');
  addSoc('linkedin', 'linkedin', 'LinkedIn');
  addSoc('instagram', 'instagram', 'Instagram');
  addSoc('tiktok', 'tiktok', 'TikTok');
  addSoc('youtube', 'youtube', 'YouTube');
  addSoc('twitter', 'twitter', 'Twitter / X');
  addSoc('whatsapp', 'whatsapp', 'WhatsApp');
  addSoc('email', 'mail', 'Email');

  socialBar.innerHTML = socLinks.join('');

  /* ---------- RENDER MAIN LINKS ---------- */
  const linksList = $('#linksList');
  const links = C.links || [];
  linksList.innerHTML = links.map((link) => {
    const isAnchor = (link.url || '').startsWith('#');
    const target = isAnchor ? '' : 'target="_blank" rel="noopener"';
    return `
      <a href="${esc(link.url)}" ${target} class="link-card${link.highlight ? ' highlight' : ''}">
        <div class="link-icon-wrap">
          <svg viewBox="0 0 24 24">${ICONS[link.ikon] || ICONS.globe}</svg>
        </div>
        <div class="link-body">
          <div class="link-title-row">
            <span class="link-title">${esc(link.judul)}</span>
            ${link.badge ? `<span class="link-badge">${esc(link.badge)}</span>` : ''}
          </div>
          ${link.deskripsi ? `<p class="link-desc">${esc(link.deskripsi)}</p>` : ''}
        </div>
        <div class="link-arrow">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </a>
    `;
  }).join('');

  /* ---------- RENDER PORTFOLIO PROJECTS ---------- */
  const portfolioGrid = $('#portfolioGrid');
  const projects = C.proyek || [];
  if (projects.length > 0) {
    portfolioGrid.innerHTML = projects.map((p) => `
      <article class="project-card">
        <div class="project-thumb">
          <img src="${esc(p.gambar)}" alt="${esc(p.judul)}" loading="lazy">
        </div>
        <div class="project-content">
          <div class="project-tags">
            ${(p.tags || []).map((t) => `<span class="tag-item">${esc(t)}</span>`).join('')}
          </div>
          <h3 class="project-title">${esc(p.judul)}</h3>
          <p class="project-desc">${esc(p.deskripsi)}</p>
          ${p.demoUrl ? `
            <a href="${esc(p.demoUrl)}" target="_blank" rel="noopener" class="project-btn">
              <span>Lihat Demo Proyek</span>
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  } else {
    $('#portfolioSection')?.remove();
  }

  /* ---------- TOAST NOTIFICATION ---------- */
  const toast = $('#toastNotification');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('biolink-theme') || (C.temaDefault === 'light-minimal' ? 'light' : 'dark');
  if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

  $('#themeToggleBtn').addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('biolink-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('biolink-theme', 'light');
    }
  });

  /* ---------- SHARE BUTTON ---------- */
  $('#shareBtn').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Kunjungi profil dan portofolio resmi ${C.nama || ''}:`,
        url: window.location.href
      }).catch(() => {});
    } else {
      copyToClipboard(window.location.href, 'Tautan profil berhasil disalin!');
    }
  });

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(successMsg);
    }
  }

  /* ---------- V-CARD DOWNLOAD (.vcf) ---------- */
  $('#saveContactBtn').addEventListener('click', () => {
    const v = C.vcard || {};
    const fullName = v.namaLengkap || C.nama || 'Kontak';
    const org = v.organisasi || '';
    const phone = v.telepon || '';
    const email = v.email || '';
    const url = v.website || window.location.href;

    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName}`,
      org ? `ORG:${org}` : '',
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      email ? `EMAIL;TYPE=INTERNET:${email}` : '',
      `URL:${url}`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fullName.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('File kontak (.vcf) berhasil diunduh!');
  });

})();
