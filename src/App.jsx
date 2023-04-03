import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout"
import GuestLayout from "./layouts/GuestLayout"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
