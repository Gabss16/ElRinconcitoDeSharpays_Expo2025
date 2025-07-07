// src/components/SidebarMenu.jsx
import React from 'react';
import '../styles/SubMenu.css'; // asegúrate de tener este archivo de estilos

const SidebarMenu = () => {
  return (
    <aside className="sidebar-menu">
      <button className="category-btn">All Category</button>
      <button className="category-btn">Tops y sujetadores</button>
      <button className="category-btn">Leggings y pantalones</button>
      <button className="category-btn">Bags</button>
      <button className="category-btn">Accesorios</button>
      <button className="category-btn">Yoga Mats</button>
      <button className="category-btn">Water Bottles</button>
      <button className="category-btn">Hoodies</button>
      <button className="category-btn">Joggers y Pants</button>
    </aside>
  );
};

export default SidebarMenu;
