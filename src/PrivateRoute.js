import { Navigate, Outlet } from "react-router-dom";

//This file is to ensure only authenticated users can access the main page

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Check if token exists

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;