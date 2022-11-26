import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';


const WORD_ONE_CHOICES = [
  'Awesome', 'Happy', 'Senior', 'Techo', 'Jammin', 'Loud',
  'Adorable', 'Adventurous', 'Bored', 'Brainy', 'Brave',
  'Bright', 'Busy', 'Calm', 'Careful', 'Cautious', 'Charming',
  'Cheerful', 'Clever', 'Clumsy', 'Colorful', 'Comfortable',
  'Confused', 'Cooperative', 'Courageous', 'Crazy',
  'Curious', 'Disgusted', 'Distinct', 'Dizzy', '  Doubtful',
  'Eager', 'Elated', 'Elegant', 'Enchanting', 'Encouraging',
  'Energetic', 'Enthusiastic', 'Excited', 'Exuberant', 'Fair',
  'Faithful', 'Famous', 'Fancy', 'Fantastic', 'Fierce', 'Friendly',
  'Funny', 'Gentle', 'Gifted', 'Glamorous', 'Gleaming', 'Glorious',
  'Graceful', 'Grumpy', 'Handsome', 'Healthy', 'Helpful', 'Hilarious',
  'Hungry', 'Innocent', 'Inquisitive', 'Jealous', 'Jittery', 'Jolly',
  'Joyous', 'Kind', 'Lucky', 'Magnificent', 'Modern', 'Mysterious',
  'Nutty', 'Obedient', 'Odd', 'Outrageous', 'Outstanding', 'Perfect',
  'Pleasant', 'Poised', 'Powerful', 'Prickly', 'Proud', 'Puzzled',
  'Quaint', 'Real', 'Shiny', 'Shy', 'Silly', 'Sleepy', 'Smiling',
  'Sparkling', 'Splendid', 'Spotless', 'Stormy', 'Strange',
  'Successful', 'Super', 'Talented', 'Tame', 'Tasty', 'Tender',
  'Thankful', 'Thoughtful', 'Tough', 'Unstoppable', 'Unusual',
  'Victorious', 'Wandering', 'Wild', 'Witty', 'Zany', 'Zealous'];

const WORD_TWO_CHOICES = [
  'bit', 'byte', 'button', 'computer', 'server', 'software',
  'app', 'data', 'disk', 'site', 'web', 'code', 'machine',
  'science', 'knowledge', 'budget', 'book', 'document',
  'browser', 'chip', 'cookie', 'cpu', 'email', 'firewall',
  'page', 'internet', 'interanet', 'protocol', 'corp',
  'breakfast', 'snack', 'lunch', 'dinner', 'coffee',
  'mountain', 'ocean', 'desert', 'valley', 'river',
  'gameshow', 'art', 'pet', 'music', 'game', 'power',
  'daytime', 'night', 'morning', 'rally', 'sports'];

const WORD_THREE_CHOICES = [
  'hackers', 'heros', 'inspectors', 'handlers', 'wranglers',
  'chasers', 'rockstars', 'crowd', 'club', 'society', 'group',
  'students', 'inventors', 'ninjas', 'crew', 'team', 'party',
  'troop', 'bunch', 'committee', 'clique', 'hosts', 'newbies',
  'bears', 'cats', 'flock', 'birds', 'tigers', 'lions',
  'wolves', 'pirates', 'eagles', 'sharks', 'highlanders',
  'wizards', 'people', 'folks', 'singers', 'fans', 'superfans'];


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
    this.slug = this.teamRef.value.value;
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
          <span style="white-space:nowrap">Team name:</span>
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
