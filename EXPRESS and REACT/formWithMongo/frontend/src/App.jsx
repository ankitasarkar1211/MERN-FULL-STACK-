import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [department, setDepartment] = useState("");

  const submitForm = async () => {
    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, enrollmentNumber, department }),
    });
    setName("");
    setEmail("");
    setEnrollmentNumber("");
    setDepartment("");
    alert("Form submitted successfully");
  };

  return (
    <div className="main-container">
      <div className="form-container">
      <h1 style={{marginBottom: "10px"}}>Student Form</h1>
        <p style={{marginBottom: "0"}}>Name: </p>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <p style={{marginBottom: "0"}}>Email: </p>
        <input
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{marginBottom: "0"}}>Enrollment Number: </p>
        <input
          type="text"
          value={enrollmentNumber}
          placeholder="Enter your enrollment number"
          onChange={(e) => setEnrollmentNumber(e.target.value)}
        />
        <p style={{marginBottom: "0"}}>Department: </p>
        <input
          type="text"
          value={department}
          placeholder="Enter your department"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
}
export default App;