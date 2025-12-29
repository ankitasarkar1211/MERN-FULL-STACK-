import { useState, useRef } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const inputRef= useRef()

  //to add a new task
  function addTask() {
    const task= inputRef.current.value
    if(task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: task
      };
      setTasks([...tasks, newTask]);
    }
    else {
      return;
    }
    inputRef.current.value= ""
  }

  //to delete a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    alert("Task deleted successfully")
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Task Management App</h1>
      <input type="text" ref={inputRef} style={{padding: "5px 20px", marginRight: "10px"}}/>
      <button onClick={addTask} style={{padding:"5px 10px", backgroundColor: "#316bf4", color: "white", border: "none", borderRadius: "4px"}}>Add Task</button>
      <div>
        <h3>Tasks:</h3>
          {(tasks.length === 0) ? (<p>No tasks available</p>) : 
          (
            <ul>
              {tasks.map(task => (
                <li key={task.id}>{task.text}
                  <button onClick={() => deleteTask(task.id)}
                    style={{marginLeft: "10px",padding:"5px 10px", backgroundColor: "#d02411ff", color: "white", border: "none", borderRadius: "4px"}}>
                      Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  )
}

export default App
