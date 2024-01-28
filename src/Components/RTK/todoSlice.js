import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "./api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
      throw error;
    }
  }
);

export const handleAddTaskAction = createAsyncThunk(
  "tasks/handleAddTask",
  async ({ logAction, token, newTask }, { getState, dispatch }) => {
    if (newTask.trim() !== "") {
      try {
        const response = await axios.post(
          `${apiUrl}/todos`,
          { title: newTask },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          const addedTask = response.data;
          dispatch(setTasks([...getState().tasks.tasks, addedTask])); // Обновляем список задач в хранилище
          logAction("добавлена", addedTask);
          return addedTask;
        } else {
          console.error(
            "Ошибка при добавлении задачи. Ответ не содержит итерируемого массива данных:",
            response
          );
          throw new Error("Ошибка при добавлении задачи");
        }
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        throw error;
      }
    }
  }
);

export const handleDeleteTaskAction = createAsyncThunk(
  "tasks/handleDeleteTask",
  async ({ logAction, token, id }, { getState }) => {
    try {
      const response = await axios.delete(`${apiUrl}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const deletedTask = getState().tasks.tasks.find(
          (task) => task.id === id
        );
        logAction("удалена", deletedTask);
        return id;
      } else {
        console.error("Ошибка при удалении задачи:", response.statusText);
        throw new Error("Ошибка при удалении задачи");
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      throw error;
    }
  }
);

export const handleSaveEditAction = createAsyncThunk(
  "tasks/handleSaveEdit",
  async (
    { token, logAction, editIndex, editedTask },
    { getState, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/todos/${editIndex}`,
        { title: editedTask },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const editedTaskObj = getState().tasks.tasks.find(
          (task) => task.id === editIndex
        );
        logAction("изменена", editedTaskObj);
        return response.data;
      } else {
        console.error(
          "Ошибка при изменении задачи. Ответ не содержит итерируемого массива данных:",
          response
        );
        return rejectWithValue("Ошибка при изменении задачи");
      }
    } catch (error) {
      console.error("Ошибка при изменении задачи:", error);
      return rejectWithValue("Ошибка при изменении задачи");
    }
  }
);

export const handleToggleCompleteAction = createAsyncThunk(
  "tasks/handleToggleComplete",
  async ({ logAction, token, id }, { getState }) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/todos/${id}/isCompleted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const toggledTask = getState().tasks.tasks.find(
          (task) => task.id === id
        );
        logAction("выполнена", toggledTask);
        return id;
      } else {
        console.error(
          "Ошибка при пометке задачи выполненной:",
          response.statusText
        );
        throw new Error("Ошибка при пометке задачи выполненной");
      }
    } catch (error) {
      console.error("Ошибка при пометке задачи выполненной:", error);
      throw error;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    newTask: "",
    editIndex: null,
    editedIndex: null,
    editedTask: "",
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },
    setEditedIndex: (state, action) => {
      state.editedIndex = action.payload;
    },
    setEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(handleAddTaskAction.fulfilled, (state, action) => {
        const addedTask = action.payload;
        const existingTask = state.tasks.find(
          (task) => task.id === addedTask.id
        );

        if (!existingTask) {
          state.tasks.push(addedTask);
        }
      })

      .addCase(handleDeleteTaskAction.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(handleSaveEditAction.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === id ? { ...task, title } : task
        );
        state.editIndex = null;
        state.editedTask = "";
      })
      .addCase(handleToggleCompleteAction.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        );
      });
  },
});

export const {
  setTasks,
  setNewTask,
  setEditIndex,
  setEditedIndex,
  setEditedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
