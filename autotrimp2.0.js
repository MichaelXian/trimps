if (typeof autoTrimps === 'undefined') {
	setup();
}

function setup() {
	autoTrimps = {}
	autoTrimps.version = "1.12.00";
	autoTrimps.settings = {};
	autoTrimps.bestBuilding = null;
	autoTrimps.bestArmor = null;
	autoTrimps.bestWeapon = null;
	autoTrimps.premapscounter = 0;

	autoTrimps.baseDamage = 0;
	autoTrimps.baseBlock = 0;
	autoTrimps.baseHealth = 0;

	autoTrimps.trigger1 = false;
	autoTrimps.trigger2 = false;
	autoTrimps.trigger3 = false;

	autoTrimps.breedTarget = document.createElement('input');
	autoTrimps.breedTarget.value = 30.9;
	autoTrimps.breedTarget.style.width = "20%";
	autoTrimps.breedTarget.style.color = "black";
	autoTrimps.breedTarget.style.textAlign = "right";
	document.getElementById("fireBtn").style.cssFloat = "left";
	document.getElementById("fireBtn").style.width = "50%";
	document.getElementById("jobsTitleSpan").parentElement.className = "col-xs-2";
	document.getElementById("fireBtn").parentElement.className = "col-xs-5";
	document.getElementById("fireBtn").parentElement.appendChild(autoTrimps.breedTarget);

	//Line things up, OCD FTW!
	document.getElementById("helium").style.height = "32.4%";
	document.getElementById("boneFlavorRow").innerHTML = "The Bone Trader trades bones for...bonuses";

	//setup talk button
	document.getElementById("buildingsQueue").style = "width: 75%; float: left;";
	document.getElementById("queueContainer").insertAdjacentHTML('beforeend', '<div id="talkDiv" style="color: rgb(255, 255, 255); font-size: 1.2em; text-align: center; width: 25%; float: right; padding-left: 1.1vw; padding-right: .45vw;"><div id="talkBtn" class="workBtn pointer noselect" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; margin-top: 0.3vh; display: none;">Talk</div></div>');
	document.getElementById("talkBtn").onclick = function(){document.getElementById("autotrimp").style.display = "block";};
	document.getElementById("talkBtn").style.display = "block";

	//setup talk window
	document.getElementById("boneWrapper").insertAdjacentHTML('beforebegin', '<div id="autotrimp" style="position: absolute; background: rgb(153, 153, 153) none repeat scroll 0% 0%; border: 2px solid rgb(0, 0, 0); width: 86vw; margin: 3vh 7vw; z-index: 10000000; text-align: center; font-size: 1.3vw; display: none; padding: 0.2vw; color: rgb(255, 255, 255);"><div style="width: 100%; display: table; border-spacing: 0.3vw;" id="autotrimp0"><div style="display: table-row;" id="autorow"><div id="button" style="display: table-cell; width: 20%; background: rgb(153, 153, 153) none repeat scroll 0% 0%; vertical-align: top;"><div class="boneBtn dangerColor pointer noselect" onclick="document.getElementById(\'autotrimp\').style.display = \'none\'">Close</div></div></div></div></div>');
	document.getElementById("autotrimp").insertAdjacentHTML('beforeend', '<div style="width: 100%; display: table; border-spacing:0.3vw;" id="autosettings"><div style="border: 1px solid white; background: rgb(84, 83, 83) none repeat scroll 0% 0%; width: 100%; padding: .3vw;" id="autosettings0">Settings</div></div>');

	//Add new css rule
	document.styleSheets[2].insertRule(".settingBtn3 {background-color: #337AB7;}", 84);

	//setup options
	var checking = JSON.parse(localStorage.getItem("autotrimpsave"));
	if (checking != null && checking.version == autoTrimps.version) {
		autoTrimps.settings = checking;
	} else {
		var autoBuildResources = {enabled: 1, description: "Storage", titles: ["Not buying", "Buying"]};
		var autoBuildHouses = {enabled: 1, description: "Housing", titles: ["Not buying", "Buying"]};
		var autoBuildGyms = {enabled: 1, description: "Gyms", titles: ["Not buying", "Buying"]};
		var autoBuildTributes = {enabled: 1, description: "Tributes", titles: ["Not buying", "Buying"]};
		var autoBuildNurseries = {enabled: 3, description: "Nurseries", titles: ["Not buying", "Buying", "Only when above breedTarget", "Only when above breedTarget and cost low"]};
		var autoRead = {enabled: 1, description: "Read", titles: ["Not reading", "Reading"]};
		var autoPrestige = {enabled: 1, description: "Prestige", titles: ["Not prestiging", "Prestiging"]};
		var autoEquip = {enabled: 1, description: "Equip", titles: ["Not buying", "Buying when cheap"]};
		var autoMap = {enabled: 1, description: "Automatically manages everything concerning maps", titles: ["Not managing", "Managing"]};
		var autoFormations = {enabled: 1, description: "Switch formation based on enemy and health", titles: ["Not Switching", "Switching"]};
		var autoGeneticists = {enabled: 1, description: "Genetics to breedTarget", titles: ["Not targeting", "Targeting"]};
		var autoWorkers = {enabled: 1, description: "Trimps work", titles: ["Not jobbing", "Jobbing"]};
		var autoGather = {enabled: 1, description: "Switch between gathering and building", titles: ["Not switching", "Switching"]};
		autoTrimps.settings = {
			version: autoTrimps.version, 
			autoBuildResources: autoBuildResources, 
			autoBuildHouses: autoBuildHouses, 
			autoBuildGyms: autoBuildGyms, 
			autoBuildTributes: autoBuildTributes, 
			autoBuildNurseries: autoBuildNurseries, 
			autoRead: autoRead, 
			autoPrestige: autoPrestige,
			autoEquip: autoEquip,
			autoMap: autoMap,
			autoFormations: autoFormations, 
			autoGeneticists: autoGeneticists, 
			autoWorkers: autoWorkers,
			autoGather: autoGather
		};
	}

	//add buttons
	var autosettings = document.getElementById("autosettings0");
	var html = "";
	for (var item in autoTrimps.settings) {
		if (item != "version") {
			var optionItem = autoTrimps.settings[item]; 
			var text = optionItem.titles[optionItem.enabled]; 
			html += "<div class='optionContainer'><div id='toggle" + item + "' class='noselect settingBtn settingBtn" + optionItem.enabled + "' onclick='toggleAutoSetting(\"" + item + "\")'>" + text + "</div><div class='optionItemDescription'>" + optionItem.description + "</div></div> ";
		}
	}
	autosettings.innerHTML = html;

	//create unlearn shieldblock button
	autosettings.insertAdjacentHTML('beforeend', "<div class='optionContainer'><div id='remove Shieldblock' class='noselect settingBtn btn-warning' onclick='removeShieldblock()'>Unlearn Shieldblock</div><div class='optionItemDescription'>We'll stop teaching the trimps to use shields to block and we'll use them for health again</div></div>");
	document.getElementById("remove Shieldblock").onclick = function(){if (game.upgrades.Shieldblock.done == 1) {prestigeEquipment("Shield", false, true);game.equipment.Shield.blockNow = false;game.equipment.Shield.tooltip = "A big, wooden shield. Adds $healthCalculated$ health to each soldier per level.";levelEquipment("Shield", 1);game.upgrades.Shieldblock.done = 0;}}
	autosettings.insertAdjacentHTML('beforeend', "<div class='optionContainer'><div id='add Respec' class='noselect settingBtn btn-warning' onclick='addRespec()'>Add a Respec</div><div class='optionItemDescription'>If you've already used your respec but want to do it again anyway, let me know.</div></div>");
	document.getElementById("add Respec").onclick = function(){if (game.global.canRespecPerks == false) {game.global.canRespecPerks = true;}}

	update();
	var timer = setInterval(function () { myTimer(); }, 100);
}

