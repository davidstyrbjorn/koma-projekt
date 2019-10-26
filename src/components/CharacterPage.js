import React from 'react'
import '../style/CharacterPage.css'

import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";

function CharacterHeader(props){

    let character = props.character;

    return(
        <div className="CharacterHeader">
            <p>HEADER!</p>
            
            <button onClick={props.setCurrentPage("stats")}>Stats</button>
            <button onClick={props.setCurrentPage("inventory")}>Inventory</button>
            <button onClick={props.setCurrentPage("combat")}>Combat</button>
        </div>
    )
}

function Stats(props){

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

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);

    let character = characters.find(c => c.name === match.params.name);
    console.log(currentPage);

    if(hasLoaded){
        if(currentPage === "stats"){
            return(<div><CharacterHeader setCurrentPage={setCurrentPage}/><Stats/></div>)
        }
        else if(currentPage === "inventory"){
            return(<div><CharacterHeader setCurrentPage={setCurrentPage}/><Inventory/></div>)
        }
        else if(currentPage == "combat"){
            return(<div><CharacterHeader setCurrentPage={setCurrentPage}/><Combat/></div>)
        }else{
            return(
                <div>
                    Something went wrong
                </div>
            )
        }
        
    }else{
        return(
            <div>
                Loading Character
            </div>
        );
    }
}

export default CharacterPage;