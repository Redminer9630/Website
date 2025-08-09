// ======== Global Event Dispatcher ========
const GameEvents = {
    emit(eventName, detail = {}) {
        window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
};

// ======== <embed9> ========
class Embed9 extends HTMLElement {
    connectedCallback() {
        const rows = parseInt(this.getAttribute("rows") || 3);
        const cols = parseInt(this.getAttribute("cols") || 3);
        const showLines = this.hasAttribute("lines");

        this.style.display = "grid";
        this.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        this.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        this.style.aspectRatio = `${cols} / ${rows}`;
        if (showLines) this.style.border = "1px solid black";

        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement("div");
            if (showLines) cell.style.border = "1px solid black";
            cell.dataset.index = i + 1;
            cell.addEventListener("click", () => {
                GameEvents.emit("embed9:click", { cell: cell.dataset.index, element: this });
            });
            this.appendChild(cell);
        }

        GameEvents.emit("embed9:created", { rows, cols, lines: showLines, element: this });
    }
}
customElements.define("embed9", Embed9);

// ======== <imgd9> ========
class Imgd9 extends HTMLElement {
    connectedCallback() {
        const src = this.getAttribute("src");
        const img = document.createElement("img");
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.imageRendering = "pixelated";

        if (src.startsWith("minecraft:")) {
            const item = src.replace("minecraft:", "");
            img.src = `https://mcasset.cloud/latest/assets/minecraft/textures/item/${item}.png`;
        } else if (src.startsWith("#") || /^[a-z]+$/i.test(src)) {
            img.remove();
            this.style.background = src;
        } else {
            img.src = src;
        }

        this.appendChild(img);
        this.addEventListener("click", () => {
            GameEvents.emit("imgd9:click", { src, element: this });
        });

        GameEvents.emit("imgd9:created", { src, element: this });
    }
}
customElements.define("imgd9", Imgd9);

// ======== <craftipe9> ========
class Craftipe9 extends HTMLElement {
    connectedCallback() {
        const result = this.getAttribute("result") || "";
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.gap = "10px";

        const grid = document.createElement("embed9");
        grid.setAttribute("rows", "3");
        grid.setAttribute("cols", "3");
        grid.setAttribute("lines", "");

        for (let i = 1; i <= 9; i++) {
            const slot = this.getAttribute(`slot${i}`) || "";
            if (slot) {
                const item = document.createElement("imgd9");
                item.setAttribute("src", slot);
                grid.children[i - 1]?.appendChild(item);
            }
        }

        const arrow = document.createElement("span");
        arrow.textContent = "➡";

        const resultImg = document.createElement("imgd9");
        resultImg.setAttribute("src", result);

        container.appendChild(grid);
        container.appendChild(arrow);
        container.appendChild(resultImg);
        this.appendChild(container);

        this.addEventListener("click", () => {GameEvents.emit("craftipe9:click", { result, element: this });});
        GameEvents.emit("craftipe9:created", { result, element: this });
    }
}
customElements.define("craftipe9", Craftipe9);

export { GameEvents, Embed9, Imgd9, Craftipe9 };
