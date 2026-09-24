import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">🛫 Airport Operations System</div>
          <h1 className="hero-title">Airport Resource Scheduling</h1>
          <p className="hero-subtitle">
            View flight schedules and airport resource information in real-time.
          </p>

          {/* Action Buttons */}
          <div className="hero-cta">
            <Link to="/flight-status" className="btn btn-primary btn-hero">
              View Flight Status
            </Link>
            <Link to="/schedules" className="btn btn-outline btn-hero">
              View Schedules
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Information Section */}
      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">🛫</div>
          <h3>View Flight Information</h3>
          <p>Browse real-time flight details, departure and arrival times, airlines, and destinations.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⏱️</div>
          <h3>Check Flight Status</h3>
          <p>Track current operational status including scheduled, delayed, boarding, and completed flights.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>View Airport Schedules</h3>
          <p>Access scheduled allocations for airport gates, runways, check-in counters, and baggage belts.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏗️</div>
          <h3>Resource Management</h3>
          <p>Prevent scheduling bottlenecks and maintain smooth ground operations across all terminals.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Airport Resource Scheduling &bull; College Practical Project</p>
      </footer>
    </div>
  );
}

export default Welcome;
