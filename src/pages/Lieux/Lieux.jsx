import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import PlaceMap from "../../components/Map";

const Lieux = () => {
  const [lieux, setLieux] = useState([]);

  useEffect(() => {
    displayLieux();
  }, []);

  const displayLieux = async () => {
    await axiosClient.get("/lieux").then((res) => {
      setLieux(res.data.lieux);
    });
  };

  const deleteLieux = async (id) => {
    axiosClient.delete(`/lieux/${id}`).then(displayLieux);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between p-6 bg-white border border-gray-200 rounded-lg mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Liste des lieux
        </h1>
        <a
          href="/dashboard/lieux/add"
          className="inline-flex items-center text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto bg-primary-600 hover:bg-primary-700 focus:ring-primary-700 border-primary-700 open-modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2 -ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Ajouter un lieu
        </a>
      </div>

      <div className="flex gap-8">
        <div className="w-1/3" id="map-container">
          <PlaceMap
            markers={lieux.map((lieu) => {
              return { longitude: lieu.longitude, latitude: lieu.latitude };
            })}
          />
        </div>

        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg w-2/3 h-fit">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-primary-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3">
                  Adresse
                </th>
                <th scope="col" className="px-6 py-3">
                  Catégories
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 inline-flex"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {lieux.map((lieu) => (
                <tr
                  key={lieu.id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {lieu.nom}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {lieu.adresse}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {lieu.categories.map((categorie) => (
                        <span
                          key={categorie.id}
                          className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {categorie.nom}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Link
                      to={`/dashboard/lieux/${lieu.id}`}
                      className="font-medium text-primary-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 inline-flex mr-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>

                    <a
                      className="font-medium text-primary-700 cursor-pointer"
                      onClick={() => {
                        deleteLieux(lieu.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 inline-flex"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lieux;
