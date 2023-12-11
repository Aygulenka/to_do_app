// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoNowTaskList from './Tasks/NoNowTaskList';
import './App.css';
import './taskListStyles.css';
import Register from './reg_login_logout/Register'
import LogIn from './reg_login_logout/LogIn'
import Home from './reg_login_logout/Home'
import LogOut from "./reg_login_logout/LogOut"

const App = () => {
  return (
    <Router>
      <LogOut/>
      <Routes>
        <Route path="/" element={<Home />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/login" element={<LogIn />} />
       <Route path="/tasklist" element={<NoNowTaskList />} />
      </Routes>
    </Router>
)}

export default App;