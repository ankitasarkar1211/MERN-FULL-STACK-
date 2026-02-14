import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-side">
        <h1 className="logo">
          <h1>
            <span style={{ color: "black" }}>Job</span>
            <span style={{ color: "#c3452b" }}>Portal</span>
          </h1>
        </h1>
      </div>
      <div className="right-side">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/jobs">Jobs</a>
          </li>
          <li>
            <a href="/browse">Browse</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
