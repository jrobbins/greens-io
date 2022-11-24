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
  id="tests" name="Tests"
  .rz=${this.rz}
  .resourceList=${[
    'Cases',
    'test_automation ? Runs per hour % cases',
    'test_automation ? Greens per hour % runs per hour',
    '',
    'Coverage criteria x',
    'coverage_criteria ? Test coverage % max_cases',
    '',
    'Test files',
    'Test suites']}
  .actionList=${[
    'Poke around',
    'languages ? Create test case',
    'test_runner ? Run tests',
    'ides ? Create test file',
    'version_control ? Create test suite',
  ]}
></g-box>

<g-box 
  name="Product"
  .rz=${this.rz}
  .resourceList=${[
    'Features', 
    'Tech stack x',
    'use_case_workshop ? Use cases', 
    'user_journey_workshop ? User journeys', 
    'product_workshop ? Products', 
    'category_workshop ? Categories', 
    'show_defects ? Defects',
    '',
    'use_case_workshop ? Feature completeness % max_features',
   ]}
  .actionList=${[
    'spec_writing ? Define feature',
    'use_case_workshop ? Define use case',
    'user_journey_workshop ? Define user journey',
    'product_workshop ? Define product',
    'category_workshop ? Define category',
  ]}
></g-box>

<g-box 
  name="Team"
  .rz=${this.rz}
  .resourceList=${[
    'Engineers', 
    'Productivity x',
    'Managers', 
    'Recruiters', 
    'VPs', 
    'Senior VPs', 
   ]}
  .actionList=${[
    'waterfall_model ? Hire engineer',
    'promo_process ? Promote to manager',
    'recruiting ? Hire recruiter',
    'risk_management ? Promote to VP',
    'synergy ? Acquire small company',
    'deal_making ? Acquire large company',
  ]}
></g-box>

<g-box 
  name="Machines"
  .rz=${this.rz}
  .resourceList=${[
    'multi_processing ? Cycles', 
    'CPUs', 
    'Servers', 
    'Clusters', 
    'Data centers', 
    'Ops bots', 
   ]}
  .actionList=${[
    'multi_processing ? Add CPU',
    'testing_lab ? Add server',
    'cloud_computing ? Deploy cluster',
    'warehouse_computing ? Build data center',
    'ops_bots ? Build ops bots',
  ]}
></g-box>

<g-box 
  name="Theory"
  .rz=${this.rz}
  .resourceList=${[
    'Languages', 
    'Algorithms', 
    'Paradigms', 
    'Realities', 
   ]}
  .actionList=${[
  ]}
></g-box>

    `;
  }
}
customElements.define('g-dashboard', Dashboard);
