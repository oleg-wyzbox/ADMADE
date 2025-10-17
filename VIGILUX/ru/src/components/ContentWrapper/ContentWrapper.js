class ContentWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link href="./src/components/ContentWrapper/ContentWrapper.css" rel="stylesheet">
      
      <div class="content-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("content-wrapper", ContentWrapper);
