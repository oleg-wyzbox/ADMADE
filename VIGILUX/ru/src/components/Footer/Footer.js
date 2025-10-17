export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer class="footer">
                <nav class="footer__nav">
                    <a href="privacy-policy.html" class="footer__nav-link" target="_blank">Terms & Conditions</a>
                    <a href="shipping-policy.html" class="footer__nav-link" target="_blank">Delivery policy</a>
                    <a href="terms-of-service.html" class="footer__nav-link" target="_blank">Termeni si conditii</a>
                    <a href="return-policy.html" class="footer__nav-link" target="_blank">Politica de returnare</a>
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
