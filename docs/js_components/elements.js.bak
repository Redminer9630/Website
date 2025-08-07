const style = `
section-title h2 { color: #2ecc71; font-family: 'Minecraft', sans-serif; margin-bottom: 10px; }
@media (prefers-color-scheme: dark) { section-title h2 { color: #27ae60; } }

section-p p { color: #333; font-family: 'Minecraft', sans-serif; line-height: 1.5; }
@media (prefers-color-scheme: dark) { section-p p { color: #f5f5f5; } }

section-button button { background-color: #2ecc71; color: white; padding: 10px 20px; border: none; cursor: pointer; font-family: 'Minecraft'; }
section-button button:hover { background-color: #2ecc87; }
@media (prefers-color-scheme: dark) { section-button button { background-color: #27ae60; } section-button button:hover { background-color: #2ecc71; } }
`;

// Hilfsfunktion für Sprachunterstützung (optional)
const getLangText = (el, fallback = '') => {
    const id = el.getAttribute('langid');
    return id ? (window.lang?.[id] ?? fallback) : fallback;
};

// Shadow Root mit gemeinsamem Style
const sharedStyle = document.createElement('style');
sharedStyle.textContent = style;

const shadow = (html) => {
    const root = document.createElement('template');
    root.innerHTML = html;
    const frag = root.content.cloneNode(true);
    frag.insertBefore(sharedStyle.cloneNode(true), frag.firstChild);
    return frag;
};

// section-title mit text oder Slot
customElements.define('section-title', class extends HTMLElement {
    connectedCallback() {
        const text = getLangText(this, this.getAttribute('text'));
        const useText = text !== null && text !== undefined;
        const html = `<h2>${useText ? text : '<slot></slot>'}</h2>`;
        this.attachShadow({mode: 'open'}).appendChild(shadow(html));
    }
});

// section-p mit text oder Slot
customElements.define('section-p', class extends HTMLElement {
    connectedCallback() {
        const text = getLangText(this, this.getAttribute('text'));
        const useText = text !== null && text !== undefined;
        const html = `<p>${useText ? text : '<slot></slot>'}</p>`;
        this.attachShadow({mode: 'open'}).appendChild(shadow(html));
    }
});

// section-button mit Text und Link
customElements.define('section-button', class extends HTMLElement {
    connectedCallback() {
        const text = getLangText(this, this.getAttribute('text'));
        const href = this.getAttribute('href') || '#';
        const html = `<button onclick="location.href='${href}'">${text || '<slot></slot>'}</button>`;
        this.attachShadow({mode: 'open'}).appendChild(shadow(html));
    }
});
