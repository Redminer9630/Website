
customElements.define("embed", class extends HTMLElement {
    connectedCallback() {
        const type = this.getAttribute("type");
        const features = (this.getAttribute("features") || "").split(" ");
        this.classList.add("embed-element");
        
        if (type === "item") this.renderItem(features);
        else if (type === "color") this.renderColor();
        else if (type === "crafting") this.renderCrafting();
    }

    renderItem(features) {
        const itemId = this.getAttribute("item-id") || "minecraft:stone";
        const img = document.createElement("img");
        const cleanId = itemId.replace("minecraft:", "");
        img.src = `https://minecraft.wiki/images/${cleanId}.png`;
        img.alt = itemId;
        img.className = "embed-item-img";
        
        if (features.includes("tooltip")) {
            img.title = itemId;
        }
        if (features.includes("dragable")) {
            img.draggable = true;
            img.addEventListener("dragstart", e => {
                e.dataTransfer.setData("text/plain", itemId);
            });
        }
        if (features.includes("selection")) {
            img.addEventListener("click", () => {
                img.classList.toggle("selected");
            });
        }

        this.appendChild(img);
    }

    renderColor() {
        this.style.width = "2em";
        this.style.height = "2em";
        this.style.border = "1px solid #ccc";
        this.style.background = this.getAttribute("color") || "#000";
    }

    renderCrafting() {
        this.textContent = "🛠 Crafting folgt...";
    }
});
