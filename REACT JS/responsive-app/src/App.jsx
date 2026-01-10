import React from "react";
import "./index.css";

function App() {
  return (
    <nav className="navbar">
      <div className="logo"><h2>Navbar</h2></div>
      <div className="nav-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="user">
        <button>Login</button>
        <button>Sign in</button>
      </div>
    </nav>
  );
}
export default App;
