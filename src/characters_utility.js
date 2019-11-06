var fs = require('browserify-fs');

export function getBaseCharacter(name, initial_max_xp, campaign_name){
    var obj = {
        "name": name,
        "hp": 100,
        "level": 0,
        "xp": 0,
        "max_xp": initial_max_xp,
        "campaign_name": campaign_name,
        "base_stats" : [
            { "strength": 0 },
            { "dexterity": 0 },
            { "constitution": 0 },
            { "intelligence:": 0},
            { "wisdom": 0},
            { "charisma": 0 }
        ],
        "stats":[
            
			{"name": "Class", "text": "Best class" , "type": "traits"},
			{"name": "Level", "level" : 1 , "type": "traits"},
			{"name": "Background" , "text": "Cool background", "type": "traits"},
			{"name": "Player Name" , "text": "Me" ,"type": "traits"},
			{"name": "Race" , "text": "Best race" ,"type": "traits"},
			{"name": "Alignment" , "text": "Everything" ,"type": "traits"},
			{"name": "Experience points" , "value": 0 ,"type": "traits"},
			{"name": "Personality traits" , "text": "just good ones" ,"type": "traits"},
			{"name": "Ideals" , "text": "You can guess" ,"type": "traits"},
			{"name": "Bonds" , "text": "Who knows" ,"type": "traits"},
			{"name": "Flaws" , "text": "None" ,"type": "traits"},
			{"name": "Features and Traits" , "text": "Some boring stuff" ,"type": "traits"},
			{"name": "Inspiration" , "level": 0 ,"type": "skill"},
			{"name": "Proficiency Bonus" , "level": 0 ,"type": "skill"},
			{"name": "Passive Wisdom (Perception)" , "level": 0 ,"type": "skills"},
			{"name": "English" , "level": 0 ,"type": "language", "baseType": "None"},
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
        ],
        "inventory":[
            {"name": "Copper (cp)", "amount": 0, "type": "currency"},
			{"name": "Silver (sp)", "amount": 0, "type": "currency"},
			{"name": "Electrum (ep)", "amount": 0, "type": "currency"},
			{"name": "Gold (gp)", "amount": 0, "type": "currency"},
			{"name": "Platinum (pp)", "amount": 0, "type": "currency"},
			{"name": "Bread", "desc": "Eatable bread, gives hp and stuff", "type": "Food"},
            {"name": "Sword", "desc": "Sharp sword that could cut warm butter", "type": "Weapon"},
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
    return -85490; // We failed
}