import {LitElement, css, html, nothing} from 'lit';

class App extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
      uz: {type: Object},
      sz: {type: Object},
      roster: {type: Array},
    };
  }
  
  static get styles() {
    return [
      css`
       :host {
         top: 0h;
         left: 0;
         width: 98vw;
         height: 98vh;
         background: #fafaff;
         display: grid;
         overflow: hidden;
         grid-template-columns: repeat(3, 1fr);
         grid-template-rows:  60px 80px 60px auto;
         grid-template-areas:
           "odo odo cal"
           "ups ups cal"
           "dsh dsh log"
           "dsh dsh log";
         grid-gap: 6px;
       }

      * { 
        background: #eee;
        padding: 8px;
        overflow: hidden;
      }
      g-odometer { grid-area: odo; }
      g-upgrades  { grid-area: ups; }
      g-dashboard  { 
        grid-area: dsh; 
        overflow-x: auto;
      }
      g-calendar  { grid-area: cal; }
      g-snippets  { grid-area: log; }

    `];
  }

  constructor() {
    super();
    this.rz = {};
    this.uz = {};
    this.sz = {};
    this.roster = [];
  }

  render() {
    return html`
      <g-odometer .rz=${this.rz}></g-odometer>
      <g-upgrades .rz=${this.rz} .uz=${this.uz}></g-upgrades>
      <g-dashboard .rz=${this.rz}></g-dashboard>
      <g-calendar .day=${this.rz.day}></g-calendar>
      <g-snippets .sz=${this.sz}></g-snippets>
    `;
  }
}
customElements.define('g-app', App);
