export class DeliveryBanner extends HTMLElement {
    connectedCallback() {
        const deliveryDateText = this.getAttribute('delivery-date-text') || '';
        const paymentText = this.getAttribute('payment-text') || '';

        this.innerHTML = `
          <div class="delivery_banner">
            <img alt="truck-asset" src="src/assets/images/icon2.webp">
            <span>${deliveryDateText}</span>
            <i></i>
            <span>${paymentText}</span>
            <img alt="cash-asset" src="src/assets/images/icon1.webp">
          </div>
    `;
    }
}

customElements.define('delivery-banner', DeliveryBanner);