import React, { useState } from "react";
import "./huffman.css";

const HuffmanVisualizer = () => {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Function to generate the frequency map
  const generateFrequencyMap = (text) => {
    const freqMap = {};
    for (let char of text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap;
  };

  // Function to build the Huffman tree step-by-step
  const buildHuffmanTreeStepByStep = (freqMap) => {
    let nodes = Object.entries(freqMap).map(([char, freq]) => ({
      char,
      freq,
    }));
    const steps = [];

    while (nodes.length > 1) {
      // Sort nodes by frequency
      nodes.sort((a, b) => a.freq - b.freq);

      // Create the queue showing current trees being combined
      steps.push({
        queue: nodes.map((node) =>
          node.char
            ? `'${node.char}'`  // Leaf node: show character
            : `(${renderTree(node.left)} + ${renderTree(node.right)})`  // Internal node: show tree structure
        ),
        tree: null, // Tree structure will be rendered after combining nodes
      });

      // Remove two smallest nodes
      const left = nodes.shift();
      const right = nodes.shift();

      // Create a new internal node
      const newNode = {
        freq: left.freq + right.freq,
        left,
        right,
      };

      // Add the new node back to the list
      nodes.push(newNode);

      // Save the current tree structure after combining nodes
      steps.push({
        queue: nodes.map((node) =>
          node.char
            ? `'${node.char}'`
            : `(${renderTree(node.left)} + ${renderTree(node.right)})`
        ),
        tree: newNode, // Render the combined tree
      });
    }

    setSteps(steps);
  };

  // Function to render a tree structure as a string
  const renderTree = (node) => {
    if (!node) return "";
    if (node.char) return `'${node.char}'`; // If leaf node, return char
    return `(${renderTree(node.left)} + ${renderTree(node.right)})`; // If internal, render left and right subtree
  };

  const renderHuffmanTree = (node, x, y, dx) => {
    if (!node) return null;

    const levelHeight = 80;
    const nodeRadius = 20;

    return (
      <g key={`${node.char || "internal"}-${node.freq}`}>
        {/* Line to left child */}
        {node.left && (
          <line
            x1={x}
            y1={y + nodeRadius}
            x2={x - dx}
            y2={y + levelHeight - nodeRadius}
            stroke="#4682B4"
            strokeWidth="2"
          />
        )}
        {/* Line to right child */}
        {node.right && (
          <line
            x1={x}
            y1={y + nodeRadius}
            x2={x + dx}
            y2={y + levelHeight - nodeRadius}
            stroke="#4682B4"
            strokeWidth="2"
          />
        )}

        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={node.char ? "#FFFFFF" : "#ADD8E6"}
          stroke="#00008B"
          strokeWidth="2"
        />

        {/* Character inside the circle for leaf nodes */}
        {node.char && (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fill="#000"
            fontSize="12"
            dy=".3em"
          >
            {`'${node.char}'`}
          </text>
        )}

        {/* Recursive rendering for children */}
        {node.left &&
          renderHuffmanTree(node.left, x - dx, y + levelHeight, dx / 1.5)}
        {node.right &&
          renderHuffmanTree(node.right, x + dx, y + levelHeight, dx / 1.5)}
      </g>
    );
  };

  const renderQueue = (nodes) => {
    return nodes.map((node, index) => (
      <text key={index} x={100 + index * 120} y={30} fontSize="14">
        {node}
      </text>
    ));
  };

  const runAnimation = () => {
    if (!text) return;
    const freqMap = generateFrequencyMap(text);
    buildHuffmanTreeStepByStep(freqMap);
    setCurrentStep(0);
  };

  return (
    <div className="huffman-visualizer">
      <h2>Huffman Encoding Visualization</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
        className="input-text"
      />
      <button onClick={runAnimation} className="run-button">
        Generate Tree
      </button>
      <svg width="1000" height="500" style={{ margin: "20px 0" }}>
        <g>{renderQueue(steps[currentStep]?.queue || [])}</g>
        {steps[currentStep]?.tree &&
          renderHuffmanTree(steps[currentStep].tree, 500, 40, 200)}
      </svg>
      <div className="navigation-buttons">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous Step
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default HuffmanVisualizer;
