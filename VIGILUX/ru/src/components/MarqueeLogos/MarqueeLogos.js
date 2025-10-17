/**
 * MarqueeLogos Component
 * Creates a seamless scrolling marquee with provided logo images
 */

export class MarqueeLogos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["images", "speed", "opacity"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const images = this.getImages();
    const speed = this.getAttribute("speed") || "8s";
    const opacity = this.getAttribute("opacity") || "0.3";

    this.shadowRoot.innerHTML = `
      <link href="./src/components/MarqueeLogos/MarqueeLogos.css" rel="stylesheet">
      
      <div class="marquee-logos" style="--animation-speed: ${speed}; --logo-opacity: ${opacity};">
        <div class="marquee-logos__container">
          <div class="marquee-logos__content">
            ${this.renderImages(images)}
            ${this.renderImages(images)}
          </div>
        </div>
      </div>
    `;
  }

  getImages() {
    const imagesAttr = this.getAttribute("images");
    if (!imagesAttr) return [];

    try {
      return JSON.parse(imagesAttr);
    } catch (error) {
      console.error("Invalid images JSON:", error);
      return [];
    }
  }

  renderImages(images) {
    return images
      .map(
        (image) => `
          <img 
            src="${image.src}" 
            alt="${image.alt || "logo"}" 
            width="${image.width || 136}" 
            height="${image.height || 44}"
            class="marquee-logos__image"
          />
        `
      )
      .join("");
  }

  // Public methods
  setImages(images) {
    this.setAttribute("images", JSON.stringify(images));
  }

  setSpeed(speed) {
    this.setAttribute("speed", speed);
  }

  setOpacity(opacity) {
    this.setAttribute("opacity", opacity);
  }
}

customElements.define("marquee-logos", MarqueeLogos);
