import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "./api";

// Состояние для выхода и окна
const initialState = {
  user: null,
  status: "idle",
  error: null,
  showLogoutModal: false,
};

// функция, котбудем выполнять
const outUser = async (values, { setSubmitting }) => {
  try {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    const removeUserOnServer = async (userId) => {
      try {
        if (userId) {
          const token = localStorage.getItem("token");
          const response = await axios.delete(`${apiUrl}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Response from server:", response);
          console.log("Пользователь успешно удален с сервера.");
        }
      } catch (error) {
        console.error("Ошибка при удалении пользователя с сервера:", error);
        throw error;
      }
    };

    const removeTasksFromLocalStorage = (userId) => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.userId !== userId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    await removeUserOnServer(userId);

    removeTasksFromLocalStorage(userId);

    localStorage.clear();
  } catch (error) {
    console.error("Ошибка при подтверждении выхода:", error);
  } finally {
    setSubmitting(false);
  }
};

// Создаем асинхронное действие с помощью createAsyncThunk
export const fetchOutUser = createAsyncThunk(
  "users/fetchOutUser",
  async (values, { dispatch }) => {
    await outUser(values, { setSubmitting: null });
    return values;
  }
);

const outSlice = createSlice({
  name: "out",
  initialState,
  reducers: {
    setShowLogoutModal: (state, action) => {
      state.showLogoutModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setShowLogoutModal } = outSlice.actions;
export default outSlice.reducer;
