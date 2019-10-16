import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getCharactersFromJSON } from "../characters_utility";

/* Character Select Screen */
 
function CharaccterSelectOption(props){

    return(
        <div>
            <Link to={"/character/" + props.name}>
                <li>
                    {props.name} 
                </li>
            </Link>
        </div>
    );
}

function CharacterSelect(){

    // State hook for the characters
    let [characters, setCharacters] = React.useState([]);
    
    // Get the characters
    if(characters.length < 1)
        getCharactersFromJSON(setCharacters);

    console.log(characters);
    
    return (
        <div>
            <h2>Welcome to character selection!</h2>
            <ul>
                {characters.map((c,i) => {
                    return <CharaccterSelectOption key={i} name={c.name} />
                })}
            </ul>
                
            <p>
            <Link to="/character_creation/">Character Selection</Link>
            </p>

        </div>
    );
}

// <button onClick={e => {
//     fs.writeFile("characters.json", JSON.stringify(characters), 'utf8', err => {
//         if(err) throw err;
//     })
// }}>Save</button>
export default CharacterSelect;