import React, { useState, useEffect } from 'react';
import './queuegame.css';

const QueueGame = () => {
  const [queue, setQueue] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState('playing');
  const [challenge, setChallenge] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const MAX_LEVEL = 5;
  
  const levelConfig = {
    1: { operations: 3, points: 10, description: "Basic Enqueue Operations" },
    2: { operations: 4, points: 20, description: "Mixed Enqueue and Dequeue" },
    3: { operations: 5, points: 30, description: "Complex Queue Management" },
    4: { operations: 6, points: 40, description: "Advanced Queue Operations" },
    5: { operations: 7, points: 50, description: "Master Challenge" }
  };

  const generateChallenge = () => {
    const operations = [];
    const finalQueue = [];
    const config = levelConfig[level];
    
    for (let i = 0; i < config.operations; i++) {
      const value = Math.floor(Math.random() * 99) + 1;
      if (Math.random() > (0.2 + level * 0.1) || finalQueue.length === 0) {
        operations.push({ type: 'enqueue', value });
        finalQueue.push(value);
        if (finalQueue.length > 5) finalQueue.shift();
      } else {
        operations.push({ type: 'dequeue', value: finalQueue.shift() });
      }
    }

    return {
      operations,
      targetQueue: finalQueue
    };
  };

  const startChallenge = () => {
    setQueue([]);
    setChallenge(generateChallenge());
    setGameState('playing');
    setMessage('');
  };

  useEffect(() => {
    startChallenge();
  }, [level]);

  const checkAnswer = () => {
    if (!challenge) return;
    
    if (JSON.stringify(queue) === JSON.stringify(challenge.targetQueue)) {
      const pointsEarned = levelConfig[level].points;
      setScore(score + pointsEarned);
      setMessage(`Correct! +${pointsEarned} points`); 
      setGameState('success');
      
      if (level === MAX_LEVEL) {
        setMessage(`Congratulations! You've completed all levels with ${score + pointsEarned} points!`); 
      } else {
        setTimeout(() => {
          setLevel(level + 1);
        }, 1500);
      }
    } else {
      setMessage('Incorrect. Try again!');
      setGameState('failed');
      setTimeout(() => {
        setQueue([]);
        setGameState('playing');
        setMessage('');
      }, 1500);
    }
  };

  const enqueue = () => {
    if (isNaN(inputValue) || inputValue.trim() === '') {
      setMessage('Please enter a valid number');
      return;
    }
    if (queue.length >= 5) {
      setMessage('Queue is full!');
      return;
    }
    setQueue([...queue, parseInt(inputValue)]);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    setQueue(queue.slice(1));
  };

  if (!challenge) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Queue Challenge</h1>
        <button className="help-button" onClick={() => setShowModal(true)}>?</button>
      </div>

      <div className="stats">
        <span>Level: {level}/5</span>
        <span>Score: {score}</span>
      </div>
      <div className="level-info">{levelConfig[level].description} - {levelConfig[level].points} points</div>

      <h2>Operations to Perform:</h2>
      <div className="operations">
        {challenge.operations.map((op, idx) => (
          <span key={idx} className={`operation ${op.type}`}>
            {op.type === 'enqueue' ? `Enqueue ${op.value}` : 'Dequeue'}
          </span>
        ))}
      </div>

      <div className="queue-display">
        {queue.length === 0 ? (
          <span className="empty-queue">Empty Queue</span>
        ) : (
          queue.map((item, idx) => (
            <div key={idx} className="queue-item">{item}</div>
          ))
        )}
      </div>

      <div className="controls">
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="#"
          />
          <button className="enqueue-btn" onClick={enqueue}>Enqueue</button>
        </div>
        <button className="dequeue-btn" onClick={dequeue}>Dequeue</button>
      </div>

      <button className="check-btn" onClick={checkAnswer}>Check Answer</button>

      {message && <div className="message">{message}</div>}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>How to Play</h2>
            <ol>
              <li>Each level presents a sequence of queue operations to perform.</li>
              <li>Green boxes show numbers to enqueue (add to queue).</li>
              <li>Red boxes indicate when to dequeue (remove from front).</li>
              <li>Use the input field and Enqueue button to add numbers.</li>
              <li>Use the Dequeue button to remove numbers from the front.</li>
              <li>Complete all operations in order to match the target queue.</li>
              <li>Click Check Answer to verify your solution.</li>
              <li>Complete all 5 levels to win!</li>
            </ol>
            <button onClick={() => setShowModal(false)}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueGame;