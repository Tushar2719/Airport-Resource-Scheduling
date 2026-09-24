import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFlights } from '../api/client';
import FlightDetailModal from '../components/FlightDetailModal';

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
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
      console.error('Failed to load flights:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayFlights = flights.filter((flight) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (flight.flightNumber && flight.flightNumber.toLowerCase().includes(term)) ||
      (flight.airline && flight.airline.toLowerCase().includes(term)) ||
      (flight.source && flight.source.toLowerCase().includes(term)) ||
      (flight.destination && flight.destination.toLowerCase().includes(term)) ||
      (flight.gate && flight.gate.toLowerCase().includes(term))
    );
  });

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/flight-status?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content-wrapper">
          <h1 className="hero-title">Welcome to AeroVista International Airport</h1>
          <p className="hero-subtitle">Your gateway to seamless journeys.</p>

          {/* Search Flight */}
          <div className="hero-search-card">
            <h3 className="hero-search-heading">Check Flight Status</h3>
            <form onSubmit={handleHeroSearch} className="hero-search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Enter flight number (e.g., EK201, AI101)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-input-btn"
                    onClick={() => setSearchTerm('')}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button type="submit" className="btn btn-search">
                Search Flight
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Today's Flight Information Section */}
      <section className="flights-section page-container">
        <div className="section-header-flex mb-3">
          <h2 className="section-title">Today's Flight Information</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table flight-board-table">
                <thead>
                  <tr>
                    <th>Flight</th>
                    <th>Airline</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Time</th>
                    <th>Gate</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Loading flight status data...
                      </td>
                    </tr>
                  ) : displayFlights.length > 0 ? (
                    displayFlights.slice(0, 8).map((flight) => (
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
                        <td>{flight.destination}</td>
                        <td>{flight.scheduledTime}</td>
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
                        No flights found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Detail Modal */}
      {selectedFlight && (
        <FlightDetailModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}
    </div>
  );
}

export default Home;
