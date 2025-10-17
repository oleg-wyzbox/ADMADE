class FeatureCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["icon", "header", "subheader"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const icon = this.getAttribute("icon") || "";
    const header = this.getAttribute("header") || "";
    const subheader = this.getAttribute("subheader") || "";

    this.shadowRoot.innerHTML = `
      <link href="./src/components/FeatureCard/FeatureCard.css" rel="stylesheet">
      
      <div class="feature-card">
        <div class="feature-card__icon">
          <img src="${icon}" alt="feature icon" class="feature-card__icon-img" />
        </div>
        <div class="feature-card__content">
          <div class="feature-card__header">${header}</div>
          <div class="feature-card__subheader">${subheader}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("feature-card", FeatureCard);
