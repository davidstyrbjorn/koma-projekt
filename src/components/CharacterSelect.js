import React from 'react';

import { BrowserRouter as Switch, Link } from "react-router-dom";
import { getCharacterImage, getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";
import "../style/CharacterSelect.css";

import CharacterCreation from './CharacterCreation';
import HeaderStartPage from "./HeaderStartPage.js";

import Orc from '../orc.png'

/* Character Select Screen */

function CharacterSelectOption(props){

    // This is the individual character that pops up for the user to click on, used in CharacterSelect()
    // Props up a Link tag that links to the character page with correct context
    return(
        <div className="characterOption">
			<img src={getCharacterImage(props.character.class_name)} alt="placeholder"/>
			<Link to={"/character_page/" + props.character.ID}>
                <h3>{props.character.name}</h3>
                <h5>Campaign: {props.character.campaign_name}</h5>
            </Link>
            <button onClick={ e => {props.removeCallback(props.character.ID)} }>X</button>        
        </div>
    );
}

function CharacterSelect(){

    // State hook for the characters
    const [characters, setCharacters] = React.useState([]);
    const [hasLoaded, setLoaded] = React.useState(false);
    const [hasSaved, setHasSaved] = React.useState(false);

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);
    if(hasSaved)
        setHasSaved(false);

    // Remove callback
    let removeCharacter = ID => {
        // Takeout the desired character from the big character list!
        characters.splice(characters.findIndex(c => c.ID === ID), 1);
        // Write the new character list to the JSON file
        writeCharactersToJSON(characters, setHasSaved);
    }

    return (
        <div>
        <nav>
            <p>...</p>
            <h2>Scroll</h2>
            <a>...</a>
        </nav>

        <div className="wrapper">
            <div className="CharacterSelect">
                <h3>Select Character:</h3>
                <div className="characterList">
                    
                    {characters.length == 0 && <h2>You have no characters!</h2>}
                    
                    {characters.map((c,i) => {
                        return( <CharacterSelectOption key={i} character={c} removeCallback = {removeCharacter} />);
                    
                    })}
                </div>

				<div className="createNew">
                    <CharacterCreation characters={characters} setCharacters={setCharacters} setHasSaved={setHasSaved} />
                </div>
            </div>
        </div>
        </div>
    );
}

export default CharacterSelect;
