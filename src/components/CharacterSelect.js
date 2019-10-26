import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";
import "../style/CharacterSelect.css"

/* Character Select Screen */
 
function CharaccterSelectOption(props){

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

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);

    // Remove callback
    let removeCharacter = name => {
        characters.splice(characters.findIndex(c => c.name == name), 1);
        writeCharactersToJSON(characters, () => {} );
        setLoaded(false);
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