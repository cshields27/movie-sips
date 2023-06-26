import React, { useState } from 'react';

export default function RulesInput(props) {

  const [movie, setMovie] = useState('');
  const [drinkCount, setDrinkCount] = useState('');

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  };

  const handleDrinkCountChange = (e) => {
    setDrinkCount(e.target.value);
  };

  const handleGenerateGame = () => {
    props.generateGame(movie, drinkCount);
  };

  return (
    <div className="rules-input">
      <div className="input-container">
        <span className="input-text">I want to watch...</span>
        <input type="text" value={movie} onChange={handleMovieChange} className="input-rect"/>
      </div>
      <div className="input-container">
        <span className="input-text">and consume this many drinks...</span>
        <input type="text" value={drinkCount} onChange={handleDrinkCountChange} className="input-rect"/>
      </div>
      <button className="generate-button" onClick={handleGenerateGame}>
        <div className="generate-text">generate game</div>
      </button>
    </div>
  );
};