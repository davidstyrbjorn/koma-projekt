import React from 'react'
import '../style/CharacterPage.css'

import { getCharactersFromJSON } from "../characters_utility";

function CharacterHeader(props){

    let character = props.character;
    
    return(
        <div className="CharacterHeader">
            <h2> {character.name} <sup>Lv.{character.level}</sup> </h2>
            <button onClick={() => props.setCurrentPage("stats")}>Stats</button>
            <button onClick={() => props.setCurrentPage("inventory")}>Inventory</button>
            <button onClick={() => props.setCurrentPage("combat")}>Combat</button>
        </div>
    )
}

function Stats(props){

    const [searchString, setSearchString] = React.useState("");
    const [addingStat, setAdddnigStat] = React.useState(false);
                        
    let filteredStats = props.character.stats;
    if(searchString !== ""){
        // Filter out some stats
        filteredStats = filteredStats.filter(stat => {
            return (stat.type.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || stat.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
        })
    }

    return (
        <div>
            <p>Stats Page!</p>

            <input type="text" placeholder="Search" value={searchString} onChange={e => {setSearchString(e.target.value)}}></input>

            {filteredStats.map((stat, i) => {
                return <p key={i}>Name: {stat.name} <br></br> Level: {stat.level}</p>
            })}

            <button onClick={() => setAdddnigStat(true)}>+</button>
            
        </div>
    );
}

function Inventory(props){

    return (
        <div>
            <p>Inventory Page!</p>
            {props.character.inventory.map((item, i) =>{
                return <p key={i}>Name: {item.name} <br></br> Description: {item.desc}</p>
            })}
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
    
    if(hasLoaded) {
        let character = characters.find(c => c.name === match.params.name);
        console.log(character);
        if(currentPage === "stats"){
            return(
                <div>
                    <CharacterHeader character={character} setCurrentPage={setCurrentPage}/>
                    <Stats character={character} />
                </div>
            )
        }
        else if(currentPage === "inventory"){
            return(
                <div>
                    <CharacterHeader character={character} setCurrentPage={setCurrentPage}/>
                    <Inventory character={character}/>
                </div>
            )
        }
        else if(currentPage === "combat"){
            return(
                <div>
                    <CharacterHeader character={character} setCurrentPage={setCurrentPage}/>
                    <Combat character={character}/>
                </div>
            )
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