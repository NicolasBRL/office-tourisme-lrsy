import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout"
import GuestLayout from "./layouts/GuestLayout"
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

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lieux" element={<Lieux />} />
          <Route path="/lieux/add" element={<AddLieu />} />
          <Route path="/lieux/:lieu" element={<EditLieu />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/add" element={<AddCategorie />} />
          <Route path="/categories/:categorie" element={<EditCategorie />} />

          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/add" element={<AddArticles />} />
          <Route path="/articles/:article" element={<EditArticles />} />

          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/utilisateurs/add" element={<AddUtilisateur />} />
          <Route path="/utilisateurs/:user" element={<EditUtilisateur />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
