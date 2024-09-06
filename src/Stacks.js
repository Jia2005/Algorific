import React, { useState, useRef } from 'react';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [stackSize, setStackSize] = useState(5); // Default stack size
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isPushing, setIsPushing] = useState(false);

  const handlePushClick = () => {
    setIsPushing(true);
  };

  const push = () => {
    if (stack.length < stackSize) {
      setStack([...stack, inputValue]);
      setMessage(`Pushed Element ${inputValue}`);
      setInputValue('');
    } else {
      setMessage('Stack Full');
    }
    setIsPushing(false);
  };

  const pop = () => {
    if (stack.length > 0) {
      const poppedValue = stack.pop();
      setStack([...stack]);
      setMessage(`Popped Element ${poppedValue}`);
    } else {
      setMessage('Stack Empty');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStackSizeChange = (e) => {
    setStackSize(Number(e.target.value));
    setStack([]);
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{fontSize:'40px'}}><br></br>Stack Visualization</h1>
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

        <div style={styles.buttonContainer}>
          <button onClick={handlePushClick} style={styles.primaryButton}>
            Push
          </button>
        </div>

        {isPushing && (
          <div style={styles.pushInputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter value to push"
              style={styles.textInput}
            />
            <button onClick={push} style={styles.secondaryButton}>
              Confirm Push
            </button>
          </div>
        )}

        <div style={styles.buttonContainer}>
          <button onClick={pop} style={styles.primaryButton}>
            Pop
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
  },
  numberInput: {
    width: '60px',
    textAlign: 'center',
    marginLeft: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  buttonContainer: {
    marginBottom: '10px',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  secondaryButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  textInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  pushInputContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
};

export default Stacks;
