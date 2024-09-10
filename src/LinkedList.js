import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Node = ({ node, isFirst, x, y, prevPointer, nextX, nextY, isTraversed }) => (
  <div style={{ position: 'absolute', left: x, top: y }}>
    <motion.div
      style={{
        ...styles.node,
        backgroundColor: node.color,
        border: isTraversed ? '3px solid crimson' : 'none',
      }}
      animate={{ scale: [1.5, 1], opacity: [0.5, 1] }}
      transition={{ duration: 0.5 }}
    >
      {node.value}
      {isFirst && <div style={styles.startLabel}><br />Start</div>}
    </motion.div>
    <div style={styles.pointerLabel}>
      <br /><b>Pointer: {prevPointer || 'null'}</b>
    </div>
    {nextX !== undefined && nextY !== undefined && (
      <motion.div
        style={{
          position: 'absolute',
          left: x + 100,
          top: y + 25,
        }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      />
    )}
  </div>
);

const Link = ({ from, to }) => {
  const startX = from.x + 100;
  const startY = from.y + 25;
  const endX = to.x;
  const endY = to.y + 25;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <svg
      style={{
        position: 'absolute',
        left: midX - 50,
        top: midY,
        width: '85px',
        height: '12px',
        zIndex: -1,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0" y1="5" x2="100" y2="5"
        stroke="black"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="5"
          orient="auto"
          fill="black"
        >
          <polygon points="0 0, 10 5, 0 10" />
        </marker>
      </defs>
    </svg>
  );
};

const LinkedList = () => {
  const [nodes, setNodes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState(null);
  const [traversedNodes, setTraversedNodes] = useState([]);
  const containerRef = useRef(null);

  const addNode = (value, position) => {
    const newNode = {
      value,
      color: 'blue',
      x: 0,
      y: 100,
    };

    setNodes((prevNodes) => {
      if (position === 'start') {
        const updatedNodes = [newNode, ...prevNodes].map((node, index) => ({
          ...node,
          x: index * 150 + 50,
        }));
        setMessage(`Added ${value} at the start`);
        return updatedNodes;
      } else if (position !== null && position >= 0 && position < prevNodes.length) {
        const index = position + 1;
        const updatedNodes = [
          ...prevNodes.slice(0, index),
          newNode,
          ...prevNodes.slice(index),
        ].map((node, index) => ({
          ...node,
          x: index * 150 + 50,
        }));
        setMessage(`Added ${value} after node ${prevNodes[position].value}`);
        return updatedNodes;
      } else {
        const updatedNodes = [...prevNodes, newNode].map((node, index) => ({
          ...node,
          x: index * 150 + 50,
        }));
        setMessage(`Added ${value}`);
        return updatedNodes;
      }
    });
  };

  const deleteNode = (value) => {
    setNodes((prevNodes) => {
      const indexToRemove = prevNodes.findIndex(node => node.value === value);
      if (indexToRemove === -1) {
        setMessage('Value not found for deletion');
        return prevNodes;
      }
      const newNodes = prevNodes.filter((_, index) => index !== indexToRemove);
      const updatedNodes = newNodes.map((node, index) => ({
        ...node,
        x: index * 150 + 50,
      }));
      setMessage(`Deleted ${value}`);
      return updatedNodes;
    });
  };

  const searchNode = async (value) => {
    const newTraversedNodes = [];
    for (const node of nodes) {
      newTraversedNodes.push(node.value);
      setTraversedNodes([...newTraversedNodes]);
      
      if (node.value === value) {
        setMessage(`Found ${value}`);
        setTimeout(() => setTraversedNodes([]), 2000); // Remove highlight after 2 seconds
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setMessage('Value not found');
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setPosition(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(parseInt(e.target.value, 10));
  };

  const handleConfirm = () => {
    const intValue = parseInt(inputValue, 10);
    if (isNaN(intValue)) {
      setInputValue('');
      return;
    }

    if (mode === 'add') {
      addNode(intValue, null);
    } else if (mode === 'add-start') {
      addNode(intValue, 'start');
    } else if (mode === 'add-after') {
      addNode(intValue, position);
    } else if (mode === 'delete') {
      deleteNode(intValue);
    } else if (mode === 'search') {
      searchNode(intValue);
    }
  };

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [nodes]);

  return (
    <div style={styles.container} ref={containerRef}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '40px' }}><br />Linked List Visualization</h1>
      </header>
      <div style={styles.listContainer}>
        {nodes.length === 0 ? (
          <p style={styles.emptyMessage}>The list is empty</p>
        ) : (
          <>
            {nodes.map((node, index) => (
              <React.Fragment key={index}>
                {index < nodes.length - 1 && (
                  <Link
                    from={{
                      x: nodes[index].x,
                      y: nodes[index].y
                    }}
                    to={{
                      x: nodes[index + 1].x,
                      y: nodes[index + 1].y
                    }}
                  />
                )}
                <Node
                  node={node}
                  isFirst={index === 0}
                  x={node.x}
                  y={node.y}
                  prevPointer={index === 0 ? 'null' : nodes[index - 1].value}
                  nextX={index < nodes.length - 1 ? nodes[index + 1].x : undefined}
                  nextY={index < nodes.length - 1 ? nodes[index + 1].y : undefined}
                  isTraversed={traversedNodes.includes(node.value)}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.inputContainer}>
        <div style={styles.modeContainer}>
          <button onClick={() => handleModeChange('add')} style={styles.button}>Add</button>
          <button onClick={() => handleModeChange('add-start')} style={styles.button}>Add at Start</button>
          <button onClick={() => handleModeChange('add-after')} style={styles.button}>Add after a Index</button>
          <button onClick={() => handleModeChange('delete')} style={styles.button}>Delete</button>
          <button onClick={() => handleModeChange('search')} style={styles.button}>Search</button>
        </div>

        {mode && (
          <div style={styles.inputSection}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Value to ${mode}`}
              style={styles.textInput}
            />
            {mode === 'add-after' && nodes.length > 0 && (
              <div style={styles.inputWrapper}>
                <input
                  type="number"
                  value={position || ''}
                  onChange={handlePositionChange}
                  placeholder="Index"
                  style={styles.textInput}
                />
              </div>
            )}
            <button onClick={handleConfirm} style={styles.button}>Confirm {mode}</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  listContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '320px',
    width: '90%',
    overflowX: 'auto',
  },
  node: {
    width: '100px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#87CEFA',
    textAlign: 'center',
    position: 'relative',
  },
  startLabel: {
    position: 'absolute',
    bottom: '-30px',
    fontSize: '20px',
    color: 'black',
  },
  pointerLabel: {
    position: 'absolute',
    bottom: '-45px',
    right: '5px',
    fontSize: '18px',
    color: 'black',
  },
  emptyMessage: {
    color: '#888',
  },
  message: {
    color: 'red',
    marginTop: '10px',
    fontSize: '18px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '700px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  textInput: {
    width: '150px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px',
  },
};

export default LinkedList;
