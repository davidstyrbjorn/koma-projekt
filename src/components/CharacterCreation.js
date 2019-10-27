import React from 'react'
import { BrowserRouter as Switch, Redirect } from "react-router-dom";

import "../style/CharacterCreation.css"

import {getBaseCharacter, getCharactersFromJSON, writeCharactersToJSON} from '../characters_utility'

function CharacterCreation(){

    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(0);
    const [campaignName, setCampaignName] = React.useState("");

    const [doneSavingCharacters, setDoneSavingCharacters] = React.useState(false);
    const [hasLoaded, setLoaded] = React.useState(false);

    // State hook for the characters
    let [characters, setCharacters] = React.useState([]);

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);

    let handleSubmit = (e) => {
        let newCharacter = getBaseCharacter(characterName, initMapXP, campaignName);
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
                    <input type="text" name="name" value={characterName} placeholder="Name" onChange={e => setCharacterName(e.target.value)} />
                </label>
                <br></br>
                <label>
                    <p>Initial Max XP</p> 
                    <input type="number" name="init_max_xp" value={initMapXP} onChange={ e => setInitMaxXP(e.target.value)} />
                </label>
                <label>
                    <p>Campaign Name</p>
                    <input type="text" name="campaign_name" value={campaignName} placeholder="Campaign Name" onChange={e => setCampaignName(e.target.value)} />
                </label>
                <br></br>
            </form>

            <button onClick={handleSubmit}>Create</button>

        </div>

    );

}

export default CharacterCreation;