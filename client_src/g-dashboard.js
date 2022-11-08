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
:host {
  display: flex;
  flex-flow: column wrap;
  overflow-x: auto;
}
    `];
  }

  constructor() {
    super();
    this.rz = {};
  }

  render() {
    return html`
<g-box 
  name="Tests"
  .rz=${this.rz}
  .resourceList=${['Cases', 'Runs per hour', 'Greens per hour', '', 'Test files', 'Test suites']}
  .actionList=${['Create test suite']}
></g-box>
    `;
  }
}
customElements.define('g-dashboard', Dashboard);
