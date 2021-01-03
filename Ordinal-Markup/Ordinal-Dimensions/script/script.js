"use strict";
"ab"
// Yeah, I know it's pretty unorganized at the moment
let factorMult = 1;
let bfactorMult = 1;
let succAutoMult = 1;
let limAutoMult = 1;
let RPloop = 0;
/* eslint-disable */
//let ordMarks = [];
let numMarks = [];
/* eslint-enable */
setMarks();
let clickCoolDown = 0;
let infinityButtonText = 0;
let game;
const factorShiftCosts = [
  200,
  1000,
  10000,
  350000,
  1e12,
  1e21,
  1e100,
  1.095e272,
  Infinity
];
const factorCostExp = [2, 2, 2, 3, 3, 6, 30, 100];
const bupUpgradeCosts = [
  1,1,1,12,
  5,4,8,36,
  72,73,16,108,
  53,74,66,324,
  5e15,Infinity,8e8,1e11,
  Infinity,Infinity,2e19,1e19
];
const slugMile = [1e10, 20, 15, 12, 10, 1, -1];
let totalMult = 1;
let buptotalMute = 1;
const challengeGoals = [
  [1e32, 1e223, 5e270],
  [5e270, V(10) + 1e270, V(17) + 1e270],
  [1e200, 1e214, 1e256],
  [1e33, 5e113, 1.5e119],
  [1e122, 3.33e136, 1e219],
  [1.02e33, 1e44, 4.75e108],
  [1.05e13, 4.18e18, 1.02e20],
  [3.0e10, 6.0e10, 2.4e11, Infinity]
];
const challengeCurve = [0, 0.5, 0.75, 1];
let partOP = 0;
let factorBoostLoop = 0;
let cardinalLoop = ExpantaNum(0);
/* eslint-disable */
let collapseAnimation = 0;
/* eslint-enable */
const iupCosts = [1e5, 1e3, 1e9, 1e16, 2e22, 4e23, 1e19, 2e25, 4e27];
const dupCosts = [
  5,
  1000,
  9,
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  Infinity
];
const baselessMile = [5**75,5**90,Infinity]
let ordColor = "no";
const EN = ExpantaNum;
const get = x => document.getElementById(x);
const musicLink = [
  //"https://cdn.glitch.com/03a4b67b-6f18-4f6d-8d37-50a18fb615c8%2FGoing%20Down%20by%20Jake%20Chudnow%20%5BHD%5D.mp3?v=1581538237884",
  "https://cdn.glitch.com/03a4b67b-6f18-4f6d-8d37-50a18fb615c8%2FHypnothis.mp3?v=1584285594822",
  "https://cdn.glitch.com/310d7aca-4728-445f-9084-db26ceccd7b5%2FArseniy%20Shkljaev%20-%20Nuclearoids%20%5BTrance%5D.mp3?v=1591548196791",
  "https://cdn.glitch.com/310d7aca-4728-445f-9084-db26ceccd7b5%2FHeaven%20and%20Hell%20-%20Jeremy%20Blake%20%5BMpgun.com%5D.mp3?v=1592859293921",
  "https://cdn.glitch.com/310d7aca-4728-445f-9084-db26ceccd7b5%2FMan%20Down.mp3?v=1593650783387"
];
const musicName = [
  "OFF",
  //"Going Down by Jake Chudnow",
  "Hypnothis by Kevin Macleod (Royalty Free)",
  "Nuclearoids by Arseniy Shkljaev (http://arseniymusic.com/)",
  "Heaven and Hell by Jeremy Blake (Copyright Free)",
  "Man Down by Kevin Macleod"
];
const BHO = V(27);
const aupCost = [
  1,
  2,
  4,
  8,
  16,
  256,
  65536,
  2 ** 32,
  2 ** 64,
  2 ** 128,
  2 ** 256,
  2 ** 512
];
let autoIncrCostBase = [1e1, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e14, 1e18, 1e25];
var blockedIncr = 0;
var costScale = 1;
var multPerBuy = 2;
const autobuyerTicks = [25, 35, 45, 55, 65];
const autobuyerBaseTicks = [25, 35, 45, 55, 65];
const infUpgradeCost = [
    1, 10, 75, 200, 500, 20, 90, 250, 400, 800,
    1200, 3000, 1e4, 4e4, 2e5, 1e4, 4e4, 1.6e5, 6.4e5, 1.28e6,
    1e10, 3.45e12, 2.12e13, 1.27e14, 1e15, 1e6, 1e13
 ];
var multiThis;
let AF = 0;
const d = new Date();
var originalOrd;
var tempvar4;
if (
  d.getMonth() === 3 &&
  d.getDate() === 1 &&
  !(d.getFullYear() === Number(localStorage.ordinalMarkupAF))
) {
  AF = 1;
  console.log("April Fools!");
  localStorage.setItem("ordinalMarkupAF", d.getFullYear().toString());
} else {
  AF = 0;
}

reset();
get("music").loop = true;
get("music").volume = 0.5;
get("music").muted = false;

Tab(1);
reset();
load();
render();
setInterval( function () {
  randerEtc();
}, 5000);
randerEtc();

function randerEtc() {
  setAllIncrCost();
  randerAutoIncr();
  randerInfUpgrade();
  randerAutobuyer();
  renderMarkupChallenge();
  challengeReward();
}

function incrTab(num) {
  for (var i = 0; i < 2; i++) {
    get("incrLayer" + i).style.display = "none";
  }
  get("incrLayer" + num).style.display = "block";
}
function buyMaxIncr() {
  for (var i = 9-blockedIncr; i > -1; i--) {
    buyBulkIncr(i, 1e10);
  }
}
function buyBulkIncr(num, bulk) {
  autoIncrCostBase = [game.base**1, game.base**3, game.base**4, game.base**5, game.base**6, game.base**8, game.base**10, game.base**14, game.base**18, game.base**25];
  var thisBulk = EN(0);
  var logOrdOver = EN(0);
  var bulk = EN(bulk);
  if (!EN.eq(game.ord, 0)) {
    var logOrd = EN.logBase(game.ord, game.base);
    // Incrementer past-300 level
    if (EN.lt(EN.mul(game.autoIncrBought[num], costScale), 299)) {
      thisBulk = EN.add(EN.sub(EN.floor(EN.div(EN.sub(logOrd, EN.logBase(autoIncrCostBase[num], game.base)), num+1)), EN.mul(game.autoIncrBought[num], costScale)), 1);
      if (EN.gte(thisBulk, 1)) {
        if (EN.gt(EN.add(thisBulk, EN.mul(game.autoIncrBought[num], costScale)), 299)) {
          thisBulk = EN.sub(299, EN.mul(game.autoIncrBought[num], costScale));
        }
        if (EN.gt(thisBulk, bulk)) {
          thisBulk = EN(bulk);
        }
        game.ord = EN.sub(game.ord, EN.pow(EN.pow(game.base, num+1), EN.add(EN.mul(game.autoIncrBought[num], costScale), thisBulk)));
        game.autoIncrBought[num] = EN.add(game.autoIncrBought[num], thisBulk);
        game.autoIncrHave[num] = EN.add(game.autoIncrHave[num], thisBulk);
        setIncrCost(num);
        bulk = EN.sub(bulk, thisBulk);
        challengesBuyEffect(num);
        randerAutoIncr();
      }
    }
    // Incrementer post-300 level
    if (EN.gte(EN.mul(game.autoIncrBought[num], costScale), 299) && EN.gte(bulk, 1)) {
      thisBulk = EN(0);
      logOrdOver = EN.sub(logOrd, EN.add(EN.logBase(autoIncrCostBase[num], game.base), EN.mul(298, (num+1))));
      thisBulk = EN.add(EN.sub(EN.floor(EN.div(EN.sub(EN.pow(EN.add(EN.mul(EN.div(logOrdOver, num+1), 8), 1), 0.5), -1), 2)), EN.sub(EN.mul(game.autoIncrBought[num], costScale), 298)), 1);
      if (EN.gte(thisBulk, 1)) {
        if (EN.gt(thisBulk, bulk)) {
          thisBulk = EN(bulk);
        }
        game.ord = EN.sub(game.ord, EN.pow(EN.pow(game.base, num+1), EN.add(299, EN.div(EN.mul(EN.sub(EN.mul(game.autoIncrBought[num], costScale), 299), EN.sub(EN.mul(game.autoIncrBought[num], costScale), 298)), 2))));
        game.autoIncrBought[num] = EN.add(game.autoIncrBought[num], thisBulk);
        game.autoIncrHave[num] = EN.add(game.autoIncrHave[num], thisBulk);
        setIncrCost(num);
        challengesBuyEffect(num);
        randerAutoIncr();
      }
    }
  }
}
function setAllIncrCost() {
  for (var i = 0; i < 10; i++) {
    setIncrCost(i);
  }
}
function setIncrCost(num) {
  if (EN.lt(EN.mul(game.autoIncrBought[num], costScale), 299)) {
    game.autoIncrCost[num] = EN.mul(autoIncrCostBase[num], EN.pow(EN.pow(game.base, num+1), EN.mul(game.autoIncrBought[num], costScale)));
  } else {
    game.autoIncrCost[num] = EN.mul(autoIncrCostBase[num], EN.pow(EN.pow(game.base, num+1), EN.add(EN.div(EN.mul(EN.sub(EN.mul(game.autoIncrBought[num], costScale), 299), EN.sub(EN.mul(game.autoIncrBought[num], costScale), 298)), 2), 298)));
  }
}
function challengesBuyEffect(num) {
  if (game.markupChallengeEntered >= 3) {
    game.c3Effect = 0;
  }
  if (game.markupChallengeEntered >= 4) {
    for (var i = 0; i < num; i++) {
      game.autoIncrHave[i] = EN(0);
    }
  }
  if (game.markupChallengeEntered >= 5) {
    game.c5Effect = 1;
  }
}
function randerAutoIncr() {
  for (var i = 0; i < 10; i++) {
    get("autoCost" + i).innerHTML = 'cost: ' + displayOrd(game.autoIncrCost[i],game.base,game.over,game.maxOrdLength.less-1,1,0,game.colors).replace('+...', '');
    if (i >= 10-blockedIncr) {
      get("incrementer" + (i+1)).style.display = 'none';
    } else {
      get("incrementer" + (i+1)).style.display = 'block';
    }
  }
  for (var i = 0; i < 10; i++) {
    get("autoCost" + i).innerHTML = 'cost: ' + displayOrd(game.autoIncrCost[i],game.base,game.over,game.maxOrdLength.less-1,1,0,game.colors).replace('+...', '');
    if (i >= 10-blockedIncr) {
      get("incrementer" + (i+1)).style.display = 'none';
    } else {
      get("incrementer" + (i+1)).style.display = 'block';
    }
  }
}
function buyBulkTIncr(num, bulk) {

}

