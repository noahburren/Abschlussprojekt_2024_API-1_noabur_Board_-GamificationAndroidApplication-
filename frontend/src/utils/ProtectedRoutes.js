import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Pfade entsprechend anpassen

const ProtectedRoutes = () => {
  const { userId } = useContext(AuthContext); // AuthContext verwenden, um userId zu erhalten

  // Überprüfen, ob userId vorhanden ist
  const isAuthenticated = !!userId;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
