import React, { useState } from 'react';
import './huffman.css';

class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

const buildHuffmanTree = (frequencies) => {
    const nodes = Object.entries(frequencies).map(([char, freq]) => new Node(char, freq));
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const newNode = new Node(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        nodes.push(newNode);
    }
    return nodes[0];
};

const generateCodes = (node, prefix = '', codes = {}) => {
    if (node) {
        if (node.char) {
            codes[node.char] = prefix;
        }
        generateCodes(node.left, prefix + '0', codes);
        generateCodes(node.right, prefix + '1', codes);
    }
    return codes;
};

const HuffmanVisualizer = () => {
    const [input, setInput] = useState('');
    const [codes, setCodes] = useState({});
    const [encodedString, setEncodedString] = useState('');
    const [tree, setTree] = useState(null);
    const [showOutput, setShowOutput] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleEncode = () => {
        const frequencies = {};
        for (const char of input) {
            frequencies[char] = (frequencies[char] || 0) + 1;
        }
        const huffmanTree = buildHuffmanTree(frequencies);
        const huffmanCodes = generateCodes(huffmanTree);
        const encoded = input.split('').map(char => huffmanCodes[char]).join('');

        setCodes(huffmanCodes);
        setEncodedString(encoded);
        setTree(huffmanTree);
        setShowOutput(true);
    };

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    const renderTree = (node) => {
        if (!node) return null;
        return (
            <div className="tree-node">
                <div className="tree-label">{node.char ? `${node.char}: ${node.freq}` : `* : ${node.freq}`}</div>
                <div className="tree-children">
                    {renderTree(node.left)}
                    {renderTree(node.right)}
                </div>
            </div>
        );
    };

    return (
        <div className="huffman-visualizer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="title">Huffman Encoding Visualizer</h1>
                <button onClick={toggleModal} className='infoButton' style={{ fontSize: '24px', background: 'transparent', border: 'none', color: '#4682B4', marginTop:'30px' }}>
                    ℹ️
                </button>
            </div><br/><br/><br/><br/>

            <div className="content">
                <div className="input-section">
                    <p style={{ color: 'black', fontSize: '16px', fontWeight: '600' }}>Enter the word you want to encode</p><br />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter the word"
                    />
                    <button onClick={handleEncode}>Encode</button>
                    {showOutput && (
                        <div className="output-section">
                            <h3>Huffman Codes:</h3>
                            <pre>{JSON.stringify(codes, null, 2)}</pre>
                            <h3>Encoded String:</h3>
                            <p>{encodedString}</p>
                        </div>
                    )}
                </div>
                <div className="tree-section">
                    <h2>Huffman Tree</h2>
                    <div className="tree-container">{renderTree(tree)}</div>
                </div>
            </div>

            {showModal && (
                <div className='modal'>
                    <div className='modalContent'>
                        <h1>How to use</h1><br />
                        <p style={{ display: 'flex', color: 'black', textAlign:'left'}}>1. Enter a word in the input field.</p>
                        <p style={{ display: 'flex', color: 'black', textAlign:'left'}}>2. Click 'Encode' to generate Huffman codes and the encoded string.</p>
                        <p style={{ display: 'flex', color: 'black', textAlign:'left' }}>3. The Huffman tree visualization will appear below the input.</p><br/>
                        <button onClick={toggleModal} className='CloseButton'>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HuffmanVisualizer;
