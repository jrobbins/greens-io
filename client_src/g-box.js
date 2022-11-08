import {LitElement, css, html, nothing} from 'lit';
import {commas, toSnakeCase} from './utils.js';

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

  maybeRewrite(resourceName) {
    if (resourceName == 'defects') {
      return 'Est. defects';
    }
    return resourceName;
  }
  
  renderResource(resourceSpec) {
    if (resourceSpec == '') {
    return html`
<tr>
  <th>&nbsp;</th>
  <td></td>
</tr>
    `;
    };

    if (resourceSpec.includes(' ? ')) {
      let cond = null;
      [cond, resourceSpec] = resourceSpec.split(' ? ');
      const condValue = this.rz[toSnakeCase(cond)];
      if (!condValue) return nothing;
    }
    let [resourceName, outOf] = resourceSpec.split('%');
    const value = this.rz[toSnakeCase(resourceName)];
    let percent = null;
    if (outOf) {
      const outOfValue = this.rz[toSnakeCase(outOf)];
      percent = Math.floor(value / outOfValue * 100);
    }
    return html`
<tr>
  <th>${this.maybeRewrite(resourceName)}:</th>
  <td>${commas(value)}</td>
  ${percent === null ? nothing : html`
    <td>=</td>
    <td>${percent}%</td>
    `}
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
