document.addEventListener('DOMContentLoaded', () => {
  const target = new Date('2025-12-19T00:00:00');
  const el = document.getElementById('countdown-timer');
  const elTogether = document.getElementById('together-timer');

  function formatNumber(n) { return String(n).padStart(2, '0'); }

  function buildHtmlParts(years, months, days, hours, minutes, seconds, prefix) {
    return `
      <div class="countdown-inner">
        <div class="countdown-item"><div class="num">${years}</div><div class="label">Años</div></div>
        <div class="countdown-item"><div class="num">${months}</div><div class="label">Meses</div></div>
        <div class="countdown-item"><div class="num">${days}</div><div class="label">Días</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(hours)}</div><div class="label">Horas</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(minutes)}</div><div class="label">Min</div></div>
        <div class="countdown-item"><div class="num">${formatNumber(seconds)}</div><div class="label">Seg</div></div>
      </div>
      <div style="margin-top:8px;font-size:0.9rem;color:rgba(255,255,255,0.9);">${prefix}</div>
    `;
  }

  function diffDateParts(start, end) {
    // returns { years, months, days, hours, minutes, seconds }
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    if (seconds < 0) { seconds += 60; minutes -= 1; }
    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0) { hours += 24; days -= 1; }
    if (days < 0) {
      // borrow days from previous month of 'end'
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
      months -= 1;
    }
    if (months < 0) { months += 12; years -= 1; }

    return { years, months, days, hours, minutes, seconds };
  }

  function updateCountdown() {
    if (!el) return;
    const now = new Date();
    // Always count up from target date. Before target, show zeros and a note.
    let prefixHero = 'Tiempo desde el 19/12/2025';
    let prefixTogether = 'Llevamos juntos desde el 19/12/2025';
    if (now < target) {
      // show zeros until the date arrives
      if (el) el.innerHTML = buildHtmlParts(0,0,0,0,0,0, 'Comenzará el 19/12/2025');
      if (elTogether) elTogether.innerHTML = buildHtmlParts(0,0,0,0,0,0, 'Comenzará el 19/12/2025');
      return;
    }

    const parts = diffDateParts(target, now);
    if (el) el.innerHTML = buildHtmlParts(parts.years, parts.months, parts.days, parts.hours, parts.minutes, parts.seconds, prefixHero);
    if (elTogether) elTogether.innerHTML = buildHtmlParts(parts.years, parts.months, parts.days, parts.hours, parts.minutes, parts.seconds, prefixTogether);
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
