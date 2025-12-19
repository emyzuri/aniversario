document.addEventListener('DOMContentLoaded', () => {
  // Fecha de inicio: 19 de Diciembre de 2025
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
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    // Lógica de ajuste para tiempos negativos (cuando el actual es menor al inicial en esa unidad)
    if (seconds < 0) { seconds += 60; minutes -= 1; }
    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0) { hours += 24; days -= 1; }
    if (days < 0) {
      // Obtener el último día del mes anterior para "pedir prestado"
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
      months -= 1;
    }
    if (months < 0) { months += 12; years -= 1; }

    return { years, months, days, hours, minutes, seconds };
  }

  function updateCountdown() {
    const now = new Date();
    
    // Si aún no llegamos al 19 de diciembre de 2025
    if (now < target) {
      const msg = 'Comenzará el 19/12/2025';
      if (el) el.innerHTML = buildHtmlParts(0,0,0,0,0,0, msg);
      if (elTogether) elTogether.innerHTML = buildHtmlParts(0,0,0,0,0,0, msg);
      return;
    }

    // Si ya pasó la fecha, calculamos el tiempo transcurrido
    const parts = diffDateParts(target, now);
    const prefixHero = 'Tiempo transcurrido';
    const prefixTogether = 'Llevamos juntos';

    if (el) el.innerHTML = buildHtmlParts(parts.years, parts.months, parts.days, parts.hours, parts.minutes, parts.seconds, prefixHero);
    if (elTogether) elTogether.innerHTML = buildHtmlParts(parts.years, parts.months, parts.days, parts.hours, parts.minutes, parts.seconds, prefixTogether);
  }

  // Ejecución inicial y repetitiva
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animación de corazones
  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    h.innerText = '❤️'; // Asegúrate de que tenga contenido o estilo CSS
    h.style.position = 'fixed';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top = '-40px';
    h.style.fontSize = (Math.random() * 20 + 10) + 'px';
    h.style.transition = 'transform 3.6s linear, opacity 3.6s';
    document.body.appendChild(h);

    // Animación simple via JS si no tienes CSS
    setTimeout(() => {
      h.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
      h.style.opacity = '0';
    }, 50);

    setTimeout(() => h.remove(), 4000);
  }

  setInterval(spawnHeart, 450);
});
