import {LitElement, css, html, nothing} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
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
    this.perturbance = -15;
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
    let [resourceName, outOf] = resourceSpec.split(' % ');
    if (resourceName.endsWith(' x')) {
      resourceName = resourceName.substring(0, resourceName.length - 2);
    }
    const value = this.rz[toSnakeCase(resourceName)];
    return value > 1;
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

    let units = '';
    if (resourceSpec.includes(' ? ')) {
      let cond = null;
      [cond, resourceSpec] = resourceSpec.split(' ? ');
      const condValue = this.rz[toSnakeCase(cond)];
      if (!condValue) return nothing;
    }
    let [resourceName, outOf] = resourceSpec.split(' % ');
    if (resourceName.endsWith(' x')) {
      resourceName = resourceName.substring(0, resourceName.length - 2);
      units = 'x';
    }
    const value = this.rz[toSnakeCase(resourceName)];
    if (!value || value==1 && units=='x') return nothing;
    let percent = null;
    if (outOf) {
      const outOfValue = this.rz[toSnakeCase(outOf)];
      if (outOfValue)
        percent = Math.floor(value / outOfValue * 100);
    }
    return html`
<tr>
  <th>${this.maybeRewrite(resourceName)}:</th>
  <td>${commas(value)}${units}</td>
  ${percent === null ? nothing : html`
    <td>=</td>
    <td>${percent}%</td>
    `}
</tr>
    `;
  }

  handleClick(cmd) {
    gioClient.postCmd(cmd);
    if (this.perturbance < 20) {
      window.setTimeout(() => {
        this.perturbance = Math.max(-10, this.perturbance - .5)},
                        8000);
      this.perturbance = Math.min(18, this.perturbance + .5);
    }
  }

  renderAction(actionSpec) {
    if (actionSpec.includes(' ? ')) {
      let cond = null;
      [cond, actionSpec] = actionSpec.split(' ? ');
      const condValue = this.rz[toSnakeCase(cond)];
      if (!condValue) return '';  // Not nothing.
    }
    const cmd = actionSpec;
    const disabled = this.rz.day >= this.rz.maxdays;

    return html`
<sl-button size=small pill variant=primary
    @click=${this.handleClick.bind(this, cmd)}
    ?disabled=${disabled}
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

    const pert = Math.max(0, this.perturbance);
    const top = 16 + (2 * Math.random() - 1) * pert;
    const left = 16 + (2 * Math.random() - 1) * pert;
    const rot =  (2 * Math.random() - 1) * Math.max(0, pert - 8);
    const styles = {
      marginTop: top + 'px',
      marginLeft: left + 'px',
      marginBottom: (16 - top) + 'px',
      marginRight: (16 - left) + 'px',
      transform: 'rotate(' + rot + 'deg)',
    };

    return html`
<sl-card style=${styleMap(styles)}>
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
