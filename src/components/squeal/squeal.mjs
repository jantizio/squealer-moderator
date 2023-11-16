import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('squeal/squeal.html');

class Squeal extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._squeal = {};

    shadow.querySelector('.container').addEventListener('click', () => {
      const aside = document.querySelector('aside');
      const existingCard = aside.querySelector('squealcard-c');
      if (existingCard) existingCard.remove();
      const newCard = document.createElement('squealcard-c');
      aside.appendChild(newCard);
      newCard.squeal = this._squeal;
      newCard.squealElement = this;
    });
  }

  connectedCallback() {
    this.render();
  }

  set squeal(squeal) {
    this._squeal = squeal;
    this.render();
  }

  get squeal() {
    return this._squeal;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this._squeal).length === 0) return;
    const { author, datetime, receivers } = this._squeal;

    this.shadowRoot.querySelector('#author').textContent = author;
    this.shadowRoot.querySelector('#datetime').textContent = new Date(
      datetime
    ).toLocaleString();
    this.shadowRoot.querySelector('#receivers').textContent =
      receivers.join(', ');
  }
}

customElements.define('squeal-c', Squeal);
