class StatisticsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["value", "label", "subtitle", "icon"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const value = this.getAttribute("value") || "";
    const label = this.getAttribute("label") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const icon = this.getAttribute("icon") || "";

    this.shadowRoot.innerHTML = `
      <link href="./src/components/StatisticsCard/StatisticsCard.css" rel="stylesheet">
      
      <div class="statistics-card">
        <div class="statistics-card__content">
          ${
            icon
              ? `<div class="statistics-card__value-with-icon">
            <img src="src/assets/images/star.svg" alt="star" class="statistics-card__star" />
            <span class="statistics-card__value">${value}</span>
          </div>`
              : `<div class="statistics-card__value">${value}</div>`
          }
          <div class="statistics-card__label">${label}</div>
          ${
            subtitle
              ? `<div class="statistics-card__subtitle">${subtitle}</div>`
              : ""
          }
        </div>
      </div>
    `;
  }
}

customElements.define("statistics-card", StatisticsCard);
