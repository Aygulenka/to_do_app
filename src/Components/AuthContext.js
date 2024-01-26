import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children, token }) => {
  console.log("apiUrl:", process.env.REACT_APP_API_URL);
  return (
    <AuthContext.Provider value={{ token, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};