(function () {
  const STORAGE_KEY = 'asetkode_absensi_qr_v1';
  const DEFAULT_MEMBERS = [
    { id: 'EMP-001', name: 'Budi Santoso', role: 'Staff Kasir' },
    { id: 'EMP-002', name: 'Siti Aminah', role: 'Admin Gudang' },
    { id: 'EMP-003', name: 'Andi Wijaya', role: 'XII IPA 1' },
    { id: 'EMP-004', name: 'Rina Marlina', role: 'Customer Service' }
  ];

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      members: DEFAULT_MEMBERS,
      logs: [{ id: 'EMP-001', name: 'Budi Santoso', role: 'Staff Kasir', time: '07:52:10', status: 'Tepat Waktu' }]
    };
  }

  let data = loadData();
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    render();
  }

  function makeDeterministicQrSvg(code) {
    let hash = 0;
    for (let i = 0; i < code.length; i++) hash = (hash * 31 + code.charCodeAt(i)) >>> 0;
    let rects = '';
    const size = 7;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const bit = ((hash >> ((r * size + c) % 24)) ^ (r + c)) & 1;
        if (bit || (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2)) {
          rects += `<rect x="${c * 12 + 8}" y="${r * 12 + 8}" width="10" height="10" fill="#0f172a"/>`;
        }
      }
    }
    return `<svg viewBox="0 0 100 100" class="qr-svg" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  function recordAttendance(code) {
    const clean = (code || '').trim().toUpperCase();
    const member = data.members.find((m) => m.id === clean);
    const fb = document.getElementById('scanFeedback');
    if (!member) {
      fb.style.display = 'block';
      fb.textContent = `ID "${clean}" tidak ditemukan. Pilih dari daftar anggota atau buat kartu QR baru.`;
      return;
    }
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
    const status = now.getHours() >= 8 && now.getMinutes() > 15 ? 'Terlambat' : 'Tepat Waktu';
    data.logs.unshift({ id: member.id, name: member.name, role: member.role, time: timeStr, status });
    save();
    fb.style.display = 'block';
    fb.textContent = `✓ Berhasil dicatat: ${member.name} (${member.id}) pukul ${timeStr} — ${status}`;
  }

  function render() {
    document.getElementById('todayCountPill').textContent = `${data.logs.length} Tercatat`;
    document.getElementById('quickScanBtns').innerHTML = data.members
      .map((m) => `<button type="button" class="q-chip" data-scan="${m.id}">Scan ${m.id} (${m.name})</button>`)
      .join('');

    document.getElementById('todayAttList').innerHTML = data.logs
      .slice(0, 12)
      .map((l) => `<div class="att-row"><div><strong>${l.name}</strong> <small style="color:#64748b;">(${l.id})</small></div><div><span>${l.time}</span> • <span class="${l.status === 'Tepat Waktu' ? 'status-ok' : 'status-late'}">${l.status}</span></div></div>`)
      .join('');

    document.getElementById('qrCardsGrid').innerHTML = data.members
      .map((m) => `<div class="qr-card"><div style="font-weight:800;">${m.name}</div><div style="font-size:0.78rem;color:#64748b;">${m.role}</div>${makeDeterministicQrSvg(m.id)}<div style="font-family:monospace;font-weight:700;">${m.id}</div></div>`)
      .join('');

    document.getElementById('reportTableBody').innerHTML = data.logs
      .map((l) => `<tr><td><code>${l.id}</code></td><td>${l.name}</td><td>${l.role}</td><td>${l.time}</td><td class="${l.status === 'Tepat Waktu' ? 'status-ok' : 'status-late'}">${l.status}</td></tr>`)
      .join('');
  }

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  document.getElementById('scanSubmitBtn').addEventListener('click', () => {
    recordAttendance(document.getElementById('scanInput').value);
  });

  document.getElementById('quickScanBtns').addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-scan');
    if (id) {
      document.getElementById('scanInput').value = id;
      recordAttendance(id);
    }
  });

  document.getElementById('addMemberForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('mName').value.trim();
    const role = document.getElementById('mRole').value.trim();
    const id = `EMP-${String(data.members.length + 1).padStart(3, '0')}`;
    data.members.push({ id, name, role });
    e.target.reset();
    save();
  });

  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const rows = ['ID,Nama,Divisi,Jam,Status'];
    data.logs.forEach((l) => rows.push(`${l.id},"${l.name}","${l.role}",${l.time},${l.status}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rekap-absensi-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  setInterval(() => {
    document.getElementById('liveClock').textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });
  }, 1000);

  render();
})();
