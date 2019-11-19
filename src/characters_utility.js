var fs = require('browserify-fs');

export function getBaseCharacter(name, initial_max_xp, campaign_name){
    var obj = {
        "name": name,
        "hp": 100,
        "level": 0,
        "xp": 0,
        "max_xp": initial_max_xp,
		"campaign_name": campaign_name,

		// Currency 
		"copper": 0,
		"silver": 0,
		"electrum": 0,
		"gold": 0,
		"platinum": 0,

		// Other information 
		"core_info":[
			{"name": "Class", "text": "Best class" , "type": "traits"},
			{"name": "Background" , "text": "Cool background", "type": "traits"},
			{"name": "Race" , "text": "Best race" ,"type": "traits"},
			
			{"name": "Inspiration" , "level": 0 ,"type": "skill" },
			{"name": "Proficiency Bonus" , "level": 0 ,"type": "skill"},
			{"name": "Alignment" , "text": "Everything" ,"type": "traits"},
			
			{"name": "Personality traits" , "text": "just good ones" ,"type": "traits"},
			{"name": "Ideals" , "text": "You can guess" ,"type": "traits"},
			{"name": "Bonds" , "text": "Who knows" ,"type": "traits"},
			{"name": "Flaws" , "text": "None" ,"type": "traits"},
		],
		"base_stats" : [
            { "name": "strength", "level": 0 },
            { "name": "dexterity", "level": 0 },
            { "name": "constitution", "level": 0 },
            { "name": "intelligence", "level": 0},
            { "name": "wisdom", "level": 0},
            { "name": "charisma", "level": 0 },
        ],
        "stats":[
			{"name": "Acrobatics", "level": 0, "type": "skill", "baseType": "Dexterity" },
			{"name": "Animal Handling", "level": 0, "type": "skill", "baseType": "Wisdom" },
			{"name": "Arcana", "level": 0, "type": "skill", "baseType": "Intelligence" },
			{"name": "Athletics", "level": 0, "type": "skill", "baseType": "Strength" },
			{"name": "Deception", "level": 0, "type": "skill", "baseType": "Charisma" },
			{"name": "History", "level": 0, "type": "skill", "baseType": "Intelligence" },
			{"name": "Insight", "level": 0, "type": "skill", "baseType": "Wisdom" },
			{"name": "Intimidation", "level": 0, "type": "skill", "baseType": "Charisma" },
			{"name": "Investigation", "level": 0, "type": "skill", "baseType": "Intelligence" },
			{"name": "Medicine", "level": 0, "type": "skill", "baseType": "Wisdom" },
			{"name": "Nature", "level": 0, "type": "skill", "baseType": "Intelligence" },
			{"name": "Perception", "level": 0, "type": "skill", "baseType": "Wisdom" },
			{"name": "Performance", "level": 0, "type": "skill", "baseType": "Charisma" },
			{"name": "Persuasion", "level": 0, "type": "skill", "baseType": "Charisma" },
			{"name": "Religion", "level": 0, "type": "skill", "baseType": "Intelligence" },
			{"name": "Sleight of Hand", "level": 0, "type": "skill", "baseType": "Dexterity" },
			{"name": "Stealth", "level": 0, "type": "skill", "baseType": "Dexterity" },
			{"name": "Survival", "level": 0, "type": "skill", "baseType": "Wisdom" },

			{"name": "Passive Wisdom (Perception)" , "level": 0 ,"type": "skills", "baseType": "None" },
			{"name": "English" , "level": 0 ,"type": "language", "baseType": "None "},
        ],
        "inventory":[
			{"name": "Equipment template", "cost": "cost in whatever" , "amount": 0, "desc": "some text", "type": "equipment"},
        ],
		"combat":[ 
			{"name": "Strength", "value": 0, "type": "savingThrows" },
			{"name": "Dexterity", "value": 0, "type": "savingThrows" },
			{"name": "Constitution", "value": 0, "type": "savingThrows" },
			{"name": "Intelligence", "value": 0, "type": "savingThrows" },
			{"name": "Wisdom", "value": 0, "type": "savingThrows" },
			{"name": "Charisma", "value": 0, "type": "savingThrows" },
			{"name": "Armour Class", "value": 0 },
			{"name": "Initiative", "value": 0 },
			{"name": "Speed", "value": 0 },
			{"name": "Current Hit Points", "value": 0, "maximum": 0 },
			{"name": "Temporary Hit Points", "value": 0 , "maximum": 0 },
			{"name": "Hit Dice", "value": 0 , "total": 0 },
			{"name": "Death Saves", "successes": 0, "failures": 0},
			{"name": "Spell template", "spellName": "blabla", "atkBonus": 0, "damage": 9, "type": "fire", "desc": "This spell does this"},
        ],
    };

    return obj;
}

export function getCharactersFromJSON(callback, flagCallback) {

    fs.exists("characters.json", function(exists){
        if(!exists){
            console.log("Create characters.json file!");
            fs.writeFile("characters.json", [], 'utf8', err => {
                if(err) throw err;
            })
        }else{
            console.log("characters.json already created, loading characters");
            fs.readFile("characters.json", 'utf8', function(err, data){
                if(err) throw err;
                callback(JSON.parse(data));
                flagCallback(true);
            });
        }
    });
}

export async function writeCharactersToJSON(characters, flagCallback){
    await fs.writeFile("characters.json", JSON.stringify(characters), 'utf8', err => {
        if(err) throw err;

        flagCallback(true);
    });
}

export function findIndexWithAttribute(array, attr, value){
    for(let i = 0; i < array.length; i++){
        if(array[i][attr] === value){
            return i;
        }
    }
    return -1; // We failed
}

export function createItemObject(name, level, type){
	let newStatObject = {
		name: name,
		level: level,
		type: type,
		baseType: "none"
	};
	return newStatObject;
}