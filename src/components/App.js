import React from 'react';
import './App.css';

import CharacterSelect from './CharacterSelect'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  return(
    <Router>
      <Switch>

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