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

// Vérifie si il y'a des erreurs au retour de la requête
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    console.log(error)

    // Utilisateur non authorisé ou token invalide/inéxistan
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.reload();
    }

    throw error;
  }
);

export default axiosClient;