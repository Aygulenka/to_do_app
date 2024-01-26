import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'; 
import { apiUrl } from '../AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';


const LogOut = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      return () => {
        setIsMounted(false);
      };
    }, []);
  
    const handleLogout = () => {
      setShowLogoutModal(true);
    };
    const confirmLogout = async () => {
        try {
          setLoading(true);
      
          const user_id = localStorage.getItem('user_id');
          console.log('User ID:', user_id);
  
          const removeUserOnServer = async (userId) => {
            console.log('Removing user on server with ID:', userId);
          
            try {
              if (userId && isMounted) {
                console.log('Inside the if statement');
          
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${apiUrl}/users/${userId}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
          
                console.log('Response from server:', response.data);
                console.log('Пользователь успешно удален с сервера.');
              }
            } catch (error) {
              console.error('Ошибка при удалении пользователя с сервера:', error);
              throw error;
            }
          };
          
  
        const removeTasksFromLocalStorage = (userId) => {
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          const updatedTasks = tasks.filter((task) => task.userId !== userId);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
  
        await removeUserOnServer(user_id);
  
        removeTasksFromLocalStorage(user_id);
  
        localStorage.clear();
  
        setShowLogoutModal(false);
        console.log('User successfully logged out. Navigating to the home page.');
        navigate('/');
      } catch (error) {
        console.error('Ошибка при подтверждении выхода:', error);
      } finally {
        console.log('Inside the finally block');
        setLoading(false);
      }
    };
  
    const cancelLogout = () => {
      setShowLogoutModal(false);
    };
  
    return (
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="header-icon home-icon" />
          </Link>
        </div>
        <div className="header-right">
          <Link to="#" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="header-icon logout-icon" />
          </Link>
        </div>
  
        {showLogoutModal && (
          <div className="logout-modal">
            <p>Вы уверены, что хотите выйти из аккаунта? Все данные пользователя будут удалены.</p>
            <button onClick={confirmLogout} disabled={loading}>Да</button>
            <button onClick={cancelLogout} disabled={loading}>Отмена</button>
          </div>
        )}
      </header>
    );
  };
  
  export default LogOut;
