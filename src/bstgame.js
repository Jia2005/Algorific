import React, { useState, useEffect } from 'react';
import './App.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

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
    const [traversalMethod, setTraversalMethod] = useState('In-order');
    const [traversalValues, setTraversalValues] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        let newBst = null;
        numbers.forEach(num => {
            newBst = insert(newBst, num);
        });
        setBst(newBst);
        setTraversalValues(traversal(traversalMethod, newBst, []));
    }, [traversalMethod]);

    useEffect(() => {
        if (bst) {
            setTraversalValues(traversal(traversalMethod, bst, []));
        }
    }, [traversalMethod, bst]);

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
                swal("Correct!","Keep Going ✨💎","success");
            } else if (guess === correctNextNumber && currentIndex === traversalValues.length - 2) {
                setScore(score + 10);
                swal(`Your final score is ${score}`)
                .then((value) => {
                    navigate('/home');
                });
            } else {
                swal("Wrong!",`The next number in series was ${correctNextNumber}`,"error");
            }
            setCurrentIndex(currentIndex + 1);
            setUserInput('');
        }
        if(currentIndex === traversalValues.length - 1) {
            swal(`Your final score is ${score}`)
            .then((value) => {
                navigate('/home');
            });
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
                        <line x1={x-20} y1={y} x2={x - 20 - dx} y2={y + 60} stroke="black" />
                        {renderTree(node.left, x - dx, y + 60, dx / 2)}
                    </>
                )}
                {node.right && (
                    <>
                        <line x1={x+20} y1={y} x2={x + 20 + dx} y2={y + 60} stroke="black" />
                        {renderTree(node.right, x + dx, y + 60, dx / 2)}
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="App" style={{padding: "20px 0"}}>
            <h1 style={{ color: 'black' }}>BST Traversal Game</h1><br />
            <select style={{fontSize: "18px"}} onChange={(e) => setTraversalMethod(e.target.value)} value={traversalMethod}>
                <option value="In-order">In-order</option>
                <option value="Pre-order">Pre-order</option>
                <option value="Post-order">Post-order</option>
            </select><br /><br />
            <h2 style={{ color: 'black' }}>Score: {score}</h2><br />
            <h2 style={{ color: 'black' }}>Current Traversal: {traversalMethod}</h2><br />
            <svg width="800" height="400">
                {renderTree(bst, 400, 20, 200)}
            </svg>
            <div style={{color: "black"}}>
                <h2>Current number: {traversalValues[currentIndex]}</h2><br />
                What will be the next number ?
                <input
                    type="text"
                    style={{justifyContent:'center', display:'flex', alignContent:'center'}}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleGuess();
                    }}
                />
            </div>
        </div>
    );
};

export default Bstgame;
