var autoTSettings = {};
var version = "1.00.00";

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
if (checking != null && checking.versioning == version) {
	autoTSettings = checking;
}
else {
	var autoBuildResources = {enabled: 1, description: "Storage", titles: ["Not Buying", "Buying"]};
	var autoBuildHouses = {enabled: 1, description: "Housing", titles: ["Not Buying", "Buying"]};
	var autoBuildGym = {enabled: 1, description: "Gyms", titles: ["Not Buying", "Buying"]};
	var autoBuildTributes = {enabled: 1, description: "Tributes", titles: ["Not Buying", "Buying"]};
	var autoBuildNurseries = {enabled: 1, description: "Nurseries", titles: ["Not Buying", "Buying"]};
	var autoRead = {enabled: 1, description: "Read", titles: ["Not Reading", "Reading"]};
	var autoPrestige = {enabled: 1, description: "Prestige", titles: ["Not Prestiging", "Prestiging"]};
	var autoWorkers = {enabled: 1, description: "Trimps Work", titles: ["Not Jobbing", "Jobbing"]};
	var autoGather = {enabled: 1, description: "Switch between gathering and building", titles: ["Not Switching", "Switching"]};
	var autoContinue = {enabled: 1, description: "From PreMaps to World", titles: ["Not Switching", "Switching"]};
	var autoStartMap = {enabled: 1, description: "Start a Map", titles: ["Not Starting", "Starting every Zone", "Starting every 3 Zone", "Starting every 5 Zone","Starting every 10 Zone"]};
	var autoEndMap = {enabled: 1, description: "Leave Map", titles: ["Not leaving", "Leaving when max Mapbonus","Leaving when no upgrades left"]};
	var autoGeneticists = {enabled: 1, description: "Genetics to breedspeed", titles: ["Not targeting", "Targeting 30s", "Targeting 1.5s"]};
	var autoFormations = {enabled: 1, description: "Switch formation based on enemy", titles: ["Not Switching", "Switching"]};
	autoTSettings = {versioning: version, autoBuildResources: autoBuildResources, autoBuildHouses: autoBuildHouses, autoBuildGym: autoBuildGym, autoBuildTributes: autoBuildTributes, autoBuildNurseries: autoBuildNurseries, autoRead: autoRead, autoPrestige: autoPrestige, autoWorkers: autoWorkers, autoGather: autoGather, autoContinue: autoContinue, autoStartMap: autoStartMap, autoEndMap: autoEndMap, autoGeneticists: autoGeneticists, autoFormations: autoFormations};
}

//add buttons
var autosettings = document.getElementById("autosettings0");
var html = "";
for (var item in autoTSettings) {
	if (item != "versioning") {
		var optionItem = autoTSettings[item]; 
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

var timer = setInterval(function () { myTimer(); }, 1000);

function toggleAutoSetting(setting){
	var autoOption = autoTSettings[setting];
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

function myTimer(){
	
}