import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(username, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="admin-auth-wrapper">
      <div className="admin-auth-card">
        <div className="admin-auth-brand">
          <div className="admin-auth-brand-logo">
            <div className="admin-brand-icon" style={{ width: 44, height: 44, fontSize: '1.25rem' }}>
              <span>PA</span>
            </div>
            <span>Perfect Art</span>
          </div>
          <p style={{ color: 'var(--admin-accent)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
            Contracting Company
          </p>
        </div>

        <h2 className="admin-auth-title">Welcome Back</h2>
        <p className="admin-auth-subtitle">Sign in to your administration dashboard</p>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--admin-radius-sm)',
              background: 'var(--admin-danger-light)',
              color: 'var(--admin-danger)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Username or Email</label>
            <input
              type="text"
              className="admin-form-control"
              placeholder="Enter username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div className="admin-password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="admin-password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--admin-text-muted)' }}>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary w-100 py-3"
            style={{ fontSize: '1rem', width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1.25rem' }}>
          <a
            href={import.meta.env.DEV ? 'http://localhost:5173/' : '/reactdemo/'}
            style={{ color: 'var(--admin-secondary)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <i className="fa-solid fa-arrow-left"></i> Return to Perfect Art Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