function randerInfUpgrade() {
  for (var i = 0; i < 27; i++) {
    if (game.infUpgradeHave[i] == 1) {
      document.querySelector('#infUpgrade' + i + ' > button').style.display = 'none';
    } else {
      document.querySelector('#infUpgrade' + i + ' > button').style.display = 'inline';
    }
  }
  randerInfTabs();
}
function infUpgrade(num) {
  if (EN.gte(game.OP, infUpgradeCost[num])) {
    game.infUpgradeHave[num] = 1;
    game.OP = EN.sub(game.OP, infUpgradeCost[num]);
    if (num == 5) {
      game.autoIncrHave[0] = EN.add(game.autoIncrHave[0], 10);
    }
    if (num == 6) {
      game.autoIncrHave[1] = EN.add(game.autoIncrHave[1], 9);
    }
    if (num == 7) {
      game.autoIncrHave[2] = EN.add(game.autoIncrHave[2], 8);
    }
    if (num == 8) {
      game.autoIncrHave[3] = EN.add(game.autoIncrHave[3], 7);
    }
    if (num == 9) {
      game.autoIncrHave[4] = EN.add(game.autoIncrHave[4], 6);
    }
    if (num == 10) {
      game.autoIncrHave[5] = EN.add(game.autoIncrHave[5], 5);
    }
    if (num == 11) {
      game.autoIncrHave[6] = EN.add(game.autoIncrHave[6], 4);
    }
    if (num == 12) {
      game.autoIncrHave[7] = EN.add(game.autoIncrHave[7], 3);
    }
    if (num == 13) {
      game.autoIncrHave[8] = EN.add(game.autoIncrHave[8], 3);
    }
    if (num == 14) {
      game.autoIncrHave[9] = EN.add(game.autoIncrHave[9], 2);
    }
    randerInfUpgrade();
  }
}
function randerInfTabs() {
  if (game.infUpgradeHave[25] == 1) {
    get('autoButton').style.display = 'inline';
    get('challengeButton').style.display = 'inline';
  } else {
    get('autoButton').style.display = 'none';
    get('challengeButton').style.display = 'none';
  }
  if (game.infUpgradeHave[26] == 1) {
    get('dynamicFactorButton').style.display = 'inline';
  } else {
    get('dynamicFactorButton').style.display = 'none';
  }
}
function passiveIncrementer() {
  if (game.infUpgradeHave[5] == 1) {
    game.autoIncrHave[0] = EN.add(game.autoIncrHave[0], 10);
  }
  if (game.infUpgradeHave[6] == 1) {
    game.autoIncrHave[1] = EN.add(game.autoIncrHave[1], 9);
  }
  if (game.infUpgradeHave[7] == 1) {
    game.autoIncrHave[2] = EN.add(game.autoIncrHave[2], 8);
  }
  if (game.infUpgradeHave[8] == 1) {
    game.autoIncrHave[3] = EN.add(game.autoIncrHave[3], 7);
  }
  if (game.infUpgradeHave[9] == 1) {
    game.autoIncrHave[4] = EN.add(game.autoIncrHave[4], 6);
  }
  if (game.infUpgradeHave[10] == 1) {
    game.autoIncrHave[5] = EN.add(game.autoIncrHave[5], 5);
  }
  if (game.infUpgradeHave[11] == 1) {
    game.autoIncrHave[6] = EN.add(game.autoIncrHave[6], 4);
  }
  if (game.infUpgradeHave[12] == 1) {
    game.autoIncrHave[7] = EN.add(game.autoIncrHave[7], 3);
  }
  if (game.infUpgradeHave[13] == 1) {
    game.autoIncrHave[8] = EN.add(game.autoIncrHave[8], 2);
  }
  if (game.infUpgradeHave[14] == 1) {
    game.autoIncrHave[9] = EN.add(game.autoIncrHave[9], 1);
  }
}

function autobuyerLoop(t) {
  var autoBulk = 0;
  var chkbox = document.getElementsByName('autoCheck');
  for (var i = 0; i < 5; i++) {
    if (game.autobuyerHave[i] == 1 && chkbox[i].checked) {
      var thisAutoTick = autobuyerBaseTicks[i]*0.4**game.autobuyerBought[i];
      if (thisAutoTick < autobuyerTicks[i]) {
        autobuyerTicks[i] = thisAutoTick;
      }
      autobuyerTicks[i] -= t/1000;
      if (autobuyerTicks[i] < 0) {
        autoBulk = Math.floor(Math.abs(autobuyerTicks[i])/thisAutoTick)+1;
        switch (i) {
          case 0:
            buyBulkIncr(1, autoBulk);
            buyBulkIncr(0, autoBulk);
            break;
          case 1:
            buyBulkIncr(3, autoBulk);
            buyBulkIncr(2, autoBulk);
            break;
          case 2:
            buyBulkIncr(5, autoBulk);
            buyBulkIncr(4, autoBulk);
            break;
          case 3:
            buyBulkIncr(7, autoBulk);
            buyBulkIncr(6, autoBulk);
            break;
          case 4:
            if (game.markupChallengeEntered == 0) {
              buyBulkIncr(9, autoBulk);
              buyBulkIncr(8, autoBulk);
            }
            break;
        }
        autobuyerTicks[i] = thisAutoTick;
      }
    }
  }
}
function randerAutobuyer() {
  var chkbox = document.getElementsByName('autoCheck');
  for (var i = 0; i < 5; i++) {
    if (game.autobuyerHave[i] == 1) {
      get("auto" + i).style.display = 'block';
    } else {
      get("auto" + i).style.display = 'none';
    }
    get('auto' + i + 'buy').innerHTML = '60% smaller interval<br>' + beautify(EN.mul(1e7, EN.pow(10, game.autobuyerBought[i]))) + ' OP'
    var thisAutoTick = autobuyerBaseTicks[i]*0.4**game.autobuyerBought[i];
    var autoBulk = Math.floor(1/thisAutoTick)+1;
    if (autoBulk > 100) {
      get('auto' + i + 'inter').innerHTML = 'Current interval: ' + beautify(autoBulk) + '/s';
    } else {
      get('auto' + i + 'inter').innerHTML = 'Current interval: ' + thisAutoTick.toFixed(3) + ' seconds';
    }
    chkbox[i].checked = game.autobuyerOn[i];
  }
}
function buyAutobuyer(num) {
  if (EN.gte(game.OP, EN.mul(1e7, EN.pow(10, game.autobuyerBought[num])))) {
    game.OP = EN.sub(game.OP, EN.mul(1e7, EN.pow(10, game.autobuyerBought[num])));
    game.autobuyerBought[num]++;
    randerAutobuyer();
  }
}
function autoActive(num) {
  var chkbox = document.getElementsByName('autoCheck');
  game.autobuyerOn[num] = !game.autobuyerOn[num];
  randerAutobuyer();
}
function autobuyersToggle() {
  for (var i = 0; i < game.autobuyerOn.length; i++) {
    game.autobuyerOn[i] = game.autobuyersToggle;
  }
  game.autobuyersToggle = !game.autobuyersToggle;
  randerAutobuyer();
}

function markupChallengeCheck() {
  if (game.markupChallengeEntered >= 1) {
    blockedIncr = 2;
  } else {
    blockedIncr = 0;
  }
  if (game.markupChallengeEntered >= 10) {
    costScale = 2;
  } else {
    costScale = 1;
  }
}
function enterMarkupChallenge(num) {
  if (num != game.markupChallengeEntered) {
    game.markupChallengeEntered = num;
    if (EN.gt(calcTotalOPGain(), 1)) {
      game.OP = EN.add(game.OP, calcTotalOPGain());
    }
    game.ord = EN(0);
    game.over = 0;
    game.dynamic = EN(1);
    game.decrementy = 0;
    game.autoLoop.succ = 0;
    game.autoLoop.lim = 0;
    game.manualClicksLeft = 1000;
    game.markCount++;
    game.infTime = 0;
    for (var i = 0; i < 10; i++) {
      game.autoIncrHave[i] = EN(0);
      game.autoIncrBought[i] = EN(0);
      game.autoIncrCost[i] = autoIncrCostBase[i];
    }
    if (game.markupChallengeEntered >= 3) {
      game.c3Effect = 1;
    }
    if (game.markupChallengeEntered >= 5) {
      game.c5Effect = 0;
    }
    if (game.markupChallengeEntered >= 6) {
      game.decrementy = EN(0);
    }
    if (game.markupChallengeEntered >= 7) {
      game.c7Effect = 1;
    }
    if (game.markupChallenge[5] == 1) {
      game.autoIncrHave[1] = EN(1);
    }
  }
  if (num == 0) {
    passiveIncrementer();
  }
  setAllIncrCost();
  challengeEffects();
  markupChallengeCheck();
  randerAutoIncr();
  renderMarkupChallenge();
}
function renderMarkupChallenge() {
  for (var i = 0; i < 11; i++) {
    if (game.markupChallenge[i] == 1) {
      get('markChallenge' + (i+1)).classList.add('bought');
    }
  }
  for (var i = 1; i < 11; i++) {
    get('markChallenge' + i).classList.remove('running');
  }
  if (game.markupChallengeEntered != 0) {
    get('markChallenge' + game.markupChallengeEntered).classList.add('running');
  }
  if (game.markupChallengeEntered >= 1) {
    get('infinityButton').style.display = 'none';
    get('infinityButton2').style.display = 'none';
  } else {
    get('infinityButton').style.display = 'inline';
    get('infinityButton2').style.display = 'inline';
  }
  if (game.markupChallengeEntered >= 1) {
    get('compeleteChallenge').style.display = 'inline';
  } else {
    get('compeleteChallenge').style.display = 'none';
  }
  if (game.markupChallengeEntered >= 6) {
    get('decrementyText').style.display = 'block';
  } else {
    get('decrementyText').style.display = 'none';
  }
}
function compeleteChallenge() {
  if (EN.gte(game.ord, EN.pow(game.base, EN.pow(game.base, 2)))) {
    game.markupChallenge[game.markupChallengeEntered-1] = 1;
    enterMarkupChallenge(0);
    challengeReward();
    randerEtc();
  }
}
function challengeReward() {
  if (game.markupChallenge[0] == 1) {
    game.autobuyerHave[0] = 1;
  }
  if (game.markupChallenge[1] == 1) {
    game.autobuyerHave[1] = 1;
  }
  if (game.markupChallenge[2] == 1) {
    game.autobuyerHave[2] = 1;
  }
  if (game.markupChallenge[3] == 1) {
    game.autobuyerHave[3] = 1;
  }
  if (game.markupChallenge[4] == 1) {
    game.autobuyerHave[4] = 1;
  }
}
function challengeEffects() {
  if (game.markupChallengeEntered >= 3) {
    get('challInfo').style.display = 'block';
    if (game.markupChallengeEntered >= 5) {
      if (game.markupChallengeEntered >= 7) {
        get('challInfo').innerHTML = 'C3 effect -> ' + game.c3Effect.toFixed(2) + 'x to all Incrementers<br>C5 effect -> ' + game.c5Effect.toFixed(2) + 'x to all Incrementers<br>C7 effect -> ' + game.c7Effect.toFixed(2) + 'x to all Incrementers';
      } else {
        get('challInfo').innerHTML = 'C3 effect -> ' + game.c3Effect.toFixed(2) + 'x to all Incrementers<br>C5 effect -> ' + game.c5Effect.toFixed(2) + 'x to all Incrementers';
      }
    } else {
      get('challInfo').innerHTML = 'C3 effect -> ' + game.c3Effect.toFixed(2) + 'x to all Incrementers';
    }
  } else {
    get('challInfo').style.display = 'none';
  }
}

