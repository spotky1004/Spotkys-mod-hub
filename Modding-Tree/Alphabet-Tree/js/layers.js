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

var prevNodes = 0, nextNodes = 0, layerNodes = [], pointBoosts = [];
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
    addLayer(`${layerAlpha}${j}`, {
      name: `${layerAlpha}${smallNumber(j+1)}`, // This is optional, only used in a few places, If absent it just uses the layer id.
      symbol: `${layerAlpha}${smallNumber(j+1)}`, // This appears on the layer's node. Default is the id with the first letter capitalized
      position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
      startData() { return {
        unlocked: (i ? false : true),
    	  points: new Decimal(0),
      }},
      color: hsvToRgb(i/25, 0.35+j/10+i/200, 0.4+j/20+i/400),
      requires: D(10).mul((i >= 5 ? i : 1)).pow((i >= 10 ? i/4+1 : 1)),
      branches: (i ? [`${(i+9).toString(36).toUpperCase()}${branch}`] : undefined),
      resource: `${layerAlpha}${smallNumber(j+1)} Points`, // Name of prestige currency
      baseResource: (i ? `${(i+9).toString(36).toUpperCase()}${smallNumber(branch+1)} Points` : 'points'), // Name of resource prestige is based on
      type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
      exponent: 0.5/stageNodes, // Prestige currency exponent
      gainMult: new Function(
        `
          var mult = D(1);
          for (var i = 0; i < ${nextNodes}; i++) {
            mult = mult.mul(player['${(i+11).toString(36).toUpperCase()}' + i].points.add(1));
          }
          return mult;
        `
      ),
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
          for (var i = 25; i > ${i-1}; i--) {
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
        description: `Multiply Point gain by ${tempMul.valueOf()}`,
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
        description: `Multiply Point gain by ${tempMul.valueOf()}`,
        cost: new Decimal(10).pow(D(i).sub(1).pow(0.5)).pow(i)
      }
      pointBoosts.push({layer: `${layerAlpha}${j}`, num: tempUpgNum, mult: tempMul});
    }
  }
  prevNodes = stageNodes;
}
