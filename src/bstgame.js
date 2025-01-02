import React, { useState, useEffect, useRef } from 'react';
import './bstgame.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TreeNode(key) {
    return { left: null, right: null, val: key };
}

function getHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function insert(root, key, currentHeight = 1) {
    if (root === null) return TreeNode(key);
    
    if (root.val < key) {
        if (!root.right || getHeight(root.right) < 2) {
            root.right = insert(root.right, key, currentHeight + 1);
        }
    } else {
        if (!root.left || getHeight(root.left) < 2) {
            root.left = insert(root.left, key, currentHeight + 1);
        }
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
    const [traversalMethod, setTraversalMethod] = useState('In-order');
    const [traversalValues, setTraversalValues] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        generateNewTree();
    }, []);

    useEffect(() => {
        if (bst) {
            setTraversalValues(traversal(traversalMethod, bst, []));
        }
    }, [traversalMethod, bst]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex]);

    const generateNewTree = () => {
        const numbers = [];
        while (numbers.length < 7) {
            const num = Math.floor(Math.random() * 99) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        numbers.sort((a, b) => a - b);
        
        let newBst = null;
        const mid = Math.floor(numbers.length / 2);
        newBst = insert(newBst, numbers[mid]);
        
        for (let i = 0; i < numbers.length; i++) {
            if (i !== mid) {
                newBst = insert(newBst, numbers[i]);
            }
        }
        setBst(newBst);
    };

    const traversal = (method, root, result) => {
        switch (method) {
            case 'In-order':
                return inOrderTraversal(root, result);
            case 'Pre-order':
                return preOrderTraversal(root, result);
            case 'Post-order':
                return postOrderTraversal(root, result);
            default:
                return [];
        }
    };

    const handleGuess = () => {
        const guess = parseInt(userInput, 10);
        if (!isNaN(guess) && currentIndex < traversalValues.length - 1) {
            const correctNextNumber = traversalValues[currentIndex + 1];
            if (guess === correctNextNumber && currentIndex <= traversalValues.length - 3) {
                setScore(score + 10);
                Swal.fire({
                    title: 'Correct!',
                    text: 'Keep Going ✨💎',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    inputRef.current.focus();
                });
            } else if (guess === correctNextNumber && currentIndex === traversalValues.length - 2) {
                setScore(prevScore => prevScore + 10);
                Swal.fire({
                    title: 'Game Completed!',
                    text: `Final Score: ${score + 10}`,
                    icon: 'success',
                    confirmButtonText: 'Home'
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    title: 'Wrong!',
                    text: `The next number was ${correctNextNumber}`,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    inputRef.current.focus();
                });
            }
            setCurrentIndex(currentIndex + 1);
            setUserInput('');
        }
    };

    const renderTree = (node, x, y, dx) => {
        if (!node) return null;
        const levelHeight = 70;
        const nodeRadius = 25;

        return (
            <g key={node.val}>
                <circle 
                    cx={x} 
                    cy={y} 
                    r={nodeRadius} 
                    fill="rgba(135, 206, 250, 0.7)"
                    stroke="#4682B4"
                    strokeWidth="2"
                />
                <text 
                    x={x} 
                    y={y} 
                    textAnchor="middle" 
                    fill="#333"
                    fontSize="16"
                    fontWeight="bold"
                    dy=".3em"
                >
                    {node.val}
                </text>
                {node.left && (
                    <>
                        <line 
                            x1={x - nodeRadius * Math.cos(Math.PI / 4)} 
                            y1={y + nodeRadius * Math.sin(Math.PI / 4)}
                            x2={x - dx + nodeRadius * Math.cos(Math.PI / 4)}
                            y2={y + levelHeight - nodeRadius * Math.sin(Math.PI / 4)}
                            stroke="#4682B4"
                            strokeWidth="2"
                        />
                        {renderTree(node.left, x - dx, y + levelHeight, dx / 2)}
                    </>
                )}
                {node.right && (
                    <>
                        <line 
                            x1={x + nodeRadius * Math.cos(Math.PI / 4)}
                            y1={y + nodeRadius * Math.sin(Math.PI / 4)}
                            x2={x + dx - nodeRadius * Math.cos(Math.PI / 4)}
                            y2={y + levelHeight - nodeRadius * Math.sin(Math.PI / 4)}
                            stroke="#4682B4"
                            strokeWidth="2"
                        />
                        {renderTree(node.right, x + dx, y + levelHeight, dx / 2)}
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="App" style={{ padding: "20px 0" }}>
            <h1 style={{ color: 'black', marginBottom: '20px' }}>BST Traversal Game</h1>
            <select 
                style={{ 
                    fontSize: "18px",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    border: "2px solid #4682B4",
                    marginBottom: "20px"
                }} 
                onChange={(e) => setTraversalMethod(e.target.value)} 
                value={traversalMethod}
            >
                <option value="In-order">In-order</option>
                <option value="Pre-order">Pre-order</option>
                <option value="Post-order">Post-order</option>
            </select>
            <h2 style={{ color: 'black', marginBottom: '15px' }}>Score: {score}</h2>
            <h2 style={{ color: 'black', marginBottom: '20px' }}>Current Traversal: {traversalMethod}</h2>
            <svg width="800" height="300" style={{ margin: "20px 0" }}>
                {renderTree(bst, 400, 40, 180)}
            </svg>
            <div style={{ color: "black" }}>
                <h2 style={{ marginBottom: '15px' }}>Current number: {traversalValues[currentIndex]}</h2>
                <p style={{ marginBottom: '15px' }}>What will be the next number?</p>
                <input
                    ref={inputRef}
                    type="text"
                    style={{ 
                        fontSize: "18px",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "2px solid #4682B4",
                        margin: "0 auto",
                        display: "block",
                        width: "120px",
                        textAlign: "center"
                    }}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleGuess();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Bstgame;