import React, { useState } from 'react';
import './water.css';

const pastelColors = [
  'rgba(255, 182, 193, 1)', // Pink
  'rgba(135, 206, 235, 1)', // Light Blue
  'rgba(152, 251, 152, 1)', // Pale Green
  'rgba(255, 218, 185, 1)', // Peach
];

const generateTubes = (numTubes, numColors) => {
  const tubes = [];
  for (let i = 0; i < numTubes; i++) {
    const tube = Array.from({ length: 5 }, () => 
      pastelColors[Math.floor(Math.random() * numColors)]
    );
    tubes.push(tube);
  }
  return tubes;
};

const Water = () => {
  const [tubes, setTubes] = useState(generateTubes(5, 4));
  const [selectedTube, setSelectedTube] = useState(null);
  const [score, setScore] = useState(0);

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
        newTubes[index].push(liquidToPour);
        setTubes(newTubes);

        // Check if the tube is now complete
        if (newTubes[index].length === 5 && checkCompleteTube(newTubes[index])) {
          setScore(score + 1);  // Increase score
          newTubes[index] = [];  // Empty the tube after completing
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
      <h1>Test Tube Sorting Game</h1>
      <div className="score">Score: {score}</div>
      <div className="tubes">
        {tubes.map((tube, index) => (
          <div
            key={index}
            className={`tube ${selectedTube === index ? 'selected' : ''}`}
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