function buyDynamicUp(num) {
  if (num == 0) {
    var costThis = EN.mul(1e11, EN.pow(10, EN.pow(game.dynamicLevel, 1.8)));
    if (EN.gte(game.OP, costThis)) {
      game.OP = EN.sub(game.OP, costThis);
      game.dynamicLevel = EN.add(game.dynamicLevel, 1);
    }
  } else if (num == 1) {
    var costThis = EN.mul(1e12, EN.pow(10, EN.pow(game.dynamicLevel2, 2.2)));
    if (EN.gte(game.OP, costThis)) {
      game.OP = EN.sub(game.OP, costThis);
      game.dynamicLevel2 = EN.add(game.dynamicLevel2, 1);
    }
  }
}
function calcDynamicMult() {
  var tempMult = EN(1);
  if (game.markupChallenge[6] == 1) tempMult = EN.mul(tempMult, 5);
  if (game.markupChallenge[7] == 1) tempMult = EN.mul(tempMult, 3);
  if (game.markupChallenge[8] == 1) tempMult = EN.mul(tempMult, 8);
  return tempMult;
}

function calcBase() {
  var b = 10;
  if (game.markupChallenge[5] == 1) b--;
  if (game.markupChallenge[7] == 1) b--;
  if (game.markupChallenge[9] == 1) b--;
  if (game.markupChallengeEntered >= 8) b += 2;
  return b;
}
function calcMultPerBuy() {
  multPerBuy = 2;
  if (game.markupChallenge[9] == 1) multPerBuy *= 1.5;
}

function increment(manmade=0) {
  if (manmade==0 || game.manualClicksLeft >= 0.5 || game.chal8 == 0) {
    if (manmade==1 && game.chal8 == 1) game.manualClicksLeft -= 1
    if (EN.eq(EN.mod(game.ord, game.base), game.base-1)) {
      game.over += 1
    } else {
      game.ord = EN.add(game.ord, 1);
    }
    clickCoolDown=2
  }
  if (manmade==1) render()
}

function maximize(manmade=0) {
  if (EN.eq(EN.mod(game.ord, game.base), game.base-1) && game.over >= 1) {
    game.ord = EN.sub(game.ord,game.base-1)
    game.over += game.base-1
    do {
      game.over -= Math.ceil((game.over+game.base)/2-0.1)
      game.ord = EN.add(game.ord,game.base)
    } while (game.over+game.base >= game.base*2 && !(EN.eq(EN.mod(game.ord, (game.base**2)), 0)))
    if (!(EN.eq(EN.mod(game.ord, (game.base**2)), 0))) {
      game.ord = EN.add(game.over,game.ord)
    }
    game.over = 0
  }
    clickCoolDown=2
  if (manmade==1) render()
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  maximize(1e300);
  clickCoolDown--;
}, game.msint);

function loop(unadjusted, off = 0) {
  let ms=unadjusted
  markupChallengeCheck();
  autobuyerLoop(ms);
  if (game.markupChallengeEntered >= 3) {
    game.c3Effect += ms/60000;
    if (game.c3Effect > 1) {
      game.c3Effect = 1;
    }
  }
  if (game.markupChallengeEntered >= 5) {
    game.c5Effect -= ms/120000;
    if (game.c5Effect < 0) {
      game.c5Effect = 0;
    }
  }
  if (game.markupChallengeEntered >= 6) {
    if (game.markupChallengeEntered >= 9) {
      game.decrementy = EN.add(game.decrementy, EN.div(EN.logBase(EN.add(game.ord, 1), 10), 1400));
    } else {
      game.decrementy = EN.add(game.decrementy, EN.div(EN.logBase(EN.add(game.ord, 1), 10), 333));
    }
    get('decrementyText').innerHTML = 'There is ' + Number(beautifyEN(EN.mul(game.decrementy, 100)))/100 + ' decrementy';
  }
  if (game.markupChallengeEntered >= 7) {
    game.c7Effect -= ms/360000;
    if (game.c7Effect < 0) {
      game.c7Effect = 0;
    }
  }
  game.dynamic = EN.add(game.dynamic, EN.mul(EN.div(EN.pow(game.dynamicLevel, 2), 100), EN.mul(calcDynamicMult(), ms/1000)));
  if (EN.gt(game.dynamic, EN.mul(EN.pow(4, (EN.add(game.dynamicLevel2, 1))), calcDynamicMult()))) {
    game.dynamic = EN.mul(EN.pow(4, (EN.add(game.dynamicLevel2, 1))), calcDynamicMult());
  }
  calcMultPerBuy();
  for (var i = 9; i > -1; i--) {
    multiThis = EN(1);
    if ((i == 0 || i == 9) && game.infUpgradeHave[0] == 1) {
      multiThis = EN.mul(multiThis, 3);
    } else if ((i == 1 || i == 8) && game.infUpgradeHave[1] == 1) {
      multiThis = EN.mul(multiThis, 3);
    } else if ((i == 2 || i == 7) && game.infUpgradeHave[2] == 1) {
      multiThis = EN.mul(multiThis, 3);
    } else if ((i == 3 || i == 6) && game.infUpgradeHave[3] == 1) {
      multiThis = EN.mul(multiThis, 3);
    } else if ((i == 4 || i == 5) && game.infUpgradeHave[4] == 1) {
      multiThis = EN.mul(multiThis, 3);
    }
    if (i == 0 && game.infUpgradeHave[15] == 1) {
      multiThis = EN.mul(multiThis, Math.sqrt(game.infTime/30)*10+1);
    }
    if (i == 1 && game.infUpgradeHave[16] == 1) {
      multiThis = EN.mul(multiThis, Math.sqrt(Math.sqrt(game.markCount))*8+1);
    }
    if (i == 2 && game.infUpgradeHave[17] == 1) {
      multiThis = EN.mul(multiThis, EN.max(EN.add(EN.pow(EN.logBase((EN.add(game.ord, 1)), 100), 0.75), 1), 1));
    }
    if (i == 3 && game.infUpgradeHave[18] == 1) {
      multiThis = EN.mul(multiThis, EN.add(EN.pow(game.autoIncrHave[9], 0.75), 1));
    }
    if (i == 4 && game.infUpgradeHave[19] == 1) {
      multiThis = EN.mul(multiThis, EN.add(EN.pow(EN.logBase((EN.add(game.OP, 1)), 1000), 0.75), 1));
    }
    if (i == 5 && game.infUpgradeHave[20] == 1) {
      var tempVar = 0;
      for (var j = 0; j < game.markupChallenge.length; j++) {
        tempVar += game.markupChallenge[j];
      }
      multiThis = EN.mul(multiThis, EN.add(EN.pow(tempVar, 2), 1));
    }
    if (i == 6 && game.infUpgradeHave[21] == 1) {
      var tempVar = 0;
      for (var j = 0; j < game.autobuyerBought.length; j++) {
        tempVar += game.autobuyerBought[j];
      }
      multiThis = EN.mul(multiThis, EN.add(tempVar, 1));
    }
    if (i == 7 && game.infUpgradeHave[22] == 1) {
      multiThis = EN.mul(multiThis, EN.pow(EN.add(game.dynamic, 1), 3));
    }
    if (i == 8 && game.infUpgradeHave[23] == 1) {
      var tempVar = EN.add(game.dynamicLevel, game.dynamicLevel2);
      multiThis = EN.mul(multiThis, EN.pow(EN.add(tempVar, 1), 6));
    }
    if (i == 9 && game.infUpgradeHave[24] == 1) {
      multiThis = EN.mul(multiThis, EN.mul(EN.pow(EN.pow(4, (EN.add(game.dynamicLevel2, 1))), 3), calcDynamicMult()));
    }
    if (game.markupChallenge[0] == 1 && (0 <= i && i <= 4)) {
      multiThis = EN.mul(multiThis, 4);
    }
    if (game.markupChallenge[1] == 1 && (5 <= i && i <= 9)) {
      multiThis = EN.mul(multiThis, 4);
    }
    if (game.markupChallenge[4] == 1) {
      multiThis = EN.mul(multiThis, 3);
    }
    if (game.markupChallenge[8] == 1) {
      multiThis = EN.mul(multiThis, EN.logBase(game.OP, 10));
    }
    if (game.markupChallengeEntered >= 2 && i == 0) {
      multiThis = EN.mul(multiThis, 1/1000);
    }
    if (game.markupChallengeEntered >= 3) {
      multiThis = EN.mul(multiThis, game.c3Effect);
    }
    if (game.markupChallengeEntered >= 5) {
      multiThis = EN.mul(multiThis, game.c5Effect);
    }
    if (game.markupChallengeEntered >= 6) {
      multiThis = EN.div(multiThis, (game.decrementy+1));
    }
    if (game.markupChallengeEntered >= 7) {
      multiThis = EN.mul(multiThis, game.c7Effect);
    }
    multiThis = EN.mul(multiThis, game.dynamic);
    multiThis = EN.mul(multiThis, game.tickHave[0]);
    if (i != 0) {
      game.autoIncrHave[i-1] = EN(EN.add(game.autoIncrHave[i-1], EN.mul(game.autoIncrHave[i], EN.mul(ms/1000*2, EN.mul(multiThis, EN.pow(multPerBuy, game.autoIncrBought[i]))))));
    } else {
      game.ord = EN(EN.add(game.ord, EN.mul(game.autoIncrHave[i], EN.mul(ms/1000*2, EN.mul(multiThis, EN.pow(multPerBuy, game.autoIncrBought[i]))))));
    }
    get("autoHave" + i).innerHTML = beautify(game.autoIncrHave[i]) + '(x' + beautify(EN.mul(multiThis, EN.pow(multPerBuy, game.autoIncrBought[i])).div(game.tickHave[0])) + ')';
  }
  if (EN.gt(0, game.ord)) {
    game.ord = EN(10);
  }
  game.infTime += ms/1000;
  if (game.incrementy.lt(0)) game.incrementy = EN(0);
  if (game.collapseUnlock === 0) game.leastBoost = Infinity;
  if (isNaN(game.leastBoost)) game.leastBoost = Infinity;
  if (game.leastBoost === null) game.leastBoost = Infinity;
  if (game.leastBoost === "null") game.leastBoost = Infinity;
  if (typeof game.leastBoost === "undefined") game.leastBoost = Infinity;
  game.collapseTime += ms / 1000;
  game.base = calcBase();
  game.lastTick = Date.now();
  game.qolSM.nc8 = get("nonC8Auto").value;
  game.qolSM.c8 = get("C8Auto").value;
  game.qolSM.ttnc = get("ttnc").value;
  if (getBaseless()>=0.5) {
    RPloop += ms
    if (RPloop >= 1000) {
      game.refundPoints += Math.floor(RPloop/1000)
      RPloop = RPloop % 1000
    }
  }
  if (game.chal8 === 1 && calcRefund() > 0)
    confirm("You failed Challenge 8 because you had booster upgrades on you!");
  if (game.chal8 === 1 && calcRefund() > 0) refund();
  game.boosters =
    ((game.factorBoosts * (game.factorBoosts + 1)) / 2 + calcSlugMile() + getBaseless()) -
    calcRefund();
  game.boosters=Math.round(game.boosters)
  if (game.boosters < -0.5) refund()
  /* if (game.leastBoost <= 1e10 && game.OP < calcTotalOPGain()) {
    game.OP +=
      calcTotalOPGain() >= 1e270 ? Infinity : (calcTotalOPGain() / 100000) * ms;
    if (game.OP > calcTotalOPGain()) game.OP = calcTotalOPGain();
  } */
  if (getSingLevel()>=game.mostSing) {
    game.mostSing=getSingLevel()
  }
  if (1+game.sing.dm+game.sing.nw+game.manifolds<game.mostSing) {
    game.mostSing=game.sing.dm+game.sing.nw+game.manifolds+1
  }
  let assCount;
  for (assCount in game.assCard) {
    if (game.assCard[assCount].power.lt(1200)&&game.collapseUnlock==1) {
      game.assCard[assCount].power = game.assCard[assCount].power.add(ms/3000)
      if (game.assCard[assCount].power.gte(1200)) game.assCard[assCount].power=EN(1200)
    }
    game.assCard[assCount].power = game.assCard[assCount].power.add(
      game.assCard[assCount].points
        .pow(
          game.assCard[assCount].points
            .log10()
            .pow(0.5)
            .max(2)
        )
        .times(0.001 * ms)
    );
    game.assCard[assCount].mult = game.assCard[assCount].power
      .add(10)
      .log10()
      .times(game.aups.includes(7) && assCount == 1? game.alephOmega.add(1).pow(1 / 32): 1)
      .times(game.sfBought.includes(71) && assCount == 2?1+(getSingLevel()+game.manifolds-game.sing.m-game.spentFunctions)*0.4:1)
      .times(game.sfBought.includes(52)?1.5:1);
  }
  if (game.upgrades.includes(8)) {
    game.incrementy = game.incrementy.add(getIncrementyRate(ms / 2));
  }
  if (game.chal8 === 1) game.decrementy += getDecrementyRate(ms);
  if (game.boostUnlock == 1 && game.limAuto === 0) game.limAuto = 1;
  buptotalMute =
    bfactorMult *
    calcBupTotalMultWOFactor() *
    calcIncrementyMult() *
    (game.aups.includes(4) ? Math.log10(Math.log10(1e10 + game.OP)) : 1);
  succAutoMult = game.aups.includes(2)
    ? Math.max(Math.sqrt(game.limAuto), 1)
    : 1;
  limAutoMult = game.aups.includes(2)
    ? Math.max(Math.sqrt(game.succAuto), 1)
    : 1;
  const chal8Tip = calcOrdPoints() >= 1e30*1e10**(game.base==5&&game.sfBought.includes(61));
  const tempSucc = game.succAuto * succAutoMult * totalMult;
  const tempLim = game.limAuto * limAutoMult * totalMult;
  if (game.iups[3] === 1) buptotalMute += 100000000;
  if (
    (game.succAuto < 1e265 || game.limAuto < 1e265) &&
    !(EN.gt(game.ord, 3 ** 27) && game.base <= 3)
  ) {
    if (game.succAuto * totalMult > 0) {
      game.autoLoop.succ += ms;
      if (game.autoLoop.succ >= 1000 / tempSucc) {
        game.autoLoop.succ -= 1000 / tempSucc;
        increment();
      }
    }
    if (tempLim > 0) {
      game.autoLoop.lim += ms;
      if (game.autoLoop.lim >= 1000 / tempLim) {
        game.autoLoop.lim -= 1000 / tempLim;
        maximize();
      }
    }

    if (game.autoLoop.succ >= 1000 / tempSucc) {
      if (game.autoLoop.lim >= 1000 / tempLim) {
        game.over = 0;
        game.ord += Math.min(
          Math.floor(game.autoLoop.succ / (1000 / tempSucc)),
          game.base *
            Math.floor(
              game.autoLoop.lim /
                (1000 / (game.limAuto * limAutoMult * totalMult))
            )
        );
        game.autoLoop.succ %= 1000 / tempSucc;
        game.autoLoop.lim %= 1000 / tempLim;
      } else if (
        Math.floor(game.autoLoop.succ / (1000 / tempSucc)) >=
        game.base - (game.ord % game.base)
      ) {
        game.ord += game.base - (game.ord % game.base) - 1;
        game.over +=
          Math.floor(game.autoLoop.succ / (1000 / tempSucc)) -
          (game.base - (game.ord % game.base) - 1);
        game.autoLoop.succ %= 1000 / tempSucc;
      } else {
        game.ord += Math.floor(game.autoLoop.succ / (1000 / tempSucc));
        game.autoLoop.succ %= 1000 / tempSucc;
      }
    }
  } else {
    game.over = 0;
    // game.ord = EN(Math.max(Math.min(game.succAuto, game.limAuto), 4e270));
  }
  if (!chal8Tip && game.chal8 === 1 && calcOrdPoints() >= 1e30*1e10**(game.base==5&&game.sfBought.includes(61)))
    // game.ord = EN(game.base**(game.base * 3+(game.base==5&&game.sfBought.includes(61)?game.base:0)));
  changeDynamic(ms);
  if (game.upgrades.includes(8)) {
    game.incrementy = game.incrementy.add(getIncrementyRate(ms / 2));
    if (
      getIncrementyRate(1000).gte(game.maxIncrementyRate) &&
      game.challenge % 2 === 0
    )
      game.maxIncrementyRate = getIncrementyRate(1000);
  }
  game.cAutoLoop.shift +=
    game.leastBoost <= 12 && game.cAutoOn.shift === 1
      ? (ms / 1000) * game.shiftAuto.toNumber()
      : 0;
  if (game.cAutoLoop.shift >= 1) {
    game.cAutoLoop.shift %= 1;
  }
  game.cAutoLoop.boost +=
    game.leastBoost <= 12 && game.cAutoOn.boost === 1
      ? (ms / 1000) * game.boostAuto.toNumber()
      : 0;
  if (game.cAutoLoop.boost >= 1) {
    if (
      game.OP >= BHO &&
      game.challenge === 0 &&
      !(
        game.factorBoosts <=
        slugMile[
          slugMile.findIndex(mile => mile < game.leastBoost)
        ]
      )
    )
      factorBoost();
    game.cAutoLoop.boost %= 1;
  }
  if (game.aups.includes(8))
    cardinalLoop = cardinalLoop.add(game.mostCardOnce.times(ms / 33333));
  if (cardinalLoop.gte(1)) {
    game.cardinals = game.cardinals.add(cardinalLoop.floor());
    cardinalLoop = cardinalLoop.mod(1);
  }
  if (
    game.challenge === 0 &&
    game.chal8 === 0 &&
    !game.upgrades.includes(10) &&
    game.cAutoOn.shift === 1 &&
    game.cAutoOn.boost === 1 &&
    game.leastBoost <= 12 &&
    (1/getFBps())*getFBmult() <= ms * 0.022
  ) {
    factorBoostLoop +=
      ((1 / calcFactorBoostTime() - 1 / (ms * 0.022)) * ms) / 1000;
    game.factorBoosts += Math.floor(factorBoostLoop);
    factorBoostLoop %= 1;
  }
  if (
    game.qolSM.ca === 1 &&
    game.collapseTime >= game.qolSM.ttnc &&
    game.reachedBHO === 1 &&
    off === 0
  )
    collapse();
  const themeSave = `<link rel="stylesheet" href="${["style/light", "style/dark", "style/space"][game.theme]}.css">`;
  if (get("theme").innerHTML !== themeSave) get("theme").innerHTML = themeSave;
  if (game.OP >= V(27) || game.ord >= V(27) || game.factorBoosts >= 25)
    game.reachedBHO = 1;
  if (ms > 0) render();
  if (game.factorBoosts < 0) game.factorBoosts = 0;
}

