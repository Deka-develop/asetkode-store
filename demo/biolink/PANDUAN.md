# Panduan Penggunaan — Template Bio Link & Mini Portfolio

Terima kasih telah memilih template **Bio Link & Mini Portfolio** dari **AsetKode**!
Template ini adalah solusi mandiri (self-hosted) modern sebagai alternatif Linktree tanpa biaya langganan bulanan ($0 selamanya).

---

## 📂 Struktur File

```
bio-link-portfolio/
├── index.html          ← Halaman utama bio link
├── config.js           ← ✏️ EDIT FILE INI SAJA (Cukup ubah data profil & link di sini)
├── assets/
│   ├── css/style.css   ← Desain Glassmorphism & Cyber-Dark yang modern
│   ├── js/main.js      ← Generator vCard, share sheet, dark/light mode toggle
│   └── img/            ← Foto profil & preview proyek
├── PANDUAN.md
└── LISENSI.txt
```

---

## ✨ Fitur Unggulan

1. **Hemat Biaya Langganan**: Linktree mengenakan biaya \$5 – \$24/bulan. Dengan template ini, Anda beli sekali (Rp 35rb), bebas biaya bulanan selamanya!
2. **Kustomisasi 1 File (`config.js`)**: Tidak perlu mengerti HTML/CSS. Cukup buka Notepad dan ganti teks.
3. **Simpan Kontak Otomatis (.vcf)**: Pengunjung bisa mendownload kontak Anda langsung ke buku telepon smartphone dengan 1 klik!
4. **Dark / Light Mode**: Dilengkapi tombol ganti tema gelap dan terang dengan animasi halus.
5. **Showcase Mini Portfolio**: Pajang hasil karya, studi kasus desain, atau aplikasi yang pernah Anda buat.
6. **Social Bar Lengkap**: Mendukung Instagram, GitHub, LinkedIn, TikTok, YouTube, Twitter/X, WhatsApp, dan Email.
7. **Status Ketersediaan**: Menampilkan badge "🟢 Tersedia untuk proyek freelance & konsultasi".
8. **Native Mobile Share**: Terhubung langsung ke tombol share di sistem operasi smartphone.

---

## 🚀 Cara Menyesuaikan Profil (3 Menit)

### Langkah 1: Buka `config.js`
Klik kanan pada file `config.js` → Pilih **Open with** → **Notepad** (atau text editor pilihan Anda).

### Langkah 2: Ubah Biodata & Media Sosial
Ganti teks di dalam tanda kutip `'...'`:
```javascript
nama: 'Nama Anda',
handle: '@username.anda',
profesi: 'Kreator Konten / Web Developer',
bio: 'Membantu UMKM dan kreator go-digital...',

sosial: {
  github: 'https://github.com/...',
  instagram: 'https://instagram.com/...',
  whatsapp: 'https://wa.me/6281234567890?text=Halo...',
  email: 'email@anda.com'
}
```

### Langkah 3: Tambah / Hapus Tautan
Atur tautan utama Anda pada bagian `links`:
```javascript
{
  judul: 'Katalog Produk Saya',
  deskripsi: 'Lihat koleksi produk terbaru diskon 20%',
  url: 'https://shopee.co.id/...',
  ikon: 'briefcase', // Pilihan ikon: briefcase, chat, download, coffee, globe, star
  badge: 'Promo',
  highlight: true // true: memberi efek kilau bercahaya
}
```

### Langkah 4: Ganti Foto Profil & Proyek
Ganti file foto di dalam folder `assets/img/`:
- `avatar.jpg`: Foto profil Anda (rasio 1:1 / kotak)
- `project-1.jpg` & `project-2.jpg`: Screenshot proyek atau produk Anda

Simpan file (Ctrl + S), lalu buka `index.html` di browser Anda!

---

## 🌐 Cara Online-kan Secara Gratis (Domain Pribadi atau Gratisan)

### Cara Paling Mudah: Netlify Drop (1 Menit)
1. Buka [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop folder `bio-link-portfolio` ke layar browser Anda.
3. Website Anda langsung online dengan link resmi yang bisa Anda pasang di bio Instagram, TikTok, atau Twitter!

### Pakai GitHub Pages (Gratis Selamanya):
1. Buat repository baru di GitHub bernama `biolink`.
2. Upload semua file dari folder ini ke GitHub.
3. Buka **Settings** → **Pages** → Branch: `main` → Klik **Save**.
4. Website aktif di `https://username.github.io/biolink/`.

---

## 📞 Bantuan
Jika membutuhkan bantuan kustomisasi atau pertanyaan lain, hubungi admin **AsetKode**.

