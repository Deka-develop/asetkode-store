/* =========================================================
   PENGATURAN UNDANGAN PERNIKAHAN DIGITAL — ASETKODE
   Cukup edit tulisan di dalam tanda kutip '...' sesuai data Anda.
   ========================================================= */
const CONFIG = {
  // ---------- DATA MEMPELAI ----------
  panggilanPria: 'Rizky',
  namaLengkapPria: 'Rizky Pratama, S.Kom.',
  putraDari: 'Putra pertama dari Bpk. Bambang & Ibu Sri Wahyuni',
  instagramPria: 'rizkypratama', // kosongkan '' jika tidak ada
  fotoPria: 'assets/img/groom.jpg',

  panggilanWanita: 'Amanda',
  namaLengkapWanita: 'Amanda Putri, S.E.',
  putriDari: 'Putri kedua dari Bpk. Hendra & Ibu Nurhayati',
  instagramWanita: 'amandaputri',
  fotoWanita: 'assets/img/bride.jpg',

  // Foto sampul utama (banner)
  fotoHero: 'assets/img/wedding-hero.jpg',

  // ---------- AYAT / KUTIPAN ROMANTIS ----------
  kutipanAyat: '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
  sumberKutipan: 'QS. Ar-Rum: 21',

  // ---------- TANGGAL & HITUNG MUNDUR (COUNTDOWN) ----------
  // Format: YYYY-MM-DDTHH:mm:ss (contoh: '2026-12-25T08:00:00')
  tanggalTargetCountdown: '2026-12-25T08:00:00',

  // ---------- ACARA 1: AKAD NIKAH ----------
  akad: {
    hariTanggal: 'Jumat, 25 Desember 2026',
    jam: '08.00 – 10.00 WIB',
    tempat: 'Masjid Agung Syuhada Yogyakarta',
    alamat: 'Jl. I Dewa Nyoman Oka No.1, Kotabaru, Kec. Gondokusuman, Kota Yogyakarta',
    linkGoogleMaps: 'https://maps.app.goo.gl/uXfXq'
  },

  // ---------- ACARA 2: RESEPSI ----------
  resepsi: {
    hariTanggal: 'Sabtu, 26 Desember 2026',
    jam: '11.00 – 14.00 WIB',
    tempat: 'Grand Ballroom Hotel Tentrem',
    alamat: 'Jl. P. Mangkubumi No.72A, Cokrodiningratan, Kec. Jetis, Kota Yogyakarta',
    linkGoogleMaps: 'https://maps.app.goo.gl/uXfXq'
  },

  // ---------- CERITA CINTA (LOVE STORY) ----------
  loveStory: [
    { tahun: '2021', judul: 'Pertama Bertemu', cerita: 'Kami pertama kali berkenalan di sebuah seminar teknologi di kampus. Berawal dari diskusi tugas hingga akhirnya sering bertukar cerita.' },
    { tahun: '2024', judul: 'Komitmen Bersama', cerita: 'Setelah saling mengenal dan melewati berbagai proses pendewasaan, kami bersepakat melangkah ke jenjang yang lebih serius dengan restu kedua orang tua.' },
    { tahun: '2026', judul: 'Menuju Pelaminan', cerita: 'Dengan niat ibadah dan mengharap ridho Allah SWT, kami mengikat janji suci pernikahan untuk memulai babak baru perjalanan hidup bersama.' }
  ],

  // ---------- GALERI FOTO PREWEDDING ----------
  galeri: [
    { gambar: 'assets/img/wedding-hero.jpg', caption: 'Kebersamaan Kami' },
    { gambar: 'assets/img/groom.jpg', caption: 'Mempelai Pria' },
    { gambar: 'assets/img/bride.jpg', caption: 'Mempelai Wanita' },
    { gambar: 'assets/img/gallery-rings.jpg', caption: 'Janji Suci' }
  ],

  // ---------- AMPLOP DIGITAL / TANDA KASIH (REKENING & KADO) ----------
  amplopDigital: {
    aktif: true,
    deskripsi: 'Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara digital, Anda dapat melalui:',
    rekening: [
      { bank: 'BCA', noRekening: '1234567890', atasNama: 'Rizky Pratama' },
      { bank: 'Bank Mandiri', noRekening: '0987654321123', atasNama: 'Amanda Putri' },
      { bank: 'DANA / GoPay', noRekening: '081234567890', atasNama: 'Rizky Pratama' }
    ],
    alamatKirimKado: 'Penerima: Amanda & Rizky, Jl. Kaliurang KM 5, Gg. Megatruh No. 12, Depok, Sleman, DI Yogyakarta 55281'
  },

  // ---------- KONFIRMASI KEHADIRAN (RSVP) VIA WHATSAPP ----------
  rsvpWhatsapp: '6281234567890', // Awali 62, tanpa + dan tanpa 0

  // ---------- MUSIK LATAR (BACKGROUND AUDIO) ----------
  // Anda bisa mengganti URL lagu ini dengan file MP3 lain
  musikMp3: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112199.mp3',

  // ---------- TEMA WARNA ----------
  warnaAksen: '#8c6b4e' // Warna nuansa earth tone / champagne gold elegan
};