function toggleAutoSetting(setting){
	var autoOption = autoTrimps.settings[setting];
	var toggles = autoOption.titles.length;
	if (toggles == 2){
		autoOption.enabled = (autoOption.enabled) ? 0 : 1;
	} else {
		autoOption.enabled++;
		if (autoOption.enabled >= toggles){
			autoOption.enabled = 0;
		}
	}
	if (autoOption.onToggle){
		autoOption.onToggle();
	}
	var menuElem = document.getElementById("toggle" + setting);
	menuElem.innerHTML = autoOption.titles[autoOption.enabled];
	menuElem.className = "";
	menuElem.className = "settingBtn settingBtn" + autoOption.enabled;
}

function refreshSettings() {
	for (var item in autoTrimps.settings) {
		if (item != "version") {
			var autoOption = autoTrimps.settings[item];
			var menuElem = document.getElementById("toggle" + item);
			menuElem.innerHTML = autoOption.titles[autoOption.enabled];
			menuElem.className = "";
			menuElem.className = "settingBtn settingBtn" + autoOption.enabled;
		}
	}
}

function getTime() {
	var date = new Date();
	var hours = date.getHours() + "";
	if (hours.length <= 1) {
		hours = "0" + hours;
	}
	var minutes = date.getMinutes() + "";
	if (minutes.length <= 1) {
		minutes = "0" + minutes;
	}
	var seconds = date.getSeconds() + "";
	if (seconds.length <= 1) {
		seconds = "0" + seconds;
	}
	return hours + ":" + minutes + ":" + seconds;
}

function purchaseBuilding(buildingName) {
	if (canAffordBuilding(buildingName)) {
		if (game.global.buildingsQueue.indexOf(buildingName + ".1") == -1) {
			buyBuilding(buildingName);
			tooltip("hide");
			message(getTime() + " - Build " + buildingName + ".", "Unlocks", "*eye2", "exotic");
			update();
			return true;
		}
	}
	return false;
}

function purchaseUpgrade(upgradeName) {
	if (canAffordTwoLevel(game.upgrades[upgradeName])) {
		if (game.upgrades[upgradeName].allowed > game.upgrades[upgradeName].done) {
			buyUpgrade(upgradeName);
			tooltip("hide");
			message(getTime() + " - Upgraded " + upgradeName + ".", "Unlocks", "*eye2", "exotic");
			update();
			return true;
		}
	}
	return false;
}

function breedTime(genes) {
	var trimps = game.resources.trimps;
	
	if (trimps.owned - trimps.employed < 2 || game.global.challengeActive == "Trapper") {
		return 0;
	}
	
	var potencyMod = trimps.potency;
	potencyMod = potencyMod * (1 + game.portal.Pheromones.level * game.portal.Pheromones.modifier);

	if (game.unlocks.quickTrimps) {
		potencyMod *= 2;
	}
	if (game.global.brokenPlanet) {
		potencyMod /= 10;
	}
	if (game.jobs.Geneticist.owned > 0) {
		potencyMod *= Math.pow(.98, game.jobs.Geneticist.owned);
	}
	
	var multiplier = 1;
	if(genes >= 0) {
		multiplier *= Math.pow(.98, genes);
	} else {
		multiplier *= Math.pow((1/0.98), -genes);
	}
	
	var soldiers = game.portal.Coordinated.level ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
	var numerus = (trimps.realMax() - trimps.employed) / (trimps.realMax() - (soldiers + trimps.employed));
	var base = potencyMod * multiplier + 1;

	return Math.log(numerus)/Math.log(base);
}

