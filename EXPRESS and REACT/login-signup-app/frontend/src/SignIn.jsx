import React, { useState } from "react";
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully!");
        setFormData({ username: "", email: "", password: "" });
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Backend not running");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2>Register</h2>

        <form className="signin-form-group" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
