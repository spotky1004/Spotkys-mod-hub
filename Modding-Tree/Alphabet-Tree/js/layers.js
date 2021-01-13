D = (n) => new Decimal(n);
var smallNums = '₀₁₂₃₄₅₆₇₈₉';
function smallNumber(str) {
  str = (str).toString();
	return str.replace(/([0-9])/g, function(match, p1){return smallNums[Number(p1)]});
}
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return '#' + Math.floor(r*255).toString(16).padStart(2, Math.floor(r*255).toString(16)) + Math.floor(g*255).toString(16).padStart(2, Math.floor(g*255).toString(16)) + Math.floor(b*255).toString(16).padStart(2, Math.floor(b*255).toString(16));
}
function alphaToNum(char) {
  return parseInt(char, 36)-10;
}
function numToAlpha(num) {
  return (num+10).toString(36).toUpperCase();
}
function getSeed(layerName) {
  return alphaToNum(layerName[0])+Number(layerName[1]);
}

var prevNodes = 0, nextNodes = 0, layerNodes = [], pointBoosts = [], resBoosts1 = {};
for (var i = 0; i < 26; i++) {
  var layerAlpha = (i+10).toString(36).toUpperCase();

  var stageNodes = 1;
  var tempBin = i.toString(2);
  for (var t = 0, l = tempBin.length; t < l; t++) if (tempBin[t] == '1') stageNodes++;
  layerNodes.push(stageNodes);

  nextNodes = 1;
  tempBin = (i+1).toString(2);
  for (var t = 0, l = tempBin.length; t < l; t++) if (tempBin[t] == '1') nextNodes++;
  if (i == 25) {
    nextNodes = 0;
  }

  for (var j = 0; j < stageNodes; j++) {
    var seed = i+j;
    var branch = seed%prevNodes;
    var req = D(10).mul((i+1)**2).pow((i >= 5 ? i/2+1 : 1)).pow((i >= 10 ? i+1 : 1)).div(4).div(i>15?1e10:1);
    addLayer(`${layerAlpha}${j}`, {
      name: `${layerAlpha}${smallNumber(j+1)}`, // This is optional, only used in a few places, If absent it just uses the layer id.
      symbol: `${layerAlpha}${smallNumber(j+1)}`, // This appears on the layer's node. Default is the id with the first letter capitalized
      position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
      startData() { return {
        unlocked: !i,
    	  points: new Decimal(0),
      }},
      color: hsvToRgb(i/25, 0.35+j/10+i/200, 0.4+j/20+i/400),
      requires: req,
      resetsNothing: function() {return hasMilestone(this.layer, 1)},
      branches: (i ? [`${(i+9).toString(36).toUpperCase()}${branch}`] : undefined),
      resource: `${layerAlpha}${smallNumber(j+1)} Points`, // Name of prestige currency
      baseResource: (i ? `${(i+9).toString(36).toUpperCase()}${smallNumber(branch+1)} Points` : 'points'), // Name of resource prestige is based on
      type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
      exponent: 0.5/stageNodes/(i+1)**0.2, // Prestige currency exponent
      gainMult: function() {
        var layerOrd = alphaToNum(this.layer[0]);
        var mult = D(1);
        for (var i = 0; i < layerNodes[layerOrd+1]; i++) {
          mult = mult.mul(player[numToAlpha(layerOrd+1) + i].points.add(1));
        }
        if (typeof resBoosts1[this.layer] != "undefined") {
          if (hasUpgrade(this.layer, resBoosts1[this.layer].num)) {
            mult = mult.mul(1e100)
          }
        };
        return mult;
      },
      gainExp() { // Calculate the exponent on main currency from bonuses
          return new Decimal(1)
      },
      row: i, // Row the layer is in on the tree (0 is the first row)

      tempShown: 0,
      layerShown: new Function(
        `
          if (this.canReset() || this.tempShown || player['${layerAlpha}${j}'].points.gt(0)) {
            this.tempShown = 1;
            return true;
          }
          for (var i = 25; i > ${i-2}; i--) {
            for (var j = 0; j < layerNodes[i]; j++) {
              if (player[(i+10).toString(36).toUpperCase() + j].points.gt(0)) {
                return true;
              }
            }
          }
          return false;
        `
      ),

      canReset() {
        return this.baseAmount().gte(this.requires);
      },

      doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
          var noneReset = ['milestones'];
          if (hasMilestone('E0', 2)) noneReset.push('upgrades');
          layerDataReset(this.layer, noneReset)
        }
      },

      milestones: {
        0: {
          requirementDescription: `Collect ${req.pow(5).mul(1e13).mul(D(10).pow((seed+1)**2)).toExponential(3).replace('+', '')} ${layerAlpha}${smallNumber(j+1)}`,
          done: new Function(
            `
              return player[this.layer].best.gte(D('${req.valueOf()}').pow(5).mul(1e13).mul(D(10).pow(${seed+1}**2)));
            `
          ),
          effectDescription: `Gain ${(100*0.9**i).toFixed(2)}% of ${layerAlpha}${smallNumber(j+1)} Reset reward per second`,
        },
        1: {
          requirementDescription: `Collect e10,000,000 ${layerAlpha}${smallNumber(j+1)}`,
          done: () => {return player[this.layer].best.gte(D('1e10000000'))},
          effectDescription: `Keep ^0.1 of resource of this layer on reset`,
        },
      },

      effectDescription() {
        eff = player[this.layer].points.add(1);
        return "\nwhich are giving a " + format(eff) + "× boost to the previous layer gain."
      },

      passiveGeneration() {
        return hasMilestone(this.layer, 0) ? 1*0.9**this.row : 0;
      }
    })
    if (i) {
      layers[`${layerAlpha}${j}`].baseAmount = new Function(
        `
          return player['${(i+9).toString(36).toUpperCase()}${branch}'].points;
        `
      )
    } else {
      layers[`${layerAlpha}${j}`].baseAmount = function () {
        return player.points;
      }
    }
    var tempUpgNum = 10;
    layers[`${layerAlpha}${j}`].upgrades = {
      rows: 1,
      cols: 0,
    }
    if (i >= 2 && (seed%3 == 0 || i == 2)) {
      layers[`${layerAlpha}${j}`].upgrades.cols++;
      tempUpgNum++;
      var tempMul = D(i).sub(2).pow(2).add(3).add(seed);
      layers[`${layerAlpha}${j}`].upgrades[tempUpgNum] = {
        title: "Point Boost",
        description: () => {return `Multiply Point gain by x${exponentialFormat(D(alphaToNum(player.tab[0])).sub(2).pow(2).add(3).add(getSeed(player.tab)), 2)}`},
        cost: new Decimal(10).pow(D(i).sub(1).pow(0.5)).mul(seed/10+1)
      }
      pointBoosts.push({layer: `${layerAlpha}${j}`, num: tempUpgNum, mult: tempMul});
    }
    if (i >= 3 && (seed%4 == 0 || i == 3)) {
      layers[`${layerAlpha}${j}`].upgrades.cols++;
      tempUpgNum++;
      var tempMul = D(i).sub(2).pow(2).add(3).add(seed).pow(i-1);
      layers[`${layerAlpha}${j}`].upgrades[tempUpgNum] = {
        title: "Point Boost II",
        description: () => {return `Multiply Point gain by x${exponentialFormat(D(alphaToNum(player.tab[0])).sub(2).pow(2).add(3).add(getSeed(player.tab)).pow(i-1), 2)}`},
        cost: new Decimal(10).pow(D(i).sub(1).pow(0.5)).pow(i)
      }
      pointBoosts.push({layer: `${layerAlpha}${j}`, num: tempUpgNum, mult: tempMul});
    }
    if (i >= 12 && (seed%2 == 0 || i == 12)) {
      layers[`${layerAlpha}${j}`].upgrades.cols++;
      tempUpgNum++;
      var tempMul = D(1e100);
      layers[`${layerAlpha}${j}`].upgrades[tempUpgNum] = {
        title: "Resource Boost",
        description: () => {return `Multiply Resource gain of this layer by x${exponentialFormat(D(1e100))}`},
        cost: new Decimal('1e1500').mul(D(10+i).pow((i+seed-30)*20))
      }
      resBoosts1[`${layerAlpha}${j}`] = ({num: tempUpgNum});
    }
  }
  prevNodes = stageNodes;
}

