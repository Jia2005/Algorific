import React, { useState } from 'react';
import { sha256 } from 'js-sha256'; // Import the hashing function
import './hashing.css';

const HashingGame = () => {
  const [input, setInput] = useState('');
  const [hashedOutput, setHashedOutput] = useState('');

  const handleHash = () => {
    const hash = sha256(input); // Hash the input using SHA-256
    setHashedOutput(hash);
  };

  const handleClear = () => {
    setInput('');
    setHashedOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashedOutput);
  };

  return (
    <div className="game-container">
      <h1>Hashing Game</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to hash"
      />
      <button onClick={handleHash}>Hash It!</button>
      <button onClick={handleClear}>Clear</button>
      <div className="output">
        <h2>Hashed Output:</h2>
        <p>{hashedOutput}</p>
        {hashedOutput && <button onClick={copyToClipboard}>Copy to Clipboard</button>}
      </div>
      <div className="examples">
        <h3>Example Inputs:</h3>
        <button onClick={() => setInput('password123')}>password123</button>
        <button onClick={() => setInput('hello world')}>hello world</button>
        <button onClick={() => setInput('react is awesome')}>react is awesome</button>
      </div>
    </div>
  );
};

export default HashingGame;
