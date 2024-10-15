import React, { useState, useEffect } from 'react';
import './App.css';

function TreeNode(key) {
    return { left: null, right: null, val: key };
}

function insert(root, key) {
    if (root === null) return TreeNode(key);
    if (root.val < key) {
        root.right = insert(root.right, key);
    } else {
        root.left = insert(root.left, key);
    }
    return root;
}

function inOrderTraversal(root, result) {
    if (root) {
        inOrderTraversal(root.left, result);
        result.push(root.val);
        inOrderTraversal(root.right, result);
    }
    return result;
}

function preOrderTraversal(root, result) {
    if (root) {
        result.push(root.val);
        preOrderTraversal(root.left, result);
        preOrderTraversal(root.right, result);
    }
    return result;
}

function postOrderTraversal(root, result) {
    if (root) {
        postOrderTraversal(root.left, result);
        postOrderTraversal(root.right, result);
        result.push(root.val);
    }
    return result;
}

const Bstgame = () => {
    const [bst, setBst] = useState(null);
    const [traversalMethod, setTraversalMethod] = useState('in-order');
    const [traversalValues, setTraversalValues] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        let newBst = null;
        numbers.forEach(num => {
            newBst = insert(newBst, num);
        });
        setBst(newBst);
        setTraversalValues(traversal(traversalMethod, newBst, []));
    }, []);

    useEffect(() => {
        if (bst) {
            setTraversalValues(traversal(traversalMethod, bst, []));
        }
    }, [traversalMethod, bst]);

    const traversal = (method, root, result) => {
        switch (method) {
            case 'in-order':
                return inOrderTraversal(root, result);
            case 'pre-order':
                return preOrderTraversal(root, result);
            case 'post-order':
                return postOrderTraversal(root, result);
            default:
                return [];
        }
    };

    const handleGuess = () => {
        const guess = parseInt(userInput, 10);
        if (!isNaN(guess) && currentIndex < traversalValues.length - 1) {
            const correctNextNumber = traversalValues[currentIndex + 1];
            if (guess === correctNextNumber) {
                setScore(score + 1);
                alert('Correct!');
            } else {
                alert(`Wrong! Next was ${correctNextNumber}`);
            }
            setCurrentIndex(currentIndex + 1);
            setUserInput('');
        }
    };

    const renderTree = (node, x, y, dx) => {
        if (!node) return null;

        return (
            <g key={node.val}>
                <circle cx={x} cy={y} r="20" fill="lightblue" />
                <text x={x} y={y} textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em">
                    {node.val}
                </text>
                {node.left && (
                    <>
                        <line x1={x} y1={y} x2={x - dx} y2={y + 60} stroke="black" />
                        {renderTree(node.left, x - dx, y + 60, dx / 2)}
                    </>
                )}
                {node.right && (
                    <>
                        <line x1={x} y1={y} x2={x + dx} y2={y + 60} stroke="black" />
                        {renderTree(node.right, x + dx, y + 60, dx / 2)}
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="App">
            <h1 style={{ color: 'black' }}>BST Traversal Game</h1><br />
            <select onChange={(e) => setTraversalMethod(e.target.value)} value={traversalMethod}>
                <option value="in-order">In-order</option>
                <option value="pre-order">Pre-order</option>
                <option value="post-order">Post-order</option>
            </select><br /><br />
            <h2 style={{ color: 'black' }}>Score: {score}</h2><br />
            <h2 style={{ color: 'black' }}>Current Traversal: {traversalMethod}</h2><br />
            <svg width="800" height="400">
                {renderTree(bst, 400, 20, 200)}
            </svg>
            {currentIndex < traversalValues.length ? (
                <div>
                    <h2 style={{ color: 'black' }}>Current number: {traversalValues[currentIndex]}</h2><br />
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleGuess();
                        }}
                    />
                </div>
            ) : (
                <h4>Game Over! Final Score: {score}</h4>
            )}
        </div>
    );
};

export default Bstgame;
