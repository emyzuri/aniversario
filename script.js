document.addEventListener('DOMContentLoaded', () => {
  const target = new Date('2025-12-19T00:00:00');
  const el = document.getElementById('countdown-timer');

  function formatNumber(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    if (!el) return;
    const now = new Date();
    let diff = target - now;
    if (diff <= 0) {
      el.textContent = '¡Feliz Aniversario!';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    el.innerHTML = `
      <div class="countdown-inner">
        <div class="countdown-item"><div class="num">${days}</div><div class="label">Días</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(hours)}</div><div class="label">Horas</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(minutes)}</div><div class="label">Min</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(seconds)}</div><div class="label">Seg</div></div>
      </div>
    `;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

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
