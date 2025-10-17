class SalesBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "label"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title =
      this.getAttribute("title") ||
      "Горячая <strong>осенняя распродажа</strong>";
    const label = this.getAttribute("label") || "со скидками до -50%";

    this.shadowRoot.innerHTML = `
      <link href="./src/components/SalesBanner/SalesBanner.css" rel="stylesheet">
      
      <div class="form__banner">
        <h4 class="form__banner-title">
          ${title}
        </h4>
        <div class="form__banner-lb">
          <span>${label}</span>
        </div>
      </div>
    `;
  }
}

customElements.define("sales-banner", SalesBanner);
