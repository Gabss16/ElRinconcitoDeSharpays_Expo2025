import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";
import Uploadimage from "./pages/Addusers.jsx"



function App() {
return (
<Router>
<Routes>
    <Route path="/Login" element={<Login/>} />
     <Route path="/Users" element={<Uploadimage/>} />
</Routes>
</Router>
);
}

export default App;
