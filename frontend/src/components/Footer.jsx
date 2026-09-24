import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-logo-icon">✈️</span>
              <span className="footer-brand-name">AeroVista International Airport</span>
            </div>
            <p className="footer-slogan">
              Connecting people, places and possibilities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/flight-status">Flight Status</Link></li>
              <li><Link to="/arrivals">Arrivals</Link></li>
              <li><Link to="/departures">Departures</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          {/* Operations Portal */}
          <div className="footer-col">
            <h4>Airport Operations</h4>
            <p className="footer-text">
              Authorized staff and resource scheduling management.
            </p>
            <Link to="/admin/login" className="btn btn-outline-light btn-sm mt-2">
              🔒 Admin Login
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 AeroVista International Airport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
