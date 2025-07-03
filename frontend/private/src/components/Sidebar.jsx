import React, { useState } from 'react';
import "../styles/Sidebar.css"
import { NavLink } from 'react-router-dom';
import {
FaHome,
FaUsers,
FaTags,
FaStore,
FaPaw,
FaLightbulb,
FaIceCream,
FaLeaf,
FaFileInvoice,
FaSignOutAlt,
FaBars
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import SuccessAlert from './SuccessAlert';


const Sidebar = () => {

const [isOpen, setIsOpen] = useState(false);
const toggleSidebar = () => setIsOpen(!isOpen);
const { logout } = useAuth();

return (
<>
<button className="hamburger" onClick={toggleSidebar}>
<FaBars />
</button>

<aside className={`sidebar ${isOpen ? 'show' : ''}`}>
<div className="logo"></div>

<nav>
<NavLink to="/Dashboard" className="nav-item" onClick={toggleSidebar}>
<FaHome /> <span>Home</span>
</NavLink>

<div className="section-title">CONFIGURACIONES</div>
<NavLink to="/employee" className="nav-item" onClick={toggleSidebar}>
<FaUsers /> <span>Empleados</span>
</NavLink>
<NavLink to="/discounts" className="nav-item" onClick={toggleSidebar}>
<FaTags /> <span>Descuentos</span>
</NavLink>
<NavLink to="/stores-admin" className="nav-item" onClick={toggleSidebar}>
<FaStore /> <span>Administración de tiendas</span>
</NavLink>

<div className="section-title">TIENDAS</div>
<NavLink to="/sharpays" className="nav-item" onClick={toggleSidebar}>
<FaPaw /> <span>Sharpay’s Boutique</span>
</NavLink>
<NavLink to="/store/bougies" className="nav-item" onClick={toggleSidebar}>
<FaLightbulb /> <span>Bougies</span>
</NavLink>
<NavLink to="/store/frostybites" className="nav-item" onClick={toggleSidebar}>
<FaIceCream /> <span>FrostyBites</span>
</NavLink>
<NavLink to="/store/paradise" className="nav-item" onClick={toggleSidebar}>
<FaLeaf /> <span>El paraíso de Dios</span>
</NavLink>

<div className="section-title"></div>
<NavLink to="/orders" className="nav-item" onClick={toggleSidebar}>
<FaFileInvoice /> <span>Pedidos</span>
</NavLink>
</nav>

<button className="logout-button" onClick={(e) => {e.preventDefault(); logout(); SuccessAlert("Sesión cerrada con éxito")}}>
<FaSignOutAlt /> <span>Logout</span>
</button>
</aside>
</>
);
};

export default Sidebar;