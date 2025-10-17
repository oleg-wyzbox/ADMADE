export class StickyCta extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <div class="sticky-block">
                <div class="sticky-block__wrap">
                    <div class="sticky-block__content">
                        <div class="sticky-block__img">
                            <img alt="img" src="src/assets/images/discount-banner-image.webp">
                        </div>
                        <div class="sticky-block__info">
                            <div class="sticky-block__text"><strong>Фонарик VIGILUX</strong></div>
                            <div class="forty-percent-discount-banner">
                                <img alt="img" src="src/assets/images/40-percent-discount-banner.webp">
                            </div>
                        </div>
                    </div>
                    <a class="btn" href="#form"><span>Заказать<br> со скидкой</span></a>
                </div>
            </div>
        `;

    // Initially hide the sticky banner
    this.style.display = "none";

    // Add scroll listener to show/hide based on form position
    this.handleScroll = () => {
      const formElement = document.getElementById("form");
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const formBottom = formRect.bottom;

        // Show sticky banner when form is above the viewport (scrolled past)
        if (formBottom < 0) {
          this.style.display = "block";
        } else {
          this.style.display = "none";
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", this.handleScroll);

    // Initial check
    this.handleScroll();
  }

  disconnectedCallback() {
    // Clean up event listener when component is removed
    if (this.handleScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
}

customElements.define("sticky-cta", StickyCta);
