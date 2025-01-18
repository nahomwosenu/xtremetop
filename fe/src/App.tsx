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
import { SearchProvider } from './context/SearchContext';

function App() {

  return (
    <ServerProvider> {/* Wrap with ServerProvider */}
      <RegionProvider> {/* Wrap with RegionProvider */}
        <ReviewProvider> {/* Wrap with ReviewProvider */}
          <AdvertPaymentProvider> {/* Wrap with AdvertPaymentProvider */}
            <SearchProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/edit-account" element={<EditAccount />} />
                  <Route path="/servers" element={<Servers />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/add-site" element={<Advertise />} />
                  <Route path="/advertise" element={<Advertise />} />
                  <Route path="/dashboard" element={<MyDashboard />} />
                </Routes>
              </Router>
            </SearchProvider>
          </AdvertPaymentProvider>
        </ReviewProvider>
      </RegionProvider>
    </ServerProvider>
  );
}

export default App
