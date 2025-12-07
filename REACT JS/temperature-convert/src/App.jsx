import React, { useState } from "react";

function tempConvert() {
  const [num, setNum] = useState("");
  const [sum, setTemp] = useState(null);

  const handleAdd = () => {
    setTemp(Number(num)*1.8+32);
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
        <h2>Celcius to Fahrenheit Converter</h2>

        <input
          type="number"
          placeholder="Enter Temperature in Celcius"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          style={{ padding: "8px", width: "100%", textAlign: "center" }}
        />

        <button onClick={handleAdd} style={{ padding: "10px" }}>
          Convert
        </button>

        <h3>Temperature in Fahrenheit: {sum}</h3>
      </div>
    </div>
  );
}

export default tempConvert;