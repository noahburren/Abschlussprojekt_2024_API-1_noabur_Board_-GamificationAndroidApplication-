import { Outlet, Navigate } from "react-router-dom";
import Login from "../Login";

const ProtectedRoutes = () => {
  const user = null;
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
