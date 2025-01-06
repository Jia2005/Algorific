import React, { useState, useEffect, useRef } from 'react';

const Queues = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
        dequeue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*$/.test(value) && value.length <= 3)) {
      setInputValue(value);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      enqueue();
    }
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

  const resetQueue = () => {
    setQueue([]);
    setMessage('Queue reset!');
  };

  const handleQueueSizeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 999) {
      setMaxSize(value);
      setQueue([]);
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
          <h1 style={styles.title}>Queue Visualization</h1>
          <button onClick={toggleModal} style={styles.infoButton}>ℹ️</button>
        </header>

        <div style={styles.queueContainer}>
          <div style={styles.queueVisualization}>
            <div style={styles.queue}>
              {queue.length === 0 ? (
                <p style={styles.emptyMessage}>The queue is empty</p>
              ) : (
                queue.map((item, index) => (
                  <div 
                    key={index} 
                    style={{
                      ...styles.queueBlock,
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

        <div style={styles.inputContainer}>
          <div style={styles.queueSizeContainer}>
            <label style={styles.label}>Queue Size:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={maxSize}
              onChange={handleQueueSizeChange}
              style={styles.numberInput}
            />
          </div>

          <div style={styles.enqueueInputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDownInput}
              ref={inputRef}
              placeholder="Enter value to enqueue (1-999)"
              style={styles.textInput}
            />
            <button onClick={enqueue} style={styles.secondary2Button}>
              Enqueue
            </button>
          </div>

          <div style={styles.buttonGroup}>
            <button onClick={dequeue} style={styles.primaryButton}>
              Dequeue
            </button>
            <button onClick={resetQueue} style={styles.secondaryButton}>
              Reset Queue
            </button>
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
                  For enqueuing an element, enter a number between 1 and 999, then press the 'Enter' key or click 'Enqueue'.
                </p>
              </div>
              <div style={styles.instruction}>
                <span style={styles.instructionNumber}>2</span>
                <p style={{ color: 'black' }}>For dequeuing an element, press the 'Delete' key or click 'Dequeue'.</p>
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
    maxWidth: '800px',
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
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
  queueContainer: {
    width: '100%',
    marginBottom: '40px',
  },
  queueVisualization: {
    backgroundColor: '#F8FAFC',
    Radborderius: '15px',
    padding: '20px',
    border: '2px solid #E3E8EF',
  },
  queue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '80px',
    overflowX: 'auto',
    padding: '10px',
    gap: '15px',
  },
  queueBlock: {
    width: '100px',
    height: '80px',
    backgroundColor: '#64B5F6',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
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
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  queueSizeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  label: {
    fontSize: '18px',
    color: '#334155',
    fontWeight: '500',
  },
  numberInput: {
    width: '80px',
    textAlign: 'center',
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #E2E8F0',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#3949AB',
      boxShadow: '0 0 0 3px rgba(57, 73, 171, 0.1)',
    },
  },
  enqueueInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    maxWidth: '500px',
  },
  textInput: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #E2E8F0',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#3949AB',
      boxShadow: '0 0 0 3px rgba(57, 73, 171, 0.1)',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
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
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(57, 73, 171, 0.2)',
    ':hover': {
      backgroundColor: '#303F9F',
      transform: 'translateY(-2px)',
    },
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
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(239, 83, 80, 0.2)',
    ':hover': {
      backgroundColor: '#E53935',
      transform: 'translateY(-2px)',
    },
  },
  secondary2Button: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '0px',
    boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)',
    ':hover': {
      backgroundColor: '#43A047',
      transform: 'translateY(-2px)',
    },
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
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#303F9F',
    },
  },
};

export default Queues;