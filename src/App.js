// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TaskList from './Components/Tasks/TaskListAPI';
import Register from './Components/Reg-Login-Logout/Register'
import LogIn from './Components/Reg-Login-Logout/LogIn'
import Home from './Components/Home'
import LogOut from "./Components/Reg-Login-Logout/LogOut"

import './Components/Styles/App.css'
import './Components/Styles/Header.css'
import './Components/Styles/Modal.css'
import './Components/Styles/styles.css'
import './Components/Styles/tasksStyles.css'

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