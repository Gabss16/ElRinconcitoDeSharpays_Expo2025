import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile.jsx";
import Sharpays from "./pages/ShopSharpays.jsx";
import SharpaysDetailPage from "./pages/SharpaysDetailPage.jsx";
import Bougies from "./pages/ShopBougies.jsx";
import BougiesDetailPage from "./pages/BougiesDetailPage.jsx";
import FrostyBites from "./pages/ShopFrostyBites.jsx";
import FrostyBitesDetailPage from "./pages/FrostyDetailPage.jsx";
import Paraiso from "./pages/ShopParaiso.jsx";
import ParaisoDetailPage from "./pages/ParaisoDetailPage.jsx";
import NavBar from "./components/NavBar.jsx";
import ShoppingCart from "./pages/shoppingCart.jsx";
import CheckOut from "./pages/CheckOut.jsx"
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
import RecoveryPassword from "./pages/RecoveryPassword.jsx";

import Footer from "./components/Footer.jsx";

// Importa CartProvider
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/Inicio" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recoveryPassword" element={<RecoveryPassword />} />
            <Route path="/sharpays" element={<Sharpays />} />
            <Route path="/bougies" element={<Bougies />} />
            <Route path="/frostyBites" element={<FrostyBites />} />
            <Route path="/paraiso" element={<Paraiso />} />
            <Route path="/sharpays/:id" element={<SharpaysDetailPage />} />
            <Route path="/bougies/:id" element={<BougiesDetailPage />} />
            <Route path="/frostyBites/:id" element={<FrostyBitesDetailPage />} />
            <Route path="/paraiso/:id" element={<ParaisoDetailPage />} />
            <Route path="/carrito" element={<ShoppingCart />} />
            <Route path="/checkOut" element={<CheckOut />} />
            <Route path="/Inicio" element={<Home />} />
          </Routes>
          <Footer/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
