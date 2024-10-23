import React, { useState } from 'react';
import './water.css';

const Water = () => {
  const initialContainers = [
    ['red', 'blue', 'green', 'red'],
    ['yellow', 'blue', 'green'],
    ['red', 'yellow'],
    ['blue', 'green', 'yellow'],
    [], // Empty cup added
  ];

  const [containers, setContainers] = useState(initialContainers);
  const [score, setScore] = useState(0);
  const [selectedDrop, setSelectedDrop] = useState(null);

  const moveDrop = (toIndex) => {
    if (selectedDrop === null) return;

    const fromIndex = selectedDrop.fromIndex;
    const newContainers = [...containers];
    const movingDrop = newContainers[fromIndex].pop();

    if (canMove(movingDrop, newContainers[toIndex])) {
      newContainers[toIndex].push(movingDrop);
      setContainers(newContainers);
      setSelectedDrop(null);

      if (checkForScoreIncrease(newContainers)) {
        setScore(score + 1);
      }
    } else {
      newContainers[fromIndex].push(movingDrop);
    }
  };

  const canMove = (movingDrop, toContainer) => {
    return toContainer.length === 0 || toContainer[toContainer.length - 1] === movingDrop;
  };

  const checkForScoreIncrease = (containers) => {
    return containers.some(container => {
      return container.length > 0 && container.every(drop => drop === container[0]);
    });
  };

  return (
    <div className="app">
      <h1>Water Sort Game</h1>
      <div className="score">Score: {score}</div>
      <div className="containers">
        {containers.map((container, index) => (
          <Container
            key={index}
            index={index}
            drops={container}
            moveDrop={moveDrop}
            setSelectedDrop={setSelectedDrop}
          />
        ))}
      </div>
    </div>
  );
};

const Container = ({ drops, index, moveDrop, setSelectedDrop }) => {
  return (
    <div className="container" onClick={() => moveDrop(index)}>
      {drops.map((color, dropIndex) => (
        <ColorDrop
          key={dropIndex}
          color={color}
          onClick={() => {
            const dropPosition = drops.length - 1 - dropIndex;
            if (dropPosition === 0) return;
            setSelectedDrop({ fromIndex: index, color });
          }}
        />
      ))}
    </div>
  );
};

const ColorDrop = ({ color, onClick }) => {
  return <div className={`color-drop ${color}`} onClick={onClick}></div>;
};

export default Water;
