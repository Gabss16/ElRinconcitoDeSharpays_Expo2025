import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Uploadimage from "./pages/Addusers.jsx"



function App() {
return (
<Router>
<Sidebar/>
<Routes>
    <Route path="/Login" element={<Login/>} />
    <Route path="/Register" element={<Register/>} />
     <Route path="/Users" element={<Uploadimage/>} />
</Routes>
</Router>
);
}

export default App;