function timeTillFull(resourceName) {
	var job = "";
	switch (resourceName) {
		case "food":
			job = "Farmer";
			break;
		case "wood":
			job = "Lumberjack";
			break;
		case "metal":
			job = "Miner";
			break;
		case "trimps":
			var trimps = game.resources.trimps;
			var potencyMod = trimps.potency;
			potencyMod = potencyMod * (1 + game.portal.Pheromones.level * game.portal.Pheromones.modifier);

			if (game.unlocks.quickTrimps) {
				potencyMod *= 2;
			}
			if (game.global.brokenPlanet) {
				potencyMod /= 10;
			}
			if (game.jobs.Geneticist.owned > 0) {
				potencyMod *= Math.pow(.98, game.jobs.Geneticist.owned);
			}

			var soldiers = game.portal.Coordinated.level ? game.portal.Coordinated.currentSend : trimps.maxSoldiers;
			var numerus = (trimps.realMax() - trimps.employed) / (game.resources.trimps.owned - game.resources.trimps.employed);
			var base = potencyMod + 1;

			return Math.log(numerus)/Math.log(base);
		default:
			return "";
	}
	var perSec = resourcePerSecond(job);
	
	if (game.global.playerGathering === resourceName){
		if (game.global.turkimpTimer > 0){
			perSec *= 1.5;
		}
		perSec += game.global.playerModifier;
	}
	
	if (perSec <= 0){
		return 0;
	}
	var remaining = ((game.resources[resourceName].max * (1 + game.portal.Packrat.modifier * game.portal.Packrat.level))) - game.resources[resourceName].owned;
	if (remaining <= 0){
		return 0;
	}
	return Math.floor(remaining / perSec);
}

function resourcePerSecond(job) {
	var perSec = 0;
	if (game.jobs[job].owned > 0){
		perSec = (game.jobs[job].owned * game.jobs[job].modifier);
		if (game.portal.Motivation.level > 0) {
			perSec += (perSec * game.portal.Motivation.level * game.portal.Motivation.modifier);
		}
	}
	return perSec;
}

function getEnemyMaxAttack(zone) {
	var amt = 0;
	var level = 30;
	var world = zone;
	amt += 50 * Math.sqrt(world * Math.pow(3.27, world));
	amt -= 10;
	if (world == 1){
		amt *= 0.35;
		amt = (amt * 0.20) + ((amt * 0.75) * (level / 100));
	} else if (world == 2){
		amt *= 0.5;
		amt = (amt * 0.32) + ((amt * 0.68) * (level / 100));
	} else if (world < 60) {
		amt = (amt * 0.375) + ((amt * 0.7) * (level / 100));
	} else { 
		amt = (amt * 0.4) + ((amt * 0.9) * (level / 100));
		amt *= Math.pow(1.15, world - 59);
	}	

	amt *= 1.1;	
	amt *= game.badGuys["Snimp"].attack;
	return Math.floor(amt);
}

function getEnemyMaxHealth(zone) {
	var amt = 0;
	var level = 30;
	var world = zone;
	amt += 130 * Math.sqrt(world * Math.pow(3.265, world));
	amt -= 110;
	if (world == 1 || world == 2 && level < 10){
		amt *= 0.6;
		amt = (amt * 0.25) + ((amt * 0.72) * (level / 100));
	} else if (world < 60) {
		amt = (amt * 0.4) + ((amt * 0.4) * (level / 110));
	} else {
		amt = (amt * 0.5) + ((amt * 0.8) * (level / 100));
		amt *= Math.pow(1.1, world - 59);
	}
	amt *= 1.1;
	amt *= game.badGuys["Grimp"].health;
	amt *= 0.84;
	return Math.floor(amt);
}

function getMaximalMinDamage() {
	var damage = game.global.soldierCurrentAttack * 2 * (1 + (game.global.achievementBonus / 100)) * ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);

	if (game.global.formation == "0") {
		damage *= 4;
	} else if (game.global.formation != 2) {
		damage *= 8;
	}
	return damage;
}

