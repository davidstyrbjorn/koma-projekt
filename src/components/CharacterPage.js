import React from 'react'
import Modal from 'react-modal';

import '../style/CharacterPage.css'

import { getCharactersFromJSON, writeCharactersToJSON, findIndexWithAttribute, createItemObject, createStatObject } from "../characters_utility";

Modal.setAppElement('#root'); // Modal needs to know this for some complicated reason

function CharacterHeader(props){

    let character = props.character;

    let updateHP = (dir) => {
        character.hp += dir;
        props.updatedCharacter(character);
    }

    let updateXP = (dir) => {
        character.xp += dir;
        if(character.xp >= character.max_xp){
            character.level++;
            character.xp = 0;
        }
        if(character.xp < 0){
            if(character.level > 0){
                character.level--;
                character.xp = character.max_xp - 1; 
            }
            if(character.xp < 0){
                character.xp = 0;
        }
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
            <button onClick={ () => updateXP(-1) }>-</button> 
            <button onClick={ () => updateXP(1) }>+</button> 
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

    /* FILTER STATS */
    const [searchString, setSearchString] = React.useState("");
    let filteredStats = props.character.stats;
    if(searchString !== ""){

        let keys = ['name', 'type'];

        filteredStats = filteredStats.filter(entry => {
            let returnValue = false;
            keys.forEach(key => {
                if(entry[key].toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1){
                    returnValue = true;
                }
            });
            return returnValue;
        });
    }

    // This gets called from a button within the add new stat modal!
    let addNewStat = () => {
        // Create the object using function from character_utility.js
        let newStatObject = createStatObject(newStatName, newStatLevel, newStatType);
        // Push and update the character with the new stat
        props.character.stats.push(newStatObject);
        props.updatedCharacter(props.character);
        // Close the add new stat modal!
        closeModal();
    }

    return (
        <div className="Stats">
            <h3>Stats Page!</h3>

            {/* DISPLAY BASE STATS */}
            {props.character.base_stats.map((base_stat, j) =>{
                return < BaseStatCard key={j} base_stat={base_stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}
            
            <button onClick={() => openModal()}>Add New Stat!</button>

            {/* SEARCH AND DISPLAY STATS */}
            <input type="text" placeholder={"stat"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredStats.map((stat, i) => {
                return < StatCard key={i} stat={stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            {/* MODAL FOR ADDING A NEW STAT */}
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
        props.character.inventory.splice(props.character.inventory.findIndex(s => s.name === props.item.name), 1);
        props.updatedCharacter(props.character);
        closeModal();
    }

    let item = props.item;

    return (
        <div className="ItemCard">                       
            <p onClick={() => openModal()} >Name: {props.item.name} </p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >                       
                <input type="text" value={item.}></input>

                <p>{item.cost}</p>
                <p>{item.amount}</p>
                <p>{item.desc}</p>
                <p>{item.type}</p>

                <button onClick = {removeItem}>Remove</button>

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            
        </div>
    );
}

function Inventory(props){

    const [newItemName, setNewItemName] = React.useState("");
    const [newItemDesc, setNewItemDesc] = React.useState("");
    const [newItemType, setNewItemType] = React.useState("");
    const [newItemAmount, setNewItemAmount] = React.useState("");
    const [newItemCost, setNewItemCost] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false); // Modal used for adding new stat!

    // Operating the modal
    let openModal = () => { setModalOpen(true); }
    let closeModal = () => {setModalOpen(false); }

    // This gets called from a button within the add new item modal!
    let addNewItem = () => {
        // CharacterUtillity function
        let newItemObject = createItemObject(newItemName, newItemCost, newItemAmount, newItemDesc, newItemType);
        // Push and update the character with the new item
        props.character.inventory.push(newItemObject);
        props.updatedCharacter(props.character);
        // Close the add new item modal
        closeModal();
    }

    /* FILTER INVENTORY */
    const [searchString, setSearchString] = React.useState("");
    let filteredInventory = props.character.inventory;
    if(searchString !== ""){
        let keys = ['name', 'type', 'desc', 'cost'];
        filteredInventory = filteredInventory.filter(entry => {
            let returnValue = false;
            keys.forEach(key => {
                if(entry[key].toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1){
                    returnValue = true;
                }
            });
            return returnValue;
        });
    }

    return (
        <div className="Inventory">
            <h3>Inventory Page!</h3>

            <button onClick={openModal}>Add New Item</button>

            {/* DISPLAY THE FILTERED INVENTORY USING ITEM CARD COMPONENT */}
            <input type="text" placeholder={"inventory"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredInventory.map((item, i) => {
                return <ItemCard key={i} item={item} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            {/* MODAL FOR ADDING A NEW STAT */}
            <Modal
                isOpen = {modalOpen}
                onRequestClose = {() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >       
                <form>
                    <input type="text" placeholder="Item Name" onChange={e => {setNewItemName(e.target.value)}}></input>
                    <input type="text" placeholder="Description" onChange={e => {setNewItemDesc(e.target.value)}}></input>
                    <input type="number" placeholder="Amount" onChange={e => {setNewItemAmount(e.target.value)}}></input>                    
                    <input type="cost" placeholder="Cost" onChange={e => {setNewItemCost(e.target.value)}}></input>
                    <select name="Type" onChange={e => {setNewItemType(e.target.value)}} >
                        <option value="Weapon">Weapon</option>
                    </select>
                </form>
                <button onClick = {() => addNewItem()}>Add</button>
                <button onClick={() => closeModal()}>Close</button>
            </Modal>
        </div>
    )
}

function CombatCard(props){
    const [modalOpen, setModalOpen] = React.useState(false);

    let openModal = () => {
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="CombatCard">
            <p onClick={() => openModal()}> Name: {props.combat.name} :
            {props.combat.value != null && props.combat.value}
            {props.combat.type != null && <p>Saving throws</p>}
            {props.combat.maximum != null && <p> Maximum: {props.combat.maximum}</p>}
            {props.combat.total != null && <p> Total: {props.combat.total}</p>}
            {props.combat.successes != null && <p> Successes: {props.combat.successes} Failiures: {props.combat.failures}</p>}
            </p>
            <Modal
                isOpen = {modalOpen}
                onRequestClose = {() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >{props.combat.name}</Modal> 
        </div>
    );
}

function Combat(props){

    /* FILTER COMBAT */
    const [searchString, setSearchString] = React.useState("");
    let filteredCombat = props.character.combat;
    if(searchString !== ""){

        let keys = ['name'];

        filteredCombat = filteredCombat.filter(entry => {
            let returnValue = false;
            keys.forEach(key => {
                if(entry[key].toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1){
                    returnValue = true;
                }
            });
            return returnValue;
        });
    }

    return(
        <div>
            <h3>Combat Page!</h3>

            <input type="text" placeholder={"combat"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredCombat.map((combat, i) => {
                return <CombatCard key={i} combat={combat} />
            })}
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