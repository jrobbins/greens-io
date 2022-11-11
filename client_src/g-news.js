import {LitElement, css, html, nothing} from 'lit';

class News extends LitElement {
  
  static get properties() {
    return {
      nz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
    `];
  }

  constructor() {
    super();
    this.nz = {};
  }

  render() {
    return html`
News
    `;
  }
}
customElements.define('g-news', News);
