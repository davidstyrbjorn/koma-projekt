import React from 'react';
import Modal from 'react-modal';

import "../style/CharacterCreation.css"

// JSON and Character related functions
import {getBaseCharacter, writeCharactersToJSON, getSupportedClasses} from '../characters_utility'

const CHARACTER_NAME_ERROR_INDEX = 0;
const CAMPAIGN_NAME_ERROR_INDEX = 1;
const INIT_MAX_XP_ERROR_INDEX = 2;
const INIT_MAX_HP_ERROR_INDEX = 3;

function CharacterCreation(props) {
    
    // States for the new characters data
    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(1);
    const [initMaxHP, setInitMaxHP] = React.useState(1);
    const [campaignName, setCampaignName] = React.useState("");
    const [characterClass, setCharacterClass] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);

    let openModal = () => { 
        setModalOpen(true); 
    }    
    let closeModal = () => { 
        setErrorMessages([]);
        setModalOpen(false); 
    }
    
    let handleSubmit = (e) => {
        
        let passedEvaluation = true; // Flag
        setErrorMessages([]);
        let _list = [];

        // Evaluate errors, should we flag for input fail
        if(characterName === ""){
            passedEvaluation = false;
            _list[CHARACTER_NAME_ERROR_INDEX] = true;
        }
        if(campaignName === ""){
            passedEvaluation = false;
            _list[CAMPAIGN_NAME_ERROR_INDEX] = true;
        }
        if(initMapXP <= 0){
            passedEvaluation = false;
            _list[INIT_MAX_XP_ERROR_INDEX] = true;
        }
        if(initMaxHP <= 0){
            passedEvaluation = false;
            _list[INIT_MAX_HP_ERROR_INDEX] = true;
        }
        setErrorMessages(_list);

        if(passedEvaluation) {
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
            setInitMaxXP(0);
            setInitMaxHP(0);
            setCampaignName("");
            setCharacterClass("Mage");
        }
    }
    
    return(
        
        <div className="CharacterCreation">
            <p onClick={() => openModal()}>Create a new character +</p>
            <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal1"
            >
                <div className="FormplusButton">
                    <form>
                        <label>
                            
                            <p>Character Name{errorMessages[CHARACTER_NAME_ERROR_INDEX] === true && <span className="error-message">Invalid Character Name!</span>}</p>
                            <input type="text" name="name" value={characterName} placeholder="Name" onChange={e => setCharacterName(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <p>Initial Max HP{errorMessages[INIT_MAX_HP_ERROR_INDEX] === true && <span className="error-message">Initial Max HP Invalid!</span>}</p>
                            <input type="number" name="hp" value={initMaxHP} onChange={e => setInitMaxHP(e.target.value)} />
                        </label>
                        <label>
                            <p>Initial Max XP{errorMessages[INIT_MAX_XP_ERROR_INDEX] === true && <span className="error-message">Initial Max XP Invalid!</span>}</p>
                            <input type="number" name="init_max_xp" value={initMapXP} onChange={ e => setInitMaxXP(e.target.value)} />
                        </label>
                        
                        <label>
                            <p>Campaign Name{errorMessages[CAMPAIGN_NAME_ERROR_INDEX] === true && <span className="error-message">Invalid Campaign Name!</span>}</p>
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