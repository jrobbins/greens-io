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
    this.possibleUpgrades = [];
    this.currentChapter = -1;
  }

  maybeAddUpgrades() {
    if (this.rz.chapter === undefined || this.chapters == [])
      return;
    if (this.rz.chapter <= this.currentChapter)
      return;
    this.currentChapter = this.rz.chapter;
    this.possibleUpgrades = [
      ...this.possibleUpgrades,
      ...this.chapters[this.currentChapter].upgrades];
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
    const disabled = (
      up.cost > this.rz.greens ||
      this.rz.day >= this.rz.maxdays)
    return html`
<sl-button size=small variant=success
  title=${up.tooltip || 'Learn a skill'}
  .disabled=${disabled}
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
    const g = this.rz['greens'] || 0;
    if (g == 0) return this.renderEmptyMessage();
    const displayedUps = this.possibleUpgrades.filter(
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
    this.maybeAddUpgrades();
    return [
      this.renderUpgrades(),
      this.renderQuiz(),
    ];
  }
}
customElements.define('g-upgrades', Upgrades);
