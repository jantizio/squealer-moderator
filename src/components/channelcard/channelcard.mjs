import {
  changeChannelDescription,
  deleteChannel,
} from '../../api/channels.mjs';
import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('channelcard/channelcard.html');

class Channelcard extends HTMLElement {
  #channel;
  #channelElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;

    this.channel = {};
    this.channelElement = undefined;

    shadow
      .querySelector('.channel-card__description-save')
      .addEventListener('click', this.#changeDescription.bind(this));

    shadow
      .querySelector('.channel-card__delete-button')
      .addEventListener('click', this.#deleteChannel.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  get channel() {
    return this.#channel;
  }

  set channel(channel) {
    this.#channel = channel;
    if (this.#channelElement) this.#channelElement.channel = this.channel;
    this.render();
  }

  set channelElement(channelElement) {
    this.#channelElement = channelElement;
  }

  render() {
    // if the object is not initialized, don't render
    if (Object.keys(this.channel).length === 0) return;

    const { name, description, type } = this.channel;
    const typeDisplay = type === 'public' ? 'Pubblico' : 'Privato';

    const shadow = this.shadowRoot;
    shadow.querySelector('.channel-card__name').textContent = name;
    shadow.querySelector('.channel-card__description-textarea').value =
      description;
    shadow.querySelector(
      '.channel-card__type'
    ).textContent = `Canale ${typeDisplay}`;
  }

  #changeDescription() {
    const description = this.shadowRoot.querySelector(
      '.channel-card__description-textarea'
    ).value;

    this.channel = { ...this.channel, description };
    changeChannelDescription(this.channel.name, description);
  }

  #deleteChannel() {
    deleteChannel(this.channel.name);
    this.#channelElement.remove();
    this.remove();
  }
}

customElements.define('channelcard-c', Channelcard);
