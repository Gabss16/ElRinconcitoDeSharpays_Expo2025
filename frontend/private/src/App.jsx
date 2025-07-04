import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Employee from "./pages/Employee.jsx";
import RecoveryPassword from "./pages/RecoveryPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Orders from "./pages/Orders.jsx"
import Sharpays from "./pages/SharpaysBoutique.jsx"
import Dashboard from "./pages/Dashboard.jsx";
import Category from "./pages/Category.jsx"
import SideBar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";

import { AuthProvider } from "./context/AuthContext";



function App() {

function SideBarSelector() {
    const { pathname } = useLocation();
    const noNavbarPaths = ["/Login", "/Register", "/RecoveryPassword"];
    
    if (noNavbarPaths.includes(pathname)) return null;
    return <SideBar/>;
}

function FooterSelector() {
    const { pathname } = useLocation();
    const footerPaths = ["/Login", "/Register", "/RecoveryPassword"];
    
    if (footerPaths.includes(pathname)) return <Footer/>;
    return null;
}

return (
<Router>
    <AuthProvider>
    <SideBarSelector/>
<Routes>
    <Route path="/" element={<Navigate to="/Login" replace />} />
    <Route path="/Login" element={<Login/>} />
    <Route path="/Dashboard" element={<Dashboard/>} />
    <Route path="/Register" element={<Register/>} />
    <Route path="/Employee" element={<Employee/>} />
    <Route path="/RecoveryPassword" element={<RecoveryPassword/>} />
    <Route path="/ResetPassword" element={<ResetPassword/>} />
    <Route path="/Orders" element={<Orders/>} />
    <Route path="/Sharpays" element={<Sharpays/>} />
     <Route path="/Category" element={<Category/>} />
</Routes>
    <FooterSelector/>
    </AuthProvider>
</Router>
);
}

export default App;
