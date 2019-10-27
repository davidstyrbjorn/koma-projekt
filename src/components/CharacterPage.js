import React from 'react'
import '../style/CharacterPage.css'

import { getCharactersFromJSON } from "../characters_utility";

function CharacterHeader(props){

    let character = props.character;
    
    
    return(
        <div className="CharacterHeader">
            <p>HEADER!</p>
            <button onClick={() => props.setCurrentPage("stats")}>Stats</button>
            <button onClick={() => props.setCurrentPage("inventory")}>Inventory</button>
            <button onClick={() => props.setCurrentPage("combat")}>Combat</button>
        </div>
    )
}

function Stats(props){

    console.log(props.character);

    return (
        <div>
            <p>Stats Page!</p>

        </div>
    );
}

function Inventory(props){

    return (
        <div>
            <p>Inventory Page!</p>
        </div>
    )
}

function Combat(props){

    return(
        <div>
            <p>Combat Page!</p>
        </div>
    )
}

function CharacterPage({ match }){

    // State hook for the characters
    const [characters, setCharacters] = React.useState([]);
    const [hasLoaded, setLoaded] = React.useState(false);

    // Used to display which page we're currently on
    const [currentPage, setCurrentPage] = React.useState("stats");
    
    let character = characters.find(c => c.name === match.params.name);
    console.log(character);

    if(hasLoaded){
        if(currentPage === "stats"){
            return(<div><CharacterHeader character={character} setCurrentPage={setCurrentPage}/><Stats/></div>)
        }
        else if(currentPage === "inventory"){
            return(<div><CharacterHeader setCurrentPage={setCurrentPage}/><Inventory/></div>)
        }
        else if(currentPage === "combat"){
            return(<div><CharacterHeader setCurrentPage={setCurrentPage}/><Combat/></div>)
        }else{
            return(
                <div>
                    Something went wrong
                </div>
            )
        }
        
    }else{
        getCharactersFromJSON(setCharacters, setLoaded); // Load the characters!
        return(
            <div>
                Loading Character
            </div>
        );
    }
}

export default CharacterPage;