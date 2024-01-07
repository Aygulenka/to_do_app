import React, { useState } from 'react';
import withLogger from '../withLogger';
import AddTask from './AddTask';
import Task from './Task';
import EditTask from './EditTask';

// ...

const TaskList = ({ tasks = [], onToggleComplete, onEditTask, onDeleteTask, logAction }) => {
    const [taskList, setTaskList] = useState(tasks);
    const [editTask, setEditTask] = useState(null);
  
    const handleAddTask = (newTask) => {
      setTaskList((prevTasks) => [...prevTasks, newTask]);
    };
  
    const handleToggleComplete = (taskId) => {
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    const handleEditTask = (task) => {
      setEditTask(task);
    };
  
    const handleSaveEdit = (editedTask) => {
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? { ...task, text: editedTask.text } : task
        )
      );
      setEditTask(null);
      logAction('изменена', editedTask);
    };
  
    return (
      <div className="center-container">
        <p className="txttodo">Task List</p>
        <AddTask onAddTask={handleAddTask} logAction={logAction} />
        <ul>
          {taskList.map((task) => (
            <li key={task.id}>
              {editTask && editTask.id === task.id ? (
                <EditTask
                  taskToEdit={task}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditTask(null)}
                  logAction={logAction}
                />
              ) : (
                <Task
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEditTask={() => handleEditTask(task)}
                  onDeleteTask={onDeleteTask}
                  logAction={logAction}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default withLogger(TaskList);
  