import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFlights, fetchFlightStats } from "../api/client";

function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFlights: 0,
    activeFlights: 0,
    addedToday: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    loadDashboardData();
    loadFlightStats();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const flightsData = await fetchFlights();
      setFlights(flightsData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadFlightStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError("");

      const data = await fetchFlightStats();
      setStats(data);
    } catch (err) {
      setStatsError(err.message);
    } finally {
      setStatsLoading(false);
    }
  };

  const totalFlights = flights.length;
  const arrivals = flights.filter(
    (f) =>
      f.type === "Arrival" ||
      (f.destination && f.destination.includes("AeroVista")),
  ).length;
  const departures = flights.filter(
    (f) =>
      f.type === "Departure" || (f.source && f.source.includes("AeroVista")),
  ).length;
  const delayedFlights = flights.filter((f) => f.status === "Delayed").length;

  return (
    <div className="page-container">
      {/* Dashboard Banner */}
      <div className="welcome-banner admin-banner shadow-sm mb-4">
        <div className="banner-content">
          <h2>Admin Dashboard</h2>
          <p>Welcome to AeroVista Operations & Resource Scheduling Center.</p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="stats-grid mb-4">
        <div className="stat-card shadow-sm">
          <div className="stat-info">
            <span className="stat-label">Total Flights</span>
            <h3 className="stat-number">{loading ? "..." : totalFlights}</h3>
          </div>
          <Link to="/flights" className="stat-link mt-2">
            Manage Flights &rarr;
          </Link>
        </div>

        <div className="stat-card shadow-sm">
          <div className="stat-info">
            <span className="stat-label">Arrivals</span>
            <h3 className="stat-number">{loading ? "..." : arrivals}</h3>
          </div>
          <Link to="/arrivals" className="stat-link mt-2">
            View Arrivals &rarr;
          </Link>
        </div>

        <div className="stat-card shadow-sm">
          <div className="stat-info">
            <span className="stat-label">Departures</span>
            <h3 className="stat-number">{loading ? "..." : departures}</h3>
          </div>
          <Link to="/departures" className="stat-link mt-2">
            View Departures &rarr;
          </Link>
        </div>

        <div className="stat-card shadow-sm">
          <div className="stat-info">
            <span className="stat-label">Delayed Flights</span>
            <h3 className="stat-number text-warning">
              {loading ? "..." : delayedFlights}
            </h3>
          </div>
          <Link to="/flights" className="stat-link mt-2">
            Update Status &rarr;
          </Link>
        </div>
      </div>

      {/* Quick Navigation Panels */}
      {/* Flight Statistics*/}
      <h3 className="mb-3">Flight Statistics</h3>

      {statsLoading && <p>Loading statistics...</p>}

      {statsError && <p className="text-danger">Error: {statsError}</p>}

      {!statsLoading && !statsError && (
        <div className="stats-grid mb-4">
          <div className="stat-card shadow-sm">
            <div className="stat-info">
              <span className="stat-label">Total Flights</span>
              <h3 className="stat-number">{stats.totalFlights}</h3>
            </div>
          </div>

          <div className="stat-card shadow-sm">
            <div className="stat-info">
              <span className="stat-label">Active Flights</span>
              <h3 className="stat-number">{stats.activeFlights}</h3>
            </div>
          </div>

          <div className="stat-card shadow-sm">
            <div className="stat-info">
              <span className="stat-label">Flights Added Today</span>
              <h3 className="stat-number">{stats.addedToday}</h3>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-grid">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3>Quick Admin Operations</h3>
          </div>
          <div className="card-body">
            <div className="ops-management-list">
              <div className="ops-item">
                <div className="ops-text">
                  <strong>Flight Management</strong>
                  <p>
                    Add, edit, delete flights, and change live operational
                    status.
                  </p>
                </div>
                <Link to="/flights" className="btn btn-primary btn-sm">
                  Go to Flights
                </Link>
              </div>

              <div className="ops-item">
                <div className="ops-text">
                  <strong>Resource Management</strong>
                  <p>
                    Manage gates and runways (Available, Occupied, Maintenance).
                  </p>
                </div>
                <Link
                  to="/resources"
                  className="btn btn-outline-primary btn-sm"
                >
                  Go to Resources
                </Link>
              </div>

              <div className="ops-item">
                <div className="ops-text">
                  <strong>Resource Scheduling</strong>
                  <p>
                    Schedule resources to flights with automated conflict
                    checking.
                  </p>
                </div>
                <Link
                  to="/schedules"
                  className="btn btn-outline-primary btn-sm"
                >
                  Go to Schedules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
