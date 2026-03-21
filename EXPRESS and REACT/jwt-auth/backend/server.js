const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/jwtmern");
app.use("/api", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
