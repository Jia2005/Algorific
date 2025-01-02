import React, { useState, useEffect, useRef } from 'react';

const Queues = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
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
    if (isNaN(inputValue) || inputValue.trim() === '') {
      setMessage('Invalid Input');
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
    setInputValue(e.target.value);
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
    setMaxSize(Number(e.target.value));
    setQueue([]);
    setMessage('');
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '40px' }}>Queue Visualization</h1>
        <button onClick={toggleModal} style={styles.infoButton}>ℹ️</button> 
      </header><br/><br/>
      <div style={styles.queueContainer}>
        <div style={styles.queue}>
          {queue.length === 0 ? (
            <p style={styles.emptyMessage}>The queue is empty</p>
          ) : (
            queue.map((item, index) => (
              <div key={index} style={styles.queueBlock}>
                {item}
              </div>
            ))
          )}
        </div>
        {message && <p style={styles.message}>{message}</p>}
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.queueSizeContainer}>
          <label style={styles.label}><br/>Queue Size:</label>
            <input
              type="number"
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
            placeholder="Enter value to enqueue"
            style={styles.textInput}
          />
          <button onClick={enqueue} style={styles.secondary2Button}>
            Enqueue
          </button>
        </div>

        <div>
          <button onClick={dequeue} style={styles.primaryButton}>
            Dequeue
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={resetQueue} style={styles.secondaryButton}>
            Reset Queue
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h1>How to use</h1><br></br>
            <p style={{display:'flex', justifyContent:'center', textAlign: 'left'}}>1. For enqueuing an element, write the value and press the 'Enter' key or click 'Enqueue'.</p><br/>
            <p style={{display:'flex', justifyContent:'center', textAlign: 'left'}}>2. For dequeuing an element, press the 'Delete' key or click 'Dequeue'.</p><br/>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'white',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
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
    marginTop:'0px',
    color: '#4682B4',
  },
  queueContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  queue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: '400px',
    overflowX: 'auto',
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  queueBlock: {
    width: '100px',
    height: '50px',
    backgroundColor: '#87CEFA',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
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
  queueSizeContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    gap:'20px',
    marginRight: '10px',
    color: 'black',
  },
  numberInput: {
    width: '60px',
    textAlign: 'center',
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
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    margin: '10px',
    height: '40px',
    width: '100px',
    marginTop: '6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    height: '40px',
    width: '150px',
    marginTop: '6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  secondary2Button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    height: '40px',
    width: '100px',
    fontSize: '16px',
    marginTop: '6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  textInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  enqueueInputContainer: {
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

export default Queues;
