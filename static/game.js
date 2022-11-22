
let rz = {};  // Team and player resources
let nz = []; // News
let nick = '';

let chapters = [];
let teamName = decodeURI(location.pathname);
while (teamName.startsWith('/')) {
  teamName = teamName.substring(1);
}
while (teamName.endsWith('/')) {
  teamName = teamName.substring(0, teamName.length - 1);
}

gioClient.useArena(teamName);

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
  gioClient.getStory().then((res) => {
    chapters = res.chapters;
    appEl.chapters = chapters;
  });
}


init();


let running = true;
const maxSteps = 0;
let step = 0;
let lastTimestamp = 0;

const TICK = 500;

function gameLoop() {
  if (!running) return;
  if (gioClient.errorCount > 5) return;
  if (rz.day >= rz.maxdays) {
    running = false;
    return;
  }
  if (gioClient.playerId) {
    gioClient.getArena().then((res) => {
      const rzOrig = {...rz};
      rz = res.resources;
      nz = res.news;
      appEl.rz = interp(rzOrig, rz, 0.2);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.4); }, TICK/5);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.6); }, 2*TICK/5);
      window.setTimeout(() => {
	appEl.rz = interp(rzOrig, rz, 0.8); }, 3*TICK/5);
      window.setTimeout(() => { appEl.rz = rz; }, 4*TICK/5);
      appEl.nz = nz;
    });
  }
  window.setTimeout(gameLoop, TICK);
}

window.setTimeout(gameLoop, TICK);