function render() {
  let outSize = game.ord.lt(EN.pow(10, 10)) ? (fghexp((EN.mod(game.ord, (game.base**3)).toNumber()+0.1)/(game.base**2),Math.pow(2,Math.floor((EN.mod(game.ord, (game.base**2)).toNumber()+0.1)/game.base))*(game.base+game.over+EN.mod(game.ord, game.base).toNumber()))) : Infinity;
  ordColor = "no";
  const ordSub = displayOrd(game.ord,game.base,game.over,0,0,0,game.colors);
  document.getElementById("hardy").innerHTML=colorWrap("H",ordColor)+"<sub>" + ordSub + "</sub><text class=\"invisible\">l</text>"+colorWrap("(" + game.base + ")" + (game.ord >= (game.base**3) || outSize >= 10**264 || (game.ord>=5 && game.base==2) ? "" : "=" + beautify(outSize)),ordColor)
  game.canInf = EN.gte(game.ord, EN.pow(game.base, EN.pow(game.base, 2)));
  get('manifoldIncrease').innerHTML = 'It is increasing by ' + Number(beautify(EN.mul(EN.div(EN.pow(game.dynamicLevel, 2), 100), EN.mul(calcDynamicMult(), 100)))/100) + ' per second and caps at ' + EN.mul(EN.pow(4, EN.add(game.dynamicLevel2, 1)), calcDynamicMult());
  get('dynamicCost0').innerHTML = beautify(EN.mul(1e11, EN.pow(10, EN.pow(game.dynamicLevel, 1.8))));
  get('dynamicCost1').innerHTML = beautify(EN.mul(1e12, EN.pow(10, EN.pow(game.dynamicLevel2, 2.2))));
  challengeEffects();
  let infUpEff = [];
  infUpEff.push(Math.sqrt(game.infTime/30)*10+1);
  infUpEff.push(Math.sqrt(Math.sqrt(game.markCount))*8+1);
  infUpEff.push(EN.max(EN.add(EN.pow(EN.logBase((EN.add(game.ord, 1)), 100), 0.75), 1), 1));
  infUpEff.push(EN.add(EN.pow(game.autoIncrHave[9], 0.75), 1));
  infUpEff.push(EN.add(EN.pow(EN.logBase((EN.add(game.OP, 1)), 1000), 0.75), 1));
  var tempVar = 0;
  for (var j = 0; j < game.markupChallenge.length; j++) {
    tempVar += game.markupChallenge[j];
  }
  infUpEff.push(EN.add(EN.pow(tempVar, 2), 1));
  var tempVar = 0;
  for (var j = 0; j < game.autobuyerBought.length; j++) {
    tempVar += game.autobuyerBought[j];
  }
  infUpEff.push(EN.add(tempVar, 1));
  infUpEff.push(EN.pow(EN.add(game.dynamic, 1), 3));
  var tempVar = EN.add(game.dynamicLevel, game.dynamicLevel2);
  infUpEff.push(EN.pow(EN.add(tempVar, 1), 6));
  infUpEff.push(EN.mul(EN.pow(EN.pow(4, (EN.add(game.dynamicLevel2, 1))), 3), calcDynamicMult()));
  for (var i = 0; i < 10; i++) {
    get('infupgrNum' + i).innerHTML = beautifyEN(EN.mul(infUpEff[i], 100)/100);
  }
  if (game.infUnlock === 1) {
    get("infinityTabButton").style.display = "inline-block";
  } else {
    get("infinityTabButton").style.display = "none";
  }
  if (game.boostUnlock === 1) {
    get("boosterTabButton").style.display = "inline-block";
    if (game.challenge === 0 && game.chal8 === 0) {
    } else {
      get("finishChallenge").innerHTML =
        `Complete the challenge!<br>${beautify(
          game.chal8 === 1
            ? getChal8Goal(game.chal8Comp)
            : challengeGoals[game.challenge - 1][
                game.challengeCompletion[game.challenge - 1]
              ]
        )} OP`;
    }
  } else {
    get("boosterTabButton").style.display = "none";
  }
  if (getFBps() < 10 && game.canInf) {
    infinityButtonText = beautify(calcTotalOPGain());
    if (
      get("infinityButton").innerHTML !==
      `Markup to gain ${infinityButtonText} Ordinal Points (I)`
    )
      get("infinityButton").innerHTML =
        `Markup to gain ${infinityButtonText} Ordinal Points (I)`;
    if (get("infinityButton2").innerHTML !== `+${infinityButtonText}`)
      get("infinityButton2").innerHTML = `+${infinityButtonText}`;
  } else {
    get("infinityButton").innerHTML =
      `Reach ${(game.leastBoost <= 15 ? (game.leastBoost <= 1.5 ? 10 : 100) : 'ω<sup>ω<sup>2</sup></sup>')} to Markup`;
    get("infinityButton2").innerHTML =
      `Reach ${(game.leastBoost <= 15 ? (game.leastBoost <= 1.5 ? 10 : 100) : 'ω<sup>ω<sup>2</sup></sup>')} to Markup`;
  }
  get("challengeSubTab").style.display = game.upgrades.includes(4)
    ? "inline-block"
    : "none";
  get("chalFactorWhole").style.display=(game.boostUnlock==1||game.factorShifts==7) ? "inline" : "none"
  get("challengeFactor").textContent = `Your Quadrupler is x${getChalFact().toFixed(3)}`
  get("incrementySubTab").style.display = game.upgrades.includes(8)
    ? "inline-block"
    : "none";
  get("ordinalPointsDisplay").innerHTML =
    `You have ${beautifyEN(game.OP)} Ordinal Points`;
  factorMult = 1;
  get("boostersText").textContent = "You have " + beautify(game.boosters) + " boosters";
  get("refundBoosters").textContent =
    "Refund back " +
    beautify(calcRefund()) +
    " boosters, but reset all factor shifts (R)";
  get("dynamicMult").textContent = "Your Dynamic Factor is x" + beautify(game.dynamic);
  get("infinityAuto").innerHTML =
    "Your Markup Autobuyer is clicking the Markup button " +
    (game.upgrades.includes(3) && game.autoOn.inf == 1
      ? beautify(buptotalMute)
      : 0) +
    " times per second, but only if you're past " +
    displayOrd(10 ** 270 * 4) +
    (game.leastBoost <= 1.5
      ? ". It also activates if your Tier 1 automation isn't autoclicking at least once a second"
      : "");
  get("autoMaxButton").textContent =
    "Max All Autobuyer: " +
    (game.upgrades.includes(2) || game.leastBoost <= 1.5
      ? game.autoOn.max == 1
        ? "ON"
        : "OFF"
      : "LOCKED");
  get("autoInfButton").textContent =
    "Markup Autobuyer: " +
    (game.upgrades.includes(3)
      ? game.autoOn.inf == 1
        ? "ON"
        : "OFF"
      : "LOCKED");
  get("bup6 current").textContent = (getBoostFromBoosters(1) < 1000000 ? getBoostFromBoosters(1).toFixed(2) : beautify(getBoostFromBoosters(1)))
  get("runChal").textContent =
    game.chal8 == 1
      ? "You're currently running Challenge 8"
      : game.challenge == 0
      ? "You're currently not in a challenge"
      : "You're currently running Challenge " + game.challenge;
  get("incrementyText").textContent =
    "You have " +
    beautify(game.incrementy) +
    " incrementy, multiplying " +
    "Tier 2 Automation by " +
    calcIncrementyMult().toFixed(3) +
    "x";
  get("incrementyText2").textContent =
    "You are getting " +
    beautify(getIncrementyRate(1000)) +
    " incrementy per second";
  get("iup1").innerHTML =
    "Base Incrementy multiplier is raised to the 1.05<br>Cost: " +
    beautify(10 ** (5 * (game.iups[0] + 1)));
  get("iup2").innerHTML =
    "Double the production of incrementy<br><br>Cost: " +
    beautify(10 ** (3 * (game.iups[1] + 1)));
  get("iup3").innerHTML =
    "Multiply Incrementy multiplier by 1.2<br><br>Cost: " +
    beautify(10 ** (9 * (game.iups[2] + 1)));
  get("manifoldShift").style.display = game.upgrades.includes(12)
    ? "inline-block"
    : "none";
  get("manifoldAmount").textContent =
    beautify(game.manifolds) +
    (game.sing.m > 0.5
      ? "-" + game.sing.m
      : game.sing.m == 0
      ? ""
      : "+" + (0 - game.sing.m));
  get("manifoldBoost").textContent = getManifoldEffect().toFixed(3);
  get("changeOrdNotation").textContent =
    "Current Ordinal Notation: " +
    ["Madore's", "Buchholz's", "Convenient"][game.buchholz];
  get("changeTheme").textContent =
    "Current Theme: " +
    ["Light", "Dark", "Space (https://wallpaperplay.com/page-terms)"][
      game.theme
    ];
  get("changeInt").textContent = "Millisecond Interval: " + game.msint + "ms";
  get("changeOrdLengthLess").innerHTML =
    "Maximum Ordinal Length: " +
    game.maxOrdLength.less;
  get("changeOrdLengthMore").innerHTML =
    "Maximum Ordinal Length above " +
    displayOrd(10 ** 270 * 4) +
    ": " +
    game.maxOrdLength.more;
  get("getManifolds").innerHTML =
    "Reset incrementy for a manifold.<br>Need: " +
    ((game.iups[5] == 1 ? 2 : 3) ** (game.manifolds + 1)).toFixed(2) +
    "x<br>incrementy multiplier";
  let bfactor;
  bfactorMult = 1;
  for (let i = 0; i < 7; i++) {
    bfactor =
      ((1 +
        (game.factors.length >= i + 1
          ? game.factors[i] + (game.upgrades.includes(11) ? 3 : 0)
          : 0)) *
        (game.upgrades.includes(1) && game.factors.length >= i + 1 ? 2 : 1)) **
      (game.leastBoost <= 20 && game.challengeCompletion[i] == 0
        ? 0.25
        : challengeCurve[game.challengeCompletion[i]]);
    if (
      ((game.challenge == 2 || game.challenge == 7) && i == 0) ||
      game.chal8 == 1
    )
      bfactor = 1;
    bfactorMult *= bfactor;
    get("challenge" + (i + 1) + "Effect").textContent =
      "x" + bfactor.toFixed(2) + " (" + game.challengeCompletion[i] + "/3)";
    get("challenge" + (i + 1) + "Goal").innerHTML =
      "Goal: " +
      beautify(challengeGoals[i][Math.min(game.challengeCompletion[i], 2)]) +
      " OP";
    chalbut(i);
  }
  bfactor = getDynamicFactorCap() ** getChalCurve(game.chal8Comp);
  if (game.chal8 == 1) bfactor = 1;
  bfactorMult *= bfactor;
  get("challenge8Effect").textContent =
    "x" + bfactor.toFixed(2) + " (" + game.chal8Comp + "/∞)";
  get("challenge8Goal").textContent =
    "Goal: " + beautify(getChal8Goal(game.chal8Comp)) + " OP";
  chalbut(7);
  for (let i = 0; i < bupUpgradeCosts.length; i++) {
    bup(
      i + 1,
      game.leastBoost <= 1.5 &&
        game.qolSM.abu == 1 &&
        (game.qolSM.ig73 == 0 ||
          i + 1 != 10 ||
          game.challenge == 4 ||
          game.challenge == 6 ||
          game.challenge == 7) &&
        (game.qolSM.igc8 == 0 || game.chal8 == 0)
        ? 0
        : 1
    );
  }
  get("chalMult").textContent =
    "Your " +
    getSumOfChallenges() +
    " challenge completions have multiplied Tier 1 and 2 Automation by " +
    beautify(bfactorMult);
  for (let i = 1; i <= 9; i++) {
    iup(i, 1);
  }
  get("changeColor").textContent =
    "Colors: " + (game.colors === 1 ? "ON" : "OFF");
  get("changeMusic").innerHTML = "Music: " + musicName[game.music];
  get("incrementyText3").innerHTML =
    "You start gaining incrementy when you reach " + displayOrd(4e270);
  get("collapseScreen").style.display =
    collapseAnimation === 0 ? "none" : "block";
  get("collapseScreen").style.opacity = collapseAnimation + "%";
  get("collapseTabButton").style.display =
    game.collapseUnlock === 0 ? "none" : "inline-block";
  get("cardinalText").textContent =
    "You have " + beautify(game.cardinals) + " Unassigned Cardinals";
  get("cardText1").innerHTML =
    "You have " + beautify(game.assCard[0].points) + " ℵ<sub>0</sub>";
  get("cardPow1").innerHTML =
    "You have " +
    beautify(game.assCard[0].power) +
    " ℵ<sub>0</sub> Power (+" +
    beautify(
      game.assCard[0].points.pow(
        game.assCard[0].points
          .log10()
          .pow(0.5)
          .max(2)
      )
    ) +
    "/s)";
  get("cardMult1").textContent = "x" + beautify(game.assCard[0].mult, 3);
  get("cardText2").innerHTML =
    "You have " + beautify(game.assCard[1].points) + " ℵ<sub>1</sub>";
  get("cardPow2").innerHTML =
    "You have " +
    beautify(game.assCard[1].power) +
    " ℵ<sub>1</sub> Power (+" +
    beautify(
      game.assCard[1].points.pow(
        game.assCard[1].points
          .log10()
          .pow(0.5)
          .max(2)
      )
    ) +
    "/s)";
  get("cardMult2").textContent = "x" + beautify(game.assCard[1].mult, 3);
  get("cardText3").innerHTML =
    "You have " + beautify(game.assCard[2].points) + " ℵ<sub>2</sub>";
  get("cardPow3").innerHTML =
    "You have " +
    beautify(game.assCard[2].power) +
    " ℵ<sub>2</sub> Power (+" +
    beautify(
      game.assCard[2].points.pow(
        game.assCard[2].points
          .log10()
          .pow(0.5)
          .max(2)
      )
    ) +
    "/s)";
  get("cardMult3").textContent = "x" + beautify(game.assCard[2].mult, 3);
  for (let i = 0; i < 6; i++) {
    get("slug" + i).classList.remove("slugMile");
    get("slug" + i).classList.add("notSlugMile");
  }
  for (let i = 0; i < calcSlugMile(); i++) {
    get("slug" + i).classList.add("slugMile");
    get("slug" + i).classList.remove("notSlugMile");
  }
  for (let i = 0; i < 5; i++) {
    get("base" + i).classList.remove("slugMile");
    get("base" + i).classList.add("notSlugMile");
  }
  for (let i = 0; i < getBaseless(); i++) {
    get("base" + i).classList.add("slugMile");
    get("base" + i).classList.remove("notSlugMile");
  }
  get("alephOmegaText").innerHTML =
    "You have " + beautify(game.alephOmega) + " ℵ<sub>ω</sub>";
  get("alephOmegaText2").innerHTML =
    "You have " + beautify(game.alephOmega) + " ℵ<sub>ω</sub>";
  for (let i = 1; i <= 12; i++) {
    aup(i, 1);
  }
  get("collapseButton").innerHTML =
    game.reachedBHO == 1
      ? "Collapse for " + beautify(EN(calcCard())) + " Cardinals (C)"
      : "Reach the BHO or 25 Factor Boosts to Collapse!<br>(OR restart the current Collapse)";
  get("decrementyRate").textContent =
    game.chal8 == 1 ? beautifypower(getDecrementyRate(1000)) : 1;
  dup(1, 1);
  dup(2, 1);
  dup(3, 1);
  get("dup1").innerHTML =
    "Reduce the potency of decrementy by 5%<br><br>Cost: " +
    beautifypower(dupCosts[0] ** (game.dups[0] + 1));
  get("dup2").innerHTML =
    "Halve decrementy growth below " + (game.buchholz==2?"ω^(ω3)":"ω<sup>ω3</sup>") + ", otherwise double it<br>Cost: " +
    beautifypower(dupCosts[1] ** (game.dups[1] + 1));
  get("dup3").innerHTML =
    "Gain a 1.2x multiplier to Tier 1 and 2<br><br>Cost: " +
    beautifypower(dupCosts[2] ** (game.dups[2] + 1));
  get("getDarkManifolds").innerHTML =
    "Get a Dark Manifold<br>Need: " +
    beautifypower(Math.log10(game.sfBought.includes(31)?2:3) * (1 + game.darkManifolds)) +
    " Decrementy";
  get("darkManifoldAmount").textContent =
    beautify(game.darkManifolds) + (game.sing.dm===0||(game.sfBought.includes(11))?"":"-" + beautify(getDMSacrafice()))
  get("darkUpButton").style.display = game.aups.includes(3) ? "inline" : "none";
  get("darkManifoldBoost").textContent = getDarkManifoldEffect().toFixed(3);
  get("darkManifoldMaxMode").textContent =
    "Max Mode: " + (game.darkManifoldMax === 1 ? "ON" : "OFF");
  get("autoPrestigeSubTab").style.display =
    game.leastBoost <= 12 ? "inline-block" : "none";
  get("factorShiftAutoToggle").textContent =
    "Factor Shift Autoprestiger: " + (game.cAutoOn.shift === 1 ? "ON" : "OFF");
  get("factorShiftAutoText").textContent =
    "Your Factor Shift Autoprestiger is Factor Shifting " +
    (game.cAutoOn.shift === 1 ? beautifyEN(game.shiftAuto) : 0) +
    " time(s) per second";
  get("factorBoostAutoToggle").textContent =
    "Factor Boost Autoprestiger: " + (game.cAutoOn.boost === 1 ? "ON" : "OFF");
  get("factorBoostAutoText").textContent =
    "Your Factor Boost Autoprestiger is Factor Boosting " +
    (game.cAutoOn.boost == 1 ? beautifyEN(game.boostAuto) : 0) +
    " time(s) per second, but only at the BHO or higher, and if you can't get a sluggish milestone";
  get("cardExtra1").classList.remove("invisible");
  if (!game.aups.includes(1000)) get("cardExtra1").classList.add("invisible");
  get("cardExtra2").classList.remove("invisible");
  if (!game.aups.includes(6)) get("cardExtra2").classList.add("invisible");
  get("cardExtra3").classList.remove("invisible");
  if (!game.aups.includes(5)) get("cardExtra3").classList.add("invisible");
  get("collapseCardHelp").innerHTML =
    (game.reachedBHO === 1
      ? "Next Cardinal in " +
        beautify(
          Math.max(Math.ceil(
            (calcCard().toNumber() + 1) **
              (1 / calcCardExponent(game.collapseTime)) +
              24 -
              game.factorBoosts
          ),1)
        ) +
        " Factor Boost(s) ("
      : "(") +
    game.collapseTime.toFixed(1) +
    "s in collapse)" + "<p>Most Cardinals collapsed at once: " + beautify(game.mostCardOnce) +
    (game.aups.includes(8)?", providing a constant " + beautify(game.mostCardOnce.times(0.03)) + " Cardinals per second":"") + "</p>";
  get("changeOffline").textContent =
    "Offline Progress: " + (game.offlineProg == 1 ? "ON" : "OFF");
  get("bup10").innerHTML =
    "The base is always five below " +
    displayOrd(4e270) +
    "<br><br>73 Boosters";
  get("aup4").innerHTML =
    "OP boosts Tier 1 and 2 by x" +
    Math.log10(Math.log10(1e10 + game.OP)).toFixed(3) +
    "<br><br>Cost: 8 ℵ<sub>ω</sub>";
  get("aup7").innerHTML =
    "ℵ<sub>ω</sub> boosts the ℵ<sub>1</sub> multiplier by<br>x" +
    game.alephOmega
      .add(1)
      .pow(1 / 32)
      .toNumber()
      .toFixed(2) +
    "<br>Cost: 65536 ℵ<sub>ω</sub>";
  get("chal8Incrementy").style.display =
    game.leastBoost <= 1.5 ? "inline" : "none";
  get("chal8IncrementyBoost").style.display =
    game.leastBoost <= 1.5 ? "inline" : "none";
  get("chal8IncrementyBoost").innerHTML =
    "<br>To Incrementy: x" +
    (getDynamicFactorCap() ** getChalIncrementyCurve(game.chal8Comp)).toFixed(
      2
    );
  get("refundConfirmation").textContent =
    "Refund Confirmation: " + (game.bConf.ref == 1 ? "ON" : "OFF");
  get("refundFB").textContent =
    "Factor Boost if possible on Refund: " +
    (game.bConf.refFB == 1 ? "ON" : "OFF");
  get("chalConf").textContent =
    "Challenge Confirmation: " + (game.bConf.chal == 1 ? "ON" : "OFF");
  get("chalFB").textContent =
    "Factor Boost if possible on entering a Challenge: " +
    (game.bConf.chalFB == 1 ? "ON" : "OFF");
  get("bottomBoosterUpgrades").style.display =
    game.leastBoost <= 1.5 ? "inline" : "none";
  get("bottomBoosterUpgrades2").style.display =
    game.leastBoost <= 1.5 ? "inline" : "none";
  get("distributeCard").style.display =
    game.leastBoost <= 10 ? "block" : "none";
  get("auprow2").style.display = game.aups.includes(4) ? "block" : "none";
  get("auprow3").style.display = game.aups.includes(8) ? "block" : "none";
  get("auprow4").style.display = game.aups.includes(12) ? "block" : "none";
  get("autoPrestigeBuy").style.display =
    game.leastBoost <= 10 ? "inline" : "none";
  get("autoBup").style.display = game.leastBoost <= 1.5 ? "block" : "none";
  get("abu").textContent =
    "Autobuy Booster Upgrades: " + (game.qolSM.abu == 1 ? "ON" : "OFF");
  get("ig73").textContent =
    "Ignore the 73 Booster Upgrade unless in challenge 4, 6, or 7: " +
    (game.qolSM.ig73 == 1 ? "ON" : "OFF");
  get("igc8").textContent =
    "Ignore in Challenge 8: " + (game.qolSM.igc8 == 1 ? "ON" : "OFF");
  get("acc").textContent =
    "Autocomplete Challenges: " + (game.qolSM.acc == 1 ? "ON" : "OFF");
  get("ca").textContent =
    "Collapse Autoprestiger: " + (game.qolSM.ca == 1 ? "ON" : "OFF");
  get("changeHotKeys").textContent =
    "Hotkeys: " + (game.hotkeysOn == 1 ? "ON" : "OFF");
  get("singularitySubTab").style.display = game.upgrades.includes(20)
    ? "inline"
    : "none";
  get("singularityFunction").style.display = game.upgrades.includes(20)
    ? "inline"
    : "none";
  get("singText").textContent = "Singularity Level: " + getSingLevel();
  get("singMaterial").innerHTML =
    "You have " +
    beautify(Math.max(0,game.darkManifolds - getDMSacrafice())) +
    " Dark Manifolds, " +
    (game.manifolds - game.sing.m) +
    " Manifolds, and " +
    beautifyEN(game.alephOmega) +
    " ℵ<sub>ω</sub>";
  get("singEffect").innerHTML =
    "Raising the Factor Boosts 25+ requirement to " +
    displayOrd(Math.ceil(BHO * getSingLevel())) +
    " and having them give out " +
    getFBmult()
 +
    " times the Factor Boosts" + (getSingLevel()==69?"<br><b>👀 OMG THAT'S THE NICE NUMBER!!! 👀</b>":"");
  get("blackHoleCircle").r.baseVal.value = 10 * Math.sqrt(getSingLevel());
  get("blackHoleCircle").cy.baseVal.value = 10 * Math.sqrt(getSingLevel()) + 10;
  get("blackHole").height.baseVal.value =
    (10 * Math.sqrt(getSingLevel()) + 10) * 2;
  get("sacrDM").innerHTML =
    "Upgrade with<br>" +
    beautify(1e6 * (game.sfBought.includes(23)?4:5) ** game.sing.dm) +
    "<br>Dark Manifolds";
  get("singFBtext").textContent =
    "You are currently getting " +
    commafy(getFBps()) +
    " Factor Boosts per second";
  get("sacrNw").innerHTML =
    "Upgrade with<br>" +
    beautifyEN(1e20 * (game.sfBought.includes(21)?30:100) ** game.sing.nw) +
    " ℵ<sub>ω</sub>";
  get("changeThicc").textContent="T H I C C Buttons: " + (game.thicc==1?"ON":"OFF")
  for (let i=0;i<3;i++) {
    document.getElementsByClassName("canThicc")[i].classList.remove("thicc")
    if (game.thicc==1) document.getElementsByClassName("canThicc")[i].classList.add("thicc")
  }
  get("collapseConf").textContent="Collapse Confirmation: " + (game.collapseConf==1?"ON":"OFF")
  get("singularityFunction").textContent=(game.mostSing<19.5?"Reach level 20 Singularity":"Singularity Functions")
  get("getRekt20sing").style.display=(game.mostSing<19.5?"block":"none")
  get("singFuncContent").style.display=(game.mostSing>19.5?"block":"none")
  drawStudyTree()
  singfunctions.forEach(func => func.update())
  get("functions").textContent=
`You have ${getSingLevel()+game.manifolds-game.sing.m - game.spentFunctions} functions.
They are based on your Singularity level.`
  //Instead of storing singularity functions, instead, it stores the highest singularity level achieved
  get("refundPointAmount").innerHTML=`You have ${game.refundPoints} Refund Points<br>You gain them when you Collapse`
  get("baselessMilestoneTab").style.display=(game.sfEver.includes(51)?"inline-block":"none")
  get("maxSing").style.display=(getBaseless()>=2?"block":"none")
  get("minSing").style.display=(getBaseless()>=2?"block":"none")
}

