import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = Boolean(token) && userRole === 'admin';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-logo-badge">
            <span className="brand-icon">✈️</span>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">AeroVista</span>
            <span className="brand-subtitle">International Airport</span>
          </div>
        </NavLink>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`hamburger-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <div className="navbar-links">
            {isAdmin ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/flights"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Flights
                </NavLink>
                <NavLink
                  to="/resources"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Resources
                </NavLink>
                <NavLink
                  to="/schedules"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Schedules
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/flight-status"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Flight Status
                </NavLink>
                <NavLink
                  to="/arrivals"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Arrivals
                </NavLink>
                <NavLink
                  to="/departures"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  Departures
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </>
            )}
          </div>

          {/* User Action Right */}
          <div className="navbar-user">
            {isAdmin ? (
              <div className="admin-nav-actions">
                <button onClick={handleLogout} className="btn btn-sm btn-logout">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/admin/login" className="btn btn-admin-nav" onClick={closeMobileMenu}>
                🔒 Admin Login
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
