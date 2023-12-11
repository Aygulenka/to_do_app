import React, { useState, useEffect } from "react";
import withLogger from '../withLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import '../taskListStyles.css';

const NoNowTaskList = ({ logAction }) => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Получение токена из localStorage
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    // Проверка наличия токена перед загрузкой задач
    if (token) {
      fetchTasks();
    } else {
      // Выполните здесь действия для неаутентифицированного пользователя,
      // например, переадресация на страницу входа или отображение модального окна
      console.log("Пользователь не аутентифицирован");
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const url = "https://todo-redev.herokuapp.com/api/todos";
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Request URL:", url);
      console.log("Request Headers:", {
        'Authorization': `Bearer ${token}`,
      });

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTask }),
        });

        if (response.ok) {
          const data = await response.json();
          setTasks([...tasks, data]);
          setNewTask("");
          logAction('добавлена', data);
        } else {
          console.error("Ошибка при добавлении задачи:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const deletedTask = tasks.find((task) => task.id === id);
        setTasks(tasks.filter((task) => task.id !== id));
        logAction('удалена', deletedTask);
      } else {
        console.error("Ошибка при удалении задачи:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditIndex(id);
      setEditedTask(taskToEdit.title);
      logAction('изменения начаты');
    }
  };

  const handleSaveEdit = async () => {
    if (editedTask.trim() !== "") {
      try {
        const response = await fetch(`https://todo-redev.herokuapp.com/api/todos/${editIndex}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ title: editedTask }),
        });

        if (response.ok) {
          const data = await response.json();
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editIndex ? { ...task, title: editedTask } : task
            )
          );
          setEditIndex(null);
          setEditedTask("");
          const editedTaskObj = tasks.find((task) => task.id === editIndex);
          logAction('изменена', editedTaskObj);
        } else {
          console.error("Ошибка при изменении задачи:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка при изменении задачи:", error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const response = await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const toggledTask = tasks.find((task) => task.id === id);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
        logAction('выполнена', toggledTask);
      } else {
        console.error("Ошибка при пометке задачи выполненной:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при пометке задачи выполненной:", error);
    }
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
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
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
                      textDecoration: task.isCompleted ? "line-through" : "none",
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
          ))
          ):null }
      </ul>
    </div>
  );
};

export default withLogger(NoNowTaskList);
