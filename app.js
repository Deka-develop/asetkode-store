/**
 * AsetKode Pro Headless Storefront (GitHub Pages × Blogger Cloud API)
 * - Auto-syncs products from https://asetkode.blogspot.com/ via JSONP (zero CORS issues)
 * - Built-in Interactive Live Demo Simulator (Desktop / Tablet / Mobile viewports)
 * - Multi-item Shopping Cart with automatic 20% Bundle Discount & VIP All-Access Pass
 * - Interactive ROI Calculator & Instant QRIS/VA Checkout Simulator
 */

const BLOGGER_ORIGIN = 'https://asetkode.blogspot.com';
const STORAGE_CART_KEY = 'asetkode_pro_cart_v1';
const STORAGE_THEME_KEY = 'asetkode_pro_theme_v1';

// Built-in fallback catalog (synced with asetkode.blogspot.com)
const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Source Code Aplikasi Kasir & Inventori Toko (POS) Full Fitur',
    categories: ['PHP', 'Web App', 'Source Code'],
    price: 'Rp 149.000',
    oldPrice: 'Rp 299.000',
    paymentUrl: 'https://example.com/checkout/pos-kasir',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/source-code-aplikasi-kasir-inventori.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/source-code-aplikasi-kasir-inventori.html',
    version: 'v2.4 (Terbaru)',
    stack: 'PHP Laravel 11 + MySQL + Tailwind',
    license: 'Personal & Komersial',
    openMode: 'modal',
    demoType: 'pos',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    summary: 'Aplikasi Point of Sale (POS) Kasir dan Manajemen Stok Gudang berbasis web dengan fitur scan barcode, cetak struk thermal, dan laporan laba rugi real-time.',
    features: [
      'Transaksi Kasir Cepat + Support Barcode Scanner Otomatis',
      'Cetak Struk Thermal (58mm & 80mm) & Invoice PDF',
      'Manajemen Stok Gudang, Supplier, & Peringatan Stok Menipis',
      'Laporan Laba Rugi, Grafik Penjualan Harian/Bulanan & Export Excel',
      'Multi-Role User (Admin, Kasir, Gudang) + Riwayat Aktivitas'
    ]
  },
  {
    id: 'prod-2',
    title: 'Landing Page SaaS & Digital Agency Modern Responsive UI Template',
    categories: ['JavaScript', 'Template', 'Source Code'],
    price: 'Rp 79.000',
    oldPrice: 'Rp 179.000',
    paymentUrl: 'https://example.com/checkout/landing-page-saas',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/landing-page-saas-digital-agency-modern.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/landing-page-saas-digital-agency-modern.html',
    version: 'v1.8 (Terbaru)',
    stack: 'HTML5 + Tailwind CSS + Alpine.js',
    license: 'Personal & Komersial (Unlimited Project)',
    openMode: 'modal',
    demoType: 'saas',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    summary: 'Template Landing Page modern bergaya startup SaaS & Digital Agency dengan skor Google PageSpeed 99+, animasi halus, dan konversi tinggi.',
    features: [
      'Skor Google Lighthouse & PageSpeed Insights 99/100',
      '12+ Seksi Siap Pakai (Hero, Pricing Tabel, Testimoni, FAQ, CTA)',
      'Desain Mobile-First & Dark/Light Mode Otomatis',
      'Struktur Kode Bersih, SEO Semantic HTML5 & Mudah Dikustomisasi',
      'Cocok untuk Web Jualan Produk Digital, Startup, & Jasa Agensi'
    ]
  },
  {
    id: 'prod-3',
    title: 'Script Python Otomatisasi Scraper & Export Data ke Excel / Google Sheets',
    categories: ['Python', 'Source Code'],
    price: 'Rp 99.000',
    oldPrice: 'Rp 225.000',
    paymentUrl: 'https://example.com/checkout/python-scraper-suite',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/script-python-otomatisasi-scraper.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/script-python-otomatisasi-scraper.html',
    version: 'v3.1 (Terbaru)',
    stack: 'Python 3.11 + Playwright + Pandas',
    license: 'Personal & Komersial',
    openMode: 'modal',
    demoType: 'bot',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
    summary: 'Paket script Python siap pakai untuk mengotomatisasi pengumpulan data riset pasar, pemantauan harga kompetitor, dan laporan otomatis ke Excel/CSV.',
    features: [
      'Multi-Thread Scraping Cepat dengan Anti-Block Retry Otomatis',
      'Export Otomatis ke Format Excel (.xlsx), CSV, & JSON Rapi',
      'Fitur Auto-Scheduler (Jalan Otomatis Setiap Hari/Jam)',
      'Notifikasi Laporan Selesai Langsung ke Telegram / Email',
      'Disertai Script Installer 1-Klik (.bat) & Dokumentasi Pemula'
    ]
  },
  {
    id: 'prod-4',
    title: 'Source Code Aplikasi E-Commerce & Katalog Toko Online Checkout QRIS',
    categories: ['PHP', 'Web App', 'Source Code'],
    price: 'Rp 169.000',
    oldPrice: 'Rp 349.000',
    paymentUrl: 'https://example.com/checkout/ecommerce-qris',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/source-code-aplikasi-e-commerce-katalog.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/source-code-aplikasi-e-commerce-katalog.html',
    version: 'v2.9 (Terbaru)',
    stack: 'PHP 8.2 + MySQL + Midtrans/Tripay API',
    license: 'Personal & Komersial',
    openMode: 'modal',
    demoType: 'ecom',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80',
    summary: 'Platform toko online mandiri untuk produk fisik maupun produk digital dengan sistem keranjang belanja, cek ongkir otomatis, dan pembayaran instan QRIS/VA.',
    features: [
      'Katalog Produk Dinamis + Filter Kategori, Pencarian & Kupon Diskon',
      'Integrasi Pembayaran Otomatis (QRIS, Virtual Account, E-Wallet)',
      'Mendukung Produk Fisik (Hitung Ongkir) & Produk Digital (Auto-Download)',
      'Dashboard Admin Lengkap: Kelola Pesanan, Pelanggan & Banner Promo',
      'Desain Responsif Mobile-First Setara Aplikasi Marketplace Modern'
    ]
  },
  {
    id: 'prod-5',
    title: 'Admin Dashboard & Analytics UI Kit Modern (Dark/Light Mode)',
    categories: ['JavaScript', 'Template', 'Web App'],
    price: 'Rp 89.000',
    oldPrice: 'Rp 199.000',
    paymentUrl: 'https://example.com/checkout/admin-dashboard-ui',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/admin-dashboard-analytics-ui-kit-modern.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/admin-dashboard-analytics-ui-kit-modern.html',
    version: 'v2.0 (Terbaru)',
    stack: 'HTML5 + Tailwind CSS + Chart.js',
    license: 'Personal & Komersial (Unlimited Project)',
    openMode: 'modal',
    demoType: 'dashboard',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    summary: 'Koleksi 25+ halaman template Admin Dashboard profesional dengan grafik analitik interaktif, tabel data canggih, manajemen user, dan fitur Dark Mode.',
    features: [
      '25+ Halaman Siap Pakai (Dashboard, Analitik, Tabel, Form, Auth, Profil)',
      'Dilengkapi Grafik Chart.js Interaktif & Tabel Pencarian/Pagination',
      'Fitur 1-Click Dark Mode & Light Mode dengan Penyimpanan Preferensi',
      'Komponen Modular yang Mudah Diintegrasikan ke Laravel, React, atau Vue',
      'Tampilan Super Rapi di Layar Desktop, Tablet, maupun Smartphone'
    ]
  },
  {
    id: 'prod-6',
    title: 'Bot Auto-Responder & Notifikasi Laporan Otomatis Telegram / Webhook',
    categories: ['Python', 'Source Code', 'Web App'],
    price: 'Rp 119.000',
    oldPrice: 'Rp 249.000',
    paymentUrl: 'https://example.com/checkout/bot-telegram-webhook',
    demoUrl: 'https://asetkode.blogspot.com/2026/11/bot-auto-responder-notifikasi-laporan.html',
    postUrl: 'https://asetkode.blogspot.com/2026/11/bot-auto-responder-notifikasi-laporan.html',
    version: 'v1.6 (Terbaru)',
    stack: 'Python / Node.js + Telegram Bot API + Webhook',
    license: 'Personal & Komersial',
    openMode: 'modal',
    demoType: 'bot',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    summary: 'Sistem bot otomatis untuk membalas perintah pelanggan, mengirim laporan transaksi harian, dan memantau status server/website secara real-time 24/7.',
    features: [
      'Menu Keyboard Interaktif & Balasan Otomatis Berbasis Kata Kunci',
      'Integrasi Webhook untuk Notifikasi Order Baru dari Website/Toko',
      'Fitur Monitoring Uptime Website & Peringatan Error Real-Time',
      'Kirim Laporan Rekap Harian dalam Bentuk Tabel / File PDF Otomatis',
      'Ringan, Bisa Dijalankan di VPS Murah, Railway, maupun PC Lokal'
    ]
  }
];

