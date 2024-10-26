import React, { useState } from 'react';
import './water.css';

const pastelColors = [
  'rgba(255, 182, 193, 1)',
  'rgba(135, 206, 235, 1)',
  'rgba(152, 251, 152, 1)',
  'rgba(255, 218, 185, 1)',
];

const generateTubes = (numTubes, boxSize, colors) => {
  const tubes = [];
  const totalLiquids = colors.flatMap(color => Array(boxSize).fill(color));
  for (let i = totalLiquids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [totalLiquids[i], totalLiquids[j]] = [totalLiquids[j], totalLiquids[i]];
  }

  for (let i = 0; i < numTubes; i++) {
    tubes.push(totalLiquids.splice(0, boxSize));
  }

  return tubes;
};

const Water = () => {
  const boxSize = 5;
  const initialTubes = generateTubes(5, boxSize, pastelColors);
  const [tubes, setTubes] = useState([...initialTubes, [], []]);
  const [selectedTube, setSelectedTube] = useState(null);
  const [score, setScore] = useState(0);
  const [filledTubes, setFilledTubes] = useState([]);

  const handleTubeClick = (index) => {
    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
    } else {
      if (selectedTube !== index &&
          (tubes[index].length === 0 || tubes[index][tubes[index].length - 1] === tubes[selectedTube][tubes[selectedTube].length - 1])) {
        
        const liquidToPour = tubes[selectedTube].pop();
        const newTubes = [...tubes];

        if (newTubes[index].length < boxSize) {
          newTubes[index].push(liquidToPour);
        }

        if (newTubes[index].length === boxSize && checkCompleteTube(newTubes[index])) {
          setScore(score + 10);
          setFilledTubes([...filledTubes, index]); 
        }

        setTubes(newTubes);
        setSelectedTube(null);
      }
    }
  };

  const checkCompleteTube = (tube) => {
    return tube.every(color => color === tube[0]);
  };

  return (
    <div className="game-container">
      <h1>Stack Implementation Game</h1>
      <div className="score" style={{ color: 'black' }}>Score: {score}</div>
      <div className="tubes">
        {tubes.map((tube, index) => (
          <div
            key={index}
            className={`tube ${selectedTube === index ? 'selected' : ''} ${filledTubes.includes(index) ? 'filled' : ''}`}
            onClick={() => handleTubeClick(index)}
          >
            {tube.slice().reverse().map((color, idx) => (
              <div key={idx} className="liquid" style={{ backgroundColor: color }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Water;
