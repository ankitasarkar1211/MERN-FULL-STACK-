import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="./loginPage" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;