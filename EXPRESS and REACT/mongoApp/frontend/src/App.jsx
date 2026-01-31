import { useState } from "react";
function App() {
  const [text, setText] = useState("");
  const saveText = async () => {
    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    setText("");
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