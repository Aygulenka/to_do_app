//DeleteTask
import React from 'react';
import withLogger from '../withLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteTask = ({ taskToDelete, onDeleteTask, logAction }) => {
  const handleDeleteTask = () => {
    onDeleteTask(taskToDelete.id);
    logAction('удалена', taskToDelete);
  };

  return (
    <button onClick={handleDeleteTask} className="round-button-style">
      <FontAwesomeIcon icon={faTrash} className="round-icon fa fa-trash" />
    </button>
  );
};

export default withLogger(DeleteTask);
