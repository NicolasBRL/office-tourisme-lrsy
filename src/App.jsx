import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/Dashboard";
import Lieux from "./pages/Lieux/Lieux";
import AddLieu from "./pages/Lieux/AddLieu";
import Login from "./pages/Login";
import AddCategorie from "./pages/Categories/AddCategorie";
import EditCategorie from "./pages/Categories/EditCategorie";
import Categories from "./pages/Categories/Categories";
import EditLieu from "./pages/Lieux/EditLieu";
import Articles from "./pages/Articles/Articles";
import AddArticles from "./pages/Articles/AddArticles";
import EditArticles from "./pages/Articles/EditArticles";
import Utilisateurs from "./pages/Utilisateurs/Utilisateurs";
import AddUtilisateur from "./pages/Utilisateurs/AddUtilisateur";
import EditUtilisateur from "./pages/Utilisateurs/EditUtilisateur";
import { useStateContext } from "./contexts/AuthContext";

const App = () => {
  const { user } = useStateContext();

  const can = (permission) => {
    return (user?.permissions || []).find((p) => p == permission)
      ? true
      : false;
  };

  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />

          {can("access all lieux") && (
            <Route path="/lieux" element={<Lieux />} />
          )}
          {can("access create lieux") && (
            <Route path="/lieux/add" element={<AddLieu />} />
          )}
          {can("access update lieux") && (
            <Route path="/lieux/:lieu" element={<EditLieu />} />
          )}

          {can("access all categories") && (
            <Route path="/categories" element={<Categories />} />
          )}
          {can("access create categories") && (
            <Route path="/categories/add" element={<AddCategorie />} />
          )}
          {can("access update categories") && (
            <Route path="/categories/:categorie" element={<EditCategorie />} />
          )}

          {can("access all articles") && (
            <Route path="/articles" element={<Articles />} />
          )}
          {can("access create articles") && (
            <Route path="/articles/add" element={<AddArticles />} />
          )}
          {can("access update articles") && (
            <Route path="/articles/:article" element={<EditArticles />} />
          )}

          {can("access all users") && (
            <Route path="/utilisateurs" element={<Utilisateurs />} />
          )}
          {can("access create users") && (
            <Route path="/utilisateurs/add" element={<AddUtilisateur />} />
          )}
          {can("access update users") && (
            <Route path="/utilisateurs/:user" element={<EditUtilisateur />} />
          )}
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
