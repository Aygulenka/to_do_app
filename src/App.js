// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TaskList from './Components/Tasks/TaskList';
import Register from './Components/Reg-Login-Logout/Register'
import LogIn from './Components/Reg-Login-Logout/LogIn'
import Home from './Components/Home'
import LogOut from "./Components/Reg-Login-Logout/LogOut"

import './Styles/App.css'
import './Styles/Header.css'
import './Styles/Modal.css'
import './Styles/styles.css'
import './Styles/tasksStyles.css'

const App = () => {
  return (
    <Router>
      <LogOut/>
      <Routes>
        <Route path="/" element={<Home />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/login" element={<LogIn />} />
       <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </Router>
)}

export default App;