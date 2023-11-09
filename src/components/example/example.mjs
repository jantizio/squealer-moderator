import { importHtml } from '../../utils/htmlImporter.mjs';
const html = await importHtml('example/example.html');

class Example extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = html;
  }
}

customElements.define('example-c', Example);
