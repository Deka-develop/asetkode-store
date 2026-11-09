# 🚀 Panduan Kolaborasi GitHub Pages × Blogger Cloud API (`AsetKode Pro Storefront`)

Arsitektur **Headless Storefront (GitHub Pages + Blogger API)** ini memisahkan **Tampilan Depan (Frontend)** dari **Database Konten (Backend CMS)** sehingga Anda mendapatkan kombinasi terbaik dari keduanya:

1. **GitHub Pages (`github-storefront/`) sebagai Tampilan Toko Utama:**
   - **100% Bebas Batasan XML Blogger:** Tidak ada lagi `<b:skin>` yang kaku, widget bawaan Blogger yang mengganggu, atau struktur HTML yang dibatasi.
   - **Desain Setara SaaS & Marketplace Internasional (Gumroad / UI8 / Vercel):** Dilengkapi *Cyber Dark & Clean Light Mode*, *Interactive Live Demo Simulator* langsung di browser (mode Desktop, Tablet, & Mobile), *Kalkulator Penghematan (ROI)*, dan *Slide-Over Multi-Item Shopping Cart* dengan **Diskon Bundling 20% Otomatis**.
2. **Blogger (`https://asetkode.blogspot.com/`) sebagai Cloud Database Gratis:**
   - Setiap kali Anda mempublikasikan produk baru melalui **Bot Auto-Post (`bot Post/bot.js`)** ke Blogger, halaman GitHub Pages otomatis menarik data produk terbaru secara *real-time* menggunakan protokol **Blogger JSONP Cloud Feed** (bebas masalah *CORS*).
   - Selain itu, **Blogger tetap mendapatkan trafik SEO dari Google Search**, dan pengunjung dari artikel Blogger dapat diarahkan langsung ke Storefront GitHub Anda!

---

## 🛠️ Cara Mencoba & Deploy dalam 3 Menit

### 1. Preview Langsung di Komputer Anda
Klik 2x file [`BUKA-TOKO-LOKAL.bat`](file:///e:/Backup/Uang/Web%20Jualan/github-storefront/BUKA-TOKO-LOKAL.bat) atau buka langsung [`index.html`](file:///e:/Backup/Uang/Web%20Jualan/github-storefront/index.html) di browser Anda.
Coba fitur-fitur unggulannya:
- Klik tombol **🖥️ Demo** pada kartu produk *Aplikasi Kasir (POS)* untuk mencoba **Simulasi Kasir Interaktif** langsung di dalam modal (bisa tambah menu kopi/burger ke struk dan ganti ukuran layar Desktop / Tablet / HP!).
- Klik tombol **🛒 +Keranjang** pada 2 produk berbeda untuk melihat **Diskon Bundling 20% Otomatis** di laci keranjang sebelah kanan.
- Uji **🧮 Kalkulator Hemat** di bagian kanan Hero atas.

---

### 2. Upload ke GitHub Pages (Hosting Gratis Seumur Hidup & Super Cepat)
1. Buat repository baru di akun GitHub Anda (misalnya: `asetkode-store`), pilih **Public**.
2. Klik 2x file [`DEPLOY-KE-GITHUB.bat`](file:///e:/Backup/Uang/Web%20Jualan/github-storefront/DEPLOY-KE-GITHUB.bat).
3. Tempel (*paste*) URL repository GitHub Anda (contoh: `https://github.com/username/asetkode-store.git`) lalu tekan **Enter**.
4. Buka halaman repository di GitHub → klik tab **Settings** → menu **Pages** di sebelah kiri.
5. Pada bagian **Build and deployment (Branch)**, pilih branch **`main`** dan folder **`/ (root)`**, lalu klik **Save**.
6. Tunggu 1 menit — Web Jualan Anda resmi online di `https://username.github.io/asetkode-store/`!

---

### 3. Bagaimana Cara Menambah / Mengubah Produk?
Anda **tidak perlu** mengedit kode HTML di GitHub setiap kali ingin menambah produk baru!
- Cukup jalankan **Bot Auto-Post** di [`bot Post/JALANKAN-BOT.bat`](file:///e:/Backup/Uang/Web%20Jualan/bot%20Post/JALANKAN-BOT.bat) (`http://localhost:3030`) dan klik **Post Sekarang** ke `asetkode.blogspot.com`.
- File [`app.js`](file:///e:/Backup/Uang/Web%20Jualan/github-storefront/app.js) di GitHub Pages terhubung otomatis ke endpoint:
  `https://asetkode.blogspot.com/feeds/posts/default?alt=json-in-script&callback=__asetkodeBloggerCallback`
- Begitu postingan terbit di Blogger, produk tersebut **langsung tampil otomatis** di katalog GitHub Pages Anda lengkap dengan harga, diskon, kategori, dan tombol checkout-nya!

