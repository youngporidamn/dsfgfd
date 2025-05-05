// src/App.js
import React from 'react';
import TravelEntryList from './components/TravelEntryList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Journal</h1>
      </header>
      <main>
        <TravelEntryList />
      </main>
    </div>
  );
}

export default App;

