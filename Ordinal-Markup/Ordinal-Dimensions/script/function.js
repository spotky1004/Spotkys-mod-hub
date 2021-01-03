"use strict";

function calcDynamic() {
  return (
    (game.dynamic * getManifoldEffect()) **
    (game.upgrades.includes(13) && game.challenge % 2 === 1 ? 2 : 1)
  );
}

function getChalFact() {
  if (game.challenge <= 5.5 && (game.boostUnlock==1||game.factorShifts==7)) {
    return 4
  } // render func time and html time oh sniped
  return 1
} // where's the goddamn calcopps
// calcOPPS go use the search menu. found it

function getAlephOmega() {
  if (
    game.assCard[0].points.gte(1) &&
    game.assCard[1].points.gte(1) &&
    game.assCard[2].points.gte(1)
  ) {
    game.assCard[0].points = game.assCard[0].points.minus(1);
    game.assCard[1].points = game.assCard[1].points.minus(1);
    game.assCard[2].points = game.assCard[2].points.minus(1);
    game.alephOmega = game.alephOmega.add(1);
  }
}

function getHalfAlephOmega() {
  const bulk = game.assCard[0].points
    .min(game.assCard[1].points)
    .min(game.assCard[2].points)
    .divide(2)
    .floor();
  game.assCard[0].points = game.assCard[0].points.minus(bulk);
  game.assCard[1].points = game.assCard[1].points.minus(bulk);
  game.assCard[2].points = game.assCard[2].points.minus(bulk);
  game.alephOmega = game.alephOmega.add(bulk);
}

function calcCard() {
  game.maxCard = EN(
    Math.max(game.factorBoosts - 24, 2) ** calcCardExponent(game.collapseTime)
  )
    .floor()
    .max(game.maxCard);
  return game.maxCard;
}

function calcCardExponent(s) {
  return 0.5 + 0.8 * (5 - Math.min(Math.log10(Math.max(1000, s)), 5)) ** 1.5;
}

function getManifoldEffect() {
  return (
    Math.max(1, game.manifolds + 1 - game.sing.m) **
      (game.sfBought.includes(62) ? 2 : 0.5) *
    (game.iups[4 - 1] === 1 ? 3 : 1) *
    (game.iups[4] === 1 ? 1.26 : 1)
  );
}

function getDynamicFactorCap() {
  return (
    (10 *
      getManifoldEffect() *
      getDarkManifoldEffect() *
      (game.aups.includes(6) ? game.assCard[1].mult.toNumber() : 1)) **
    (game.upgrades.includes(13) && game.challenge % 2 === 1 ? 2 : 1)
  );
}

function getDarkManifoldEffect() {
  return (
    Math.max(1, game.darkManifolds + 1 - getDMSacrafice()) ** 0.1 *
    (game.sfBought.includes(31) ? 3.78 : 1)
  );
}

function getFactorBoostGain() {
  let fbgg = game.factorBoosts;
  let fbg = 0;
  for (let j = 0; j < getFactorBulk(); j++) {
    fbgg += 1;
    fbg += fbgg;
  }
  return fbg;
}

function getFactorBulk() {
  if (game.OP >= V(game.factorBoosts + 3, 1)) {
    let i = 1;
    while (
      game.OP >= V(game.factorBoosts + 3 + i, 1) &&
      game.factorBoosts + 3 + i <= 27
    ) {
      i++;
    }
    return game.bulkBoost === 1 ? i : 1;
  }
  return 0;
}

function calcRefund() {
  let refundBoost = 0;
  for (let i = 0; i < bupUpgradeCosts.length; i++) {
    refundBoost +=
      game.upgrades.includes(i + 1) && i % 4 !== 3 ? bupUpgradeCosts[i] : 0;
  }
  return refundBoost;
}

function getSumOfChallenges() {
  let r = 0;
  for (let i = 0; i < game.challengeCompletion.length; i++)
    r += game.challengeCompletion[i];
  return r + game.chal8Comp;
}

function calcTotalOPGain() {
  return calcOrdPoints(game.ord, game.base, game.over);
  /* if (
    calcOrdPoints(game.ord, game.base, game.over) >= 9e257 &&
    calcOrdPoints(game.ord, game.base, game.over) <= 1.1e258
  )
    return 1e258;
  return (
    calcOrdPoints(game.ord, game.base, game.over) *
    (calcOrdPoints(game.ord, game.base, game.over) >= 10 ** 265
      ? 1
      : calcOPonInfMult())
  ); */
}

function calcOPonInfMult() {
  return (game.upgrades.includes(5) ? 5 : 1) *
        (game.upgrades.includes(15) && game.base < 6 ? 666666 : 1) *
        (game.challenge === 7 ? Math.max(game.challengeCompletion[5], 1) : 1) *
        (game.chal8 === 1 ? Math.max(game.challengeCompletion[6], 1) : 1) *
        game.assCard[2].mult *
        (game.iups[8] === 1 ? 2 * (1 + game.sfBought.includes(32)) : 1) *
        (game.sfBought.includes(42) ? 4 : 1)
}

