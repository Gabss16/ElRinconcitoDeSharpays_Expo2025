import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Employee from "./pages/Employee.jsx";
import RecoveryPassword from "./pages/RecoveryPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Orders from "./pages/Orders.jsx"
import Sharpays from "./pages/SharpaysBoutique.jsx"

import { AuthProvider } from "./context/AuthContext";



function App() {
return (
<Router>
    <AuthProvider>
<Routes>
    <Route path="/Login" element={<Login/>} />
    <Route path="/Register" element={<Register/>} />
    <Route path="/Employee" element={<Employee/>} />
    <Route path="/RecoveryPassword" element={<RecoveryPassword/>} />
    <Route path="/ResetPassword" element={<ResetPassword/>} />
    <Route path="/Orders" element={<Orders/>} />
    <Route path="/Sharpays" element={<Sharpays/>} />
</Routes>
    </AuthProvider>
</Router>
);
}

export default App;
