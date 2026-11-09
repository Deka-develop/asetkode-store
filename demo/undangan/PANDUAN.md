# Panduan Penggunaan — Template Undangan Pernikahan Digital

Terima kasih telah membeli template undangan pernikahan digital dari **AsetKode**!
Template ini dibuat khusus agar **mudah disesuaikan tanpa perlu keahlian coding sama sekali**.

---

## 📂 Struktur File

```
undangan-pernikahan/
├── index.html          ← Halaman utama undangan
├── config.js           ← ✏️ EDIT FILE INI SAJA (Cukup ubah data di sini)
├── assets/
│   ├── css/style.css   ← Tampilan & desain elegan
│   ├── js/main.js      ← Musik, hitung mundur, salin no rek, RSVP WhatsApp
│   └── img/            ← Foto mempelai & galeri
├── PANDUAN.md
└── LISENSI.txt
```

---

## ✨ Fitur Utama

1. **Cover Sampul Personal**: Menampilkan nama tamu secara otomatis dari URL (misal: `link-anda.com/?to=Budi+Santoso`).
2. **Tombol "Buka Undangan"**: Membuka amplop sampul dengan animasi halus dan langsung memutar lagu romantis otomatis.
3. **Floating Music Player**: Ikon piringan hitam berputar yang bisa ditekan untuk jeda (pause) / putar musik.
4. **Hitung Mundur (Countdown Timer)**: Real-time menghitung hari, jam, menit, dan detik menuju akad / resepsi.
5. **Profil Mempelai & Kutipan Romantis**: Lengkap dengan nama orang tua dan link Instagram.
6. **Rangkaian Acara & Petunjuk Arah**: Jadwal Akad & Resepsi lengkap dengan tombol langsung ke Google Maps.
7. **Kisah Cinta (Love Story)**: Timeline perjalanan cinta kedua mempelai.
8. **Galeri Foto Prewedding**: Grid foto modern dan estetik.
9. **Amplop Digital (Wedding Gift)**: Kartu rekening BCA, Mandiri, BRI, DANA, GoPay dengan **1-klik tombol Salin No Rekening** (disertai notifikasi berhasil salin).
10. **RSVP & Buku Doa**: Form konfirmasi kehadiran yang langsung terhubung ke WhatsApp mempelai dan menyimpan ucapan doa ke papan ucapan.

---

## 🚀 Cara Menyesuaikan Undangan (Hanya 3 Menit)

### Langkah 1: Buka `config.js`
Klik kanan pada file `config.js` → Pilih **Open with** → **Notepad** (atau text editor favorit Anda seperti VS Code).

### Langkah 2: Ubah Data Mempelai
Ganti tulisan di dalam tanda kutip `'...'` sesuai data pernikahan Anda:
```javascript
panggilanPria: 'Rizky',
namaLengkapPria: 'Rizky Pratama, S.Kom.',
putraDari: 'Putra pertama dari Bpk. Bambang & Ibu Sri Wahyuni',
instagramPria: 'rizkypratama',

panggilanWanita: 'Amanda',
namaLengkapWanita: 'Amanda Putri, S.E.',
putriDari: 'Putri kedua dari Bpk. Hendra & Ibu Nurhayati',
instagramWanita: 'amandaputri',
```

### Langkah 3: Ubah Tanggal & Jam Acara
Atur target hitung mundur dan detail acara:
```javascript
tanggalTargetCountdown: '2026-12-25T08:00:00', // Format: YYYY-MM-DDTHH:mm:ss

akad: {
  hariTanggal: 'Jumat, 25 Desember 2026',
  jam: '08.00 – 10.00 WIB',
  tempat: 'Masjid Agung Syuhada Yogyakarta',
  alamat: 'Jl. I Dewa Nyoman Oka No.1, Kotabaru, Yogyakarta',
  linkGoogleMaps: 'https://maps.app.goo.gl/...'
},
```

### Langkah 4: Ubah Rekening Amplop Digital
Masukkan nomor rekening Anda untuk menerima kado transfer:
```javascript
rekening: [
  { bank: 'BCA', noRekening: '1234567890', atasNama: 'Rizky Pratama' },
  { bank: 'Bank Mandiri', noRekening: '0987654321123', atasNama: 'Amanda Putri' }
],
```

### Langkah 5: Ganti Foto
Cukup masukkan foto Anda ke folder `assets/img/` dengan nama yang sama:
- `wedding-hero.jpg` (Foto berdua / cover sampul)
- `groom.jpg` (Foto mempelai pria)
- `bride.jpg` (Foto mempelai wanita)
- `gallery-rings.jpg` (Foto cincin / detail)

Simpan file (Ctrl + S), lalu buka `index.html` di browser Anda untuk melihat hasilnya!

---

## 🌐 Cara Membagikan Undangan dengan Nama Tamu Berbeda

Setelah website di-upload online (misal di `https://pernikahan-rizky-amanda.netlify.app`):
Cukup tambahkan `?to=Nama+Tamu` di ujung link Anda:

Contoh:
- `https://pernikahan-rizky-amanda.netlify.app/?to=Budi+Santoso`
- `https://pernikahan-rizky-amanda.netlify.app/?to=Keluarga+Bpk.+Joko`
- `https://pernikahan-rizky-amanda.netlify.app/?to=Sahabat+Kantor+PT+Maju`

Nama tamu pada layar sampul akan otomatis berubah sesuai link yang Anda kirim!

---

## ☁️ Cara Upload Online (100% Gratis)

1. Buka [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Tarik (drag & drop) seluruh folder `undangan-pernikahan` ke halaman tersebut.
3. Tunggu 10 detik, undangan digital Anda langsung aktif dan memiliki link resmi yang bisa disebarkan ke WhatsApp!

---

## 📞 Bantuan & Layanan
Jika ada kendala dalam pengaturan, silakan hubungi kami melalui kontak resmi **AsetKode**.
