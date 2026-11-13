(function () {
  const cfg = window.AGENCY_CONFIG || {};

  function setTxt(id, val) {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  }

  function renderAll() {
    document.title = `${cfg.brandName || 'Studio'} — ${cfg.brandTagline || ''}`;
    setTxt('brandName', cfg.brandName);
    setTxt('footerBrand', cfg.brandName);
    setTxt('footerTagline', cfg.brandTagline);
    setTxt('heroBadge', cfg.heroBadge);
    setTxt('heroTitle', cfg.heroTitle);
    setTxt('heroSubtitle', cfg.heroSubtitle);
    setTxt('contactEmail', cfg.email);
    setTxt('contactAddress', cfg.address);
    setTxt('yearNow', String(new Date().getFullYear()));

    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid && Array.isArray(cfg.stats)) {
      statsGrid.innerHTML = cfg.stats
        .map((s) => `<div class="stat-box"><div class="stat-val">${s.value}</div><div class="stat-lbl">${s.label}</div></div>`)
        .join('');
    }

    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid && Array.isArray(cfg.services)) {
      servicesGrid.innerHTML = cfg.services
        .map((s) => `<div class="card"><div class="card-num">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p></div>`)
        .join('');
    }

    renderPortfolio('all');

    const packagesGrid = document.getElementById('packagesGrid');
    if (packagesGrid && Array.isArray(cfg.packages)) {
      packagesGrid.innerHTML = cfg.packages
        .map(
          (p) => `
          <div class="card pkg-card ${p.popular ? 'popular' : ''}">
            <div>
              ${p.popular ? '<span class="pkg-badge">PALING POPULER</span>' : ''}
              <h3>${p.name}</h3>
              <div class="pkg-price">${p.price}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">${p.period}</div>
              <ul class="pkg-list">${p.features.map((f) => `<li>✓ ${f}</li>`).join('')}</ul>
            </div>
            <a href="#kontak" onclick="document.getElementById('fMsg').value='Saya tertarik dengan paket ${p.name} (${p.price}).'" class="btn ${p.popular ? 'btn-primary' : 'btn-outline'}" style="width:100%;">Pilih Paket Ini</a>
          </div>`
        )
        .join('');
    }

    const faqList = document.getElementById('faqList');
    if (faqList && Array.isArray(cfg.faqs)) {
      faqList.innerHTML = cfg.faqs
        .map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`)
        .join('');
    }
  }

  function renderPortfolio(cat) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid || !Array.isArray(cfg.portfolio)) return;
    const list = cat === 'all' ? cfg.portfolio : cfg.portfolio.filter((p) => p.category === cat);
    grid.innerHTML = list
      .map(
        (p) => `
        <article class="card port-card">
          <img class="port-img" src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="port-body">
            <div class="port-cat">${p.category} • ${p.client}</div>
            <h3 style="margin:6px 0;">${p.title}</h3>
            <p>${p.summary}</p>
            <div class="port-res">Hasil: ${p.result}</div>
          </div>
        </article>`
      )
      .join('');
  }

  document.querySelectorAll('#portfolioFilter .chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#portfolioFilter .chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      renderPortfolio(btn.getAttribute('data-cat') || 'all');
    });
  });

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const saved = localStorage.getItem('agency_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    themeBtn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('agency_theme', next);
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fName').value.trim();
      const service = document.getElementById('fService').value;
      const msg = document.getElementById('fMsg').value.trim();
      const text = `Halo ${cfg.brandName},\nNama/Perusahaan: ${name}\nLayanan: ${service}\nDetail: ${msg}`;
      window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const name = document.getElementById('fName').value.trim() || 'Calon Klien';
      const service = document.getElementById('fService').value;
      const msg = document.getElementById('fMsg').value.trim() || '-';
      const subj = `Konsultasi ${service} - ${name}`;
      const body = `Halo ${cfg.brandName},\n\nNama/Perusahaan: ${name}\nLayanan: ${service}\nDetail Kebutuhan:\n${msg}`;
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    });
  }

  renderAll();
})();
