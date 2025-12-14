
import React, {useState} from "react";
import ReactDOM from "react-dom/client";

import "./App.css";

function App() {
  const [name, setName] = useState("");

  const showOutput = () => {
    const outputDiv = document.querySelector(".output");
    outputDiv.textContent = `Hello, ${name}! How are you today?`;
  }

  return (
    <div className="main">
      <h1>Demo of using CSS with React</h1>
      <div className="input">
        <input 
          type="text" 
          placeholder="Enter your full name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}  
        />
        <button onClick={showOutput}>Submit</button>
        <div className="output"></div>
      </div>
    </div>
  );
}

export default App;