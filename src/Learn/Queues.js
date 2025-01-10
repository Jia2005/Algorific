import React, { useState, useEffect, useRef } from 'react';
import './Queues.css';

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

    cpp: `<span style="color: #FF79C6">template</span> <span style="color: #BD93F9">&lt;</span><span style="color: #FF79C6">typename</span> <span style="color: #50FA7B">T</span><span style="color: #BD93F9">&gt;</span>
<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Queue</span> {
<span style="color: #FF79C6">private</span>:
    <span style="color: #50FA7B">T</span>* arr;
    <span style="color: #FF79C6">int</span> front, rear, size;
    
<span style="color: #FF79C6">public</span>:
    <span style="color: #50FA7B">Queue</span>(<span style="color: #FF79C6">int</span> s) {
        front = rear = -<span style="color: #BD93F9">1</span>;
        size = s;
        arr = <span style="color: #FF79C6">new</span> <span style="color: #50FA7B">T</span>[s];
    }
    
    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">enqueue</span>(<span style="color: #50FA7B">T</span> x) {
        <span style="color: #FF79C6">if</span> (rear == size-<span style="color: #BD93F9">1</span>) 
            <span style="color: #FF79C6">return</span>;
            
        <span style="color: #FF79C6">if</span> (front == -<span style="color: #BD93F9">1</span>) 
            front = <span style="color: #BD93F9">0</span>;
            
        arr[++rear] = x;
    }
    
    <span style="color: #50FA7B">T</span> <span style="color: #50FA7B">dequeue</span>() {
        <span style="color: #FF79C6">if</span> (front == -<span style="color: #BD93F9">1</span>) 
            <span style="color: #FF79C6">return</span> <span style="color: #50FA7B">T</span>();
            
        <span style="color: #50FA7B">T</span> x = arr[front];
        
        <span style="color: #FF79C6">if</span> (front == rear)
            front = rear = -<span style="color: #BD93F9">1</span>;
        <span style="color: #FF79C6">else</span>
            front++;
            
        <span style="color: #FF79C6">return</span> x;
    }
};</span>`,

    java: `<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Queue</span><span style="color: #BD93F9">&lt;</span><span style="color: #50FA7B">T</span><span style="color: #BD93F9">&gt;</span> {
    <span style="color: #FF79C6">private</span> <span style="color: #50FA7B">T</span>[] arr;
    <span style="color: #FF79C6">private</span> <span style="color: #FF79C6">int</span> front, rear, size;
    
    <span style="color: #BD93F9">@SuppressWarnings</span>(<span style="color: #F1FA8C">"unchecked"</span>)
    <span style="color: #50FA7B">Queue</span>(<span style="color: #FF79C6">int</span> s) {
        front = rear = -<span style="color: #BD93F9">1</span>;
        size = s;
        arr = (<span style="color: #50FA7B">T</span>[]) <span style="color: #FF79C6">new</span> <span style="color: #50FA7B">Object</span>[s];
    }
    
    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">enqueue</span>(<span style="color: #50FA7B">T</span> x) {
        <span style="color: #FF79C6">if</span> (rear == size-<span style="color: #BD93F9">1</span>) 
            <span style="color: #FF79C6">return</span>;
            
        <span style="color: #FF79C6">if</span> (front == -<span style="color: #BD93F9">1</span>) 
            front = <span style="color: #BD93F9">0</span>;
            
        arr[++rear] = x;
    }
    
    <span style="color: #50FA7B">T</span> <span style="color: #50FA7B">dequeue</span>() {
        <span style="color: #FF79C6">if</span> (front == -<span style="color: #BD93F9">1</span>) 
            <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">null</span>;
            
        <span style="color: #50FA7B">T</span> x = arr[front];
        
        <span style="color: #FF79C6">if</span> (front == rear)
            front = rear = -<span style="color: #BD93F9">1</span>;
        <span style="color: #FF79C6">else</span>
            front++;
            
        <span style="color: #FF79C6">return</span> x;
    }
}`,
    c: `<span style="color: #FF79C6">#define</span> <span style="color: #50FA7B">MAX_SIZE</span> <span style="color: #BD93F9">100</span>

    <span style="color: #FF79C6">typedef</span> <span style="color: #FF79C6">struct</span> {
        <span style="color: #FF79C6">int</span> items[<span style="color: #50FA7B">MAX_SIZE</span>];
        <span style="color: #FF79C6">int</span> front;
        <span style="color: #FF79C6">int</span> rear;
        <span style="color: #FF79C6">int</span> size;
    } <span style="color: #50FA7B">Queue</span>;

    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">initQueue</span>(<span style="color: #50FA7B">Queue</span>* q, <span style="color: #FF79C6">int</span> s) {
        q->front = -<span style="color: #BD93F9">1</span>;
        q->rear = -<span style="color: #BD93F9">1</span>;
        q->size = s;
    }

    <span style="color: #FF79C6">int</span> <span style="color: #50FA7B">isEmpty</span>(<span style="color: #50FA7B">Queue</span>* q) {
        <span style="color: #FF79C6">return</span> q->front == -<span style="color: #BD93F9">1</span>;
    }

    <span style="color: #FF79C6">int</span> <span style="color: #50FA7B">isFull</span>(<span style="color: #50FA7B">Queue</span>* q) {
        <span style="color: #FF79C6">return</span> q->rear == q->size - <span style="color: #BD93F9">1</span>;
    }

    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">enqueue</span>(<span style="color: #50FA7B">Queue</span>* q, <span style="color: #FF79C6">int</span> value) {
        <span style="color: #FF79C6">if</span> (isFull(q)) {
            <span style="color: #FF79C6">return</span>;
        }
        
        <span style="color: #FF79C6">if</span> (isEmpty(q)) {
            q->front = <span style="color: #BD93F9">0</span>;
        }
        
        q->items[++q->rear] = value;
    }

    <span style="color: #FF79C6">int</span> <span style="color: #50FA7B">dequeue</span>(<span style="color: #50FA7B">Queue</span>* q) {
        <span style="color: #FF79C6">if</span> (isEmpty(q)) {
            <span style="color: #FF79C6">return</span> -<span style="color: #BD93F9">1</span>;
        }
        
        <span style="color: #FF79C6">int</span> value = q->items[q->front];
        
        <span style="color: #FF79C6">if</span> (q->front == q->rear) {
            q->front = q->rear = -<span style="color: #BD93F9">1</span>;
        } <span style="color: #FF79C6">else</span> {
            q->front++;
        }
        
        <span style="color: #FF79C6">return</span> value;
    }`,

    python: `<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Queue</span>:
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">__init__</span>(<span style="color: #F8F8F2">self</span>, <span style="color: #F8F8F2">size</span>):
        <span style="color: #F8F8F2">self</span>.size = size
        <span style="color: #F8F8F2">self</span>.queue = []
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">enqueue</span>(<span style="color: #F8F8F2">self</span>, <span style="color: #F8F8F2">item</span>):
        <span style="color: #FF79C6">if</span> <span style="color: #F8F8F2">len</span>(<span style="color: #F8F8F2">self</span>.queue) >= <span style="color: #F8F8F2">self</span>.size:
            <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">None</span>
            
        <span style="color: #F8F8F2">self</span>.queue.append(item)
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">dequeue</span>(<span style="color: #F8F8F2">self</span>):
        <span style="color: #FF79C6">if</span> <span style="color: #F8F8F2">len</span>(<span style="color: #F8F8F2">self</span>.queue) < <span style="color: #BD93F9">1</span>:
            <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">None</span>
            
        <span style="color: #FF79C6">return</span> <span style="color: #F8F8F2">self</span>.queue.pop(<span style="color: #BD93F9">0</span>)
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">display</span>(<span style="color: #F8F8F2">self</span>):
        <span style="color: #FF79C6">return</span> <span style="color: #F8F8F2">self</span>.queue`
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

  return (
    <div className="queue-container">
      <div className="panel">
        <div className="header-container">
          <h2 className="title">Queue Visualization</h2>
          <button className="info-button" onClick={() => setShowModal(true)}>
            ℹ️
          </button>
        </div><br/>
        <div className="queue-visualization">
          <div className="queue">
            {queue.length === 0 ? (
              <p className="queue-empty">Queue is empty</p>
            ) : (
              queue.map((item, index) => (
                <div
                  key={index}
                  className="queue-block"
                  style={{
                    backgroundColor: `hsl(${200 + index * 15}, 75%, 65%)`
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="size-container">
          <label className="size-label">Queue Size:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxSize}
            onChange={handleSizeChange}
            className="size-input"
          />
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownInput}
            ref={inputRef}
            placeholder="Enter value (1-999)"
            className="queue-input"
          />
          <button 
            onClick={enqueue}
            className="queue-button enqueue-button"
          >
            Enqueue
          </button>
        </div>

        <div className="button-container">
          <button
            onClick={dequeue}
            className="queue-button dequeue-button"
          >
            Dequeue
          </button>
          <button
            onClick={() => setQueue([])}
            className="queue-button reset-button"
          >
            Reset
          </button>
        </div>

        {message && (
          <div className={`message ${
            message.includes('between') || message.includes('full') || message.includes('empty')
              ? 'message-error'
              : 'message-success'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="panel">
        <h2 className="title">Implementation</h2><br/><br/>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-select"
        >
          <option value="pseudo">Pseudocode</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <pre className="code-block">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: codeExamples[selectedLanguage] 
            }} 
          />
        </pre>
        
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">How to Use Queue Visualization</h2>
              <div className="modal-instruction">
                <span className="modal-number">1</span>
                <p>Enter a number (1-999) in the input field.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">2</span>
                <p>Click 'Enqueue' or press Enter to add the number to the queue.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">3</span>
                <p>Click 'Dequeue' or press Delete to remove the front element.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">4</span>
                <p>Use the queue size input to adjust maximum capacity.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="close-button"
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