/* =========================================================
   KONFIGURASI TOKO — CUKUP EDIT FILE INI SAJA
   Ganti teks di dalam tanda kutip '...' sesuai usaha Anda.
   Simpan file, lalu refresh browser. Selesai!
   ========================================================= */
const CONFIG = {
  // ---------- IDENTITAS USAHA ----------
  namaUsaha: 'Kopi Senja',
  tagline: 'Kopi lokal, rasa juara',
  deskripsiHero: 'Racikan kopi nusantara dari biji pilihan petani lokal. Diseduh segar setiap hari, siap menemani kerja, kuliah, dan obrolan santai Anda.',
  tahunBerdiri: 2021,

  // ---------- KONTAK ----------
  // Nomor WhatsApp: awali dengan 62 (tanpa 0 dan tanpa +)
  whatsapp: '6281234567890',
  pesanWhatsapp: 'Halo {nama}, saya mau pesan:',
  email: 'halo@kopisenja.id',
  instagram: 'kopisenja.id',      // tanpa @
  tiktok: 'kopisenja.id',         // tanpa @, kosongkan '' jika tidak ada
  alamat: 'Jl. Malioboro No. 17, Yogyakarta',
  jamBuka: 'Setiap hari, 08.00 – 22.00 WIB',
  // Link embed Google Maps: buka Google Maps > Bagikan > Sematkan peta > salin URL di dalam src="..."
  mapsEmbed: 'https://www.google.com/maps?q=Malioboro+Yogyakarta&output=embed',

  // ---------- ANGKA STATISTIK ----------
  statistik: [
    { angka: 12000, akhiran: '+', label: 'Cangkir terjual' },
    { angka: 4.9,   akhiran: '/5', label: 'Rating pelanggan' },
    { angka: 15,    akhiran: '+', label: 'Varian menu' }
  ],

  // ---------- KEUNGGULAN ----------
  keunggulan: [
    { ikon: 'leaf',  judul: 'Biji Kopi Lokal', teks: 'Langsung dari petani Gayo, Toraja, dan Kintamani.' },
    { ikon: 'flame', judul: 'Diseduh Segar',   teks: 'Setiap pesanan dibuat saat itu juga, bukan stok lama.' },
    { ikon: 'truck', judul: 'Bisa Diantar',    teks: 'Pesan via WhatsApp, kami antar ke lokasi Anda.' },
    { ikon: 'tag',   judul: 'Harga Bersahabat',teks: 'Mulai Rp 12 ribuan, cocok untuk kantong pelajar.' }
  ],

  // ---------- MENU / PRODUK ----------
  // kategori dipakai untuk tombol filter. label boleh: 'Terlaris', 'Baru', atau '' (kosong)
  menu: [
    { nama: 'Es Kopi Susu Gula Aren', harga: 18000, kategori: 'Kopi',    gambar: 'assets/img/menu-1.jpg', label: 'Terlaris', deskripsi: 'Espresso, susu segar, dan gula aren asli.' },
    { nama: 'Cappuccino Panas',       harga: 22000, kategori: 'Kopi',    gambar: 'assets/img/menu-2.jpg', label: '',         deskripsi: 'Foam lembut dengan latte art cantik.' },
    { nama: 'Pisang Goreng Keju Coklat', harga: 15000, kategori: 'Camilan', gambar: 'assets/img/menu-3.jpg', label: 'Baru', deskripsi: 'Pisang kepok renyah, topping melimpah.' },
    { nama: 'Kopi Tubruk Gayo',       harga: 12000, kategori: 'Kopi',    gambar: 'assets/img/menu-2.jpg', label: '',         deskripsi: 'Seduhan tradisional, kuat dan harum.' },
    { nama: 'Matcha Latte',           harga: 20000, kategori: 'Non-Kopi',gambar: 'assets/img/menu-1.jpg', label: '',         deskripsi: 'Matcha premium dengan susu creamy.' },
    { nama: 'Roti Bakar Srikaya',     harga: 14000, kategori: 'Camilan', gambar: 'assets/img/menu-3.jpg', label: '',         deskripsi: 'Roti tebal, srikaya homemade.' }
  ],

  // ---------- TESTIMONI ----------
  testimoni: [
    { nama: 'Rina A.',  peran: 'Mahasiswi UGM',      bintang: 5, teks: 'Es kopi susunya juara! Manisnya pas, harganya ramah buat mahasiswa.' },
    { nama: 'Budi S.',  peran: 'Pekerja kantoran',   bintang: 5, teks: 'Langganan pesan antar tiap pagi. Selalu tepat waktu dan masih dingin.' },
    { nama: 'Dewi P.',  peran: 'Content creator',    bintang: 5, teks: 'Tempatnya estetik, WiFi kencang. Betah kerja di sini berjam-jam.' }
  ],

  // ---------- FAQ ----------
  faq: [
    { tanya: 'Bagaimana cara memesan?', jawab: 'Klik tombol "Pesan" pada menu atau tombol WhatsApp. Pesanan Anda langsung terkirim ke admin kami.' },
    { tanya: 'Apakah bisa diantar?', jawab: 'Bisa. Kami melayani pengantaran radius 5 km, atau melalui GoFood / GrabFood.' },
    { tanya: 'Metode pembayaran apa saja?', jawab: 'Tunai, QRIS, transfer bank, DANA, OVO, dan GoPay.' },
    { tanya: 'Apakah menerima pesanan untuk acara?', jawab: 'Ya, kami menerima pesanan untuk rapat, arisan, dan acara kantor. Hubungi kami minimal H-1.' }
  ],

  // ---------- TAMPILAN ----------
  // Warna utama (format HEX). Contoh lain: '#2563eb' biru, '#16a34a' hijau, '#db2777' pink
  warnaUtama: '#c2410c',
  mataUang: 'Rp'
};

