import React, { useState, useEffect } from 'react';
import './water.css';
import Swal from 'sweetalert2';

const difficultySettings = {
  easy: { tubes: 4, colors: 3, score: 5 },
  medium: { tubes: 5, colors: 4, score: 10 },
  hard: { tubes: 6, colors: 5, score: 15 }
};

const pastelColors = [
  'rgba(255, 182, 193, 1)',
  'rgba(135, 206, 235, 1)',
  'rgba(152, 251, 152, 1)',
  'rgba(255, 218, 185, 1)',
  'rgba(221, 160, 221, 1)',
];

const generateTubes = (settings) => {
  const tubes = [];
  const totalLiquids = pastelColors
    .slice(0, settings.colors)
    .flatMap(color => Array(5).fill(color));
  
  for (let i = totalLiquids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [totalLiquids[i], totalLiquids[j]] = [totalLiquids[j], totalLiquids[i]];
  }

  for (let i = 0; i < settings.tubes; i++) {
    tubes.push(totalLiquids.splice(0, 5));
  }

  return [...tubes, []];
};

const Water = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [tubes, setTubes] = useState(generateTubes(difficultySettings[difficulty]));
  const [selectedTube, setSelectedTube] = useState(null);
  const [score, setScore] = useState(0);
  const [filledTubes, setFilledTubes] = useState([]);

  useEffect(() => {
    checkGameState();
  }, [tubes]);

  const checkGameState = () => {
    const nonEmptyTubes = tubes.filter(tube => tube.length > 0);
    const allTubesSorted = nonEmptyTubes.every(tube => 
      tube.length === 5 && tube.every(color => color === tube[0])
    );
    const hasValidMoves = checkForValidMoves();

    if (allTubesSorted) {
      showGameEndAlert(true);
    } else if (!hasValidMoves && nonEmptyTubes.length > 0) {
      showGameEndAlert(false);
    }
  };

  const checkForValidMoves = () => {
    for (let i = 0; i < tubes.length; i++) {
      for (let j = 0; j < tubes.length; j++) {
        if (i !== j && tubes[i].length > 0 && 
            (tubes[j].length === 0 || 
             (tubes[j].length < 5 && 
              tubes[j][tubes[j].length - 1] === tubes[i][tubes[i].length - 1]))) {
          return true;
        }
      }
    }
    return false;
  };

  const showGameEndAlert = (isVictory) => {
    Swal.fire({
      title: isVictory ? 'Victory!' : 'Game Over',
      text: `Final Score: ${score}`,
      icon: isVictory ? 'success' : 'info',
      confirmButtonText: 'Home',
    }).then(() => {
      window.location.href = '/home';
    });
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setTubes(generateTubes(difficultySettings[newDifficulty]));
    setSelectedTube(null);
    setScore(0);
    setFilledTubes([]);
  };

  const handleTubeClick = (index) => {
    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
    } else {
      const targetTube = tubes[index];
      const sourceTube = tubes[selectedTube];
      
      if (selectedTube === index) {
        setSelectedTube(null);
        return;
      }

      if (targetTube.length >= 5) {
        Swal.fire({
          title: 'Invalid Move',
          text: 'Target tube is already full!',
          icon: 'error',
          timer: 1500
        });
        setSelectedTube(null);
        return;
      }

      if (targetTube.length > 0 && targetTube[targetTube.length - 1] !== sourceTube[sourceTube.length - 1]) {
        Swal.fire({
          title: 'Invalid Move',
          text: 'Colors must match!',
          icon: 'error',
          timer: 1500
        });
        setSelectedTube(null);
        return;
      }

      const liquidToPour = sourceTube.pop();
      const newTubes = [...tubes];
      newTubes[index].push(liquidToPour);
      
      if (newTubes[index].length === 5 && checkCompleteTube(newTubes[index])) {
        setScore(score + difficultySettings[difficulty].score);
        setFilledTubes([...filledTubes, index]);
      }
      
      setTubes(newTubes);
      setSelectedTube(null);
    }
  };

  const checkCompleteTube = (tube) => {
    return tube.every(color => color === tube[0]);
  };

  return (
    <div className="game-container">
      <h1>Stack Implementation Game</h1>
      
      <div className="difficulty-controls">
        {Object.keys(difficultySettings).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      <div className="score" style={{ color: 'black' }}>Score: {score}</div>
      
      <div className="tubes">
        {tubes.map((tube, index) => (
          <div
            key={index}
            className={`tube ${selectedTube === index ? 'selected' : ''} ${filledTubes.includes(index) ? 'filled' : ''}`}
            onClick={() => handleTubeClick(index)}
          >
            {tube.slice().reverse().map((color, idx) => (
              <div
                key={idx}
                className="liquid"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div><br/><br/>

      <div className="how-to-play">
        <h2>How to Play</h2>
        <p>This game requires to stack colored liquids in tubes.</p>
        <p>Difficulty Levels:</p>
        <ul>
          <li>Easy: 5 tubes, 3 colors (+5 points)</li>
          <li>Medium: 6 tubes, 4 colors (+10 points)</li>
          <li>Hard: 7 tubes, 5 colors (+15 points)</li>
        </ul><br/>
        <p>Rules:</p>
        <ul>
          <li>Liquid can be poured only into an empty tube or onto a tube that has the same color on top.</li>
          <li>Each tube can hold a maximum of 5 liquids.</li>
          <li>The goal is to fill a tube with the same color liquids to complete it.</li>
          <li>Points are awarded based on difficulty level.</li>
          <li>The game ends when all tubes are either completely filled or no more moves are possible.</li>
        </ul>
      </div>
    </div>
  );
};

export default Water;