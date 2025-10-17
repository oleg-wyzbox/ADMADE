export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer class="footer">
                <div>
                    Expres Colet SRL, Iaşi, str. Aureliu Vlaicu 78 <br>
                    VAT: RO32088257 <br>
                    <a href="mailto:office.exprescolet@gmail.com">office.exprescolet@gmail.com</a>
                </div>
                <nav class="footer__nav">
                    <a href="privacy-policy.html" target="_blank">Cookies</a>
                    <a href="terms-of-service.html" target="_blank">Terms & Conditions</a>
                    <a href="return-policy.html" target="_blank">Delivery policy</a>
                </nav>
                <p>*on behalf of Max Delivery EOO</p>
            </footer>
        `;
  }
}

customElements.define("app-footer", AppFooter);
