import { useState, useEffect } from 'react';
import {
  fetchFlights,
  fetchResources,
  fetchSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../api/client';

function Schedules() {
  const [flights, setFlights] = useState([]);
  const [resources, setResources] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const initialForm = {
    flightNumber: '',
    airline: '',
    resource: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [flightsData, resourcesData, schedulesData] = await Promise.all([
        fetchFlights(),
        fetchResources(),
        fetchSchedules(),
      ]);
      setFlights(flightsData);
      setResources(resourcesData);
      setSchedules(schedulesData);
    } catch (err) {
      setError(err.message || 'Failed to load scheduling data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    // Auto populate airline if flight selected
    if (name === 'flightNumber') {
      const selectedFl = flights.find((f) => f.flightNumber === value);
      if (selectedFl) {
        updatedForm.airline = selectedFl.airline;
      }
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.flightNumber || !formData.resource || !formData.startTime || !formData.endTime) {
      setError('Flight, Resource, Start Time, and End Time are required.');
      return;
    }

    try {
      if (editingId) {
        const res = await updateSchedule(editingId, formData);
        setMessage(res.message || 'Schedule updated successfully.');
        setEditingId(null);
      } else {
        const res = await createSchedule(formData);
        setMessage(res.message || 'Schedule created successfully.');
      }
      setFormData(initialForm);
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to save schedule.');
    }
  };

  const handleEdit = (sch) => {
    setEditingId(sch._id || sch.id);
    const formattedStart = sch.startTime ? new Date(sch.startTime).toISOString().slice(0, 16) : '';
    const formattedEnd = sch.endTime ? new Date(sch.endTime).toISOString().slice(0, 16) : '';

    setFormData({
      flightNumber: sch.flightNumber || '',
      airline: sch.airline || '',
      resource: sch.resource || '',
      startTime: formattedStart,
      endTime: formattedEnd,
      status: sch.status || 'Scheduled',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError('');
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        const res = await deleteSchedule(id);
        setMessage(res.message || 'Schedule deleted successfully.');
        loadData();
      } catch (err) {
        setError(err.message || 'Failed to delete schedule.');
      }
    }
  };

  const formatDateTime = (dt) => {
    if (!dt) return '-';
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleString();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>📅 Resource Scheduling</h2>
          <p className="subtitle">Assign Airport Resources (Gates, Runways) to Flights</p>
        </div>
      </div>

      {message && <div className="alert alert-success mb-3">{message}</div>}
      {error && <div className="alert alert-error mb-3">{error}</div>}

      {/* Schedule Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3>{editingId ? '✏️ Edit Schedule Allocation' : '➕ Create New Schedule'}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="flightNumber">Select Flight *</label>
              <select
                id="flightNumber"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Flight --</option>
                {flights.map((f) => (
                  <option key={f._id || f.id} value={f.flightNumber}>
                    {f.flightNumber} ({f.airline} - {f.source} ➔ {f.destination})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="resource">Select Resource *</label>
              <select
                id="resource"
                name="resource"
                value={formData.resource}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Resource --</option>
                {resources.map((r) => (
                  <option key={r._id || r.id} value={r.name}>
                    {r.name} ({r.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time *</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions col-span-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Schedule' : 'Save Schedule'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Schedules Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h3>Current Schedules ({schedules.length})</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>Resource</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading schedules...
                    </td>
                  </tr>
                ) : schedules.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No schedules found in database.
                    </td>
                  </tr>
                ) : (
                  schedules.map((sch) => (
                    <tr key={sch._id || sch.id}>
                      <td>
                        <strong>{sch.flightNumber}</strong>
                      </td>
                      <td>{sch.airline || '-'}</td>
                      <td>
                        <span className="gate-tag">{sch.resource}</span>
                      </td>
                      <td>{formatDateTime(sch.startTime)}</td>
                      <td>{formatDateTime(sch.endTime)}</td>
                      <td>
                        <span
                          className={`badge ${
                            sch.status === 'Active'
                              ? 'badge-success'
                              : sch.status === 'Cancelled'
                              ? 'badge-danger'
                              : 'badge-primary'
                          }`}
                        >
                          {sch.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(sch)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(sch._id || sch.id)}
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

export default Schedules;
