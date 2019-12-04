import React from 'react'
import Modal from 'react-modal';

import '../style/CharacterPage.css'

import {BrowserRouter as Switch, Link} from "react-router-dom";

import { getBaseStatImage, getCharacterImage, getCharactersFromJSON, writeCharactersToJSON, findIndexWithAttribute, createItemObject, createStatObject } from "../characters_utility";
import ScrollToTop from './ScrollToTop.js'

Modal.setAppElement('#root'); // Modal needs to know this for some complicated reason

let itemTypes = ["Weapon", "Potion", "Misc"];

function CharacterHeader(props){

    let character = props.character;

    let updateHP = (dir) => {
        character.hp += parseInt(dir);
        props.updatedCharacter(character);
    }

    let updateMaxHP = (dir) => {
        character.max_hp += parseInt(dir);
        props.updatedCharacter(character);
    } 

    let updateTemporaryHP = (dir) => {
        character.temporary_hp += parseInt(dir);
        props.updatedCharacter(character);
    }

    let updateXP = (dir) => {
        character.xp += dir;
        props.updatedCharacter(character);
    }

    let updateMaxXP = dir => {
        character.max_xp += (dir);
        props.updatedCharacter(character);
    }

    // Controls for the modal
    const [modalOpen, setModalOpen] = React.useState(false); 
    let openModal = () => { setModalOpen(true); }    
    let closeModal = () => { setModalOpen(false); }

    const [levelUpModalOpen, setLevelUpModalOpen] = React.useState(false);
    let openLevelUpModal = () => { setLevelUpModalOpen(true); }
    let closeLevelUpModal = () => { setLevelUpModalOpen(false); }

    let handleStateClick = e => {
        props.setCurrentPage(e);
    }

    //Krav för temporaryHP ska vissas
    const[showTemp, setShowTemp] = React.useState(false);
    
    let showTemporary = (overflow, temp) => {
        if(overflow > 0 && overflow <= temp) {
            setShowTemp(true);
        }
        else{
            setShowTemp(false);
        }
    }

    return(
        <div className="CharacterHeader">
            <nav>
            <Link to={"/"}> <h2>{"<-"}</h2> </Link>
                <h2>Scroll</h2>
                <p>...</p>
            </nav>
            <div className="section-1">
                <img alt={"Character Error"} src={getCharacterImage(character.class_name)}></img>
                <div className="text">
                    <div>
                        <h2> {character.name} </h2>
                        <h3>Lv.{character.level}</h3>
                        {character.xp >= character.max_xp && <button onClick={e => {openLevelUpModal()} }>Level Up!</button>}
                        {character.hp < character.max_hp + character.temporary_hp && <button onClick={() =>updateHP((character.max_hp + character.temporary_hp) - character.hp)}>Heal To Full Health!</button>}
                    </div>
                    <p>{character.campaign_name}</p>
                </div>
            </div>

            <div className="HP" onClick={e => {openModal()}}>
            <p> HP: {character.hp}/{character.max_hp + character.temporary_hp}</p> 
            <div className="innerHP" style={ showTemp ? {width:(1 - ((character.hp - character.max_hp)/(character.max_hp + character.temporary_hp))) * 100 + "%"} : {width: (character.hp/character.max_hp) * 100 + "%"}}></div> 
            <div className="temporaryHP" style={ showTemp ? {width: ((character.hp - character.max_hp)/(character.max_hp + character.temporary_hp)) * 100 + "%"} : {}}></div>
            </div>
 
            <div className="XP" onClick={e => {openModal()}}>
            <div className="innerXP" style={{width: (character.xp/character.max_xp) * 100 + "%"}}>
            <p> XP: {character.xp}/{character.max_xp}</p></div>
            </div>
                { props.currentPage === "stats" &&
                    <div className="menu">
                        <button className="active" onClick={() => handleStateClick("stats")} >Stats</button>
                        <button onClick={() => handleStateClick("inventory")}>Inventory</button>
                        <button onClick={() => handleStateClick("combat")}>Combat</button>
                    </div>
                }
                { props.currentPage === "inventory" &&
                    <div className="menu">
                        <button onClick={() => handleStateClick("stats")} >Stats</button>
                        <button className="active" onClick={() => handleStateClick("inventory")}>Inventory</button>
                        <button onClick={() => handleStateClick("combat")}>Combat</button>
                    </div>
                }
                { props.currentPage === "combat" &&
                    <div className="menu">
                        <button onClick={() => handleStateClick("stats")} >Stats</button>
                        <button onClick={() => handleStateClick("inventory")}>Inventory</button>
                        <button className="active" onClick={() => handleStateClick("combat")}>Combat</button>
                    </div>
                }

            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <HPAndXPModal updateMaxXP={updateMaxXP} updateXP={updateXP} updateMaxHP={updateMaxHP} updateHP={updateHP} updateTemporaryHP={updateTemporaryHP} showTemporary={showTemporary} character={props.character} /> 
            </Modal>

            <Modal
                isOpen={levelUpModalOpen}
                onRequestClose={() => closeLevelUpModal()}
                className="Modal"
            >
                <LevelUpModal character={character} updatedCharacter={props.updatedCharacter} closeModal={closeLevelUpModal} />
            </Modal>

        </div>
    )
}

