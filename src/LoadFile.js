// source: https://dev.to/dannyengelman/load-file-web-component-add-external-content-to-the-dom-1nd

customElements.define(
  'load-file',
  class extends HTMLElement {
    async connectedCallback(
      // call connectedCallback with parameter to *replace* SVG (of <load-file> persists)
      src = this.getAttribute('src'),
      // attach a shadowRoot if none exists (prevents displaying error when moving Nodes)
      shadowRoot = this.shadowRoot || this.attachShadow({ mode: 'open' })
    ) {
      // load file from src="" async, parse to text, add to shadowRoot.innerHTML
      shadowRoot.innerHTML = await (await fetch(src)).text();

      // append optional <tag [shadowRoot]> Elements from <load-svg> innerHTML/lightDOM after parsed <svg>
      shadowRoot.append(...this.querySelectorAll('[shadowRoot]'));

      // if "replaceWith" attribute exists
      // then replace <load-svg> with loaded content <load-svg>
      // childNodes instead of children to include #textNodes also
      this.hasAttribute('replaceWith') &&
        this.replaceWith(...shadowRoot.childNodes);
    }
  }
);
