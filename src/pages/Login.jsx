import React, { useRef, useState } from "react";
import axios from "../axios";
import { useStateContext } from "../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setAuthToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault(); // Annule l'évènement par défaut
    setErrors(null); // Reset les erreurs

    // On récupère les données d'authentification que l'on stocke dans un objet
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setAuthToken(data.authorisation.token);
      })
      .catch((e) => {
        if (e.response.status === 422) {
          setErrors({ login: [e.response.data.message] });
        }
      });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6">
          <img
            className="w-40 mr-2"
            src="../assets/images/logo-lrsy.svg"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Connexion
            </h1>

            {errors && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="nom@exemple.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
