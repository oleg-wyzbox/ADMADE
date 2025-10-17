class OrderConfirmation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link href="./src/components/OrderConfirmation/OrderConfirmation.css" rel="stylesheet">
        
      <div class="order-confirmation-banner" id="order-confirmation-banner">
        <p>Спасибо за заказ! <br>
          Ваш заказ № <span class="order-number" id="order-number">fs_loading...</span> принят и
          передан в обработку.

          В ближайшее время с вами свяжутся наши операторы по указанному номеру телефона для
          подтверждения заказа и предложения способа доставки товара.</p>
      </div>
      `;
  }

  show(orderNumber = null) {
    if (orderNumber) {
      const orderNumberElement = this.shadowRoot.getElementById("order-number");

      if (orderNumberElement) {
        orderNumberElement.textContent = orderNumber;
      }
    }

    // Show the banner
    this.classList.add("active");
  }

  setOrderNumber(orderNumber) {
    const orderNumberElement = this.shadowRoot.getElementById("order-number");
    if (orderNumberElement) {
      orderNumberElement.textContent = orderNumber;
    }
  }
}

customElements.define("order-confirmation", OrderConfirmation);