let productsState = [...FALLBACK_PRODUCTS];
let activeCategory = 'all';
let searchQuery = '';
let sortMode = 'newest';
let cartState = [];
let currentDemoProduct = null;

// Utility: Parse numeric price from "Rp 149.000"
function parsePriceNum(str) {
  if (!str) return 0;
  const digits = String(str).replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

// Utility: Format integer to "Rp 149.000"
function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

// Utility: Calculate discount percentage
function getDiscountPercent(priceStr, oldPriceStr) {
  const p = parsePriceNum(priceStr);
  const old = parsePriceNum(oldPriceStr);
  if (p > 0 && old > p) {
    return Math.round(((old - p) / old) * 100);
  }
  return 0;
}

// Determine interactive demo type from categories/title
function inferDemoType(title, categories) {
  const t = (title || '').toLowerCase();
  const c = (categories || []).join(' ').toLowerCase();
  if (t.includes('kasir') || t.includes('pos') || t.includes('inventori')) return 'pos';
  if (t.includes('e-commerce') || t.includes('toko online') || t.includes('katalog')) return 'ecom';
  if (t.includes('dashboard') || t.includes('analytics') || t.includes('admin')) return 'dashboard';
  if (t.includes('landing') || t.includes('saas') || t.includes('agency')) return 'saas';
  if (c.includes('python') || t.includes('bot') || t.includes('scraper')) return 'bot';
  return 'saas';
}

// ================= 1. BLOGGER CLOUD JSONP SYNC =================
window.__asetkodeBloggerCallback = function (data) {
  try {
    const entries = (data && data.feed && data.feed.entry) || [];
    if (!entries.length) return;

    const syncedProducts = entries.map((entry, idx) => {
      const title = entry.title && entry.title.$t ? entry.title.$t : 'Produk Digital #' + (idx + 1);
      const rawHtml = (entry.content && entry.content.$t) || (entry.summary && entry.summary.$t) || '';
      const categories = (entry.category || []).map((c) => c.term).filter(Boolean);
      const altLink = (entry.link || []).find((l) => l.rel === 'alternate');
      const postUrl = altLink ? altLink.href : BLOGGER_ORIGIN;

      // Parse HTML content to extract .product-meta-data attributes
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, 'text/html');
      const metaEl = doc.querySelector('.product-meta-data');
      const firstImg = doc.querySelector('img');
      const descEl = doc.querySelector('.product-description p') || doc.querySelector('p');
      const featEls = doc.querySelectorAll('.product-features li');

      const price = (metaEl && metaEl.getAttribute('data-price')) || 'Rp 99.000';
      const oldPrice = (metaEl && metaEl.getAttribute('data-old-price')) || '';
      const paymentUrl = (metaEl && metaEl.getAttribute('data-payment-url')) || postUrl;
      const demoUrl = (metaEl && metaEl.getAttribute('data-demo-url')) || postUrl;
      const version = (metaEl && metaEl.getAttribute('data-version')) || 'v1.0';
      const stack = (metaEl && metaEl.getAttribute('data-stack')) || (categories.join(' • ') || 'Full Source Code');
      const license = (metaEl && metaEl.getAttribute('data-license')) || 'Personal & Komersial';
      const openMode = (metaEl && metaEl.getAttribute('data-open-mode')) || 'modal';

      let features = Array.from(featEls).map((li) => li.textContent.trim()).filter(Boolean);
      if (!features.length) {
        features = [
          '100% Full Source Code Tanpa Enkripsi (Siap Kustomisasi)',
          'Database SQL Lengkap + Dokumentasi Panduan Instalasi',
          'Pengiriman Otomatis Detik Itu Juga via Email & Web',
          'Lisensi Penggunaan Personal & Proyek Komersial'
        ];
      }

      const summaryText = descEl
        ? descEl.textContent.trim().slice(0, 175)
        : 'Source code dan karya digital siap pakai lengkap dengan dokumentasi instalasi dan database.';

      return {
        id: 'blogger-prod-' + idx,
        title,
        categories: categories.length ? categories : ['Source Code'],
        price,
        oldPrice,
        paymentUrl,
        demoUrl,
        postUrl,
        version,
        stack,
        license,
        openMode,
        demoType: inferDemoType(title, categories),
        thumbnailUrl: firstImg ? firstImg.src : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        summary: summaryText,
        features
      };
    });

    if (syncedProducts.length > 0) {
      productsState = syncedProducts;
      renderProductsGrid();
      const statusEl = document.getElementById('catalogStatusText');
      if (statusEl) {
        statusEl.textContent = `Terhubung Live dengan asetkode.blogspot.com (${syncedProducts.length} produk aktif)`;
      }
    }
  } catch (err) {
    console.warn('Blogger feed parse warning (using fallback catalog):', err);
  }
};

