"use strict";

const keybinds = {
    a: () => {
      autobuyersToggle();
    },
    i: () => {
      if (game.markupChallengeEntered == 0) {
        infinity(1)
      }
    },
    m: () => {
      buyMaxIncr();
    },
    r: () => {
		if (game.boostUnlock === 1) refund();
	},
    c: () => {
		if (game.collapseUnlock === 1) collapse(1);
	},
};

// Declaring it once is probably faster
window.onkeypress = _ => {
  const k = _.key.toLowerCase();
  if (keybinds[k] && game.hotkeysOn === 1) keybinds[k]();
};
