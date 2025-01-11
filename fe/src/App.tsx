import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Games from './pages/Games';
import EditAccount from './pages/EditAccount';
import Servers from './pages/Servers';
import Premium from './pages/Premium';
import { ServerProvider } from './context/ServerContext';
import { ReviewProvider } from './context/ReviewContext';
import { RegionProvider } from './context/RegionContext';
import Advertise from './pages/Advertise';
import { AdvertPaymentProvider } from './context/AdvertPaymentContext';
import MyDashboard from './pages/MyDashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<ServerProvider><RegionProvider> <Register /></RegionProvider></ServerProvider>} />
        <Route path="/login" element={<ServerProvider> <Login /></ServerProvider>} />
        <Route path='/games' element={<Games />} />
        <Route path='/edit-account' element={<EditAccount />} />
        <Route path='/servers' element={<ServerProvider> <ReviewProvider><Servers /></ReviewProvider></ServerProvider>} />
        <Route path="/premium" element={<ServerProvider><ReviewProvider><Premium /></ReviewProvider></ServerProvider>} />
        <Route path="/add-site" element={<ServerProvider><RegionProvider> <AdvertPaymentProvider><Advertise /></AdvertPaymentProvider></RegionProvider></ServerProvider>} />
        <Route path="/dashboard" element={<ServerProvider><RegionProvider> <AdvertPaymentProvider><MyDashboard /></AdvertPaymentProvider></RegionProvider></ServerProvider>} />
      </Routes>
    </Router>
  );
}

export default App
