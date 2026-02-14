const express= require('express'); // Importing the Express framework to create a web server
const mongoose = require('mongoose'); // Importing Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, to interact with the MongoDB database
const cors= require('cors'); // Importing the CORS middleware to enable Cross-Origin Resource Sharing, allowing the server to handle requests from different origins (e.g., frontend running on a different port)
const app= express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect('mongodb://localhost:27017/formDB');
const formSchema= new mongoose.Schema({
    name: String,
    email: String,
    enrollmentNumber: String,
    department: String
});
const formModel= mongoose.model('Form', formSchema);

app.post('/submit', async(req, res)=> {
    await formModel.create(req.body);
    res.send("Form submitted successfully"); 
})
app.listen(5000, ()=> {
  console.log("Server is running on port 5000");
})