layers[`E0`].milestones[Object.keys(layers[`E0`].milestones).length] = {
  requirementDescription: `Collect 1.797e308 E₁`,
  done: function() {return player[this.layer].best.gte('1.797e308')},
  effectDescription: `Keep all upgrade on any layer upon reset!`,
}


addLayer("a", {
  startData() { return {
    unlocked: true,
	   points: new Decimal(0),
  }},
  color: "yellow",
  resource: "achievement power",
  row: "side",
  tooltip() { // Optional, tooltip displays when the layer is locked
    return ("Achievements")
  },
  achievementPopups: true,
  achievements: {
    rows: 3,
    cols: 5,
    11: {
      image: "./Achievements/a1.png",
      name: "Prestige A₁!",
      done() {return player['A0'].points.gt(0)},
      goalTooltip: "Go A₁",
      doneTooltip: "Go A₁",
    },
    12: {
      image: "./Achievements/a2.png",
      name: "Prestige B₁!",
      done() {return player['B0'].points.gt(0)},
      goalTooltip: "Go B₁",
      doneTooltip: "Go B₁",
    },
    13: {
      image: "./Achievements/a3.png",
      name: "Prestige C₁!",
      done() {return player['C0'].points.gt(0)},
      goalTooltip: "Go C₁",
      doneTooltip: "Go C₁",
    },
    14: {
      image: "./Achievements/a4.png",
      name: "Prestige D₁!",
      done() {return player['D0'].points.gt(0)},
      goalTooltip: "Go D₁",
      doneTooltip: "Go D₁",
    },
    15: {
      image: "./Achievements/a5.png",
      name: "Prestige E₁!",
      done() {return player['E0'].points.gt(0)},
      goalTooltip: "Go E₁",
      doneTooltip: "Go E₁",
    },
    21: {
      image: "./Achievements/a6.png",
      name: "Prestige G₁!",
      done() {return player['G0'].points.gt(0)},
      goalTooltip: "Go G₁",
      doneTooltip: "Go G₁",
    },
    22: {
      image: "./Achievements/a7.png",
      name: "Prestige I₁!",
      done() {return player['I0'].points.gt(0)},
      goalTooltip: "Go I₁",
      doneTooltip: "Go I₁",
    },
    23: {
      image: "./Achievements/a8.png",
      name: "Prestige K₁!",
      done() {return player['K0'].points.gt(0)},
      goalTooltip: "Go K₁",
      doneTooltip: "Go K₁",
    },
    24: {
      image: "./Achievements/a9.png",
      name: "Prestige M₁!",
      done() {return player['M0'].points.gt(0)},
      goalTooltip: "Go M₁",
      doneTooltip: "Go M₁",
    },
    25: {
      image: "./Achievements/a10.png",
      name: "Prestige O₁!",
      done() {return player['O0'].points.gt(0)},
      goalTooltip: "Go O₁",
      doneTooltip: "Go O₁",
    },
    31: {
      image: "./Achievements/a11.png",
      name: "Prestige R₁!",
      done() {return player['R0'].points.gt(0)},
      goalTooltip: "Go R₁",
      doneTooltip: "Go R₁",
    },
    32: {
      image: "./Achievements/a12.png",
      name: "Prestige U₁!",
      done() {return player['U0'].points.gt(0)},
      goalTooltip: "Go U₁",
      doneTooltip: "Go U₁",
    },
    33: {
      image: "./Achievements/a13.png",
      name: "Prestige X₁!",
      done() {return player['X0'].points.gt(0)},
      goalTooltip: "Go X₁",
      doneTooltip: "Go X₁",
    },
    34: {
      image: "./Achievements/a14.png",
      name: "Prestige Y₁!",
      done() {return player['Y0'].points.gt(0)},
      goalTooltip: "Go Y₁",
      doneTooltip: "Go Y₁",
    },
    35: {
      image: "./Achievements/a15.png",
      name: "Prestige Z₁!",
      done() {return player['Z0'].points.gt(0)},
      goalTooltip: "Go Z₁",
      doneTooltip: "Go Z₁",
    },
  },
  hotkeys: [
    {key: 'a', description: "Up/Down: Move layer tier", onPress(){}},
    {key: 'b', description: "Right/Left: Move layer in same tier", onPress(){}},
    {key: 'c', description: "R: Reset", onPress(){}},
  ],
});
