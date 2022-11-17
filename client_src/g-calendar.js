import {LitElement, css, html, nothing} from 'lit';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const MONTH_DAYS = [
  31, 28, 31, 30, 31, 30, 31,
  31, 30, 31, 30, 31];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatGameDay(day) {
  const year = (new Date()).getFullYear();
  const gameDate = new Date(year, 0, day || 1);
  const month = gameDate.getMonth();
  const date = gameDate.getDate();
  return MONTH_NAMES[month] + ' ' + date + ', ' + year;
}


class Calendar extends LitElement {
  
  static get properties() {
    return {
      day: {type: Number},
    };
  }
  
  static get styles() {
    return [
      css`
.outer {
  display: flex;
  font-size: 14px;
}

.calendar {      
  display: inline-block;
  width: 35ex;
  height: 100%;
}

.inner {
  display: flex;
  flex-wrap: wrap;
}

.month-name {
  width: 35ex;
  text-align: center;
  font-weight: bold;
}

span {
  width: 4ex;
  margin: 1px;
  padding: 1px 2px;
  text-align: center;
  background: #ddd;
}

.spacer, .dn {
  background: transparent;
}

.selected {
  background: darkgreen;
  color: white;
}

    `];
  }

  constructor() {
    super();
    this.day = 1;
  }

  renderCalendar() {
    const year = (new Date()).getFullYear();
    const gameDate = new Date(year, 0, this.day || 1);
    const month = gameDate.getMonth();
    const date = gameDate.getDate();
    const spacers = (new Date(year, month, 1)).getDay();

    const parts = [];
    for (let sp = 0; sp < spacers; sp++) {
      parts.push(html`<span class="spacer">&nbsp</span>`);
    }
    for (let dim = 1; dim <= MONTH_DAYS[month]; dim++) {
      if (dim == date) 
	parts.push(html`<span class="selected">${dim}</span>`);
      else
	parts.push(html`<span>${dim}</span>`);
    }

    return html`
<div class="inner">
  <div class="month-name">${MONTH_NAMES[month]} ${year}</div>
  ${DAY_NAMES.map(dn => html`<span class=dn>${dn}</span>`)}
  ${parts}
</div>
    `;
  }

  render() {
    return html`
<div class="outer">
  <div class="calendar">
    ${this.renderCalendar()}
  </div>
</div>
    `;
  }
}
customElements.define('g-calendar', Calendar);
