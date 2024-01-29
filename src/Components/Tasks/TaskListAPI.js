import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import withLogger from "../withLogger";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  handleAddTaskAction,
  handleDeleteTaskAction,
  handleSaveEditAction,
  handleToggleCompleteAction,
  setNewTask,
  setEditIndex,
  setEditedTask,
} from "../RTK/todoSlice";

const TaskList = ({ logAction }) => {
  const token = window.localStorage.getItem("token");

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const newTask = useSelector((state) => state.tasks.newTask);
  const editIndex = useSelector((state) => state.tasks.editIndex);
  const editedTask = useSelector((state) => state.tasks.editedTask);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks(token));
    } else {
      console.log("Пользователь не аутентифицирован");
    }
  }, [dispatch, token]);

  const handleAddTask = () => {
    dispatch(handleAddTaskAction({ logAction, token, newTask }));
  };

  const handleDeleteTask = (id) => {
    dispatch(handleDeleteTaskAction({ logAction, token, id }));
  };

  const handleSaveEdit = () => {
    dispatch(handleSaveEditAction({ token, logAction, editIndex, editedTask }));
  };

  const handleToggleComplete = (id) => {
    dispatch(handleToggleCompleteAction({ logAction, token, id }));
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      dispatch(setEditIndex(id));
      dispatch(setEditedTask(taskToEdit.title));
      logAction("изменения начаты");
    }
  };

  const handleEnterKey = (e, action) => {
    if (e.key === "Enter") {
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
        {Array.isArray(tasks) && tasks.length > 0
          && tasks.map((task) => (
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
                      <button
                        onClick={handleSaveEdit}
                        className="round-button-style"
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="round-icon fa fa-pencil"
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: task.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.title}
                    </span>
                    <div className="task-buttons">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleToggleComplete(task.id)}
                        className="checkbox-style"
                      />
                      <button
                        className="round-button-style"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="round-icon fa fa-pencil"
                        />
                      </button>
                      <button
                        className="round-button-style"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="round-icon fa fa-trash"
                        />
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
