import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios';

const AddUtilisateur = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    axiosClient.post("/users", {email: emailRef.current.value, password: passwordRef.current.value})
    .then(
        response => (response.data.success) ? navigate('/utilisateurs') : console.log(response.data)
    ).catch((e) => {
      console.log(e);
    });
  }

  return (
    <form
      className="p-6 bg-white border border-gray-200 rounded-lg my-5"
      onSubmit={handleForm}
    >
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          ref={emailRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Mot de passe
        </label>
        <input
          type="text"
          name="password"
          ref={passwordRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>

      <button className="inline-flex items-center text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto bg-primary-600 hover:bg-primary-700 focus:ring-primary-700 border-primary-700">
        Ajouter
      </button>
    </form>
  );
}

export default AddUtilisateur