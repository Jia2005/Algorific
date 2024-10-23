import React, { useState } from 'react';
import './hash.css'; 

const HashTable = () => {
    const [tableSize, setTableSize] = useState(0);
    const [hashTable, setHashTable] = useState([]);
    const [inputNumber, setInputNumber] = useState('');
    const [animationQueue, setAnimationQueue] = useState([]);

    const handleTableSize = () => {
        setHashTable(new Array(tableSize).fill(null));
    };

    const handleInputNumber = () => {
        const number = parseInt(inputNumber, 10);
        if (isNaN(number)) return;

        const index = number % tableSize;
        const newHashTable = [...hashTable];
        let currentIndex = index;

        const animations = [`Number: ${number}, Index: ${index}`];

        while (newHashTable[currentIndex] !== null) {
            animations.push(`Index ${currentIndex} occupied, trying next index.`);
            currentIndex = (currentIndex + 1) % tableSize;
        }

        newHashTable[currentIndex] = number;
        setHashTable(newHashTable);
        setAnimationQueue(animations);
        setInputNumber('');
    };

    return (
        <div className="hash-table-container">
            <h1>Hash Table with Linear Probing</h1>
            {!hashTable.length ? (
                <>
                    <input
                        type="number"
                        value={tableSize}
                        onChange={(e) => setTableSize(e.target.value)}
                        placeholder="Enter table size"
                    />
                    <button onClick={handleTableSize}>Create Table</button>
                </>
            ) : (
                <>
                    <input
                        type="number"
                        value={inputNumber}
                        onChange={(e) => setInputNumber(e.target.value)}
                        placeholder="Enter number to add"
                    />
                    <button onClick={handleInputNumber}>Add Number</button>
                </>
            )}
            <div className="hash-table">
                {hashTable.map((value, index) => (
                    <div
                        key={index}
                        className={`hash-table-cell ${value !== null ? 'filled' : ''}`}
                    >
                        {value !== null ? value : '-'}
                    </div>
                ))}
            </div>
            <div className="animation-log">
                {animationQueue.map((anim, idx) => (
                    <div key={idx} className="animation-message">{anim}</div>
                ))}
            </div>
        </div>
    );
};

export default HashTable;
