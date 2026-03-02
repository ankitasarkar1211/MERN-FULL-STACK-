const express= require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const app= express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/taskDB');
const taskSchema= new mongoose.Schema({
    Title: {type: String, required: true},
    Description: String,
    Subject: String,
    Status: String,
    Deadline: Date,
    Created_At: {type: Date, default: Date.now}
});
const taskModel= mongoose.model('Task', taskSchema);

app.post('/add-tasks', async(req, res)=> {
  await taskModel.create(req.body);
  res.status(201).send('Task added successfully'); 
})
app.get('/get-tasks', async(req, res) => {
  const tasks= await taskModel.find();
  res.status(200).json(tasks);
})
app.put('/update-tasks/:id', async(req, res) => {
  const {id}= req.params; // Extract the task ID from the URL parameters
  await taskModel.findByIdAndUpdate(id, req.body); 
  res.status(200).send('Task updated successfully');
})
app.delete('/delete-tasks/:id', async(req, res) => {
  const {id}= req.params;
  await taskModel.findByIdAndDelete(id);
  res.status(200).send('Task deleted successfully');
})
app.listen(5000, () => {
  console.log('Server is running on port 5000');
})