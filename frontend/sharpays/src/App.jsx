import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Sidebar from './components/Sidebar';




function App() {
return (
<Router>
<div className="app-layout" style={{ display: 'flex' }}>
<Sidebar />
<div className="content" style={{ flex: 1, padding: '1rem' }}>
<Routes>


</Routes>
</div>
</div>
</Router>
);
}

export default App;
