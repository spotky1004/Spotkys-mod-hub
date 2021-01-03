"use strict";

function reset() {
  game = {
  base: 10,
  ord: EN(0),
  over: 0,
  canInf: false,
  OP: 0,
  infUnlock: 0,
  subTab: 1,
  bsubTab: 1,
  csubTab: 1,
  succAuto: 0,
  limAuto: 0,
  autoLoop: { succ: 0, lim: 0 },
  factorShifts: 0,
  factors: [],
  lastTick: Date.now(),
  version: 0.22,
  boostUnlock: 0,
  boosters: 0,
  upgrades: [],
  factorBoosts: 0,
  dynamic: EN(1),
  dynamicUnlock: 0,
  maxAuto: 0,
  infAuto: 0,
  bAutoLoop: { max: 0, inf: 0 },
  autoOn: { max: 1, inf: 1 },
  challenge: 0,
  challengeCompletion: [0, 0, 0, 0, 0, 0, 0],
  incrementy: EN(0),
  manifolds: 0,
  iups: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  buchholz: 1,
  theme: 0,
  msint: 50,
  maxOrdLength: { less: 5, more: 7 },
  colors: 0,
  music: 0,
  chal8: 0,
  chal8Comp: 0,
  decrementy: 0,
  collapsed: 0,
  manualClicksLeft: 1000,
  collapseUnlock: 0,
  cardinals: EN(0),
  collapseTime: 0,
  reachedBHO: 0,
  assCard: [
	{ points: EN(0), power: EN(0), mult: EN(1) },
	{ points: EN(0), power: EN(0), mult: EN(1) },
	{ points: EN(0), power: EN(0), mult: EN(1) }
  ],
  leastBoost: Infinity,
  alephOmega: EN(0),
  aups: [],
  assBefore: 0,
  dups: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  darkManifolds: 0,
  darkManifoldMax: 0,
  cAutoOn: { shift: 1, boost: 1 },
  cAutoLoop: { shift: 0, boost: 0 },
  offlineProg: 1,
  shiftAuto: EN(1),
  boostAuto: EN(1),
  fbConfirm: 0,
  bulkBoost: 1,
  maxIncrementyRate: EN(0),
  mostCardOnce: EN(0),
  flashIncrementy: 1,
  bConf: { ref: 1, refFB: 0, chal: 0, chalFB: 0 },
  qolSM: { abu: 1, ig73: 1, igc8: 1, acc: 1, nc8: 0, c8: 0, ca: 0, st: 0, ttnc: 0 },
  maxCard: EN(0),
  hotkeysOn: 1,
  sing: { dm: 0, m: 0, nw: 0 },
  thicc: 1,
  collapseConf: 1,
  mostSing: 0,
  spentFunctions: 0,
  sfBought: [],
  sfEver: [],
  mostChal4: 0,
  refundPoints: 0,
  refundPointProg: 0,
  autoIncrCost : [1e1, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e14, 1e18, 1e25],
  autoIncrBought : {0: EN(0), 1: EN(0), 2: EN(0), 3: EN(0), 4: EN(0), 5: EN(0), 6: EN(0), 7: EN(0), 8: EN(0), 9: EN(0)},
  autoIncrHave : {0: EN(0), 1: EN(0), 2: EN(0), 3: EN(0), 4: EN(0), 5: EN(0), 6: EN(0), 7: EN(0), 8: EN(0), 9: EN(0)},
  infUpgradeHave : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  infTime : 0,
  markCount : 0,
  autobuyerHave : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  autobuyerBought : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  markupChallenge : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  markupChallengeEntered : 0,
  autobuyerOn : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  c3Effect : 0,
  c5Effect : 0,
  autobuyersToggle : 0,
  dynamicLevel : EN(0),
  dynamicLevel2 : EN(0),
  c7Effect : 0,
  tickHave : {0: EN(1), 1: EN(0), 2: EN(0), 3: EN(0), 4: EN(0), 5: EN(0), 6: EN(0), 7: EN(0), 8: EN(0), 9: EN(0)},
  tickBought : {0: EN(0), 1: EN(0), 2: EN(0), 3: EN(0), 4: EN(0), 5: EN(0), 6: EN(0), 7: EN(0), 8: EN(0), 9: EN(0)}
  };
  document.getElementById("infinityTabButton").style.display = "none";
  render();
}

function loadGame(loadgame) {
  reset();
  for (const i in loadgame) {
    if (typeof loadgame[i]=="object"&&loadgame[i]!=null) {
      if (typeof loadgame[i].array!="undefined"&&typeof loadgame[i].sign!="undefined") {
        game[i] = ENify(loadgame[i])
      } else {
        game[i] = loadgame[i];
      }
    } else {
      game[i] = loadgame[i];
    }
  }
  const diff = Date.now() - game.lastTick;
  for (var i = 0; i < 10; i++) {
    game.autoIncrBought[i] = ENify(game.autoIncrBought[i]);
    game.autoIncrHave[i] = ENify(game.autoIncrHave[i]);
    game.tickHave[i] = ENify(game.tickHave[i]);
    game.tickBought[i] = ENify(game.tickBought[i]);
  }
  game.OP = ENify(game.OP);
  game.cardinals = ENify(game.cardinals);
  game.incrementy = ENify(game.incrementy);
  game.assCard[0].points = ENify(game.assCard[0].points);
  game.assCard[0].power = ENify(game.assCard[0].power);
  game.assCard[0].mult = ENify(game.assCard[0].mult);
  game.assCard[1].points = ENify(game.assCard[1].points);
  game.assCard[1].power = ENify(game.assCard[1].power);
  game.assCard[1].mult = ENify(game.assCard[1].mult);
  game.assCard[2].points = ENify(game.assCard[2].points);
  game.assCard[2].power = ENify(game.assCard[2].power);
  game.assCard[2].mult = ENify(game.assCard[2].mult);
  game.alephOmega = ENify(game.alephOmega);
  game.shiftAuto = ENify(game.shiftAuto);
  game.boostAuto = ENify(game.boostAuto);
  game.maxIncrementyRate = ENify(game.maxIncrementyRate);
  game.mostCardOnce = ENify(game.mostCardOnce);
  game.maxCard = ENify(game.maxCard);
  if (game.leastBoost === null) game.leastBoost = Infinity;
  render();
  if (game.offlineProg === 1) {
    if (game.collapseTime <= 1000 && diff / 1000 >= 1000 - game.collapseTime) {
      loop((1000 - game.collapseTime) * 1000, 1);
      loop(diff - ((1000 - game.collapseTime) * 1000), 1);
    } else {
      loop(diff, 1);
    }
  }
  game.lastTick = Date.now();
}

function load() {
  let loadgame = JSON.parse(localStorage.getItem("ordinalDimSave"));
  if (loadgame !== null && AF === 0) {
    loadGame(loadgame);
  }
}

function save() {
  if (AF === 0) localStorage.setItem("ordinalDimSave", JSON.stringify(game));
}

function exporty() {
  copyStringToClipboard(btoa(JSON.stringify(game)));
}

function importy() {
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    loadGame(loadgame);
  }
}
