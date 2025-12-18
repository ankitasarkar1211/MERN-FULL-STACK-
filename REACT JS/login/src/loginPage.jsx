import React, { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if(email === '' && password !== '') {
      alert('Email is required');
    } else if(email !== '' && password === '') {
      alert('Password is required');
    } else if(email === '' && password === '') {
      alert('Email and Password are required');
    } else {
      alert(`Logging in with Email: ${email} and Password: ${password}`);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder='Enter your email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

}

export default App;