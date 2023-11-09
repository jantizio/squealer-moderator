import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('navbar/navbar.html');

class Navbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;
  }
}

customElements.define('navbar-c', Navbar);
