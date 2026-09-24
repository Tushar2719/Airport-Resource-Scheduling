import { useState, useEffect } from 'react';
import { fetchResources, createResource, updateResource, deleteResource } from '../api/client';

function Resources() {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const initialFormState = {
    name: '',
    type: 'Gate',
    status: 'Available',
    location: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await fetchResources();
      setResources(data);
    } catch (err) {
      setError(err.message || 'Failed to load resources.');
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
    setMessage('');
    setError('');

    if (!formData.name) {
      setError('Resource Name is required.');
      return;
    }

    try {
      if (editingId) {
        const res = await updateResource(editingId, formData);
        setMessage(res.message || 'Resource updated successfully');
        setEditingId(null);
      } else {
        const res = await createResource(formData);
        setMessage(res.message || 'Resource created successfully');
      }
      setFormData(initialFormState);
      loadResources();
    } catch (err) {
      setError(err.message || 'Failed to save resource.');
    }
  };

  const handleEdit = (res) => {
    setEditingId(res._id || res.id);
    setFormData({
      name: res.name || '',
      type: res.type || 'Gate',
      status: res.status || 'Available',
      location: res.location || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setError('');
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        const res = await deleteResource(id);
        setMessage(res.message || 'Resource deleted successfully');
        loadResources();
      } catch (err) {
        setError(err.message || 'Failed to delete resource.');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return 'badge badge-success';
      case 'Occupied':
        return 'badge badge-warning';
      case 'Maintenance':
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>📦 Resource Management</h2>
          <p className="subtitle">Manage Gates, Runways, and Airport Ground Resources</p>
        </div>
      </div>

      {message && <div className="alert alert-success mb-3">{message}</div>}
      {error && <div className="alert alert-error mb-3">{error}</div>}

      {/* Form Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3>{editingId ? '✏️ Edit Resource' : '➕ Add Resource'}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Resource Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Gate A01 or Runway 09/27"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Resource Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Gate">Gate</option>
                <option value="Runway">Runway</option>
                <option value="Baggage Belt">Baggage Belt</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location / Notes</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Terminal 3 - Concourse A"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions col-span-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Resource' : 'Add Resource'}
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

      {/* Resource Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h3>Resources List ({resources.length})</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Resource Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading resources...
                    </td>
                  </tr>
                ) : resources.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No resources found in database.
                    </td>
                  </tr>
                ) : (
                  resources.map((res) => (
                    <tr key={res._id || res.id}>
                      <td>
                        <strong>{res.name}</strong>
                      </td>
                      <td>
                        <span className="type-pill">{res.type}</span>
                      </td>
                      <td>
                        <span className={getStatusBadge(res.status)}>{res.status}</span>
                      </td>
                      <td>{res.location || '-'}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(res)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(res._id || res.id)}
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

export default Resources;
