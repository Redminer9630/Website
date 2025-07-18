(() => {
  const style = document.createElement("style");
  style.textContent = `
[mctip] {
  position: relative;
}

.mc-tooltip {
  position: fixed;
  display: none;
  z-index: 9999;
  pointer-events: none;
}

.mc-tooltip .outer {
  background: #150b1a; 
  padding: 1px;
}

.mc-tooltip .inner {
  background: #2e0059;
  padding: 3px;
}

.mc-tooltip .text {
  background: #150b1a;
  color: white;
  font-family: Mojangles;
  font-size: 14px;
  line-height: 1;
  padding: 0;
  margin: 0;
  white-space: pre;
}
`;
  document.head.appendChild(style);

  const tooltip = document.createElement("div");
  tooltip.className = "mctip";
  tooltip.innerHTML = `
    <div class="outer">
      <div class="inner">
        <span class="text"></span>
      </div>
    </div>
  `;
  document.body.appendChild(tooltip);

  let visible = false;
  let currentTarget = null;

  function showTooltip(text, target, x, y) {
    tooltip.querySelector(".text").textContent = text;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = "block";
    visible = true;
    currentTarget = target;
  }

  function hideTooltip() {
    tooltip.style.display = "none";
    visible = false;
    currentTarget = null;
  }

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[mctip]");
    if (!el) return;
    const text = el.getAttribute("mctip");
    if (!text) return;
    const move = (ev) => showTooltip(text, el, ev.clientX, ev.clientY);
    move(e);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", () => {
      hideTooltip();
      el.removeEventListener("mousemove", move);
    }, { once: true });
  });

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[mctip]");
    if (!el) {
      if (visible) hideTooltip();
      return;
    }
    const text = el.getAttribute("mctip");
    if (!text) return;

    if (currentTarget === el && visible) {
      hideTooltip();
    } else {
      const rect = el.getBoundingClientRect();
      showTooltip(text, el, rect.left, rect.bottom + 5);
    }
  });
})();
