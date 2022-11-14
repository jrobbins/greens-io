import {LitElement, css, html, nothing} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import {commas} from './utils.js';

class Odometer extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
        :host {
          font-size: 200%;
          color: darkgreen;
          font-weight: bold;
        }
    `];
  }

  constructor() {
    super();
    this.rz = {};
  }

  render() {
    let s = '' + this.rz.greens;
    let leadingNines = 0;
    for (let c of s) {
      if (c == '9' || c == '8')
	leadingNines++;
      else
	break;
    }
    const top = 24 + (2 * Math.random() - 1) * leadingNines;
    const left = 24 + (2 * Math.random() - 1) * leadingNines;
    const styles = {
      position: 'absolute',
      top: top + 'px',
      left: left + 'px',
      fontSize: (30 + leadingNines/4) + 'px',
    };

    return html`
<div style=${styleMap(styles)}>
Greens: ${commas(this.rz.greens || 0)}
</div>
    `;
  }
}
customElements.define('g-odometer', Odometer);
