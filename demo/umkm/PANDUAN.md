# Panduan Instalasi — Landing Page UMKM

Terima kasih telah membeli template ini dari **AsetKode**!
Template ini bisa dipakai untuk kedai kopi, warung makan, toko kue, laundry, barbershop, butik, dan usaha lainnya.

---

## Isi Paket

```
landing-page-umkm/
├── index.html          ← halaman utama
├── config.js           ← ✏️ EDIT FILE INI SAJA
├── assets/
│   ├── css/style.css   ← tampilan
│   ├── js/main.js      ← logika (tidak perlu diedit)
│   └── img/            ← foto (ganti dengan foto usaha Anda)
├── PANDUAN.md
└── LISENSI.txt
```

## Fitur

- Pesan langsung lewat **WhatsApp**, pesan otomatis berisi nama menu & harga
- **Edit satu file saja** (`config.js`), tidak perlu bisa coding
- Responsif: tampil rapi di HP, tablet, dan laptop
- **Mode gelap/terang** otomatis
- Filter menu per kategori
- Bagian testimoni, FAQ, Google Maps, dan tombol WhatsApp melayang
- Ganti warna tema cukup dengan 1 baris
- Ringan & cepat, tanpa framework, siap SEO

---

## Langkah 1 — Lihat Template

Ekstrak file `.zip`, lalu klik dua kali `index.html`. Halaman akan terbuka di browser.

## Langkah 2 — Ubah Data Usaha

1. Buka `config.js` dengan **Notepad** (klik kanan → *Open with* → Notepad), atau dengan VS Code.
2. Ganti teks di dalam tanda kutip `'...'`. Contoh:
   ```js
   namaUsaha: 'Warung Bu Siti',
   whatsapp: '6285712345678',   // awali 62, tanpa 0 dan tanpa +
   ```
3. Simpan (Ctrl+S), lalu refresh browser (F5).

> ⚠️ Jangan menghapus tanda kutip `'`, koma `,`, atau kurung `{ } [ ]`. Kalau halaman jadi kosong, berarti ada tanda yang terhapus.

### Menambah / menghapus menu
Salin satu baris menu, lalu ubah isinya:
```js
{ nama: 'Nasi Goreng Spesial', harga: 20000, kategori: 'Makanan', gambar: 'assets/img/nasgor.jpg', label: 'Baru', deskripsi: 'Pedas gurih dengan telur.' },
```
Tombol filter kategori akan muncul otomatis.

### Mengganti warna
```js
warnaUtama: '#2563eb',   // biru
```
Cari warna lain di https://htmlcolorcodes.com

### Ikon keunggulan yang tersedia
`leaf`, `flame`, `truck`, `tag`, `star`, `heart`, `clock`, `shield`

### Mengganti peta lokasi
Google Maps → cari lokasi Anda → **Bagikan** → **Sematkan peta** → salin URL di dalam `src="..."` → tempel ke `mapsEmbed`.

## Langkah 3 — Ganti Foto

Taruh foto Anda di folder `assets/img/`. Paling mudah: beri nama yang **sama persis** dengan file lama (`hero.jpg`, `about.jpg`, `menu-1.jpg`, dst.) supaya file lama tertimpa.
Tips: kecilkan ukuran foto di https://squoosh.app (maks. ~300 KB per foto) supaya web cepat dibuka.

Teks di bagian **Cerita Kami** bisa diubah langsung di `index.html` (cari tulisan "Cerita Kami").

---

## Langkah 4 — Online-kan Website (GRATIS)

### Cara A: Netlify Drop (paling mudah, ±2 menit)
1. Buka https://app.netlify.com/drop
2. Seret (drag) **folder** `landing-page-umkm` ke halaman tersebut.
3. Selesai! Anda langsung mendapat link seperti `https://kopi-senja.netlify.app`.
   (Buat akun gratis supaya website tidak terhapus dan namanya bisa diganti.)

### Cara B: GitHub Pages
1. Buat repository baru di https://github.com, lalu upload semua file.
2. **Settings → Pages → Branch: main → Save.**
3. Website online di `https://username.github.io/nama-repo`.

### Pakai domain sendiri (opsional)
Beli domain `.com` / `.id` / `.my.id` (mulai ±Rp 15 rb/tahun untuk `.my.id`), lalu hubungkan lewat menu *Domain settings* di Netlify.

---

## Bantuan

Ada kendala? Hubungi kami lewat halaman kontak di toko **AsetKode**. Sertakan bukti pembelian.

