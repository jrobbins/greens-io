
let rz = {};  // Resources
let uz = []; // Upgrades
let sz = []; // Snippets
let nick = '';


function interp(oldObj, newObj, fraction) {
  const result = { ...oldObj };
  for (let key in newObj) {
    if (typeof(oldObj[key]) == 'number' &&
	typeof(newObj[key]) == 'number') {
      result[key] += Math.floor((newObj[key] - oldObj[key]) * fraction);
    }
  }
  return result;
}


function init() {
}


init();


let running = true;
const maxSteps = 0;
let step = 0;
let lastTimestamp = 0;


function gameLoop() {
  if (!running) return;
  if (gioClient.errorCount > 5) return;
  if (gioClient.playerId) {
    gioClient.getArena().then((res) => {
      const rzOrig = {...rz};
      rz = res.resources;
      uz = res.upgrades;
      sz = res.snippets;
      appEl.rz = interp(rzOrig, rz, 0.2);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.4); }, 180);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.6); }, 180*2);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.8); }, 180*3);
      window.setTimeout(() => { appEl.rz = rz; }, 180*4);
      appEl.uz = uz;
      appEl.sz = sz;
    });
  }
  window.setTimeout(gameLoop, 1000);
}

window.setTimeout(gameLoop, 1000);

