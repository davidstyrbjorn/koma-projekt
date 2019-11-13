import React from 'react'
import Modal from 'react-modal';

import '../style/CharacterPage.css'

import { getCharactersFromJSON, writeCharactersToJSON, findIndexWithAttribute } from "../characters_utility";
import { Module } from 'module';

Modal.setAppElement('#root'); // Modal needs to know this for some complicated reason

function CharacterHeader(props){

    let character = props.character;
    
    return(
        <div className="CharacterHeader">
            <h2> {character.name} 
                <sup>
                    Lv.{character.level}<button onClick={e => {character.level--; props.updatedCharacter(character)}}>-</button> <button onClick={e => {character.level++; props.updatedCharacter(character)}}>+</button>
                </sup>
            </h2>
            <p>{character.hp}</p> 
            <button onClick={e => {
                character.hp++;
                props.updatedCharacter(character);
            }}>+</button> 
            
            <button onClick={e => {
                character.hp--;
                props.updatedCharacter(character);
            }}>-</button>

            <button onClick={() => props.setCurrentPage("stats")}>Stats</button>
            <button onClick={() => props.setCurrentPage("inventory")}>Inventory</button>
            <button onClick={() => props.setCurrentPage("combat")}>Combat</button>
        </div>
    )
}

function BaseStatCard(props){
    console.log(props);
    return(
        <div className="BaseStatCard">
            <p>{props.base_stat.name} <br></br> {props.base_stat.level}</p>
        </div>
    );
}

function StatCard(props){

    const [modalOpen, setModalOpen] = React.useState(false); // Flag to know if we want to manipulate the stat?

    let openModal = () => {
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }

    let changeStatLevel = dir => {
        // Manipulate the stat and call the callback for updating the character!
        props.character.stats.find(s => s.name === props.stat.name).level += dir;
        props.updatedCharacter(props.character);
    }

    return (
        <div className="StatCard">
            
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
            >
                <h2>{props.stat.name}</h2>
                <p>{props.stat.level}</p>

                <button onClick={() => changeStatLevel(-1)}>-</button>
                <button onClick={() => changeStatLevel(1)}>+</button>
                <button>Remove</button>

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            
            <p onClick={() => openModal()} >Name: {props.stat.name} <br></br> Level: {props.stat.level}</p>
        </div>
    );
}

function Stats(props){

    const [searchString, setSearchString] = React.useState("");
    const [addingStat, setAdddnigStat] = React.useState(false);

    

    // States used for adding a new stat
    const [newStatName, setNewStatName] = React.useState("");
    const [newStatType, setNewStatType] = React.useState("");
    const [newStatLevel, setNewStatLevel] = React.useState(0);

                
    let filteredStats = props.character.stats;
    if(searchString !== ""){
        // Filter out some stats
        filteredStats = filteredStats.filter(stat => {
            return (
                   stat.type.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 
                || stat.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
                || stat.baseType.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            );
        })
    }

    let getAddingBar = () => {
        if(addingStat){
            return (
                <div className="StatsAddNew">
                    <form>
                        <input type="text" placeholder="Stat Name" onChange={e => {setNewStatName(e.target.value)}}></input>
                        <select name="Type" onChange={e => {setNewStatType(e.target.value)}} >
                            <option value="skill">Skill</option>
                            <option value="language">Lanauge</option>
                            <option value="trait">Trait</option>
                        </select>
                        <input type="number" placeholder="Stat Level" onChange={e => {setNewStatLevel(e.target.value)}}></input>
                        
                        <br></br>
                    </form>
                
                    <button onClick={() => {
                        let newStatObject = {
                            name: newStatName,
                            level: newStatLevel,
                            type: newStatType,
                        }
                        props.character.stats.push(newStatObject);
                        props.updatedCharacter(props.character);
                        setAdddnigStat(false);
                    }}>Add</button>
                    <button onClick={() => setAdddnigStat(false)}>Cancel</button>
                </div>
            );
        }else {
            return <button onClick={() => setAdddnigStat(true)}>Add New Stat</button>
        }
    }

    return (
        <div className="Stats">
            <p>Stats Page!</p>
            {props.character.base_stats.map((base_stat, j) =>{
                return < BaseStatCard key={j} base_stat={base_stat} />
            })}
            { getAddingBar() }            

            <input type="text" placeholder="Search" value={searchString} onChange={e => {setSearchString(e.target.value)}}></input>

            {filteredStats.map((stat, i) => {
                return < StatCard key={i} stat={stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}
            
        </div>
    );
}

function Inventory(props){

    const [searchString, setSearchString] = React.useState("");

    let filteredInventory = props.character.inventory;
    if(searchString !== ""){
        // Filter out some stats
        filteredInventory = filteredInventory.filter(item => {
            return (item.type.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
        })
    }

    return (
        <div>
            <p>Inventory Page!</p>

            <input type="text" placeholder="Search" value={searchString} onChange={e => {setSearchString(e.target.value)}}></input>

            {filteredInventory.map((item, i) =>{
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
    let [character, setCharacter] = React.useState(null);

    const [hasSaved, setHasSaved] = React.useState(false);

    // Used to display which page we're currently on
    const [currentPage, setCurrentPage] = React.useState("stats");

    let updatedCharacter = (character) => {
        let index = findIndexWithAttribute(characters, 'ID', character.ID);

        characters[index] = character;
        writeCharactersToJSON(characters, setHasSaved);

        setCharacter(character);
    }

    if(hasSaved){
        setHasSaved(false);
    }

    if(hasLoaded) {
        
        character = (characters.find(c => c.ID.toString() === match.params.ID));    

        if(currentPage === "stats"){
            return(
                <div>
                    <CharacterHeader character={character} setCurrentPage={setCurrentPage} updatedCharacter={updatedCharacter} />
                    <Stats character={character} character={character} updatedCharacter={updatedCharacter} />
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