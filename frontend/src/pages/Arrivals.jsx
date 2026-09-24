import { useState, useEffect } from 'react';
import { fetchFlights } from '../api/client';
import FlightDetailModal from '../components/FlightDetailModal';

function Arrivals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArrivals();
  }, []);

  const loadArrivals = async () => {
    try {
      setLoading(true);
      const data = await fetchFlights();
      const arrivalFlights = data.filter(
        (f) => f.type === 'Arrival' || (f.destination && f.destination.includes('AeroVista'))
      );
      setFlights(arrivalFlights);
    } catch (err) {
      console.error('Failed to load arrivals:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFlights = flights.filter((flight) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (flight.flightNumber && flight.flightNumber.toLowerCase().includes(term)) ||
      (flight.airline && flight.airline.toLowerCase().includes(term)) ||
      (flight.source && flight.source.toLowerCase().includes(term))
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Time':
      case 'Arrived':
        return 'badge badge-success';
      case 'Delayed':
        return 'badge badge-warning';
      case 'Cancelled':
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>🛬 Arrivals</h2>
          <p className="subtitle">Real-time arriving flights board</p>
        </div>
      </div>

      {/* Filter Box */}
      <div className="card filter-card shadow-sm mb-4">
        <div className="filter-grid">
          <div className="filter-group flex-2">
            <label className="filter-label">Search Arriving Flights</label>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search flight #, airline, origin city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="btn-clear" onClick={() => setSearchTerm('')}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table flight-board-table">
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>Origin</th>
                  <th>Time</th>
                  <th>Terminal</th>
                  <th>Gate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading arrivals board...
                    </td>
                  </tr>
                ) : filteredFlights.length > 0 ? (
                  filteredFlights.map((flight) => (
                    <tr
                      key={flight._id || flight.id}
                      className="flight-row"
                      onClick={() => setSelectedFlight(flight)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <strong className="flight-code">{flight.flightNumber}</strong>
                      </td>
                      <td>{flight.airline}</td>
                      <td>{flight.source}</td>
                      <td>{flight.scheduledTime}</td>
                      <td>
                        <span className="terminal-badge">{flight.terminal || 'T1'}</span>
                      </td>
                      <td>
                        <span className="gate-tag">{flight.gate || 'TBD'}</span>
                      </td>
                      <td>
                        <span className={getStatusBadge(flight.status)}>{flight.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No arriving flights found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedFlight && (
        <FlightDetailModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}
    </div>
  );
}

export default Arrivals;
