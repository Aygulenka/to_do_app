import React, { useState } from "react";
import withLogger from './withLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './taskListStyles.css';

const TaskList = ({ logAction }) => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
  
    const generateRandomKey = () => {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const randomDigit = Math.floor(Math.random() * 10);
      return `${randomLetter}${randomLetter}${randomDigit}`;
    };
  
    const handleAddTask = () => {
      if (newTask.trim() !== "") {
        const randomKey = generateRandomKey();
        const newTaskObj = { text: newTask, id: randomKey, completed: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask("");
        logAction('добавлена',  newTaskObj);
      }
    };
  
    const handleDeleteTask = (id) => {
      const deletedTask = tasks.find((task) => task.id === id);
      setTasks(tasks.filter((task) => task.id !== id));
      logAction('удалена', deletedTask);
    };
  
    const handleEditTask = (id) => {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setEditIndex(id);
        setEditedTask(taskToEdit.text);
        logAction('изменения начаты');
      }
    };
  
    const handleSaveEdit = () => {
      if (editedTask.trim() !== "") {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editIndex ? { ...task, text: editedTask } : task
          )
        );
        setEditIndex(null);
        setEditedTask("");
        const editedTaskObj = tasks.find((task) => task.id === editIndex);
        logAction('изменена', editedTaskObj);
      }
    };
  
    const handleToggleComplete = (id) => {
      const toggledTask = tasks.find((task) => task.id === id);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      logAction('выполнена', toggledTask);
    };
  
    const handleEnterKey = (e, action) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        action();
      }
    };
  
    return (
        <div className="center-container">
          <p className="txttodo">Task List</p>
          <div className="input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handleAddTask)}
              className="input-style"
            />
            <div className="add-button-container">
              <button onClick={handleAddTask} className="add-button-style">
                Add
              </button>
            </div>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task">
                {editIndex === task.id ? (
                 <>
                 <input
                   type="text"
                   value={editedTask}
                   onChange={(e) => setEditedTask(e.target.value)}
                   onKeyDown={(e) => handleEnterKey(e, handleSaveEdit)}
                   className="input-style"
                 />
                 <div className="task-buttons">
                   <button onClick={handleSaveEdit} className="round-button-style">
                     <FontAwesomeIcon icon={faPencilAlt} className="round-icon fa fa-pencil" />
                   </button>
                 </div>
               </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.text}
                    </span>
                    <div className="task-buttons">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        className="checkbox-style"
                      />
                      <button className="round-button-style" onClick={() => handleEditTask(task.id)}>
                        <FontAwesomeIcon icon={faPencilAlt} className="round-icon fa fa-pencil" />
                      </button>
                      <button className="round-button-style" onClick={() => handleDeleteTask(task.id)}>
                        <FontAwesomeIcon icon={faTrash} className="round-icon fa fa-trash" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
  };
  
  export default withLogger(TaskList);