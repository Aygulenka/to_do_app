import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchOutUser, setShowLogoutModal } from "../RTK/outSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = window.localStorage.getItem("userId");
  const { showLogoutModal } = useSelector((state) => state.out);

  const handleLogout = () => {
    dispatch(setShowLogoutModal(true));
  };

  const confirmLogout = async () => {
    try {
      await dispatch(fetchOutUser(userId));
      dispatch(setShowLogoutModal(false)); // Закрываем модальное окно
      console.log("User successfully logged out. Navigating to the home page.");
      navigate("/");
    } catch (error) {
      console.error("Ошибка при подтверждении выхода:", error);
    }
  };

  const cancelLogout = () => {
    dispatch(setShowLogoutModal(false));
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
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="header-icon logout-icon"
          />
        </Link>
      </div>

      {showLogoutModal && (
        <div className="logout-modal">
          <p>
            Вы уверены, что хотите выйти из аккаунта? Все данные пользователя
            будут удалены.
          </p>
          <button onClick={confirmLogout}>Да</button>
          <button onClick={cancelLogout}>Отмена</button>
        </div>
      )}
    </header>
  );
};

export default LogOut;
