import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axiosClient from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibmljb2xhcy1haW9saSIsImEiOiJjbGJ4cHNvZmoxY3ZxM3Z0MHFudHFub29nIn0.78TlSfiHCd9KxMECYt4a0w";

const EditLieu = () => {
    const lieu = useParams().lieu;
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const nomRef = useRef();
    const adresseRef = useRef();
    const codePostalRef = useRef();
    const villeRef = useRef();
    const navigate = useNavigate();

  const addMarker = ({ lngLat }) => {
    setLng(lngLat.lng);
    setLat(lngLat.lat);
  };

  useEffect(() => {
    getCategories();
    getLieu();
  }, []);

  const getCategories = async () => {
    await axiosClient.get("/categories").then((res) => {
      setCategories(res.data.categories);
    });
  };

  const getLieu = async () => {
    await axiosClient
      .get(`/lieux/${lieu}`)
      .then((res) => {
        nomRef.current.value = res.data.lieu.nom;
        adresseRef.current.value = res.data.lieu.adresse;
        codePostalRef.current.value = res.data.lieu.code_postal;
        villeRef.current.value = res.data.lieu.ville;
        setLng(res.data.lieu.longitude);
        setLat(res.data.lieu.latitude);
        setCategoriesChecked(res.data.lieu.categories.map(categorie => categorie.id));
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCheckbox = async (e) => {
    const { id, checked } = e.target;

    if (checked) {
      setCategoriesChecked([...categoriesChecked, parseInt(id)]);
    }else{
      setCategoriesChecked(categoriesChecked.filter((e) => e != id));
    }
  }

  const updateLieu = (e) => {
    e.preventDefault();
    const payload = {
      nom: nomRef.current.value,
      adresse: adresseRef.current.value,
      code_postal: codePostalRef.current.value,
      ville: villeRef.current.value,
      longitude: lng,
      latitude: lat,
      categories: categoriesChecked
    }
    console.log(payload);
    axiosClient.put(`/lieux/${lieu}`, payload)
    .then((navigate('/lieux')))
    .catch((e) => {
      console.log(e)
    });
  };


  
  return (
    <form onSubmit={updateLieu} className="p-6 bg-white border border-gray-200 rounded-lg my-5">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Nom du lieu
        </label>
        <input
          type="text"
          ref={nomRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-6 flex gap-8">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Addresse
          </label>
          <input
            type="text"
            ref={adresseRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        <div className="w-1/3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Ville
          </label>
          <input
            type="text"
            ref={villeRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        <div className="w-1/3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Code postal
          </label>
          <input
            type="text"
            ref={codePostalRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>
      </div>

      <div className="mb-6 flex gap-8">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Longitude
          </label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Latitude
          </label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900">
        Localiser le lieu
      </label>
      <div className="w-full mb-6" id="map-container">
        <Map
          initialViewState={{
            longitude: -1.423,
            latitude: 46.67,
            zoom: 14,
            minZoom: 10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onClick={addMarker}
        >
          {lng && (
            <Marker longitude={lng} latitude={lat} anchor="bottom">
              <svg
                id="Calque_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 97.9 97.9"
                fill="#941919"
              >
                <circle
                  cx="49"
                  cy="49"
                  r="49"
                  opacity=".5"
                  className="circle"
                />
                <circle cx="49" cy="49" r="8.7" />
              </svg>
            </Marker>
          )}
        </Map>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Catégories
        </label>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex sm:flex-wrap">
          {categories.map((category, i) => (
            <li
              key={i}
              className={`w-1/4 border-gray-200 flex
          ${
            ((categories.length % 4 != 0) && (i+1) <= categories.length - (categories.length % 4))
              ? "border-b"
              : ""
          }
          ${(i + 1) % 4 != 0 ? "border-r" : ""}
          `}
            >
              <div className="flex p-2 pl-3">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id={category.id}
                    name="categories[]"
                    checked={categoriesChecked.includes(category.id)}
                    onChange={ handleChangeCheckbox }
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor={category.id} className="font-medium text-gray-900 cursor-pointer">{category.nom}</label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="inline-flex items-center text-white focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 ml-auto bg-primary-600 hover:bg-primary-700 focus:ring-primary-700 border-primary-700">
        Modifier
      </button>
    </form>
  )
}

export default EditLieu