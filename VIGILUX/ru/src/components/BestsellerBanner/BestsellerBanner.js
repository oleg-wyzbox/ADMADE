class BestsellerBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link href="./src/components/BestsellerBanner/BestsellerBanner.css" rel="stylesheet">
      
      <div class="bestseller-banner__wrapper">
        <div class="bestseller-banner__container">
          <p class="bestseller-banner__label">Бестселлер</p>
          <p class="bestseller-banner__header">в категории товары для туризма и активного отдыха</p>
          <p class="bestseller-banner__subheader">Смотрите в СМИ</p>
        </div>
      </div>
    `;
  }
}

customElements.define("bestseller-banner", BestsellerBanner);