function LevelUpModal(props){

    const [increaseMaxXP, setIncreaseMaxXP] = React.useState(0);
    const [increaseMaxHP, setIncreaseMaxHP] = React.useState(0);

    let levelUp = () => {
        // Level up and remove XP
        props.character.level++;
        props.character.xp -= props.character.max_xp;

        // Set new XP
        props.character.max_xp += parseInt(increaseMaxXP);
        props.character.max_hp += parseInt(increaseMaxHP);
        props.character.hp += parseInt(increaseMaxHP);
        
        props.updatedCharacter(props.character);
            
        // Close modal?
        if(props.character.xp < props.character.max_xp)
            props.closeModal();
    }

    return(
        <div className="levelUpModal">
            <h3>Increase XP Cap, Current: {props.character.max_xp}+{increaseMaxXP} </h3>
            <input type="number" placeholder={"Increase XP By"} value={increaseMaxXP} onChange={e => {setIncreaseMaxXP(e.target.value)}}></input>
            
            <h3>Increase HP Cap, Current: {props.character.max_hp}+{increaseMaxHP} </h3>
            <input type="number" placeholder={"Increase HP By"} value={increaseMaxHP} onChange={e => {setIncreaseMaxHP(e.target.value)}}></input>

            <br></br>
            <button onClick={e => {levelUp()}}>Do It!</button>
        </div>
    );
}

