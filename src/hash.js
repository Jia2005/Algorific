import React, { useState } from 'react';

const HashTable = () => {
  const [tableSize, setTableSize] = useState('');
  const [value, setValue] = useState('');
  const [hashTable, setHashTable] = useState([]);
  const [collisions, setCollisions] = useState(0);

  const handleTableSizeChange = (e) => {
    setTableSize(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const insertValue = () => {
    const size = parseInt(tableSize);
    if (isNaN(size) || size <= 0 || size > 10) {
      alert('Please enter a valid table size between 1 and 10.');
      return;
    }

    const newHashTable = [...hashTable];
    let index = value % size;
    let startIndex = index;

    while (newHashTable[index] !== undefined) {
      collisions += 1;
      index = (index + 1) % size;
      if (index === startIndex) {
        alert('The table is full');
        return;
      }
    }

    newHashTable[index] = value;
    setHashTable(newHashTable);
    setCollisions(collisions);
    setValue('');
  };

  return (
    <div className="container">
      <h1>Hash Table Visualization</h1>
      <div className="input-group">
        <h2 className="heading">Enter Table Size</h2>
        <input
          type="number"
          value={tableSize}
          onChange={handleTableSizeChange}
          placeholder="Table Size"
        />
      </div>
      <div className="input-group">
        <h2 className="heading">Enter Value</h2>
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder="Value to Insert"
        />
      </div>
      <button onClick={insertValue}>Insert Value</button>
      <h2>Hash Table</h2>
      <ul className="hash-table">
        {hashTable.map((item, index) => (
          <li key={index}>
            Index {index}: {item !== undefined ? item : 'Empty'}
          </li>
        ))}
      </ul>
      <h2>Collisions: {collisions}</h2>
    </div>
  );
};

export default HashTable;