function dup(n, spectate = 0) {
  get("dup" + n).classList.remove("darkButton");
  get("dup" + n).classList.remove("locked");
  get("dup" + n).classList.remove("bought");
  if (n <= 3) {
    if (game.decrementy >= dupCosts[n - 1] ** (game.dups[n - 1] + 1)) {
      if (spectate == 0) {
        game.dups[n - 1] += 1;
        //game.decrementy = game.decrementy.minus(iupCosts[n-1]**game.iups[n-1])
      } else {
        get("dup" + n).classList.add("darkButton");
      }
    } else {
      get("dup" + n).classList.add("locked");
    }
  } /* else {
    if (!game.upgrades.includes(12)) {
      get("iup"+ + n).style.display = "none";
    } else {
      get("iup"+ + n).style.display = "inline-block";
      if (game.iups[n-1]==1) {
        get("iup" + n).classList.add("bought")
      } else if (game.incrementy.gte(iupCosts[n-1])) {
        if (spectate == 0) {
          game.incrementy = game.incrementy.minus(iupCosts[n-1])
          game.iups[n-1] = 1
        } else {
          get("iup" + n).classList.add("boosterButton")
        }
      } else {
        get("iup" + n).classList.add("locked")
      }
    }
  } */
}

function assign(a, b, c) {
  let assigning = true
  if (game.assBefore == 0&&a!=2) assigning=false
  if (game.assBefore == 0&&a!=2) alert("You should probably go for ℵ1 for your first cardinal")
  if (assigning && game.cardinals.gte(b)) {
    let bulk = EN(c == 1 ? game.cardinals.divide(b).floor() : 1).times(b);
    game.cardinals = game.cardinals.minus(bulk);
    game.assCard[a - 1].points = game.assCard[a - 1].points.add(bulk);
    game.assBefore = 1;
  }
}