function update() {
	var tempAmt = game.global.buyAmt;
	var tempState = game.global.firing;
	var tempTooltips = game.global.lockTooltip;
	
	//Building
	game.global.buyAmt = 1;
	var allHousing = ["Mansion", "Hotel", "Resort", "Collector", "Warpstation"];
	var unlockedHousing = [];
	for (house in allHousing) {
		if (game.buildings[allHousing[house]].locked == 0) {
			unlockedHousing.push(allHousing[house]);
		}
	}
	if (unlockedHousing.length) {
		var obj = {};
		for (var house in unlockedHousing) {
			var building = game.buildings[unlockedHousing[house]];
			var cost = 0;
			cost += getBuildingItemPrice(building, "gems");
			var ratio = cost / building.increase.by;
			obj[unlockedHousing[house]] = ratio;
			if (document.getElementById(unlockedHousing[house]).style.border = "1px solid #00CC00") {
				document.getElementById(unlockedHousing[house]).style.border = "1px solid #FFFFFF";
				document.getElementById(unlockedHousing[house]).removeEventListener("click", update);
			}
		}
		var keysSorted = Object.keys(obj).sort(function(a,b){return obj[a]-obj[b]});
		autoTrimps.bestBuilding = keysSorted[0];
		document.getElementById(autoTrimps.bestBuilding).style.border = "1px solid #00CC00";
		document.getElementById(autoTrimps.bestBuilding).addEventListener('click',update,false);
	} else {
		autoTrimps.bestBuilding = null;
	}
	
	//Health
	var allArmor = ["Boots", "Helmet", "Pants", "Shoulderguards", "Breastplate", "Gambeson"];
	var unlockedArmor = [];
	for (var armor in allArmor) {
		if (game.equipment[allArmor[armor]].locked == 0) {
			unlockedArmor.push(allArmor[armor]);
		}
	}
	if (unlockedArmor.length) {
		var obj = {};
		for (var armor in unlockedArmor) {
			var equip = game.equipment[unlockedArmor[armor]];
			var cost = 0;
			cost += getBuildingItemPrice(equip, "metal", true);
			var ratio = cost / equip.healthCalculated;
			obj[unlockedArmor[armor]] = ratio;
			if (document.getElementById(unlockedArmor[armor]).style.border = "1px solid #0000FF") {
				document.getElementById(unlockedArmor[armor]).style.border = "1px solid #FFFFFF";
				document.getElementById(unlockedArmor[armor]).removeEventListener("click", update);
			}
		}
		var keysSorted = Object.keys(obj).sort(function(a,b){return obj[a]-obj[b]});
		autoTrimps.bestArmor = keysSorted[0];
		document.getElementById(autoTrimps.bestArmor).style.border = "1px solid #0000FF";
		document.getElementById(autoTrimps.bestArmor).addEventListener('click',update,false);
	} else {
		autoTrimps.bestArmor = null;
	}
	
	//Damage
	var allWeapons = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
	var unlockedWeapons = [];
	for (var weapon in allWeapons) {
		if (game.equipment[allWeapons[weapon]].locked == 0) {
			unlockedWeapons.push(allWeapons[weapon]);
		}
	}
	if (unlockedWeapons.length) {
		var obj = {};
		for (var weapon in unlockedWeapons) {
			var equip = game.equipment[unlockedWeapons[weapon]];
			var cost = 0;
			cost += getBuildingItemPrice(equip, "metal", true);
			var ratio = cost / equip.attackCalculated;
			obj[unlockedWeapons[weapon]] = ratio;
			if (document.getElementById(unlockedWeapons[weapon]).style.border = "1px solid #FF0000") {
				document.getElementById(unlockedWeapons[weapon]).style.border = "1px solid #FFFFFF";
				document.getElementById(unlockedWeapons[weapon]).removeEventListener("click", update);
			}
		}
		var keysSorted = Object.keys(obj).sort(function(a,b){return obj[a]-obj[b]});
		autoTrimps.bestWeapon = keysSorted[0];
		document.getElementById(autoTrimps.bestWeapon).style.border = "1px solid #FF0000";
		document.getElementById(autoTrimps.bestWeapon).addEventListener('click',update,false);
	} else {
		autoTrimps.bestWeapon = null;
	}
	
	if (game.global.soldierHealth > 0){
		//baseDamage
		autoTrimps.baseDamage = game.global.soldierCurrentAttack * 2 * (1 + (game.global.achievementBonus / 100)) * ((game.global.antiStacks * game.portal.Anticipation.level * game.portal.Anticipation.modifier) + 1);
		if (game.global.formation == 2) {
			autoTrimps.baseDamage /= 4;
		} else if (game.global.formation != "0") {
			autoTrimps.baseDamage *= 2;
		}

		//baseBlock
		autoTrimps.baseBlock = game.global.soldierCurrentBlock;
		if (game.global.formation == 3) {
			autoTrimps.baseBlock /= 4;
		} else if (game.global.formation != "0") {
			autoTrimps.baseBlock *= 2;
		}

		//baseHealth
		autoTrimps.baseHealth = game.global.soldierHealthMax;
		if (game.global.formation == 1) {
			autoTrimps.baseHealth /= 4;
		} else if (game.global.formation != "0") {
			autoTrimps.baseHealth *= 2;
		}
	}

	//remove alerts if they exist
	var removebadge = true;
	var badgeupgrades = document.getElementById("upgradesHere");
	for (var i = 0; i<badgeupgrades.childNodes.length; i++) { 
		if (badgeupgrades.childNodes[i].childNodes[0].innerHTML == "!") {
			removebadge = false;
		}
	}
	if (removebadge) {
		document.getElementById("upgradesAlert").innerHTML = "";
	}
	
	game.global.buyAmt = tempAmt;
	game.global.firing = tempState;
	game.global.lockTooltip = tempTooltips;
}

////////////////////////////////////
//MainFunctions
function aBuildResources() {
	game.global.buyAmt = 1;
	game.global.firing = false;
	
	var food = game.resources.food.owned / (game.resources.food.max + (game.resources.food.max * game.portal.Packrat.modifier * game.portal.Packrat.level));
	var foodTime = timeTillFull("food");
	if (food > 0.9 || (foodTime != "" && foodTime < 600)) {
		purchaseBuilding("Barn");
	}

	var wood = game.resources.wood.owned / (game.resources.wood.max + (game.resources.wood.max * game.portal.Packrat.modifier * game.portal.Packrat.level));
	var woodTime = timeTillFull("wood");
	if (wood > 0.9 || (woodTime != "" && woodTime < 600)) {
		purchaseBuilding("Shed");
	}

	var metal = game.resources.metal.owned / (game.resources.metal.max + (game.resources.metal.max * game.portal.Packrat.modifier * game.portal.Packrat.level));
	var metalTime = timeTillFull("metal");
	if (metal > 0.9 || (metalTime != "" && metalTime < 600)) {
		purchaseBuilding("Forge");
	}
}

