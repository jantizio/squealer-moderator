import { addReceiver, changeReactions } from '../../api/squeals.mjs';
import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('squealcard/squealcard.html');

class Squealcard extends HTMLElement {
  #squeal;
  #squealElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.squeal = {};
    this.squealElement = undefined;

    shadow
      .querySelector('.add-receiver__button')
      .addEventListener('click', this.#addReceiver.bind(this));
    shadow
      .querySelector('.change-reactions__button')
      .addEventListener('click', this.#saveReactions.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  get squeal() {
    return this.#squeal;
  }

  set squeal(squeal) {
    this.#squeal = squeal;
    if (this.#squealElement) this.#squealElement.squeal = this.squeal;
    this.render();
  }

  set squealElement(squealElement) {
    this.#squealElement = squealElement;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this.squeal).length === 0) return;

    const {
      author,
      body: { type },
      datetime,
      receivers,
      impressions,
      positive_reaction,
      negative_reaction,
      category,
    } = this.squeal;

    const shadow = this.shadowRoot;

    const squealType = (() => {
      switch (type) {
        case 'text':
          return 'Squeal Testuale';
        case 'media':
          return 'Squeal Immagine o Video';
        case 'geolocation':
          return 'Squeal Geolocalizzazione';
        default:
          return 'Squeal';
      }
    })();

    shadow.querySelector('.squeal-card__author').textContent = author;
    shadow.querySelector('.squeal-card__body').textContent = squealType;
    shadow.querySelector('.squeal-card__receivers').textContent =
      receivers.join(', ');
    shadow.querySelector('.squeal-card__datetime').textContent = new Date(
      datetime
    ).toLocaleString();
    shadow.querySelector('.squeal-card__body').textContent = squealType;
    shadow.querySelector(
      '.squeal-card__stats #impressions'
    ).textContent = `Impressions: ${impressions}`;
    shadow.querySelector(
      '.squeal-card__stats #positive'
    ).textContent = `Positive reactions: ${positive_reaction}`;
    shadow.querySelector('#positive_input').value = positive_reaction;
    shadow.querySelector(
      '.squeal-card__stats #negative'
    ).textContent = `Negative reactions: ${negative_reaction}`;
    shadow.querySelector('#negative_input').value = negative_reaction;

    shadow.querySelector('.squeal-card__category').textContent =
      category.join(', ');
  }

  #addReceiver(event) {
    event.preventDefault();
    const receiver = this.shadowRoot.querySelector('#receiver').value;
    // validate receiver, starts with @ or § or #
    if (!receiver.match(/^[@§#]/) || receiver.length < 2) {
      this.shadowRoot.querySelector('.add-receiver__error').textContent =
        'Un destinatario deve iniziare con @, § o #';
      return;
    }

    this.squeal = {
      ...this.squeal,
      receivers: [...this.squeal.receivers, receiver],
    };
    addReceiver(this.squeal.id, receiver);
  }

  #saveReactions(event) {
    event.preventDefault();
    const shadow = this.shadowRoot;

    const positive = Number(shadow.querySelector('#positive_input').value);
    const negative = Number(shadow.querySelector('#negative_input').value);

    if (positive < 0 || negative < 0) {
      this.shadowRoot.querySelector('.change-reactions__error').textContent =
        'Le reazioni non possono essere negative';
      return;
    }

    this.squeal = {
      ...this.squeal,
      positive_reaction: positive,
      negative_reaction: negative,
    };
    changeReactions(this.squeal.id, positive, negative);
  }
}

customElements.define('squealcard-c', Squealcard);
