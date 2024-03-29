import React from 'react';
import './App.css';

import CharacterSelect from './CharacterSelect'
import CharacterPage from './CharacterPage'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import {deleteAllCharacters} from '../characters_utility';

function App() {
  
  //deleteAllCharacters();

  return(
    
    <Router>
      <Switch>
        
        <Route path="/character_page/:ID" component={CharacterPage} />

        <Route path="/">
          <CharacterSelect />
        </Route>

      </Switch>

    </Router>
    
  );
    
  /*
  return (
    <div className="App">
          <p>Persistence</p>

          <button onClick = {e => {
              getCharactersFromJSON(setCharacters);
          }} >Load Characters</button>
          
          <button onClick = {e => {
              console.log(characters[5]);
          }}>Debug Log Characters</button>

          <button onClick = {e => {
              characters.push(getBaseCharacter("Gandalf", 10));
          }}> Create character </button>

          <button onClick={e => {
              fs.writeFile("characters.json", JSON.stringify(characters), 'utf8', err => {
                  if(err) throw err;
              });
          }}>Save Characters to File</button>

      </div>
    )
    */
}

export default App;