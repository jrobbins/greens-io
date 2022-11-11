// Dispatch a command name to the approriate function, which then
// gathers additional information and/or requires the user to make
// some themed effort.  Assuming the player completes that, we
// call  gioClient to send the command to the server.

// Example commands:
// "Write a test case" ->  a tick list -> test_cases++
// "Write a function" -> a slider -> functions++
// "Learn Perl ..." -> trivia question -> perl++

// See orders.py for the little language for orders.

const QUIZ = 'g-trivia';
const SOME = 'g-tick-some';


const CMD_OPTIONS_BY_NAME = {
  'Write a test case': {tag: SOME, check: 'test_cases'},
  'Write a function': {},
};


function open_cmd_dialog(hostEl, cmd, options, rz) {
  // TODO: construct element based on options.
  gioClient.postCmd(cmd);
}


export function start_cmd(hostEl, cmd, rz) {
  const options = CMD_OPTIONS_BY_NAME[cmd];
  if (options) {
    open_cmd_dialog(hostEl, cmd, options, rz);
    return;
  }
  gioClient.postCmd(cmd);  
}
