import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchFlights } from '../api/client';
import FlightDetailModal from '../components/FlightDetailModal';

function FlightStatus() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const data = await fetchFlights();
      setFlights(data);
    } catch (err) {
      console.error('Failed to fetch flight status:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFlights = flights.filter((flight) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      (flight.flightNumber && flight.flightNumber.toLowerCase().includes(term)) ||
      (flight.airline && flight.airline.toLowerCase().includes(term)) ||
      (flight.source && flight.source.toLowerCase().includes(term)) ||
      (flight.destination && flight.destination.toLowerCase().includes(term)) ||
      (flight.gate && flight.gate.toLowerCase().includes(term));

    const matchesStatus = statusFilter === 'ALL' || flight.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Time':
      case 'Arrived':
      case 'Scheduled':
        return 'badge badge-success';
      case 'Boarding':
        return 'badge badge-primary';
      case 'Delayed':
        return 'badge badge-warning';
      case 'Cancelled':
        return 'badge badge-danger';
      case 'Departed':
      case 'Completed':
        return 'badge badge-info';
      default:
        return 'badge badge-secondary';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>✈️ Flight Status</h2>
          <p className="subtitle">Real-time status for all AeroVista flights</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card filter-card shadow-sm mb-4">
        <div className="filter-grid">
          <div className="filter-group flex-2">
            <label className="filter-label">Search Flights</label>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Flight number, airline, city..."
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

          <div className="filter-group">
            <label className="filter-label">Status Filter</label>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="On Time">On Time</option>
              <option value="Boarding">Boarding</option>
              <option value="Delayed">Delayed</option>
              <option value="Departed">Departed</option>
              <option value="Arrived">Arrived</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight Status Board */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table flight-board-table">
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>From / To</th>
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
                      Loading status board...
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
                      <td>
                        {flight.source} ➔ {flight.destination}
                      </td>
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
                      No matching flights found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Flight Details Modal */}
      {selectedFlight && (
        <FlightDetailModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}
    </div>
  );
}

export default FlightStatus;
