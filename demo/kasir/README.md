# Aplikasi Kasir (POS) & Inventaris Gudang Berbasis Web & Excel (.xlsx)

Aplikasi Point of Sale (Kasir) dan Manajemen Inventaris Gudang modern yang berjalan langsung di browser tanpa instalasi server rumit, dilengkapi **sinkronisasi dua arah dengan Microsoft Excel (`.xlsx`)**.

---

## Cara Menjalankan Aplikasi

1. Klik 2x pada file **[Buka_Aplikasi_Kasir.bat](file:///e:/Backup/Uang/Aplikasi%20Kasir/Buka_Aplikasi_Kasir.bat)** atau buka langsung **[index.html](file:///e:/Backup/Uang/Aplikasi%20Kasir/index.html)** menggunakan Google Chrome atau Microsoft Edge.
2. Aplikasi langsung siap digunakan lengkap dengan contoh data barang gudang dan transaksi awal.

---

## Fitur Utama

### 1. Mesin Kasir / Point of Sale (POS)
- **Pencarian Cepat & Barcode Scanner**: Ketik nama/kode SKU atau gunakan alat *Barcode Scanner* (otomatis masuk keranjang saat tekan `Enter`).
- **Mode Harga Eceran & Grosir**: Beralih antara harga jual eceran dan harga grosir hanya dengan 1 klik.
- **Multi Metode Pembayaran**: Tunai (dengan tombol cepat Uang Pas, 20rb, 50rb, 100rb), QRIS, Transfer Bank, Kartu Debit/Kredit, serta **Kasbon / Piutang Tempo**.
- **Diskon & PPN**: Potongan harga langsung (Rp) dan opsi pajak PPN yang dapat disesuaikan.
- **Cetak Struk Thermal (58mm & 80mm)**: Format cetak khusus printer kasir thermal (`@media print`).
- **Pintasan Keyboard Kasir**:
  - `F1` : Buka layar Mesin Kasir
  - `F2` : Fokus ke kolom pencarian / scan barcode
  - `F4` : Proses Bayar & Cetak Struk

### 2. Inventaris & Master Barang Gudang
- Kelola Kode SKU/Barcode, Nama Barang, Kategori, Satuan (`Pcs`, `Pack`, `Box`, `Kg`, `Liter`, `Lusin`, dll.), **Lokasi Rak Gudang**, dan **Supplier**.
- Perhitungan otomatis **Nilai Aset Gudang berdasarkan HPP (Harga Modal)** dan **Potensi Nilai Jual Eceran**.
- **Indikator Stok Menipis (Low Stock Alert)**: Memberi tanda peringatan otomatis jika stok gudang menyentuh atau berada di bawah batas minimum.

### 3. Kartu Stok & Mutasi Gudang (Masuk / Keluar / Stock Opname)
- **Stok Masuk (`IN`)**: Catat penambahan stok dari pembelian/restock supplier.
- **Stok Keluar (`OUT`)**: Otomatis tercatat saat ada penjualan kasir, atau input manual untuk barang rusak/kadaluarsa.
- **Stock Opname (`OPNAME`)**: Sesuaikan jumlah stok aplikasi dengan hasil hitung fisik di gudang.

### 4. Riwayat Transaksi, Laba/Rugi & Manajemen Kasbon
- Filter transaksi berdasarkan rentang tanggal, metode pembayaran, atau nama pelanggan.
- Hitung otomatis **Omzet Penjualan**, **Total HPP (Modal)**, dan **Laba Kotor (Margin)**.
- Fitur **Lunasi Kasbon** untuk transaksi tempo, **Cetak Ulang Struk**, serta **Batal / Retur Nota** (otomatis mengembalikan stok barang ke gudang).

### 5. Integrasi Penuh Microsoft Excel (`.xlsx`)
- **Live Excel Sync (Unggulan)**: Klik tombol **Link File .xlsx** di sidebar atau menu *Pusat Data Excel* untuk menghubungkan aplikasi langsung ke file `.xlsx` di komputer Anda. Setiap transaksi kasir dan perubahan stok otomatis memperbarui file Excel tersebut!
- **Export Database Lengkap (5 Sheet Sekaligus)**:
  1. `Produk_Gudang`
  2. `Riwayat_Transaksi`
  3. `Detail_Item_Terjual`
  4. `Mutasi_Stok`
  5. `Ringkasan_Keuangan`
- **Import & Update Massal via Excel**: Unduh template `.xlsx`, edit ratusan barang/harga/stok di Microsoft Excel, lalu unggah kembali ke aplikasi.

