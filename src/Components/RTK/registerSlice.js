import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "./api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/users/register`,
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          gender: userData.gender,
          age: parseInt(userData.age, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data && response.data.id) {
          // Регистрация успешна
          console.log("Registration successful:", response.data);

          // Сохраняем user_id в localStorage
          localStorage.setItem("user_id", response.data.id);

          // Сохраняем данные в localStorage
          window.localStorage.setItem("user_data", JSON.stringify(userData));

          console.log("Email:", userData.email);
          console.log("Password:", userData.password);

          // Ваши остальные действия с данными (например, отправка на сервер)
        } else {
          // Ошибка регистрации
          console.error("Registration failed:", response.data);
        }
      } else {
        // Обработка ошибок с кодом ответа, отличным от 200
        console.error(
          "Error during registration. Status code:",
          response.status
        );
        // Выводим также содержимое ответа
        console.error("Response data:", response.data);
      }
    } catch (error) {
      // Ошибка запроса
      console.error("Error during registration:", error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
