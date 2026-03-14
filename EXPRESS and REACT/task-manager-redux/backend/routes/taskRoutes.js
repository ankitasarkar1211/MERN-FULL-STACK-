const express= require('express');
const router= express.Router();
const Task= require('../models/Tasks');

// Create a new task
router.post('/tasks', async(req, res) => {
  const task= new Task(req.body);
  try {
    const savedTask= await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//read tasks
router.get('/tasks', async(req, res) => {
  try {
    const tasks= await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//update task
router.put('/tasks/:id', async(req, res) => {
  try {
    const updatedTask= await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    } else {
      res.json(updatedTask);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//delete task
router.delete('/tasks/:id', async(req, res) => {  
  try {    
    const deletedTask= await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});
module.exports= router;