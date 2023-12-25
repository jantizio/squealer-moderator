import { changeBlockedStatus, changeUserQuota } from '../../api/users.mjs';
import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('usercard/usercard.html');

class Usercard extends HTMLElement {
  #user;
  #userElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.user = {};
    this.userElement = undefined;

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
    return this.#user;
  }

  set user(user) {
    this.#user = user;
    if (this.#userElement) this.#userElement.user = this.user;
    this.render();
  }

  set userElement(userElement) {
    this.#userElement = userElement;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this.user).length === 0) return;

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
    } = this.user;

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

    shadow.querySelector('#giorno').value = quota.maxD - quota.actualD;
    shadow.querySelector('#max_giorno').textContent = `su ${quota.maxD}`;

    shadow.querySelector('#block-toggle').checked = blocked;
  }

  async #saveQuota(event) {
    event.preventDefault();
    const newDailyQuota =
      this.user.quota.maxD -
      Number(this.shadowRoot.querySelector('#giorno').value);
    this.user.quota = await changeUserQuota(this.user.username, newDailyQuota);
  }

  async #toggleBlocked(event) {
    event.preventDefault();
    const blocked = this.shadowRoot.querySelector('#block-toggle').checked;
    this.user = await changeBlockedStatus(this.user.username, blocked);
  }
}

customElements.define('usercard-c', Usercard);
