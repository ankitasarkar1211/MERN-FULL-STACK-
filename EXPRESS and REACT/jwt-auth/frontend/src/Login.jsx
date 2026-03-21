import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ LOGIN FUNCTION
  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  // ✅ GET PROFILE (Protected Route)
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: token, 
          },
        }
      );

      console.log("Profile Data:", res.data);
      alert("Check console for profile data");
    } catch (err) {
      console.log(err.response?.data);
      alert("Unauthorized or token expired");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>

      <br /><br />

      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}

export default Login;