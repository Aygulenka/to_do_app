const initialState = {
    tasks: [],
    newTask: "",
    editIndex: null,
    editedIndex: null,
    editedTask: "",
  };
  
  const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return {
          ...state,
          tasks: action.payload,
        };
      case 'SET_NEW_TASK':
        return {
          ...state,
          newTask: action.payload,
        };
      case 'SET_EDIT_INDEX':
        return {
          ...state,
          editIndex: action.payload,
        };
      case 'SET_EDITED_INDEX':
        return {
          ...state,
          editedIndex: action.payload,
        };
      case 'SET_EDITED_TASK':
        return {
          ...state,
          editedTask: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tasksReducer;
  