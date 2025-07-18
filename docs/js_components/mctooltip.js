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
  background-color: #150b1a;
}
.mc-inner {
  background-color: #2e0059;
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

  const elements = document.querySelectorAll('[mctip]');
  let activeElement = null;

  const show = (text, pageX, pageY) => {
    tooltip.querySelector('span').textContent = text;
    tooltip.style.left = `${pageX + 8}px`;
    tooltip.style.top = `${pageY + 8}px`;
    tooltip.style.display = 'block';
  };

  const hide = () => { tooltip.style.display = 'none'; activeElement = null; };

  const onBodyClick = e => { if (!tooltip.contains(e.target) && !activeElement?.contains(e.target)) { hide(); } };

  elements.forEach(el => {
    const text = el.getAttribute('mctip');

    el.addEventListener('mouseenter', e => {
      if (window.innerWidth > 768) {
        show(text, e.pageX, e.pageY);
        activeElement = el;
      }
    });
    el.addEventListener('mousemove', e => {
      if (window.innerWidth > 768 && tooltip.style.display === 'block') {
        tooltip.style.left = `${e.pageX + 8}px`;
        tooltip.style.top = `${e.pageY + 8}px`;
      }
    });
    el.addEventListener('mouseleave', () => { if (window.innerWidth > 768) hide(); });

    el.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        const rect = el.getBoundingClientRect();
        const pageX = rect.left + rect.width / 2 + window.scrollX;
        const pageY = rect.top + rect.height / 2 + window.scrollY;

        if (activeElement === el) { hide(); } else { show(text, pageX, pageY); activeElement = el; }
      }
    });
  });

  document.addEventListener('click', onBodyClick);
}
