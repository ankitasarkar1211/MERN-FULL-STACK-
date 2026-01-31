const express = require("express"); //web framework for Node.js, helps in building web applications and APIs
const mongoose = require("mongoose"); //connect node.js to mongoDb
const cors = require("cors");  //to allow cross-origin requests
const app = express(); //create express app
app.use(cors());
app.use(express.json());  //to parse JSON request bodies 
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/textdb");
// Schema & Model
const TextSchema = new mongoose.Schema({  //defining structure of documents in a collection
  message: String,
});
const TextModel = mongoose.model("Text", TextSchema); //model based on schema
// API to save text
app.post("/save", async (req, res) => { //save endpoint
  await TextModel.create({ message: req.body.message }); //create and save document to MongoDB
  res.send("Saved");  //response to client
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
