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
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#000"
    strokeWidth="2"
  />
);

const TreeNode = ({ value, isHighlighted, isTraversed }) => (
  <g>
    <circle
      r="20"
      fill="#3498db"
      stroke={isHighlighted ? "#ff4444" : isTraversed ? "#ffeb3b" : "#000"}
      strokeWidth="4"
    />
    <text
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {value}
    </text>
  </g>
);

const BSTApp = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [tree, setTree] = useState(initialTree);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [traversePath, setTraversePath] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [valueToInsert] = useState(25);
  const [explanation, setExplanation] = useState("Press Enter to start execution");

  const calculateNodePosition = (node, x, y, level, width) => {
    if (!node) return null;
    const newWidth = width / 2;
    const yOffset = 80;
    
    const leftChild = calculateNodePosition(node.left, x - newWidth, y + yOffset, level + 1, newWidth);
    const rightChild = calculateNodePosition(node.right, x + newWidth, y + yOffset, level + 1, newWidth);

    return {
      ...node,
      x,
      y,
      children: {
        left: leftChild,
        right: rightChild
      }
    };
  };

  const renderConnections = (node) => {
    if (!node) return null;
    const connections = [];

    if (node.children.left) {
      connections.push(
        <TreeLine
          key={`${node.value}-${node.children.left.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.children.left.x}
          y2={node.children.left.y}
        />
      );
    }
    if (node.children.right) {
      connections.push(
        <TreeLine
          key={`${node.value}-${node.children.right.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.children.right.x}
          y2={node.children.right.y}
        />
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
          <TreeNode
            value={node.value}
            isHighlighted={currentNode === node.value}
            isTraversed={traversePath.includes(node.value)}
          />
        </g>
        {node.children.left && renderNodes(node.children.left)}
        {node.children.right && renderNodes(node.children.right)}
      </>
    );
  };

  const executeStep = () => {
    if (currentLine >= bstAlgo.length) return;

    switch (currentLine) {
      case 0:
        setCurrentNode(50);
        setExplanation("Starting insertion of value " + valueToInsert);
        break;
      case 1:
        setExplanation("Checking if current node is null");
        break;
      case 4:
        if (currentNode) {
          if (valueToInsert < currentNode) {
            setExplanation(`${valueToInsert} < ${currentNode}, going left`);
            const nextNode = findNextNode(tree, currentNode, "left");
            setCurrentNode(nextNode);
            setTraversePath(prev => [...prev, currentNode]);
          }
        }
        break;
      case 5:
        setExplanation("Recursively inserting into left subtree");
        break;
      case 6:
        if (currentNode && valueToInsert > currentNode) {
          setExplanation(`${valueToInsert} > ${currentNode}, going right`);
          const nextNode = findNextNode(tree, currentNode, "right");
          setCurrentNode(nextNode);
          setTraversePath(prev => [...prev, currentNode]);
        }
        break;
      case 13:
        if (!currentNode) {
          setExplanation("Creating new node with value " + valueToInsert);
          setTree(insertNode(tree, valueToInsert));
          setHighlightedNode(valueToInsert);
        }
        break;
      default:
        break;
    }

    setCurrentLine(prev => prev + 1);
  };

  const findNextNode = (node, currentValue, direction) => {
    if (!node) return null;
    if (node.value === currentValue) {
      return direction === "left" ? (node.left ? node.left.value : null) : (node.right ? node.right.value : null);
    }
    if (currentValue < node.value) return findNextNode(node.left, currentValue, direction);
    return findNextNode(node.right, currentValue, direction);
  };

  const insertNode = (node, value) => {
    if (node == null) return { value, left: null, right: null };
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
  }, [currentLine, currentNode]);

  const positionedTree = calculateNodePosition(tree, 300, 50, 0, 300);

  return (
    <div className="flex h-screen">
      {/* Tree on the left side */}
      <div className="w-1/2 bg-white p-5">
        <div className="text-black mb-4 text-xl font-bold">Binary Search Tree Visualization</div>
        <div className="text-black mb-4">{explanation}</div>
        <svg width="600" height="400" className="bg-white">
          {positionedTree && (
            <>
              {renderConnections(positionedTree)}
              {renderNodes(positionedTree)}
            </>
          )}
        </svg>
      </div>
      
      {/* Algorithm on the right side */}
      <div className="w-1/2 bg-white p-5 flex flex-col">
        <div className="text-black mb-4 text-xl font-bold">BST Insertion Algorithm</div>
        <div className="text-black mb-4">Inserting value: {valueToInsert}</div>
        <pre className="bg-gray-100 p-4 rounded-lg">
          {bstAlgo.map((line, index) => (
            <div
              key={index}
              className={`font-mono ${
                index === currentLine ? "bg-yellow-200 text-black" : "text-black"
              } p-1`}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default BSTApp;
