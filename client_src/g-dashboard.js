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
    'automation ? Runs per hour % cases', 
    'automation ? Greens per hour % runs per hour', 
    '',
    'Test files',
    'Test suites']}
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
    'Source trees', 
    'show_defects ? Defects', 
   ]}
  .actionList=${[
    'languages ? Create function',
    'languages ? Create source file'
  ]}
></g-box>

<g-box 
  name="Team"
  .rz=${this.rz}
  .resourceList=${[
    'Engineers', 
    'Managers', 
    'Recruiters', 
    'VPs', 
    'Senior VPs', 
   ]}
  .actionList=${[
    'waterfall_model ? Hire engineer',
    'performance_reviews ? Promote to manager',
    'test_driven_development ? Hire recruiter',
    'risk_management ? Promote to VP',
    'synergy ? Acquire small company',
    'deal_making ? Acquire large company',
  ]}
></g-box>

    `;
  }
}
customElements.define('g-dashboard', Dashboard);
