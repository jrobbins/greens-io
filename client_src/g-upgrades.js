import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {commas, toSnakeCase} from './utils.js';
import {start_cmd} from './commands.js';


class Upgrades extends LitElement {
  quizRef = createRef();
  
  static get properties() {
    return {
      rz: {type: Object},
      chapters: {type: Array},
    };
  }
  
  static get styles() {
    return [
      css`
:host {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}
    `];
  }

  constructor() {
    super();
    this.rz = {};
    this.chapters = [];
  }

  checkPrereq(up) {
    const snake = up.snake || toSnakeCase(up.name);
    if (this.rz[snake]) return false;  // aleady accomplished.
    if (up.prereq === "") return true;  // no prereq.
    if (this.rz[up.prereq]) return true;  // satisfied. 
    return false;
  }

  startUpgrade(up) {
    if (up.quiz) {
      // TODO: Try sl-dropdown
      this.quizRef.value.openOn(up)
    } else {
      gioClient.postCmd(up.name);
    }
  }

  renderUpgrade(up) {
    return html`
<sl-button size=small variant=success
  .disabled=${up.cost > this.rz['greens']}
  @click=${e => this.startUpgrade(up)}
  >
  ${up.name} (${up.cost})
</sl-button>`;
  }
  
  renderUpgrades() {
    const g = rz['greens'] || 1;
    const chapter = Math.floor(Math.log10(g) / 2);
    const possibleUps = this.chapters[chapter].upgrades;
    const displayedUps = possibleUps.filter(
      up => this.checkPrereq(up));
    return displayedUps.map(
      up => this.renderUpgrade(up));
  }

  renderQuiz() {
    return html`
<g-quiz ${ref(this.quizRef)}>
</g-quiz>
    `;
  }

  render() {
    return [
      this.renderUpgrades(),
      this.renderQuiz(),
    ];
  }  
}
customElements.define('g-upgrades', Upgrades);
