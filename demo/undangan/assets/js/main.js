/* =========================================================
   LOGIKA UNDANGAN PERNIKAHAN DIGITAL ELEGAN — ASETKODE
   Semua data dinamis diambil otomatis dari config.js
   ========================================================= */

(function () {
  'use strict';
  const C = typeof CONFIG !== 'undefined' ? CONFIG : (window.CONFIG || {});
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- TAMPILKAN NAMA TAMU DARI URL (?to=Nama+Tamu) ---------- */
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuest = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest') || 'Tamu Undangan';
  const cleanGuest = esc(rawGuest.replace(/\+/g, ' '));
  $('#guestName').textContent = cleanGuest;

  /* ---------- BIND DATA MEMPELAI & TEKS ---------- */
  if (C.warnaAksen) {
    document.documentElement.style.setProperty('--primary', C.warnaAksen);
  }

  $('#coverPria').textContent = C.panggilanPria || '';
  $('#coverWanita').textContent = C.panggilanWanita || '';
  $('#heroPria').textContent = C.panggilanPria || '';
  $('#heroWanita').textContent = C.panggilanWanita || '';
  $('#footPria').textContent = C.panggilanPria || '';
  $('#footWanita').textContent = C.panggilanWanita || '';

  if (C.panggilanPria && C.panggilanWanita) {
    document.title = `The Wedding of ${C.panggilanPria} & ${C.panggilanWanita}`;
  }
  if (C.fotoHero && $('#heroCoupleImg')) {
    $('#heroCoupleImg').src = C.fotoHero;
  }
  if ($('#saveCalBtn')) {
    const title = encodeURIComponent(`Pernikahan ${C.panggilanPria || ''} & ${C.panggilanWanita || ''}`);
    const loc = encodeURIComponent((C.resepsi && C.resepsi.tempat ? C.resepsi.tempat + ', ' : '') + ((C.resepsi && C.resepsi.alamat) || ''));
    const dt = (C.tanggalTargetCountdown || '2026-12-25T08:00:00').replace(/[-:]/g, '');
    $('#saveCalBtn').href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dt}/${dt}&location=${loc}`;
  }

  $('#quoteText').textContent = C.kutipanAyat || '';
  $('#quoteSource').textContent = C.sumberKutipan || '';

  // Mempelai Pria
  $('#fullNamePria').textContent = C.namaLengkapPria || '';
  $('#parentsPria').textContent = C.putraDari || '';
  if (C.fotoPria) $('#avatarPria').src = C.fotoPria;
  if (C.instagramPria) {
    $('#socialPriaWrap').innerHTML = `<a href="https://instagram.com/${esc(C.instagramPria)}" target="_blank" rel="noopener" class="btn-ig">@${esc(C.instagramPria)}</a>`;
  }

  // Mempelai Wanita
  $('#fullNameWanita').textContent = C.namaLengkapWanita || '';
  $('#parentsWanita').textContent = C.putriDari || '';
  if (C.fotoWanita) $('#avatarWanita').src = C.fotoWanita;
  if (C.instagramWanita) {
    $('#socialWanitaWrap').innerHTML = `<a href="https://instagram.com/${esc(C.instagramWanita)}" target="_blank" rel="noopener" class="btn-ig">@${esc(C.instagramWanita)}</a>`;
  }

  // Data Acara Akad
  if (C.akad) {
    $('#akadHariTanggal').textContent = C.akad.hariTanggal || '';
    $('#akadJam').textContent = C.akad.jam || '';
    $('#akadTempat').textContent = C.akad.tempat || '';
    $('#akadAlamat').textContent = C.akad.alamat || '';
    if (C.akad.linkGoogleMaps) $('#akadMapsBtn').href = C.akad.linkGoogleMaps;
  }

  // Data Acara Resepsi
  if (C.resepsi) {
    $('#resepsiHariTanggal').textContent = C.resepsi.hariTanggal || '';
    $('#resepsiJam').textContent = C.resepsi.jam || '';
    $('#resepsiTempat').textContent = C.resepsi.tempat || '';
    $('#resepsiAlamat').textContent = C.resepsi.alamat || '';
    if (C.resepsi.linkGoogleMaps) $('#resepsiMapsBtn').href = C.resepsi.linkGoogleMaps;
  }

  /* ---------- LOVE STORY TIMELINE ---------- */
  const timeline = $('#storyTimeline');
  if (C.loveStory && C.loveStory.length > 0) {
    timeline.innerHTML = C.loveStory.map((item) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">${esc(item.tahun)}</span>
          <h4>${esc(item.judul)}</h4>
          <p>${esc(item.cerita)}</p>
        </div>
      </div>
    `).join('');
  } else {
    $('#storySection')?.remove();
  }

  /* ---------- GALERI FOTO ---------- */
  const gallery = $('#galleryGrid');
  if (C.galeri && C.galeri.length > 0) {
    gallery.innerHTML = C.galeri.map((g) => `
      <div class="gallery-card">
        <img src="${esc(g.gambar)}" alt="${esc(g.caption || 'Momen Bahagia')}" loading="lazy">
        ${g.caption ? `<div class="gallery-caption">${esc(g.caption)}</div>` : ''}
      </div>
    `).join('');
  }

  /* ---------- AMPLOP DIGITAL (REKENING & KADO) ---------- */
  if (C.amplopDigital && C.amplopDigital.aktif) {
    $('#giftDesc').textContent = C.amplopDigital.deskripsi || '';
    const cardsGrid = $('#bankCardsGrid');
    cardsGrid.innerHTML = (C.amplopDigital.rekening || []).map((rek) => `
      <div class="bank-card">
        <div class="bank-info">
          <span>${esc(rek.bank)}</span>
          <strong>${esc(rek.noRekening)}</strong>
          <small>a.n ${esc(rek.atasNama)}</small>
        </div>
        <button class="btn-copy js-copy-rek" data-rek="${esc(rek.noRekening)}">
          <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Salin No. Rek</span>
        </button>
      </div>
    `).join('');

    if (C.amplopDigital.alamatKirimKado) {
      $('#giftPhysicalAddress').textContent = C.amplopDigital.alamatKirimKado;
    } else {
      $('#giftAddressBox')?.remove();
    }
  } else {
    $('#giftSection')?.remove();
  }

  /* ---------- COPY CLIPBOARD WITH TOAST ---------- */
  const toast = $('#copyToast');
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-copy-rek');
    if (!btn) return;
    const num = btn.dataset.rek;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(num).then(() => showToast(`Nomor rekening ${num} berhasil disalin!`));
    } else {
      const ta = document.createElement('textarea');
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(`Nomor rekening ${num} berhasil disalin!`);
    }
  });

  /* ---------- COUNTDOWN TIMER ---------- */
  const cdDays = $('#cdDays');
  const cdHours = $('#cdHours');
  const cdMinutes = $('#cdMinutes');
  const cdSeconds = $('#cdSeconds');

  function updateCountdown() {
    const target = new Date(C.tanggalTargetCountdown || '2026-12-25T08:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = String(d).padStart(2, '0');
    cdHours.textContent = String(h).padStart(2, '0');
    cdMinutes.textContent = String(m).padStart(2, '0');
    cdSeconds.textContent = String(s).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- AUDIO BACKGROUND & BUKA UNDANGAN ---------- */
  const audio = $('#weddingAudio');
  const musicBtn = $('#musicToggleBtn');
  let isPlaying = false;

  if (C.musikMp3) {
    audio.src = C.musikMp3;
  }

  function playMusic() {
    if (!audio.src) return;
    audio.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
    }).catch(() => {
      isPlaying = false;
      musicBtn.classList.remove('playing');
    });
  }

  function toggleMusic() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicBtn.classList.remove('playing');
    } else {
      playMusic();
    }
  }

  musicBtn.addEventListener('click', toggleMusic);

  const cover = $('#coverOverlay');
  $('#openInvitationBtn').addEventListener('click', () => {
    cover.classList.add('opened');
    document.body.classList.remove('locked');
    playMusic();
  });

  /* ---------- RSVP & WISHES (WHATSAPP + LOCAL STORAGE) ---------- */
  const defaultWishes = [
    { nama: 'Budi Santoso & Keluarga', status: 'Hadir', doa: 'Barakallahu lakuma wa baraka alaika wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru Rizky & Amanda!' },
    { nama: 'Dini Rahmawati', status: 'Hadir', doa: 'Selamat ya Amanda sahabatku tersayang! Semoga menjadi keluarga yang sakinah mawaddah warahmah, aamiin ya rabbal alamin.' },
    { nama: 'Hendra & Partner', status: 'Ragu-ragu', doa: 'Happy wedding bro Rizky! Semoga acaranya lancar sampai hari H. Doa terbaik buat kalian berdua.' }
  ];

  const savedWishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
  const allWishes = [...savedWishes, ...defaultWishes];

  const wishesContainer = $('#wishesList');
  function renderWishes() {
    wishesContainer.innerHTML = allWishes.map((w) => `
      <div class="wish-item">
        <div class="wish-header">
          <span class="wish-author">${esc(w.nama)}</span>
          <span class="wish-status">${esc(w.status)}</span>
        </div>
        <p class="wish-message">${esc(w.doa)}</p>
      </div>
    `).join('');
  }
  renderWishes();

  $('#rsvpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#rsvpName').value.trim();
    const attendance = $('#rsvpAttendance').value;
    const pax = $('#rsvpPax').value;
    const message = $('#rsvpMessage').value.trim();

    if (!name || !message) return;

    // Simpan ke daftar ucapan lokal
    const newWish = { nama: name, status: attendance, doa: message };
    savedWishes.unshift(newWish);
    allWishes.unshift(newWish);
    localStorage.setItem('wedding-wishes', JSON.stringify(savedWishes));
    renderWishes();

    // Buat pesan WhatsApp
    const waText = `Halo ${C.panggilanPria || 'Mempelai'} & ${C.panggilanWanita || 'Mempelai'}, saya ingin konfirmasi kehadiran:\n\n` +
      `👤 *Nama:* ${name}\n` +
      `💌 *Kehadiran:* ${attendance}\n` +
      `👥 *Jumlah Tamu:* ${pax}\n` +
      `💬 *Doa / Ucapan:* "${message}"\n\n` +
      `Terima kasih atas undangannya!`;

    const waNumber = C.rsvpWhatsapp || '6281234567890';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');
    $('#rsvpForm').reset();
    showToast('Konfirmasi Anda berhasil dikirim!');
  });

  /* ---------- LIGHTBOX GALERI FOTO ---------- */
  const lb = $('#galleryLightbox');
  const lbImg = $('#lightboxImg');
  const lbCap = $('#lightboxCaption');
  const lbClose = $('#lightboxClose');
  if (lb && gallery) {
    gallery.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (!card) return;
      const img = card.querySelector('img');
      const cap = card.querySelector('.gallery-caption');
      if (img) {
        lbImg.src = img.src;
        lbCap.textContent = cap ? cap.textContent : '';
        lb.classList.add('open');
      }
    });
    const closeLb = () => lb.classList.remove('open');
    lbClose?.addEventListener('click', closeLb);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  }

  /* ---------- SCROLL REVEAL HALUS ---------- */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.section').forEach((sec) => {
      sec.classList.add('reveal-sec');
      obs.observe(sec);
    });
  }

})();

