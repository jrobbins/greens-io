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
  .resourceList=${[
    'Cases', 
    'Runs per hour % cases', 
    'Greens per hour % runs per hour', 
    '',
    'Test files',
    'Test suites ? Test suites']}
  .actionList=${['Create test suite']}
></g-box>

<g-box 
  name="Product"
  .rz=${this.rz}
  .resourceList=${[
    'Functions', 
    'Source files', 
    'show defects ? defects', 
   ]}
  .actionList=${['Create source file']}
></g-box>

    `;
  }
}
customElements.define('g-dashboard', Dashboard);
