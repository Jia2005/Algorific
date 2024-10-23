import React, { useState, useEffect } from "react";
import './bst.css';

const bstAlgo = [
  "function insert(node, value) {",
  "  if (node == null) {",
  "    return newNode(value);",
  "  }",
  "  if (value < node.value) {",
  "    node.left = insert(node.left, value);",
  "  } else if (value > node.value) {",
  "    node.right = insert(node.right, value);",
  "  }",
  "  return node;",
  "}",
  "function newNode(value) {",
  "  return { value: value, left: null, right: null };",
  "}"
];

const initialTree = {
  value: 50,
  left: { value: 30, left: { value: 20, left: null, right: null }, right: { value: 40, left: null, right: null } },
  right: { value: 70, left: { value: 60, left: null, right: null }, right: { value: 80, left: null, right: null } }
};

function BSTApp() {
  const [currentLine, setCurrentLine] = useState(0);
  const [tree, setTree] = useState(initialTree);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [traversePath, setTraversePath] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (currentLine < bstAlgo.length) {
        const step = bstAlgo[currentLine];
        executeStep(step);
        setCurrentLine((prev) => prev + 1);
      }
    }
  };

  const executeStep = (step) => {
    if (step.includes("insert")) {
      const valueToInsert = 25;
      if (!isValueInTree(tree, valueToInsert)) {
        const path = traverseToInsert(tree, valueToInsert);
        setTraversePath(path);
        setTree(insertNode(tree, valueToInsert));
      } else {
        setHighlightedNode(valueToInsert);
      }
    }
  };

  const insertNode = (node, value) => {
    if (node == null) return newNode(value);
    if (value < node.value) node.left = insertNode(node.left, value);
    else if (value > node.value) node.right = insertNode(node.right, value);
    return node;
  };

  const newNode = (value) => {
    return { value: value, left: null, right: null };
  };

  const isValueInTree = (node, value) => {
    if (!node) return false;
    if (node.value === value) return true;
    return value < node.value ? isValueInTree(node.left, value) : isValueInTree(node.right, value);
  };

  const traverseToInsert = (node, value, path = []) => {
    if (!node) return path;
    path.push(node.value);
    if (value < node.value) return traverseToInsert(node.left, value, path);
    else if (value > node.value) return traverseToInsert(node.right, value, path);
    return path;
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="node-container">
        <div
          className={`node ${highlightedNode === node.value ? "highlight" : ""} ${traversePath.includes(node.value) ? "traverse" : ""}`}
        >
          {node.value}
        </div>
        <div className="children">
          <div className="left">{renderTree(node.left)}</div>
          <div className="right">{renderTree(node.right)}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlightedNode(null);
      setTraversePath([]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [highlightedNode, traversePath]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "monospace",
        color: "#fff",
        backgroundColor: "#282c34"
      }}
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          color: "#000",
          overflowY: "auto"
        }}
      >
        <h3>BST Algorithm - Step by Step</h3>
        <pre>
          {bstAlgo.map((line, index) => (
            <code
              key={index}
              style={{
                backgroundColor: index === currentLine ? "yellow" : "inherit",
                color: index === currentLine ? "#000" : "#000"
              }}
            >
              {line}
            </code>
          ))}
        </pre>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: "#282c34",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="tree-visualization">{renderTree(tree)}</div>
      </div>
    </div>
  );
}

export default BSTApp;
