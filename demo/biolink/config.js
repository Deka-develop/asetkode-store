/* =========================================================
   PENGATURAN BIO LINK & MINI PORTFOLIO — ASETKODE
   Cukup edit tulisan di dalam tanda kutip '...' sesuai profil Anda.
   ========================================================= */
const CONFIG = {
  // ---------- PROFIL UTAMA ----------
  nama: 'Alex Pratama',
  handle: '@alexpratama.dev',
  profesi: 'Fullstack Developer & UI/UX Designer',
  bio: 'Membantu bisnis dan startup membangun produk digital yang cepat, indah, dan fungsional. Berbasis di Jakarta, Indonesia.',
  avatar: 'assets/img/avatar.jpg',
  lokasi: 'Jakarta, Indonesia',
  statusTersedia: true, // true: Tampilkan badge "🟢 Tersedia untuk Proyek", false: matikan
  teksStatus: 'Tersedia untuk proyek freelance & konsultasi',

  // ---------- SOSIAL MEDIA UTAMA (Ikon di bawah profil) ----------
  sosial: {
    github: 'https://github.com/alexpratama',
    instagram: 'https://instagram.com/alexpratama.dev',
    linkedin: 'https://linkedin.com/in/alexpratama',
    tiktok: 'https://tiktok.com/@alexpratama.tech',
    youtube: 'https://youtube.com/@alexpratama',
    twitter: 'https://x.com/alexpratama',
    whatsapp: 'https://wa.me/6281234567890?text=Halo%20Alex,%20saya%20tertarik%20bekerja%20sama',
    email: 'alexpratama.dev@gmail.com'
  },

  // ---------- LINK UTAMA / TAUTAN CEPAT ----------
  // badge: 'Baru', 'Populer', 'Diskon', atau '' (kosong)
  // highlight: true jika ingin diberi animasi kilau / border menyala
  links: [
    {
      judul: 'Lihat Portofolio Lengkap (Case Study)',
      deskripsi: 'Proyek web & mobile app yang pernah saya kerjakan',
      url: '#portfolioSection',
      ikon: 'briefcase',
      badge: 'Utama',
      highlight: true
    },
    {
      judul: 'Konsultasi 1-on-1 via WhatsApp',
      deskripsi: 'Diskusi ide aplikasi atau website untuk bisnis Anda',
      url: 'https://wa.me/6281234567890?text=Halo%20Alex,%20saya%20mau%20konsultasi%20pembuatan%20website',
      ikon: 'chat',
      badge: '',
      highlight: false
    },
    {
      judul: 'Download CV & Resume (PDF)',
      deskripsi: 'Ringkasan pengalaman kerja dan skill teknologi',
      url: '#',
      ikon: 'download',
      badge: 'PDF',
      highlight: false
    },
    {
      judul: 'Dukung Karya Saya di Saweria / Trakteer',
      deskripsi: 'Traktir kopi untuk konten edukasi coding gratis',
      url: 'https://saweria.co',
      ikon: 'coffee',
      badge: 'Tip',
      highlight: false
    }
  ],

  // ---------- MINI PORTOFOLIO / SHOWCASE PROYEK ----------
  proyek: [
    {
      judul: 'Kopi Nusantara E-Commerce & POS',
      deskripsi: 'Aplikasi kasir dan katalog toko online responsif dengan integrasi QRIS.',
      gambar: 'assets/img/project-1.jpg',
      tags: ['Vue.js', 'Tailwind', 'Node.js'],
      demoUrl: 'https://demo.example.com'
    },
    {
      judul: 'SaaS Analytics & Admin Dashboard',
      deskripsi: 'Dashboard pemantauan transaksi real-time dan analisis penjualan.',
      gambar: 'assets/img/project-2.jpg',
      tags: ['React', 'Next.js', 'Chart.js'],
      demoUrl: 'https://demo.example.com'
    }
  ],

  // ---------- KONTAK V-CARD (.vcf) ----------
  // Memungkinkan pengunjung menyimpan nomor kontak Anda langsung ke buku telepon HP
  vcard: {
    namaLengkap: 'Alex Pratama',
    organisasi: 'Alex Creative Studio',
    telepon: '+6281234567890',
    email: 'alexpratama.dev@gmail.com',
    website: 'https://alexpratama.dev'
  },

  // ---------- TEMA & TAMPILAN ----------
  // Pilihan tema bawaan: 'dark-neon' (gelap modern), 'light-minimal' (bersih), atau 'glass'
  temaDefault: 'dark-neon',
  warnaAksen: '#10b981' // Hijau emerald modern
};

