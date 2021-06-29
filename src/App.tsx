import React from 'react';
import './App.css';
import Weather from './components/Weather';

const App: React.FunctionComponent=()=>{
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
    </div>
  );
}

export default App;