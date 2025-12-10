import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);

  // Toggle login state
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      {/* --- 1. Simple IF condition --- */}
      <h1>{isLoggedIn ? "Welcome Back!" : "Please Log In"}</h1>

      <button onClick={handleLogin}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>


      {/* --- 2. Rendering Components Conditionally --- */}
      {isLoggedIn ? <Dashboard /> : <Guest />}


      {/* --- 3. Conditional Rendering with Logic --- */}
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>

      {count > 5 && <p>You clicked more than 5 times!</p>}

      {count === 10 ? (
        <p>You reached 10! </p>
      ) : (
        <p>Keep clicking...</p>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>You are logged in </h2>
      <p>This is your dashboard.</p>
    </div>
  );
}

function Guest() {
  return (
    <div>
      <h2>You are not logged in </h2>
      <p>Please login to access features.</p>
    </div>
  );
}

export default App;