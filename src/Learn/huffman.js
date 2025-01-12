import React, { useState } from "react";
import "./huffman.css";

const HuffmanVisualizer = () => {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const generateFrequencyMap = (text) => {
    const freqMap = {};
    for (let char of text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap;
  };

  const buildHuffmanTreeStepByStep = (freqMap) => {
    let nodes = Object.entries(freqMap).map(([char, freq]) => ({
      char,
      freq,
    }));
    const stepsCurr = [];

    nodes.sort((a, b) => a.freq - b.freq);

    stepsCurr.push({
      queue: nodes.map((node) =>
        node.char
          ? `${node.char}`
          : `${renderTree(node.left)}${renderTree(node.right)}`
      ),
      tree: null,
    });

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);

      const left = nodes.shift();
      const right = nodes.shift();

      const newNode = {
        freq: left.freq + right.freq,
        left,
        right,
      };

      nodes.push(newNode);

      stepsCurr.push({
        queue: nodes.map((node) =>
          node.char
            ? `${node.char} : ${node.freq}`
            : `${renderTree(node.left)}${renderTree(node.right)} : ${node.freq}`
        ),
        tree: newNode,
      });
    }

    setSteps(stepsCurr);
  };

  const renderTree = (node) => {
    if (!node) return "";
    if (node.char) return `${node.char}`;
    return `${renderTree(node.left)}${renderTree(node.right)}`;
  };

  const renderHuffmanTree = (node, x, y, dx) => {
    if (!node) return null;

    const levelHeight = 80;
    const nodeRadius = 20;

    return (
      <g key={`${node.char || "internal"}-${node.freq}`}>
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

        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={node.char ? "#FFFFFF" : "#ADD8E6"}
          stroke="#00008B"
          strokeWidth="2"
        />

        {node.char && (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            fill="#000"
            fontSize="14"
            dy=".3em"
          >
            {`${node.char}`}
          </text>
        )}

        {node.left &&
          renderHuffmanTree(node.left, x - dx, y + levelHeight, dx / 1.5)}
        {node.right &&
          renderHuffmanTree(node.right, x + dx, y + levelHeight, dx / 1.5)}
      </g>
    );
  };

  const renderQueue = (nodes) => {
    return nodes.map((node, index) => (
      <div key={index} className="node">
        {node}
      </div>
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
      <div className="divider">
        <div className="div">
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
          <div className="queue-huffman">
            {renderQueue(steps[currentStep]?.queue || [])}
          </div>
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
        <div className="div">
          <svg width="1000" height="500" style={{ margin: "20px 0" }}>
            {steps[currentStep]?.tree &&
              renderHuffmanTree(steps[currentStep].tree, 500, 40, 200)}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HuffmanVisualizer;
