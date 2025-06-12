import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';
import Login from "./pages/Login.jsx";



function App() {
return (
<Router>
<Routes>
    <Route path="/Login" element={<Login/>} />
</Routes>
</Router>
);
}

export default App;
