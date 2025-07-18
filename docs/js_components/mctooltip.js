const style = `
.mc-tooltip {
  position: absolute;
  display: none;
  pointer-events: none;
  z-index: 9999;

  font-family: 'Mojangles', monospace;
  font-size: 16px;
  line-height: 1;
  color: #ffffff;

  padding: 4px 6px;
  background-color: #150b1a;

  box-shadow:
    -3px 0 #2e0059, -4px 0 #150b1a,
     3px 0 #2e0059,  4px 0 #150b1a,
     0 -2px #2e0059, 0 -3px #150b1a,
     0  3px #2e0059, 0  4px #150b1a;

  white-space: nowrap;
  user-select: none;
  border-radius: 0;
}
`;

function injectStyle() {
  const s = document.createElement('style');
  s.textContent = style;
  document.head.appendChild(s);
}

function createTooltip(el, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'mc-tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const move = e => {
    tooltip.style.left = `${e.pageX + 8}px`;
    tooltip.style.top = `${e.pageY - 12}px`;
  };

  el.addEventListener('mouseenter', e => {
    tooltip.style.display = 'block';
    move(e);
  });
  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  let tooltipVisible = false;
  el.addEventListener('touchstart', e => {
    if (tooltipVisible) {
      tooltip.style.display = 'none';
      tooltipVisible = false;
    } else {
      tooltip.textContent = text;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.touches[0].pageX + 8}px`;
      tooltip.style.top = `${e.touches[0].pageY - 12}px`;
      tooltipVisible = true;
    }
  });
}

export function initMinecraftTooltips() {
  const elements = document.querySelectorAll('[mctip]');
  if (!elements.length) return;
  injectStyle();
  elements.forEach(el => createTooltip(el, el.getAttribute('mctip')));
}
