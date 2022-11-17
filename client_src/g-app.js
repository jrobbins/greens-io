import {LitElement, css, html, nothing} from 'lit';

class App extends LitElement {
  
  static get properties() {
    return {
      rz: {type: Object},
      nz: {type: Array},
      roster: {type: Array},
      chapters: {type: Array},
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
         grid-template-columns: 1fr 1fr 1fr minmax(100px, 1fr);
         grid-template-rows:  60px 55px 60px auto;
         grid-template-areas:
           "odo odo odo cal"
           "ups ups ups cal"
           "dsh dsh dsh cal"
           "dsh dsh dsh log";
         grid-gap: 6px;
       }

      * { 
        background: #eee;
        padding: 8px;
        overflow: hidden;
      }
      g-odometer { 
        grid-area: odo; 
      }
      g-upgrades  {
        grid-area: ups;
        overflow-x: auto;
      }
      g-dashboard  { 
        grid-area: dsh; 
        overflow-x: auto;
      }
      g-calendar  { 
        grid-area: cal;
      }
      g-news  {
        grid-area: log;
        overflow-y: auto;
      }

    `];
  }

  constructor() {
    super();
    this.rz = {};
    this.nz = [];
    this.roster = [];
    this.chapters = [];
  }

  render() {
    return html`
      <g-odometer .rz=${this.rz}></g-odometer>
      <g-upgrades .rz=${this.rz} .chapters=${this.chapters}>
      </g-upgrades>
      <g-dashboard .rz=${this.rz}></g-dashboard>
      <g-calendar .day=${this.rz.day}></g-calendar>
      <g-news .nz=${this.nz}></g-news>
    `;
  }
}
customElements.define('g-app', App);
