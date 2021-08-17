function overallWaterMult() {
    let mult = new Decimal(1);
    if (hasUpgrade("m", 21)) mult = mult.mul(3);
    if (hasUpgrade("m", 32)) mult = mult.mul(temp.m.upgrades[31].effect);

    return mult;
}

addLayer("Fw", {
    name: "waterFactory", 
    symbol: "F<sub>w</sub>", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#627c85",
    requires: new Decimal(1000), 
    resource: "Water Factory", 
    baseResource: "Water Product", 
    baseAmount() {
        let product = new Decimal(1);
        product = product.mul(player.Pw.points);
        product = product.mul(player.Ew.points);
        if (hasUpgrade("Ew", 21)) product = product.mul(player.Fw.points.add(1));
        if (hasUpgrade("m", 41)) product = product.mul(player.w.points.add(1));

        if (hasUpgrade("Ew", 21)) product = product.pow(2);

        return product;
    }, 
    type: "static",
    canBuyMax: true,
    exponent: 1.5, 
    gainMult() { 
        mult = new Decimal(1)

        return mult;
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    branches: ["Pw"],
    layerShown(){return hasUpgrade("Pw", 11)},
    doReset() {
        player.Ew.points = new Decimal(0);
        player.Pw.points = new Decimal(0);
    },
    buyables: {
        11: {
            cost(x) {
                return {
                    Power: new Decimal(3).pow(x.pow(1.03).add(1)),
                    Essence: new Decimal(3).pow(x.pow(1.06).add(1)),
                    Factory: new Decimal(1).add(x.mul(x.div(10).add(1)).div(2).floor())
                }
            },
            title: "Power Generator",
            effect(x) {
                return new Decimal(2).add(x.div(10)).pow(x);
            },
            display() {return buyableDisplay(this, "Spend some Resources to generate Water Power Faster")},
            canAfford() {
                const cost = temp.Fw.buyables[11].cost;
                
                return player.Ew.points.gte(cost.Essence) &&
                    player.Pw.points.gte(cost.Power) &&
                    player.Fw.points.gte(cost.Factory)
            },
            buy() {
                const cost = temp.Fw.buyables[11].cost;

                player.Ew.points = player.Ew.points.sub(cost.Essence);
                player.Pw.points = player.Pw.points.sub(cost.Power);
                player.Fw.points = player.Fw.points.sub(cost.Factory);

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    }
});

addLayer("Pw", {
    name: "waterPower", 
    symbol: "P<sub>w</sub>", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#d3e9f2",
    requires: new Decimal(1e100), 
    resource: "Water Power", 
    baseResource: "matter", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    branches: ["Ew"],
    layerShown(){return hasUpgrade("Ew", 11)},
    tabFormat: [
        "main-display",
        "upgrades"
    ],
    effectDescription() { return `(${format(this.generation())}/s)` },
    generation() {
        let gain = new Decimal(0);

        if (hasUpgrade("Ew", 11)) gain = gain.add(0.5);

        let mult = overallWaterMult();
        mult = mult.mul(temp.Fw.buyables[11].effect);

        return gain.mul(mult);
    },
    upgrades: {
        11: {
            title: "Expansion",
            description: "Unlock Water Factory",
            cost: new Decimal(15),
        },
        21: {
            title: "Reproduce",
            description: "Water Product now includes Water Molecule",
            cost: new Decimal(150_000_000),
            unlocked() {return hasUpgrade("Pw", 11)},
        }
    }
});

addLayer("Ew", {
    name: "waterEssence", 
    symbol: "E<sub>w</sub>", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9fdcf5",
    requires: new Decimal(1e10), 
    resource: "Water Essence", 
    baseResource: "matter", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 2, 
    branches: ["w"],
    layerShown(){return hasUpgrade("w", 11)},
    tabFormat: [
        "main-display",
        "upgrades"
    ],
    effectDescription() { return `(${format(this.generation())}/s)` },
    generation() {
        let gain = new Decimal(0);

        if (hasUpgrade("w", 11)) gain = gain.add(1);

        let mult = overallWaterMult();
        for (let i = 31; i <= 33; i++) if (hasUpgrade("w", i)) mult = mult.mul(3);
        for (let i = 41; i <= 44; i++) if (hasUpgrade("w", i)) mult = mult.mul(4);
        if (hasUpgrade("w", 21)) mult = mult.mul(temp.w.upgrades[21].effect);
        if (hasUpgrade("w", 22)) mult = mult.mul(temp.w.upgrades[22].effect);

        return gain.mul(mult);
    },
    upgrades: {
        11: {
            title: "Expansion",
            description: "Generate 0.5 Water Power per second",
            cost: new Decimal(10),
        },
        21: {
            title: "Reproduce",
            description: "Water Product now includes Water Factory",
            cost: new Decimal(1e6),
            unlocked() {return hasUpgrade("Pw", 11)},
        }
    }
});

addLayer("w", {
    name: "water", 
    symbol: "W", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#42bcf5",
    requires: new Decimal(1), 
    resource: "Water Molecule", 
    baseResource: "Nothing", 
    baseAmount() {return new Decimal(1)}, 
    type: "normal", 
    exponent: 1, 
    prestigeButtonText() {return "Start Water"},
    canReset() { return player.playing === null; },
    gainMult() { 
        return new Decimal(1);
    },
    gainExp() { 
        return new Decimal(1);
    },
    row: 3, 
    hotkeys: [
        {key: "w", description: "W: Reset for water", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["m"],
    layerShown(){return true},
    doReset(resettingLayer) {
        if (!ResettingMatter) player.playing = "w";
    },
    generation() {
        let gain = new Decimal(0);
        gain = gain.add(player.Fw.points.pow(player.Fw.points.div(3).add(2)).mul(player.Fw.points));

        let mult = overallWaterMult();

        return gain.mul(mult);
    },
    effectDescription() { return `(${format(this.generation())}/s)` },
    upgrades: {
        11: {
            title: "Expansion",
            description: "Generate 1 Water Essence per second",
            cost: new Decimal(1),
        },
        21: {
            title: "Synergy I",
            description: "Multiply Essence generation based on Molecule",
            cost: new Decimal(1e8),
            effect() {return player.w.points.pow(0.1)},
            effectDisplay() {return format(this.effect()) + "x";},
            unlocked() {return hasUpgrade("w", 44)},
        },
        22: {
            title: "Synergy II",
            description: "Multiply Essence generation based on Factory",
            cost: new Decimal(1e9),
            effect() {return player.Fw.points.pow(1.2)},
            effectDisplay() {return format(this.effect()) + "x";},
            unlocked() {return hasUpgrade("w", 44)},
        },
        31: {
            title: "E",
            description: "Multiply Essence generation by 3",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("w", 11)},
        },
        32: {
            title: "s",
            description: "Multiply Essence generation by 3",
            cost: new Decimal(1e2),
            unlocked() {return hasUpgrade("w", 11)},
        },
        33: {
            title: "s",
            description: "Multiply Essence generation by 3",
            cost: new Decimal(1e3),
            unlocked() {return hasUpgrade("w", 11)},
        },
        41: {
            title: "e",
            description: "Multiply Essence generation by 4",
            cost: new Decimal(1e4),
            unlocked() {return hasUpgrade("w", 32)},
        },
        42: {
            title: "n",
            description: "Multiply Essence generation by 4",
            cost: new Decimal(1e5),
            unlocked() {return hasUpgrade("w", 32)},
        },
        43: {
            title: "c",
            description: "Multiply Essence generation by 4",
            cost: new Decimal(1e6),
            unlocked() {return hasUpgrade("w", 32)},
        },
        44: {
            title: "e",
            description: "Multiply Essence generation by 4",
            cost: new Decimal(1e7),
            unlocked() {return hasUpgrade("w", 32)},
        }
    }
});
