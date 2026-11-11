/**
 * js/data.js
 * State Management, Initial Sample Data, and LocalStorage Persistence
 */

const STORAGE_KEYS = {
    PRODUCTS: 'kasirexcel_products_v1',
    TRANSACTIONS: 'kasirexcel_transactions_v1',
    MUTATIONS: 'kasirexcel_mutations_v1',
    SETTINGS: 'kasirexcel_settings_v1'
};

const DEFAULT_SETTINGS = {
    storeName: 'TOKO BERKAH MANDIRI',
    storeAddress: 'Jl. Merdeka Raya No. 45, Jakarta',
    storePhone: '0812-3456-7890',
    taxRate: 11,
    paperSize: '58mm',
    autoPrint: false,
    receiptFooter: 'Terima kasih atas kunjungan Anda!\nBarang yang sudah dibeli tidak dapat ditukar.'
};

const INITIAL_PRODUCTS = [
    {
        id: 'PRD-001',
        sku: '899100101',
        name: 'Beras Ramos Super 5kg',
        category: 'Sembako',
        cost: 64000,
        price: 72000,
        wholesalePrice: 69500,
        stock: 28,
        minStock: 10,
        unit: 'Pack',
        rack: 'Rak A-01',
        supplier: 'UD Pangan Makmur'
    },
    {
        id: 'PRD-002',
        sku: '899100102',
        name: 'Minyak Goreng Bimoli Pouch 2L',
        category: 'Sembako',
        cost: 33500,
        price: 38000,
        wholesalePrice: 36500,
        stock: 42,
        minStock: 15,
        unit: 'Pcs',
        rack: 'Rak A-02',
        supplier: 'PT Indomarco'
    },
    {
        id: 'PRD-003',
        sku: '899100103',
        name: 'Gula Pasir Gulaku Premium 1kg',
        category: 'Sembako',
        cost: 15500,
        price: 18000,
        wholesalePrice: 17200,
        stock: 8,
        minStock: 12,
        unit: 'Pack',
        rack: 'Rak A-03',
        supplier: 'UD Pangan Makmur'
    },
    {
        id: 'PRD-004',
        sku: '899100104',
        name: 'Indomie Goreng Spesial 85g',
        category: 'Makanan Ringan',
        cost: 2750,
        price: 3500,
        wholesalePrice: 3100,
        stock: 160,
        minStock: 40,
        unit: 'Pcs',
        rack: 'Rak B-01',
        supplier: 'PT Indomarco'
    },
    {
        id: 'PRD-005',
        sku: '899100105',
        name: 'Telur Ayam Negeri (1 Kg)',
        category: 'Sembako',
        cost: 25000,
        price: 29000,
        wholesalePrice: 27500,
        stock: 6,
        minStock: 10,
        unit: 'Kg',
        rack: 'Meja Tengah',
        supplier: 'Peternakan Sejahtera'
    },
    {
        id: 'PRD-006',
        sku: '899100106',
        name: 'Kopi Kapal Api Special Mix (1 Renceng)',
        category: 'Minuman',
        cost: 12500,
        price: 15000,
        wholesalePrice: 14000,
        stock: 35,
        minStock: 10,
        unit: 'Pack',
        rack: 'Rak C-01',
        supplier: 'Agen Kopi Nusantara'
    },
    {
        id: 'PRD-007',
        sku: '899100107',
        name: 'Teh Pucuk Harum 350ml',
        category: 'Minuman',
        cost: 2800,
        price: 4000,
        wholesalePrice: 3500,
        stock: 72,
        minStock: 24,
        unit: 'Botol',
        rack: 'Showcase Dingin',
        supplier: 'Mayora Distribusi'
    },
    {
        id: 'PRD-008',
        sku: '899100108',
        name: 'Aqua Air Mineral 600ml',
        category: 'Minuman',
        cost: 2400,
        price: 3500,
        wholesalePrice: 3000,
        stock: 96,
        minStock: 24,
        unit: 'Botol',
        rack: 'Showcase Dingin',
        supplier: 'Tirta Investama'
    },
    {
        id: 'PRD-009',
        sku: '899100109',
        name: 'Sabun Cuci Piring Sunlight 650ml',
        category: 'Kebutuhan Rumah',
        cost: 11500,
        price: 14500,
        wholesalePrice: 13500,
        stock: 4,
        minStock: 8,
        unit: 'Pcs',
        rack: 'Rak D-01',
        supplier: 'Unilever Dist'
    },
    {
        id: 'PRD-010',
        sku: '899100110',
        name: 'Deterjen Rinso Anti Noda 770g',
        category: 'Kebutuhan Rumah',
        cost: 18500,
        price: 22500,
        wholesalePrice: 21000,
        stock: 19,
        minStock: 8,
        unit: 'Pack',
        rack: 'Rak D-02',
        supplier: 'Unilever Dist'
    },
    {
        id: 'PRD-011',
        sku: '899100111',
        name: 'Kertas HVS PaperOne A4 80gsm (1 Rim)',
        category: 'ATK & Kantor',
        cost: 46000,
        price: 55000,
        wholesalePrice: 52000,
        stock: 22,
        minStock: 5,
        unit: 'Box',
        rack: 'Rak E-01',
        supplier: 'CV Mitra ATK'
    },
    {
        id: 'PRD-012',
        sku: '899100112',
        name: 'Pulpen Standard AE7 Hitam (1 Lusin)',
        category: 'ATK & Kantor',
        cost: 19000,
        price: 25000,
        wholesalePrice: 22500,
        stock: 15,
        minStock: 5,
        unit: 'Lusin',
        rack: 'Rak E-02',
        supplier: 'CV Mitra ATK'
    }
];

