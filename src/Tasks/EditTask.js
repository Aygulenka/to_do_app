// // EditTask.js
// import React, { useState, useEffect } from 'react';
// import withLogger from '../withLogger';

// const EditTask = ({ taskToEdit, onSaveEdit, onCancelEdit, onEditTask, logAction }) => {
//   const [editedTask, setEditedTask] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   const handleEditTask = (id) => {
//     const taskToEdit = tasks.find((task) => task.id === id);
//     if (taskToEdit) {
//       setEditIndex(id);
//       setEditedTask(taskToEdit.text);
//       logAction('изменения начаты');
//     }
//   };

//   const handleSaveEdit = () => {
//     if (editedTask.trim() !== "") {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === editIndex ? { ...task, text: editedTask } : task
//         )
//       );
//       setEditIndex(null);
//       setEditedTask("");
//       const editedTaskObj = tasks.find((task) => task.id === editIndex);
//       logAction('изменена', editedTaskObj);
//     }
//   };

//   const handleEnterKey = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSaveEdit();
//     }
//   };

//   return (
//     <div className="task-buttons">
//       <input
//         type="text"
//         value={editedTask}
//         onChange={(e) => setEditedTask(e.target.value)}
//         onKeyDown={handleEnterKey}
//         className="input-style"
//       />
//       {/* Кнопка Edit, которая остается на своем месте */}
//       <button onClick={handleSaveEdit} className="round-button-style">
//         Edit
//       </button>
//     </div>
//   );
// };

// export default withLogger(EditTask);

import React, { useState } from 'react';
import withLogger from '../withLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const EditTask = ({ taskToEdit, onSaveEdit, onCancelEdit, logAction }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [tasks, setTasks] = useState([]);

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

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  return (
    <div className="task-buttons">
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e, handleSaveEdit)}
        className="input-style"
      />
<button className="round-button-style" onClick={() => handleEditTask(taskToEdit.id)}>
<FontAwesomeIcon icon={faPencilAlt} className="round-icon fa fa-pencil" />
</button>
    </div>
  );
};

export default withLogger(EditTask);
