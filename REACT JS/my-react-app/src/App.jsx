import React, { useState } from "react";

function AddTwoNumbers() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState(null);

  const handleAdd = () => {
    setSum(Number(num1) + Number(num2));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Add Two Numbers</h2>

        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={{ padding: "8px", width: "100%", textAlign: "center" }}
        />

        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={{ padding: "8px", width: "100%", textAlign: "center" }}
        />

        <button onClick={handleAdd} style={{ padding: "10px" }}>
          Add
        </button>

        <h3>Sum: {sum}</h3>
      </div>
    </div>
  );
}

export default AddTwoNumbers;