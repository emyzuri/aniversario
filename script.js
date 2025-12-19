document.addEventListener('DOMContentLoaded', () => {
  const target = new Date('2025-12-19T00:00:00');
  const el = document.getElementById('countdown-timer');

  function formatNumber(n) { return String(n).padStart(2, '0'); }

  function buildHtml(days, hours, minutes, seconds, prefix) {
    return `
      <div class="countdown-inner">
        <div class="countdown-item"><div class="num">${days}</div><div class="label">Días</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(hours)}</div><div class="label">Horas</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(minutes)}</div><div class="label">Min</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(seconds)}</div><div class="label">Seg</div></div>
      </div>
      <div style="margin-top:8px;font-size:0.9rem;color:rgba(255,255,255,0.9);">${prefix}</div>
    `;
  }

  function updateCountdown() {
    if (!el) return;
    const now = new Date();
    // Always count up from target date. Before target, show zeros and a note.
    let diff = now - target;
    let prefix = 'Tiempo desde el 19/12/2025';
    if (diff < 0) {
      diff = 0;
      prefix = 'Comenzará el 19/12/2025';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    el.innerHTML = buildHtml(days, hours, minutes, seconds, prefix);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Simple heart confetti (lightweight)
  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top = '-40px';
    document.body.appendChild(h);
    setTimeout(() => {
      h.remove();
    }, 3600);
  }

  setInterval(spawnHeart, 450);
});