function aBuildHouses() {
	game.global.buyAmt = 1;
	game.global.firing = false;
	
	if (autoTrimps.bestBuilding != null){
		var nextStationAt = 20 + 2 * game.upgrades.Gigastation.done;
		if (game.buildings.Warpstation.owned >= nextStationAt) {
			purchaseUpgrade("Gigastation");
		} else {
			purchaseBuilding(autoTrimps.bestBuilding);
		}

		var grMansion = getBuildingItemPrice(game.buildings.Mansion, "food") / game.buildings.Mansion.increase.by;
		var grHouse = getBuildingItemPrice(game.buildings.House, "food") / game.buildings.House.increase.by;
		var grHut = getBuildingItemPrice(game.buildings.Hut, "food") / game.buildings.Hut.increase.by;
		if (grMansion > grHouse) {
			purchaseBuilding("House");
		}
		if (grMansion > grHut) {
			purchaseBuilding("Hut");
		}
	} else if (!game.buildings.House.locked) {
		grHouse = getBuildingItemPrice(game.buildings.House, "food") / game.buildings.House.increase.by;
		grHut = getBuildingItemPrice(game.buildings.Hut, "food") / game.buildings.Hut.increase.by;
		if (grHouse < grHut) {
			purchaseBuilding("House");
		} else {
			purchaseBuilding("Hut");
		}
	} else {
		purchaseBuilding("Hut");
	}
	if (game.buildings.Gateway.locked == 0) {
		if (game.buildings.Gateway.owned < 40)  {
			purchaseBuilding("Gateway");
		}
	}
	if (game.buildings.Wormhole.locked == 0) {
		if (game.buildings.Wormhole.owned < 20)  {
			purchaseBuilding("Wormhole");
		}
	}
}

function aBuildGyms() {
	game.global.buyAmt = 1;
	game.global.firing = false;
	
	if (!game.buildings.Gym.locked) {
		purchaseBuilding("Gym");
	}
}

function aBuildTributs() {
	game.global.buyAmt = 1;
	game.global.firing = false;
	
	if (!game.buildings.Tribute.locked) {
		purchaseBuilding("Tribute");
	}
}

function aBuildNurseries() {
	if (!game.buildings.Nursery.locked) {
		game.global.buyAmt = 35;
		if ((autoTrimps.settings.autoBuildNurseries.enabled == 1) || 
				(autoTrimps.settings.autoBuildNurseries.enabled == 2 && breedTime(0) > autoTrimps.breedTarget.value) || 
				(autoTrimps.settings.autoBuildNurseries.enabled == 3 && breedTime(0) > autoTrimps.breedTarget.value && canAffordBuilding("Nursery"))) {
			game.global.buyAmt = 1;
			purchaseBuilding("Nursery");
		}
	}
}

function aRead() {
	if (game.upgrades.Coordination.allowed > game.upgrades.Coordination.done) {
		if (canAffordCoordinationTrimps()){
			if (purchaseUpgrade('Coordination')) {
				if (game.global.mapsUnlocked) {
					if (game.global.switchToMaps) {
						mapsClicked();
					} else {
						mapsClicked();
						mapsClicked();
					}
				}
			}
		}
	}
	var upgrades = ["Efficiency", "TrainTacular", "Gymystic", "Megascience", "Speedscience", "Megaminer", "Speedminer", "Megafarming", "Speedfarming", "Megalumber", "Speedlumber", "Potency",
					"Egg", "UberHut", "UberHouse", "UberMansion", "UberHotel", "UberResort", "Bounty", "Scientists", "Battle", "Bloodlust", "Blockmaster", "Trainers", "Trapstorm", "Explorers", "Anger",
					"Formations", "Dominance", "Barrier", "Miners"]
	for (var key in game.upgrades) {
		if (upgrades.indexOf(key) != -1) { 
			if (purchaseUpgrade(key)) {
				break;
			}
		}
	}
}

function aPrestige() {
	var allEquip = ["Supershield", "Dagadder", "Bootboost", "Megamace", "Hellishmet", "Polierarm", "Pantastic", "Axeidic", "Smoldershoulder", "Greatersword", "Bestplate", "Harmbalest", "GambesOP"];
	for (var equip in allEquip) {
		if (purchaseUpgrade(allEquip[equip])) {
			break;
		}
	}
}

function aEquip() {
	if (game.global.mapsUnlocked) {
		var obj = {};
		for (var map in game.global.mapsOwnedArray) {
			if (!game.global.mapsOwnedArray[map].noRecycle)
			{
				obj[map] = game.global.mapsOwnedArray[map].level;
			}
		}
		var keysSorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]});
		var highestMap = keysSorted[0];
		if (addSpecials(true, true, game.global.mapsOwnedArray[highestMap]) < 1) {
			var enemyDamage = getEnemyMaxAttack(game.global.world +1);
			var enemyHeath = getEnemyMaxHealth(game.global.world +1);
			var enoughHealth = (autoTrimps.baseHealth*3 > 30* (enemyDamage - autoTrimps.baseBlock/2 > enemyDamage ? enemyDamage - autoTrimps.baseBlock/2 : enemyDamage) || autoTrimps.baseHealth > 30* (enemyDamage - autoTrimps.baseBlock > enemyDamage ? enemyDamage - autoTrimps.baseBlock : enemyDamage));
			var enoughDamage = (autoTrimps.baseDamage*4 > enemyHeath);

			if (!enoughDamage && autoTrimps.bestWeapon != null) {
				if (Math.ceil(parseFloat(getBuildingItemPrice(game.equipment[autoTrimps.bestWeapon], "metal", true)) * (Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level))) < game.resources.metal.owned / 1000) {
					game.global.buyAmt = 1;
					buyEquipment(autoTrimps.bestWeapon);
				}
			}
			if (!enoughHealth && autoTrimps.bestArmor != null) {
				if (Math.ceil(parseFloat(getBuildingItemPrice(game.equipment[autoTrimps.bestArmor], "metal", true)) * (Math.pow(1 - game.portal.Artisanistry.modifier, game.portal.Artisanistry.level))) < game.resources.metal.owned / 1000) {
					game.global.buyAmt = 1;
					buyEquipment(autoTrimps.bestArmor);
				}
			}
		}
	}
}