const DataStore = {
    products: [],
    transactions: [],
    mutations: [],
    settings: { ...DEFAULT_SETTINGS },

    init() {
        const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        const savedMutations = localStorage.getItem(STORAGE_KEYS.MUTATIONS);
        const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        } else {
            this.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
        }

        if (savedTransactions) {
            this.transactions = JSON.parse(savedTransactions);
        } else {
            this.transactions = this.generateInitialTransactions();
        }

        if (savedMutations) {
            this.mutations = JSON.parse(savedMutations);
        } else {
            this.mutations = this.generateInitialMutations();
        }

        if (savedSettings) {
            this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
        }

        this.saveAll(false);
    },

    generateInitialTransactions() {
        const now = new Date();
        const todayIso = now.toISOString();
        return [
            {
                id: 'INV-' + now.toISOString().slice(0, 10).replace(/-/g, '') + '-001',
                timestamp: todayIso,
                customer: 'Ibu Sari (Warung)',
                paymentMethod: 'Tunai',
                priceMode: 'retail',
                subtotal: 128000,
                discount: 0,
                tax: 0,
                grandTotal: 128000,
                totalCost: 113000,
                profit: 15000,
                cashReceived: 150000,
                change: 22000,
                status: 'LUNAS',
                items: [
                    { productId: 'PRD-001', sku: '899100101', name: 'Beras Ramos Super 5kg', qty: 1, unit: 'Pack', cost: 64000, price: 72000, subtotal: 72000 },
                    { productId: 'PRD-002', sku: '899100102', name: 'Minyak Goreng Bimoli Pouch 2L', qty: 1, unit: 'Pcs', cost: 33500, price: 38000, subtotal: 38000 },
                    { productId: 'PRD-003', sku: '899100103', name: 'Gula Pasir Gulaku Premium 1kg', qty: 1, unit: 'Pack', cost: 15500, price: 18000, subtotal: 18000 }
                ]
            },
            {
                id: 'INV-' + now.toISOString().slice(0, 10).replace(/-/g, '') + '-002',
                timestamp: todayIso,
                customer: 'Bpk. Hendra',
                paymentMethod: 'QRIS',
                priceMode: 'retail',
                subtotal: 80000,
                discount: 0,
                tax: 0,
                grandTotal: 80000,
                totalCost: 65000,
                profit: 15000,
                cashReceived: 80000,
                change: 0,
                status: 'LUNAS',
                items: [
                    { productId: 'PRD-011', sku: '899100111', name: 'Kertas HVS PaperOne A4 80gsm (1 Rim)', qty: 1, unit: 'Box', cost: 46000, price: 55000, subtotal: 55000 },
                    { productId: 'PRD-012', sku: '899100112', name: 'Pulpen Standard AE7 Hitam (1 Lusin)', qty: 1, unit: 'Lusin', cost: 19000, price: 25000, subtotal: 25000 }
                ]
            }
        ];
    },

    generateInitialMutations() {
        const now = new Date().toISOString();
        return [
            {
                id: 'MUT-001',
                timestamp: now,
                productId: 'PRD-001',
                sku: '899100101',
                productName: 'Beras Ramos Super 5kg',
                type: 'IN',
                change: 30,
                finalStock: 29,
                note: 'Stok Awal & Restock UD Pangan Makmur'
            },
            {
                id: 'MUT-002',
                timestamp: now,
                productId: 'PRD-001',
                sku: '899100101',
                productName: 'Beras Ramos Super 5kg',
                type: 'OUT',
                change: -1,
                finalStock: 28,
                note: 'Penjualan Kasir (Nota Awal)'
            }
        ];
    },

    saveAll(syncExcel = true) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(this.transactions));
        localStorage.setItem(STORAGE_KEYS.MUTATIONS, JSON.stringify(this.mutations));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));

        if (syncExcel && window.ExcelManager && ExcelManager.fileHandle) {
            ExcelManager.syncToLocalExcelFile();
        }
    }
};

// Formatting Helpers
function formatRupiah(num) {
    const n = Number(num) || 0;
    return 'Rp ' + n.toLocaleString('id-ID');
}

function formatDateTime(isoStr) {
    if (!isoStr) return '-';
    const d = new Date(isoStr);
    return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) + ' ' + d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

