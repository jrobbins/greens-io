import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {commas, toKMBTQ, toSnakeCase} from './utils.js';
import {start_cmd} from './commands.js';


class Quiz extends LitElement {
  rgRef = createRef();
  
  static get properties() {
    return {
      rz: {type: Object},
      up: {type: Object},
      open: {type: Boolean},
      step: {type: Number},
      prompt: {type: String},
      choices: {type: Array},
      answer: {type: String},
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
    this.answer = '';
    this.submitDisabled = true;
    this.correct = true;
  }

  openOn(upgrade) {
    this.up = upgrade;
    this.parseQuizText(upgrade.quiz.text);
    this.submitDisabled = true;
    this.step = 0;
    this.open = true;
  }

  checkAnswer() {
    this.step = 1;  // fake waiting
    const guess = this.rgRef.value.value;
    this.correct = (guess == this.answer);

    setTimeout(this.checkAnswer2.bind(this), 1000);
  }

  checkAnswer2() {
    this.step = 2;  // show outcome
    setTimeout(this.checkAnswer3.bind(this), 1000);
  }

  checkAnswer3() {
    if (this.correct && this.up.cost <= this.rz.greens) {
      gioClient.postCmd(this.up.name);
      this.open = false;    
      this.rgRef.value.value = 'no such radio value';
      const radios = this.rgRef.value.getAllRadios();
      radios.forEach(radio => (radio.checked = false));
    } else {
      this.submitDisabled = false;
    }
  }
  
  parseQuizText(text) {
    const parts = text.split('   |'); // Needs 3 spaces.
    this.prompt = parts.shift();
    const newChoices = [];
    for (let choice of parts) {
      if (choice.startsWith('X ')) {
	choice = choice.substring(2);
	this.answer = choice;
      }
      newChoices.push(choice);
    }
    this.choices = newChoices;
  }

  
  renderQuiz() {
    if (this.choices == []) return nothing;
    return html`
<p>${this.prompt}</p>

<sl-radio-group label="Select your answer" ${ref(this.rgRef)}
  @sl-change=${e => this.submitDisabled = false}>
  ${this.choices.map(c => html`
      <sl-radio value="${c}">${c}</sl-radio>
    `)}
</sl-radio-group>
    `;
  }

  renderMessage() {
    if (this.up.cost > this.rz.greens) {
      return 'Your teammates depleated your greens.';
    }
    if (this.step == 1) {
      return 'Checking...';
    }

    if (this.step == 2) {
      if (this.correct) {
          return 'Correct!  Buying upgrade for ' +
	  toKMBTQ(this.up.cost) + ' greens.';
      } else {
	return 'Nope, try again.';
      }
    }

    return nothing;
  }
  
  render() {
    if (this.up === {}) return nothing;
    const disabled = (
        (this.up.cost > this.rz.greens) ||
 	this.submitDisabled ||
        this.step == 2);

    return html`
<sl-dialog label=${this.up.name} ?open=${this.open}
       @sl-hide=${e => this.open = false}>
  ${this.renderQuiz()}
  <span slot="footer" id="msg">
    ${this.renderMessage()}
  </span>
  <sl-button slot="footer" variant="primary"
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
