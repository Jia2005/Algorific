import React, { useState, useEffect, useRef } from 'react';
import './Stacks.css';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [maxSize, setMaxSize] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
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

    cpp: `<span style="color: #FF79C6">template</span> <span style="color: #BD93F9">&lt;</span><span style="color: #FF79C6">typename</span> <span style="color: #50FA7B">T</span><span style="color: #BD93F9">&gt;</span>
<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Stack</span> {
<span style="color: #FF79C6">private</span>:
    <span style="color: #50FA7B">T</span>* arr;
    <span style="color: #FF79C6">int</span> top, size;
    
<span style="color: #FF79C6">public</span>:
    <span style="color: #50FA7B">Stack</span>(<span style="color: #FF79C6">int</span> s) {
        top = -<span style="color: #BD93F9">1</span>;
        size = s;
        arr = <span style="color: #FF79C6">new</span> <span style="color: #50FA7B">T</span>[s];
    }
    
    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">push</span>(<span style="color: #50FA7B">T</span> x) {
        <span style="color: #FF79C6">if</span> (top >= size-<span style="color: #BD93F9">1</span>) <span style="color: #FF79C6">return</span>;
        arr[++top] = x;
    }
    
    <span style="color: #50FA7B">T</span> <span style="color: #50FA7B">pop</span>() {
        <span style="color: #FF79C6">if</span> (top < <span style="color: #BD93F9">0</span>) <span style="color: #FF79C6">return</span> <span style="color: #50FA7B">T</span>();
        <span style="color: #FF79C6">return</span> arr[top--];
    }
};</span>`,
    c: `<span style="color: #FF79C6">#include</span> <span style="color: #50FA7B">&lt;stdio.h&gt;</span>
<span style="color: #FF79C6">#include</span> <span style="color: #50FA7B">&lt;stdlib.h&gt;</span>
<span style="color: #FF79C6">#include</span> <span style="color: #50FA7B">&lt;string.h&gt;</span>

<span style="color: #FF79C6">#define</span> <span style="color: #BD93F9">true</span> <span style="color: #FF79C6">1</span>
<span style="color: #FF79C6">#define</span> <span style="color: #BD93F9">false</span> <span style="color: #FF79C6">0</span>

<span style="color: #FF79C6">typedef</span> <span style="color: #FF79C6">struct</span> {
    <span style="color: #FF79C6">void</span>* arr;
    <span style="color: #FF79C6">int</span> top;
    <span style="color: #FF79C6">int</span> size;
    <span style="color: #FF79C6">size_t</span> element_size;
} <span style="color: #50FA7B">Stack</span>;

<span style="color: #FF79C6">Stack</span>* <span style="color: #50FA7B">init_stack</span>(<span style="color: #FF79C6">int</span> size, <span style="color: #FF79C6">size_t</span> element_size) {
    <span style="color: #FF79C6">Stack</span>* stack = (<span style="color: #FF79C6">Stack</span>*)<span style="color: #FF79C6">malloc</span>(<span style="color: #FF79C6">sizeof</span>(<span style="color: #FF79C6">Stack</span>));
    stack->top = -<span style="color: #BD93F9">1</span>;
    stack->size = size;
    stack->element_size = element_size;
    stack->arr = <span style="color: #FF79C6">malloc</span>(element_size * size);
    <span style="color: #FF79C6">return</span> stack;
}

<span style="color: #FF79C6">void</span> <span style="color: #50FA7B">push</span>(<span style="color: #FF79C6">Stack</span>* stack, <span style="color: #FF79C6">void</span>* element) {
    <span style="color: #FF79C6">if</span> (stack->top >= stack->size - <span style="color: #BD93F9">1</span>) <span style="color: #FF79C6">return</span>;  <span style="color: #FF79C6">/*</span> Stack overflow <span style="color: #FF79C6">*/
    stack->top++;
    <span style="color: #FF79C6">void</span>* target = (<span style="color: #FF79C6">char</span>*)stack->arr + stack->top * stack->element_size;
    <span style="color: #FF79C6">memcpy</span>(target, element, stack->element_size);
}

<span style="color: #50FA7B">void*</span> <span style="color: #50FA7B">pop</span>(<span style="color: #FF79C6">Stack</span>* stack) {
    <span style="color: #FF79C6">if</span> (stack->top < <span style="color: #BD93F9">0</span>) <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">NULL</span>;  <span style="color: #FF79C6">/*</span> Stack underflow <span style="color: #FF79C6">*/
    <span style="color: #FF79C6">void</span>* element = (<span style="color: #FF79C6">char</span>*)stack->arr + stack->top * stack->element_size;
    stack->top--;
    <span style="color: #FF79C6">return</span> element;
}

<span style="color: #50FA7B">int</span> <span style="color: #FF79C6">main</span>() {
    <span style="color: #50FA7B">Stack</span>* int_stack = <span style="color: #50FA7B">init_stack</span>(<span style="color: #FF79C6">10</span>, <span style="color: #FF79C6">sizeof</span>(<span style="color: #50FA7B">int</span>));

    <span style="color: #50FA7B">int</span> a = <span style="color: #BD93F9">5</span>, b = <span style="color: #BD93F9">10</span>, c = <span style="color: #BD93F9">15</span>;
    <span style="color: #50FA7B">push</span>(int_stack, &a);
    <span style="color: #50FA7B">push</span>(int_stack, &b);
    <span style="color: #50FA7B">push</span>(int_stack, &c);

    <span style="color: #50FA7B">int</span>* popped_value = (<span style="color: #50FA7B">int</span>*)<span style="color: #50FA7B">pop</span>(int_stack);
    <span style="color: #FF79C6">printf</span>(<span style="color: #FF79C6">"Popped value: %d\n"</span>, *popped_value);

    <span style="color: #FF79C6">free</span>(int_stack->arr);
    <span style="color: #FF79C6">free</span>(int_stack);
    <span style="color: #FF79C6">return</span> <span style="color: #BD93F9">0</span>;`,

    java: `<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Stack</span><span style="color: #BD93F9">&lt;</span><span style="color: #50FA7B">T</span><span style="color: #BD93F9">&gt;</span> {
    <span style="color: #FF79C6">private</span> <span style="color: #50FA7B">T</span>[] arr;
    <span style="color: #FF79C6">private</span> <span style="color: #FF79C6">int</span> top;
    <span style="color: #FF79C6">private</span> <span style="color: #FF79C6">int</span> size;
    
    <span style="color: #BD93F9">@SuppressWarnings</span>(<span style="color: #F1FA8C">"unchecked"</span>)
    <span style="color: #50FA7B">Stack</span>(<span style="color: #FF79C6">int</span> s) {
        top = -<span style="color: #BD93F9">1</span>;
        size = s;
        arr = (<span style="color: #50FA7B">T</span>[]) <span style="color: #FF79C6">new</span> <span style="color: #50FA7B">Object</span>[s];
    }
    
    <span style="color: #FF79C6">void</span> <span style="color: #50FA7B">push</span>(<span style="color: #50FA7B">T</span> x) {
        <span style="color: #FF79C6">if</span> (top >= size-<span style="color: #BD93F9">1</span>) <span style="color: #FF79C6">return</span>;
        arr[++top] = x;
    }
    
    <span style="color: #50FA7B">T</span> <span style="color: #50FA7B">pop</span>() {
        <span style="color: #FF79C6">if</span> (top < <span style="color: #BD93F9">0</span>) <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">null</span>;
        <span style="color: #FF79C6">return</span> arr[top--];
    }
}`,

    python: `<span style="color: #FF79C6">class</span> <span style="color: #50FA7B">Stack</span>:
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">__init__</span>(<span style="color: #F8F8F2">self</span>, <span style="color: #F8F8F2">size</span>):
        <span style="color: #F8F8F2">self</span>.size = size
        <span style="color: #F8F8F2">self</span>.stack = []
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">push</span>(<span style="color: #F8F8F2">self</span>, <span style="color: #F8F8F2">item</span>):
        <span style="color: #FF79C6">if</span> <span style="color: #F8F8F2">len</span>(<span style="color: #F8F8F2">self</span>.stack) >= <span style="color: #F8F8F2">self</span>.size:
            <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">None</span>
        <span style="color: #F8F8F2">self</span>.stack.append(item)
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">pop</span>(<span style="color: #F8F8F2">self</span>):
        <span style="color: #FF79C6">if</span> <span style="color: #F8F8F2">len</span>(<span style="color: #F8F8F2">self</span>.stack) < <span style="color: #BD93F9">1</span>:
            <span style="color: #FF79C6">return</span> <span style="color: #FF79C6">None</span>
        <span style="color: #FF79C6">return</span> <span style="color: #F8F8F2">self</span>.stack.pop()
        
    <span style="color: #FF79C6">def</span> <span style="color: #50FA7B">display</span>(<span style="color: #F8F8F2">self</span>):
        <span style="color: #FF79C6">return</span> <span style="color: #F8F8F2">self</span>.stack`
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

  return (
    <div className="stack-container">
      <div className="panel">
        <div className="header-container">
          <h2 className="title">Stack Visualization</h2>
          <button className="info-button" onClick={() => setShowModal(true)}>ℹ️</button>
        </div><br/>
        <div className="stack-visualization">
          <div className="stack-container2">
            {stack.length === 0 ? (
              <p className="empty-message">Stack is empty</p>
            ) : (
              stack.map((item, index) => (
                <div
                  key={index}
                  className="stack-block"
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
          <label className="size-label">Stack Size:</label>
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
            className="input"
          />
          <button onClick={push} className="button push">Push</button>
        </div>

        <div className="button-container">
          <button onClick={pop} className="button pop">Pop</button>
          <button onClick={() => setStack([])} className="button reset">Reset</button>
        </div><br/>

        {message && (
          <div className={`message ${message.includes('between') || message.includes('full') || message.includes('empty') ? 'error-message' : 'success-message'}`} style={{fontSize:'16px', fontWeight:'600', display:'flex', justifyContent:'center', alignItems:'center'}}>
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
        <pre className="code-container">
          <code dangerouslySetInnerHTML={{ __html: codeExamples[selectedLanguage] }} />
        </pre>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">How to Use Stack Visualization</h2>
              <div className="modal-instruction">
                <span className="modal-number">1</span>
                <p>Enter a number (1-999) in the input field.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">2</span>
                <p>Click 'Push' or press Enter to add the number to the stack.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">3</span>
                <p>Click 'Pop' or press Delete to remove the top element.</p>
              </div>
              <div className="modal-instruction">
                <span className="modal-number">4</span>
                <p>Use the stack size input to adjust maximum capacity.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stacks;