function aMap() {
	//TODO
	//if not enough damage for next map and cost low buy equip (only when not already waiting on upgrade?)
	//if not enough health for next map and cost low buy equip (only when not already waiting on upgrade?)
	
	if (game.global.mapsUnlocked) {
		var obj = {};
		for (var map in game.global.mapsOwnedArray) {
			if (!game.global.mapsOwnedArray[map].noRecycle)
			{
				obj[map] = game.global.mapsOwnedArray[map].level;
			}
		}
		var keysSorted = Object.keys(obj).sort(function(a,b){return obj[b]-obj[a]});
		var highestMap = keysSorted[0];
		
		var enemyDamage = getEnemyMaxAttack(game.global.world +1);
		var enemyHeath = getEnemyMaxHealth(game.global.world +1);
		var enoughHealth = (autoTrimps.baseHealth*3 > 30* (enemyDamage - autoTrimps.baseBlock/2 > enemyDamage ? enemyDamage - autoTrimps.baseBlock/2 : enemyDamage) || autoTrimps.baseHealth > 30* (enemyDamage - autoTrimps.baseBlock > enemyDamage ? enemyDamage - autoTrimps.baseBlock : enemyDamage));
		var enoughDamage = (autoTrimps.baseDamage*4 > enemyHeath);
		var shouldDoMaps = !enoughHealth || !enoughDamage;
		
		var shouldDoMap = "world";
		
		for (var map in game.global.mapsOwnedArray) {
			if (game.global.mapsOwnedArray[map].noRecycle && addSpecials(true, true, game.global.mapsOwnedArray[map]) == 1) {
				shouldDoMap = game.global.mapsOwnedArray[map].id;
				break;
			}
		}
		
		if (shouldDoMaps) {
			if (shouldDoMap == "world") {
				if (game.global.world == game.global.mapsOwnedArray[highestMap].level) {
					shouldDoMap = game.global.mapsOwnedArray[highestMap].id;
				}
				else {
					shouldDoMap = "create";
				}
			}
		}
		
		if (!game.global.preMapsActive) {
			if (game.global.mapsActive) {
				if (shouldDoMap == game.global.currentMapId && !game.global.mapsOwnedArray[getMapIndex(game.global.currentMapId)].noRecycle) {
					if (!game.global.repeatMap) {
						repeatClicked();
					}
				} else {
					if (game.global.repeatMap) {
						repeatClicked();
					}
				}
			} else if (!game.global.mapsActive) {
				if (shouldDoMap != "world") {
					if (!game.global.switchToMaps) {
						mapsClicked();
					}
				}
			}
		} else if (game.global.preMapsActive) {
			if (shouldDoMap == "world") {
				mapsClicked();
			} else if (shouldDoMap == "create") {
				//TODO optimize buying
				if (game.global.world > 70) {
					sizeAdvMapsRange.value = 9;
					adjustMap('size', 9);
					difficultyAdvMapsRange.value = 9;
					adjustMap('difficulty', 9);
					lootAdvMapsRange.value = 0;
					adjustMap('loot', 0);

					biomeAdvMapsSelect.value = "Mountain";
					updateMapCost();
				} else if (game.global.world < 16) {
					sizeAdvMapsRange.value = 0;
					adjustMap('size', 0);
					difficultyAdvMapsRange.value = 0;
					adjustMap('difficulty', 0);
					lootAdvMapsRange.value = 0;
					adjustMap('loot', 0);

					biomeAdvMapsSelect.value = "Random";
					updateMapCost();
				} else {
					sizeAdvMapsRange.value = 9;
					adjustMap('size', 9);
					difficultyAdvMapsRange.value = 9;
					adjustMap('difficulty', 9);
					lootAdvMapsRange.value = 0;
					adjustMap('loot', 0);

					biomeAdvMapsSelect.value = "Random";
					updateMapCost();
				}
				buyMap();
			} else {
				selectMap(shouldDoMap);
				runMap();
			}
		}
	}
}

