import { importHtml } from '../../utils/htmlImporter.mjs';
import { appUrl } from '../../config/index.mjs';
const html = await importHtml('navbar/navbar.html');

class Navbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    const anchors = shadow.querySelectorAll('a');
    anchors.forEach((anchor) => {
      anchor.href = `${appUrl}${anchor.getAttribute('href')}`;
    });
  }
}

customElements.define('navbar-c', Navbar);
