// AddTask.js
import React, { useState } from 'react';
import withLogger from '../withLogger';

const AddTask = ({ onAddTask, logAction }) => {
  const [newTask, setNewTask] = useState('');

  const generateRandomKey = () => {
    const randomDigit = Math.floor(Math.random() * 10);
    return `${randomDigit}${randomDigit}${randomDigit}`;
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const randomKey = generateRandomKey();
      const newTaskObj = { text: newTask, id: randomKey, completed: false };
      onAddTask(newTaskObj);
      setNewTask('');
      logAction('добавлена', newTaskObj);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleEnterKey}
        className="input-style"
        placeholder="Add a new task"
      />
      <div className="add-button-container">
        <button onClick={handleAddTask} className="add-button-style">
          Add
        </button>
      </div>
    </div>
  );
};

export default withLogger(AddTask);
