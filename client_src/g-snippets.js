import {LitElement, css, html, nothing} from 'lit';

class Snippets extends LitElement {
  
  static get properties() {
    return {
      sz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
    `];
  }

  constructor() {
    super();
    this.sz = {};
  }

  render() {
    return html`
Snippets
    `;
  }
}
customElements.define('g-snippets', Snippets);
