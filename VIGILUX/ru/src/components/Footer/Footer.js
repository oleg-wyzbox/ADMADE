export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
                <footer class="footer">
                    <nav class="footer__nav">
                        <a class="footer__nav-link" href="billing-policy.html">Политика выставления счетов</a>
                        <a class="footer__nav-link" href="terms-of-service.html">Условия и положения</a>
                        <a class="footer__nav-link" href="return-policy.html">Политика возврата</a>
                        <a class="footer__nav-link" href="privacy-policy.html">Политика конфиденциальности</a>
                    </nav>
                     <div class="footer__contact">
                        <address>Expres Colet SRL, Iași, str. Aurel Vlaicu 78</address>
                        <address>VAT: RO32088257</address>
                        <a href="mailto:office.exprescolet@gmail.com">office.exprescolet@gmail.com</a>
                    </div>
                </footer>
            `;
  }
}

customElements.define("app-footer", AppFooter);
