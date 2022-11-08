import {LitElement, css, html, nothing} from 'lit';
import {toSnakeCase} from './utils.js';

class Box extends LitElement {
  
  static get properties() {
    return {
      name: {type: String},
      desc: {type: String},
      resourceList: {type: Array},
      rz: {type: Object},
      actionList: {type: Array},
    };
  }
  
  static get styles() {
    return [
      css`
sl-card {
  width: 20em;
  margin: 1em 0 1em 1em;
}

sl-card::part(header) {
  font-weight: bold;
}

th {
  text-align: left;
  font-weight: normal;
  padding-right: 1em;
}
    `];
  }

  constructor() {
    super();
    this.name = '';
    this.desc = '';
    this.resourceList = [];
    this.rz = {};
    this.actionList = [];
  }

  renderResource(resourceName) {
    if (resourceName == '') {
    return html`
<tr>
  <th>&nbsp;</th>
  <td></td>
</tr>
    `;
    };

    const rzKey = toSnakeCase(resourceName);
    const value = this.rz[rzKey];
    return html`
<tr>
  <th>${resourceName}:</th>
  <td>${value}</td>
  <td>=</td>
  <td>59%</td>
</tr>
    `;
  }

  renderAction(actionName) {
    return html`
<sl-button size=small pill variant=primary>
  ${actionName}
</sl-button>
    `;
  }
  
  render() {
    return html`
<sl-card>
<div slot=header>${this.name}</div>
${this.desc}

<table cellspacing=3>
  ${this.resourceList.map(rn => this.renderResource(rn))}
</table>

<div slot=footer>
  ${this.actionList.map(this.renderAction)}
</div>

</sl-card>
    `;
  }
}
customElements.define('g-box', Box);
