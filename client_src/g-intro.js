import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {commas, toSlug} from './utils.js';


const WORD_ONE_CHOICES = [
  'awesome', 'happy', 'senior', 'techo', 'jammin', 'loud',
  'adorable', 'adventurous', 'bored', 'brainy', 'brave',
  'bright', 'busy', 'calm', 'careful', 'cautious', 'charming',
  'cheerful', 'clever', 'clumsy', 'colorful', 'comfortable',
  'confused', 'cooperative', 'courageous', 'crazy',
  'curious', 'disgusted', 'distinct', 'dizzy', '  doubtful',
  'eager', 'elated', 'elegant', 'enchanting', 'encouraging',
  'energetic', 'enthusiastic', 'excited', 'exuberant', 'fair',
  'faithful', 'famous', 'fancy', 'fantastic', 'fierce', 'friendly',
  'funny', 'gentle', 'gifted', 'glamorous', 'gleaming', 'glorious',
  'graceful', 'grumpy', 'handsome', 'healthy', 'helpful', 'hilarious',
  'hungry', 'innocent', 'inquisitive', 'jealous', 'jittery', 'jolly',
  'joyous', 'kind', 'lucky', 'magnificent', 'modern', 'mysterious',
  'nutty', 'obedient', 'odd', 'outrageous', 'outstanding', 'perfect',
  'pleasant', 'poised', 'powerful', 'prickly', 'proud', 'puzzled',
  'quaint', 'real', 'shiny', 'shy', 'silly', 'sleepy', 'smiling',
  'sparkling', 'splendid', 'spotless', 'stormy', 'strange',
  'successful', 'super', 'talented', 'tame', 'tasty', 'tender',
  'thankful', 'thoughtful', 'tough', 'unsightly', 'unusual',
  'victorious', 'wandering', 'wild', 'witty', 'zany', 'zealous'];

const WORD_TWO_CHOICES = [
  'bit', 'byte', 'button', 'computer', 'server', 'software',
  'app', 'data', 'disk', 'site', 'web', 'code', 'machine',
  'science', 'knowledge', 'budget', 'book', 'document',
  'browser', 'chip', 'cookie', 'cpu', 'email', 'firewall',
  'page', 'internet', 'interanet', 'protocol', 'corp',
  'breakfast', 'snack', 'lunch', 'dinner', 'coffee',
  'mountain', 'ocean', 'desert', 'valley', 'river',
  'gameshow'];

const WORD_THREE_CHOICES = [
  'hackers', 'heros', 'inspectors', 'handlers', 'wranglers',
  'chasers', 'rockstars', 'crowd', 'club', 'society', 'group',
  'students', 'inventors', 'ninjas', 'crew', 'team', 'party',
  'troop', 'bunch', 'committee', 'clique', 'hosts', 'newbies',
  'bears', 'cats', 'flock', 'birds', 'tigers', 'lions',
  'wolves', 'pirates', 'eagles', 'sharks', 'highlanders'];


class Intro extends LitElement {
  teamRef = createRef();
  linkRef = createRef();
  copyRef = createRef();
  
  static get properties() {
    return {
      team: {type: String},
      slug: {type: String},
      copyLabel: {type: String},
    };
  }
  
  static get styles() {
    return [
      css`
       sl-dialog {
         top: 30vh;
       }
       sl-dialog::part(close-button) {
         display: none;
       }
       sl-dialog::part(header) {
         margin-bottom: 0;
       }
       sl-dialog::part(panel) {
         width: 50vw;
       }
       #row1 {
         display:flex;
         gap: 10px; 
         justify-content: center;
         align-items: center;
         margin: 0 1em 2em 1em;
       }
       #team {
         width: 40ch;
       }
       .row {
         text-align: center;
         margin: 1em;
       }
       ul {
         border-top: 1px solid #999;
         padding-top: 1em;
       }
    `];
  }

  constructor() {
    super();
    this.team = '';
    this.slug = 'slug-for-the-url';
    this.copyLabel = 'Copy';
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.random(), 100);
  }

  choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  random() {
    this.teamRef.value.value = (
      this.choose(WORD_ONE_CHOICES) + ' ' +
      this.choose(WORD_TWO_CHOICES) + ' ' +
      this.choose(WORD_THREE_CHOICES));
    this.teamChange();
  }

  teamChange() {
    console.log(this.teamRef.value.value);
    this.slug = toSlug(this.teamRef.value.value);
  }
  
  copy() {
    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(this.linkRef.value);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    this.copyLabel = 'Copied';
    setTimeout(() => {this.copyLabel = 'Copy'}, 3000);
  }
  
  start() {
    this.team = this.teamRef.value.value;
    console.log(`start ${this.team}`);
    location.href = this.team;
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.copy();
    }
  }
  
  render() {
    const host = location.origin;
    return html`
      <sl-dialog open label="Greens.io"
        @sl-request-close=${e => e.preventDefault()}>
          <div id=row1>
          Team name:
          <sl-input id=team autofocus 
              size="small" ${ref(this.teamRef)}
              @sl-input=${e => {console.log(23322); this.teamChange()}}
              @keydown=${this.checkEnter}
          ></sl-input>
          <sl-button size="small" pill
             @click=${this.random}>Randomize</sl-button>
          </div>

          <div class=row>
            Share this link with your teammates:
          </div>
          <div class=row>
          <a id="link" ${ref(this.linkRef)}
            href="${host}/${this.slug}">${host}/${this.slug}</a>
          </div>
          <div class=row>
          <sl-button variant="primary" size="small" pill
             ${ref(this.copyRef)}
             @click=${this.copy}>${this.copyLabel}</sl-button>
          <sl-button  size="small" pill
             @click=${this.start}>Start</sl-button>
          </div>

        <ul>
    <li>This is a collaborative, idle, trivia game
      about software testing.</li>

    <li>It is intended to be played by small groups
      of players, like the members of a software
      development team.</li>

    <li>Games last exactly 20 minutes, so they fit
      into your team's schedule.</li>

        </ul>
      </sl-dialog>
    `;
  }
}
customElements.define('g-intro', Intro);