function aFormation() {
	var missingHealth = game.global.soldierHealthMax - game.global.soldierHealth;
	var newSquadRdy = game.resources.trimps.realMax() <= game.resources.trimps.owned + 1;

	if (!game.global.mapsActive && !game.global.preMapsActive){
		if (typeof game.global.gridArray[game.global.lastClearedCell + 1] === 'undefined') {
			var enemy = game.global.gridArray[0];
		} else {
			var enemy = game.global.gridArray[game.global.lastClearedCell + 1];
		}
		var enemyFast = game.badGuys[enemy.name].fast;
		var enemyHealth = enemy.health;
		var enemyDamage = enemy.attack * 1.19;
		var dDamage = enemyDamage - autoTrimps.baseBlock/2 > enemyDamage*0.2 ? enemyDamage - autoTrimps.baseBlock/2 : enemyDamage*0.2;
		var xDamage = enemyDamage - autoTrimps.baseBlock > enemyDamage*0.2 ? enemyDamage - autoTrimps.baseBlock : enemyDamage*0.2;
		var bDamage = enemyDamage - autoTrimps.baseBlock*4 > enemyDamage*0.1 ? enemyDamage - autoTrimps.baseBlock*4 : enemyDamage*0.1;
	} else if (game.global.mapsActive && !game.global.preMapsActive) {
		if (typeof game.global.mapGridArray[game.global.lastClearedMapCell + 1] === 'undefined') {
			var enemy = game.global.mapGridArray[0];
		} else {
			var enemy = game.global.mapGridArray[game.global.lastClearedMapCell + 1];
		}
		var enemyFast = game.badGuys[enemy.name].fast;
		var enemyHealth = enemy.health;
		var enemyDamage = enemy.attack * 1.19;
		var dDamage = enemyDamage - autoTrimps.baseBlock/2 > 0 ? enemyDamage - autoTrimps.baseBlock/2 : 0;
		var xDamage = enemyDamage - autoTrimps.baseBlock > 0 ? enemyDamage - autoTrimps.baseBlock : 0;
		var bDamage = enemyDamage - autoTrimps.baseBlock*4 > 0 ? enemyDamage - autoTrimps.baseBlock*4 : 0;
	}

	if (!game.global.preMapsActive) {
		if (!enemyFast && game.upgrades.Dominance.done && enemyHealth < autoTrimps.baseDamage * (game.global.titimpLeft > 0 ? 4 : 2) && (newSquadRdy || autoTrimps.baseHealth/2 - missingHealth > 0)) {
			if (game.global.formation != 2) {
				setFormation(2);
			}
		} else if (game.upgrades.Dominance.done && ((newSquadRdy && autoTrimps.baseHealth/2 > dDamage) || autoTrimps.baseHealth/2 - missingHealth > dDamage)) {
			if (game.global.formation != 2) {
				setFormation(2);
			}
		} else if (game.upgrades.Formations.done && ((newSquadRdy && autoTrimps.baseHealth > xDamage) || autoTrimps.baseHealth - missingHealth > xDamage)) {
			if (game.global.formation != "0") {
				setFormation("0");
			}
		} else if (game.upgrades.Barrier.done && ((newSquadRdy && autoTrimps.baseHealth/2 > bDamage) || autoTrimps.baseHealth/2 - missingHealth > bDamage)) {
			if (game.global.formation != 3) {
				setFormation(3);
			}
		} else {
			if (game.global.formation != 1) {
				setFormation(1);
			}
		}
	}
}

function aGeneticists() {
	game.global.buyAmt = 1;
	game.global.firing = false;
	
	if(!game.jobs["Geneticist"].locked) {
		if (!(breedTime(0) > autoTrimps.breedTarget.value)) {
			if (canAffordJob("Geneticist", false, game.global.buyAmt)){
				game.global.firing = true;
				buyJob("Lumberjack");
				game.global.firing = false;
				buyJob("Geneticist");
				tooltip("hide");
				update();
			}
		}
		if (breedTime(-1) > autoTrimps.breedTarget.value) {
			if (game.jobs.Geneticist.owned > 0) {
				game.global.firing = true;
				buyJob("Geneticist");
				tooltip("hide");
				game.global.firing = false;
				update();
			}
		} 
	}
}

function aWorkers() {
	if (timeTillFull("trimps") < breedTime(0)+1) {
		if (!game.jobs.Trainer.locked && game.jobs.Trainer.owned <=699 && Math.floor((game.jobs.Trainer.cost.food[0] * Math.pow(game.jobs.Trainer.cost.food[1], game.jobs.Trainer.owned)) * ((Math.pow(game.jobs.Trainer.cost.food[1], 1) - 1) / (game.jobs.Trainer.cost.food[1] - 1))) < game.resources.food.owned / 1000){
			game.global.buyAmt = 1;
			game.global.firing = true;
			buyJob("Lumberjack");
			game.global.firing = false;
			buyJob("Trainer");
			tooltip("hide");
		}

		if (!game.jobs.Explorer.locked && game.jobs.Explorer.owned <=199 && Math.floor((game.jobs.Explorer.cost.food[0] * Math.pow(game.jobs.Explorer.cost["food"][1], game.jobs.Explorer.owned)) * ((Math.pow(game.jobs.Explorer.cost.food[1], 1) - 1) / (game.jobs.Explorer.cost.food[1] - 1))) < game.resources.food.owned / 1000){
			game.global.buyAmt = 1;
			game.global.firing = true;
			buyJob("Lumberjack");
			game.global.firing = false;
			buyJob("Explorer");
			tooltip("hide");
		}

		if (game.jobs.Scientist.owned > 0 && game.jobs.Farmer.owned > 1000000) {
			game.global.buyAmt = game.jobs.Scientist.owned;
			game.global.firing = true;
			buyJob("Scientist");
			game.global.firing = false;
		}

		var maxemployed = Math.ceil(game.resources.trimps.realMax() / 2);
		if (maxemployed >= game.resources.trimps.owned - 1) {
			maxemployed = game.resources.trimps.owned - 2;
		}
		var workspaces = maxemployed - game.resources.trimps.employed;
		if (workspaces > 0) {
			game.global.buyAmt = Math.ceil(workspaces*0.1);
			if (game.global.buyAmt > game.resources.trimps.employed) {
				game.global.buyAmt = game.resources.trimps.employed;
			}
			if (game.jobs.Farmer.owned > 1000000) {
				// if more than 1000000 farmers allocate 3:1:4
				if (game.jobs.Farmer.owned < game.jobs.Lumberjack.owned * 3 && game.jobs.Farmer.owned * 4 < 2 * game.jobs.Miner.owned) {
					buyJob("Farmer");
					tooltip("hide");
				} else if (game.jobs.Lumberjack.owned * 4 < game.jobs.Miner.owned * 1) {
					buyJob("Lumberjack");
					tooltip("hide");
				} else {
					buyJob("Miner");
					tooltip("hide");
				}
			} else if (game.jobs.Farmer.owned > 100000) {
				// if more than 100000 farmers allocate 3:3:5
				if (game.jobs.Scientist.owned * 3 < game.jobs.Miner.owned) {
					game.global.buyAmt = Math.ceil(game.global.buyAmt*0.1);
					buyJob("Scientist");
					tooltip("hide");
				} else if (game.jobs.Farmer.owned * 3 < game.jobs.Lumberjack.owned * 3 && game.jobs.Farmer.owned * 5 < 3 * game.jobs.Miner.owned) {
					buyJob("Farmer");
					tooltip("hide");
				} else if (game.jobs.Lumberjack.owned * 5 < game.jobs.Miner.owned * 3) {
					buyJob("Lumberjack");
					tooltip("hide");
				} else {
					buyJob("Miner");
					tooltip("hide");
				}
			} else if (game.jobs.Farmer.owned < 100){
				if (game.resources.trimps.owned > game.resources.trimps.realMax()*0.9) {
					game.global.buyAmt = 1;
					if (game.jobs.Lumberjack.owned < game.jobs.Farmer.owned){
						buyJob("Lumberjack");
						tooltip("hide");
					} else {
						buyJob("Farmer");
						tooltip("hide");
					}
				}
			} else {
				// if less than  100000 farmers allocate 1:1:1
				if (game.jobs.Scientist.owned * 3 < game.jobs.Miner.owned) {
					game.global.buyAmt = Math.ceil(game.global.buyAmt*0.1);
					buyJob("Scientist");
					tooltip("hide");
				} else if (game.jobs.Farmer.owned < game.jobs.Lumberjack.owned && game.jobs.Farmer.owned < game.jobs.Miner.owned) {
					buyJob("Farmer");
					tooltip("hide");
				} else if (game.jobs.Lumberjack.owned < game.jobs.Miner.owned) {
					buyJob("Lumberjack");
					tooltip("hide");
				} else  if(game.jobs.Miner.locked == 0){
					buyJob("Miner");
					tooltip("hide");
				}
			}
		}
	}
}

