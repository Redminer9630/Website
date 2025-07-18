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
  const styleElement = document.createElement("style");
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

let currentTooltip = null;
let currentElement = null;

function moveTooltip(e, tooltip) {
  const x = e.clientX;
  const y = e.clientY;

  const rect = tooltip.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 8;

  let left = x;
  let top = y;

  const fitsRight = (x + rect.width + margin) <= vw;
  const fitsLeft = (x - rect.width - margin) >= 0;

  if (fitsRight) {
    left = x + margin;
  } else if (fitsLeft) {
    left = x - rect.width - margin;
  } else {
    left = Math.max(margin, (vw - rect.width) / 2);
    top = y + rect.height + margin;
    if (top + rect.height > vh) {
      top = y - rect.height - margin;
    }
  }
  if (top < margin) {
    top = margin;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function createTooltip(el, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'mc-tooltip';
  tooltip.textContent = text;
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  let visible = false;

  const show = e => {
    tooltip.style.display = 'block';
    moveTooltip(e, tooltip);
    currentTooltip = tooltip;
    currentElement = el;
    visible = true;
  };

  const hide = () => {
    tooltip.style.display = 'none';
    currentTooltip = null;
    currentElement = null;
    visible = false;
  };

  el.addEventListener('mouseenter', show);
  el.addEventListener('mousemove', e => moveTooltip(e, tooltip));
  el.addEventListener('mouseleave', hide);

  el.addEventListener('touchstart', e => {
    e.stopPropagation();
    if (visible) {
      hide();
    } else {
      show(e.touches[0]);
    }
  });

  document.addEventListener('touchstart', evt => {
    if (
      currentTooltip &&
      !currentTooltip.contains(evt.target) &&
      !currentElement?.contains(evt.target)
    ) {
      hide();
    }
  });
}

export function initMinecraftTooltips() {
  injectStyle();
  const elements = document.querySelectorAll('[mctip]');
  if (!elements.length) return;
  elements.forEach(el => createTooltip(el, el.getAttribute('mctip')));
}
