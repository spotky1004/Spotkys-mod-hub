let ResettingMatter = false;

addLayer("m", {
    name: "matter", 
    symbol: "M", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    canReset() { return player.rotationCount.gte(1) || (player.playing !== null && player[player.playing].points.gte(1e20)); },
    prestigeButtonText() {return layers.m.canReset() ? `Reset for <b>+${format(layers.m.gainMult())}</b> Matter` : `Reach 1e20 ${layers.m.baseResource()} to Reset`},
    color: "#ffffff",
    requires: new Decimal(1e20), 
    resource: "Matter", 
    baseResource() {return player.playing !== null ? layers[player.playing].resource : "Nothing"},
    baseAmount() {return player.playing !== null ? player[player.playing].points : new Decimal(0)},
    midsection: [
        [
            "display-text",
            function() {
                let output = [];
                output.push("Matter Gain Breakdown");
                output.push(`<span style="color: ${layers.m.color}">Base</span>: ${format(1)}`);
                if (player.rotationDone.w.gte(1)) output.push(`<span style="color: ${layers.w.color}">Water</span> (${format(player.rotationDone.w)} loop): +${format(player.rotationDone.w)}`);
                output.push(`<span>Total</span>: ${format(layers.m.gainMult())}`);

                return output.join("<br>");
            }
        ]
    ],
    type: "normal", 
    exponent: 0, 
    gainMult() { 
        mult = new Decimal(1);
        mult = mult.add(player.rotationDone.w);
        return mult;
    },
    gainExp() { 
        return new Decimal(1);
    },
    row: 4, 
    layerShown(){return true},
    doReset(resettingLayer) {
        player.points = new Decimal(0);
        player.rotationDone[player.playing] = player.rotationDone[player.playing].add(1);

        const startPlayer = getStartPlayer();
        for (const name in layers) {
            const layer = layers[name];
            if (typeof layer.row !== "number" || layer.row >= 4) continue;
            const startData = startPlayer[name];
            player[name] = startData;
            player[name].forceTooltip = true;
        }

        player.playing = null;
        ResettingMatter = true;
    },
    upgrades: {
        11: {
            title: "Expension",
            description: "Unlock ????",
            cost: new Decimal(Infinity),
            unlocked() {return hasUpgrade("m", 41)},
        },
        12: {
            title: "Expension",
            description: "Unlock Air",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade("m", 41)},
        },
        13: {
            title: "Expension",
            description: "Unlock Fire",
            cost: new Decimal(Infinity),
            unlocked() {return hasUpgrade("m", 41)},
        },
        14: {
            title: "Expension",
            description: "Unlock Earth",
            cost: new Decimal(Infinity),
            unlocked() {return hasUpgrade("m", 41)},
        },
        21: {
            title: "Water",
            description: "Triple Water related resource gain",
            cost: new Decimal(1),
        },
        31: {
            title: "Water II",
            description: "Multiply Water related resource gain by Matter gain",
            effect() {return layers.m.gainMult();},
            effectDisplay() {return format(this.effect()) + "x";},
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("m", 21)},
        },
        41: {
            title: "Water III",
            description: "Squrae the Water product, Power Generator won't take resources",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade("m", 31)},
        },
    }
});
