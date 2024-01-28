// import React from 'react';
// import ReactDOM from 'react-dom/client';


// //import { AuthProvider, apiUrl } from './Components/AuthContext';

// import { Provider } from 'react-redux';
// import store from './Components/RTK/store';


// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//     // <AuthProvider  apiUrl={apiUrl}>
//     <Provider store={store}>
//     <App />
//     </Provider>
//     // </AuthProvider>

// )
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Components/RTK/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
