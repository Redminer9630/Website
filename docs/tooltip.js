(() => {
  const css = `
    .tooltip-box {
      position: fixed;
      background: rgba(60, 60, 60, 0.9);
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: auto;
      white-space: normal;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
      max-width: 300px;
      box-sizing: border-box;
      box-shadow: 0 0 8px rgba(0,0,0,0.3);
    }
    .tooltip-box.show { opacity: 1; }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip-box';
  document.body.appendChild(tooltip);

  let activeElement = null;
  let isTooltipHovered = false;
  let isTouchMode = false;

  function showTooltip(el, e = null) {
    activeElement = el;
    tooltip.innerHTML = el.getAttribute('tooltip') || '';
    tooltip.classList.add('show');

    if (e) {
      updatePosition(e);
    } else if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      let left = rect.left + rect.width / 2;
      let top = rect.bottom + 10;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
  }
  function hideTooltip() {
    if (!activeElement) return;
    if (!isTooltipHovered) {
      tooltip.classList.remove('show');
      activeElement = null;
    }
  }

  function updatePosition(e) {
    const offsetX = 12;
    const offsetY = 20;
    let left = e.clientX + offsetX;
    let top = e.clientY + offsetY;

    const tooltipRect = tooltip.getBoundingClientRect();
    if (left + tooltipRect.width > window.innerWidth) {
      left = e.clientX - tooltipRect.width - offsetX;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = e.clientY - tooltipRect.height - offsetY;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function isTouchDevice() {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }

  document.querySelectorAll('[tooltip]').forEach(el => {
    el.style.cursor = 'pointer';

    el.addEventListener('mouseenter', e => {
      if (isTouchMode) return;
      showTooltip(el, e);
    });
    el.addEventListener('mousemove', e => {
      if (isTouchMode) return;
      updatePosition(e);
    });
    el.addEventListener('mouseleave', e => {
      if (isTouchMode) return;
      setTimeout(hideTooltip, 100);
    });

    el.addEventListener('touchstart', e => {
      isTouchMode = true;
      e.preventDefault();

      if (activeElement === el) {
        tooltip.classList.remove('show');
        activeElement = null;
      } else {
        showTooltip(el);
      }
    });
  });

  tooltip.addEventListener('mouseenter', () => {
    isTooltipHovered = true;
  });
  tooltip.addEventListener('mouseleave', () => {
    isTooltipHovered = false;
    setTimeout(hideTooltip, 100);
  });

  document.addEventListener('touchstart', e => {
    if (!tooltip.contains(e.target) && activeElement && !activeElement.contains(e.target)) {
      tooltip.classList.remove('show');
      activeElement = null;
    }
  });
})();
