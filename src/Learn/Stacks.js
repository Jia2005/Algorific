import React, { useState, useEffect, useRef } from 'react';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

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
  }, [stack]);

  const push = () => {
    const num = Number(inputValue);
    if (!Number.isInteger(num) || num < 1 || num > 1000 || inputValue.includes('.')) {
      setMessage('Please enter a number between 1 and 999');
      setInputValue('');
      return;
    }

    if (stack.length < maxSize) {
      setStack([...stack, inputValue]);
      setMessage(`Pushed: ${inputValue}`);
    } else {
      setMessage('Stack is full!');
    }
    setInputValue('');
  };

  const pop = () => {
    if (stack.length > 0) {
      const poppedValue = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setMessage(`Popped: ${poppedValue}`);
    } else {
      setMessage('Stack is empty!');
    }
  };

  const resetStack = () => {
    setStack([]);
    setMessage('Stack reset!');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*$/.test(value) && value.length <= 3)) {
      setInputValue(value);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      push();
    }
  };

  const handleStackSizeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setMaxSize(value);
      setStack([]);
      setMessage('');
    }
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>Stack Visualization</h1>
          <button onClick={toggleModal} style={styles.infoButton}>ℹ️</button>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.stackContainer}>
            <div style={styles.stackVisualization}>
              <div style={styles.stack}>
                {stack.length === 0 ? (
                  <p style={styles.emptyMessage}>The stack is empty</p>
                ) : (
                  [...stack].reverse().map((item, index) => (
                    <div 
                      key={index} 
                      style={{
                        ...styles.stackBlock,
                        animation: `fadeIn 0.3s ease-out ${index * 0.1}s`,
                        backgroundColor: `hsl(${200 + index * 15}, 75%, 65%)`,
                      }}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
            </div>
            {message && (
              <div style={{
                ...styles.message,
                backgroundColor: message.includes('between') || message.includes('full') || message.includes('empty')
                  ? '#FFE5E5'
                  : '#E5FFE5',
                color: message.includes('between') || message.includes('full') || message.includes('empty')
                  ? '#D32F2F'
                  : '#2E7D32'
              }}>
                {message}
              </div>
            )}
          </div>

          <div style={styles.controlsContainer}>
            <div style={styles.inputRow}>
              <div style={styles.stackSizeContainer}>
                <label style={styles.label}>Stack Size:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={maxSize}
                  onChange={handleStackSizeChange}
                  style={styles.numberInput}
                />
              </div>
            </div>

            <div style={styles.inputRow}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownInput}
                ref={inputRef}
                placeholder="Enter value to push (1-999)"
                style={styles.textInput}
              />
              <button onClick={push} style={styles.secondary2Button}>
                Push
              </button>
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={pop} style={styles.primaryButton}>
                Pop
              </button>
              <button onClick={resetStack} style={styles.secondaryButton}>
                Reset Stack
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>How to use</h2>
            <div style={styles.modalBody}>
              <div style={styles.instruction}>
                <span style={styles.instructionNumber}>1</span>
                <p style={{ color: 'black' }}>
                  For pushing an element, enter a number between 1 and 100, then press the 'Enter' key or click 'Push'.
                </p>
              </div>
              <div style={styles.instruction}>
                <span style={styles.instructionNumber}>2</span>
                <p style={{ color: 'black' }}>For popping an element, press the 'Delete' key or click 'Pop'.</p>
              </div>
              <div style={styles.instruction}>
                <span style={styles.instructionNumber}>3</span>
                <p style={{ color: 'black' }}>Input rules: Only numbers between 1 and 100 are accepted. No decimals, alphabets, or numbers over 3 digits allowed.</p>
              </div>
            </div>
            <button onClick={toggleModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#F0F4F8',
    backgroundImage: 'linear-gradient(120deg, #f0f4f8 0%, #e6eef5 100%)',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '40px',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
    color: '#1A237E',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E3E8EF',
    paddingBottom: '20px',
  },
  mainContent: {
    display: 'flex',
    gap: '60px',
    alignItems: 'stretch',
    height: '500px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    background: 'linear-gradient(120deg, #1A237E 0%, #3949AB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  infoButton: {
    fontSize: '24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#3949AB',
  },
  stackContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  controlsContainer: {
    flex: '1',
    backgroundColor: '#F8FAFC',
    borderRadius: '15px',
    padding: '30px',
    border: '2px solid #E3E8EF',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  stackVisualization: {
    backgroundColor: '#F8FAFC',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid #E3E8EF',
    height: '100%',
    width: '600px',
    display: 'flex',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: '10px',
    gap: '15px',
    overflow: 'auto',
  },
  stackBlock: {
    width: '80%',
    height: '60px',
    backgroundColor: '#64B5F6',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  message: {
    marginTop: '15px',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  emptyMessage: {
    color: '#94A3B8',
    fontSize: '16px',
    fontStyle: 'italic',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  stackSizeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    fontSize: '18px',
    color: '#334155',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  numberInput: {
    width: '80px',
    textAlign: 'center',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #E2E8F0',
  },
  textInput: {
    flex: '1',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #E2E8F0',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#3949AB',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(57, 73, 171, 0.2)',
  },
  secondaryButton: {
    backgroundColor: '#EF5350',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(239, 83, 80, 0.2)',
  },
  secondary2Button: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    margin: '0px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
    whiteSpace: 'nowrap',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '24px',
    color: '#1A237E',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  instruction: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    fontSize: '16px',
    lineHeight: 1.6,
  },
  instructionNumber: {
    width: '30px',
    height: '30px',
    backgroundColor: '#E3F2FD',
    color: '#1A237E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  closeButton: {
    backgroundColor: '#1A237E',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '25px',
  },
};

export default Stacks;