const express= require('express');
const mongoose = require('mongoose');
const cors= require('cors');
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