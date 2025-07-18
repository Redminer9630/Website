const style = `
.mc-tooltip {
  position: fixed;
  display: none;
  pointer-events: none;
  z-index: 9999;

  font-family: 'Mojangles';
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

let currentTooltip = null;
let currentElement = null;

function moveTooltip(e, tooltip) {
  const rect = tooltip.getBoundingClientRect();
  const margin = 8;
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;

  let left = e.clientX + margin;
  let top = e.clientY - 12;

  if (left + rect.width > vpW) {
    left = e.clientX - rect.width - margin;
  }
  if (top < 0) {
    top = e.clientY + 12;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function createTooltip(el, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'mc-tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const show = e => {
    tooltip.style.display = 'block';
    moveTooltip(e, tooltip);
    currentTooltip = tooltip;
    currentElement = el;
  };

  const hide = () => {
    tooltip.style.display = 'none';
    currentTooltip = null;
    currentElement = null;
  };
  el.addEventListener('mouseenter', show);
  el.addEventListener('mousemove', e => moveTooltip(e, tooltip));
  el.addEventListener('mouseleave', hide);
  let visible = false;

  el.addEventListener('touchstart', e => {
    e.stopPropagation();
    if (visible) {
      moveTooltip(e.touches[0], tooltip);
    } else {
      show(e.touches[0]);
      visible = true;
    }
  });

  document.addEventListener('touchstart', evt => {
    if (
      currentTooltip &&
      !currentTooltip.contains(evt.target) &&
      !currentElement?.contains(evt.target)
    ) {
      currentTooltip.style.display = 'none';
      currentTooltip = null;
      currentElement = null;
      visible = false;
    }
  });
}

export function initMinecraftTooltips() {
  const elements = document.querySelectorAll('[mctip]');
  if (!elements.length) return;
  injectStyle();
  elements.forEach(el => createTooltip(el, el.getAttribute('mctip')));
}
