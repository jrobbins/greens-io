import {LitElement, css, html, nothing} from 'lit';

class Calendar extends LitElement {
  
  static get properties() {
    return {
      day: {type: Number},
    };
  }
  
  static get styles() {
    return [
      css`
    `];
  }

  constructor() {
    super();
    this.day = 0;
  }

  render() {
    return html`
calendar
    `;
  }
}
customElements.define('g-calendar', Calendar);
