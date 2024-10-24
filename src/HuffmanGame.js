import React, { useState } from 'react';
import './huffman.css';

// Node class for the Huffman Tree
class Node {
  constructor(character, frequency) {
    this.character = character;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

// Function to build the Huffman tree
const buildHuffmanTree = (frequencies) => {
  const nodes = Object.entries(frequencies).map(([char, freq]) => new Node(char, freq));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const newNode = new Node(null, left.frequency + right.frequency);
    newNode.left = left;
    newNode.right = right;
    nodes.push(newNode);
  }

  return nodes[0]; // Return the root of the tree
};

// Function to generate codes from the Huffman tree
const generateCodes = (node, prefix = '', codes = {}) => {
  if (node.character !== null) {
    codes[node.character] = prefix;
  } else {
    generateCodes(node.left, prefix + '0', codes);
    generateCodes(node.right, prefix + '1', codes);
  }
  return codes;
};

// Function to encode the input string
const huffmanEncode = (input) => {
  const frequency = {};
  for (let char of input) {
    frequency[char] = (frequency[char] || 0) + 1;
  }
  
  const treeRoot = buildHuffmanTree(frequency);
  const codes = generateCodes(treeRoot);
  
  let encoded = '';
  for (let char of input) {
    encoded += codes[char];
  }

  return { encoded, codes }; // Return both the encoded string and the codes
};

const HuffmanGame = () => {
  const [input, setInput] = useState('');
  const [encodedOutput, setEncodedOutput] = useState('');
  const [codes, setCodes] = useState({});

  const handleEncode = () => {
    const { encoded, codes } = huffmanEncode(input);
    setEncodedOutput(encoded);
    setCodes(codes);
  };

  const handleClear = () => {
    setInput('');
    setEncodedOutput('');
    setCodes({});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedOutput);
  };

  return (
    <div className="game-container">
      <h1>Huffman Encoding Game</h1><br></br>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode"
      /><br></br>
      <button onClick={handleEncode} className='hash-button'>Encode It!</button>
      <button onClick={handleClear} className='hash-button'>Clear</button>
      <div className="output">
        <h2>Encoded Output:</h2>
        <p>{encodedOutput}</p>
        {encodedOutput && <button onClick={copyToClipboard}>Copy to Clipboard</button>}
      </div>
      <div className="codes">
        <h2>Character Codes:</h2>
        <pre>{Object.entries(codes).map(([char, code]) => `${char}: ${code}`).join('\n')}</pre>
      </div>
      <div className="examples">
        <br></br><h3>Example Inputs:</h3><br></br>
        <button onClick={() => setInput('hello world')} className='hash-button'>hello world</button>
        <button onClick={() => setInput('huffman encoding')} className='hash-button'>huffman encoding</button>
        <button onClick={() => setInput('data compression')} className='hash-button'>data compression</button>
      </div>
    </div>
  );
};

export default HuffmanGame;
