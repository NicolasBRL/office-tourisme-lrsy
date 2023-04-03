import React from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/AuthContext";

const Header = () => {
  const { setUser, setAuthToken } = useStateContext();

  //   Déconnect l'utilisateur
  const handleLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setAuthToken(null);
    });
  };
  return (
    <header id="header" className="relative z-30">
      <div className="px-8 mx-auto xl:px-5 container">
        <div className="flex items-center justify-between h-20 border-b-2 border-gray-100 md:justify-start md:space-x-6">
          <div className="inline-flex">
            <img
              src="./assets/images/logo-lrsy.svg"
              alt="Logo aïoli"
              className="w-20"
            />
          </div>

          <div className="flex h-full md:flex-1">
            <div className="flex-1 hidden h-full space-x-8 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Accueil
              </NavLink>
              <NavLink
                to="/lieux"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Lieux
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Articles
              </NavLink>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Catégories
              </NavLink>
              <NavLink
                to="/utilisateurs"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-b-2 ${
                    isActive ? "border-primary-700" : "border-transparent"
                  } text-gray-900 focus:border-darkblue-700`
                }
              >
                Utilisateurs
              </NavLink>
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
  );
};

export default Header;
