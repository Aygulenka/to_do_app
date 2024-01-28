import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/register");
  };

  const handleClickSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="layout">
      <div className="waviy">
        <span style={{ "--i": 1 }}>T</span>
        <span style={{ "--i": 2 }}>O</span>
        <span style={{ "--i": 3 }}>D</span>
        <span style={{ "--i": 4 }}>O</span>
      </div>
      <div className="button-container">
        <button className="button-style" onClick={handleClickLogin}>
          Log in
        </button>
        <button className="button-style" onClick={handleClickSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
