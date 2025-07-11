import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./NavBar.css";
import img from "../assets/sharpaysLogo.png";
import ThemeSwitch from "./ThemeSwitch";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="menu-header">
      <div className="menu-left">
        {/* Este logo actúa como botón hamburguesa solo en móvil */}
        <img
          src={img}
          alt="Logo"
          className="menu-logo"
          onClick={toggleMenu}
        />
        <span className="menu-title">El Rinconcito de Sharpay</span>
      </div>

      <nav className={`menu-nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Inicio</Link>
        <div className="dropdown">
          <button>Tiendas</button>
          <div className="dropdown-content">
            <Link to="/sharpays" onClick={toggleMenu}>Sharpay's Boutique</Link>
            <Link to="/frostyBites" onClick={toggleMenu}>Frostibites</Link>
            <Link to="/bougies" onClick={toggleMenu}>Bougies</Link>
            <Link to="/paraiso" onClick={toggleMenu}>El Paraíso de Dios</Link>
          </div>
        </div>
        <Link to="/sobre-nosotros" onClick={toggleMenu}>Sobre Nosotros</Link>
      </nav>

      <div className="menu-right">
        <div className="theme-toggle-custom">
          <ThemeSwitch />
        </div>
        <Link to="/carrito" className="menu-btn">
          <FaShoppingCart /> Carrito
        </Link>
        <Link to="/profile" className="menu-btn">
          Perfil <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Menu;
