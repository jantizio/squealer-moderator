import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('user/user.html');

class User extends HTMLElement {
  #user;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.user = {};

    shadow.querySelector('.list-item').addEventListener('click', () => {
      const aside = document.querySelector('aside');
      const existingCard = aside.querySelector('usercard-c');
      if (existingCard) existingCard.remove();
      const newCard = document.createElement('usercard-c');
      aside.appendChild(newCard);
      newCard.user = this.user;
      newCard.userElement = this;
    });
  }

  connectedCallback() {
    this.render();
  }

  get user() {
    return this.#user;
  }

  set user(user) {
    this.#user = user;
    this.render();
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this.user).length === 0) return;
    const { username, type } = this.user;

    this.shadowRoot.querySelector('#username').textContent = username;
    this.shadowRoot.querySelector('#type').textContent = type;
  }
}

customElements.define('user-c', User);
