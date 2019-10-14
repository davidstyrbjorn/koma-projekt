import React from 'react'

var fs = require('browserify-fs');
let global = "";

function createNewCharacter(name, initial_max_xp){

    // Used as file name
    let hashedName = name;

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

function getCharacterFromJSON(file_name){
    let character_data = "COEXIST";

    /*
    let res = fs.readFile(file_name + ".json", 'utf-8', function(err, data){
        console.log(JSON.parse(data));
    });
    */
    fs.readFile('Gandalf.json', 'utf-8', function(err, data) { 
        if(err)
            throw err;

        global = data;
    });

    return character_data;
}

function Persistence(){
    
    /*
    fs.writeFile('hello-world.txt', 'Coke No More');

    fs.readFile('hello-world.txt', 'utf-8', function(err, data){
        console.log(data);
    });
    */

    //createNewCharacter("Gandalf", 10);

    let character = getCharacterFromJSON("Gandalf");
    //console.log(character);

    return (
        <div>
            <p>Persistence</p>
        </div>
    )
}

export default Persistence;