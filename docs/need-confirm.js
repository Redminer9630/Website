class NeedConfirm extends HTMLElement {
    connectedCallback() {
        if (window.location.search.includes("continue")) return;
        const target = this.getAttribute("target") || (window.location.pathname + window.location.search);
        window.location.href = "/continue.html?l=" + encodeURIComponent(target);
    }
}
customElements.define("need-confirm", NeedConfirm);
