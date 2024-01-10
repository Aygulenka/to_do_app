import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    editIndex: null,
    editedTask: '',
    newTask: '',
  },
  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
     // console.log(setNewTask)
    },
    addTask: (state, action) => {
      const { text, id, completed } = action.payload;
      state.tasks.push({ text, id, completed });
      state.newTask = '';
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      state.tasks.splice(index, 1);
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      state.editIndex = id;
      state.editedTask = text;
    },
    setEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
    saveEdit: (state) => {
      if (state.editedTask.trim() !== '') {
        const index = state.tasks.findIndex(task => task.id === state.editIndex);
        state.tasks[index].text = state.editedTask;
        state.editIndex = null;
        state.editedTask = '';
      }
    },
    toggleComplete: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      state.tasks[index].completed = !state.tasks[index].completed;
    },
  },
});

export const {
  setNewTask,
  addTask,
  deleteTask,
  editTask,
  setEditedTask,
  saveEdit,
  toggleComplete,
} = tasksSlice.actions;

export default tasksSlice.reducer;
