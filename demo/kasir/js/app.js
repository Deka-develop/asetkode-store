/**
 * js/app.js
 * Main Application Controller: POS, Inventory, Stock Mutations, Reports, Thermal Receipt
 */

const App = {
    currentTab: 'pos',
    posSelectedCategory: 'ALL',
    priceMode: 'retail', // 'retail' | 'wholesale'
    catalogView: 'grid', // 'grid' | 'table'
    cart: [],

    init() {
        DataStore.init();
        this.bindEvents();
        this.startLiveClock();
        this.loadSettingsToUI();
        this.refreshAllViews();
    },

    bindEvents() {
        const posSearch = document.getElementById('posSearchInput');
        posSearch.addEventListener('input', () => this.renderPosCatalog());
        posSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleBarcodeOrQuickAdd(posSearch.value.trim());
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'F1') {
                e.preventDefault();
                this.switchTab('pos');
            } else if (e.key === 'F2') {
                e.preventDefault();
                this.switchTab('pos');
                document.getElementById('posSearchInput').focus();
                document.getElementById('posSearchInput').select();
            } else if (e.key === 'F4') {
                if (this.currentTab === 'pos' && this.cart.length > 0) {
                    e.preventDefault();
                    this.processCheckout();
                }
            }
        });
    },

    startLiveClock() {
        const updateClock = () => {
            const now = new Date();
            const clockEl = document.getElementById('liveClock');
            const dateEl = document.getElementById('liveDate');
            if (clockEl) {
                clockEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false });
            }
            if (dateEl) {
                dateEl.textContent = now.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
            }
        };
        updateClock();
        setInterval(updateClock, 1000);
    },

    switchTab(tabId) {
        this.currentTab = tabId;
        document.querySelectorAll('.nav-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        document.querySelectorAll('.view-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab-${tabId}`);
        });
        this.refreshAllViews();
    },

    refreshAllViews() {
        this.updateNextInvoicePreview();
        this.renderCategoryFilters();
        this.renderPosCatalog();
        this.renderCart();
        this.renderInventoryTable();
        this.renderMutationsTable();
        this.renderTransactionsTable();
        this.renderDashboard();
        this.updateLowStockBadge();
    },

    // ==================== POS & BARCODE SCANNER ====================
    setPriceMode(mode) {
        this.priceMode = mode;
        document.getElementById('modeRetailBtn').classList.toggle('active', mode === 'retail');
        document.getElementById('modeWholesaleBtn').classList.toggle('active', mode === 'wholesale');

        const gtModeEl = document.getElementById('gtPriceModeIndicator');
        if (gtModeEl) {
            gtModeEl.textContent = mode === 'wholesale' ? 'Harga Grosir' : 'Harga Eceran';
        }

        this.cart.forEach(item => {
            const prod = DataStore.products.find(p => p.id === item.productId);
            if (prod) {
                item.price = mode === 'wholesale' && prod.wholesalePrice ? prod.wholesalePrice : prod.price;
            }
        });

        this.renderPosCatalog();
        this.renderCart();
        this.showToast(`Mode harga aktif: ${mode === 'wholesale' ? 'Grosir' : 'Eceran'}`, 'success');
    },

    selectPaymentMethod(method) {
        const input = document.getElementById('cartPaymentMethod');
        if (input) input.value = method;
        document.querySelectorAll('.pm-tile').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.method === method);
        });
        this.updateCheckoutCalculations();
    },

    setCatalogView(view) {
        this.catalogView = view;
        document.getElementById('viewGridBtn').classList.toggle('active', view === 'grid');
        document.getElementById('viewTableBtn').classList.toggle('active', view === 'table');
        this.renderPosCatalog();
    },

    getActivePrice(product) {
        if (this.priceMode === 'wholesale' && product.wholesalePrice && product.wholesalePrice > 0) {
            return Number(product.wholesalePrice);
        }
        return Number(product.price);
    },

    handleBarcodeOrQuickAdd(query) {
        if (!query) return;
        const exactMatch = DataStore.products.find(
            p => p.sku.toLowerCase() === query.toLowerCase()
        );
        if (exactMatch) {
            this.addToCart(exactMatch.id);
            document.getElementById('posSearchInput').value = '';
            this.renderPosCatalog();
            return;
        }

        const filtered = DataStore.products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length === 1) {
            this.addToCart(filtered[0].id);
            document.getElementById('posSearchInput').value = '';
            this.renderPosCatalog();
        }
    },

    renderCategoryFilters() {
        const categories = ['ALL', ...new Set(DataStore.products.map(p => p.category).filter(Boolean))];
        const pillsContainer = document.getElementById('posCategoryPills');
        if (pillsContainer) {
            pillsContainer.innerHTML = categories.map(cat => {
                const count = cat === 'ALL'
                    ? DataStore.products.length
                    : DataStore.products.filter(p => p.category === cat).length;
                return `
                    <button class="cat-tab ${this.posSelectedCategory === cat ? 'active' : ''}"
                            onclick="App.selectPosCategory('${cat.replace(/'/g, "\\'")}')">
                        <span>${cat === 'ALL' ? 'Semua Barang' : cat}</span>
                        <span class="cat-count">${count}</span>
                    </button>
                `;
            }).join('');
        }

        const invCatSelect = document.getElementById('invCategoryFilter');
        if (invCatSelect) {
            const currentVal = invCatSelect.value || 'ALL';
            invCatSelect.innerHTML = categories.map(cat => `
                <option value="${cat}">${cat === 'ALL' ? 'Semua Kategori' : cat}</option>
            `).join('');
            invCatSelect.value = categories.includes(currentVal) ? currentVal : 'ALL';
        }
    },

    selectPosCategory(cat) {
        this.posSelectedCategory = cat;
        this.renderCategoryFilters();
        this.renderPosCatalog();
    },

    renderPosCatalog() {
        const container = document.getElementById('posCatalogContainer');
        if (!container) return;

        const query = (document.getElementById('posSearchInput')?.value || '').trim().toLowerCase();

        const filtered = DataStore.products.filter(p => {
            const matchCat = this.posSelectedCategory === 'ALL' || p.category === this.posSelectedCategory;
            const matchQuery = !query ||
                p.name.toLowerCase().includes(query) ||
                p.sku.toLowerCase().includes(query) ||
                (p.rack && p.rack.toLowerCase().includes(query));
            return matchCat && matchQuery;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="padding: 40px 20px; text-align:center; color: var(--text-muted); border: 1px solid var(--border-default); border-radius: var(--radius-md); background: #fff;">
                    Barang tidak ditemukan. Periksa kata kunci pencarian atau tambah di menu Inventaris.
                </div>
            `;
            return;
        }

        if (this.catalogView === 'table') {
            container.innerHTML = `
                <div class="table-card">
                    <table class="data-grid">
                        <thead>
                            <tr>
                                <th style="width:120px">KODE SKU</th>
                                <th>NAMA BARANG</th>
                                <th>RAK</th>
                                <th class="text-right">STOK</th>
                                <th class="text-right">HARGA (${this.priceMode === 'wholesale' ? 'GROSIR' : 'ECERAN'})</th>
                                <th class="text-right" style="width:90px">PILIH</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filtered.map(p => {
                                const activePrice = this.getActivePrice(p);
                                const stockCls = p.stock <= 0 ? 'text-err' : (p.stock <= p.minStock ? 'text-warn' : '');
                                return `
                                    <tr style="cursor:pointer;" onclick="App.addToCart('${p.id}')">
                                        <td class="mono">${p.sku}</td>
                                        <td><strong>${p.name}</strong></td>
                                        <td>${p.rack || '-'}</td>
                                        <td class="text-right mono ${stockCls}"><strong>${p.stock}</strong> ${p.unit}</td>
                                        <td class="text-right mono"><strong>${formatRupiah(activePrice)}</strong></td>
                                        <td class="text-right"><button class="btn btn-sm">+ Tambah</button></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="product-grid">
                ${filtered.map(p => {
                    const activePrice = this.getActivePrice(p);
                    const stockClass = p.stock <= 0 ? 'empty' : (p.stock <= p.minStock ? 'low' : 'ok');
                    const stockLabel = p.stock <= 0 ? 'Habis' : `${p.stock} ${p.unit}`;

                    return `
                        <div class="item-tile ${p.stock <= 0 ? 'depleted' : ''}" onclick="App.addToCart('${p.id}')">
                            <div>
                                <div class="tile-meta">
                                    <span class="tile-sku">${p.sku}</span>
                                    <span class="tile-rack">${p.rack || ''}</span>
                                </div>
                                <div class="tile-title">${p.name}</div>
                            </div>
                            <div class="tile-foot">
                                <span class="tile-price">${formatRupiah(activePrice)}</span>
                                <span class="tile-stock ${stockClass}">${stockLabel}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // ==================== CART MANAGEMENT ====================
    addToCart(productId) {
        const product = DataStore.products.find(p => p.id === productId);
        if (!product) return;

        if (product.stock <= 0) {
            this.showToast(`Stok "${product.name}" habis (0 ${product.unit})`, 'danger');
            return;
        }

        const existingItem = this.cart.find(item => item.productId === productId);
        const activePrice = this.getActivePrice(product);

        if (existingItem) {
            if (existingItem.qty + 1 > product.stock) {
                this.showToast(`Melebihi stok gudang (${product.stock} ${product.unit})`, 'warning');
                return;
            }
            existingItem.qty += 1;
            existingItem.price = activePrice;
        } else {
            this.cart.push({
                productId: product.id,
                sku: product.sku,
                name: product.name,
                unit: product.unit || 'Pcs',
                cost: Number(product.cost) || 0,
                price: activePrice,
                qty: 1
            });
        }

        this.renderCart();
    },

    updateCartQty(productId, newQty) {
        const qty = parseInt(newQty, 10);
        if (isNaN(qty) || qty <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const product = DataStore.products.find(p => p.id === productId);
        if (product && qty > product.stock) {
            this.showToast(`Maksimal stok tersedia: ${product.stock} ${product.unit}`, 'warning');
            const item = this.cart.find(i => i.productId === productId);
            if (item) item.qty = product.stock;
            this.renderCart();
            return;
        }

        const item = this.cart.find(i => i.productId === productId);
        if (item) {
            item.qty = qty;
            this.renderCart();
        }
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(i => i.productId !== productId);
        this.renderCart();
    },

    clearCart() {
        this.cart = [];
        document.getElementById('cartDiscountInput').value = 0;
        document.getElementById('cartCashReceived').value = '';
        document.getElementById('cartCustomerName').value = '';
        this.selectPaymentMethod('Tunai');
        this.renderCart();
    },

    renderCart() {
        const container = document.getElementById('cartItemsContainer');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="ticket-empty">
                    <div style="font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">Belum ada barang di nota</div>
                    <div>Pilih barang dari katalog di kiri atau scan barcode SKU.</div>
                </div>
            `;
        } else {
            container.innerHTML = this.cart.map(item => {
                const sub = item.price * item.qty;
                return `
                    <div class="ticket-row">
                        <div>
                            <div class="ticket-item-name">${item.name}</div>
                            <div class="ticket-item-unitprice">${formatRupiah(item.price)} / ${item.unit}</div>
                        </div>
                        <div class="text-center">
                            <div class="qty-box">
                                <button class="qty-step" onclick="App.updateCartQty('${item.productId}', ${item.qty - 1})">-</button>
                                <input type="number" class="qty-val" value="${item.qty}" min="1"
                                       onchange="App.updateCartQty('${item.productId}', this.value)">
                                <button class="qty-step" onclick="App.updateCartQty('${item.productId}', ${item.qty + 1})">+</button>
                            </div>
                        </div>
                        <div class="ticket-line-total">${sub.toLocaleString('id-ID')}</div>
                        <button class="btn-line-del" onclick="App.removeFromCart('${item.productId}')" title="Hapus">&times;</button>
                    </div>
                `;
            }).join('');
        }

        this.updateCheckoutCalculations();
    },

    getCheckoutNumbers() {
        const totalQty = this.cart.reduce((sum, i) => sum + i.qty, 0);
        const subtotal = this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const totalCost = this.cart.reduce((sum, i) => sum + (i.cost * i.qty), 0);
        const discount = Math.max(0, Number(document.getElementById('cartDiscountInput')?.value) || 0);
        const afterDiscount = Math.max(0, subtotal - discount);

        const useTax = document.getElementById('cartTaxCheckbox')?.checked;
        const taxRate = Number(DataStore.settings.taxRate) || 11;
        const tax = useTax ? Math.round(afterDiscount * (taxRate / 100)) : 0;
        const grandTotal = afterDiscount + tax;

        const paymentMethod = document.getElementById('cartPaymentMethod')?.value || 'Tunai';
        const rawCash = document.getElementById('cartCashReceived')?.value;
        const cashReceived = paymentMethod === 'Tunai'
            ? (rawCash === '' ? 0 : Number(rawCash))
            : (paymentMethod === 'Kasbon' ? 0 : grandTotal);

        const change = cashReceived - grandTotal;
        const profit = afterDiscount - totalCost;

        return {
            totalQty,
            subtotal,
            totalCost,
            discount,
            tax,
            grandTotal,
            paymentMethod,
            cashReceived,
            change,
            profit
        };
    },

    updateCheckoutCalculations() {
        const calc = this.getCheckoutNumbers();

        document.getElementById('cartTotalQty').textContent = calc.totalQty;
        document.getElementById('cartSubtotalDisplay').textContent = formatRupiah(calc.subtotal);
        document.getElementById('cartTaxDisplay').textContent = formatRupiah(calc.tax);
        document.getElementById('cartGrandTotalDisplay').textContent = formatRupiah(calc.grandTotal);

        const changeRow = document.querySelector('.change-row');
        const changeLabel = document.getElementById('changeLabel');
        const changeDisplay = document.getElementById('cartChangeDisplay');

        if (calc.paymentMethod === 'Kasbon') {
            changeRow.classList.add('underpaid');
            changeLabel.textContent = 'PIUTANG KASBON';
            changeDisplay.textContent = formatRupiah(calc.grandTotal);
        } else if (calc.paymentMethod !== 'Tunai') {
            changeRow.classList.remove('underpaid');
            changeLabel.textContent = `BAYAR ${calc.paymentMethod.toUpperCase()}`;
            changeDisplay.textContent = 'Uang Pas';
        } else {
            if (calc.cashReceived >= calc.grandTotal) {
                changeRow.classList.remove('underpaid');
                changeLabel.textContent = 'KEMBALIAN';
                changeDisplay.textContent = formatRupiah(calc.change);
            } else {
                changeRow.classList.add('underpaid');
                changeLabel.textContent = 'KURANG BAYAR';
                changeDisplay.textContent = formatRupiah(Math.abs(calc.change));
            }
        }
    },

    setQuickCash(amount) {
        const calc = this.getCheckoutNumbers();
        const input = document.getElementById('cartCashReceived');
        if (amount === 'exact') {
            input.value = calc.grandTotal;
        } else {
            input.value = amount;
        }
        this.selectPaymentMethod('Tunai');
        this.updateCheckoutCalculations();
    },

    updateNextInvoicePreview() {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const seq = String(DataStore.transactions.length + 1).padStart(3, '0');
        const inv = `INV-${datePart}-${seq}`;
        const el = document.getElementById('cartInvoicePreview');
        if (el) el.textContent = inv;
        return inv;
    },

    processCheckout() {
        if (this.cart.length === 0) {
            this.showToast('Keranjang nota masih kosong.', 'warning');
            return;
        }

        const calc = this.getCheckoutNumbers();
        if (calc.paymentMethod === 'Tunai' && calc.cashReceived < calc.grandTotal) {
            this.showToast('Nominal uang diterima kurang dari total tagihan.', 'danger');
            document.getElementById('cartCashReceived').focus();
            return;
        }

        const invoiceId = this.updateNextInvoicePreview();
        const nowIso = new Date().toISOString();
        const customer = document.getElementById('cartCustomerName').value.trim() || 'Pelanggan Umum';

        const trxItems = this.cart.map(item => {
            const prod = DataStore.products.find(p => p.id === item.productId);
            if (prod) {
                prod.stock = Math.max(0, Number(prod.stock) - item.qty);
                DataStore.mutations.unshift({
                    id: 'MUT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                    timestamp: nowIso,
                    productId: prod.id,
                    sku: prod.sku,
                    productName: prod.name,
                    type: 'OUT',
                    change: -item.qty,
                    finalStock: prod.stock,
                    note: `Penjualan Kasir (${invoiceId})`
                });
            }
            return {
                productId: item.productId,
                sku: item.sku,
                name: item.name,
                qty: item.qty,
                unit: item.unit,
                cost: item.cost,
                price: item.price,
                subtotal: item.price * item.qty
            };
        });

        const newTrx = {
            id: invoiceId,
            timestamp: nowIso,
            customer,
            paymentMethod: calc.paymentMethod,
            priceMode: this.priceMode,
            subtotal: calc.subtotal,
            discount: calc.discount,
            tax: calc.tax,
            grandTotal: calc.grandTotal,
            totalCost: calc.totalCost,
            profit: calc.profit,
            cashReceived: calc.cashReceived,
            change: Math.max(0, calc.change),
            status: calc.paymentMethod === 'Kasbon' ? 'BELUM LUNAS' : 'LUNAS',
            items: trxItems
        };

        DataStore.transactions.unshift(newTrx);
        DataStore.saveAll();

        this.clearCart();
        this.refreshAllViews();
        this.showReceipt(newTrx, DataStore.settings.autoPrint);
        this.showToast(`Transaksi ${invoiceId} berhasil disimpan.`, 'success');
    },

    // ==================== THERMAL RECEIPT GENERATOR ====================
    showReceipt(trx, triggerPrint = false) {
        const s = DataStore.settings;
        const itemsHtml = trx.items.map(item => `
            <div style="margin-bottom: 4px;">
                <div class="receipt-bold">${item.name}</div>
                <div class="receipt-row">
                    <span>${item.qty} ${item.unit} x ${item.price.toLocaleString('id-ID')}</span>
                    <span>${item.subtotal.toLocaleString('id-ID')}</span>
                </div>
            </div>
        `).join('');

        const receiptHtml = `
            <div class="receipt-box">
                <div class="receipt-center">
                    <div class="receipt-bold" style="font-size: 13px;">${s.storeName}</div>
                    <div>${s.storeAddress}</div>
                    <div>Telp: ${s.storePhone}</div>
                </div>
                <div class="receipt-divider"></div>
                <div class="receipt-row"><span>NOTA: ${trx.id}</span></div>
                <div class="receipt-row"><span>TGL : ${formatDateTime(trx.timestamp)}</span></div>
                <div class="receipt-row"><span>PLG : ${trx.customer}</span><span>[${trx.paymentMethod}]</span></div>
                <div class="receipt-divider"></div>
                ${itemsHtml}
                <div class="receipt-divider"></div>
                <div class="receipt-row">
                    <span>Subtotal</span>
                    <span>${formatRupiah(trx.subtotal)}</span>
                </div>
                ${trx.discount > 0 ? `
                <div class="receipt-row">
                    <span>Potongan</span>
                    <span>-${formatRupiah(trx.discount)}</span>
                </div>` : ''}
                ${trx.tax > 0 ? `
                <div class="receipt-row">
                    <span>PPN</span>
                    <span>${formatRupiah(trx.tax)}</span>
                </div>` : ''}
                <div class="receipt-row receipt-bold" style="font-size: 12.5px; margin-top: 3px;">
                    <span>TOTAL</span>
                    <span>${formatRupiah(trx.grandTotal)}</span>
                </div>
                <div class="receipt-row">
                    <span>Bayar</span>
                    <span>${formatRupiah(trx.cashReceived)}</span>
                </div>
                <div class="receipt-row">
                    <span>${trx.status === 'BELUM LUNAS' ? 'Status' : 'Kembali'}</span>
                    <span>${trx.status === 'BELUM LUNAS' ? 'KASBON / TEMPO' : formatRupiah(trx.change)}</span>
                </div>
                <div class="receipt-divider"></div>
                <div class="receipt-center" style="white-space: pre-line; margin-top: 6px;">${s.receiptFooter}</div>
            </div>
        `;

        const printableArea = document.getElementById('printableReceipt');
        printableArea.className = `print-only paper-${s.paperSize || '58mm'}`;
        printableArea.innerHTML = receiptHtml;

        document.getElementById('receiptModalPreview').innerHTML = receiptHtml;
        document.getElementById('receiptModal').classList.remove('hidden');

        if (triggerPrint) {
            setTimeout(() => window.print(), 250);
        }
    },

    closeReceiptModal() {
        document.getElementById('receiptModal').classList.add('hidden');
    },

    // ==================== INVENTORY & WAREHOUSE MANAGEMENT ====================
    renderInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;

        const totalSku = DataStore.products.length;
        const totalUnits = DataStore.products.reduce((s, p) => s + (Number(p.stock) || 0), 0);
        const totalCost = DataStore.products.reduce((s, p) => s + ((Number(p.cost) || 0) * (Number(p.stock) || 0)), 0);
        const totalRetail = DataStore.products.reduce((s, p) => s + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);
        const lowStockCount = DataStore.products.filter(p => p.stock <= p.minStock).length;

        document.getElementById('invTotalSku').textContent = totalSku;
        document.getElementById('invTotalUnitText').textContent = `${totalUnits.toLocaleString('id-ID')} unit fisik di gudang`;
        document.getElementById('invTotalAssetCost').textContent = formatRupiah(totalCost);
        document.getElementById('invTotalRetailValue').textContent = formatRupiah(totalRetail);
        document.getElementById('invPotentialProfitText').textContent = `Margin potensial ${formatRupiah(totalRetail - totalCost)}`;
        document.getElementById('invLowStockCount').textContent = lowStockCount;

        const search = (document.getElementById('invSearchInput')?.value || '').trim().toLowerCase();
        const catFilter = document.getElementById('invCategoryFilter')?.value || 'ALL';
        const stockFilter = document.getElementById('invStockFilter')?.value || 'ALL';

        const filtered = DataStore.products.filter(p => {
            const matchSearch = !search ||
                p.name.toLowerCase().includes(search) ||
                p.sku.toLowerCase().includes(search) ||
                (p.rack && p.rack.toLowerCase().includes(search)) ||
                (p.supplier && p.supplier.toLowerCase().includes(search));
            const matchCat = catFilter === 'ALL' || p.category === catFilter;
            let matchStock = true;
            if (stockFilter === 'LOW') matchStock = p.stock <= p.minStock;
            if (stockFilter === 'OUT') matchStock = p.stock <= 0;
            if (stockFilter === 'SAFE') matchStock = p.stock > p.minStock;
            return matchSearch && matchCat && matchStock;
        });

        tbody.innerHTML = filtered.map(p => {
            let statusTag = `<span class="tag tag-ok">Aman</span>`;
            if (p.stock <= 0) {
                statusTag = `<span class="tag tag-err">Habis</span>`;
            } else if (p.stock <= p.minStock) {
                statusTag = `<span class="tag tag-warn">Menipis (Min ${p.minStock})</span>`;
            }

            return `
                <tr>
                    <td class="mono">${p.sku}</td>
                    <td>
                        <strong>${p.name}</strong>
                        <div style="color:var(--text-muted); font-size:11.5px;">Supplier: ${p.supplier || '-'}</div>
                    </td>
                    <td>${p.category}</td>
                    <td>${p.rack || '-'}</td>
                    <td class="text-right mono">${formatRupiah(p.cost)}</td>
                    <td class="text-right mono"><strong>${formatRupiah(p.price)}</strong></td>
                    <td class="text-right mono">${formatRupiah(p.wholesalePrice || p.price)}</td>
                    <td class="text-right mono"><strong>${p.stock}</strong> ${p.unit}</td>
                    <td class="text-center">${statusTag}</td>
                    <td class="text-right">
                        <button class="btn btn-sm" onclick="App.openMutationModal('${p.id}')">+/- Stok</button>
                        <button class="btn btn-sm" onclick="App.openProductModal('${p.id}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="App.deleteProduct('${p.id}')">Hapus</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    updateLowStockBadge() {
        const count = DataStore.products.filter(p => p.stock <= p.minStock).length;
        const badge = document.getElementById('lowStockBadge');
        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
    },

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        document.getElementById('productForm').reset();

        if (productId) {
            const p = DataStore.products.find(item => item.id === productId);
            if (!p) return;
            title.textContent = `Edit Barang — ${p.sku}`;
            document.getElementById('prodId').value = p.id;
            document.getElementById('prodSku').value = p.sku;
            document.getElementById('prodCategory').value = p.category;
            document.getElementById('prodName').value = p.name;
            document.getElementById('prodCost').value = p.cost;
            document.getElementById('prodPrice').value = p.price;
            document.getElementById('prodWholesalePrice').value = p.wholesalePrice || p.price;
            document.getElementById('prodStock').value = p.stock;
            document.getElementById('prodMinStock').value = p.minStock;
            document.getElementById('prodUnit').value = p.unit || 'Pcs';
            document.getElementById('prodRack').value = p.rack || '';
            document.getElementById('prodSupplier').value = p.supplier || '';
        } else {
            title.textContent = 'Tambah Master Barang Baru';
            document.getElementById('prodId').value = '';
            this.generateRandomSku();
        }

        modal.classList.remove('hidden');
    },

    closeProductModal() {
        document.getElementById('productModal').classList.add('hidden');
    },

    generateRandomSku() {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('prodSku').value = '899' + randomNum;
    },

    saveProduct(event) {
        event.preventDefault();
        const id = document.getElementById('prodId').value;
        const sku = document.getElementById('prodSku').value.trim();
        const category = document.getElementById('prodCategory').value.trim();
        const name = document.getElementById('prodName').value.trim();
        const cost = Number(document.getElementById('prodCost').value) || 0;
        const price = Number(document.getElementById('prodPrice').value) || 0;
        const wholesalePrice = Number(document.getElementById('prodWholesalePrice').value) || price;
        const stock = Number(document.getElementById('prodStock').value) || 0;
        const minStock = Number(document.getElementById('prodMinStock').value) || 0;
        const unit = document.getElementById('prodUnit').value;
        const rack = document.getElementById('prodRack').value.trim();
        const supplier = document.getElementById('prodSupplier').value.trim();

        if (id) {
            const p = DataStore.products.find(item => item.id === id);
            if (p) {
                const diff = stock - p.stock;
                if (diff !== 0) {
                    DataStore.mutations.unshift({
                        id: 'MUT-' + Date.now(),
                        timestamp: new Date().toISOString(),
                        productId: p.id,
                        sku,
                        productName: name,
                        type: 'OPNAME',
                        change: diff,
                        finalStock: stock,
                        note: 'Koreksi Master Barang'
                    });
                }
                Object.assign(p, { sku, category, name, cost, price, wholesalePrice, stock, minStock, unit, rack, supplier });
            }
            this.showToast(`Data "${name}" berhasil diperbarui.`, 'success');
        } else {
            const newId = 'PRD-' + Date.now();
            DataStore.products.unshift({
                id: newId,
                sku,
                category,
                name,
                cost,
                price,
                wholesalePrice,
                stock,
                minStock,
                unit,
                rack,
                supplier
            });
            if (stock > 0) {
                DataStore.mutations.unshift({
                    id: 'MUT-' + Date.now(),
                    timestamp: new Date().toISOString(),
                    productId: newId,
                    sku,
                    productName: name,
                    type: 'IN',
                    change: stock,
                    finalStock: stock,
                    note: 'Saldo Awal Barang Baru'
                });
            }
            this.showToast(`Barang "${name}" berhasil ditambahkan.`, 'success');
        }

        DataStore.saveAll();
        this.closeProductModal();
        this.refreshAllViews();
    },

    deleteProduct(productId) {
        const p = DataStore.products.find(item => item.id === productId);
        if (!p) return;
        if (!confirm(`Hapus barang "${p.name}" (${p.sku})?`)) return;

        DataStore.products = DataStore.products.filter(item => item.id !== productId);
        DataStore.saveAll();
        this.refreshAllViews();
        this.showToast(`Barang "${p.name}" dihapus.`, 'warning');
    },

    // ==================== MUTASI STOK GUDANG ====================
    openMutationModal(preselectedProductId = null) {
        const select = document.getElementById('mutProductId');
        select.innerHTML = DataStore.products.map(p => `
            <option value="${p.id}">${p.sku} — ${p.name} (Stok: ${p.stock} ${p.unit})</option>
        `).join('');

        if (preselectedProductId) {
            select.value = preselectedProductId;
        }

        document.getElementById('mutType').value = 'IN';
        document.getElementById('mutQty').value = 10;
        document.getElementById('mutNote').value = '';
        this.onMutationProductChange();
        document.getElementById('mutationModal').classList.remove('hidden');
    },

    closeMutationModal() {
        document.getElementById('mutationModal').classList.add('hidden');
    },

    onMutationProductChange() {
        const prodId = document.getElementById('mutProductId').value;
        const type = document.getElementById('mutType').value;
        const prod = DataStore.products.find(p => p.id === prodId);
        const infoEl = document.getElementById('mutCurrentStockInfo');
        const qtyLabel = document.getElementById('mutQtyLabel');

        if (prod) {
            infoEl.textContent = `Stok Gudang Saat Ini: ${prod.stock} ${prod.unit} | Rak: ${prod.rack || '-'}`;
        }
        if (type === 'OPNAME') {
            qtyLabel.textContent = 'Jumlah Fisik Sebenarnya *';
            if (prod) document.getElementById('mutQty').value = prod.stock;
            document.getElementById('mutQty').min = 0;
        } else {
            qtyLabel.textContent = type === 'IN' ? 'Jumlah Barang Masuk (+) *' : 'Jumlah Barang Keluar (-) *';
            document.getElementById('mutQty').min = 1;
        }
    },

    saveMutation(event) {
        event.preventDefault();
        const prodId = document.getElementById('mutProductId').value;
        const type = document.getElementById('mutType').value;
        const qty = Number(document.getElementById('mutQty').value) || 0;
        const note = document.getElementById('mutNote').value.trim();

        const prod = DataStore.products.find(p => p.id === prodId);
        if (!prod) return;

        let change = 0;
        let finalStock = prod.stock;

        if (type === 'IN') {
            change = qty;
            finalStock = prod.stock + qty;
        } else if (type === 'OUT') {
            if (qty > prod.stock) {
                this.showToast(`Stok tidak cukup (Tersedia: ${prod.stock} ${prod.unit}).`, 'danger');
                return;
            }
            change = -qty;
            finalStock = prod.stock - qty;
        } else if (type === 'OPNAME') {
            change = qty - prod.stock;
            finalStock = qty;
        }

        prod.stock = finalStock;
        DataStore.mutations.unshift({
            id: 'MUT-' + Date.now(),
            timestamp: new Date().toISOString(),
            productId: prod.id,
            sku: prod.sku,
            productName: prod.name,
            type,
            change,
            finalStock,
            note
        });

        DataStore.saveAll();
        this.closeMutationModal();
        this.refreshAllViews();
        this.showToast(`Kartu stok "${prod.name}" diperbarui -> ${finalStock} ${prod.unit}`, 'success');
    },

    renderMutationsTable() {
        const tbody = document.getElementById('mutationsTableBody');
        if (!tbody) return;

        const search = (document.getElementById('mutSearchInput')?.value || '').trim().toLowerCase();
        const typeFilter = document.getElementById('mutTypeFilter')?.value || 'ALL';

        const filtered = DataStore.mutations.filter(m => {
            const matchType = typeFilter === 'ALL' || m.type === typeFilter;
            const matchSearch = !search ||
                m.productName.toLowerCase().includes(search) ||
                m.sku.toLowerCase().includes(search) ||
                (m.note && m.note.toLowerCase().includes(search));
            return matchType && matchSearch;
        });

        tbody.innerHTML = filtered.map(m => {
            let tag = `<span class="tag tag-ok">Masuk</span>`;
            if (m.type === 'OUT') tag = `<span class="tag tag-err">Keluar</span>`;
            if (m.type === 'OPNAME') tag = `<span class="tag tag-warn">Opname</span>`;

            const changeFormatted = m.change > 0 ? `+${m.change}` : `${m.change}`;
            const changeColor = m.change > 0 ? 'text-ok' : (m.change < 0 ? 'text-err' : '');

            return `
                <tr>
                    <td class="mono">${formatDateTime(m.timestamp)}</td>
                    <td class="mono">${m.sku}</td>
                    <td><strong>${m.productName}</strong></td>
                    <td>${tag}</td>
                    <td class="text-right mono ${changeColor}"><strong>${changeFormatted}</strong></td>
                    <td class="text-right mono">${m.finalStock}</td>
                    <td>${m.note || '-'}</td>
                </tr>
            `;
        }).join('');
    },

    // ==================== TRANSACTIONS & REPORTS ====================
    renderTransactionsTable() {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;

        const search = (document.getElementById('trxSearchInput')?.value || '').trim().toLowerCase();
        const dateFrom = document.getElementById('trxDateFrom')?.value;
        const dateTo = document.getElementById('trxDateTo')?.value;
        const methodFilter = document.getElementById('trxMethodFilter')?.value || 'ALL';

        const filtered = DataStore.transactions.filter(t => {
            const matchMethod = methodFilter === 'ALL' || t.paymentMethod === methodFilter;
            const matchSearch = !search ||
                t.id.toLowerCase().includes(search) ||
                (t.customer && t.customer.toLowerCase().includes(search)) ||
                t.items.some(i => i.name.toLowerCase().includes(search));

            const trxDate = t.timestamp.slice(0, 10);
            const matchFrom = !dateFrom || trxDate >= dateFrom;
            const matchTo = !dateTo || trxDate <= dateTo;

            return matchMethod && matchSearch && matchFrom && matchTo;
        });

        const totalRev = filtered.reduce((s, t) => s + t.grandTotal, 0);
        const totalCost = filtered.reduce((s, t) => s + t.totalCost, 0);
        const totalProfit = filtered.reduce((s, t) => s + t.profit, 0);

        document.getElementById('trxFilteredCount').textContent = filtered.length;
        document.getElementById('trxFilteredRevenue').textContent = formatRupiah(totalRev);
        document.getElementById('trxFilteredCost').textContent = formatRupiah(totalCost);
        document.getElementById('trxFilteredProfit').textContent = formatRupiah(totalProfit);

        tbody.innerHTML = filtered.map(t => {
            const itemSummary = t.items.map(i => `${i.name} (${i.qty})`).join(', ');
            const isKasbon = t.status === 'BELUM LUNAS';

            return `
                <tr>
                    <td class="mono"><strong>${t.id}</strong></td>
                    <td class="mono">${formatDateTime(t.timestamp)}</td>
                    <td>${t.customer}</td>
                    <td style="max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemSummary}">
                        ${itemSummary}
                    </td>
                    <td>
                        <span class="tag ${isKasbon ? 'tag-warn' : 'tag-neutral'}">
                            ${t.paymentMethod} ${isKasbon ? '(Tempo)' : ''}
                        </span>
                    </td>
                    <td class="text-right mono"><strong>${formatRupiah(t.grandTotal)}</strong></td>
                    <td class="text-right mono text-ok">${formatRupiah(t.profit)}</td>
                    <td class="text-right">
                        ${isKasbon ? `<button class="btn btn-primary btn-sm" onclick="App.settleKasbon('${t.id}')">Lunasi</button>` : ''}
                        <button class="btn btn-sm" onclick="App.reprintTransaction('${t.id}')">Struk</button>
                        <button class="btn btn-danger btn-sm" onclick="App.voidTransaction('${t.id}')">Retur</button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    reprintTransaction(trxId) {
        const trx = DataStore.transactions.find(t => t.id === trxId);
        if (trx) this.showReceipt(trx, false);
    },

    settleKasbon(trxId) {
        const trx = DataStore.transactions.find(t => t.id === trxId);
        if (!trx) return;
        if (!confirm(`Lunasi piutang nota ${trx.id} (${trx.customer}) senilai ${formatRupiah(trx.grandTotal)}?`)) return;

        trx.status = 'LUNAS';
        trx.paymentMethod = 'Tunai (Pelunasan)';
        trx.cashReceived = trx.grandTotal;
        DataStore.saveAll();
        this.refreshAllViews();
        this.showToast(`Nota ${trx.id} telah ditandai LUNAS.`, 'success');
    },

    voidTransaction(trxId) {
        const trx = DataStore.transactions.find(t => t.id === trxId);
        if (!trx) return;
        if (!confirm(`Retur/batalkan nota ${trx.id}? Kuantitas barang akan dikembalikan ke stok gudang.`)) return;

        trx.items.forEach(item => {
            const prod = DataStore.products.find(p => p.id === item.productId);
            if (prod) {
                prod.stock += item.qty;
                DataStore.mutations.unshift({
                    id: 'MUT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                    timestamp: new Date().toISOString(),
                    productId: prod.id,
                    sku: prod.sku,
                    productName: prod.name,
                    type: 'IN',
                    change: item.qty,
                    finalStock: prod.stock,
                    note: `Retur Nota ${trx.id}`
                });
            }
        });

        DataStore.transactions = DataStore.transactions.filter(t => t.id !== trxId);
        DataStore.saveAll();
        this.refreshAllViews();
        this.showToast(`Nota ${trxId} diretur & stok dikembalikan.`, 'warning');
    },

    // ==================== DASHBOARD & ANALYTICS ====================
    renderDashboard() {
        const todayStr = new Date().toISOString().slice(0, 10);
        const monthStr = new Date().toISOString().slice(0, 7);

        const todayTrx = DataStore.transactions.filter(t => t.timestamp.slice(0, 10) === todayStr);
        const monthTrx = DataStore.transactions.filter(t => t.timestamp.slice(0, 7) === monthStr);
        const kasbonTrx = DataStore.transactions.filter(t => t.status === 'BELUM LUNAS');

        const todayRev = todayTrx.reduce((s, t) => s + t.grandTotal, 0);
        const todayProfit = todayTrx.reduce((s, t) => s + t.profit, 0);
        const todayMargin = todayRev > 0 ? ((todayProfit / todayRev) * 100).toFixed(1) : 0;

        const monthRev = monthTrx.reduce((s, t) => s + t.grandTotal, 0);
        const monthProfit = monthTrx.reduce((s, t) => s + t.profit, 0);
        const kasbonTotal = kasbonTrx.reduce((s, t) => s + t.grandTotal, 0);

        document.getElementById('dashTodayRevenue').textContent = formatRupiah(todayRev);
        document.getElementById('dashTodayTrxCount').textContent = `${todayTrx.length} transaksi hari ini`;
        document.getElementById('dashTodayProfit').textContent = formatRupiah(todayProfit);
        document.getElementById('dashTodayMargin').textContent = `Margin keuntungan ${todayMargin}%`;
        document.getElementById('dashMonthRevenue').textContent = formatRupiah(monthRev);
        document.getElementById('dashMonthProfit').textContent = `Laba bersih: ${formatRupiah(monthProfit)}`;
        document.getElementById('dashKasbonTotal').textContent = formatRupiah(kasbonTotal);
        document.getElementById('dashKasbonCount').textContent = `${kasbonTrx.length} nota tempo aktif`;

        const productSalesMap = {};
        DataStore.transactions.forEach(t => {
            t.items.forEach(item => {
                if (!productSalesMap[item.productId]) {
                    productSalesMap[item.productId] = {
                        name: item.name,
                        unit: item.unit,
                        qty: 0,
                        revenue: 0,
                        profit: 0
                    };
                }
                productSalesMap[item.productId].qty += item.qty;
                productSalesMap[item.productId].revenue += item.subtotal;
                productSalesMap[item.productId].profit += (item.subtotal - (item.cost * item.qty));
            });
        });

        const topProducts = Object.values(productSalesMap)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 8);

        const topBody = document.getElementById('topProductsTableBody');
        if (topBody) {
            topBody.innerHTML = topProducts.length === 0
                ? `<tr><td colspan="4" class="text-center">Belum ada transaksi</td></tr>`
                : topProducts.map(item => `
                    <tr>
                        <td><strong>${item.name}</strong></td>
                        <td class="text-right mono">${item.qty} ${item.unit}</td>
                        <td class="text-right mono">${formatRupiah(item.revenue)}</td>
                        <td class="text-right mono text-ok"><strong>${formatRupiah(item.profit)}</strong></td>
                    </tr>
                `).join('');
        }

        const lowStockItems = DataStore.products
            .filter(p => p.stock <= p.minStock)
            .sort((a, b) => a.stock - b.stock);

        const lowBody = document.getElementById('lowStockDashboardBody');
        if (lowBody) {
            lowBody.innerHTML = lowStockItems.length === 0
                ? `<tr><td colspan="5" class="text-center text-ok">Seluruh stok barang di atas batas minimum.</td></tr>`
                : lowStockItems.map(p => `
                    <tr>
                        <td><strong>${p.name}</strong></td>
                        <td>${p.rack || '-'}</td>
                        <td class="text-right mono text-err"><strong>${p.stock} ${p.unit}</strong></td>
                        <td class="text-right mono">${p.minStock} ${p.unit}</td>
                        <td>${p.supplier || '-'}</td>
                    </tr>
                `).join('');
        }
    },

    // ==================== SETTINGS & MAINTENANCE ====================
    loadSettingsToUI() {
        const s = DataStore.settings;
        document.getElementById('sidebarStoreName').textContent = s.storeName;
        document.getElementById('taxRateLabel').textContent = s.taxRate;

        document.getElementById('setStoreName').value = s.storeName;
        document.getElementById('setStoreAddress').value = s.storeAddress;
        document.getElementById('setStorePhone').value = s.storePhone;
        document.getElementById('setTaxRate').value = s.taxRate;
        document.getElementById('setPaperSize').value = s.paperSize || '58mm';
        document.getElementById('setAutoPrint').value = String(Boolean(s.autoPrint));
        document.getElementById('setReceiptFooter').value = s.receiptFooter;
    },

    saveSettings(event) {
        event.preventDefault();
        DataStore.settings = {
            storeName: document.getElementById('setStoreName').value.trim(),
            storeAddress: document.getElementById('setStoreAddress').value.trim(),
            storePhone: document.getElementById('setStorePhone').value.trim(),
            taxRate: Number(document.getElementById('setTaxRate').value) || 0,
            paperSize: document.getElementById('setPaperSize').value,
            autoPrint: document.getElementById('setAutoPrint').value === 'true',
            receiptFooter: document.getElementById('setReceiptFooter').value.trim()
        };
        DataStore.saveAll();
        this.loadSettingsToUI();
        this.updateCheckoutCalculations();
        this.showToast('Pengaturan toko berhasil disimpan.', 'success');
    },

    resetToDemoData() {
        if (!confirm('Muat ulang data contoh awal?')) return;
        localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
        localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
        localStorage.removeItem(STORAGE_KEYS.MUTATIONS);
        DataStore.init();
        this.refreshAllViews();
        this.showToast('Data contoh berhasil dimuat.', 'success');
    },

    clearAllData() {
        if (!confirm('Kosongkan seluruh barang gudang dan nota transaksi?')) return;
        DataStore.products = [];
        DataStore.transactions = [];
        DataStore.mutations = [];
        DataStore.saveAll();
        this.refreshAllViews();
        this.showToast('Seluruh tabel telah dikosongkan.', 'warning');
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

window.App = App;
window.addEventListener('DOMContentLoaded', () => App.init());