function aGather() {
	if (game.global.buildingsQueue.length > 0 && !game.global.buildingsQueue[0].startsWith("Trap")) {
		if (game.global.playerGathering != "buildings") {
			setGather("buildings");
		}
	} else if (game.global.turkimpTimer > 0) {
		var farmer = resourcePerSecond("Farmer");
		var lumberjack = resourcePerSecond("Lumberjack");
		var miner = resourcePerSecond("Miner");
		if (farmer >= lumberjack && farmer >= miner) {
			if (game.global.playerGathering != "food") {
				setGather("food");
			}
		} else if (miner >= farmer && miner >= lumberjack) {
			if (game.global.playerGathering != "metal") {
				setGather("metal");
			}
		} else if (lumberjack >= farmer && lumberjack >= miner) {
			if (game.global.playerGathering != "wood") {
				setGather("wood");
			}
		}
	} else {
		setGather("science");
	}
}

////////////////////////////////////
//BaseLoop
function myTimer(){
	update();
	
	if (document.getElementById("autotrimp").style.display == "block"){
		 return;
	}

	if (game.global.gridArray.length == 0) {
		autoTrimps.trigger1 = false;
		autoTrimps.trigger2 = false;
		autoTrimps.trigger3 = false;
		purchaseUpgrade("Battle");
	}
	if (!autoTrimps.trigger1 && game.global.world <= 59) {
		refreshSettings();
		autoTrimps.trigger1 = true;
	} else if (!autoTrimps.trigger2 && game.global.world > 59) {
		refreshSettings();
		autoTrimps.trigger2 = true;
	} else if (!autoTrimps.trigger3 && game.global.world > 70) {
		refreshSettings();
		autoTrimps.trigger3 = true;
	}
	
	if (game.global.autoBattle) {
		if (!game.global.pauseFight) {
			pauseFight();
		}
	}
	if (!game.global.fighting && game.global.gridArray.length != 0 && (game.resources.trimps.realMax() <= game.resources.trimps.owned + 1) || game.global.soldierHealth > 0 || breedTime(0) < 2) {
		fightManual();
	}
	
	var tempAmt = game.global.buyAmt;
	var tempState = game.global.firing;
	var tempTooltips = game.global.lockTooltip;
	
	if (autoTrimps.settings.autoBuildResources.enabled != 0) {
		aBuildResources();
	}
	
	if (autoTrimps.settings.autoBuildHouses.enabled != 0) {
		aBuildHouses();
	}
	
	if (autoTrimps.settings.autoBuildGyms.enabled != 0) {
		aBuildGyms();
	}
	
	if (autoTrimps.settings.autoBuildTributes.enabled != 0) {
		aBuildTributs();
	}
	
	if (autoTrimps.settings.autoBuildNurseries.enabled != 0) {
		aBuildNurseries();
	}
	
	if (autoTrimps.settings.autoRead.enabled != 0) {
		aRead();
	}
	
	if (autoTrimps.settings.autoPrestige.enabled != 0) {
		aPrestige();
	}
	
	if (autoTrimps.settings.autoEquip.enabled != 0) {
		aEquip();
	}
	
	if (autoTrimps.settings.autoMap.enabled != 0) {
		aMap();
	}
	
	if (autoTrimps.settings.autoFormations.enabled != 0) {
		aFormation();
	}
	
	if (autoTrimps.settings.autoGeneticists.enabled != 0) {
		aGeneticists();
	}
	
	if (autoTrimps.settings.autoWorkers.enabled != 0) {
		aWorkers();
	}
	
	if (autoTrimps.settings.autoGather.enabled != 0) {
		aGather();
	}
	
	game.global.buyAmt = tempAmt;
	game.global.firing = tempState;
	game.global.lockTooltip = tempTooltips;
	
	//save
	localStorage.setItem("autotrimpsave",JSON.stringify(autoTrimps.settings));
}