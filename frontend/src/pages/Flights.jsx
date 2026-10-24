import { useState, useEffect } from "react";
import {
  fetchFlights,
  createFlight,
  updateFlight,
  deleteFlight,
} from "../api/client";

function Flights() {
  const [flights, setFlights] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const initialFormState = {
    flightNumber: "",
    airline: "",
    // Added aircraftType field
    aircraftType: "",
    type: "Arrival",
    source: "",
    destination: "",
    scheduledTime: "",
    estimatedTime: "",
    terminal: "Terminal 1",
    gate: "Gate A01",
    status: "Scheduled",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      setLoading(true);
      const data = await fetchFlights();
      setFlights(data);
    } catch (err) {
      setError(err.message || "Failed to load flights.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.flightNumber ||
      !formData.airline ||
      !formData.source ||
      !formData.destination
    ) {
      setError("Flight Number, Airline, Origin, and Destination are required.");
      return;
    }

    try {
      if (editingId) {
        // Update
        const res = await updateFlight(editingId, formData);
        setMessage(res.message || "Flight updated successfully");
        setEditingId(null);
      } else {
        // Create
        const res = await createFlight(formData);
        setMessage(res.message || "Flight created successfully");
      }

      setFormData(initialFormState);
      loadFlights();
    } catch (err) {
      setError(err.message || "Failed to save flight.");
    }
  };

  const handleEdit = (flight) => {
    setEditingId(flight._id || flight.id);

    setFormData({
      flightNumber: flight.flightNumber || "",
      airline: flight.airline || "",
      //Load aircraftType while editing
      aircraftType: flight.aircraftType || "",
      type: flight.type || "Arrival",
      source: flight.source || "",
      destination: flight.destination || "",
      scheduledTime: flight.scheduledTime || "",
      estimatedTime: flight.estimatedTime || "",
      terminal: flight.terminal || "Terminal 1",
      gate: flight.gate || "Gate A01",
      status: flight.status || "Scheduled",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setError("");
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight record?")) {
      try {
        const res = await deleteFlight(id);

        setMessage(res.message || "Flight deleted successfully");

        loadFlights();
      } catch (err) {
        setError(err.message || "Failed to delete flight.");
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "On Time":
      case "Arrived":
      case "Scheduled":
        return "badge badge-success";

      case "Boarding":
        return "badge badge-primary";

      case "Delayed":
        return "badge badge-warning";

      case "Cancelled":
        return "badge badge-danger";

      case "Departed":
      case "Completed":
        return "badge badge-info";

      default:
        return "badge badge-secondary";
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>✈️ Flight Management</h2>

          <p className="subtitle">
            Add, Edit, and Delete flights in AeroVista database
          </p>
        </div>
      </div>

      {message && <div className="alert alert-success mb-3">{message}</div>}

      {error && <div className="alert alert-error mb-3">{error}</div>}

      {/* Form Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3>{editingId ? "✏️ Edit Flight" : "➕ Add Flight"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Flight Number *</label>

              <input
                type="text"
                name="flightNumber"
                placeholder="e.g. AI101"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Airline *</label>

              <input
                type="text"
                name="airline"
                placeholder="e.g. Air India"
                value={formData.airline}
                onChange={handleChange}
                required
              />
            </div>

            {/*Added Aircraft Type input*/}
            <div className="form-group">
              <label>Aircraft Type</label>

              <input
                type="text"
                name="aircraftType"
                placeholder="e.g. Airbus A320"
                value={formData.aircraftType}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Arrival / Departure</label>

              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Arrival">Arrival</option>
                <option value="Departure">Departure</option>
              </select>
            </div>

            <div className="form-group">
              <label>Origin *</label>

              <input
                type="text"
                name="source"
                placeholder="e.g. New Delhi (DEL)"
                value={formData.source}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Destination *</label>

              <input
                type="text"
                name="destination"
                placeholder="e.g. AeroVista (AVX)"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Scheduled Time *</label>

              <input
                type="text"
                name="scheduledTime"
                placeholder="e.g. 10:30 AM"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Terminal</label>

              <select
                name="terminal"
                value={formData.terminal}
                onChange={handleChange}
              >
                <option value="Terminal 1">Terminal 1</option>
                <option value="Terminal 2">Terminal 2</option>
                <option value="Terminal 3">Terminal 3</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gate</label>

              <input
                type="text"
                name="gate"
                placeholder="e.g. Gate A01"
                value={formData.gate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="On Time">On Time</option>
                <option value="Boarding">Boarding</option>
                <option value="Delayed">Delayed</option>
                <option value="Departed">Departed</option>
                <option value="Arrived">Arrived</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions col-span-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update Flight" : "Add Flight"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Flight Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h3>Flights List ({flights.length})</h3>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Airline</th>
                  {/*Added Aircraft Type column*/}
                  <th>Aircraft Type</th>
                  <th>Type</th>
                  <th>Origin ➔ Destination</th>
                  <th>Time</th>
                  <th>Terminal</th>
                  <th>Gate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      Loading flights...
                    </td>
                  </tr>
                ) : flights.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No flights in database.
                    </td>
                  </tr>
                ) : (
                  flights.map((flight) => (
                    <tr key={flight._id || flight.id}>
                      <td>
                        <strong>{flight.flightNumber}</strong>
                      </td>

                      <td>{flight.airline}</td>

                      {/* ===== CHANGE: Display aircraftType ===== */}
                      <td>{flight.aircraftType || "-"}</td>
                      {/* ===== END CHANGE ===== */}

                      <td>
                        <span className="type-pill">{flight.type}</span>
                      </td>

                      <td>
                        {flight.source} ➔ {flight.destination}
                      </td>

                      <td>{flight.scheduledTime}</td>

                      <td>{flight.terminal}</td>

                      <td>{flight.gate}</td>

                      <td>
                        <span className={getStatusBadge(flight.status)}>
                          {flight.status}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(flight)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(flight._id || flight.id)
                            }
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flights;
