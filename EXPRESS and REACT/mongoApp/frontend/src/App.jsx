import { useState } from "react";
function App() {
  const [text, setText] = useState("");
  const saveText = async () => { // Function to save text to backend
    await fetch("http://localhost:5000/save", {  // Backend API endpoint
      method: "POST", // HTTP method
      headers: { "Content-Type": "application/json" }, // Headers
      body: JSON.stringify({ message: text }), // Request body
    });
    setText(""); // Clear input field
    alert("Saved to MongoDB");
  };
  return (
    <div style={{ padding: "40px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={saveText}>Save</button>
    </div>
  );
}
export default App;
//backend server live->frontend client sends->request to backend API->MongoDB->response back to frontend