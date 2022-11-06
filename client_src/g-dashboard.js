import {LitElement, css, html, nothing} from 'lit';

class Dashboard extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
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
  }

  render() {
    return html`
dashboard
    `;
  }
}
customElements.define('g-dashboard', Dashboard);
