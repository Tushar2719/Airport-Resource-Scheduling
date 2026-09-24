import React from 'react';

function FlightDetailModal({ flight, onClose }) {
  if (!flight) return null;

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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-airline-icon">✈️</span>
            <div>
              <h3>{flight.flightNumber}</h3>
              <p className="modal-subtitle">{flight.airline} • {flight.aircraft || 'Commercial Aircraft'}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Status banner */}
          <div className="modal-status-banner">
            <span className="status-label">Operational Status</span>
            <span className={getStatusBadge(flight.status)}>{flight.status}</span>
          </div>

          {/* Route Overview */}
          <div className="modal-route-card">
            <div className="route-point">
              <span className="route-label">Origin</span>
              <span className="route-city">{flight.source || flight.origin}</span>
            </div>
            <div className="route-arrow">✈ ➔</div>
            <div className="route-point right">
              <span className="route-label">Destination</span>
              <span className="route-city">{flight.destination}</span>
            </div>
          </div>

          {/* Flight Details Grid */}
          <div className="modal-grid">
            <div className="modal-detail-item">
              <span className="detail-label">Flight Type</span>
              <span className="detail-value">{flight.type || (flight.source?.includes('AeroVista') ? 'Departure' : 'Arrival')}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Terminal</span>
              <span className="detail-value highlight">{flight.terminal || 'Terminal 3'}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Assigned Gate</span>
              <span className="detail-value highlight">{flight.gate || 'Gate A01'}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Scheduled Time</span>
              <span className="detail-value">{flight.scheduledTime || flight.arrivalTime || flight.departureTime || '10:00 AM'}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Estimated Time</span>
              <span className="detail-value">{flight.estimatedTime || flight.scheduledTime || '10:00 AM'}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Runway Assignment</span>
              <span className="detail-value">{flight.runway || 'Runway 09R/27L'}</span>
            </div>
            {flight.baggageBelt && (
              <div className="modal-detail-item">
                <span className="detail-label">Baggage Belt</span>
                <span className="detail-value">{flight.baggageBelt}</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary btn-block" onClick={onClose}>
            Close Flight Information
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightDetailModal;
