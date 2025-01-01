import { color } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [stackSize, setStackSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const inputRef = useRef(null);

  const push = () => {
    if (isNaN(inputValue) || inputValue.trim() === '') {
      setMessage('Invalid Input');
      setInputValue('');
      return;
    }

    if (stack.length < stackSize) {
      setStack([...stack, inputValue]);
      setMessage(`Pushed Element: ${inputValue}`);
    } else {
      setMessage('Stack Full');
    }
    setInputValue('');
  };

  const pop = useCallback(() => {
    if (stack.length > 0) {
      const poppedValue = stack[stack.length - 1];
      setStack((prevStack) => prevStack.slice(0, -1));
      setMessage(`Popped Element: ${poppedValue}`);
    } else {
      setMessage('Stack Empty');
    }
  }, [stack]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStackSizeChange = (e) => {
    setStackSize(Number(e.target.value));
    setStack([]);
    setMessage('');
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      push();
    }
  };

  useEffect(() => {
    inputRef.current.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
        pop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pop]); 

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '40px' }}>Stack Visualization</h1>
        <button onClick={toggleModal} style={styles.infoButton}>ℹ️</button> {/* Info button */}
      </header>
      <div style={styles.stackContainer}>
        <div style={styles.stack}>
          {stack.length === 0 ? (
            <p style={styles.emptyMessage}>The stack is empty</p>
          ) : (
            stack.map((item, index) => (
              <div key={index} style={styles.stackBlock}>
                {item}
              </div>
            ))
          )}
        </div>
        {message && <p style={styles.message}>{message}</p>}
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.stackSizeContainer}>
          <label style={styles.label}>
            Stack Size:
            <input
              type="number"
              value={stackSize}
              onChange={handleStackSizeChange}
              style={styles.numberInput}
            />
          </label>
        </div>

        <div style={styles.pushInputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownInput}
            ref={inputRef}
            placeholder="Enter value to push"
            style={styles.textInput}
          />
          <button onClick={push} style={styles.secondaryButton}>
            Push
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={pop} style={styles.primaryButton}>
            Pop
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h1>How to use</h1><br></br>
            <p style={{display:'flex', justifyContent:'center'}}>1. For pushing an element, write the value and press the 'Enter' key or click 'Push'.</p><br/>
            <p style={{display:'flex', justifyContent:'center'}}>2. For popping an element, press the 'Delete' key or click 'Pop'.</p><br/>
            <button onClick={toggleModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'sticky',
    marginBottom: '10px',
    textAlign: 'center',
    zIndex: 10,
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoButton: {
    fontSize: '24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#4682B4',
  },
  stackContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    maxHeight: '400px',
    overflowY: 'auto',
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  stackBlock: {
    width: '90%',
    height: '50px',
    backgroundColor: '#4682B4',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    borderRadius: '5px',
    fontSize: '18px',
  },
  message: {
    color: 'red',
    marginTop: '10px',
    fontSize: '18px',
  },
  emptyMessage: {
    color: '#888',
    fontSize: '16px',
  },
  inputContainer: {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stackSizeContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    marginRight: '10px',
    color: 'black',
  },
  numberInput: {
    width: '60px',
    textAlign: 'center',
    marginLeft: '100px',
    padding: '5px',
    fontSize: '16px',
  },
  buttonContainer: {
    marginBottom: '10px',
  },
  primaryButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    height: '40px',
    width: '100px',
    marginTop: '6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  secondaryButton: {
    marginTop: '0px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    height: '40px',
    width: '100px',
    fontSize: '16px',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  textInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid black',
    marginRight: '10px',
    width: '200px',
  },
  pushInputContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
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

export default Stacks;
