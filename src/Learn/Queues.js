import React, { useState, useEffect, useRef } from 'react';

const Queues = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pseudo');
  const inputRef = useRef(null);

  const codeExamples = {
    pseudo: `Queue Operations Pseudocode:

enqueue(element):
  if queue is full:
    return overflow
  increment rear
  queue[rear] = element
  return success

dequeue():
  if queue is empty:
    return underflow
  element = queue[front]
  increment front
  return element`,

    cpp: `template <typename T>
class Queue {
private:
    T* arr;
    int front, rear, size;
    
public:
    Queue(int s) {
        front = rear = -1;
        size = s;
        arr = new T[s];
    }
    
    void enqueue(T x) {
        if (rear == size-1) return;
        if (front == -1) front = 0;
        arr[++rear] = x;
    }
    
    T dequeue() {
        if (front == -1) return T();
        T x = arr[front];
        if (front == rear)
            front = rear = -1;
        else
            front++;
        return x;
    }
};`,

    java: `class Queue<T> {
    private T[] arr;
    private int front, rear, size;
    
    @SuppressWarnings("unchecked")
    Queue(int s) {
        front = rear = -1;
        size = s;
        arr = (T[]) new Object[s];
    }
    
    void enqueue(T x) {
        if (rear == size-1) return;
        if (front == -1) front = 0;
        arr[++rear] = x;
    }
    
    T dequeue() {
        if (front == -1) return null;
        T x = arr[front];
        if (front == rear)
            front = rear = -1;
        else
            front++;
        return x;
    }
}`,

    python: `class Queue:
    def __init__(self, size):
        self.size = size
        self.queue = []
        
    def enqueue(self, item):
        if len(self.queue) >= self.size:
            return None
        self.queue.append(item)
        
    def dequeue(self):
        if len(self.queue) < 1:
            return None
        return self.queue.pop(0)
        
    def display(self):
        return self.queue`
  };

  useEffect(() => {
    inputRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Delete') dequeue();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [queue]);

  const enqueue = () => {
    const num = Number(inputValue);
    if (!Number.isInteger(num) || num < 1 || num > 1000 || inputValue.includes('.')) {
      setMessage('Please enter a number between 1 and 999');
      setInputValue('');
      return;
    }
    if (queue.length < maxSize) {
      setQueue([...queue, inputValue]);
      setMessage(`Enqueued: ${inputValue}`);
    } else {
      setMessage('Queue is full!');
    }
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const removedValue = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      setMessage(`Dequeued: ${removedValue}`);
    } else {
      setMessage('Queue is empty!');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*$/.test(value) && value.length <= 3)) {
      setInputValue(value);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') enqueue();
  };

  const handleSizeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 100) {
      setMaxSize(value);
      setQueue([]);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      width: '100%',
      gap: '24px',
      padding: '24px',
      backgroundColor: '#F0F4F8',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(120deg, #f0f4f8 0%, #e6eef5 100%)'
    },
    panel: {
      width: '50%',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '32px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(120deg, #1A237E 0%, #3949AB 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '24px',
      textAlign: 'center'
    },
    queueVisualization: {
      backgroundColor: '#F8FAFC',
      borderRadius: '12px',
      padding: '24px',
      border: '2px solid #E3E8EF',
      overflowX: 'auto',
      width: '100%',
      marginBottom: '24px',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    queue: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px',
      width: 'fit-content',
      minHeight: '100px',
      padding: '8px'
    },
    queueBlock: {
      minWidth: '100px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '22px',
      fontWeight: 'bold',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      flexShrink: 0,
      transition: 'transform 0.2s ease',
      cursor: 'default'
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
      backdropFilter: 'blur(5px)'
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '500px',
      width: '90%',
      textAlign: 'left'
    },
    modalTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#1A237E',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    modalInstruction: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      color: '#333'
    },
    modalNumber: {
      minWidth: '24px',
      height: '24px',
      backgroundColor: '#E3F2FD',
      color: '#1A237E',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    closeButton: {
      backgroundColor: '#1A237E',
      color: '#FFF',
      margin: '0',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      width: '100%',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height:'48px',
      marginTop: '30px',
      transition: 'all 0.3s ease',
      }
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={{ display: 'flex',justifyContent:'center', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={styles.title}>Queue Visualization</h2>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              background: 'none',
              marginTop:'-25px',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#1A237E'
            }}
          >
            ℹ️
          </button>
        </div>
        <div style={styles.queueVisualization}>
          <div style={styles.queue}>
            {queue.length === 0 ? (
              <p style={{color: '#94A3B8', fontStyle: 'italic', fontSize: '16px', width: '100%', textAlign: 'center'}}>
                Queue is empty
              </p>
            ) : (
              queue.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.queueBlock,
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
          <label style={styles.sizeLabel}>Queue Size:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxSize}
            onChange={handleSizeChange}
            style={styles.sizeInput}
          />
        </div><br/>

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
            onClick={enqueue}
            style={{
              ...styles.button,
              backgroundColor: '#3B82F6'
            }}
          >
            Enqueue
          </button>
        </div><br/><br/>

        <div style={styles.buttonContainer}>
          <button
            onClick={dequeue}
            style={{
              ...styles.button,
              backgroundColor: '#10B981'
            }}
          >
            Dequeue
          </button>
          <button
            onClick={() => setQueue([])}
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
        {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>How to Use Queue Visualization</h2>
            <div style={styles.modalInstruction}>
              <span style={styles.modalNumber}>1</span>
              <p>Enter a number (1-999) in the input field.</p>
            </div>
            <div style={styles.modalInstruction}>
              <span style={styles.modalNumber}>2</span>
              <p>Click 'Enqueue' or press Enter to add the number to the queue.</p>
            </div>
            <div style={styles.modalInstruction}>
              <span style={styles.modalNumber}>3</span>
              <p>Click 'Dequeue' or press Delete to remove the front element.</p>
            </div>
            <div style={styles.modalInstruction}>
              <span style={styles.modalNumber}>4</span>
              <p>Use the queue size input to adjust maximum capacity.</p>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Queues;