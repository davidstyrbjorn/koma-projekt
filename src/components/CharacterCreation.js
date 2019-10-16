import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {getBaseCharacter, getCharactersFromJSON} from '../characters_utility'

function CharacterCreation(){

    let {characterName, setCharacterName} = React.useState("");
    let {initMapXP, setInitMaxXP} = React.useState(0);

    let handleSubmit = (e) => {
        let character = getBaseCharacter()
    }

    return(

        <div>
            <h2>Welcome to character creation!</h2>

            <form>
                <label>
                    Character Name
                    <input type="text" name="name" />
                </label>
                <br></br>
                <label>
                    Initial Max XP
                    <input type="number" name="init_max_xp"/>
                </label>
                <br></br>
            </form>

            <Link to="/" onClick={handleSubmit} > Create </Link>

        </div>

    );

}

export default CharacterCreation;