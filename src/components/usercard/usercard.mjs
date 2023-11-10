import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('usercard/usercard.html');

class Usercard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._user = {};
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    shadow
      .querySelector('.user-card__propic')
      .setAttribute('src', this._user.propic);
    shadow.querySelector('.user-card__username').textContent =
      this._user.username;
    shadow.querySelector(
      '.user-card__name'
    ).textContent = `${this._user.firstname} ${this._user.lastname}`;
    shadow.querySelector('.user-card__email').textContent = this._user.email;
    shadow.querySelector('.user-card__type').textContent = this._user.type;
    shadow.querySelector('.user-card__smm').textContent = this._user.SMM;
    // TODO: to be fixed, these are not primitive values
    shadow.querySelector('.user-card__subscriptions').textContent =
      this._user.subscriptions.join(', ');
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }
}

customElements.define('usercard-c', Usercard);