// ahh that's better
function timeSince(x) {
  return (Date.now() - x) / 1000;
}

function calcSlugMile() {
  let k = 0;
  while (game.leastBoost <= slugMile[k]) {
    k++;
  }
  return k;
}

function getDecrementyRate(x) {
  return (
    ((0.000666 * x) / 50) *
    (calcOrdPoints(game.ord, game.base, game.over) + 0) ** 0.2 *
    (2 ** game.dups[1]) **
      (calcOrdPoints(game.ord, game.base, game.over) < 1e30 ? -1 : 1) *
    (game.sfBought.includes(22) ? getManifoldEffect() : 1) *
    (game.sfBought.includes(32) ? getDynamicFactorCap() : 1) *
    (game.sfBought.includes(42) ? 4 : 1)
  );
}

function getIncrementyRate(x) {
  let ordRate = game.ord / 1e270;
  if (game.ord > BHO) ordRate = (BHO / 1e270) * 3 ** (game.ord / BHO - 1);
  return EN(
    ((ordRate * x) / 1000) *
      2 ** game.iups[1] *
      (game.iups[7] === 1 ? getDynamicFactorCap() : 1)
  )
    .times(game.aups.includes(5) ? game.assCard[2].mult : 1)
    .times(
      game.leastBoost <= 1.5
        ? getDynamicFactorCap() ** getChalIncrementyCurve(game.chal8Comp)
        : 1
    );
}

function changeOfflineProg() {
  game.offlineProg = 1 - game.offlineProg;
  save();
}

function calcTotalMultWOFactor() {
  return (
    ((getBoostFromBoosters() * bfactorMult * calcDynamic()) /
      (game.chal8 === 1 ? 10 ** (game.decrementy * 0.95 ** game.dups[0]) : 1)) *
    game.assCard[0].mult.toNumber() *
    1.2 ** game.dups[2] *
    (game.aups.includes(4) ? Math.log10(Math.log10(1e10 + game.OP)) : 1) *
    getChalFact()
  );
}

function calcBupTotalMultWOFactor() {
  return (
    2 *
    getBoostFromBoosters() *
    game.assCard[1].mult.toNumber() *
    (game.aups.includes(1) ? Math.max(getManifoldEffect(), 1) : 1) *
    1.2 ** game.dups[2]
  );
}

function getBoostFromBoosters(check = 0) {
  return game.upgrades.includes(6) || check === 1
    ? Math.max(
        game.leastBoost <= 12 ? 10 + 9 * Math.max(game.boosters, 0) ** 0.5 : 0,
        10 + Math.max(game.boosters, 0) ** 0.9
      )
    : 1;
}

function getFSCost(fs = game.factorShifts) {
  return Math.round(factorShiftCosts[fs])
}

function calcIncrementyMult(i = game.incrementy) {
  return ExpantaNum(i)
    .add(10)
    .log10()
    .pow(ExpantaNum(1.05).pow(game.iups[0]))
    .times(ExpantaNum(1.2).pow(game.iups[2]))
    .toNumber();
}

function calcFactorBoostTime() {
  let fbt = 0;
  let bfact = 1;
  for (let i = 1; i < 9; i++) {
    fbt += calcFactorShiftTime(i);
    if (i !== 8)
      bfact *=
        (([9, 8, 7, 4, 4, 3, 2][i - 1] +
          1 +
          (game.upgrades.includes(11) ? 3 : 0)) *
          (game.upgrades.includes(1) ? 2 : 1)) **
        [0, 0.5, 0.75, 1][game.challengeCompletion[i - 1]];
    if (i === 8)
      bfact *= getDynamicFactorCap() ** getChalCurve([game.chal8Comp]);
  }
  // Note: "1.4589198550868316e+290" is V(27) * 3. It's probably better to have it already calculated.
  let speed =
    calcBupTotalMultWOFactor() *
    bfact *
    calcIncrementyMult(game.maxIncrementyRate.pow(0.9)) *
    (game.aups.includes(4) ? Math.log10(Math.log10(1e280)) : 1);
  return (
    Math.max(
      1 / game.boostAuto.toNumber(),
      fbt + (BHO / 1e270 / speed) * 3 ** (getSingLevel() - 1)
    ) / getFBmult()
  );
}

function getChal8Goal(x) {
  return x >= 3 && game.leastBoost >= 1.5
    ? Infinity
    :2 ** ((x * (x + 1)) / 2) * 3e10 / (game.sfBought.includes(63)?game.assCard[0].mult.toNumber():1);
}

function getChalCurve(n) {
  if (n >= 3) return 1;
  return [0, 0.5, 0.75, 1][n];
}

