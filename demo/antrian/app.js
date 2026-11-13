(function () {
  const STORAGE_KEY = 'asetkode_antrian_state_v1';
  const SERVICE_NAMES = {
    A: 'Layanan Umum / Kasir',
    B: 'Customer Service',
    C: 'Prioritas / Pengambilan'
  };

  function defaultState() {
    return {
      counters: { A: 0, B: 0, C: 0 },
      waiting: [
        { code: 'A-001', service: 'A', createdAt: new Date().toLocaleTimeString('id-ID') },
        { code: 'A-002', service: 'A', createdAt: new Date().toLocaleTimeString('id-ID') },
        { code: 'B-001', service: 'B', createdAt: new Date().toLocaleTimeString('id-ID') }
      ],
      current: null,
      lastByService: { A: '—', B: '—', C: '—' },
      history: []
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const init = defaultState();
        init.counters = { A: 2, B: 1, C: 0 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
        return init;
      }
      return JSON.parse(raw);
    } catch {
      return defaultState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
    render();
  }

  function playChime() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.14);
        osc.stop(ctx.currentTime + idx * 0.14 + 0.36);
      });
    } catch {}
  }

  function speakCall(code, loket) {
    const chk = document.getElementById('voiceEnabled');
    if (chk && !chk.checked) return;
    playChime();
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const spokenCode = code.replace('-', ' ').split('').join(' ');
        const msg = new SpeechSynthesisUtterance(`Nomor antrian ${spokenCode}, silakan menuju ke ${loket}`);
        msg.lang = 'id-ID';
        msg.rate = 0.92;
        setTimeout(() => window.speechSynthesis.speak(msg), 450);
      } catch {}
    }
  }

  function formatTicket(service, num) {
    return `${service}-${String(num).padStart(3, '0')}`;
  }

  function takeNumber(service, showPrint) {
    state.counters[service] = (state.counters[service] || 0) + 1;
    const code = formatTicket(service, state.counters[service]);
    const item = {
      code,
      service,
      createdAt: new Date().toLocaleTimeString('id-ID')
    };
    state.waiting.push(item);
    saveState();

    if (showPrint) {
      const box = document.getElementById('lastTicketBox');
      if (box) box.style.display = 'block';
      document.getElementById('ticketPreviewNum').textContent = code;
      document.getElementById('ticketPreviewMeta').textContent = `${SERVICE_NAMES[service]} • ${item.createdAt}`;
      document.getElementById('printNum').textContent = code;
      document.getElementById('printMeta').textContent = `${SERVICE_NAMES[service]} | ${new Date().toLocaleString('id-ID')}`;
    }
  }

  function callNext() {
    if (state.waiting.length === 0) {
      alert('Belum ada antrian menunggu.');
      return;
    }
    const next = state.waiting.shift();
    const loket = document.getElementById('activeLoketSelect').value;
    const calledAt = new Date().toLocaleTimeString('id-ID');
    state.current = { ...next, loket, calledAt };
    state.lastByService[next.service] = next.code;
    state.history.unshift({ ...state.current, status: 'Dipanggil' });
    state.history = state.history.slice(0, 20);
    saveState();
    speakCall(next.code, loket);
  }

  function recallCurrent() {
    if (!state.current) {
      alert('Belum ada nomor yang sedang dipanggil.');
      return;
    }
    const loket = document.getElementById('activeLoketSelect').value;
    state.current.loket = loket;
    saveState();
    speakCall(state.current.code, loket);
  }

  function skipCurrent() {
    if (state.waiting.length === 0) return;
    const skipped = state.waiting.shift();
    state.history.unshift({
      ...skipped,
      loket: document.getElementById('activeLoketSelect').value,
      calledAt: new Date().toLocaleTimeString('id-ID'),
      status: 'Dilewati'
    });
    state.history = state.history.slice(0, 20);
    saveState();
  }

  function render() {
    const cur = state.current;
    document.getElementById('opCurrentNum').textContent = cur ? cur.code : '—';
    document.getElementById('opCurrentMeta').textContent = cur
      ? `${cur.loket} • ${SERVICE_NAMES[cur.service]} (${cur.calledAt})`
      : 'Belum ada antrian dipanggil';

    document.getElementById('monCurrentNum').textContent = cur ? cur.code : '—';
    document.getElementById('monCurrentLoket').textContent = cur ? cur.loket.toUpperCase() : 'SILAKAN MENUNGGU';
    document.getElementById('monLastA').textContent = state.lastByService.A || '—';
    document.getElementById('monLastB').textContent = state.lastByService.B || '—';
    document.getElementById('monLastC').textContent = state.lastByService.C || '—';
    document.getElementById('monWaitingTotal').textContent = String(state.waiting.length);
    document.getElementById('waitingCount').textContent = String(state.waiting.length);

    document.getElementById('kioskCountA').textContent = String(state.waiting.filter((x) => x.service === 'A').length);
    document.getElementById('kioskCountB').textContent = String(state.waiting.filter((x) => x.service === 'B').length);
    document.getElementById('kioskCountC').textContent = String(state.waiting.filter((x) => x.service === 'C').length);

    const wEl = document.getElementById('waitingList');
    if (state.waiting.length === 0) {
      wEl.innerHTML = '<div class="q-empty">Tidak ada antrian menunggu.</div>';
    } else {
      wEl.innerHTML = state.waiting
        .map((w) => `<div class="q-item"><span class="q-code">${w.code}</span><span>${SERVICE_NAMES[w.service]}</span><span>${w.createdAt}</span></div>`)
        .join('');
    }

    const hEl = document.getElementById('historyList');
    if (state.history.length === 0) {
      hEl.innerHTML = '<div class="q-empty">Belum ada riwayat panggilan.</div>';
    } else {
      hEl.innerHTML = state.history
        .slice(0, 8)
        .map((h) => `<div class="q-item"><span class="q-code">${h.code}</span><span>${h.loket} (${h.status})</span><span>${h.calledAt}</span></div>`)
        .join('');
    }
  }

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('view-' + btn.getAttribute('data-view'));
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('[data-take]').forEach((btn) => {
    btn.addEventListener('click', () => {
      takeNumber(btn.getAttribute('data-take'), btn.getAttribute('data-print') === '1');
    });
  });

  document.getElementById('callNextBtn').addEventListener('click', callNext);
  document.getElementById('recallBtn').addEventListener('click', recallCurrent);
  document.getElementById('skipBtn').addEventListener('click', skipCurrent);

  document.getElementById('printTicketBtn').addEventListener('click', () => window.print());

  document.getElementById('resetQueueBtn').addEventListener('click', () => {
    if (!confirm('Reset semua nomor antrian hari ini kembali ke 0?')) return;
    state = { counters: { A: 0, B: 0, C: 0 }, waiting: [], current: null, lastByService: { A: '—', B: '—', C: '—' }, history: [] };
    saveState();
  });

  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const rows = ['Kode,Layanan,Loket,Waktu,Status'];
    state.history.forEach((h) => rows.push(`${h.code},"${SERVICE_NAMES[h.service]}","${h.loket}",${h.calledAt},${h.status}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `riwayat-antrian-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = loadState();
      render();
    }
  });

  setInterval(() => {
    const el = document.getElementById('monClock');
    if (el) el.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);

  render();
})();
