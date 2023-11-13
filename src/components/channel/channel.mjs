import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('channel/channel.html');

class Channel extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this._channel = {};
  }

  connectedCallback() {
    this.render();
  }

  set channel(channel) {
    this._channel = channel;
    this.render();
  }

  get channel() {
    return this._channel;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this._channel).length === 0) return;
    this.shadowRoot.querySelector('#name').textContent = this._channel.name;
  }
}

customElements.define('channel-c', Channel);
