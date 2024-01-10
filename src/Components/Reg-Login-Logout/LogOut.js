import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { showLogoutModal, hideLogoutModal, logoutUser } from '../React-Redux/Reg-Login-Logout/actions';


const LogOut = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { showLogoutModal: showModal, loading } = useSelector((state) => state.logout);
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = () => {
    dispatch(showLogoutModal(true));
  };

  const confirmLogout = async () => {
    try {
      if (userData) {
        const { userId } = userData;
        dispatch(logoutUser(userId));
        dispatch(hideLogoutModal());
      }

      navigate('/')
    } catch (error) {
      console.error('Ошибка при подтверждении выхода:', error);
    }
  };

  const cancelLogout = () => {
    dispatch(hideLogoutModal(false));
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

      {showModal && (
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