function beautifypower(number) {
  if (number == Infinity) {
    return "Infinity";
  } else {
    let exponent = Math.floor(number);
    let mantissa = 10 ** (number % 1);
    if (exponent < 5) return Math.round(10 ** number);
    if (exponent > 100000) {
      exponent = Math.floor(Math.log10(number));
      mantissa = number / 10 ** exponent;
      if (mantissa.toFixed(5) == "10.00000") return "e9.99999e" + exponent;
      return "e" + mantissa.toFixed(5) + "e" + exponent;
    }
    if (mantissa.toFixed(2) == "10.00") return "9.99e" + exponent;
    return mantissa.toFixed(2) + "e" + exponent;
  }
}

function changeMusic() {
  game.music = (game.music + 1) % (musicLink.length + 1);
  if (game.music == 0) {
    get("music").pause();
  } else {
	console.log(musicLink[game.music - 1] || "")
    get("music").src = musicLink[game.music - 1] || "";
    get("music").play();
  }
}

function changeColor() {
  game.colors = 1 - game.colors;
}

function changeInt() {
  let newms = prompt("Please type in the new millisecond interval (20≤x≤1000)");
  if (20 <= Number(newms) && Number(newms) <= 1000 && !isNaN(Number(newms))) {
    game.msint = Math.round(Number(newms));
    save();
    location.reload();
  }
}

