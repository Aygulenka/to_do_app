import axios from 'axios';

export const setTasks = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const setNewTask = (task) => ({
  type: 'SET_NEW_TASK',
  payload: task,
});

export const setEditIndex = (index) => ({
  type: 'SET_EDIT_INDEX',
  payload: index,
});

export const setEditedIndex = (index) => ({
  type: 'SET_EDITED_INDEX',
  payload: index,
});

export const setEditedTask = (task) => ({
  type: 'SET_EDITED_TASK',
  payload: task,
});

export const fetchTasks = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data) {
        dispatch(setTasks(response.data));
      } else {
        console.error("Сервер вернул ошибку:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  };
};

export const handleAddTask = (logAction, token, newTask) => {
    return async (dispatch, getState) => {
      if (newTask.trim() !== "") {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/todos`,
            { title: newTask },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
  
          if (response.data) {
            const { tasks } = getState().tasks;
            dispatch(setTasks([...tasks, response.data]));
            dispatch(setNewTask(""));
            logAction('добавлена', response.data);
          } else {
            console.error("Ошибка при добавлении задачи. Ответ не содержит итерируемого массива данных:", response);
          }
        } catch (error) {
          console.error("Ошибка при добавлении задачи:", error);
        }
      }
    };
  };


export const handleDeleteTask = (logAction, token, id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const deletedTask = getState().tasks.tasks.find((task) => task.id === id);
        dispatch(setTasks(getState().tasks.tasks.filter((task) => task.id !== id)));
        logAction('удалена', deletedTask);
      } else {
        console.error("Ошибка при удалении задачи:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };
};

export const handleSaveEdit = (token, logAction, editIndex, editedTask) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/todos/${editIndex}`,
        { title: editedTask },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        dispatch(setTasks(getState().tasks.tasks.map((task) =>
          task.id === editIndex ? { ...task, title: editedTask } : task
        )));
        dispatch(setEditIndex(null));
        dispatch(setEditedTask(""));
        const editedTaskObj = getState().tasks.tasks.find((task) => task.id === editIndex);
        logAction('изменена', editedTaskObj);
      } else {
        console.error("Ошибка при изменении задачи:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при изменении задачи:", error);
    }
  };
};

export const handleToggleComplete = (logAction, token, id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/todos/${id}/isCompleted`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const toggledTask = getState().tasks.tasks.find((task) => task.id === id);
        dispatch(setTasks(getState().tasks.tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )));
        logAction('выполнена', toggledTask);
      } else {
        console.error("Ошибка при пометке задачи выполненной:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при пометке задачи выполненной:", error);
    }
  };
};
