import {LitElement, css, html, nothing} from 'lit';
import {commas, toSnakeCase} from './utils.js';
import {start_order} from './orders.js';
import {CHAPTERS} from './chapters.js';

class Upgrades extends LitElement {
  
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
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: scroll;
}

sl-button::part(base) {
  height: 60px;
}
    `];
  }

  constructor() {
    super();
    this.rz = {};
  }

  checkPrereq(up) {
    const slug = up.slug || toSnakeCase(up.name);
    if (this.rz[slug]) return false;  // aleady accomplished.
    console.log('checking ' + up.prereq + ' = ' + this.rz[up.prereq]);
    if (up.prereq === undefined) return true;  // no prereq.
    if (this.rz[up.prereq]) return true;  // satisfied. 
    return false;
  }

  startUpgrade(up) {
    start_order(this, up.name, this.rz);
  }

  renderUpgrade(up) {
    return html`
<sl-button size=small variant=success
  .disabled=${up.cost > this.rz['greens']}
  @click=${e => this.startUpgrade(up)}
  >
  ${up.name}<br/>
  ${up.cost < 1000 ? 'Cost:' : nothing} ${up.cost}
</sl-button>`;
  }
  
  renderUpgrades() {
    const g = rz['greens'] || 1;
    const chapter = Math.floor(Math.log10(g) / 2);
    const possibleUps = CHAPTERS[chapter].upgrades;
    const displayedUps = possibleUps.filter(
      up => this.checkPrereq(up));
    return displayedUps.map(
      up => this.renderUpgrade(up));
  }

  render() {
    return [
      this.renderUpgrades(),
    ];
  }  
}
customElements.define('g-upgrades', Upgrades);
