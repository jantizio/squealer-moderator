import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('user/user.html');

class User extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#username').innerText =
      this.getAttribute('username');
    this.shadowRoot.querySelector('#type').innerText =
      this.getAttribute('type');
  }
}

customElements.define('user-c', User);
