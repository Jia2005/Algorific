import React, { useState, useEffect, useRef, useCallback } from 'react';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [stackSize, setStackSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
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
        <button onClick={toggleModal} style={styles.infoButton}>ℹ️</button>
      </header>
      
      <div style={styles.mainContent}>
        <div style={styles.stackSide}>
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

        <div style={styles.controlsSide}>
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
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h1>How to use</h1><br />
            <p style={{display: 'flex', justifyContent: 'center'}}>1. For pushing an element, write the value and press the 'Enter' key or click 'Push'.</p><br />
            <p style={{display: 'flex', justifyContent: 'center'}}>2. For popping an element, press the 'Delete' key or click 'Pop'.</p><br />
            <button onClick={toggleModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    marginBottom: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    gap: '100px',
    justifyContent: 'center',
  },
  stackSide: {
    flex: '1',
    maxWidth: '500px',
  },
  controlsSide: {
    flex: '1',
    maxWidth: '500px',
    maxHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  infoButton: {
    position: 'static',
    right: '20px',
    fontSize: '24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#4682B4',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '30px',
    width: '100%',
    minHeight: '400px',
    maxHeight: '600px',
    overflowY: 'auto',
    border: '2px solid #ccc',
    borderRadius: '10px',
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
    borderRadius: '10px',
    fontSize: '18px',
  },
  message: {
    color: 'red',
    marginTop: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  emptyMessage: {
    color: '#888',
    fontSize: '16px',
  },
  stackSizeContainer: {
    marginBottom: '30px',
    width: '100%',
  },
  label: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'black',
  },
  numberInput: {
    width: '80px',
    textAlign: 'center',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid #ccc',
  },
  pushInputContainer: {
    marginBottom: '30px',
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  textInput: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid #ccc',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '12px 40px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
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
    zIndex: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
    color: 'black',
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