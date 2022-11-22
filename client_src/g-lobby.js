import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

class Lobby extends LitElement {
  nickRef = createRef();
  
  static get properties() {
    return {
      nick: {type: String},
      roster: {type: Array},
      open: {type: Boolean},
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
       h1 { 
         margin-top: 0;
         text-align: center;
       }
       form {
         display: flex;
         justify-content: space-evenly;
         align-items: center;
         gap: 10px;
         margin: 0 2em;
       }
       #nick {
         flex: 1;
       }
       ul {
         border-top: 1px solid #999;
         padding-top: 1em;
       }
    `];
  }

  constructor() {
    super();
    this.nick = '';
    this.roster = [];
    this.open = true;
  }

  join() {
    this.nick = this.nickRef.value.value;
    console.log(`welcome ${this.nick}`);
    this.open = false;
    gioClient.addPlayer(this.nick).then((res) => {
      console.log(res);
      this.roster = res;
    });
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.join();
    }
  }
  
  render() {
    return html`
      <sl-dialog ?open=${this.open} 
        label="Greens.io: ${gioClient.arena}"
        @sl-request-close=${e => e.preventDefault()}>
        <form action="">
          <sl-input id=nick autofocus placeholder="Nickname" 
              size="small" ${ref(this.nickRef)}
              @keydown=${this.checkEnter}
          ></sl-input>
          <sl-button variant="primary" size="small" pill
             @click=${this.join}>Join</sl-button>
        </form>

        <ul>
          <li>Choose a nickname for your teammates to see.
          <li>Do manual and automated testing to earn greens.
          <li>Accumulate as many you can in 20 minutes.
          <li>Work through upgrades to advance your progress.
          <li>Collaborate to unblock teammates.
        </ul>
      </sl-dialog>
    `;
  }
}
customElements.define('g-lobby', Lobby);