function changeOrdLengthLess() {
  let newms = prompt(
    "Please type in the new max length. Type in 0 for no maximum (max 10)"
  );
  if (!isNaN(Number(newms))) {
    if (newms >= 10 || Math.round(newms) <= 0) {
      newms = 10;
    }
    game.maxOrdLength.less = Math.round(Number(newms));
  }
}

function changeOrdLengthMore() {
  let newms = prompt(
    "Please type in the new max length. Type in 0 for no maximum"
  );
  if (!isNaN(Number(newms))) {
    game.maxOrdLength.more = Math.round(Number(newms));
  }
}

function changeTheme() {
  game.theme = (game.theme + 1) % 3;
}
function changeOrdNotation() {
  game.buchholz = (game.buchholz + 1) % 3;
}

function iup(n, spectate = 0) {
  get("iup" + n).classList.remove("boosterButton");
  get("iup" + n).classList.remove("locked");
  get("iup" + n).classList.remove("bought");
  if (n <= 3) {
    get("iup" + +n).style.display = "";
    if (game.incrementy.gte(iupCosts[n - 1] ** (game.iups[n - 1] + 1))) {
      if (spectate == 0) {
        game.iups[n - 1] += 1;
        game.incrementy = game.incrementy.minus(
          iupCosts[n - 1] ** game.iups[n - 1]
        );
      } else {
        get("iup" + n).classList.add("boosterButton");
      }
    } else {
      get("iup" + n).classList.add("locked");
    }
  } else {
    if (!game.upgrades.includes(12)) {
      get("iup" + +n).style.display = "none";
    } else {
      get("iup" + +n).style.display = "inline-block";
      if (game.iups[n - 1] == 1) {
        get("iup" + n).classList.add("bought");
      } else if (game.incrementy.gte(iupCosts[n - 1])) {
        if (spectate == 0) {
          game.incrementy = game.incrementy.minus(iupCosts[n - 1]);
          game.iups[n - 1] = 1;
        } else {
          get("iup" + n).classList.add("boosterButton");
        }
      } else {
        get("iup" + n).classList.add("locked");
      }
    }
  }
}

function chalbut(i) {
  get("challenge" + (i + 1)).classList.remove("boosterButton");
  get("challenge" + (i + 1)).classList.remove("bought");
  get("challenge" + (i + 1)).classList.remove("pointer");
  get("challenge" + (i + 1)).classList.remove("running");
  if (game.challenge == i + 1 || (game.chal8 == 1 && i == 7)) {
    get("challenge" + (i + 1)).classList.add("running");
  } else if (game.challengeCompletion[i] >= 3 && i <= 6.1) {
    get("challenge" + (i + 1)).classList.add("bought");
    if (game.upgrades.includes(17)) get("challenge" + (i + 1)).classList.add("pointer");
  } else {
    get("challenge" + (i + 1)).classList.add("boosterButton");
  }
}

function getManifolds() {
  if (
    calcIncrementyMult() >=
    (game.iups[5] == 1 ? 2 : 3) ** (game.manifolds + 1)
  ) {
    game.incrementy = EN(0);
    game.manifolds += 1;
  }
}

function getDarkManifolds() {
  if (game.decrementy <= game.darkManifolds * Math.log10(game.sfBought.includes(31)?2:3)) return;
  if (game.darkManifoldMax == 1) {
    game.darkManifolds = Math.floor(game.decrementy / Math.log10(game.sfBought.includes(31)?2:3));
  } else {
    game.darkManifolds += 1;
  }
}

function aup(x, spectate = 0) {
  get("aup" + x).classList.remove("collapse");
  get("aup" + x).classList.remove("bought");
  get("aup" + x).classList.add("locked");
  if (
    spectate == 0 &&
    !game.aups.includes(x) &&
    game.alephOmega.gte(EN(aupCost[x - 1]))
  ) {
    game.alephOmega = game.alephOmega.minus(aupCost[x - 1]);
    game.aups.push(x);
  }
  if (game.alephOmega.gte(EN(aupCost[x - 1]))) {
    get("aup" + x).classList.add("collapse");
    get("aup" + x).classList.remove("locked");
  }
  if (game.aups.includes(x)) {
    get("aup" + x).classList.add("bought");
    get("aup" + x).classList.remove("collapse");
    get("aup" + x).classList.remove("locked");
  }
}

function bup(x, spectate = 0) {
  get("bup" + x).classList.remove("canbuy");
  get("bup" + x).classList.remove("bought");
  get("bup" + x).classList.add("locked");
  if (!game.upgrades.includes(x)) {
    if (
      game.boosters >= bupUpgradeCosts[x - 1] &&
      (game.leastBoost <= 1.5 || (game.challenge != 6 && game.challenge != 7))
    ) {
      if (
        !(x == 12 && !(getSumOfChallenges() >= 7)) &&
        !(x == 16 && !(getSumOfChallenges() >= 22)) &&
        !(x == 20 && !(getSumOfChallenges() >= 33)) &&
        !(x == 24 && !(getSumOfChallenges() >= 37)) &&
        (x < 4.5 || game.upgrades.includes(x - 4))
      ) {
        if (spectate == 0) {
          if (x == 16&&collapseAnimation==0) {
            let a = confirm(
              "Buying this upgrade will destroy everything booster destroys, along with all of your upgrades, autobuyers, challenges, incrementy, incrementy upgrades, and manifolds for a single currency of the next prestige layer. Are you ready for this?"
            );
            if (a) {
              let b = confirm(
                "Are you really sure about this? YOU WILL LOSE EVERYTHING YOU HAVE!"
              );
              if (b) {
                let c = confirm(
                  "ARE YOU REALLY SURE YOU WANT TO DO THAT! YOU WILL LOSE EVERYTHING AND YOU CAN'T UNDO THIS AND MOM WILL GET MAD AND YOU WILL SEE A GLIMPSE OF THE UNKNOWN AND THIS IS YOUR LAST CHANCE!!!"
                );
                if (c) {
                  collapse();
                }
              }
            }
          } else {
            if (x % 4 != 0) game.boosters -= bupUpgradeCosts[x - 1];
            game.upgrades.push(x);
            get("bup" + x).classList.remove("canbuy");
            get("bup" + x).classList.add("bought");
            get("bup" + x).classList.remove("locked");
          }
        } else {
          get("bup" + x).classList.add("canbuy");
          get("bup" + x).classList.remove("bought");
          get("bup" + x).classList.remove("locked");
        }
      }
    }
  } else {
    get("bup" + x).classList.remove("canbuy");
    get("bup" + x).classList.add("bought");
    get("bup" + x).classList.remove("locked");
  }
}

function logbeautify(number) {
  if (beautify(number) == "10^^10") {
    return "10^^9";
  } else if (beautify(number) == "10^^100") {
    return "10^^99";
  } else {
    return beautify(number);
  }
}

// "<span style='color:" + HSL(tempvar * 8) + ";text-shadow: 6px 6px 6px " + HSL(tempvar * 8) + ", 1px 0 1px black, -1px 0 1px black, 0 1px 1px black, 0 -1px 1px black;'>" + tempvar4 + "</span>"
function displayOrd(ord,base=3,over=0,trim=0,large=0,multoff=0,colour=0) {
  ord = ENify(ord);
  originalOrd = ENify(ord);
  let dispString = "";

  let largeOrd = false;
  while (ord.gte(base) && (trim < game.maxOrdLength.less || game.maxOrdLength.less == 0) && !largeOrd)
  {
    let tempvar = ord.add(0.1).logBase(base).floor() // if leading term of ordinal is (ω^c)a, this is c
    if (ordColor == "no") ordColor=HSL(tempvar*8)
    let tempvar2 = EN.pow(base,tempvar) // and this is ω^c
    let tempvar3 = EN.floor((EN.add(ord, 0.1)).div(tempvar2)) // and this is a
    let ott = ord.sub(EN.mul(tempvar2, tempvar3)) // the ordinal value of the rest of the ordinal
    let otto = ott.add(over).eq(0) || ord.gt(EN.tetrate(base, 3)) // has the ordinal ended?
    tempvar4 = "ω" +
      (tempvar.eq(1) ? "" : (game.buchholz==2?"^(":"<sup>") + displayOrd(tempvar,base,0) + (game.buchholz==2?")":"</sup>")) +
      (tempvar3.eq(1) ? "" : (game.buchholz==2&&tempvar.gt(1.5)?"×":"") + tempvar3.toString()) +
      (otto || trim == (game.maxOrdLength.less-1) ? (otto ? "": "+...") : "+" );

    dispString += (colour==1?"<span style='color:" + HSL(tempvar*8) + ";text-shadow: 6px 6px 6px " + HSL(tempvar * 8) + ", 1px 0 1px black, -1px 0 1px black, 0 1px 1px black, 0 -1px 1px black;'>" + tempvar4 + "</span>":tempvar4);
    ord = ott;
    trim++;

    if (ord.gt(EN.tetrate(base, 3))) {largeOrd = true}
  }

  if ((ord.lt(base) && !ord.eq(0) && trim != game.maxOrdLength.less) || originalOrd.eq(0)) {
    if (ordColor == "no") ordColor="red"
    dispString += (colour==1?"<span style='color:red;text-shadow: 6px 6px 6px red, 1px 0 1px black, -1px 0 1px black, 0 1px 1px black, 0 -1px 1px black;'>" + Math.ceil(EN.add(ord,over).toNumber()) + "</span>":Math.ceil(EN.add(ord,over).toNumber()))
  }

  return dispString;
}

