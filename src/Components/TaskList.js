import withLogger from './withLogger';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


import {
  setNewTask,
  addTask,
  deleteTask,
  editTask,
  setEditedTask,
  saveEdit,
  toggleComplete,
} from './RTK/tasksSlice';

const TaskList = ({logAction}) => {
  const dispatch = useDispatch();
  const { newTask, tasks, editIndex, editedTask } = useSelector(state => state.tasks);
 

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const randomKey = uuidv4();
      const newTaskObj = { text: newTask, id: randomKey, completed: false };
      dispatch(addTask(newTaskObj));
      dispatch(setNewTask(''));
      logAction('добавлена',  newTaskObj); 
    }
  };

  const handleDeleteTask = (id) => {
    const deletedTask = tasks.find((task) => task.id === id);
    dispatch(deleteTask(id));
    logAction('удалена', deletedTask); 
  }
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      dispatch(editTask({ id, text: taskToEdit.text }));
       logAction('изменения начаты'); 
    }
  };

  const handleSaveEdit = () => {
    if (editedTask.trim() !== '') {
      dispatch(saveEdit());
     logAction('изменена', editedTask); 
    }
  };

  const handleToggleComplete = (id) => {
    const toggledTask = tasks.find((task) => task.id === id);
    dispatch(toggleComplete(id));
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
          onChange={(e) => dispatch(setNewTask(e.target.value))}
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
                  onChange={(e) => dispatch(setEditedTask(e.target.value))}
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
                    textDecoration: task.completed ? 'line-through' : 'none',
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