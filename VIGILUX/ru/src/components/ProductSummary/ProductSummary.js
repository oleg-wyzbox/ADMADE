export class ProductSummary extends HTMLElement {
  connectedCallback() {
    const rating = this.getAttribute("rating") || "4,8";
    const ratingsCount = this.getAttribute("ratings-count") || "5850";
    const title = this.getAttribute("title") || "";
    const price = this.getAttribute("price") || "";
    const oldPrice = this.getAttribute("old-price") || "";
    const discountLabel = this.getAttribute("discount-label") || "";
    const shouldShowPrice = this.getAttribute("shouldShowPrice") !== "false";

    const features = this.#readFeatures();

    this.innerHTML = `
          <div class="summary">
            <div class="summary-stars">
              Оценка <strong>${rating}</strong> на основе
              <a href="#reviews">${this.#formatNumber(ratingsCount)} отзывов</a>
            </div>
            <div class="summary-title title">${title}</div>
             
            ${
              shouldShowPrice
                ? `
              <div class="summary-price">
                <strong>${price}</strong>
                <s>${oldPrice}</s>
                <div class="summary-price-lb">${discountLabel}</div>
              </div>
            `
                : ""
            }
             
            <ul class="summary-list">
              ${features
                .map((t) => `<li class="summary-list-item">${t}</li>`)
                .join("")}
            </ul>
          </div>
    `;
  }

  #readFeatures() {
    const dataEl = this.querySelector('script[type="application/json"]');

    if (dataEl) {
      try {
        const arr = JSON.parse(dataEl.textContent || "[]");
        if (Array.isArray(arr)) return arr;
      } catch {
        /* noop */
      }
    }
  }

  #formatNumber(n) {
    const num = Number(String(n).replace(/[^\d]/g, "")) || 0;
    return num.toLocaleString("ru-RU");
  }
}

customElements.define("product-summary", ProductSummary);
