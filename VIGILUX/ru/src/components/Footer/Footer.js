export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
                <footer class="footer">
                    <div>
                        Expres Colet SRL, Iași, str. Aurel Vlaicu 78 <br>
                        VAT: RO32088257 <br>
                        <a href="mailto:office.exprescolet@gmail.com">office.exprescolet@gmail.com</a>
                    </div>
                    <nav class="footer__nav">
                        <a href="pages/billing-policy.html" target="_blank">Политика выставления счетов</a>
                        <a href="pages/privacy-policy.html" target="_blank">Политика конфиденциальности</a>
                        <a href="pages/terms-of-service.html" target="_blank">Условия и положения</a>
                        <a href="pages/return-policy.html" target="_blank">Политика возврата</a>
                    </nav>
                </footer>
            `;
  }
}

customElements.define("app-footer", AppFooter);
