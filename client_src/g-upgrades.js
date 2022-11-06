import {LitElement, css, html, nothing} from 'lit';

class Upgrades extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
      uz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
    `];
  }

  constructor() {
    super();
    this.rz = {};
    this.uz = {};
  }

  render() {
    return html`
upgrades
    `;
  }
}
customElements.define('g-upgrades', Upgrades);