function getChalIncrementyCurve(n) {
  if (n <= 3) return 0;
  // Old args:
  // 0.5 * n, 0.25 + 0.25 * n, 0.625 + 0.125 * n, 1.0625 + 0.0625 * n, 1.53125 + 0.03125 * n
  return (
    Math.min(
      0.5 * n,
      0.25 + 0.25 * n,
      0.625 + 0.125 * n,
      1.0625 + 0.0625 * n,
      1.53125 + 0.03125 * n
    ) - 1
  );
}

function getFBps() {
  if (
    game.challenge === 0 &&
    game.chal8 === 0 &&
    !game.upgrades.includes(10) &&
    game.cAutoOn.shift === 1 &&
    game.cAutoOn.boost === 1 &&
    game.autoOn.max ===1 &&
    game.leastBoost <= 12
  ) {
    return 1 / calcFactorBoostTime();
  }
  return 0;
}

function increaseOrdTier2(x) {
  const bupCom =
    x < BHO / 1e270
      ? x * 1e270
      : (Math.log10(x / (BHO / 1e270)) / Math.log10(3) + 1) * BHO;
  if (
    game.ord + game.OP > 1e265 &&
    game.challenge !== 1 &&
    game.challenge !== 7
  ) {
    if (game.ord < BHO && bupCom < BHO) {
      game.ord += bupCom;
      if (game.ord > BHO)
        game.ord = (Math.log10(game.ord / BHO) / Math.log10(3) + 1) * BHO;
    } else if (game.ord >= BHO && bupCom < BHO) {
      const amt = 3 ** (game.ord / BHO - 1) + bupCom / BHO;
      game.ord = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    } else if (game.ord < BHO && bupCom >= BHO) {
      const amt = 3 ** (bupCom / BHO - 1) + game.ord / BHO;
      game.ord = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    } else {
      const amt = 3 ** (game.ord / BHO - 1) + 3 ** (bupCom / BHO - 1);
      game.ord = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    }
    if (game.OP < BHO && bupCom < BHO) {
      game.OP += bupCom;
      if (game.OP > BHO)
        game.OP =
          (Math.log10(Math.min(game.OP, 1e308) / BHO) / Math.log10(3) + 1) *
          BHO;
    } else if (game.OP >= BHO && bupCom < BHO) {
      const amt = 3 ** (game.OP / BHO - 1) + bupCom / BHO;
      game.OP = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    } else if (game.OP < BHO && bupCom >= BHO) {
      const amt = 3 ** (bupCom / BHO - 1) + game.OP / BHO;
      game.OP = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    } else {
      const amt = 3 ** (game.OP / BHO - 1) + 3 ** (bupCom / BHO - 1);
      game.OP = (Math.log10(amt) / Math.log10(3) + 1) * BHO;
    }
  }
}

function getSingLevel() {
  return 1 + game.sing.dm + game.sing.m + game.sing.nw;
}

function getDMSacrafice() {
  return (5 ** game.sing.dm - 1) * 250000 * (1 - game.sfBought.includes(11));
}

function getFBmult() {
  let x=getSingLevel() * 2 - 1
  if (game.sfBought.includes(72)) x=x**1.4
  x=Math.round(x)
  return x;
}

function OPtoOrd(x, b, trim=0) {
  if (x <= 0.000000000001 || trim >= 12) return 0;
  let exp = Math.floor(Math.log10(x) + 0.000000000001);
  if (validInBase(exp, b)) {
    let coef = Math.floor(x / 10 ** exp + 0.000000000001);
    if (coef >= b) return b ** (OPtoOrd(exp, b, trim+1) + 1);
    return b ** OPtoOrd(exp, b, trim+1) * coef + OPtoOrd(x - coef * 10 ** exp, b, trim+1);
  } else {
    return b ** OPtoOrd(exp, b, trim+1);
  }
}

function validInBase(x, b) {
  return x
    .toString()
    .split("")
    .every(dig => {
      return Number(dig) < b - 0.5 || dig == "e" || dig == ".";
    });
}

function commafy(n) {
  let nr=Math.round(n);
  let raw=nr.toString();
  if (raw.split("").includes("e")) {
    let dig=Number(raw.split("+")[1])+1;
    raw=raw.split("e")[0].split("").filter(x => x != ".");
    let digNeed=dig-raw.length;
    for (let i=0;i<digNeed;i++) raw.push(0);
  } else {
    raw=raw.split("")
  }
  let out=[]
  while (raw.length>0) {
    out.push(raw[0])
    raw.shift()
    if (raw.length % 3 == 0 && raw.length>0) out.push(",")
  }
  return out.join("")
}

function getBaseless() {
  if (!game.sfEver.includes(51)) return 0
  let i=0
  while (game.mostChal4>baselessMile[i]) {
    i++
  }
  return i
}
