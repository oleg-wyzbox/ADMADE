class ImageTextOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [
      "title",
      "subtitle",
      "description",
      "image-src",
      "image-alt",
      "decorative",
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const description = this.getAttribute("description") || "";
    const imageSrc = this.getAttribute("image-src") || "";
    const imageAlt = this.getAttribute("image-alt") || "";
    const decorative = this.getAttribute("decorative") === "true";
    const hasRoundedCorners = this.classList.contains("rounded-t-4xl");
    const isBottomImage3 = this.classList.contains("bottom-image-3");
    const isBottomImage4 = this.classList.contains("bottom-image-4");

    const decorativeElements = decorative
      ? `
        <div class="image-text-overlay__top-arrow">
          <img src="src/assets/images/bottom-image-1-top-arrow.svg" alt="top arrow" />
        </div>
        <div class="image-text-overlay__bottom-arrow">
          <img src="src/assets/images/bottom-image-1-bottom-arrow.svg" alt="bottom arrow" />
        </div>
        <div class="image-text-overlay__top-ellipse">
          <img src="src/assets/images/bottom-image-1-top-elipse.webp" alt="top ellipse" />
        </div>
        <div class="image-text-overlay__bottom-ellipse">
          <img src="src/assets/images/bottom-image-1-bottom-elipse.webp" alt="bottom ellipse" />
        </div>
        <div class="image-text-overlay__top-badge">
          <span>Удобно крепить на пояс или рюкзак</span>
        </div>
        <div class="image-text-overlay__bottom-badge">
          <span>Для освещения палатки или лагеря</span>
        </div>
      `
      : "";

    const bottomImage4Elements = isBottomImage4
      ? `
        <div class="image-text-overlay__battery-text-left">
          <strong>До 6 часов работы</strong> на одном заряде
        </div>
        <div class="image-text-overlay__battery-text-center">
          Быстрая зарядка <strong>USB Type-С</strong>
        </div>
        <div class="image-text-overlay__battery-text-right">
          Емкость батареи <strong>1200 mAh</strong>
        </div>
      `
      : "";

    const roundedClass = hasRoundedCorners ? "rounded-t-4xl" : "";

    this.shadowRoot.innerHTML = `
      <link href="./src/components/ImageTextOverlay/ImageTextOverlay.css" rel="stylesheet">
      <link href="./src/styles/helpers.css" rel="stylesheet">
      
      <div class="image-text-overlay ${roundedClass} ${
      isBottomImage4 ? "bottom-image-4" : ""
    }">
        <div class="image-text-overlay__image">
          <img src="${imageSrc}" alt="${imageAlt}" />
        </div>
        <div class="image-text-overlay__content">
          <h2 class="image-text-overlay__title ${
            isBottomImage4 ? "bottom-image-4-title" : ""
          }">${title}</h2>
          <h3 class="image-text-overlay__subtitle">${subtitle}</h3>
          <p class="image-text-overlay__description ${
            isBottomImage3 ? "bottom-image-3-description" : ""
          }">${description}</p>
        </div>
        ${decorativeElements}
        ${bottomImage4Elements}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("image-text-overlay", ImageTextOverlay);
