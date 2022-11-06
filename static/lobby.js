function join() {
  nick = nickEl.value;
  console.log(`welcome ${nick}`);
  dialogEl.close();
  gioClient.addPlayer(nick).then((res) => {
    console.log(res);
    updateLeaderboard();
  });
}

nickEl.focus();

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  join();
});


let roster = [];

function updateLeaderboard() {
  if (!running) return;
  gioClient.getPlayers().then((res) => {
    roster = res;
  });
  window.setTimeout(updateLeaderboard, 10000);
}

window.setTimeout(updateLeaderboard, 10000);
