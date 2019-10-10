import React from 'react'
var fs = require('fs');

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function createNewCharacter(name, initial_max_xp){

    console.log("Create New Character");

    // Used as file name
    let hashedName = name.hashCode();

    // Create the javascript object we want to JSON-ify
    var obj = {
        "name": name,
        "hp": 100,
        "xp": 0,
        "max_xp": initial_max_xp,
        "base_stats" : [
            { "strength": 0 },
            { "dexterity": 0 },
            { "constitution": 0 },
            { "intelligence:": 0},
            { "wisdom": 0},
            { "charisma": 0 }
        ],
        "stats":[
            {"name": "animal handling", "level": 0, "type": "skills"},
            {"name": "spanish", "level": 0, "type": "language"}
        ]
    }

    // Stringify to JSON format
    var json = JSON.stringify(obj);

    fs.writeFile(hashedName + ".json", json, 'utf8', err => {
        if(err) throw err;
    })
}

function Persistence(){

    //console.log(Characters);

    createNewCharacter("Gandalf The Gray", 10);

    return (
        <div>
            
        </div>
    )
}

export default Persistence;