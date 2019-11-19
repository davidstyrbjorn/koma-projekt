import React from 'react'
import Modal from 'react-modal';

import '../style/CharacterPage.css'

import { getCharactersFromJSON, writeCharactersToJSON, findIndexWithAttribute, createItemObject } from "../characters_utility";
import Search from './Search';

Modal.setAppElement('#root'); // Modal needs to know this for some complicated reason

function CharacterHeader(props){

    let character = props.character;

    let updateHP = (dir) => {
        character.hp += dir;
        props.updatedCharacter(character);
    }

    let updateXP = () => {
        character.xp++;
        if(character.xp >= character.max_xp){
            character.level++;
            character.xp = 0;
        }

        props.updatedCharacter(character);
    }
    
    return(
        <div className="CharacterHeader">

            <h2> 
                {character.name} 
                <sup>Lv.{character.level}</sup>
            </h2>

            <p>HP: {character.hp}</p>  
            <button onClick={ () => updateHP(-1) }>-</button>
            <button onClick={ () => updateHP(1) }>+</button> 

            <p>XP: {character.xp}</p>
            <button onClick={ () => updateXP() }>+</button> 
            <br></br>

            <button onClick={() => props.setCurrentPage("stats")}>Stats</button>
            <button onClick={() => props.setCurrentPage("inventory")}>Inventory</button>
            <button onClick={() => props.setCurrentPage("combat")}>Combat</button>
        </div>
    )
}

function BaseStatCard(props){

    const [modalOpen, setModalOpen] = React.useState(false); // Flag to know if we want to manipulate the stat?

    let openModal = () => {
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }

    let changeStatLevel = dir => {
        // Manipulate the stat and call the callback for updating the character!
        props.character.base_stats.find(s => s.name === props.base_stat.name).level += dir;
        props.updatedCharacter(props.character);
    }

    return(
        <div className="BaseStatCard">
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <h2>{props.base_stat.name}</h2>
                <p>{props.base_stat.level}</p>

                <button onClick={() => changeStatLevel(-1)}>-</button>
                <button onClick={() => changeStatLevel(1)}>+</button>                

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            <p onClick={() => openModal()}>{props.base_stat.name} <br></br> {props.base_stat.level}</p>
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

    let removeStat = () => {
        props.character.stats.splice(props.character.stats.findIndex(s => s.name === props.stat.name), 1);
        props.updatedCharacter(props.character);
        closeModal();
    }

    
    return (
        <div className="StatCard">

            <p onClick={() => openModal()} >Name: {props.stat.name} <br></br> Level: {props.stat.level}</p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <h2>{props.stat.name}</h2>
                <p>{props.stat.level}</p>

                <button onClick={() => changeStatLevel(-1)}>-</button>
                <button onClick={() => changeStatLevel(1)}>+</button>
                <button onClick={() => removeStat()}>Remove</button>

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            
        </div>
    );
}

function Stats(props){

    // States used for adding a new stat
    const [newStatName, setNewStatName] = React.useState("");
    const [newStatType, setNewStatType] = React.useState("");
    const [newStatLevel, setNewStatLevel] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false); // Modal used for adding new stat!

    // Operating the modal
    let openModal = () => { setModalOpen(true); }
    let closeModal = () => {setModalOpen(false); }

    const [displayedStats, setDisplayedStats] = React.useState(props.character.stats);

    // This gets called from a button within the add new stat modal!
    let addNewStat = () => {
        // Create the object using function from character_utility.js
        let newStatObject = createItemObject(newStatName, newStatLevel, newStatType);
        // Push and update the character with the new stat
        props.character.stats.push(newStatObject);
        props.updatedCharacter(props.character);
        // Close the add new stat modal!
        closeModal();
    }

    let keys = ['name', 'type', 'baseType'];

    return (
        <div className="Stats">
            <p>Stats Page!</p>
            {props.character.base_stats.map((base_stat, j) =>{
                return < BaseStatCard key={j} base_stat={base_stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            <Search list = {props.character.stats} keys={ keys } listCallback={setDisplayedStats} placeholder={"name/type/base"}/>

            {displayedStats.map((stat, i) => {
                return < StatCard key={i} stat={stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            <Modal
                isOpen = {modalOpen}
                onRequestClose = {() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <form>
                    <input type="text" placeholder="Stat Name" onChange={e => {setNewStatName(e.target.value)}}></input>
                    <select name="Type" onChange={e => {setNewStatType(e.target.value)}} >
                        <option value="skill">Skill</option>
                        <option value="language">Lanauge</option>
                        <option value="trait">Trait</option>
                    </select>
                    <input type="number" placeholder="Stat Level" onChange={e => {setNewStatLevel(e.target.value)}}></input>                    
                </form>

                <button onClick = {() => addNewStat()}>Add</button>
                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            <button onClick={() => openModal()}>Add New Stat!</button>
            
        </div>
    );
}

function ItemCard(props){

    const [modalOpen, setModalOpen] = React.useState(false); // Flag to know if we want to manipulate the stat?

    let openModal = () => {
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }

    let removeItem = () => {
        props.character.stats.splice(props.character.inventory.findIndex(s => s.name === props.item.name), 1);
        props.updatedCharacter(props.character);
        closeModal();
    }

    return (
        <div className="ItemCard">

            <p onClick={() => openModal()} >Name: {props.item.name} </p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <h2>{props.item.name}</h2>

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            
        </div>
    );
}

function Inventory(props){

    const [displayedInventory, setdisplayedInventory] = React.useState(props.character.inventory);
    
    let keys = ['name', 'desc', 'type']

    return (
        <div>
            <p>Inventory Page!</p>

            <Search list={props.character.inventory} keys={keys} listCallback={setdisplayedInventory} placeholder={"name/desc/type"} />

            {displayedInventory.map((item, i) =>{
                return <ItemCard key={i} item={item} character={props.character} updatedCharacter={props.updatedCharacter} />
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
                    <Stats character={character} updatedCharacter={updatedCharacter} />
                </div>
            )
        }
        else if(currentPage === "inventory"){
            return(
                <div>
                    <CharacterHeader character={character} setCurrentPage={setCurrentPage}/>
                    <Inventory character={character} updatedCharacter={updatedCharacter} />
                </div>
            )
        }
        else if(currentPage === "combat") {
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