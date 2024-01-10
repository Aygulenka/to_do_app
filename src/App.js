// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListAPI from './Components/Tasks/TaskListAPI';
import './App.css';
import Register from './Components/Reg-Login-Logout/Register'
import LogIn from './Components/Reg-Login-Logout/LogIn'
import Home from './Components/Home'
import LogOut from "./Components/Reg-Login-Logout/LogOut"

const App = () => {
  return (
    <Router>
      <LogOut/>
      <Routes>
        <Route path="/" element={<Home />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/login" element={<LogIn />} />
       <Route path="/tasklist" element={<TaskListAPI />} />
      </Routes>
    </Router>
)}

export default App;