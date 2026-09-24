import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import FlightStatus from './pages/FlightStatus';
import Arrivals from './pages/Arrivals';
import Departures from './pages/Departures';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Resources from './pages/Resources';
import Schedules from './pages/Schedules';

// Public Layout wrapper featuring top Navbar and bottom Footer
function PublicLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/arrivals" element={<Arrivals />} />
          <Route path="/departures" element={<Departures />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/flights" element={<Flights />} />
            <Route path="/admin/flights" element={<Flights />} />

            <Route path="/resources" element={<Resources />} />
            <Route path="/admin/resources" element={<Resources />} />

            <Route path="/schedules" element={<Schedules />} />
            <Route path="/admin/schedules" element={<Schedules />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
