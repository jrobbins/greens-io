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
    'learn_cron ? Runs per hour % cases', 
    'learn_cron ? Greens per hour % runs per hour', 
    '',
    'test_files ? Test files',
    'test_suites ? Test suites']}
  .actionList=${[
    'Poke around',
    'languages ? Create test case',
    'cases ? Run tests',
  ]}
></g-box>

<g-box 
  name="Product"
  .rz=${this.rz}
  .resourceList=${[
    'Functions', 
    'Source files', 
    'show_defects ? Defects', 
   ]}
  .actionList=${[
    'languages ? Create function',
    'languages ? Create source file'
  ]}
></g-box>

    `;
  }
}
customElements.define('g-dashboard', Dashboard);
