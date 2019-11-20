import React from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Switch, Redirect } from "react-router-dom";

import "../style/CharacterCreation.css"

// JSON and Character related functions
import {getBaseCharacter, writeCharactersToJSON, findIndexWithAttribute} from '../characters_utility'

function CharacterCreation(props){

    // States for the new characters data
    const [characterName, setCharacterName] = React.useState("");
    const [initMapXP, setInitMaxXP] = React.useState(1);
    const [campaignName, setCampaignName] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);

    let openModal = () => {
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }
    
    let handleSubmit = (e) => {
        // Create the character
        let newCharacter = getBaseCharacter(characterName, initMapXP, campaignName);
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
            setCharacterName("");
            setInitMaxXP("");
            setCampaignName("");
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
                <h2>Welcome to character creation!</h2>

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
                            <p>Campaign Name</p>
                            <input type="text" name="campaign_name" value={campaignName} placeholder="Campaign Name" onChange={e => setCampaignName(e.target.value)} />
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