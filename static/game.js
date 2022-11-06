
let rz = {};  // Resources
let tz = {}; // Techs
let uz = []; // Upgrades
let sz = []; // Snippets
let nick = '';




function init() {
}


init();


let running = true;
const maxSteps = 0;
let step = 0;
let lastTimestamp = 0;


function gameLoop() {
  if (!running) return;
  if (gioClient.playerId) {
    gioClient.getArena().then((res) => {
      rz = res.resources;
      tz = res.techs;
      uz = res.upgrades;
      sz = res.snippets;
      appEl.rz = rz;
      appEl.uz = uz;
      appEl.sz = sz;
    });
  }
  window.setTimeout(gameLoop, 1000);
}

window.setTimeout(gameLoop, 1000);

