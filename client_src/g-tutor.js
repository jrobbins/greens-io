import {LitElement, css, html, nothing} from 'lit';

const STEPS = [
  {path: ['g-dashboard', '#tests', '#poke_around'],
   placement: 'right',
   lines: ['Press this button a few times.',
	   'It represents manually testing a software product.',
	   'Tip: Try using your spacebar.'],
  },
  {path: ['g-odometer'],
   placement: 'bottom-start',
   lines: ['It makes this number go up by one.',
	   'Your teammates are also helping.',
	   'That\'s nice, but it\'s way too slow.'],
  },
  {path: ['g-upgrades'],
   placement: 'bottom-start',
   lines: ['When you have enough greens, choose an upgrade.',
	   'Each upgrade has a trivia question.',
	   'Every player sees the same questions, ' +
	   'so feel free to talk about them.'],
  },
  {path: ['g-dashboard', '#tests', 'sl-card'],
   placement: 'right',
   lines: ['Upgrades can:',
	   '* Improve a resource, ',
	   '* Reveal new inforation, or ',
	   '* Offer more powerful buttons.'],
  },
  {path: ['g-news'],
   placement: 'left-start',
   lines: ['You and your teammates all work together.',
	   'Here, you\'ll see news about their progress.',
	   'And, emails from your CEO.'],
  },
  {path: ['g-calendar'],
   placement: 'left',
   lines: ['You have one year of game time, ' +
	   'which is 20 minutes of real time.',
	   'So, hurry up and earn some greens. ' +
	   'Hundreds, thousands, ... maybe millions!'],
  },
];


class Tutor extends LitElement {
  
  static get properties() {
    return {
      step: {type: Number},
    };
  }
  
  static get styles() {
    return [
      css`
       *[hidden] {
         display: none;
       }
       sl-popup {
         --arrow-color: var(--sl-color-primary-800);
         --arrow-size: 20px;
       }
       .bubble {
         padding: 16px;
         background: var(--sl-color-primary-800);
         color: white;
         border-radius: 16px;
       }
       .content {
         padding: 8px;
         max-width: 35ch;
       }
       .content > * {
         padding-bottom: 16px;
       }
       .footer {
         display: flex;
         justify-content: flex-end;
         gap: 16px;
       }
       sl-button::part(base) { color: white; }
    `];
  }

  constructor() {
    super();
    this.step = STEPS.length;
  }

  start() {
    setTimeout(() => this.step = 0, 1000);
  }
  
  advance() {
    this.step += 1;
  }
  
  skip() {
    this.step = STEPS.length;
  }
  
  findAnchor() {
    const path = STEPS[this.step].path;
    let el = document.querySelector('g-app');
    for (const sel of path) {
      el = el.shadowRoot;
      el = el.querySelector(sel);
    }
    return el;
  }
  
  render() {
    if (this.step >= STEPS.length) return nothing;
    const anchor = this.findAnchor();
    const content = STEPS[this.step].lines.map(line =>
      html`<div>${line}</div>`);
    const placement = STEPS[this.step].placement;
    const lastStep = (this.step == STEPS.length - 1);
    
    return html`
<sl-popup placement=${placement} arrow arrow-placement="center"
    distance="16" .anchor=${anchor} active>
  <div class="bubble">
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <sl-button size="small" variant="text" .hidden=${lastStep}
          @click=${e => this.skip()}>
          Skip
      </sl-button>
      <sl-button size="small" variant="primary" pill
          @click=${e => this.advance()}>
          ${lastStep ? 'Done' : 'Next'}
      </sl-button>
    </div>
  </div>
<sl-popup>
    `;
  }
}
customElements.define('g-tutor', Tutor);
