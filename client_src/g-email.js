import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';

class Email extends LitElement {
  dialogRef = createRef();

  static get properties() {
    return {
      message: {type: Object},
    };
  }
  
  static get styles() {
    return [
      css`
sl-dialog::part(body) {
  padding-top: 0;
}

th {
  text-align: left;
}

.body {
  padding: 1em;
}
    `];
  }

  constructor() {
    super();
    this.message = {};
  }

  openOn(msg) {
    this.message = msg;
    this.dialogRef.value.show();
  }

  render() {
    return html`
<sl-dialog label="Email" ${ref(this.dialogRef)}>
  <table cellspacing=3>
    <tr><th>From:</th><td>${this.message.from}</td></tr>
    <tr><th>To:</th><td>${this.message.to}</td></tr>
    <tr><th>Subject:</th><td>${this.message.subject}</td></tr>
  </table>
  <div class="body">
    ${(this.message.body || []).map(para => html`
      <p>${para}</p>
    `)}
  </div>
</sl-dialog>
    `;
  }
}
customElements.define('g-email', Email);