function fghexp(times, on) {
  if (times < 1) {
    return on;
  } else {
    if (times < 5) {
      return fghexp(times - 1, Math.pow(2, on) * on);
    } else {
      return Infinity;
    }
  }
}

function beautify(number, f = 0) {
  if (typeof number == "number") {
    if (number == Infinity) {
      return "Infinity";
    } else if (1e265 > number) {
      if (1e257 > number) {
        let exponent = Math.floor(Math.log10(number + 0.1));
        let mantissa = number / Math.pow(10, exponent);
        if (exponent < 6) return Math.round(number);
        if (mantissa.toFixed(3) == "10.000") return "9.999e" + exponent;
        return mantissa.toFixed(3) + "e" + exponent;
      } else {
        return "1.000e257 (cap in base " + game.base + ")";
      }
    } else {
      return "g<sub>" + displayOrd(number - 9.9e269, 3) + "</sub> (10)";
    }
  } else {
    return beautifyEN(number, f);
  }
}

function beautifyEN(n, f = 0) {
  let x = EN(n);
  if (x.lte(1e5)) {
    return f === 0 ? x.floor().toString() : x.toNumber().toFixed(f);
  } else if (x.lte("ee5")) {
    let exponent = x.log10().floor();
    let mantissa = x
      .divide(EN(10).pow(exponent))
      .toNumber()
      .toFixed(2);
    if (mantissa == "10.00") exponent = exponent.add(1);
    if (mantissa == "10.00") mantissa = "1.00";
    return mantissa + "e" + beautify(exponent);
  } else {
    return x.floor().toString();
  }
}

function calcOrdPoints(ord = game.ord, base = game.base, over = game.over) {
  var logOrd = EN.sub(EN.logBase(ord, game.base), 100);
  if (EN.gt(logOrd, 0)) {
    var tempBase = EN.div(logOrd, 100/(game.markupChallenge[2]+1));
    return EN.mul(EN.pow(EN.add(EN.max(EN.min(tempBase, EN.pow(2, game.markupChallenge[6]*(12-game.base))), EN.pow(tempBase, 0.8)), 1+game.markupChallenge[2]*0.5+game.markupChallenge[6]*(10-game.base)*0.5), EN.pow(logOrd, 0.5+game.markupChallenge[6]*(10-game.base)/50)), game.markupChallenge[3]*9+1);
  } else {
    return EN(0);
  }
}

function Tab(t) {
  get("Tab1").style.display = "none";
  get("Tab2").style.display = "none";
  get("Tab3").style.display = "none";
  get("Tab4").style.display = "none";
  get("Tab5").style.display = "none";
  get("Tab6").style.display = "none";
  get("Tab7").style.display = "none";
  get("Tab" + t).style.display = "block";
  subTab(game.subTab);
  bsubTab(game.bsubTab);
  csubTab(game.csubTab);
  if (game.music >= 1) get("music").play();
}

function subTab(t) {
  get("subTab1").style.display = "none";
  get("subTab2").style.display = "none";
  get("subTab3").style.display = "none";
  get("subTab4").style.display = "none";
  get("subTab5").style.display = "none";
  get("subTab" + t).style.display = "block";
  game.subTab = t;
}
function bsubTab(t) {
  get("bsubTab1").style.display = "none";
  get("bsubTab2").style.display = "none";
  get("bsubTab3").style.display = "none";
  get("bsubTab4").style.display = "none";
  get("bsubTab" + t).style.display = "block";
  game.bsubTab = t;
}

function csubTab(t) {
  get("csubTab1").style.display = "none";
  get("csubTab2").style.display = "none";
  get("csubTab3").style.display = "none";
  get("csubTab4").style.display = "none";
  get("csubTab5").style.display = "none";
  get("csubTab6").style.display = "none";
  get("csubTab7").style.display = "none";
  get("csubTab" + t).style.display = "inline-block";
  game.csubTab = t;
  //get("body").style["background-size"]="cover"
  //Site: https://wallpaperplay.com/
  //Terms: https://wallpaperplay.com/page-terms
}

var autoSave = window.setInterval(function() {
  save();
}, 10000);

function resetConf() {
  let code = prompt(
    'Are you sure you want to delete all of your progress? Type in "yes" to reset all of your progress.'
  );
  if (code.toLowerCase() == "yes") reset();
}

function maxFactors() {
  if (game.challenge != 2 && game.challenge != 7) {
    if (game.factors.length >= 7 && game.OP >= 1e257) {
      game.factors = [9, 8, 7, 4, 4, 3, 2];
    } else {
      for (let i = 0; i < game.factors.length; i++)
        while (
          game.OP >=
          Math.pow(10 ** (i + 1), Math.pow(factorCostExp[i], game.factors[i]))
        )
          buyFactor(i);
    }
  }
}

function buyFactor(n) {
  if (
    game.OP >=
      Math.pow(10 ** (n + 1), Math.pow(factorCostExp[n], game.factors[n])) &&
    game.challenge != 2 &&
    game.challenge != 7
  ) {
    if (game.OP < 1e265)
      game.OP -= Math.pow(
        10 ** (n + 1),
        Math.pow(factorCostExp[n], game.factors[n])
      );
    game.factors[n] += 1;
  }
}

function debug() {
  game.ord = EN(0);
  game.over = 0;
  game.canInf = false;
  game.OP = 0;
  game.succAuto = 0;
  game.limAuto = 0;
  game.autoLoop = { succ: 0, lim: 0 };
  game.factorShifts = 7;
  game.base = 3;
  game.manualClicksLeft = 1000;
  game.factors = [9, 8, 7, 4, 4, 3, 2];
  game.infUnlock = 1;
  game.dynamic = EN(1);
  game.challenge = 0;
  game.chal8 = 0;
  game.decrementy = 0;
  render();
  get("infinityTabButton").style.display = "inline-block";
}

function revertToPreBooster() {
  game.ord = EN(0);
  game.over = 0;
  game.canInf = false;
  // game.OP = 10 ** 270 * 5;
  game.succAuto = 0;
  game.limAuto = 0;
  game.autoLoop = { succ: 0, lim: 0 };
  game.factorShifts = 7;
  game.manualClicksLeft = 1000;
  game.base = 3;
  game.factors = [9, 8, 7, 4, 4, 3, 2];
  game.infUnlock = 1;
  game.dynamic = EN(1);
  game.challenge = 0;
  game.chal8 = 0;
  game.decrementy = 0;
  render();
  get("infinityTabButton").style.display = "inline-block";
}

function V(n, fb = 0) {
  if (n < 27) {
    let tempvar = 0;
    let tempvar2 = 0;
    while (tempvar < n) {
      if (ordMarks[1][tempvar2][ordMarks[1][tempvar2].length - 2] == "x") {
        tempvar++;
      }
      tempvar2++;
    }
    tempvar2--;
    return 3 ** tempvar2 * 4 * 10 ** 270;
  } else {
    return (
      V(26) *
      243 *
      (fb == 1 ? (game.factorBoosts >= 24 ? getSingLevel() : 1) : 1)
    );
  }
}

function toggleAutoMax() {
  if (game.upgrades.includes(2) || game.leastBoost <= 1.5) {
    game.autoOn.max = 1 - game.autoOn.max;
  }
  render();
}

function toggleAutoInf() {
  if (game.upgrades.includes(3)) {
    game.autoOn.inf = 1 - game.autoOn.inf;
  }
  render();
}

if (game.music >= 1) get("music").play();
get("music").src = musicLink[game.music - 1] || "";
get("music").muted = false;

function ENify(x) {
  if (typeof x == "number") {
    return EN(x)
  } else {
    let newEN = new EN(0)
    newEN.array = x.array
    newEN.sign = x.sign
    newEN.layer = x.layer
    return newEN
  }
}

function time(x) {
  let timeList = [
    Math.floor(x / 86400),
    Math.floor((x % 86400) / 3600),
    Math.floor((x % 3600) / 60),
    Math.floor(x % 60)
  ];
  let timeUnits = ["d ", "h ", "m ", "s"];
  while (timeList[0] == 0) {
    timeList.shift();
    timeUnits.shift();
  }
  let timeOut = "";
  for (let i = 0; i < timeList.length; i++) {
    timeOut += timeList[i];
    timeOut += timeUnits[i];
  }
  if (timeOut == "") timeOut = "<1s";
  return timeOut;
}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}

function buyFactorShiftAuto() {
  if (game.alephOmega.gte(500)) {
    game.alephOmega = game.alephOmega.minus(500);
    game.shiftAuto = game.shiftAuto.add(1);
  }
}

function buyFactorBoostAuto() {
  if (game.alephOmega.gte(500)) {
    game.alephOmega = game.alephOmega.minus(500);
    game.boostAuto = game.boostAuto.add(1);
  }
}

function maxAutoprestige() {
  let bulk = game.alephOmega.divide(2000).floor();
  game.alephOmega = game.alephOmega.minus(bulk.times(1000));
  game.shiftAuto = game.shiftAuto.add(bulk);
  game.boostAuto = game.boostAuto.add(bulk);
}

function distributeCard() {
  let bulk = game.cardinals.divide(3).floor();
  game.cardinals = game.cardinals.minus(bulk.times(3));
  game.assCard[0].points = game.assCard[0].points.add(bulk);
  game.assCard[1].points = game.assCard[1].points.add(bulk);
  game.assCard[2].points = game.assCard[2].points.add(bulk);
}

function getSingularity(x) {
  if (
    x == 0 &&
    game.darkManifolds - getDMSacrafice() >= 1e6 * (game.sfBought.includes(23)?4:5) ** game.sing.dm
  ) {
    game.sing.dm++;
  } else if (x == 1 && game.manifolds >= game.sing.m + 1) {
    game.sing.m++;
  } else if (x == 2 && game.alephOmega.gte(1e20 * (game.sfBought.includes(21)?30:100) ** game.sing.nw)) {
    game.alephOmega = game.alephOmega.minus(1e20 * (game.sfBought.includes(21)?30:100) ** game.sing.nw);
    game.sing.nw++;
  }
}

function getSingManifold() {
  if (getSingLevel() >= 1.5) {
    --game.sing.m;
  }
}

function downgradeSing1() {
  game.sing.m -= getSingLevel()-1
}

function maximizeSing() {
  while (game.darkManifolds - getDMSacrafice() >= 1e6 * (game.sfBought.includes(23)?4:5) ** game.sing.dm) game.sing.dm++;
  while (game.alephOmega.gte(1e20 * (game.sfBought.includes(21)?30:100) ** game.sing.nw)) game.sing.nw++;
  game.sing.m=game.manifolds;
}

function postBHOproj(x) {
  let goal = (BHO / 1e270) * 3 ** (getSingLevel() - 1);
  let amt = game.OP / 1e270;
  if (game.OP > BHO) amt = (BHO / 1e270) * 3 ** (game.OP / BHO - 1);
  return Math.floor((goal - amt) / x);
}
