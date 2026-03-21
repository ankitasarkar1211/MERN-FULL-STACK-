import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/taskSlice";

function TaskList() {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">

      <h2 className="text-2xl font-bold mb-4 text-center">
        Study Tasks
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Task</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Deadline</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className="text-center hover:bg-gray-50">

                <td className="p-3 border">{task.taskName}</td>
                <td className="p-3 border">{task.subject}</td>
                <td className="p-3 border">{task.deadline}</td>

                <td className="p-3 border">
                  <span
                    className={
                      task.status === "Completed"
                        ? "bg-green-200 text-green-800 px-2 py-1 rounded"
                        : "bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                    }
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-3 border">
                  <button
                    onClick={() => dispatch(deleteTask(task._id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default TaskList;