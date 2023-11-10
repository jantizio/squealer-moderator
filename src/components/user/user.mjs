import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('user/user.html');

class User extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;
  }
}

customElements.define('user-c', User);