function syncFromBloggerCloud() {
  const script = document.createElement('script');
  script.src = `${BLOGGER_ORIGIN}/feeds/posts/default?alt=json-in-script&max-results=50&callback=__asetkodeBloggerCallback`;
  script.async = true;
  script.onerror = () => {
    const statusEl = document.getElementById('catalogStatusText');
    if (statusEl) {
      statusEl.textContent = `Katalog Siap (${productsState.length} produk unggulan siap diunduh)`;
    }
  };
  document.body.appendChild(script);
}

// ================= 2. RENDER PRODUCT CATALOG GRID =================
function renderProductsGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  // Filter by category and search query
  let list = productsState.filter((item) => {
    const matchesCat =
      activeCategory === 'all' ||
      item.categories.some((c) => c.toLowerCase() === activeCategory.toLowerCase());

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.stack.toLowerCase().includes(q) ||
      item.categories.some((c) => c.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  // Sort
  list = [...list].sort((a, b) => {
    if (sortMode === 'price-asc') return parsePriceNum(a.price) - parsePriceNum(b.price);
    if (sortMode === 'price-desc') return parsePriceNum(b.price) - parsePriceNum(a.price);
    if (sortMode === 'disc-desc') {
      return getDiscountPercent(b.price, b.oldPrice) - getDiscountPercent(a.price, a.oldPrice);
    }
    return 0; // newest
  });

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:56px 20px; background:var(--bg-card); border:1px dashed var(--border-color); border-radius:16px;">
        <div style="font-size:2.2rem; margin-bottom:10px;">🔍</div>
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:6px;">Produk Tidak Ditemukan</h3>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:16px;">Coba gunakan kata kunci lain atau tampilkan semua kategori.</p>
        <button type="button" class="btn btn-primary" onclick="resetCatalogFilter()">Tampilkan Semua Karya</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = list
    .map((p) => {
      const disc = getDiscountPercent(p.price, p.oldPrice);
      const inCart = cartState.some((c) => c.id === p.id);
      const stackChips = p.stack
        .split('+')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);

      return `
        <article class="product-card" data-id="${p.id}">
          <!-- MacOS Window Top Bar -->
          <div class="card-window-top">
            <div class="window-dots">
              <span class="win-dot r"></span>
              <span class="win-dot y"></span>
              <span class="win-dot g"></span>
            </div>
            <span class="card-version-text">${p.version} • ZIP Ready</span>
          </div>

          <!-- Thumbnail & Hover Overlay -->
          <div class="card-thumb">
            <img src="${p.thumbnailUrl}" alt="${p.title}" loading="lazy" />
            ${disc > 0 ? `<span class="discount-pill">HEMAT ${disc}%</span>` : ''}
            <div class="thumb-tags">
              ${p.categories
                .slice(0, 3)
                .map((cat) => `<span class="thumb-tag">${cat}</span>`)
                .join('')}
            </div>
            <div class="card-hover-overlay">
              <button type="button" class="overlay-btn primary" onclick="openLiveDemoById('${p.id}')">
                🖥️ Interactive Demo
              </button>
              <button type="button" class="overlay-btn" onclick="openDetailById('${p.id}')">
                🔍 Inspect Isi .ZIP
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="card-body">
            <h3 class="card-title" onclick="openDetailById('${p.id}')">${p.title}</h3>
            <p class="card-desc">${p.summary}</p>

            <div class="stack-row">
              ${stackChips.map((st) => `<span class="stack-chip">⚙️ ${st}</span>`).join('')}
              <span class="stack-chip">⚡ Auto-Download</span>
            </div>

            <!-- 2-Row Clean Footer (Never Wraps Price or Buttons) -->
            <div class="card-footer">
              <div class="price-row">
                <div class="price-group">
                  <span class="price-current">${p.price}</span>
                  ${p.oldPrice ? `<span class="price-old">${p.oldPrice}</span>` : ''}
                </div>
                <span class="verified-pill">✓ Instant ZIP</span>
              </div>

              <div class="card-actions">
                <button type="button" class="btn-card" onclick="openLiveDemoById('${p.id}')" title="Coba Simulasi Live Demo">
                  🖥️ Demo
                </button>
                <button type="button" class="btn-card" onclick="toggleCartItemById('${p.id}')" title="Masukkan ke Keranjang">
                  ${inCart ? '✓ Di Keranjang' : '🛒 +Keranjang'}
                </button>
                <button type="button" class="btn-card buy" onclick="openInstantCheckoutById('${p.id}')">
                  ⚡ Beli Instan
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

window.resetCatalogFilter = function () {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('#filterBar .filter-chip').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
  });
  renderProductsGrid();
};

// ================= 3. INTERACTIVE LIVE DEMO SIMULATOR =================
window.openLiveDemoById = function (productId) {
  const prod = productsState.find((p) => p.id === productId);
  if (!prod) return;
  currentDemoProduct = prod;

  const modal = document.getElementById('demoSimModal');
  const titleEl = document.getElementById('demoSimTitle');
  const stageEl = document.getElementById('demoViewportStage');
  const buyBtn = document.getElementById('demoSimBuyBtn');

  if (titleEl) titleEl.textContent = `Interactive Preview: ${prod.title}`;
  if (buyBtn) {
    buyBtn.textContent = `⚡ Beli Source Code (${prod.price})`;
    buyBtn.onclick = () => {
      closeModal('demoSimModal');
      openInstantCheckoutById(prod.id);
    };
  }

  if (stageEl) {
    stageEl.style.width = '100%';
    stageEl.innerHTML = buildInteractiveDemoHTML(prod);
  }

  document.querySelectorAll('.vp-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-vp') === '100%');
  });

  if (modal) modal.classList.add('open');
  bindPosSimulatorEvents();
};

function buildInteractiveDemoHTML(prod) {
  const type = prod.demoType || inferDemoType(prod.title, prod.categories);

  if (type === 'pos') {
    return `
      <div style="font-family:'Plus Jakarta Sans',sans-serif; background:#f8fafc; min-height:540px; color:#0f172a;">
        <div style="background:#0f172a; color:#fff; padding:14px 22px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="background:#3b82f6; padding:4px 10px; border-radius:6px; font-weight:800; font-size:0.8rem;">POS KASIR PRO v2.4</span>
            <span style="font-size:0.85rem; color:#94a3b8;">Cabang Utama • Kasir: Admin Demo</span>
          </div>
          <span style="font-size:0.78rem; background:rgba(16,185,129,0.2); color:#34d399; padding:4px 10px; border-radius:99px; font-weight:700;">● Printer Thermal Ready</span>
        </div>

        <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:18px; padding:20px;">
          <!-- Katalog Kasir Interaktif -->
          <div>
            <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
              <strong style="font-size:0.95rem;">Klik Menu untuk Tambah ke Struk Kasir:</strong>
              <span style="font-size:0.76rem; color:#64748b;">Simulasi Interaktif Real-Time</span>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap:12px;">
              <button type="button" class="pos-sim-item" data-name="Kopi Susu Aren" data-price="18000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">☕</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">Kopi Susu Aren</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 18.000</div>
              </button>
              <button type="button" class="pos-sim-item" data-name="Croissant Butter" data-price="24000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">🥐</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">Croissant Butter</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 24.000</div>
              </button>
              <button type="button" class="pos-sim-item" data-name="Matcha Latte Ice" data-price="22000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">🍵</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">Matcha Latte Ice</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 22.000</div>
              </button>
              <button type="button" class="pos-sim-item" data-name="Beef Burger Deluxe" data-price="35000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">🍔</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">Beef Burger Deluxe</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 35.000</div>
              </button>
              <button type="button" class="pos-sim-item" data-name="French Fries Crispy" data-price="16000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">🍟</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">French Fries Crispy</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 16.000</div>
              </button>
              <button type="button" class="pos-sim-item" data-name="Mineral Water 600ml" data-price="8000" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:left; cursor:pointer; transition:0.15s;">
                <div style="font-size:1.4rem; margin-bottom:4px;">💧</div>
                <div style="font-weight:700; font-size:0.85rem; color:#0f172a;">Mineral Water</div>
                <div style="color:#2563eb; font-weight:800; font-size:0.82rem; margin-top:4px;">Rp 8.000</div>
              </button>
            </div>
          </div>

          <!-- Struk Kasir Live -->
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-weight:800; font-size:0.92rem; padding-bottom:10px; border-bottom:1px dashed #cbd5e1; display:flex; justify-content:space-between;">
                <span>🧾 Struk Transaksi #INV-8092</span>
                <button type="button" id="posResetBtn" style="font-size:0.72rem; color:#ef4444; background:none; border:none; cursor:pointer; font-weight:700;">Reset</button>
              </div>
              <div id="posReceiptList" style="margin:12px 0; max-height:210px; overflow-y:auto; font-size:0.82rem;">
                <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f1f5f9;">
                  <span>1x Kopi Susu Aren</span>
                  <strong>Rp 18.000</strong>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f1f5f9;">
                  <span>1x Croissant Butter</span>
                  <strong>Rp 24.000</strong>
                </div>
              </div>
            </div>
            <div style="border-top:2px solid #0f172a; padding-top:12px;">
              <div style="display:flex; justify-content:space-between; font-size:1rem; font-weight:800; margin-bottom:12px;">
                <span>Total Tagihan:</span>
                <span id="posTotalVal" style="color:#2563eb;">Rp 42.000</span>
              </div>
              <button type="button" id="posPrintBtn" style="width:100%; background:#10b981; color:#fff; border:none; padding:11px; border-radius:8px; font-weight:800; cursor:pointer;">
                🖨️ Bayar QRIS &amp; Cetak Struk Thermal
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'dashboard' || type === 'ecom') {
    return `
      <div style="font-family:'Plus Jakarta Sans',sans-serif; background:#0f172a; min-height:540px; color:#f8fafc; padding:22px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid #1e293b;">
          <div>
            <span style="background:rgba(59,130,246,0.2); color:#60a5fa; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:800;">LIVE INTERACTIVE DASHBOARD</span>
            <h3 style="font-size:1.15rem; font-weight:800; margin-top:6px;">${prod.title}</h3>
          </div>
          <div style="font-size:0.8rem; color:#34d399; font-weight:700;">● Real-Time Analytics Active</div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin-bottom:22px;">
          <div style="background:#1e293b; border:1px solid #334155; padding:16px; border-radius:12px;">
            <div style="font-size:0.75rem; color:#94a3b8;">Total Pendapatan Bulan Ini</div>
            <div style="font-size:1.35rem; font-weight:800; color:#34d399; margin-top:4px;">Rp 48.920.000</div>
            <div style="font-size:0.72rem; color:#34d399; margin-top:4px;">▲ +28.4% vs bulan lalu</div>
          </div>
          <div style="background:#1e293b; border:1px solid #334155; padding:16px; border-radius:12px;">
            <div style="font-size:0.75rem; color:#94a3b8;">Pesanan Lunas (QRIS/VA)</div>
            <div style="font-size:1.35rem; font-weight:800; color:#60a5fa; margin-top:4px;">342 Order</div>
            <div style="font-size:0.72rem; color:#94a3b8; margin-top:4px;">Konversi Checkout 94.2%</div>
          </div>
          <div style="background:#1e293b; border:1px solid #334155; padding:16px; border-radius:12px;">
            <div style="font-size:0.75rem; color:#94a3b8;">Pelanggan Aktif</div>
            <div style="font-size:1.35rem; font-weight:800; color:#fbbf24; margin-top:4px;">1,284 User</div>
            <div style="font-size:0.72rem; color:#94a3b8; margin-top:4px;">Lisensi Termasuk Source Code</div>
          </div>
        </div>

        <div style="background:#1e293b; border:1px solid #334155; border-radius:12px; padding:18px;">
          <div style="font-weight:700; font-size:0.88rem; margin-bottom:12px;">Transaksi Otomatis Terbaru</div>
          <div style="display:grid; gap:8px; font-size:0.82rem;">
            <div style="display:flex; justify-content:space-between; padding:10px 12px; background:#0f172a; border-radius:8px;">
              <span>#ORD-9921 • Pembayaran QRIS Otomatis</span>
              <span style="color:#34d399; font-weight:700;">LUNAS • Rp 169.000</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:10px 12px; background:#0f172a; border-radius:8px;">
              <span>#ORD-9920 • Virtual Account BCA</span>
              <span style="color:#34d399; font-weight:700;">LUNAS • Rp 149.000</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:10px 12px; background:#0f172a; border-radius:8px;">
              <span>#ORD-9919 • E-Wallet GoPay</span>
              <span style="color:#34d399; font-weight:700;">LUNAS • Rp 249.000</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (type === 'bot') {
    return `
      <div style="font-family:'JetBrains Mono',monospace; background:#090d16; min-height:540px; color:#e2e8f0; padding:24px;">
        <div style="background:#111827; border:1px solid #1f2937; border-radius:12px; padding:18px;">
          <div style="color:#34d399; font-weight:700; margin-bottom:12px;">$ python main_automation_bot.py --mode=production</div>
          <div style="font-size:0.82rem; line-height:1.7; color:#94a3b8;">
            <div>[09:00:01] 🚀 Initializing <strong style="color:#fff;">${prod.title}</strong>...</div>
            <div>[09:00:02] ✅ Loaded config.json &amp; multi-thread worker pool (8 threads)</div>
            <div>[09:00:03] 🔍 Fetching target data &amp; running automation pipeline...</div>
            <div style="color:#60a5fa;">[09:00:04] 📊 Processed 250 records → Exported to /output/laporan_otomatis.xlsx</div>
            <div style="color:#34d399;">[09:00:05] 📲 Telegram Webhook Notification Sent: "Laporan Harian Selesai (250 Baris)"</div>
            <div style="margin-top:16px; padding:12px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; color:#34d399;">
              ✓ Full Source Code Python (.py) + Requirements.txt + Panduan Instalasi disertakan di dalam paket download.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Default: SaaS Landing Page preview
  return `
    <div style="font-family:'Plus Jakarta Sans',sans-serif; background:linear-gradient(180deg,#0f172a,#1e293b); min-height:540px; color:#fff; padding:36px 24px; text-align:center;">
      <span style="background:rgba(59,130,246,0.2); color:#60a5fa; padding:6px 14px; border-radius:99px; font-size:0.78rem; font-weight:800;">LIGHTHOUSE SCORE 99/100 • SAAS UI TEMPLATE</span>
      <h2 style="font-size:2rem; font-weight:800; max-width:640px; margin:16px auto 12px; line-height:1.2;">${prod.title}</h2>
      <p style="color:#94a3b8; max-width:540px; margin:0 auto 24px; font-size:0.95rem;">${prod.summary}</p>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:32px;">
        <span style="background:#3b82f6; padding:10px 20px; border-radius:10px; font-weight:800; font-size:0.86rem;">⚡ Responsive Desktop, Tablet &amp; Mobile</span>
        <span style="background:rgba(255,255,255,0.08); padding:10px 20px; border-radius:10px; font-weight:700; font-size:0.86rem;">🎨 Clean HTML5 + Tailwind CSS</span>
      </div>
      <div style="max-width:760px; margin:0 auto; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); box-shadow:0 20px 50px rgba(0,0,0,0.5);">
        <img src="${prod.thumbnailUrl}" alt="${prod.title}" style="width:100%; max-height:320px; object-fit:cover; display:block;" />
      </div>
    </div>
  `;
}

function bindPosSimulatorEvents() {
  let currentTotal = 42000;
  const listEl = document.getElementById('posReceiptList');
  const totalEl = document.getElementById('posTotalVal');
  const resetBtn = document.getElementById('posResetBtn');
  const printBtn = document.getElementById('posPrintBtn');

  document.querySelectorAll('.pos-sim-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price') || '0', 10);
      currentTotal += price;
      if (listEl) {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f1f5f9;';
        row.innerHTML = `<span>1x ${name}</span><strong>${formatRupiah(price)}</strong>`;
        listEl.appendChild(row);
        listEl.scrollTop = listEl.scrollHeight;
      }
      if (totalEl) totalEl.textContent = formatRupiah(currentTotal);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentTotal = 0;
      if (listEl) listEl.innerHTML = '<div style="color:#94a3b8; padding:12px 0; text-align:center;">Klik item di sebelah kiri untuk simulasi transaksi kasir.</div>';
      if (totalEl) totalEl.textContent = 'Rp 0';
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      printBtn.textContent = '✅ Struk Tercetak! Silakan Beli Source Code Ini';
      printBtn.style.background = '#2563eb';
    });
  }
}

