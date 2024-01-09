import axios from 'axios';

const registerSuccess = (userData) => ({
  type: 'REGISTER_SUCCESS',
  payload: userData,
});

const registerError = (error) => ({
  type: 'REGISTER_ERROR',
  payload: error,
});

export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData,
});

// Отправка запроса к API
const sendRequest = async (url, method, data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};


export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/users/register`,
        'POST',
        userData,
        { 'Content-Type': 'application/json' }
      );

      if (response.status === 200 && response.data && response.data.id) {
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('user_data', JSON.stringify(userData));

        console.log('User ID:', response.data.id);
        dispatch(registerSuccess(response.data));
      } else {
        dispatch(registerError('Registration failed'));
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      dispatch(registerError(error.message));
    }
  };
};




export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const openModal = () => ({
  type: 'OPEN_MODAL',
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

export const loginError = (error) => ({
  type: 'LOGIN_ERROR',
  payload: error,
});

export const clearLoginError = () => ({
  type: 'CLEAR_LOGIN_ERROR',
});

export const loginUser = (values) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login response:', response);

      if (response.status === 200) {
        const token = response.data.token;

        window.localStorage.setItem('token', token);

        console.log('Login successful:', JSON.stringify(values));

        dispatch(loginSuccess(response.data));
      } else {
        dispatch(loginError('Login failed'));
      }
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage =
          error.response.data && error.response.data.message;

        if (errorMessage === 'Такого пользователя нет!') {
          dispatch(loginError(errorMessage));
        } else {
          console.error('Login failed:', errorMessage);
        }
      } else {
        console.error('Unexpected error during login:', error);
        dispatch(loginError(error.message));
      }
    }
  };
};

// const [showLogoutModal, setShowLogoutModal] = useState(false);
// const [loading, setLoading] = useState(false);
// const [isMounted, setIsMounted] = useState(true);

export const showLogoutModal = () => ({
  type: 'SHOW_LOGOUT_MODAL',
});

export const hideLogoutModal = () => ({
  type: 'HIDE_LOGOUT_MODAL',
});

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

export const logoutError = (error) => ({
  type: 'LOGOUT_ERROR',
  payload: error,
});

export const logoutUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(logoutRequest());

      const token = localStorage.getItem('token');
      await axios.delete(`https://todo-redev.herokuapp.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(logoutSuccess());
      console.log('User successfully logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
      dispatch(logoutError(error.message));
    }
  };
};
