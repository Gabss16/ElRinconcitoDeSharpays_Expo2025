import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz a /profile */}
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
