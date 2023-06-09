import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/AuthContext";
import Logo from "./Logo";

const Header = () => {
  const { setUser, setAuthToken, user, getUser } = useStateContext();
  const navigate = useNavigate();

  const can = (permission) => {
    return (user?.permissions || []).find((p) => p == permission)
      ? true
      : false;
  };

  //   Déconnect l'utilisateur
  const handleLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setAuthToken(null);
      navigate('/login')
    });
  };

  useEffect(() => {
    if(!user) getUser();
  }, [])

  if(user){
  return (
    <header id="header" className="relative z-30">
      <div className="px-8 mx-auto xl:px-5 container">
        <div className="flex items-center justify-between h-20 border-b-2 border-gray-100 md:justify-start md:space-x-6">
          <div className="inline-flex">
            <Logo className="w-20" />
          </div>

          <div className="flex h-full md:flex-1">
            <div className="flex-1 hidden h-full space-x-8 md:flex">
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Accueil
              </NavLink>
              {can("access all lieux") && (
                <NavLink
                  to="/dashboard/lieux"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                      isActive ? "border-primary-700" : "border-transparent"
                    } text-gray-900 focus:border-darkblue-700`
                  }
                >
                  Lieux
                </NavLink>
              )}

              {can("access all articles") && (
                <NavLink
                  to="/dashboard/articles"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                      isActive ? "border-primary-700" : "border-transparent"
                    } text-gray-900 focus:border-darkblue-700`
                  }
                >
                  Articles
                </NavLink>
              )}

              {can("access all categories") && (
                <NavLink
                  to="/dashboard/categories"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                      isActive ? "border-primary-700" : "border-transparent"
                    } text-gray-900 focus:border-darkblue-700`
                  }
                >
                  Catégories
                </NavLink>
              )}

              {can("access all users") && (
                <NavLink
                  to="/dashboard/utilisateurs"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                      isActive ? "border-primary-700" : "border-transparent"
                    } text-gray-900 focus:border-darkblue-700`
                  }
                >
                  Utilisateurs
                </NavLink>
              )}
            </div>

            <div className="flex sm:ml-6 sm:items-center">
              <a onClick={handleLogout} className="btn-logout" href="/">
                Se déconnecter
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );}
};

export default Header;
