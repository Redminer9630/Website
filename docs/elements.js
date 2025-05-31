const style = `
section-title h2 { color: #2ecc71; font-family: 'Minecraft', sans-serif; margin-bottom: 10px; }
@media (prefers-color-scheme: dark) { section-title h2 { color: #27ae60; } }

section-p p { color: #333; font-family: 'Minecraft', sans-serif; line-height: 1.5; }
@media (prefers-color-scheme: dark) { section-p p { color: #f5f5f5; } }

section-button button { background-color: #2ecc71; color: white; padding: 10px 20px; border: none; cursor: pointer; font-family: 'Minecraft'; }
section-button button:hover { background-color: #2ecc87; }
@media (prefers-color-scheme: dark) { section-button button { background-color: #27ae60; } section-button button:hover { background-color: #2ecc71; } }
`;

const shadow = (html) => {
  const root = document.createElement('template');
  root.innerHTML = `<style>${style}</style>${html}`;
  return root.content.cloneNode(true);
};

customElements.define('section-title', class extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || '';
    this.attachShadow({mode: 'open'}).appendChild(shadow(`<h2>${text}</h2>`));
  }
});

customElements.define('section-p', class extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || '';
    this.attachShadow({mode: 'open'}).appendChild(shadow(`<p>${text}</p>`));
  }
});

customElements.define('section-button', class extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute('text') || '';
    const href = this.getAttribute('href') || '#';
    this.attachShadow({mode: 'open'}).appendChild(shadow(`<button onclick="location.href='${href}'">${text}</button>`));
  }
});
