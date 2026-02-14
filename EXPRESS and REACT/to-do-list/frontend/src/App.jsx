import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  //task add function
  const addTask= async() => {
    const newTask= {Title: title, Description: description, Status: status};
    await fetch('http://localhost:5000/add-tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTask)
    });
    alert('Task added successfully');
    setTitle('');
    setDescription('');
    setStatus('');
    fetchTasks(); // Refresh the task list after adding a new task
  }

  //task update function
  const updateTask=async(id, updateTask) => {
    await fetch(`http://localhost:5000/update-tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateTask)
    });
    alert('Task updated successfully');
    fetchTasks(); 
  }

  //task delete function
  const deleteTask= async(id) => {
    await fetch(`http://localhost:5000/delete-tasks/${id}`, {
      method: 'DELETE'
    });
    alert('Task deleted successfully');
    fetchTasks(); 
  }

  //task get function
  const fetchTasks= async() => {
    const response= await fetch('http://localhost:5000/get-tasks');
    const data= await response.json();
    setTasks(data);
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main-page">
      <h1 style={{color: "rgb(230, 249, 249)"}}>Task Management App</h1>
      <div className="main-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button onClick={addTask}>Add Task</button>
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.Title}</h3>
              <p>{task.Description}</p>
              <p>Status: {task.Status}</p>
              <p>Created At: {new Date(task.Created_At).toLocaleString()}</p>
              <button onClick={() => updateTask(task._id, {Status: task.Status === 'Pending' ? 'Completed' : 'Pending'})}>
                {task.Status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
              </button>
              <button onClick={() => deleteTask(task._id)} style={{marginLeft: "15px", backgroundColor: "rgb(182, 62, 35)"}}>Delete Task</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;