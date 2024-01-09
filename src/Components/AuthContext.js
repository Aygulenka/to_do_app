//AuthContext.js
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, token }) => {
  return (
    <AuthContext.Provider value={token}>
      {children}
      
    </AuthContext.Provider>
  );
};
