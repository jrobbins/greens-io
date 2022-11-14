import {LitElement, css, html, nothing} from 'lit';
import {commas, toSnakeCase} from './utils.js';
import {start_cmd} from './commands.js';


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

sl-button {
  margin: 4px;
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

  showResource(resourceSpec) {
    if (resourceSpec == '')
      return false;
    if (resourceSpec.includes(' ? ')) {
      let cond = null;
      [cond, resourceSpec] = resourceSpec.split(' ? ');
      const condValue = this.rz[toSnakeCase(cond)];
      if (!condValue)
	return false;
    }
    let [resourceName, outOf] = resourceSpec.split('%');
    const value = this.rz[toSnakeCase(resourceName)];
    return value;
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
    if (!value) return nothing;
    let percent = null;
    if (outOf) {
      const outOfValue = this.rz[toSnakeCase(outOf)];
      if (outOfValue)
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

  handleClick(cmd) {
    start_cmd(this, cmd, this.rz);
  }
  
  renderAction(actionSpec) {
    if (actionSpec.includes(' ? ')) {
      let cond = null;
      [cond, actionSpec] = actionSpec.split(' ? ');
      const condValue = this.rz[toSnakeCase(cond)];
      if (!condValue) return '';  // Not nothing.
    }
    const cmd = actionSpec;

    return html`
<sl-button size=small pill variant=primary
    @click=${this.handleClick.bind(this, cmd)}
    >
  ${cmd}
</sl-button>
    `;
  }
  
  render() {
    const shownResources = this.resourceList.filter(
      rs => this.showResource(rs));
    const resourceRows = this.resourceList.map(
      rs => this.renderResource(rs));
    const actionRows = this.actionList.map(
      as => this.renderAction(as));
    const shownActions = actionRows.filter(ar => ar);

    if (shownResources.length + shownActions.length == 0)
      return nothing;
    
    return html`
<sl-card>
<div slot=header>${this.name}</div>
${this.desc}

<table cellspacing=3>
  ${resourceRows}
</table>

<div slot=footer>
  ${actionRows}
</div>

</sl-card>
    `;
  }
}
customElements.define('g-box', Box);
