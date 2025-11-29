import React, { useState } from "react";

function AddTwoNumbers() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState(null);

  const handleAdd = () => {
    setSum(Number(num1) + Number(num2));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Two Numbers</h2>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br/><br/>

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleAdd}>Add</button>

      <h3>Sum: {sum}</h3>
    </div>
  );
}

export default AddTwoNumbers;