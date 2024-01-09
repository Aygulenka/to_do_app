const initialRegisterState = {
    user: null,
    error: null,
  };
  
  const registerReducer = (state = initialRegisterState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'REGISTER_ERROR':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  const initialLogInState = {
    isModalOpen: false,
    userData: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialLogInState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          userData: action.payload,
          loading: false,
          error: null,
        };
      case 'LOGIN_ERROR':
        return {
          ...state,
          userData: null,
          loading: false,
          error: action.payload,
        };
      case 'CLEAR_LOGIN_ERROR':
        return {
          ...state,
          error: null,
        };
        case 'SET_USER_DATA':
            return {
              ...state,
              userData: action.payload,
            };

      default:
        return state;
    }
  };
   
  const modalInitialState = {
    isModalOpen: false,
  };
  
  const modalReducer = (state = modalInitialState, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          isModalOpen: true,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          isModalOpen: false,
        };
      default:
        return state;
    }
  };

const initialLogoutState = {
    showLogoutModal: false,
    loading: false,
    error: null,
  };
  
  const logoutReducer = (state = initialLogoutState, action) => {
    switch (action.type) {
      case 'SHOW_LOGOUT_MODAL':
        return {
          ...state,
          showLogoutModal: true,
        };
      case 'HIDE_LOGOUT_MODAL':
        return {
          ...state,
          showLogoutModal: false,
        };
      case 'LOGOUT_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...initialLogoutState,
        };
      case 'LOGOUT_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

  export {
    registerReducer,
    authReducer,
    logoutReducer,
    modalReducer
  };
  