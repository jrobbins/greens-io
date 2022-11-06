
let rz = {};  // Resources
let tz = {}; // Techs
let sz = []; // Snippets
let uz = []; // Upgrades
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
  gioClient.getArena().then((res) => {
    rz = res.resources;
    tz = res.techs;
    sz = res.snippets;
    uz = res.upgrades;
  });
  window.setTimeout(gameLoop, 1000);
}

// window.setTimeout(gameLoop, 1000);