// ================= 4. PRODUCT DETAIL & FILE INSPECTOR MODAL =================
window.openDetailById = function (productId) {
  const prod = productsState.find((p) => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('detailModal');
  const titleEl = document.getElementById('detailModalTitle');
  const bodyEl = document.getElementById('detailModalBody');

  if (titleEl) titleEl.textContent = prod.title;
  if (bodyEl) {
    const disc = getDiscountPercent(prod.price, prod.oldPrice);
    bodyEl.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:22px; align-items:start;">
        <div>
          <div style="border-radius:14px; overflow:hidden; border:1px solid var(--border-color); margin-bottom:16px;">
            <img src="${prod.thumbnailUrl}" alt="${prod.title}" style="width:100%; height:230px; object-fit:cover; display:block;" />
          </div>
          <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:12px; padding:14px;">
            <div style="font-size:0.78rem; font-weight:800; color:var(--text-secondary); margin-bottom:8px;">📦 ISI PAKET UNDUHAN (.ZIP):</div>
            <ul class="zip-tree">
              <li class="zip-row"><span>📁 /full-source-code/ (${prod.stack})</span><span class="zip-badge">Unlocked</span></li>
              <li class="zip-row"><span>🗄️ /database/schema_sample.sql</span><span class="zip-badge">Ready</span></li>
              <li class="zip-row"><span>📘 PANDUAN_INSTALASI.pdf</span><span class="zip-badge">Bahasa ID</span></li>
            </ul>
          </div>
        </div>

        <div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
            ${prod.categories.map((c) => `<span class="brand-badge">${c}</span>`).join('')}
            <span class="verified-pill">${prod.version}</span>
          </div>

          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:16px; line-height:1.65;">
            ${prod.summary}
          </p>

          <div style="margin-bottom:18px;">
            <div style="font-size:0.82rem; font-weight:800; margin-bottom:8px;">✨ Fitur Unggulan yang Anda Dapatkan:</div>
            <ul style="list-style:none; display:grid; gap:7px; font-size:0.84rem; color:var(--text-secondary);">
              ${prod.features.map((f) => `<li>✅ ${f}</li>`).join('')}
            </ul>
          </div>

          <div style="background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:14px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
              <div>
                <div style="font-size:0.74rem; color:var(--text-muted);">Harga Lisensi &amp; Source Code:</div>
                <div style="display:flex; align-items:baseline; gap:8px;">
                  <span class="price-current" style="font-size:1.5rem;">${prod.price}</span>
                  ${prod.oldPrice ? `<span class="price-old">${prod.oldPrice}</span>` : ''}
                </div>
              </div>
              ${disc > 0 ? `<span class="discount-pill" style="position:static;">HEMAT ${disc}%</span>` : ''}
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <button type="button" class="btn btn-ghost" onclick="closeModal('detailModal'); openLiveDemoById('${prod.id}')">
                🖥️ Live Demo
              </button>
              <button type="button" class="btn btn-primary" onclick="closeModal('detailModal'); openInstantCheckoutById('${prod.id}')">
                ⚡ Beli &amp; Download
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add('open');
};

// ================= 5. SHOPPING CART & AUTOMATIC BUNDLE DISCOUNT =================
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_CART_KEY);
    if (raw) cartState = JSON.parse(raw) || [];
  } catch (e) {
    cartState = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartState));
  } catch (e) {}
  updateCartUI();
  renderProductsGrid();
}

