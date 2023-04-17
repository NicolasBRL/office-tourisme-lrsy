import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios";

const AuthContext = createContext({
  authToken: null,
  user: null,

  setUser: () => {},
  setAuthToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, _setAuthToken] = useState(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setAuthToken = (token) => {
    _setAuthToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const getUser = async () => {
    await axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }
  
  // Récupère les informations de l'utilisateur authentifié si elle n'existe pas
  useEffect(() => {
    if (!user && authToken) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authToken,
        setAuthToken,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useStateContext = () => useContext(AuthContext);
