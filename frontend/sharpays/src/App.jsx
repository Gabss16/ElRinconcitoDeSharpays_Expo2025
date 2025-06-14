import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Uploadimage from "./pages/Addusers.jsx";
import RecoveryPassword from "./pages/RecoveryPassword.jsx";



function App() {
return (
<Router>

<Routes>
    <Route path="/Login" element={<Login/>} />
    <Route path="/Register" element={<Register/>} />
    <Route path="/Users" element={<Uploadimage/>} />
    <Route path="/RecoveryPassword" element={<RecoveryPassword/>} />
</Routes>
</Router>
);
}

export default App;
