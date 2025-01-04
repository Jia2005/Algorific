import React, { useState, useEffect } from "react";

const bstAlgo = [
  "function insert(node, value) {",
  "    if (node == null) {",
  "        return newNode(value);",
  "    }",
  "    if (value < node.value) {",
  "        node.left = insert(node.left, value);",
  "    } else if (value > node.value) {",
  "        node.right = insert(node.right, value);",
  "    }",
  "    return node;",
  "}",
  "",
  "function newNode(value) {",
  "    return { value: value, left: null, right: null };",
  "}"
];

const initialTree = {
  value: 50,
  left: { value: 30, left: { value: 20, left: null, right: null }, right: { value: 40, left: null, right: null } },
  right: { value: 70, left: { value: 60, left: null, right: null }, right: { value: 80, left: null, right: null } }
};

const TreeLine = ({ x1, y1, x2, y2 }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000" strokeWidth="2" />
);

const TreeNode = ({ value, isHighlighted, isTraversed }) => (
  <g>
    <circle r="20" fill="#3498db" stroke={isHighlighted ? "#ff4444" : isTraversed ? "#ffeb3b" : "#000"} strokeWidth="4" />
    <text fill="white" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="bold">
      {value}
    </text>
  </g>
);

const BSTApp = () => {
  const [tree, setTree] = useState(initialTree);
  const [currentNode, setCurrentNode] = useState(tree);
  const [valueToInsert] = useState(25);
  const [explanation, setExplanation] = useState("Press Enter to start execution");
  const [currentLine, setCurrentLine] = useState(0);

  const calculateNodePosition = (node, x, y, level, width) => {
    if (!node) return null;
    const newWidth = width / 2;
    const yOffset = 80;
    const leftChild = calculateNodePosition(node.left, x - newWidth, y + yOffset, level + 1, newWidth);
    const rightChild = calculateNodePosition(node.right, x + newWidth, y + yOffset, level + 1, newWidth);
    return { ...node, x, y, children: { left: leftChild, right: rightChild } };
  };

  const renderConnections = (node) => {
    if (!node) return null;
    const connections = [];
    if (node.children.left) {
      connections.push(
        <TreeLine key={`${node.value}-${node.children.left.value}`} x1={node.x} y1={node.y} x2={node.children.left.x} y2={node.children.left.y} />
      );
    }
    if (node.children.right) {
      connections.push(
        <TreeLine key={`${node.value}-${node.children.right.value}`} x1={node.x} y1={node.y} x2={node.children.right.x} y2={node.children.right.y} />
      );
    }
    return [
      ...connections,
      node.children.left && renderConnections(node.children.left),
      node.children.right && renderConnections(node.children.right)
    ];
  };

  const renderNodes = (node) => {
    if (!node) return null;
    return (
      <>
        <g transform={`translate(${node.x},${node.y})`}>
          <TreeNode value={node.value} isHighlighted={currentNode && currentNode.value === node.value} />
        </g>
        {node.children.left && renderNodes(node.children.left)}
        {node.children.right && renderNodes(node.children.right)}
      </>
    );
  };

  const executeStep = () => {
    if (currentNode === null) return;
    if (currentLine < bstAlgo.length) {
      setExplanation(bstAlgo[currentLine]);
      setCurrentLine(prevLine => prevLine + 1);
    }
    if (valueToInsert < currentNode.value) {
      if (currentNode.left === null) {
        setExplanation(`Inserting ${valueToInsert} to the left of ${currentNode.value}`);
        const updatedTree = insertNode(tree, valueToInsert);
        setTree(updatedTree);
        setCurrentNode(null);
      } else {
        setExplanation(`Traversing left from ${currentNode.value}`);
        setCurrentNode(currentNode.left);
      }
    } else if (valueToInsert > currentNode.value) {
      if (currentNode.right === null) {
        setExplanation(`Inserting ${valueToInsert} to the right of ${currentNode.value}`);
        const updatedTree = insertNode(tree, valueToInsert);
        setTree(updatedTree);
        setCurrentNode(null);
      } else {
        setExplanation(`Traversing right from ${currentNode.value}`);
        setCurrentNode(currentNode.right);
      }
    } else {
      setExplanation(`${valueToInsert} already exists in the tree`);
      setCurrentNode(null);
    }
  };

  const insertNode = (node, value) => {
    if (node == null) {
      return { value, left: null, right: null };
    }
    if (value < node.value) {
      return { ...node, left: insertNode(node.left, value) };
    } else if (value > node.value) {
      return { ...node, right: insertNode(node.right, value) };
    }
    return node;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        executeStep();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentNode, currentLine, tree]);

  const positionedTree = calculateNodePosition(tree, 300, 50, 0, 300);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:'40px', height: '100vh', backgroundColor: '#f0f4f8' }}>
      <div style={{height:'85vh',flex: 1, padding: '20px', display: 'flex',marginLeft:'15px', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Binary Search Tree Visualization</h1>
        <p style={{ color: '#555', marginBottom: '16px' }}>{explanation}</p>
        <svg width="600" height="400" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {positionedTree && (
            <>
              {renderConnections(positionedTree)}
              {renderNodes(positionedTree)}
            </>
          )}
        </svg>
      </div>
      <div style={{marginRight:'15px',height:'85vh', flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>BST Insertion Algorithm</h1>
        <p style={{ color: '#555', marginBottom: '16px' }}>Inserting value: {valueToInsert}</p>
        <pre style={{ backgroundColor: '#f8f8f8', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
          {bstAlgo.map((line, index) => (
            <div key={index} style={{ fontFamily: 'monospace', padding: '8px', backgroundColor: "transparent", color: "#333" }}>
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default BSTApp;
