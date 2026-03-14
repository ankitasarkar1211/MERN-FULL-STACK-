const mongoose = require('mongoose');

const TaskSchema= new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
});
module.exports = mongoose.model('Task', TaskSchema);