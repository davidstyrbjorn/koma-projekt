import React from 'react';
import Modal from 'react-modal';

import "../style/CharacterCreation.css"

// JSON and Character related functions
import {getBaseCharacter, writeCharactersToJSON, getSupportedClasses} from '../characters_utility'

function CharacterCreation(props){

    // States for the new characters data
    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(1);
    const [initMaxHP, setInitMaxHP] = React.useState(0);
    const [campaignName, setCampaignName] = React.useState("");
    const [characterClass, setCharacterClass] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);

    let openModal = () => { setModalOpen(true); }    
    let closeModal = () => { setModalOpen(false); }
    
    let handleSubmit = (e) => {
        // Create the character
        let newCharacter = getBaseCharacter(characterName, initMaxHP, initMapXP, campaignName, characterClass);
        // Make sure we're not creating a character that already has characterName!
       
        if(props.characters.length === 0) { //if it is the first character
            newCharacter.ID = 1;
        }
        else{
            newCharacter.ID = props.characters[props.characters.length-1].ID + 1; //makes sure that ID always is unique 
        }
        props.characters.push(newCharacter); // Add to the actual array 
        writeCharactersToJSON(props.characters, props.setHasSaved); // Write to JSON
        props.setCharacters(props.characters); // New character added!
        closeModal(); // Close modal

        // Reset created character info
        setCharacterName("");
        setInitMaxXP("");
        setCampaignName("");
        setCharacterClass("Mage");
    }
    
    return(
        
        <div className="CharacterCreation">
            <p onClick={() => openModal()}>Create a new character</p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal1"
            >
                <div className="FormplusButton">
                    <form>
                        <label>
                            <p>Character Name</p> 
                            <input type="text" name="name" value={characterName} placeholder="Name" onChange={e => setCharacterName(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <p>Initial Max XP</p> 
                            <input type="number" name="init_max_xp" value={initMapXP} onChange={ e => setInitMaxXP(e.target.value)} />
                        </label>
                        <label>
                            <p>HP</p>
                            <input type="number" name="hp" value={initMaxHP} onChange={e => setInitMaxHP(e.target.value)} />
                        </label>
                        <label>
                            <p>Campaign Name</p>
                            <input type="text" name="campaign_name" value={campaignName} placeholder="Campaign Name" onChange={e => setCampaignName(e.target.value)} />
                        </label>
                        <label>
                            <p>Class</p>
                            <select name="Class" value={characterClass} onChange={e => {setCharacterClass(e.target.value)}}>
                                {getSupportedClasses().map((element, i) => {
                                    return <option key={i} value={element}>{element}</option>
                                })}
                            </select>
                        </label>
                        <br></br>
                    </form>

                    

                    <button onClick={() => {
                        handleSubmit();}}>Create</button>

                </div>
            </Modal>
        </div>
    );

}

export default CharacterCreation;