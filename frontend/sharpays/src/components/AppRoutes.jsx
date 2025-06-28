import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
//import SideBar from "../components/Sidebar.jsx";
//import Footer from "../components/Footer.jsx";


export default function AppRoutes() {
  return (
    <>
      <NavbarSelector />
      <Routes>
        {NavegationPublic()}
        {NavegationPrivate()}
        <Route path="*" element={<NotFound />} replace />
      </Routes>

      <FooterSelector />
    </>
  );
}