
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./NavBar.css";
import img from "../assets/sharpaysLogo.png"

const Menu = () => {

  const [theme, setTheme] = useState("light");

  return (
    <header className="menu-header">
      <div className="menu-left">
        <img src= {img} alt="Logo" className="menu-logo" />
        <span className="menu-title">El Rinconcito de Sharpay</span>
      </div>

      <nav className="menu-nav">
        <Link to="/">Inicio</Link>

        <div className="dropdown">
          <button>Tiendas</button>
          <div className="dropdown-content">
            <Link to="/sharpays">Sharpay's Boutique</Link>
            <Link to="/frostyBites">Frostibites</Link>
            <Link to="/bougies">Bougies</Link>
            <Link to="/paraiso">El Paraíso de Dios</Link>
          </div>
        </div>

        <Link to="/sobre-nosotros">Sobre Nosotros</Link>
      </nav>

      <div className="menu-right">
      <div className="theme-toggle">
          <button
            className={`theme-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <FaMoon />
          </button>
          <button
            className={`theme-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <FaSun />
          </button>
        </div>

        <Link to="/carrito" className="menu-btn">
          <FaShoppingCart /> Carrito
        </Link>

        <Link to="/perfil" className="menu-btn">
          Perfil <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Menu;