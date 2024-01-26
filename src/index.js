import React from 'react';
import ReactDOM from 'react-dom/client';


import { AuthProvider } from './Components/AuthContext';

// import { Provider } from 'react-redux';
// import store from './Components/RTK/store';


import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
    </AuthProvider>

)