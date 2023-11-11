import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('user/user.html');

class User extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._user = {};

    shadow.querySelector('.container').addEventListener('click', () => {
      const aside = document.querySelector('aside');
      const existingCard = aside.querySelector('usercard-c');
      if (existingCard) {
        existingCard.remove();
      }
      const newCard = document.createElement('usercard-c');
      newCard.user = this._user;
      aside.appendChild(newCard);
    });
  }

  connectedCallback() {
    this.render();
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
    this.render();
  }

  render() {
    const { username, type } = this._user;

    this.shadowRoot.querySelector('#username').textContent = username;
    this.shadowRoot.querySelector('#type').textContent = type;
  }
}

customElements.define('user-c', User);
