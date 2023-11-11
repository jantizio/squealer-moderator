import { changeBlockedStatus, changeUserQuota } from '../../api/users.mjs';
import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('usercard/usercard.html');

class Usercard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._user = {};
    shadow
      .querySelector('.user-card__quota-save')
      .addEventListener('click', this.#saveQuota.bind(this));
    shadow
      .querySelector('#block-toggle')
      .addEventListener('change', this.#toggleBlocked.bind(this));
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

    shadow.querySelector('#block-toggle').checked = this._user.blocked;
  }

  #saveQuota(event) {
    event.preventDefault();
    const shadow = this.shadowRoot;
    const maxD = shadow.querySelector('#giorno').value;
    const maxW = shadow.querySelector('#settimana').value;
    const maxM = shadow.querySelector('#mese').value;
    this.user.quota = { ...this._user.quota, maxD, maxW, maxM };
    changeUserQuota(this._user.username, this._user.quota);
  }

  #toggleBlocked(event) {
    event.preventDefault();
    const blocked = this.shadowRoot.querySelector('#block-toggle').checked;
    this.user.blocked = blocked;
    changeBlockedStatus(this._user.username, this._user.blocked);
  }
}

customElements.define('usercard-c', Usercard);
