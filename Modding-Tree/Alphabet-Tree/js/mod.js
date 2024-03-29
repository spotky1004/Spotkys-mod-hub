D = (n) => new Decimal(n);

let modInfo = {
	name: "The Alphabet Tree",
	id: "alphabetTree",
	author: "Spotky1004",
	pointsName: "numbers",
	discordName: "My own Server!\n(Spotky\'s Game!)",
	discordLink: "https://discord.com/invite/wkdVQxT",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players

	offlineLimit: 1004,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.7.0",
	name: "no desc",
}

let changelog =
	`
		<h1>Changelog:</h1><br>
		<h3>v0.0.0</h3><br>
		- First Relase<br>
		<h3>v0.0.1</h3><br>
		- Better balance<br>
		<h3>v0.0.2</h3><br>
		- Fix NaN bug<br>
		<h3>v0.0.3</h3><br>
		- Allows to see next layer<br>
		<h3>v0.0.4</h3><br>
		- Fix number bug<br>
		<h3>v0.0.5</h3><br>
		- Fix number bug<br>
		<h3>v0.0.6</h3><br>
		- Made easisr to get Points<br>
		<h3>v0.1.0</h3><br>
		- Added Achievements tab<br>
		<h3>v0.2.0</h3><br>
		- Added Passive Gen (Milestone 1's)<br>
		<h3>v0.2.1</h3><br>
		- Buff milestone 1<br>
		<h3>v0.3.0</h3><br>
		- Added Hotkeys<br>
		<h3>v0.4.0</h3><br>
		- Added E1 Milestone (keep all upgrades)<br>
		<h3>v0.4.1</h3><br>
		- Temporary reduced P or highter layer req by 1e10 <br>
		<h3>v0.5.0</h3><br>
		- Added new Milestone for all layers: Keep ^0.01 of resource of this layer on reset <br>
		- Added new Upgrade: Multiply Resource gain of this layer by x1e100 <br>
		<h3>v0.6.0</h3><br>
		- Added new Upgrade: Make point gain ^1.1 <br>
		<h3>v0.7.0</h3><br>
		- Added 'Challenge I' (Appears after layer O) <br>
	`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1);
	gain = gain.mul(player.A0.points.add(1));
	for (var i = 0; i < pointBoosts.length; i++) {
		if (hasUpgrade(pointBoosts[i].layer, pointBoosts[i].num)) {
			gain = gain.mul(pointBoosts[i].mult);
		}
	}
	for (var i = 0; i < pointBoosts2.length; i++) {
		if (hasUpgrade(pointBoosts2[i].layer, pointBoosts2[i].num)) {
			gain = gain.pow(pointBoosts2[i].pow);
		}
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eeeeeee308"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
