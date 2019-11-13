import React from 'react'
import { BrowserRouter as Switch, Redirect } from "react-router-dom";

import "../style/CharacterCreation.css"

// JSON and Character related functions
import {getBaseCharacter, getCharactersFromJSON, writeCharactersToJSON, findIndexWithAttribute} from '../characters_utility'

function CharacterCreation(){

    // States for the new characters data
    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(0);
    const [campaignName, setCampaignName] = React.useState("");

    // States used for knowing when we've loaded and saved to JSON
    const [doneSavingCharacters, setDoneSavingCharacters] = React.useState(false);
    const [hasLoaded, setLoaded] = React.useState(false);

    // State hook for the characters
    let [characters, setCharacters] = React.useState([]);

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);
    
    let handleSubmit = (e) => {
        // Create the character
        let newCharacter = getBaseCharacter(characterName, initMapXP, campaignName);
        // Make sure we're not creating a character that already has characterName!
        let index = findIndexWithAttribute(characters, "name", characterName);
        if(index === -1){
            newCharacter.ID = characters.length; //give char an uniqe ID
            characters.push(newCharacter);
            writeCharactersToJSON(characters, setDoneSavingCharacters);
        }
    }

    // This is set by the callback when we're done writing the new character to our JSON character file
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