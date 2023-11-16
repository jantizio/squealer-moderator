import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('channel/channel.html');

class Channel extends HTMLElement {
  #channel;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.channel = {};
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
