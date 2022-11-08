import {LitElement, css, html, nothing} from 'lit';
import {commas} from './utils.js';

class Odometer extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
        :host {
          font-size: 200%;
        }
    `];
  }

  constructor() {
    super();
    this.rz = {};
  }

  render() {
    return html`
Greens: ${commas(this.rz.greens)}
    `;
  }
}
customElements.define('g-odometer', Odometer);
