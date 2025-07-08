import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Profile from "./pages/Profile.jsx";
import Sharpays from "./pages/ShopSharpays.jsx";
import SharpaysDetailPage from "./pages/SharpaysDetailPage.jsx";
import Bougies from "./pages/ShopBougies.jsx";
import FrostyBites from "./pages/ShopFrostyBites.jsx";
import Paraiso from "./pages/ShopParaiso.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz a /profile */}
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sharpays" element={<Sharpays />} />
        <Route path="/bougies" element={<Bougies />} />
        <Route path="/frostyBites" element={<FrostyBites />} />
        <Route path="/paraiso" element={<Paraiso />} />
        <Route path="/sharpays/:id" element={<SharpaysDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
