//images for character class
import elfImg from './elf.png'
import cyclopsImg from './cyclops.png'
import mageImg from './mage.png'
import minotaurImg from './minotaur.png'
import orcImg from './orc.png'

//Images for baseStats
import constitutionImg from './constitution_color.png'
import intelligenceImg from './Intelligence_color.png'
import strengthImg from './Strength_color.png'
import wisdomImg from './wisdom_color.png'

var fs = require('browserify-fs');

export function getBaseCharacter(name, initial_max_hp, initial_max_xp, campaign_name, class_name){
    var obj = {
        "name": name,
		"hp": parseInt(initial_max_hp),
		"max_hp": parseInt(initial_max_hp),
		"temporary_hp": 0,
        "level": 1,
        "xp": 0,
        "max_xp": parseInt(initial_max_xp),       
		"campaign_name": campaign_name,
		"class_name": class_name,
		// Currency 
		"copper": 0,
		"silver": 0,
		"electrum": 0,
		"gold": 0,
		"platinum": 0,
		// Other information 
		"core_info":[
			{"name": "Background" , "text": "Cool background", "type": "traits"},
			{"name": "Race" , "text": "Best race" ,"type": "traits"},

			{"name": "Proficiency Bonus" , "level": 0 ,"type": "skill"},
			{"name": "Alignment" , "text": "Everything" ,"type": "traits"},
			
			{"name": "Personality traits" , "text": "just good ones" ,"type": "traits"},
			{"name": "Ideals" , "text": "You can guess" ,"type": "traits"},
			{"name": "Bonds" , "text": "Who knows" ,"type": "traits"},
			{"name": "Flaws" , "text": "None" ,"type": "traits"},
		],
		"base_stats" : [
            { "name": "strength", "level": 0 },
            { "name": "dexterity", "level": 0  },
            { "name": "constitution", "level": 0 },
            { "name": "intelligence", "level": 0 },
            { "name": "wisdom", "level": 0, },
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
		"combats":[ 
			{"name": "Strength", "value": 0, "type": "savingThrows" },
			{"name": "Dexterity", "value": 0, "type": "savingThrows" },
			{"name": "Constitution", "value": 0, "type": "savingThrows" },
			{"name": "Intelligence", "value": 0, "type": "savingThrows" },
			{"name": "Wisdom", "value": 0, "type": "savingThrows" },
			{"name": "Charisma", "value": 0, "type": "savingThrows" },

			{"name": "Armour Class", "value": 0 },
			{"name": "Initiative", "value": 0 },
			{"name": "Speed", "value": 0 },
			{"name": "Hit Dice", "value": 0 , "total": 0 },
			{"name": "Death Saves", "successes": 0, "failures": 0},
		],
    };

    return obj;
}

export async function deleteAllCharacters(){
	//await fs.writeFile("characters.json", [], 'utf8');
	await fs.unlink("characters.json");
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

export function createStatObject(name, level, type){
	let newStatObject = {
		name: name,
		level: parseInt(level),
		type: type,
		baseType: "none"
	};
	return newStatObject;
}

export function createItemObject(name, cost, amount, desc, type){
	let newItemObject = {
		name: name,
		cost: cost,
		amount: parseInt(amount),
		desc: desc,
		type: type
	};
	return newItemObject;
}

export function getSupportedClasses(){
	return ["Mage", "Elf", "Orc", "Cyclops"];
}

// Reducer to get image name from 
export function getCharacterImage(className){
	switch(className.toLowerCase()){
		case 'mage':
			return mageImg;
		case 'cyclops':
			return cyclopsImg;
		case 'elf':
			return elfImg;
		case 'minotaur':
			return minotaurImg;
		case 'orc':
			return orcImg;
		default:
			return mageImg;
	}
}
export function getBaseStatImage(statName){
	switch(statName.toLowerCase()){
		case 'strength':
			return strengthImg;
		case 'intelligence':
			return intelligenceImg;
		case 'wisdom':
			return wisdomImg;
		case 'constitution':
			return constitutionImg;
		/*case 'dexterity':
			return dexterityImg;
		case 'charisma':
			return charismaImg;*/
		default:
			return mageImg;
	}
}