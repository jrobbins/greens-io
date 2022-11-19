import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {commas, toKMBTQ, toSnakeCase} from './utils.js';
import {start_cmd} from './commands.js';


class Quiz extends LitElement {
  rgRef = createRef();
  btnRef = createRef();
  
  static get properties() {
    return {
      rz: {type: Object},
      up: {type: Object},
      open: {type: Boolean},
      step: {type: Number},
      prompt: {type: String},
      choices: {type: Array},
      submitDisabled: {type: Boolean},
      correct: {type: Boolean},
    };
  }
  
  static get styles() {
    return [
      css`
#msg {
  padding-right: 2em;
}

sl-dialog::part(body) {
  padding-top: 0;
}
    `];
  }

  constructor() {
    super();
    this.rz = {};
    this.up = {};
    this.open = false;
    this.step = 0;
    this.prompt = '';
    this.choices = [];
    this.answers = [];
    this.submitDisabled = true;
    this.correct = true;
    this.totalDelay = 5000;
    this.delaySoFar = 0;
  }

  openOn(upgrade) {
    this.up = upgrade;
    this.parseQuizText(upgrade.quiz.text);
    this.resetRadios()    
    this.submitDisabled = true;
    this.step = 0;
    this.open = true;
    window.setTimeout(
      () => { this.rgRef.value.handleSlotChange() }, 100);
  }

  checkAnswer() {
    this.step = 1;  // fake waiting
    const guess = this.rgRef.value.value;
    this.correct = this.answers.includes(guess);

    if (this.correct) {
      this.totalDelay = Math.max(2000, this.totalDelay - 3000);
    } else {
      this.totalDelay = Math.min(30000, this.totalDelay + 3000);
    }
    this.delaySoFar = 0;
    setTimeout(this.checkAnswer2.bind(this), 100);
  }

  checkAnswer2() {
    this.delaySoFar += 100;
    if (this.delaySoFar < this.totalDelay) {
      this.delaySoFar += 100;
      setTimeout(this.checkAnswer2.bind(this), 100);
    } else {
      this.step = 2;  // show outcome
      setTimeout(this.checkAnswer3.bind(this), 1500);
    }
  }

  resetRadios() {
    this.rgRef.value.value = 'no such radio value';
    const radios = this.rgRef.value.getAllRadios();
    radios.forEach(radio => (radio.checked = false));
  }

  checkAnswer3() {
    if (this.correct && this.up.cost <= this.rz.greens) {
      gioClient.postCmd(this.up.name);
      this.open = false;
      this.resetRadios();
    } else {
      this.step = 0;
    }
  }
  
  parseQuizText(text) {
    const parts = text.split('   |'); // Needs 3 spaces.
    this.prompt = parts.shift();
    this.answers = [];
    const newChoices = [];
    for (let choice of parts) {
      if (choice.startsWith('X ')) {
	choice = choice.substring(2);
	this.answers.push(choice);
      }
      newChoices.push(choice);
    }
    this.choices = newChoices;
  }


  submitOnEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.btnRef.value.click();
    }
  }
  
  renderQuiz() {
    if (this.choices == []) return nothing;
    return html`
<p>${this.prompt}</p>

<sl-radio-group label="Select your answer" ${ref(this.rgRef)}
  @sl-change=${e => {this.submitDisabled = false}}
  @keydown=${this.submitOnEnter}>
  ${this.choices.map(c => html`
      <sl-radio value="${c}">${c}</sl-radio>
    `)}
</sl-radio-group>
    `;
  }

  renderMessage() {
    if (this.rz.day >= this.rz.maxdays) {
      return 'The game year has ended';
    }
    if (this.up.cost > this.rz.greens) {
      return 'Your teammates depleated your greens.';
    }
    if (this.step == 1) {
      const percent = Math.floor(this.delaySoFar / this.totalDelay * 100);
      return 'Checking... ' + percent + '%';
    }

    if (this.step == 2) {
      if (this.correct) {
          return 'Correct!  Buying upgrade for ' +
	  toKMBTQ(this.up.cost) + ' greens.';
      } else {
	return 'Incorrect.  Try again.';
      }
    }

    return nothing;
  }
  
  render() {
    if (this.up === {}) return nothing;
    const disabled = (
        (this.up.cost > this.rz.greens) ||
 	this.submitDisabled ||
	this.rgRef.value.value == 'no such radio value' ||
        this.step == 2 ||
        this.rz.day >= this.rz.maxdays);

    return html`
<sl-dialog label=${this.up.name} ?open=${this.open}
       @sl-hide=${e => this.open = false}>
  ${this.renderQuiz()}
  <span slot="footer" id="msg">
    ${this.renderMessage()}
  </span>
  <sl-button slot="footer" variant="primary"
      ${ref(this.btnRef)}
      ?loading=${this.step == 1}
      ?disabled=${disabled}
      @click=${e => this.checkAnswer()}>
    Submit
  </sl-button>
</sl-dialog>
    `;
  }  
}
customElements.define('g-quiz', Quiz);
