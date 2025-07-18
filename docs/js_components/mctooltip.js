export function initMinecraftTooltips() {
  const tooltip = document.createElement('div');
  tooltip.className = 'mc-tooltip';
  tooltip.innerHTML = `<div class="mc-inner"><span></span></div>`;
  document.body.appendChild(tooltip);

  const style = document.createElement('style');
  style.textContent = `
.mc-tooltip {
  position: fixed;
  display: none;
  pointer-events: none;
  z-index: 9999;
  background-color: #150b1a; /* äußerer schwarzer Rahmen */
}
.mc-inner {
  background-color: #2e0059; /* lila */
  padding: 3px;
  border-radius: 0;
}
.mc-inner span {
  display: inline-block;
  background-color: #150b1a;
  color: white;
  font-family: 'Mojangles';
  font-size: 14px;
  line-height: 1;
}
`;
  document.head.appendChild(style);

  // Suche alle Elemente mit "mctip"-Attribut
  const elements = document.querySelectorAll('[mctip]');
  elements.forEach(el => {
    const show = e => {
      tooltip.querySelector('span').textContent = el.getAttribute('mctip');
      tooltip.style.display = 'block';
      move(e);
    };
    const hide = () => tooltip.style.display = 'none';
    const move = e => {
      tooltip.style.left = `${e.pageX + 8}px`;
      tooltip.style.top = `${e.pageY + 8}px`;
    };

    el.addEventListener('mouseenter', show);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', hide);

    // Touch-Support (antippen → zeigen, zweites Mal → ausblenden)
    let tooltipVisible = false;
    el.addEventListener('touchstart', e => {
      if (tooltipVisible) {
        hide();
        tooltipVisible = false;
      } else {
        show(e.touches[0]);
        tooltipVisible = true;
      }
    });
    el.addEventListener('touchend', () => {
      setTimeout(() => {
        hide();
        tooltipVisible = false;
      }, 2500); // optional Auto-hide nach 2,5 s
    });
  });
}
