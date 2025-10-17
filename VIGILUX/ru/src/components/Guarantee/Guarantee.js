export class AppGuarantee extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <div class="guarantee">
                <div class="guarantee-img">
                    <img alt="guarantee" src="src/assets/images/guarantee.webp">
                </div>
                <div class="guarantee-content">
                    <h4 class="guarantee-title">14-дневная гарантия возврата</h4>
                    <p class="guarantee-text">Если по какой либо причине вы захотите вернуть товар в течение
                    14 дней с момента покупки, мы вернем вам полную стоимость покупки без каких-либо вопросов</p>
                </div>
            </div>
        `;
  }
}

customElements.define("app-guarantee", AppGuarantee);
