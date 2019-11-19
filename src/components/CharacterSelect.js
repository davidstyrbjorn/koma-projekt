import React from 'react'
import Modal from 'react-modal';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";
import "../style/CharacterSelect.css";
import CharacterCreation from './CharacterCreation';

/* Character Select Screen */

function CharaccterSelectOption(props){
    
    // This is the individual character that pops up for the user to click on, used in CharacterSelect()
    console.log(props.character.ID);
    // Props up a Link tag that links to the character page with correct context 
    return(
        <div className="characterOption">
            <Link to={"/character_page/" + props.character.ID}> 
                <h3>{props.character.name}</h3>
                <h5>Campaign: {props.character.campaign_name}</h5>
            </Link>
            <button onClick={ e => {props.removeCallback(props.character.name)} }>X</button>
        </div>
    );   
}

function CharacterSelect(){

    // State hook for the characters
    const [characters, setCharacters] = React.useState([]);
    const [hasLoaded, setLoaded] = React.useState(false);
    const [hasSaved, setHasSaved] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false); // Flag to know if we want to manipulate the stat?

    let openModal = () => {
        console.log("what");
        setModalOpen(true);
    }    

    let closeModal = () => {
        setModalOpen(false);
    }

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);
    if(hasSaved)
        setHasSaved(false);

    // Remove callback
    let removeCharacter = ID => {
        // Takeout the desired character from the big character list!
        characters.splice(characters.findIndex(c => c.ID === ID), 1);
        // Write the new character list to the JSON file 
        writeCharactersToJSON(characters, setHasSaved);
    }
    
    return (
        <div className="wrapper">
            <div className="CharacterSelect">
                <h2>Welcome to character selection!</h2>
                <div className="characterList">
                {characters.map((c,i) => {
                    return( <CharaccterSelectOption key={i} character={c} removeCallback = {removeCharacter} />);
                })}
                </div>
                <p onClick={() => openModal()}>Create a new character</p>
                <Modal
                isOpen={modalOpen}    
                onRequestClose={() => closeModal()}
                shouldCloseOnOverlayClick={true}
                className="Modal">
                <CharacterCreation/>
                </Modal>
            </div>
        </div>
    );
}

export default CharacterSelect;




