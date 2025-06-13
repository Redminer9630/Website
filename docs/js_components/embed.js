class EmbedEl extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const type = this.getAttribute('type') || 'item';
        const features = (this.getAttribute('features') || '').split(' ');
        const placeholderValue = this.getAttribute('emptyplaceholder') || '';
        const placeholderType = this.getAttribute('emptyplaceholdertype') || 'none';

        const style = document.createElement('style');
        style.textContent = `
            .embed-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4px;
            }
            .slot {
                width: 40px;
                height: 40px;
                background-color: #ccc;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #888;
                font-size: 12px;
                color: #333;
            }
            .slot img {
                max-width: 100%;
                max-height: 100%;
            }
        `;

        const container = document.createElement('div');
        container.className = 'embed-grid';

        for (let i = 0; i < 9; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            this.applyEmptyPlaceholder(slot, placeholderValue, placeholderType);
            container.appendChild(slot);
        }

        shadow.appendChild(style);
        shadow.appendChild(container);
    }

    applyEmptyPlaceholder(slot, value, type) {
        switch (type) {
            case 'number':
                slot.textContent = value;
                break;
            case 'img':
                const img = document.createElement('img');
                img.src = value;
                img.alt = 'empty';
                slot.appendChild(img);
                break;
            case 'color':
                slot.style.backgroundColor = value;
                break;
            case 'none':
            default:
                slot.textContent = '';
                break;
        }
    }
}

customElements.define('embed-el', EmbedEl);
