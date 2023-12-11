// Task.js
import React, { useState } from 'react';
import withLogger from '../withLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const Task = ({ task, onToggleComplete, onEditTask, onDeleteTask, logAction }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditTask = () => {
    setIsEditing(true);
    logAction('изменения начаты');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (editedTask) => {
    if (onEditTask && typeof onEditTask === 'function') {
      onEditTask(editedTask);
      setIsEditing(false);
    }
  };

  return (
    <li className="task">
      {isEditing ? (
        <EditTask
          taskToEdit={task}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onEditTask={onEditTask} // Передаем функцию обратного вызова
          logAction={logAction}
        />
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => onToggleComplete(task.id)}
          >
            {task.text}
          </span>
          <div className="task-buttons">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="checkbox-style"
            />
            <button onClick={handleEditTask} className="round-button-style">
              <FontAwesomeIcon icon={faPencilAlt} className="round-icon fa fa-pencil" />
            </button>
            <DeleteTask taskToDelete={task} onDeleteTask={onDeleteTask} />
            {/* Добавим кнопку с ручкой */}
            <div className="edit-handle">
              <div className="handle"></div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default withLogger(Task);
