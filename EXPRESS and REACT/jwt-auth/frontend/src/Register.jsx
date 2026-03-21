import React, { useState } from "react";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = async () => {
    await axios.post("http://localhost:5000/api/register", {
      name,
      email,
      password,
    });
    alert("User Registered");
  };
  return (
    <div>
      <h2>Register</h2>
      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}
export default Register;
