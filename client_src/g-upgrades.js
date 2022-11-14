import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {commas, toKMBTQ, toSnakeCase} from './utils.js';
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
  ${up.name}: ${toKMBTQ(up.cost)}
</sl-button>`;
  }

  renderEmptyMessage() {
      return html`
        <div>
          Use the blue buttons below to earn "greens" for
          successful test case runs.   Then, spend your greens
          on upgrades that will appear here.
        </div>
      `;    
  }

  renderUpgrades() {
    const g = rz['greens'] || 0;
    if (g == 0) return this.renderEmptyMessage();
    const chapter = Math.min(
      Math.floor(Math.log10(g) / 2),
      this.chapters.length - 1);
    const possibleUps = this.chapters[chapter].upgrades;
    const displayedUps = possibleUps.filter(
      up => this.checkPrereq(up));
    if (displayedUps.length) {
      return displayedUps.map(
	up => this.renderUpgrade(up));
    } else {
      return this.renderEmptyMessage();
    }
  }

  renderQuiz() {
    return html`
<g-quiz .rz=${this.rz} ${ref(this.quizRef)}>
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
