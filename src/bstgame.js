import React, { useState, useEffect, useRef } from 'react';
import './bstgame.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TreeNode(key) {
    return { left: null, right: null, val: key };
}

const Bstgame = () => {
    const [bst, setBst] = useState(null);
    const [traversalMethod, setTraversalMethod] = useState('In-order');
    const [traversalValues, setTraversalValues] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [showModal, setShowModal] = useState(false);
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
        const maxHeight = 4;

        const buildRandomTree = (start, end, currentHeight = 1) => {
            if (start > end || currentHeight > maxHeight) return null;
            const mid = Math.floor((start + end) / 2);
            let node = TreeNode(numbers[mid]);

            if (Math.random() > 0.5) {
                node.left = buildRandomTree(start, mid - 1, currentHeight + 1);
            }
            if (Math.random() > 0.5) {
                node.right = buildRandomTree(mid + 1, end, currentHeight + 1);
            }

            return node;
        };

        newBst = buildRandomTree(0, numbers.length - 1);

        if (!newBst) {
            newBst = TreeNode(numbers[0]);
        }

        if (countNodes(newBst) < 8) {
            const requiredNodes = 8 - countNodes(newBst);
            for (let i = 0; i < requiredNodes; i++) {
                const randomNum = Math.floor(Math.random() * 99) + 1;
                if (!numbers.includes(randomNum)) {
                    numbers.push(randomNum);
                    newBst = insert(newBst, randomNum);
                }
            }
        }

        setBst(newBst);
    };

    const countNodes = (node) => {
        if (!node) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    };

    const inOrderTraversal = (node, result) => {
        if (node) {
            inOrderTraversal(node.left, result);
            result.push(node.val);
            inOrderTraversal(node.right, result);
        }
        return result;
    };

    const preOrderTraversal = (node, result) => {
        if (node) {
            result.push(node.val);
            preOrderTraversal(node.left, result);
            preOrderTraversal(node.right, result);
        }
        return result;
    };

    const postOrderTraversal = (node, result) => {
        if (node) {
            postOrderTraversal(node.left, result);
            postOrderTraversal(node.right, result);
            result.push(node.val);
        }
        return result;
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

    const insert = (node, key) => {
        if (!node) return TreeNode(key);
        if (key < node.val) {
            node.left = insert(node.left, key);
        } else {
            node.right = insert(node.right, key);
        }
        return node;
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
        const levelHeight = 80;
        const nodeRadius = 30;

        return (
            <g key={node.val}>
                <circle 
                    cx={x} 
                    cy={y} 
                    r={nodeRadius} 
                    fill="#00bcd4"
                    stroke="#4682B4"
                    strokeWidth="3"
                    style={{ cursor: 'pointer' }}
                />
                <text 
                    x={x} 
                    y={y} 
                    textAnchor="middle" 
                    fill="#fff"
                    fontSize="18"
                    fontWeight="bold"
                    dy=".3em"
                >
                    {node.val}
                </text>
                {node.left && (
                <g>
                    <line 
                        x1={x - nodeRadius * Math.cos(Math.PI / 8)} 
                        y1={y + nodeRadius * Math.sin(Math.PI / 8)} 
                        x2={x - dx * 0.8} 
                        y2={y + levelHeight - nodeRadius * 0.8} 
                        stroke="#4682B4"
                        strokeWidth="3"
                        strokeLinejoin="round"
                    />
                    {renderTree(node.left, x - dx * 0.8, y + levelHeight, dx / 1.5)}
                </g>
            )}
            {node.right && (
                <g>
                    <line 
                        x1={x + nodeRadius * Math.cos(Math.PI / 8)} 
                        y1={y + nodeRadius * Math.sin(Math.PI / 8)} 
                        x2={x + dx * 0.8} 
                        y2={y + levelHeight - nodeRadius * 0.8} 
                        stroke="#4682B4"
                        strokeWidth="3"
                        strokeLinejoin="round"
                    />
                    {renderTree(node.right, x + dx * 0.8, y + levelHeight, dx / 1.5)}
                </g>
            )}
            </g>
        );
    };

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="App" style={{ padding: "20px 0" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'black', marginBottom: '20px', marginTop:'40px', fontWeight:'bold', fontSize:'40px' }}>BST Traversal Game</h1>
                <button 
                    onClick={toggleModal} 
                    style={{ fontSize: '24px', background: 'transparent', border: 'none', color: '#4682B4' , marginTop:'20px'}}
                >
                    ℹ️
                </button>
            </div>

            {showModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h1>How to Play</h1><br/>
                        <p style={{textAlign:'left'}}>1. The game displays a binary search tree (BST) structure.</p>
                        <p style={{textAlign:'left'}}>2. Select a traversal method: In-order, Pre-order, or Post-order.</p>
                        <p style={{textAlign:'left'}}>3. The game will show a number from the selected traversal.</p>
                        <p style={{textAlign:'left'}}>4. Guess what the next number is in the traversal order.</p>
                        <p style={{textAlign:'left'}}>5. If your guess is correct, you earn points!</p><br/>
                        <button onClick={toggleModal} style={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}

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
            <svg width="800" height="400" style={{ margin: "20px 0" }}>
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

const styles = {
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        color: 'black',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        marginTop: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
      },
};

export default Bstgame;
