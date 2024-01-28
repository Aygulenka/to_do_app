import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "./api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { dispatch }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        const token = response.data.token;

        window.localStorage.setItem("token", token);

        console.log(
          "Login successful:",
          JSON.stringify(values),
          "token",
          token
        );

        return response.data; // Это будет доступно в поле `fulfilled` экшена
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data && error.response.data.message;

        if (errorMessage === "Такого пользователя нет!") {
          throw new Error(errorMessage);
        } else {
          console.error("Login failed:", errorMessage);
          throw new Error("Login failed");
        }
      } else {
        console.error("Unexpected error during login:", error);
        throw new Error(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    loading: false,
    error: null,
    isModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;
        state.error = action.error.message;
      });
  },
});

export const { clearLoginError, setUserData, openModal, closeModal } =
  authSlice.actions;
export default authSlice.reducer;
