import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignIn from "./SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;