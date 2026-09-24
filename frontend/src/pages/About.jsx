import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header about-header">
        <div>
          <h2>About AeroVista International Airport</h2>
          <p className="subtitle">Official Airport Operations & Passenger Information Portal</p>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="about-grid">
        <div className="card about-card shadow-sm">
          <div className="about-icon-header">
            <span className="about-icon">🌐</span>
            <h3>Gateway to World Class Connectivity</h3>
          </div>
          <p>
            AeroVista International Airport (IATA: <strong>AVX</strong>, ICAO: <strong>KAVX</strong>) serves millions of domestic and international travelers annually. Operating across 3 modern passenger terminals and 2 high-capacity airfields, AeroVista is dedicated to operational efficiency, flight punctuality, and seamless passenger care.
          </p>
        </div>

        <div className="card about-card shadow-sm">
          <div className="about-icon-header">
            <span className="about-icon">🛫</span>
            <h3>Integrated Flight Status Tracking</h3>
          </div>
          <p>
            Our public flight information system offers live flight status updates for passengers, family members, and transport providers. Easily search and track today’s arriving and departing flights, terminal assignments, gate allocations, and estimated arrival/departure times.
          </p>
        </div>

        <div className="card about-card shadow-sm">
          <div className="about-icon-header">
            <span className="about-icon">🏗️</span>
            <h3>Intelligent Resource Management</h3>
          </div>
          <p>
            Behind the scenes, AeroVista utilizes an advanced Airport Resource Scheduling platform. Ground operations teams allocate gates, runways, baggage carousels, and check-in counters dynamically while preventing scheduling conflicts and turnaround bottlenecks.
          </p>
        </div>
      </div>

      {/* Key Services & Capabilities */}
      <div className="card shadow-sm mt-4 mb-4">
        <div className="card-header">
          <h3>Core Platform Capabilities</h3>
        </div>
        <div className="card-body">
          <div className="capabilities-grid">
            <div className="capability-item">
              <span className="cap-icon">✈️</span>
              <div>
                <h4>Live Flight Status</h4>
                <p>Real-time status updates across all operating commercial airlines with status indicators (On Time, Boarding, Delayed, Arrived, Departed).</p>
              </div>
            </div>

            <div className="capability-item">
              <span className="cap-icon">🛬</span>
              <div>
                <h4>Arrival & Departure Boards</h4>
                <p>Dedicated concourse and arrival level flight monitors providing clear terminal, gate, and baggage carousel designations.</p>
              </div>
            </div>

            <div className="capability-item">
              <span className="cap-icon">🚪</span>
              <div>
                <h4>Gate & Concourse Allocation</h4>
                <p>Real-time gate assignment for wide-body and narrow-body aircraft across Terminal 1, Terminal 2, and Terminal 3.</p>
              </div>
            </div>

            <div className="capability-item">
              <span className="cap-icon">🛣️</span>
              <div>
                <h4>Runway Schedule Management</h4>
                <p>Slot scheduling and takeoff/landing airfield assignments for Runway 09R/27L, 09L/27R, and 14/32.</p>
              </div>
            </div>

            <div className="capability-item">
              <span className="cap-icon">⚠️</span>
              <div>
                <h4>Conflict Detection & Prevention</h4>
                <p>Automated operational overlap detection to prevent dual resource allocation and ground delays.</p>
              </div>
            </div>

            <div className="capability-item">
              <span className="cap-icon">🔒</span>
              <div>
                <h4>Secure Admin Operations</h4>
                <p>Role-based access control for authorized airport duty officers and airfield managers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="about-cta-card">
        <h3>Need to Check a Flight Status?</h3>
        <p>Browse live arrival and departure schedules or search by flight number.</p>
        <div className="about-cta-buttons">
          <Link to="/flight-status" className="btn btn-primary">
            Check Flight Status
          </Link>
          <Link to="/admin-login" className="btn btn-outline-light">
            Airport Staff Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
