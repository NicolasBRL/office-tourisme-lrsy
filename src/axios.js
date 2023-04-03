import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

// Avant la requête, ajout du token d'authentification dans le header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;