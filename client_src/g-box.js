import {LitElement, css, html, nothing} from 'lit';

class Box extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
:host {
  width: 20em;
  margin: 1em 0 1em 1em;
}
    `];
  }

  constructor() {
    super();
    this.rz = {};
  }

  render() {
    return html`
<sl-card>
<div slot=header>Cash</div>
Some kind of description text.

<table cellspacing=3>
  <tr><td>Quarters: </td><td>12</td></tr>
  <tr><td>Nickles: </td><td>19</td></tr>
  <tr><td>Dimes: </td><td>42</td></tr>
</table>

<div slot=footer>
<sl-button size=small pill variant=primary>
  Get change
</sl-button>
</div>

</sl-card>
    `;
  }
}
customElements.define('g-box', Box);
