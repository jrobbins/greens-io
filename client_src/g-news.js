import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

class News extends LitElement {
  dialogRef = createRef();
  
  static get properties() {
    return {
      nz: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
:host {
  font-size: 14px;
}

ul {
  margin-top: 8px;
  padding-inline-start: 16px;
}
    `];
  }

  constructor() {
    super();
    this.nz = {};
  }
  
  showEmail(num) {
    this.dialogRef.value.show();
  }

  render() {
    return html`
  <sl-dialog label="Email" ${ref(this.dialogRef)}>
     <div>From: The CEO</div>
     <div>To: New hires</div>
     <div>Subject: Welcome!</div>
     <p>
       We are obsessed with quality.
     </p>
  </sl-dialog>

  <div>Jan 5, 2022</div><ul>
    <li>USER1 learned JavaScript.
    <li>USER2 wrote 3 test cases.
  </ul>

  <div>Jan 4, 2022</div><ul>
    <li>USER1 and USER2 poked around.
    <li>USER2 learned JavaScript.
  </ul>

  <div>Jan 3, 2022</div><ul>
    <li>USER1 poked around.
    <li>USER2 set up a test runner.
    <li><a href=# @click=${e => this.showEmail(1)}>Welcome email</a> from the CEO
  </ul>

    `;
  }
}
customElements.define('g-news', News);
