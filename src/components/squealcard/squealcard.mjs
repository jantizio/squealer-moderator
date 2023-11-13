import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('squealcard/squealcard.html');

class Squealcard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._squeal = {};
  }

  connectedCallback() {
    this.render();
  }

  get squeal() {
    return this._squeal;
  }

  set squeal(squeal) {
    console.log(squeal);
    this._squeal = squeal;
    this.render();
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this._squeal).length === 0) return;

    const {
      author,
      body: { type },
      datetime,
      receivers,
      impressions,
      positive_reaction,
      negative_reaction,
      category,
    } = this._squeal;

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
    shadow.querySelector(
      '.squeal-card__stats #negative'
    ).textContent = `Negative reactions: ${negative_reaction}`;

    // TODO: fix category display
    const categoryContainer = shadow.querySelector('.squeal-card__category');
    categoryContainer.innerHTML = '';

    category.forEach((category) => {
      const categoryElement = document.createElement('p');
      categoryElement.textContent = category;
      categoryContainer.appendChild(categoryElement);
    });
  }
}

customElements.define('squealcard-c', Squealcard);
