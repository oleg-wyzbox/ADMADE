export class Logo extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <img alt="vigilux-logo" class="logo" src="src/assets/images/logo.webp" width="143">
    `;
    }
}

customElements.define('app-logo', Logo);