window.toggleCartItemById = function (productId) {
  const prod = productsState.find((p) => p.id === productId);
  if (!prod) return;

  const existingIdx = cartState.findIndex((c) => c.id === productId);
  if (existingIdx >= 0) {
    cartState.splice(existingIdx, 1);
  } else {
    cartState.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      priceNum: parsePriceNum(prod.price),
      stack: prod.stack,
      paymentUrl: prod.paymentUrl
    });
    openCartDrawer();
  }
  saveCartToStorage();
};

window.removeCartItemById = function (productId) {
  cartState = cartState.filter((c) => c.id !== productId);
  saveCartToStorage();
};

function addAllBundleToCart() {
  cartState = [
    {
      id: 'vip-bundle-all',
      title: '💎 VIP All-Access Developer Pass (Seluruh 6+ Source Code & Template Lengkap)',
      price: 'Rp 249.000',
      priceNum: 249000,
      stack: 'All-In-One Pack (Hemat 65%)',
      paymentUrl: 'https://example.com/checkout/vip-all-access-bundle'
    }
  ];
  saveCartToStorage();
  openCartDrawer();
}

function updateCartUI() {
  const badge = document.getElementById('cartCountBadge');
  const listEl = document.getElementById('cartItemsContainer');
  const hintEl = document.getElementById('cartBundleHint');
  const totalEl = document.getElementById('cartTotalPrice');

  if (badge) badge.textContent = String(cartState.length);

  if (!listEl) return;

  if (cartState.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:48px 16px; color:var(--text-secondary);">
        <div style="font-size:2.2rem; margin-bottom:8px;">🛒</div>
        <div style="font-weight:700; margin-bottom:4px;">Keranjang Anda Masih Kosong</div>
        <p style="font-size:0.8rem;">Pilih minimal 2 source code untuk mendapatkan <strong>Diskon Bundling 20% Otomatis</strong>!</p>
      </div>
    `;
    if (hintEl) hintEl.textContent = '';
    if (totalEl) totalEl.textContent = 'Rp 0';
    return;
  }

  listEl.innerHTML = cartState
    .map(
      (item) => `
      <div class="cart-item">
        <div>
          <div class="cart-item-title">${item.title}</div>
          <div style="font-size:0.74rem; color:var(--text-muted); margin-bottom:4px;">${item.stack}</div>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <button type="button" class="close-x" onclick="removeCartItemById('${item.id}')" title="Hapus">×</button>
      </div>
    `
    )
    .join('');

  const rawTotal = cartState.reduce((acc, item) => acc + (item.priceNum || 0), 0);
  const hasBundleDiscount = cartState.length >= 2 && !cartState.some((i) => i.id === 'vip-bundle-all');
  const finalTotal = hasBundleDiscount ? Math.round(rawTotal * 0.8) : rawTotal;

  if (hintEl) {
    if (hasBundleDiscount) {
      hintEl.textContent = `🎉 Diskon Bundling 20% Aktif! (Hemat ${formatRupiah(rawTotal - finalTotal)})`;
    } else if (cartState.some((i) => i.id === 'vip-bundle-all')) {
      hintEl.textContent = '💎 Paket VIP All-Access Aktif (Hemat Rp 455.000 dari harga satuan!)';
    } else {
      hintEl.textContent = '💡 Tips: Tambah 1 produk lagi untuk ekstra diskon bundling 20% otomatis!';
    }
  }

  if (totalEl) totalEl.textContent = formatRupiah(finalTotal);
}

function openCartDrawer() {
  const backdrop = document.getElementById('cartBackdrop');
  if (backdrop) backdrop.classList.add('open');
}

// ================= 6. INSTANT CHECKOUT MODAL & QRIS GATEWAY SIMULATOR =================
window.openInstantCheckoutById = function (productId) {
  const prod = productsState.find((p) => p.id === productId);
  if (!prod) return;
  launchCheckoutGateway({
    title: prod.title,
    price: prod.price,
    paymentUrl: prod.paymentUrl,
    stack: prod.stack
  });
};

function launchCheckoutGateway(order) {
  const modal = document.getElementById('checkoutModal');
  const titleEl = document.getElementById('checkoutModalTitle');
  const priceEl = document.getElementById('checkoutModalPrice');
  const iframe = document.getElementById('checkoutIframe');
  const extLink = document.getElementById('checkoutExternalLink');

  if (titleEl) titleEl.textContent = `🔒 Checkout Instan: ${order.title}`;
  if (priceEl) priceEl.textContent = order.price;
  if (extLink) extLink.href = order.paymentUrl || '#';

  // If paymentUrl is still placeholder example.com, render interactive built-in QRIS / VA Payment Gateway Preview inside iframe srcdoc
  const isPlaceholder = !order.paymentUrl || order.paymentUrl.includes('example.com');
  if (iframe) {
    if (isPlaceholder) {
      iframe.removeAttribute('src');
      iframe.srcdoc = buildBuiltInPaymentGatewayHTML(order);
    } else {
      iframe.removeAttribute('srcdoc');
      iframe.src = order.paymentUrl;
    }
  }

  if (modal) modal.classList.add('open');
}

function buildBuiltInPaymentGatewayHTML(order) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #f8fafc; color: #0f172a; padding: 22px; }
        .card { max-width: 540px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 10px 25px rgba(15,23,42,0.06); }
        .badge { display: inline-block; background: #dbeafe; color: #1d4ed8; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 99px; margin-bottom: 8px; }
        .title { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
        .price { font-size: 22px; font-weight: 800; color: #2563eb; margin-bottom: 16px; }
        label { display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; }
        input { width: 100%; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; margin-bottom: 14px; }
        .methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
        .method { border: 2px solid #e2e8f0; border-radius: 10px; padding: 10px; text-align: center; cursor: pointer; font-size: 12px; font-weight: 700; }
        .method.active { border-color: #2563eb; background: #eff6ff; color: #1d4ed8; }
        .btn { width: 100%; background: linear-gradient(135deg, #2563eb, #4f46e5); color: #fff; border: none; padding: 13px; border-radius: 10px; font-size: 14px; font-weight: 800; cursor: pointer; }
        .success-box { display: none; margin-top: 16px; background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 12px; padding: 16px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">⚡ GATEWAY PEMBAYARAN OTOMATIS 24/7</span>
        <div class="title">${order.title}</div>
        <div class="price">${order.price}</div>

        <label>Email Penerima File Source Code (.ZIP):</label>
        <input type="email" id="buyerEmail" placeholder="nama@email.com (Link download dikirim otomatis ke sini)" required />

        <label>Pilih Metode Pembayaran Instan:</label>
        <div class="methods">
          <div class="method active" onclick="selectM(this)">📲 QRIS Instan</div>
          <div class="method" onclick="selectM(this)">🏦 Virtual Account</div>
          <div class="method" onclick="selectM(this)">💳 GoPay / DANA</div>
        </div>

        <button type="button" class="btn" onclick="simulatePay()">🔒 Buat Kode QRIS &amp; Unduh Source Code</button>

        <div class="success-box" id="simSuccess">
          <div style="font-size:15px; font-weight:800; color:#047857; margin-bottom:6px;">✅ Kode Pembayaran Siap!</div>
          <p style="font-size:12.5px; color:#065f46; line-height:1.5;">
            Begitu Anda menghubungkan link produk <strong>Mayar.id / Lynk.id / Tripay</strong> pada atribut <code>data-payment-url</code> di Bot Auto-Post, jendela ini otomatis menampilkan QRIS asli dan mengirimkan file <code>.ZIP</code> ke email pembeli detik itu juga!
          </p>
        </div>
      </div>
      <script>
        function selectM(el) {
          document.querySelectorAll('.method').forEach(m => m.classList.remove('active'));
          el.classList.add('active');
        }
        function simulatePay() {
          document.getElementById('simSuccess').style.display = 'block';
        }
      </script>
    </body>
    </html>
  `;
}

// ================= 7. HERO ROI CALCULATOR & STUDIO TABS =================
const ROI_DATA = {
  pos: {
    customCost: 'Rp 4.500.000',
    customTime: '⏳ Waktu: 28 Hari Kerja',
    asetPrice: 'Rp 149.000',
    savingsText: 'Anda Hemat Rp 4.351.000 (96%) & 28 Hari Coding!'
  },
  ecom: {
    customCost: 'Rp 5.800.000',
    customTime: '⏳ Waktu: 35 Hari Kerja',
    asetPrice: 'Rp 169.000',
    savingsText: 'Anda Hemat Rp 5.631.000 (97%) & 35 Hari Coding!'
  },
  saas: {
    customCost: 'Rp 2.200.000',
    customTime: '⏳ Waktu: 14 Hari Kerja',
    asetPrice: 'Rp 79.000',
    savingsText: 'Anda Hemat Rp 2.121.000 (96%) & 14 Hari Coding!'
  },
  bot: {
    customCost: 'Rp 3.000.000',
    customTime: '⏳ Waktu: 18 Hari Kerja',
    asetPrice: 'Rp 99.000',
    savingsText: 'Anda Hemat Rp 2.901.000 (96%) & 18 Hari Coding!'
  }
};

function initHeroStudioAndROI() {
  // Studio tabs
  document.querySelectorAll('.studio-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      document.querySelectorAll('.studio-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.studio-panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ROI Calculator select
  const roiSelect = document.getElementById('roiProjectSelect');
  if (roiSelect) {
    roiSelect.addEventListener('change', () => {
      const info = ROI_DATA[roiSelect.value] || ROI_DATA.pos;
      document.getElementById('roiCustomCost').textContent = info.customCost;
      document.getElementById('roiCustomTime').textContent = info.customTime;
      document.getElementById('roiAsetPrice').textContent = info.asetPrice;
      document.getElementById('roiSavingsText').textContent = info.savingsText;
    });
  }
}

// ================= 8. MODAL, THEME & TOOLBAR EVENTS =================
window.closeModal = function (id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  if (id === 'checkoutModal') {
    const iframe = document.getElementById('checkoutIframe');
    if (iframe) {
      iframe.src = 'about:blank';
      iframe.removeAttribute('srcdoc');
    }
  }
};

function initThemeToggle() {
  const saved = localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = saved === 'dark' ? '☀️ Light' : '🌙 Dark';

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_THEME_KEY, next);
      btn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeroStudioAndROI();
  loadCartFromStorage();
  renderProductsGrid();
  syncFromBloggerCloud();

  // Category chips
  document.querySelectorAll('#filterBar .filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#filterBar .filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-cat') || 'all';
      renderProductsGrid();
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value || '';
      renderProductsGrid();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortMode = e.target.value || 'newest';
      renderProductsGrid();
    });
  }

  // Viewport switcher inside Live Demo Simulator
  document.querySelectorAll('.vp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vp-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const vp = btn.getAttribute('data-vp') || '100%';
      const stage = document.getElementById('demoViewportStage');
      if (stage) stage.style.width = vp;
    });
  });

  // Bundle button
  const addBundleBtn = document.getElementById('addBundleBtn');
  if (addBundleBtn) addBundleBtn.addEventListener('click', addAllBundleToCart);

  // Cart drawer buttons
  const openCartBtn = document.getElementById('openCartBtn');
  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);

  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => closeModal('cartBackdrop'));

  const cartBackdrop = document.getElementById('cartBackdrop');
  if (cartBackdrop) cartBackdrop.addEventListener('click', () => closeModal('cartBackdrop'));

  const checkoutCartBtn = document.getElementById('checkoutCartBtn');
  if (checkoutCartBtn) {
    checkoutCartBtn.addEventListener('click', () => {
      if (!cartState.length) return;
      const totalStr = document.getElementById('cartTotalPrice').textContent;
      const titles = cartState.map((c) => c.title).join(' + ');
      closeModal('cartBackdrop');
      launchCheckoutGateway({
        title: cartState.length === 1 ? cartState[0].title : `Paket Bundling (${cartState.length} Produk)`,
        price: totalStr,
        paymentUrl: cartState.length === 1 ? cartState[0].paymentUrl : 'https://example.com/checkout/cart-bundle',
        stack: titles
      });
    });
  }

  // Close modal buttons
  const closeDemoSimBtn = document.getElementById('closeDemoSimBtn');
  if (closeDemoSimBtn) closeDemoSimBtn.addEventListener('click', () => closeModal('demoSimModal'));

  const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
  if (closeDetailModalBtn) closeDetailModalBtn.addEventListener('click', () => closeModal('detailModal'));

  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => closeModal('checkoutModal'));

  // Escape key to close any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['demoSimModal', 'detailModal', 'cartBackdrop', 'checkoutModal'].forEach(closeModal);
    }
  });
});

