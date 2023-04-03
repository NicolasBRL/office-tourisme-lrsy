import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useStateContext } from "../contexts/AuthContext";

const DashboardLayout = ({ routes }) => {
  const { user, authToken } = useStateContext();
  if (!authToken) return <Navigate to="/login" />;
  if (user) {
    return (
      <div>
        <Header />
        <main className="container mx-auto p-8 xl:px-5">
          <Outlet />
        </main>
      </div>
    );
  }
};

export default DashboardLayout;
