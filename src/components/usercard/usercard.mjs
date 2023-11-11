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

    if (this._user.SMM)
      shadow.querySelector('.user-card__smm').textContent = this._user.SMM;
    else shadow.querySelector('.user-card__smm').remove();

    if (this._user.subscriptions.length > 0)
      shadow.querySelector('.user-card__subscriptions').textContent =
        this._user.subscriptions.join(', ');
    else shadow.querySelector('.user-card__subscriptions').remove();

    shadow.querySelector('#giorno').value = this._user.quota.maxD;
    shadow.querySelector('#settimana').value = this._user.quota.maxW;
    shadow.querySelector('#mese').value = this._user.quota.maxM;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }
}

customElements.define('usercard-c', Usercard);
