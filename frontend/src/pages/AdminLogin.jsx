import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/client';

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await loginAdmin(formData.email, formData.password);

      localStorage.setItem('token', res.token);
      localStorage.setItem('userRole', res.user.role);
      localStorage.setItem('userEmail', res.user.email);

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card shadow-lg">
        <div className="auth-header">
          <div className="auth-badge-icon">🛡️</div>
          <h2>Admin Login</h2>
          <p className="auth-subtitle">AeroVista Airport Operations Portal</p>
        </div>

        {errorMsg && <div className="alert alert-error mb-3">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              name="email"
              placeholder="e.g. admin@aerovista.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg mt-3"
            disabled={submitting}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer mt-4">
          <p>
            <Link to="/" className="back-link">
              ← Return to AeroVista Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
