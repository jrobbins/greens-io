// Dispatch an order name to the approriate function, which then
// gathers additional information and/or requires the user to make
// some themed effort.  Assuming the player completes that, we
// call  gioClient to send the order to the server.

// Example orders:
// "Write a test case" ->  a tick list -> test_cases++
// "Write a function" -> a slider -> functions++
// "Learn Perl ..." -> trivia question -> perl++

// See orders.py for the little language for orders.

const QUIZ = 'g-quiz';
const SOME = 'g-tick-some';


const ORDER_OPTIONS_BY_NAME = {
  'Write a test case': {tag: SOME, check: 'test_cases'},
  'Write a function': {},
};


function open_order_dialog(hostEl, orderName, options, rz) {
  // TODO: construct element based on options.
  gioClient.postOrders(orderName);
}


export function start_order(hostEl, orderName, rz) {
  const options = ORDER_OPTIONS_BY_NAME[orderName];
  if (options) {
    open_order_dialog(hostEl, orderName, options, rz);
    return;
  }
  gioClient.postOrders(orderName);  
}
