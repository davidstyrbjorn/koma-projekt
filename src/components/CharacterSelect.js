import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";
import "../style/CharacterSelect.css"

/* Character Select Screen */
 
function CharaccterSelectOption(props){

    return(
        <div className="characterOption">
            <Link to="/">
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
        characters.splice(characters.indexOf(c => {
            if(c.name == name) return true;
            return false;
        }))
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

// <button onClick={e => {
//     fs.writeFile("characters.json", JSON.stringify(characters), 'utf8', err => {
//         if(err) throw err;
//     })
// }}>Save</button>
export default CharacterSelect;