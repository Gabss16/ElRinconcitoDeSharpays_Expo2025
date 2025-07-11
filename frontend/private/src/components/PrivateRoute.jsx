import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingAnimation from "../components/LoadingAnimation.jsx";

const PrivateRoute = () => {
  const { authCookie } = useAuth();
  return authCookie ? <Outlet /> : <LoadingAnimation navTo={"/Login"} alert={"Debes iniciar sesión"} />;
};

export default PrivateRoute;
