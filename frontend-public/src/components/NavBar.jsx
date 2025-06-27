import React, { useState } from "react";
import { FaMoon, FaSun, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css"; // Estilos personalizados

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logoSharpay.png" alt="El Rinconcito de Sharpay" className="logo" />
      </div>

      <ul className="navbar-links">
        <li><a href="/">Inicio</a></li>

        <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <a href="#">Tiendas ▾</a>
          {showDropdown && (
            <div className="dropdown-menu">
              <a href="#">sharpays</a>
              <a href="#">bougies</a>
              <a href="#">duas</a>
              <a href="#">frostybite</a>
              <a href="#">paraiso</a>
            </div>
          )}
        </li>

        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#">Contactanos</a></li>
      </ul>

      <div className="navbar-icons">
        <button className="icon-button"><FaMoon /></button>
        <button className="icon-button"><FaShoppingCart /> Carrito</button>
        <button className="icon-button"><FaUser /></button>
      </div>
    </nav>
  );
};

export default Navbar;
