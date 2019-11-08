import React from 'react';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";
import "../style/CharacterSelect.css"

/* Character Select Screen */
 
function CharaccterSelectOption(props){

    // This is the individual character that pops up for the user to click on, used in CharacterSelect()

    // Props up a Link tag that links to the character page with correct context 
    return(
        <div className="characterOption">
            <Link to={"/character_page/" + props.name}> 
                {props.name} 
            </Link>
            <button onClick={ e => {props.removeCallback(props.name)} }>X</button>
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
    let removeCharacter = name => {
        // Takeout the desired character from the big character list!
        characters.splice(characters.findIndex(c => c.name === name), 1);
        // Write the new character list to the JSON file 
        writeCharactersToJSON(characters, setHasSaved);
    }
    
    return (
        <div className="CharacterSelect">
            <h2>Welcome to character selection!</h2>
           
            {characters.map((c,i) => {
                return( <CharaccterSelectOption key={i} name={c.name} removeCallback = {removeCharacter} />);
            })}
                
            <p> <Link to="/character_creation/">Create Character</Link> </p>
        </div>
    );
}

export default CharacterSelect;