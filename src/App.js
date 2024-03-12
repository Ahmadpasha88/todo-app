import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddTask = () => {
    if (!taskName) {
      setErrorMsg(() => "This field is required...");
      return false;
    }
    setErrorMsg(() => "");
    if (taskName.trim() !== "") {
      const matches = taskName.match(/(.+?)\s*(\d+)?$/);
      const task = matches[1];
      const quantity = parseInt(matches[2]) || 1;

      const newTasks = Array(quantity).fill({
        name: task,
        originalName: task,
        updates: 0,
      });
      setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      setTaskName("");
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index].name);
  };

  const handleSaveEdit = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = JSON.parse(JSON.stringify(prevTasks));
      updatedTasks[index].name = editedTask;
      if (updatedTasks[index].name !== updatedTasks[index].originalName) {
        updatedTasks[index].updates++;
      }
      return updatedTasks;
    });
    setEditIndex(null);
    setEditedTask("");
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  return (
    <div className="App">
      <h1 className="fw-bold">Day Goals!</h1>
      <div className="my-3">
        <div>
          <input
            type="text"
            placeholder="Add task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="fs-5 p-3"
          />
        </div>

        <button
          onClick={handleAddTask}
          className="button-todo-background text-start my-3 btn btn-success text-white mx-3 fw-medium fs-5"
        >
          Add Task
        </button>
      </div>
      <p className="text-danger fw-medium">{errorMsg}</p>
      <div>
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="p-2 fw-medium"
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="btn btn-info text-white"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="my-3 py-1 gap-2 border border-2 col-10 col-md-8 col-lg-6 m-auto rounded-3 button-todo-background">
                <span className="fw-bold mx-2 fs-3">{task.name}</span>
                <span className="">(Changed: {task.updates} times)</span>
                <button
                  className="m-2 border-0 bg-transparent"
                  onClick={() => handleEditTask(index)}
                >
                  <MdEdit className="fs-4 text-white fw-medium" />
                </button>
                <button
                  className="m-2 border-0 bg-transparent"
                  onClick={() => handleDeleteTask(index)}
                >
                  <TiDelete className="fs-4 text-danger fw-medium" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
