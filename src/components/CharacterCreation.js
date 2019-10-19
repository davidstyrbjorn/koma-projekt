import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import "../style/CharacterCreation.css"

import {getBaseCharacter, getCharactersFromJSON, writeCharactersToJSON} from '../characters_utility'

function CharacterCreation(){

    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(0);

    const [doneSavingCharacters, setDoneSavingCharacters] = React.useState(false);

    // State hook for the characters
    let [characters, setCharacters] = React.useState([]);
    // Get the characters
    if(characters.length < 1)
        getCharactersFromJSON(setCharacters);

    let handleSubmit = (e) => {
        let newCharacter = getBaseCharacter(characterName, initMapXP);
        characters.push(newCharacter);
        writeCharactersToJSON(characters, setDoneSavingCharacters);
    }

    if(doneSavingCharacters){
        return <Redirect to="/"/>
    }

    return(

        <div className="CharacterCreation">
            <h2>Welcome to character creation!</h2>

            <form>
                <label>
                    <p>Character Name</p> 
                    <input type="text" name="name" value={characterName} onChange={e => setCharacterName(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <p>Initial Max XP</p> 
                    <input type="number" name="init_max_xp" value={initMapXP} onChange={ e => setInitMaxXP(e.target.value)} />
                </label>
                <br></br>
            </form>

            <button onClick={handleSubmit}>Create</button>

        </div>

    );

}

export default CharacterCreation;