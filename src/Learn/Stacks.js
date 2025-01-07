import React, { useState, useEffect, useRef } from 'react';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('pseudo');
  const inputRef = useRef(null);

  const codeExamples = {
    pseudo: `Stack Operations Pseudocode:

push(element):
  if stack is full:
    return overflow
  increment top
  stack[top] = element
  return success

pop():
  if stack is empty:
    return underflow
  element = stack[top]
  decrement top
  return element`,

    cpp: `template <typename T>
class Stack {
private:
    T* arr;
    int top, size;
    
public:
    Stack(int s) {
        top = -1;
        size = s;
        arr = new T[s];
    }
    
    void push(T x) {
        if (top >= size-1) return;
        arr[++top] = x;
    }
    
    T pop() {
        if (top < 0) return T();
        return arr[top--];
    }
};`,

    java: `class Stack<T> {
    private T[] arr;
    private int top;
    private int size;
    
    @SuppressWarnings("unchecked")
    Stack(int s) {
        top = -1;
        size = s;
        arr = (T[]) new Object[s];
    }
    
    void push(T x) {
        if (top >= size-1) return;
        arr[++top] = x;
    }
    
    T pop() {
        if (top < 0) return null;
        return arr[top--];
    }
}`,

    python: `class Stack:
    def __init__(self, size):
        self.size = size
        self.stack = []
        
    def push(self, item):
        if len(self.stack) >= self.size:
            return None
        self.stack.append(item)
        
    def pop(self):
        if len(self.stack) < 1:
            return None
        return self.stack.pop()
        
    def display(self):
        return self.stack`
  };

  useEffect(() => {
    inputRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Delete') pop();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*$/.test(value) && value.length <= 3)) {
      setInputValue(value);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') push();
  };

  const handleSizeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setMaxSize(value);
      setStack([]);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      width: '100%',
      gap: '24px',
      margin: '0px',
      padding: '10px',
      backgroundColor: '#F0F4F8',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(120deg, #f0f4f8 0%, #e6eef5 100%)',
      
    },
    panel: {
      width: '50%',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '32px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      background: 'linear-gradient(120deg, #1A237E 0%, #3949AB 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '24px',
      textAlign: 'center'
    },
    stackVisualization: {
      backgroundColor: '#F8FAFC',
      borderRadius: '12px',
      padding: '24px',
      border: '2px solid #E3E8EF',
      width: '100%',
      marginBottom: '24px',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      height: '340px',
      position: 'relative'
    },
    stackContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      padding: '24px',
      gap: '8px',
      maxHeight: '100%',
      overflowY: 'auto'
    },
    stackBlock: {
      width: '400px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '22px',
      fontWeight: 'bold',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      flexShrink: 0
    },
    emptyMessage: {
      color: '#94A3B8',
      fontStyle: 'italic',
      fontSize: '16px',
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    sizeContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      justifyContent: 'center'
    },
    sizeInput: {
      width: '80px',
      padding: '8px',
      borderRadius: '8px',
      border: '2px solid #E2E8F0',
      textAlign: 'center'
    },
    sizeLabel: {
      fontSize: '16px',
      color: '#4A5568',
      fontWeight: '500'
    },
    inputContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    input: {
      flex: 1,
      padding: '14px',
      borderRadius: '10px',
      border: '2px solid #E2E8F0',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    button: {
      padding: '14px 28px',
      borderRadius: '10px',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    message: {
      padding: '14px',
      borderRadius: '10px',
      marginTop: '20px',
      fontSize: '15px',
      fontWeight: '500',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <h2 style={styles.title}>Stack Visualization</h2>
        <div style={styles.stackVisualization}>
          <div style={styles.stackContainer}>
            {stack.length === 0 ? (
              <p style={styles.emptyMessage}>Stack is empty</p>
            ) : (
              stack.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.stackBlock,
                    backgroundColor: `hsl(${200 + index * 15}, 75%, 65%)`
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.sizeContainer}>
          <label style={styles.sizeLabel}>Stack Size:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxSize}
            onChange={handleSizeChange}
            style={styles.sizeInput}
          />
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownInput}
            ref={inputRef}
            placeholder="Enter value (1-999)"
            style={styles.input}
          />
          <button 
            onClick={push}
            style={{
              ...styles.button,
              backgroundColor: '#3B82F6'
            }}
          >
            Push
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={pop}
            style={{
              ...styles.button,
              backgroundColor: '#10B981'
            }}
          >
            Pop
          </button>
          <button
            onClick={() => setStack([])}
            style={{
              ...styles.button,
              backgroundColor: '#EF4444'
            }}
          >
            Reset
          </button>
        </div>

        {message && (
          <div style={{
            ...styles.message,
            backgroundColor: message.includes('between') || message.includes('full') || message.includes('empty')
              ? '#FEE2E2'
              : '#DCFCE7',
            color: message.includes('between') || message.includes('full') || message.includes('empty')
              ? '#DC2626'
              : '#16A34A'
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={styles.panel}>
        <h2 style={styles.title}>Implementation</h2>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #E2E8F0',
            marginBottom: '16px'
          }}
        >
          <option value="pseudo">Pseudocode</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <pre style={{
          backgroundColor: '#1A202C',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          overflow: 'auto',
          maxHeight: '600px'
        }}>
          <code>{codeExamples[selectedLanguage]}</code>
        </pre>
      </div>
    </div>
  );
};

export default Stacks;