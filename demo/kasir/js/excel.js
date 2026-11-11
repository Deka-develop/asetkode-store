/**
 * js/excel.js
 * Integrasi Microsoft Excel (.xlsx) dengan SheetJS + File System Access API
 */

const ExcelManager = {
    fileHandle: null,
    fileName: null,

    ensureXLSX() {
        if (typeof XLSX === 'undefined') {
            App.showToast('Library SheetJS (XLSX) belum termuat. Pastikan koneksi internet aktif saat pertama kali membuka.', 'danger');
            return false;
        }
        return true;
    },

    buildInventoryRows() {
        return DataStore.products.map((p, idx) => {
            const status = p.stock <= 0 ? 'HABIS' : (p.stock <= p.minStock ? 'MENIPIS' : 'AMAN');
            return {
                'No': idx + 1,
                'ID_Produk': p.id,
                'SKU_Barcode': p.sku,
                'Nama_Barang': p.name,
                'Kategori': p.category,
                'Satuan': p.unit || 'Pcs',
                'Lokasi_Rak': p.rack || '-',
                'Supplier': p.supplier || '-',
                'Harga_Modal_HPP': Number(p.cost) || 0,
                'Harga_Jual_Eceran': Number(p.price) || 0,
                'Harga_Grosir': Number(p.wholesalePrice || p.price) || 0,
                'Stok_Saat_Ini': Number(p.stock) || 0,
                'Stok_Minimum': Number(p.minStock) || 0,
                'Status_Stok': status,
                'Total_Nilai_Modal': (Number(p.cost) || 0) * (Number(p.stock) || 0),
                'Total_Nilai_Jual': (Number(p.price) || 0) * (Number(p.stock) || 0)
            };
        });
    },

    buildTransactionsRows() {
        return DataStore.transactions.map((t, idx) => ({
            'No': idx + 1,
            'No_Invoice': t.id,
            'Tanggal_ISO': t.timestamp,
            'Tanggal_Jam': formatDateTime(t.timestamp),
            'Pelanggan': t.customer || 'Umum',
            'Metode_Bayar': t.paymentMethod,
            'Tipe_Harga': t.priceMode === 'wholesale' ? 'Grosir' : 'Eceran',
            'Jumlah_Item': t.items.reduce((s, i) => s + i.qty, 0),
            'Subtotal': t.subtotal,
            'Diskon': t.discount,
            'PPN': t.tax,
            'Total_Bayar': t.grandTotal,
            'Total_HPP_Modal': t.totalCost,
            'Laba_Kotor': t.profit,
            'Uang_Diterima': t.cashReceived,
            'Kembalian': t.change,
            'Status': t.status || 'LUNAS'
        }));
    },

    buildTransactionItemsRows() {
        const rows = [];
        DataStore.transactions.forEach(t => {
            t.items.forEach(item => {
                rows.push({
                    'No_Invoice': t.id,
                    'Tanggal_Jam': formatDateTime(t.timestamp),
                    'Pelanggan': t.customer || 'Umum',
                    'SKU_Barcode': item.sku,
                    'Nama_Barang': item.name,
                    'Qty': item.qty,
                    'Satuan': item.unit || 'Pcs',
                    'Harga_Modal_Satuan': item.cost,
                    'Harga_Jual_Satuan': item.price,
                    'Subtotal_Penjualan': item.subtotal,
                    'Subtotal_Modal': item.cost * item.qty,
                    'Laba_Item': item.subtotal - (item.cost * item.qty)
                });
            });
        });
        return rows;
    },

    buildMutationsRows() {
        return DataStore.mutations.map((m, idx) => ({
            'No': idx + 1,
            'ID_Mutasi': m.id,
            'Tanggal_ISO': m.timestamp,
            'Waktu': formatDateTime(m.timestamp),
            'ID_Produk': m.productId,
            'SKU_Barcode': m.sku,
            'Nama_Barang': m.productName,
            'Tipe_Mutasi': m.type,
            'Perubahan_Stok': m.change,
            'Stok_Akhir': m.finalStock,
            'Keterangan': m.note
        }));
    },

    buildSummaryRows() {
        const totalSku = DataStore.products.length;
        const totalUnits = DataStore.products.reduce((s, p) => s + (Number(p.stock) || 0), 0);
        const totalAssetCost = DataStore.products.reduce((s, p) => s + ((Number(p.cost) || 0) * (Number(p.stock) || 0)), 0);
        const totalAssetRetail = DataStore.products.reduce((s, p) => s + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);

        const totalTrx = DataStore.transactions.length;
        const totalRevenue = DataStore.transactions.reduce((s, t) => s + (Number(t.grandTotal) || 0), 0);
        const totalCostSold = DataStore.transactions.reduce((s, t) => s + (Number(t.totalCost) || 0), 0);
        const totalProfit = DataStore.transactions.reduce((s, t) => s + (Number(t.profit) || 0), 0);

        return [
            { 'Kategori': 'PROFIL TOKO', 'Metrik': 'Nama Toko', 'Nilai': DataStore.settings.storeName },
            { 'Kategori': 'PROFIL TOKO', 'Metrik': 'Alamat', 'Nilai': DataStore.settings.storeAddress },
            { 'Kategori': 'PROFIL TOKO', 'Metrik': 'Waktu Export', 'Nilai': formatDateTime(new Date().toISOString()) },
            { 'Kategori': 'INVENTARIS GUDANG', 'Metrik': 'Total Jenis Barang (SKU)', 'Nilai': totalSku },
            { 'Kategori': 'INVENTARIS GUDANG', 'Metrik': 'Total Fisik Unit Barang', 'Nilai': totalUnits },
            { 'Kategori': 'INVENTARIS GUDANG', 'Metrik': 'Total Nilai Modal Gudang (HPP)', 'Nilai': totalAssetCost },
            { 'Kategori': 'INVENTARIS GUDANG', 'Metrik': 'Total Potensi Nilai Jual Gudang', 'Nilai': totalAssetRetail },
            { 'Kategori': 'KINERJA PENJUALAN', 'Metrik': 'Total Jumlah Transaksi', 'Nilai': totalTrx },
            { 'Kategori': 'KINERJA PENJUALAN', 'Metrik': 'Total Omzet Penjualan (Rp)', 'Nilai': totalRevenue },
            { 'Kategori': 'KINERJA PENJUALAN', 'Metrik': 'Total HPP Barang Terjual (Rp)', 'Nilai': totalCostSold },
            { 'Kategori': 'KINERJA PENJUALAN', 'Metrik': 'Total Laba Bersih Kasir (Rp)', 'Nilai': totalProfit }
        ];
    },

    buildFullWorkbook() {
        const wb = XLSX.utils.book_new();

        const wsInventory = XLSX.utils.json_to_sheet(this.buildInventoryRows());
        XLSX.utils.book_append_sheet(wb, wsInventory, 'Produk_Gudang');

        const wsTrx = XLSX.utils.json_to_sheet(this.buildTransactionsRows());
        XLSX.utils.book_append_sheet(wb, wsTrx, 'Riwayat_Transaksi');

        const wsItems = XLSX.utils.json_to_sheet(this.buildTransactionItemsRows());
        XLSX.utils.book_append_sheet(wb, wsItems, 'Detail_Item_Terjual');

        const wsMut = XLSX.utils.json_to_sheet(this.buildMutationsRows());
        XLSX.utils.book_append_sheet(wb, wsMut, 'Mutasi_Stok');

        const wsSummary = XLSX.utils.json_to_sheet(this.buildSummaryRows());
        XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan_Keuangan');

        return wb;
    },

    exportFullWorkbook() {
        if (!this.ensureXLSX()) return;
        const wb = this.buildFullWorkbook();
        const dateStr = new Date().toISOString().slice(0, 10);
        const filename = `Database_Kasir_Gudang_${dateStr}.xlsx`;
        XLSX.writeFile(wb, filename);
        App.showToast(`Database lengkap berhasil diunduh: ${filename}`, 'success');
    },

    exportInventorySheet() {
        if (!this.ensureXLSX()) return;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.buildInventoryRows());
        XLSX.utils.book_append_sheet(wb, ws, 'Produk_Gudang');
        const dateStr = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `Stok_Gudang_${dateStr}.xlsx`);
        App.showToast('Laporan Stok Gudang (.xlsx) berhasil diunduh.', 'success');
    },

    exportTransactionsSheet() {
        if (!this.ensureXLSX()) return;
        const wb = XLSX.utils.book_new();
        const ws1 = XLSX.utils.json_to_sheet(this.buildTransactionsRows());
        const ws2 = XLSX.utils.json_to_sheet(this.buildTransactionItemsRows());
        XLSX.utils.book_append_sheet(wb, ws1, 'Riwayat_Transaksi');
        XLSX.utils.book_append_sheet(wb, ws2, 'Detail_Item_Terjual');
        const dateStr = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `Laporan_Penjualan_Kasir_${dateStr}.xlsx`);
        App.showToast('Laporan Penjualan (.xlsx) berhasil diunduh.', 'success');
    },

    exportMutationsSheet() {
        if (!this.ensureXLSX()) return;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(this.buildMutationsRows());
        XLSX.utils.book_append_sheet(wb, ws, 'Mutasi_Stok');
        const dateStr = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(wb, `Kartu_Mutasi_Stok_${dateStr}.xlsx`);
        App.showToast('Riwayat Mutasi Stok (.xlsx) berhasil diunduh.', 'success');
    },

    downloadTemplate() {
        if (!this.ensureXLSX()) return;
        const sampleRows = [
            {
                'SKU_Barcode': '899700901',
                'Nama_Barang': 'Contoh Barang Baru 1',
                'Kategori': 'Sembako',
                'Satuan': 'Pcs',
                'Lokasi_Rak': 'Rak A-01',
                'Supplier': 'Supplier Utama',
                'Harga_Modal_HPP': 10000,
                'Harga_Jual_Eceran': 13000,
                'Harga_Grosir': 12000,
                'Stok_Saat_Ini': 50,
                'Stok_Minimum': 10
            },
            {
                'SKU_Barcode': '899700902',
                'Nama_Barang': 'Contoh Barang Baru 2',
                'Kategori': 'Minuman',
                'Satuan': 'Botol',
                'Lokasi_Rak': 'Showcase 1',
                'Supplier': 'Agen Segar',
                'Harga_Modal_HPP': 3500,
                'Harga_Jual_Eceran': 5000,
                'Harga_Grosir': 4500,
                'Stok_Saat_Ini': 100,
                'Stok_Minimum': 20
            }
        ];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(sampleRows);
        XLSX.utils.book_append_sheet(wb, ws, 'Produk_Gudang');
        XLSX.writeFile(wb, 'Template_Import_Produk_Gudang.xlsx');
        App.showToast('Template Excel berhasil diunduh. Isi lalu Import kembali!', 'success');
    },

    importInventoryFromFile(event) {
        if (!this.ensureXLSX()) return;
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                this.applyWorkbookToDataStore(workbook);
                event.target.value = '';
            } catch (err) {
                console.error(err);
                App.showToast('Gagal membaca file Excel: ' + err.message, 'danger');
            }
        };
        reader.readAsArrayBuffer(file);
    },

    applyWorkbookToDataStore(workbook) {
        // Read first sheet or 'Produk_Gudang'
        const sheetName = workbook.SheetNames.includes('Produk_Gudang')
            ? 'Produk_Gudang'
            : workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);

        if (!rows || rows.length === 0) {
            App.showToast('File Excel kosong atau format kolom tidak dikenali.', 'warning');
            return;
        }

        let addedCount = 0;
        let updatedCount = 0;

        rows.forEach((r, index) => {
            const sku = String(r['SKU_Barcode'] || r['SKU'] || r['Kode'] || r['Barcode'] || '').trim();
            const name = String(r['Nama_Barang'] || r['Nama'] || r['Produk'] || '').trim();
            if (!name) return;

            const finalSku = sku || ('BRG-' + (Date.now() + index));
            const category = String(r['Kategori'] || 'Umum').trim();
            const unit = String(r['Satuan'] || 'Pcs').trim();
            const rack = String(r['Lokasi_Rak'] || r['Rak'] || '-').trim();
            const supplier = String(r['Supplier'] || '-').trim();
            const cost = Number(r['Harga_Modal_HPP'] ?? r['Harga_Modal'] ?? r['HPP'] ?? 0);
            const price = Number(r['Harga_Jual_Eceran'] ?? r['Harga_Jual'] ?? r['Harga'] ?? 0);
            const wholesalePrice = Number(r['Harga_Grosir'] ?? price);
            const stock = Number(r['Stok_Saat_Ini'] ?? r['Stok'] ?? 0);
            const minStock = Number(r['Stok_Minimum'] ?? 5);

            const existing = DataStore.products.find(
                p => p.sku.toLowerCase() === finalSku.toLowerCase() || p.name.toLowerCase() === name.toLowerCase()
            );

            if (existing) {
                existing.sku = finalSku;
                existing.name = name;
                existing.category = category;
                existing.unit = unit;
                existing.rack = rack;
                existing.supplier = supplier;
                existing.cost = cost;
                existing.price = price;
                existing.wholesalePrice = wholesalePrice;
                existing.stock = stock;
                existing.minStock = minStock;
                updatedCount++;
            } else {
                DataStore.products.push({
                    id: r['ID_Produk'] || ('PRD-' + Date.now() + '-' + index),
                    sku: finalSku,
                    name,
                    category,
                    unit,
                    rack,
                    supplier,
                    cost,
                    price,
                    wholesalePrice,
                    stock,
                    minStock
                });
                addedCount++;
            }
        });

        DataStore.saveAll();
        App.refreshAllViews();
        App.showToast(`Import Excel selesai: ${addedCount} barang baru, ${updatedCount} barang diperbarui!`, 'success');
    },

    // ==================== LIVE LOCAL EXCEL FILE SYNC (File System Access API) ====================
    async connectLocalExcel() {
        if (!this.ensureXLSX()) return;
        if (!window.showOpenFilePicker) {
            App.showToast('Browser ini tidak mendukung koneksi langsung file lokal. Gunakan Chrome atau Edge, atau gunakan tombol Import/Export.', 'warning');
            return;
        }

        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{
                    description: 'File Microsoft Excel (.xlsx)',
                    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }
                }],
                multiple: false
            });

            this.fileHandle = handle;
            this.fileName = handle.name;

            // Read existing data from selected Excel file
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
            this.applyWorkbookToDataStore(workbook);

            // Immediately write full standardized sheets back so the file has all 5 sheets
            await this.syncToLocalExcelFile();
            this.updateStatusUI(true);
            App.showToast(`Terhubung langsung ke file Excel: ${this.fileName}`, 'success');
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error(err);
                App.showToast('Gagal menghubungkan file Excel: ' + err.message, 'danger');
            }
        }
    },

    async createNewLocalExcel() {
        if (!this.ensureXLSX()) return;
        if (!window.showSaveFilePicker) {
            this.exportFullWorkbook();
            return;
        }

        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'Database_Kasir_Gudang_Live.xlsx',
                types: [{
                    description: 'File Microsoft Excel (.xlsx)',
                    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }
                }]
            });

            this.fileHandle = handle;
            this.fileName = handle.name;
            await this.syncToLocalExcelFile();
            this.updateStatusUI(true);
            App.showToast(`File Excel Live berhasil dibuat & dihubungkan: ${this.fileName}`, 'success');
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error(err);
                App.showToast('Gagal membuat file Excel baru: ' + err.message, 'danger');
            }
        }
    },

    async syncToLocalExcelFile() {
        if (!this.fileHandle || !this.ensureXLSX()) return;
        try {
            const wb = this.buildFullWorkbook();
            const wbOut = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const writable = await this.fileHandle.createWritable();
            await writable.write(new Blob([wbOut], { type: 'application/octet-stream' }));
            await writable.close();
        } catch (err) {
            console.error('Auto-sync Excel error:', err);
            App.showToast('Gagal menyimpan otomatis ke file Excel (pastikan file tidak sedang dikunci/dibuka di Excel).', 'warning');
        }
    },

    updateStatusUI(connected) {
        const dot = document.getElementById('excelStatusDot');
        const title = document.getElementById('excelStatusText');
        const desc = document.getElementById('excelFileName');
        const hubBadge = document.getElementById('hubExcelStatusText');

        if (connected && this.fileName) {
            if (dot) dot.classList.add('connected');
            if (title) title.textContent = 'LIVE XLSX';
            if (desc) desc.textContent = this.fileName;
            if (hubBadge) {
                hubBadge.textContent = 'TERHUBUNG: ' + this.fileName;
                hubBadge.className = 'mono text-ok';
            }
        } else {
            if (dot) dot.classList.remove('connected');
            if (title) title.textContent = 'LOKAL';
            if (desc) desc.textContent = 'Browser Storage';
            if (hubBadge) {
                hubBadge.textContent = 'Tidak ada file .xlsx yang ditautkan';
                hubBadge.className = 'mono';
            }
        }
    }
};

window.ExcelManager = ExcelManager;

