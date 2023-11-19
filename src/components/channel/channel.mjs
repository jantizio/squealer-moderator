import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('channel/channel.html');

class Channel extends HTMLElement {
  #channel;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.channel = {};

    shadow.querySelector('.list-item').addEventListener('click', () => {
      const aside = document.querySelector('aside');
      const existingCard = aside.querySelector('channelcard-c');
      if (existingCard) existingCard.remove();
      const newCard = document.createElement('channelcard-c');
      aside.appendChild(newCard);
      newCard.channel = this.channel;
      newCard.channelElement = this;
    });
  }

  connectedCallback() {
    this.render();
  }

  set channel(channel) {
    this.#channel = channel;
    this.render();
  }

  get channel() {
    return this.#channel;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this.channel).length === 0) return;
    this.shadowRoot.querySelector('#name').textContent = this.channel.name;
  }
}

customElements.define('channel-c', Channel);
