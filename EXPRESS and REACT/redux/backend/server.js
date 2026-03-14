const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let counter = 0;
// get counter value
app.get("/counter", (req, res) => {
  res.json({ value: counter });
});
// increment counter
app.post("/increment", (req, res) => {
  counter++;
  res.json({ value: counter });
});
// decrement counter
app.post("/decrement", (req, res) => {
  counter--;
  res.json({ value: counter });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
