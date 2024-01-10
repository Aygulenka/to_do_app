import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children, token }) => {
  return (
    <AuthContext.Provider value={{ token, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
};