function HPAndXPModal(props){

    const [incrementerHP, setIncrementerHP] = React.useState(1); 
    const [incrementerMaxHP, setIncrementerMaxHP] = React.useState(1);
    const [incrementerTemporaryHP, setIncrementerTemporaryHP] = React.useState(1);
    const [incrementerXP, setIncrementerXP] = React.useState(1);
    const [incrementerMaxXP, setIncrementerMaxXP] = React.useState(1);

    let updateHP = dir => {
        if(incrementerHP !== 0){
            if(props.character.hp + incrementerHP*dir <= 0){
                props.updateHP(props.character.hp *dir);
            }
            else{
                props.updateHP(incrementerHP*dir);
            }    
            props.showTemporary((props.character.hp - props.character.max_hp), props.character.temporary_hp);
        }
    }

    let updateMaxHP = dir => {
        if(incrementerMaxHP !== 0){
            if(props.character.max_hp + incrementerMaxHP*dir <= 1){
                props.updateHP((props.character.max_hp -1) *dir);
            }
            else{
            props.updateMaxHP(incrementerMaxHP*dir);
            }
            props.showTemporary((props.character.hp - props.character.max_hp), props.character.temporary_hp);
        }
    }

    let updateTemporaryHP = dir => {
        if(incrementerTemporaryHP !== 0){ //funkar ej logiken är inte fungerande.

            if(props.character.temporary_hp + incrementerMaxHP*dir <= 0){
                if(props.character.hp - props.character.max_hp === props.character.temporary_hp){
                    props.updateHP(props.character.temporary_hp*dir);
                }
                props.updateTemporaryHP(props.character.temporary_hp*dir);
            }
            
            else{
                if(props.character.hp === props.character.max_hp + props.character.temporary_hp){
                    props.updateHP(incrementerTemporaryHP*dir);
                }

            
                props.updateTemporaryHP(incrementerTemporaryHP*dir);
            }
            props.showTemporary((props.character.hp - props.character.max_hp), props.character.temporary_hp);
            
        }
    }

    let updateXP = dir => {
        if(incrementerXP !== 0){
            props.updateXP(incrementerXP*dir);
        }
    }

    let updateMaxXP = dir => {
        if(incrementerMaxXP !== 0){
            props.updateMaxXP(incrementerMaxXP*dir)
        }
    }

    return(
        <div>
            {/* HP Related Things */}
            <h3>HP:</h3>
            <h4>Current HP: {props.character.hp} </h4>
            <input type="number" placeholder="Incrementation" value={incrementerHP} onChange={e => {setIncrementerHP(e.target.value)}}></input>
            <button onClick={e => { updateHP(-1) }}>-</button>
            <button onClick={e => { updateHP(1) }}>+</button>

            <h4>Max HP: {props.character.max_hp} </h4> 
            <input type="number" placeholder="Incrementation" value={incrementerMaxHP} onChange={e => {setIncrementerMaxHP(e.target.value)}}></input>
            <button onClick={e => { updateMaxHP(-1) }}>-</button>
            <button onClick={e => { updateMaxHP(1) }}>+</button>

            <h4>Temporary hp HP: {props.character.temporary_hp} </h4> 
            <input type="number" placeholder="Incrementation" value={incrementerTemporaryHP} onChange={e => {setIncrementerTemporaryHP(e.target.value)}}></input>
            <button onClick={e => { updateTemporaryHP(-1) }}>-</button>
            <button onClick={e => { updateTemporaryHP(1) }}>+</button>

            {/* XP Related Things */}
            <h3>XP:</h3>
            <h4>Current XP: {props.character.xp}</h4>
            <input type="number" placeholder="Incrementation" value={incrementerXP} onChange={e => {setIncrementerXP(e.target.value)}}></input>
            <button onClick={e => { updateXP(-1) }}>-</button>
            <button onClick={e => { updateXP(1) }}>+</button>

            <h4>Max XP: {props.character.max_xp}</h4>
            <input type="number" placeholder="Incrementation" value={incrementerMaxXP} onChange={e => {setIncrementerMaxXP(e.target.value)}}></input>
            <button onClick={e => { updateMaxXP(-1) }}>-</button>
            <button onClick={e => { updateMaxXP(1) }}>+</button>

        </div>
    );
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
        props.character.base_stats.find(s => s.name === props.base_stat.name).level += dir;
        props.updatedCharacter(props.character);
    }

    // Calculate the modifier
    let modifier = Math.floor((props.base_stat.level-10) / 2);

    return(
        <div className="BaseStatCard">
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <h2>{props.base_stat.name}</h2>

                {modifier >= 0 && <p>{props.base_stat.level} + {modifier}</p> }     
                {modifier < 0 &&  <p>{props.base_stat.level} {modifier}</p>}

                <button onClick={() => changeStatLevel(-1)}>-1</button>
                <button onClick={() => changeStatLevel(1)}>+1</button>                

                <button onClick={() => closeModal()}>Close</button>
            </Modal>
            <div className="baseStat" onClick={() => openModal()}>
                <img className="baseStatImage" src={getBaseStatImage(props.base_stat.name)}></img>
                {modifier >= 0 && <div><p>{props.base_stat.level}</p> <p> + {modifier}</p></div>}     
                {modifier < 0 &&  <div><p>{props.base_stat.level}</p> <p>{modifier}</p></div>}
            </div>
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
        <div className="StatCard Card">
            <div onClick={() => openModal()}>
            <p>{props.stat.name} </p><p onClick={() => openModal()}> Lv: {props.stat.level}</p>
            </div>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal modalStatCard"
            >
                <h2>{props.stat.name}</h2>
                <div className="statDisplay">
                    <button onClick={() => changeStatLevel(-1)}>-1</button>
                    <p>{props.stat.level}</p>
                    <button onClick={() => changeStatLevel(1)}>+1</button>
                </div>
                <button className="" onClick={() => removeStat()}>Remove</button>
                <button className="closeCard" onClick={() => closeModal()}>Close</button>
            </Modal>
            
        </div>
    );
}

