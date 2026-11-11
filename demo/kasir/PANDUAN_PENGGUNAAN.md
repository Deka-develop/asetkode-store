# Panduan Penggunaan Lengkap — Aplikasi Kasir (POS) & Inventaris Gudang Berbasis Web/Excel

Dokumen ini berisi panduan langkah demi langkah untuk mengoperasikan **KasirExcel POS & Inventaris Gudang**, mulai dari cara membuka aplikasi, melayani pembeli di kasir, mengelola stok gudang, mencetak struk thermal, hingga menghubungkan data secara langsung dengan **Microsoft Excel (`.xlsx`)**.

---

## Daftar Isi
1. [Cara Membuka & Menjalankan Aplikasi](#1-cara-membuka--menjalankan-aplikasi)
2. [Panduan Mesin Kasir / Point of Sale (POS)](#2-panduan-mesin-kasir--point-of-sale-pos)
3. [Panduan Mengelola Inventaris & Master Barang Gudang](#3-panduan-mengelola-inventaris--master-barang-gudang)
4. [Panduan Stok Masuk, Stok Keluar & Stock Opname](#4-panduan-stok-masuk-stok-keluar--stock-opname)
5. [Panduan Integrasi Microsoft Excel (.xlsx)](#5-panduan-integrasi-microsoft-excel-xlsx)
6. [Panduan Riwayat Transaksi, Kasbon & Retur Barang](#6-panduan-riwayat-transaksi-kasbon--retur-barang)
7. [Panduan Laporan Keuangan & Laba/Rugi](#7-panduan-laporan-keuangan--labarugi)
8. [Pengaturan Toko & Printer Struk Thermal (58mm/80mm)](#8-pengaturan-toko--printer-struk-thermal-58mm80mm)
9. [Daftar Pintasan Keyboard (Shortcut Kasir)](#9-daftar-pintasan-keyboard-shortcut-kasir)
10. [Tanya Jawab & Solusi Masalah (FAQ)](#10-tanya-jawab--solusi-masalah-faq)

---

## 1. Cara Membuka & Menjalankan Aplikasi

Terdapat **2 cara mudah** untuk membuka aplikasi ini di komputer Anda:

### Cara A: Klik 2x Tanpa Server (Paling Praktis)
1. Buka folder aplikasi: `e:\Backup\Uang\Aplikasi Kasir`
2. Klik dua kali (**double-click**) pada file **[Buka_Aplikasi_Kasir.bat](file:///e:/Backup/Uang/Aplikasi%20Kasir/Buka_Aplikasi_Kasir.bat)** atau langsung klik dua kali file **[index.html](file:///e:/Backup/Uang/Aplikasi%20Kasir/index.html)**.
3. Aplikasi akan langsung terbuka di browser (disarankan menggunakan **Google Chrome** atau **Microsoft Edge**).

### Cara B: Menggunakan Server Lokal Node.js
1. Buka terminal / PowerShell di folder aplikasi.
2. Jalankan perintah:
   ```bash
   node server.js
   ```
3. Buka alamat `http://localhost:3000` di browser Anda.

---

## 2. Panduan Mesin Kasir / Point of Sale (POS)

Menu **Mesin Kasir (POS)** adalah halaman utama untuk melayani transaksi pelanggan sehari-hari.

### A. Menambahkan Barang ke Keranjang
- **Klik Manual**: Klik kartu produk di sebelah kiri atau pilih filter kategori (*Sembako*, *Minuman*, *ATK*, dll.).
- **Pencarian Cepat**: Tekan tombol `F2` di keyboard, ketik nama barang atau kode SKU.
- **Menggunakan Barcode Scanner**:
  1. Pastikan kursor aktif di kotak pencarian atas (tekan `F2`).
  2. Scan barcode pada kemasan barang menggunakan alat *Barcode Scanner*.
  3. Barang akan **otomatis masuk ke keranjang belanja** dan jumlahnya bertambah jika di-scan berulang kali.

### B. Memilih Mode Harga: Eceran vs Grosir
- Di sebelah kanan kotak pencarian terdapat tombol **Eceran** dan **Grosir**.
- Klik **Eceran** untuk pembeli biasa, atau klik **Grosir** untuk pelanggan warung/partai besar (harga seluruh barang di keranjang otomatis menyesuaikan ke harga grosir).

### C. Mengatur Jumlah, Diskon & Pajak (PPN)
1. Pada daftar **Keranjang Kasir** di sisi kanan, gunakan tombol `-` dan `+` atau ketik langsung angka jumlah barang.
2. Untuk memberikan potongan harga, isi kolom **Diskon Transaksi (Rp)**.
3. Jika transaksi menggunakan pajak, centang kotak **PPN (11%)** (tarif PPN dapat diubah di menu *Pengaturan Toko*).

### D. Memproses Pembayaran & Kembalian
1. Isi **Nama Pelanggan** (opsional, biarkan kosong untuk *Pelanggan Umum*).
2. Pilih **Metode Pembayaran**:
   - **Tunai (Cash)**: Masukkan nominal uang yang diterima pada kotak **Uang Diterima**, atau klik tombol cepat (**Uang Pas**, **20.000**, **50.000**, **100.000**). Sistem otomatis menghitung **Kembalian**.
   - **QRIS / Transfer / Debit**: Nominal pembayaran otomatis dianggap pas.
   - **Kasbon / Tempo**: Transaksi akan dicatat sebagai piutang dengan status **BELUM LUNAS** (wajib mengisi nama pelanggan agar mudah ditagih).
3. Klik tombol **Bayar & Cetak Struk (F4)**.
4. Stok barang di gudang akan **otomatis berkurang** dan layar pratinjau struk akan muncul.

---

## 3. Panduan Mengelola Inventaris & Master Barang Gudang

Buka menu **Inventaris Gudang** di bilah kiri untuk mengelola seluruh daftar barang dagangan.

### A. Menambah Barang Baru
1. Klik tombol biru **+ Tambah Barang Baru** di pojok kanan atas.
2. Isi formulir data barang:
   - **Kode SKU / Barcode**: Scan barcode barang atau klik tombol **Auto** untuk membuat kode otomatis.
   - **Kategori**: Pilih atau ketik kategori baru (misal: *Sembako*, *Minuman*, *ATK & Kantor*).
   - **Nama Barang Lengkap**: Nama produk yang akan tampil di kasir dan struk.
   - **Harga Modal / HPP (Rp)**: Harga beli dari supplier (penting untuk menghitung laba bersih otomatis).
   - **Harga Jual Eceran (Rp)**: Harga jual normal ke pembeli.
   - **Harga Grosir (Rp)**: Harga khusus pembelian partai/grosir.
   - **Stok Saat Ini**: Jumlah fisik barang yang tersedia sekarang.
   - **Stok Minimum**: Batas peringatan stok menipis (misal diisi `10`, maka saat stok sisa `10` atau kurang, sistem akan memberi peringatan kuning).
   - **Satuan**: Pilih `Pcs`, `Pack`, `Box`, `Kg`, `Liter`, `Botol`, `Sachet`, atau `Lusin`.
   - **Lokasi Rak Gudang**: Contoh `Rak A-01` atau `Showcase Dingin` agar mudah dicari.
   - **Nama Supplier**: Nama agen/pemasok barang.
3. Klik **Simpan Barang**.

### B. Mengubah atau Menghapus Barang
- Klik tombol **Edit** pada baris barang untuk mengubah harga, nama, rak, atau batas stok minimum.
- Klik tombol **Hapus** untuk menghapus barang dari daftar gudang.

---

## 4. Panduan Stok Masuk, Stok Keluar & Stock Opname

Buka menu **Stok Masuk / Keluar** untuk mencatat pergerakan fisik barang di gudang secara tertib (Kartu Stok).

1. Klik tombol **+ Catat Stok Masuk / Keluar** (atau klik tombol **+/- Stok** langsung dari tabel Inventaris Gudang).
2. Pilih **Barang** yang akan diubah stoknya.
3. Pilih **Jenis Mutasi**:
   - **Stok Masuk (+ Restock / Pembelian)**: Digunakan saat barang baru datang dari supplier. Stok gudang akan bertambah.
   - **Stok Keluar (- Rusak / Kadaluarsa / Sample)**: Digunakan jika ada barang pecah, rusak, atau kadaluarsa di gudang. Stok gudang akan berkurang.
   - **Stock Opname (Tetapkan Jumlah Stok Fisik Baru)**: Digunakan saat perhitungan fisik gudang. Masukkan jumlah fisik sebenarnya, dan sistem otomatis mencatat selisihnya.
4. Isi **Keterangan / No. Surat Jalan / Alasan** (contoh: *Restock dari Agen Makmur Nota #102*).
5. Klik **Simpan Mutasi Stok**.

---

## 5. Panduan Integrasi Microsoft Excel (`.xlsx`)

Aplikasi ini memiliki kemampuan integrasi penuh dengan **Microsoft Excel** melalui menu **Pusat Data Excel**.

### A. Fitur Unggulan: Live Excel Sync (Simpan Otomatis ke File `.xlsx` Lokal)
Fitur ini memungkinkan setiap transaksi kasir dan perubahan stok langsung tersimpan ke sebuah file `.xlsx` di komputer Anda tanpa perlu klik download berulang-ulang:
1. Gunakan browser **Google Chrome** atau **Microsoft Edge**.
2. Klik tombol hijau **Link File .xlsx** di pojok kiri atas sidebar (atau buka menu **Pusat Data Excel**).
3. Pilih:
   - **Buat File Database .xlsx Baru di Komputer**: Untuk membuat file Excel baru yang langsung terhubung.
   - **Pilih / Buka File Excel (.xlsx)**: Untuk menghubungkan file Excel yang sudah Anda miliki.
4. Jika muncul permintaan izin browser (*"Allow site to edit file"*), klik **Edit / Save Changes**.
5. Indikator status di sidebar akan berubah menjadi hijau (**Live Excel Aktif**).
   > **Catatan Penting:** Saat sedang bertransaksi di kasir dengan mode *Live Excel Aktif*, **tutup sementara file tersebut di aplikasi Microsoft Excel** agar file tidak terkunci (*locked*) saat browser menyimpan data otomatis.

### B. Download / Export Laporan Lengkap (5 Sheet Sekaligus)
Klik tombol **Unduh .xlsx** atau **Download Database Lengkap (.xlsx)** untuk mendapatkan 1 file kerja Excel berisi **5 Sheet**:
1. `Produk_Gudang` — Daftar lengkap SKU, HPP, Harga Jual, Stok, Status Stok, dan Nilai Aset Modal.
2. `Riwayat_Transaksi` — Rekap seluruh nota penjualan, metode pembayaran, diskon, HPP, dan laba kotor.
3. `Detail_Item_Terjual` — Rincian barang apa saja yang keluar di setiap nomor invoice.
4. `Mutasi_Stok` — Riwayat keluar-masuk barang gudang dan Stock Opname.
5. `Ringkasan_Keuangan` — Rekapitulasi eksekutif nilai aset gudang, total omzet, dan laba bersih.

### C. Import & Update Ratusan Barang Sekaligus dari Excel
1. Buka menu **Pusat Data Excel**.
2. Klik **1. Download Template Produk Excel (.xlsx)**.
3. Buka file `Template_Import_Produk_Gudang.xlsx` di Microsoft Excel, lalu isi daftar barang Anda sesuai kolom yang tersedia (`SKU_Barcode`, `Nama_Barang`, `Kategori`, `Satuan`, `Lokasi_Rak`, `Supplier`, `Harga_Modal_HPP`, `Harga_Jual_Eceran`, `Harga_Grosir`, `Stok_Saat_Ini`, `Stok_Minimum`).
4. Simpan file Excel tersebut, lalu kembali ke aplikasi dan klik **2. Upload & Import File Excel (.xlsx / .csv)**.
5. Jika `SKU_Barcode` atau `Nama_Barang` sudah ada, data dan stoknya akan **diperbarui otomatis**; jika belum ada, akan **ditambahkan sebagai barang baru**.

---

## 6. Panduan Riwayat Transaksi, Kasbon & Retur Barang

Buka menu **Riwayat & Laporan** untuk melihat seluruh nota yang pernah dibuat:
- **Filter Transaksi**: Saring laporan berdasarkan kata kunci (No. Invoice / Nama Pelanggan), Tanggal Mulai, Tanggal Akhir, dan Metode Pembayaran.
- **Cetak Ulang Struk**: Klik tombol **Struk** pada baris transaksi untuk melihat kembali detail nota atau mencetak ulang struk.
- **Melunasi Kasbon (Piutang)**:
  - Pilih filter pembayaran **Kasbon / Tempo** untuk melihat daftar pelanggan yang belum bayar.
  - Saat pelanggan membayar, klik tombol biru **Lunasi**. Status transaksi otomatis berubah menjadi **LUNAS**.
- **Batal / Retur Transaksi**:
  - Jika pelanggan membatalkan pembelian atau salah input nota, klik tombol merah **Batal/Retur**.
  - Nota akan dihapus dan **seluruh stok barang pada nota tersebut otomatis dikembalikan ke gudang** beserta catatan mutasinya.

---

## 7. Panduan Laporan Keuangan & Laba/Rugi

Buka menu **Analitik & Laba Rugi** untuk memantau kesehatan bisnis:
- **Omzet Hari Ini**: Total pendapatan kotor dari penjualan hari ini.
- **Laba Bersih Hari Ini**: Keuntungan bersih hari ini dengan rumus:
  $$\text{Laba} = (\text{Harga Jual} \times \text{Qty}) - \text{Diskon} - (\text{Harga Modal HPP} \times \text{Qty})$$
- **Produk Terlaris (Top Selling)**: Peringkat barang yang menghasilkan omzet dan kontribusi laba tertinggi.
- **Barang Wajib Restock**: Daftar barang yang stoknya sudah menyentuh atau berada di bawah batas minimum beserta nama supplier dan lokasi raknya.

---

## 8. Pengaturan Toko & Printer Struk Thermal (58mm/80mm)

Buka menu **Pengaturan Toko** untuk menyesuaikan identitas usaha Anda:
1. **Nama Toko / Usaha**: Akan tampil di sidebar aplikasi dan bagian paling atas struk kasir.
2. **Alamat & Nomor Telepon/WhatsApp**: Tercetak di header struk.
3. **Tarif PPN Default (%)**: Persentase pajak saat kotak PPN dicentang di kasir.
4. **Ukuran Kertas Printer Thermal**:
   - Pilih **Thermal 58mm** untuk printer kasir ukuran kecil/bluetooth standar.
   - Pilih **Thermal 80mm** untuk printer kasir meja ukuran lebar.
5. **Cetak Otomatis Saat Bayar**: Pilih **Ya** jika ingin jendela *Print* langsung terbuka begitu menekan tombol Bayar (`F4`).
6. **Tips Pengaturan Print di Browser (Chrome/Edge)**:
   - Saat jendela *Print* muncul, pilih printer thermal Anda.
   - Pada bagian **More settings (Pengaturan lainnya)**:
     - Set **Margins (Batas)** ke **None (Tidak ada)** atau **Minimum**.
     - Hilangkan centang pada **Headers and footers**.

---

## 9. Daftar Pintasan Keyboard (Shortcut Kasir)

Gunakan tombol cepat berikut agar pelayanan kasir lebih cepat tanpa harus sering memegang mouse:

| Tombol Keyboard | Fungsi |
| :--- | :--- |
| `F1` | Berpindah langsung ke layar **Mesin Kasir (POS)** |
| `F2` | Fokus langsung ke kolom **Cari Barang / Scan Barcode** |
| `Enter` *(di kotak cari)* | Memasukkan barang hasil scan barcode / pencarian langsung ke keranjang |
| `F4` | **Bayar & Cetak Struk** (Memproses pembayaran keranjang saat ini) |

---

## 10. Tanya Jawab & Solusi Masalah (FAQ)

**1. Apakah data saya hilang jika browser ditutup atau komputer dimatikan?**
Tidak. Semua data otomatis tersimpan di penyimpanan lokal browser (`localStorage`). Selain itu, Anda dapat menghubungkan file `.xlsx` lokal atau mengunduh backup Excel kapan saja.

**2. Bagaimana cara memindahkan data ke komputer kasir yang lain?**
Cukup buka menu **Pusat Data Excel**, klik **Download Database Lengkap (.xlsx)**, pindahkan file Excel tersebut ke komputer baru, lalu klik **Import Excel** di komputer baru.

**3. Kenapa fitur Import/Export Excel gagal saat pertama kali dibuka tanpa internet?**
Pastikan komputer terhubung ke internet minimal saat pertama kali membuka aplikasi agar library pemroses Excel (*SheetJS*) dapat dimuat oleh browser. Setelah termuat di cache browser, aplikasi dapat berjalan secara offline.

