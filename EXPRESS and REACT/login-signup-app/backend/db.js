const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/loginSignupDB";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
