import React, { useState } from 'react';

const QueueVisualization = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isEnqueuing, setIsEnqueuing] = useState(true);

  const handleEnqueueClick = () => {
    setIsEnqueuing(true);
  };

  const enqueue = () => {
    if (queue.length < maxSize) {
      setQueue([...queue, inputValue]);
      setMessage(`Enqueued: ${inputValue}`);
      setInputValue('');
    } else {
      setMessage('Queue is full!');
    }
    setIsEnqueuing(true);
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const removedValue = queue.shift();
      setQueue([...queue]);
      setMessage(`Dequeued: ${removedValue}`);
    } else {
      setMessage('Queue is empty!');
    }
  };

  const resetQueue = () => {
    setQueue([]);
    setMessage('Queue reset!');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleQueueSizeChange = (e) => {
    setMaxSize(Number(e.target.value));
    setQueue([]);
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '40px' }}>Queue Visualization</h1>
      </header>
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
          <label style={styles.label}>
            Queue Size:
            <input
              type="number"
              value={maxSize}
              onChange={handleQueueSizeChange}
              style={styles.numberInput}
            />
          </label>
        </div>

        <div style={styles.buttonContainer}>

        {isEnqueuing && (
          <div style={styles.enqueueInputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter value to enqueue"
              style={styles.textInput}
            />
            <button onClick={enqueue} style={styles.secondary2Button}>
              Enqueue
            </button>
          
          <button onClick={dequeue} style={styles.primaryButton}>
           Dequeue
         </button>
         </div>
        )}
        </div>
        
        <div style={styles.buttonContainer}>
          <button onClick={resetQueue} style={styles.secondaryButton}>
            Reset Queue
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
    padding: '20px',
    backgroundColor:'white',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    color:'black',
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
    marginRight: '10px',
    color:'black',
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
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    margin: '10px',
    alignItems:'center',
    height:'40px',
    width:'100px',
    marginTop:'6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
  },
  secondaryButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    height:'40px',
    width:'150px',
    marginTop:'6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  secondary2Button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    height:'40px',
    width:'100px',
    fontSize: '16px',
    marginTop:'6px',
    marginBottom: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
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
};

export default QueueVisualization;