function Stats(props){

    // States used for adding a new stat
    const [newStatName, setNewStatName] = React.useState("");
    const [newStatType, setNewStatType] = React.useState("skill");
    const [newStatLevel, setNewStatLevel] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false); // Modal used for adding new stat!
    const [errorMessages, setErrorMessages] = React.useState([]);

    const [wantsCustomType, setWantsCustomType] = React.useState(false); // Custom type

    // Operating the modal
    let openModal = () => { setModalOpen(true); }
    let closeModal = () => {
        setErrorMessages([]); // Reset error messages
        setModalOpen(false); 
    }

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

    /* Sort the stats alphabetically */
    filteredStats.sort((statA, statB) => {
        if(statA.name > statB.name)
            return 1;
        else if(statB.name > statA.name){
            return -1;
        }
        else{
            return 0;
        }
    });

    // This gets called from a button within the add new stat modal!
    let addNewStat = () => {

        // Validation check
        setErrorMessages([]); // Reset error messages
        // Go through and check for invalid stuff
        let wasEvaluated = true;
        let _errors = [];
        if(newStatName === ""){
            wasEvaluated = false;
            _errors.push("Invalid Stat Name");
        }
        if(newStatType === ""){
            wasEvaluated = false;
            _errors.push("Invalid Stat Type");
        }
        if(newStatLevel < 0){
            wasEvaluated = false;
            _errors.push("Invalid Stat Level");
        }
        setErrorMessages(_errors); // Set the actual state

        if(wasEvaluated){
            // Create the object using function from character_utility.js
            let newStatObject = createStatObject(newStatName, newStatLevel, newStatType);
            console.log(newStatObject);
            // Push and update the character with the new stat
            props.character.stats.push(newStatObject);
            props.updatedCharacter(props.character);

            // Reset
            setNewStatName("");
            setNewStatType("skill");
            setNewStatLevel(0);
            setWantsCustomType(false);

            // Close the add new stat modal!
            closeModal();
        }
    }

    let changeStatType = v => {
        if(v === "custom"){
            setWantsCustomType(true);
        }else{
            setNewStatType(v);
        }
    }

    return (
        <div className="Stats page">
            <div className = "baseStats">
            {/* DISPLAY BASE STATS */}
            {props.character.base_stats.map((base_stat, j) =>{
                return < BaseStatCard key={j} base_stat={base_stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}
            </div>
            <button className="addStatBtn" onClick={() => openModal()}>+</button>

            {/* SEARCH AND DISPLAY STATS */}
            <input className="searchbar" type="text" placeholder={"Search Name or Type of Stat"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredStats.map((stat, i) => {
                return < StatCard key={i} stat={stat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            {/*scrolls to the top of the page*/}
            <ScrollToTop/>

            {/* MODAL FOR ADDING A NEW STAT */}
            <Modal
                isOpen = {modalOpen}
                onRequestClose = {() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >
                <form>
                    <input type="text" placeholder="Stat Name" onChange={e => {setNewStatName(e.target.value)}}></input>

                    {/* Conditional rendering to check if we want custom type or not, change input fields depending on that */}
                    {!wantsCustomType && 
                        <div>
                            <select name="Type" onChange={e => {changeStatType(e.target.value)}} >
                                <option value="skill">Skill</option>
                                <option value="language">Language</option>
                                <option value="trait">Trait</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    }
                    {wantsCustomType && 
                        <div>
                            <input type="text" placeholder="Custom Type" onChange={e => {setNewStatType(e.target.value)}}></input>
                        </div>
                    }
                    <input type="number" placeholder="Stat Level" onChange={e => {setNewStatLevel(e.target.value)}}></input>                    
                </form>

                <button onClick = {() => addNewStat()}>Add</button>
                <button onClick={() => closeModal()}>Close</button>

                <br></br>
                {errorMessages.map((msg, i) => {
                    return <p key={i}>- {msg} -</p>
                })}

            </Modal>
            
        </div>
    );
}

function ItemCard(props){

    const [modalOpen, setModalOpen] = React.useState(false); // Flag to know if we want to manipulate the stat?

    const [name, setName] = React.useState(props.item.name);
    const [cost, setCost] = React.useState(props.item.cost);
    const [amount, setAmount] = React.useState(props.item.amount);
    const [desc, setDesc] = React.useState(props.item.desc);
    const [type, setType] = React.useState(props.item.type);

    const [errorMessages, setErrorMessages] = React.useState([]);

    // Modal handling stuff
    let openModal = () => { setModalOpen(true); }    
    let closeModal = () => { 

        // Validation check
        setErrorMessages([]); // Reset error messages
        // Go through and check for invalid stuff
        let wasEvaluated = true;
        let _errors = [];
        if(name === ""){
            wasEvaluated = false;
            _errors.push("Invalid Item Name");
        }
        if(cost === ""){
            wasEvaluated = false;
            _errors.push("Invalid Item Cost");
        }
        if(amount <= 0){
            wasEvaluated = false;
            _errors.push("Invalid Item Amount")
        }
        setErrorMessages(_errors); // Set the actual state

        if(wasEvaluated){
            // Update the item
            let index = findIndexWithAttribute(props.character.inventory, 'name', props.item.name);
            // Update each property with the new item values
            props.character.inventory[index].name = name;
            props.character.inventory[index].cost = cost;
            props.character.inventory[index].amount = amount;
            props.character.inventory[index].desc = desc;
            props.character.inventory[index].type = type;
            // Callback for the file writing 
            props.updatedCharacter(props.character);
            // Close the modal now
            setModalOpen(false); 
        }
    } 

    let removeItem = () => {
        props.character.inventory.splice(props.character.inventory.findIndex(s => s.name === props.item.name), 1);
        props.updatedCharacter(props.character);
        setModalOpen(false);
    }

    return (
        <div className="ItemCard Card">                       
            <p onClick={() => openModal()} >Name: {props.item.name} </p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"
            >             
                <input type="text" placeholder={"name"} value={name} onChange={e => {setName(e.target.value)}}></input> <br></br>
                <input type="text" placeholder={"cost"} value={cost} onChange={e => {setCost(e.target.value)}}></input> <br></br>
                <input type="number" placeholder={"amount"} value={amount} onChange={e => {setAmount(e.target.value)}}></input> <br></br>
                <input type="text" placeholder={"description"} value={desc} onChange={e => {setDesc(e.target.value)}}></input> <br></br>
                <select name="Type" value={type} onChange={e => {setType(e.target.value)}} >
                    {itemTypes.map((type, i) => {
                        return <option key={i} value={type}>{type}</option>
                    })}
                </select><br></br>

                <button onClick = {removeItem}>Remove</button>

                <button onClick={() => closeModal()}>Save</button>

                {errorMessages.map((msg, i) => {
                    return <p key={i}>- {msg} -</p>
                })}

            </Modal>
            
        </div>
    );
}

function Inventory(props){

    const [newItemName, setNewItemName] = React.useState("");
    const [newItemDesc, setNewItemDesc] = React.useState("");
    const [newItemType, setNewItemType] = React.useState("Weapon");
    const [newItemAmount, setNewItemAmount] = React.useState(0);
    const [newItemCost, setNewItemCost] = React.useState("");

    const [modalOpen, setModalOpen] = React.useState(false); // Modal used for adding new stat!
    const [errorMessages, setErrorMessages] = React.useState([]);

    // Operating the modal
    let openModal = () => { setModalOpen(true); }
    let closeModal = () => {
        setErrorMessages([]);
        setModalOpen(false); 
    }

    // This gets called from a button within the add new item modal!
    let addNewItem = () => {

        // Validation check
        setErrorMessages([]); // Reset error messages
        // Go through and check for invalid stuff
        let wasEvaluated = true;
        let _errors = [];
        if(newItemName === ""){
            wasEvaluated = false;
            _errors.push("Invalid Item Name");
        }
        if(newItemCost === ""){
            wasEvaluated = false;
            _errors.push("Invalid Item Cost");
        }
        if(newItemAmount <= 0){
            wasEvaluated = false;
            _errors.push("Invalid Item Amount")
        }
        setErrorMessages(_errors); // Set the actual state

        if(wasEvaluated){
            // CharacterUtillity function
            let newItemObject = createItemObject(newItemName, newItemCost, newItemAmount, newItemDesc, newItemType);
            // Push and update the character with the new item
            props.character.inventory.push(newItemObject);
            props.updatedCharacter(props.character);

            // Reset input 
            setNewItemName("");
            setNewItemDesc("");
            setNewItemCost("");
            setNewItemType("Weapon");
            setNewItemAmount(0);

            // Close the add new item modal
            closeModal();
        }
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
        <div className="Inventory page">
        
           <button onClick={openModal}>Add New Item</button>

            {/* DISPLAY THE FILTERED INVENTORY USING ITEM CARD COMPONENT */}
            <input className="searchbar" type="text" placeholder={"inventory"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredInventory.map((item, i) => {
                return <ItemCard key={i} item={item} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            {/*scrolls to the top of the page*/}
            <ScrollToTop/>
            
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
                    <select name="Type" value={newItemType} onChange={e => {setNewItemType(e.target.value)}} >
                        {itemTypes.map((type, i) => {
                            return <option key={i} value={type}>{type}</option>
                        })}
                    </select>
                </form>
                <button onClick = {() => addNewItem()}>Add</button>
                <button onClick={() => closeModal()}>Close</button>

                {errorMessages.map((msg, i) => {
                    return <p key={i}>- {msg} -</p>
                })}

            </Modal>
        </div>
    )
}

function CombatCard(props) {
    
    const [modalOpen, setModalOpen] = React.useState(false);
    let openModal = () => { setModalOpen(true); }    
    let closeModal = () => { setModalOpen(false); }

    let changeStatLevel = (dir, id) => {
        props.character.combats.find(s => s.name === props.combat.name)[id] += dir;
        props.updatedCharacter(props.character);
    }
   
    return (
        <div className="CombatCard Card">
            <div onClick={() => openModal()}> Name: {props.combat.name} :
            {props.combat.value != null && props.combat.value}
            {props.combat.type != null && <p>Saving throws</p>}
            {props.combat.maximum != null && <p> Maximum: {props.combat.maximum}</p>}
            {props.combat.total != null && <p> Total: {props.combat.total}</p>}
            {props.combat.successes != null && <p> Successes: {props.combat.successes} Failiures: {props.combat.failures}</p>}
            </div>
            <Modal
                isOpen = {modalOpen}
                onRequestClose = {() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal"> 
                    <h2>{props.combat.name}</h2>
                    {props.combat.value != null && 
                        <div> 
                            <p>Value: {props.combat.value} </p>
                            <button onClick={() => changeStatLevel(-1, 'value')}>-</button>
                            <button onClick={() => changeStatLevel(1, 'value')}>+</button>
                        </div> 
                    }
                    {props.combat.maximum != null && 
                        <div>
                            <p>Maximum: {props.combat.maximum} </p>
                            <button onClick={() => changeStatLevel(-1, 'maximum')}>-</button>
                            <button onClick={() => changeStatLevel(1, 'maximum')}>+</button>
                        </div> 
                    }
                    {props.combat.total != null &&
                        <div>
                            <p>Total: {props.combat.total}</p>
                            <button onClick={() => changeStatLevel(-1, 'total')}>-</button>
                            <button onClick={() => changeStatLevel(1, 'total')}>+</button>
                        </div> 
                    }
                    {props.combat.successes != null && 
                        <div>
                            <p>Successes: {props.combat.successes}</p> 
                            <button onClick={() => changeStatLevel(-1, 'successes')}>-</button>
                            <button onClick={() => changeStatLevel(1, 'successes')}>+</button>
                            <p>Failiures: {props.combat.failures}</p> 
                            <button onClick={() => changeStatLevel(-1, 'failures')}>-</button>
                            <button onClick={() => changeStatLevel(1, 'failures')}>+</button>
                        </div> 
                    }   
                    <button onClick={() => closeModal()}>Close</button>
            </Modal> 
        </div>
    );
}

function Combat(props){

    /* FILTER COMBAT */
    const [searchString, setSearchString] = React.useState("");
    let filteredCombat = props.character.combats;
    
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
        <div className="combat page">

            <input type="text" placeholder={"combat"} onChange={e => {setSearchString(e.target.value)}}></input>
            {filteredCombat.map((combat, i) => {
                return <CombatCard key={i} combat={combat} character={props.character} updatedCharacter={props.updatedCharacter} />
            })}

            {/*scrolls to the top of the page*/}
            <ScrollToTop/>
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
                    <CharacterHeader character={character} currentPage={currentPage} setCurrentPage={setCurrentPage} updatedCharacter={updatedCharacter} />
                    <Stats character={character} updatedCharacter={updatedCharacter} />
                </div>
            )
        }
        else if(currentPage === "inventory"){
            return(
                <div>
                    <CharacterHeader character={character} currentPage={currentPage} setCurrentPage={setCurrentPage} updatedCharacter={updatedCharacter}/>
                    <Inventory character={character} updatedCharacter={updatedCharacter} />
                </div>
            )
        }
        else if(currentPage === "combat") {
            return(
                <div>
                    <CharacterHeader character={character} currentPage={currentPage} setCurrentPage={setCurrentPage} updatedCharacter={updatedCharacter}/>
                    <Combat character={character} updatedCharacter={updatedCharacter}/>
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