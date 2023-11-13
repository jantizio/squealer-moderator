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
    // if the object is not initialized, don't render
    if (Object.keys(this._user).length === 0) return;

    const {
      username,
      type,
      propic,
      firstname,
      lastname,
      email,
      SMM,
      subscriptions,
      quota,
      blocked,
    } = this._user;

    const shadow = this.shadowRoot;
    shadow.querySelector('.user-card__propic').setAttribute('src', propic);
    shadow.querySelector('.user-card__username').textContent = username;
    shadow.querySelector(
      '.user-card__name'
    ).textContent = `${firstname} ${lastname}`;
    shadow.querySelector('.user-card__email').textContent = email;
    shadow.querySelector('.user-card__type').textContent = type;

    if (SMM) shadow.querySelector('.user-card__smm').textContent = SMM;
    else shadow.querySelector('.user-card__smm').classList.add('hidden');

    if (subscriptions.length > 0)
      shadow.querySelector('.user-card__subscriptions').textContent =
        subscriptions.join(', ');
    else
      shadow.querySelector('.user-card__subscriptions').classList.add('hidden');

    shadow.querySelector('#giorno').value = quota.maxD;
    shadow.querySelector('#settimana').value = quota.maxW;
    shadow.querySelector('#mese').value = quota.maxM;

    shadow.querySelector('#block-toggle').checked = blocked;
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
    //TODO: maybe i need to change the user object of the user component
    changeBlockedStatus(this._user.username, this._user.blocked);
  }
}

customElements.define('usercard-c', Usercard);
