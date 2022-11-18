import {LitElement, css, html, nothing} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {formatGameDay} from './g-calendar.js';

class News extends LitElement {
  emailRef = createRef();
  
  static get properties() {
    return {
      nz: {type: Array}, // New news for yesterday and today.
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

a:visited {
  color: blue;
}
    `];
  }

  constructor() {
    super();
    this.nz = [];
    this.allNews = [];
  }

  mergeNews() {
    for (let [day, items] of this.nz) {
      let found = false;
      for (let i=this.allNews.length - 1; i >= 0 && day <= this.allNews[i][0]; i--) {
	if (day == this.allNews[i][0]) {
	  this.allNews[i][1] = items;
	  found = true;
	}
      }
      if (!found) {
	this.allNews.push([day, items]);
      }
    }

  }
    
  showEmail(message) {
    this.emailRef.value.openOn(message);
  }
    
  renderItem(item) {
    if (typeof item == 'string') {
      return item;
    }
    return html`
     Email: 
     <a href=# @click=${e => this.showEmail(item)}>
       ${item.subject}
     </a>
    `;
  }
  
  renderDay(dayNews) {
    const [day, items] = dayNews;
    return html`
  <div>${formatGameDay(day)}</div>
  <ul>
    ${items.map(item => html`
      <li>${this.renderItem(item)}
      `)}
  </ul>

    `;
  }
  
  render() {
    if (this.nz === undefined) return nothing;

    this.mergeNews();

    return html`
<g-email ${ref(this.emailRef)}></g-email>

${this.allNews.map((unused, index, array) => 
    this.renderDay(array[array.length - 1 - index]))}
    `;
  }
}
customElements.define('g-news', News);
