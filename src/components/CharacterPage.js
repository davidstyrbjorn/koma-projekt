import React from 'react'

import { getCharactersFromJSON, writeCharactersToJSON } from "../characters_utility";

function CharacterPage({ match }){

    // State hook for the characters
    const [characters, setCharacters] = React.useState([]);
    const [hasLoaded, setLoaded] = React.useState(false);

    // Get the characters
    if(!hasLoaded)
        getCharactersFromJSON(setCharacters, setLoaded);

    

    return (
        <div>
            {match.params.name}
        </div>
    );

}

export default CharacterPage;