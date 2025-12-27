import { useState, useRef } from "react";

function App() {
  // State variables (DOM controlled by state)
  const [text, setText] = useState("Hello DOM");
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [items, setItems] = useState([]);
  const inputRef = useRef();

  // Add item to list
  function addItem() {
    if (inputRef.current.value !== "") {
      setItems([...items, inputRef.current.value]);
      inputRef.current.value = "";
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React DOM Demo App</h1>

      {/* 1. Text Update */}
      <h2>{text}</h2>
      <button onClick={() => setText("DOM Updated by React")}>
        Change Text
      </button>

      <hr />

      {/* 2. Counter */}
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      <hr />

      {/* 3. Show / Hide DOM */}
      <button onClick={() => setShow(!show)}>
        Toggle Paragraph
      </button>
      {show && <p>This paragraph is in the DOM</p>}

      <hr />

      {/* 4. Input + DOM Access using useRef */}
      <input type="text" ref={inputRef} placeholder="Enter item" />
      <button onClick={addItem}>Add Item</button>

      {/* 5. List Rendering */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr />

      {/* 6. Direct DOM Focus */}
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
    </div>
  );
}

export default App;