import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../utils/apiConfig';

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = API_BASE_URL;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--admin-primary)' }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
        <p style={{ fontWeight: 600 }}>Loading dashboard analytics...</p>
      </div>
    );
  }

  const counts = stats?.counts || {
    totalProjects: 14,
    retail: 7,
    fnb: 2,
    corporate: 2,
    spa: 3,
    hospitality: 1,
    residential: 1,
    totalArticles: 2,
    totalInquiries: 0,
    totalQuotes: 0
  };

  return (
    <div className="admin-dashboard-page">
      {/* Welcome Banner */}
      <div
        className="admin-card-box mb-4"
        style={{
          background: 'linear-gradient(135deg, #0d2d5c 0%, #173d75 100%)',
          color: '#ffffff',
          border: 'none',
          padding: '2rem'
        }}
      >
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span style={{ color: 'var(--admin-accent)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Management Overview
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.35rem 0 0.5rem', color: '#ffffff' }}>
              Perfect Art Contracting CMS
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0, maxWidth: '650px', fontSize: '0.95rem' }}>
              Manage projects, portfolio categories, and published articles.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <div className="d-flex gap-2 justify-content-lg-end flex-wrap">
              <Link to="/projects/retail" className="admin-btn admin-btn-primary" style={{ background: 'var(--admin-accent)', color: '#0d1721', border: 'none' }}>
                <i className="fa-solid fa-plus"></i> Manage Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning mb-4" role="alert">
          <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
        </div>
      )}

      {/* Primary Metrics Grid */}
      <h3 className="admin-card-title-text mb-3" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--admin-text-muted)' }}>
        Overall Metrics
      </h3>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon blue">
            <i className="fa-solid fa-diagram-project"></i>
          </div>
          <div className="admin-stat-meta">
            <span className="admin-stat-value">{counts.totalProjects}</span>
            <span className="admin-stat-label">Total Projects</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <i className="fa-solid fa-newspaper"></i>
          </div>
          <div className="admin-stat-meta">
            <span className="admin-stat-value">{counts.totalArticles}</span>
            <span className="admin-stat-label">Articles & News</span>
          </div>
        </div>
      </div>

      {/* Project Categories Breakdown Cards */}
      <h3 className="admin-card-title-text mb-3" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--admin-text-muted)' }}>
        Category Project Counts
      </h3>
      <div className="admin-stats-grid">
        <Link to="/projects/retail" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon blue">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.retail}</span>
              <span className="admin-stat-label">Retail Outlets</span>
            </div>
          </div>
        </Link>

        <Link to="/projects/fnb" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon gold">
              <i className="fa-solid fa-utensils"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.fnb}</span>
              <span className="admin-stat-label">F&B Outlets</span>
            </div>
          </div>
        </Link>

        <Link to="/projects/corporate-office" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon blue">
              <i className="fa-solid fa-building"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.corporate}</span>
              <span className="admin-stat-label">Corporate Offices</span>
            </div>
          </div>
        </Link>

        <Link to="/projects/health-club-spa" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon green">
              <i className="fa-solid fa-spa"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.spa}</span>
              <span className="admin-stat-label">Health Club & Spa</span>
            </div>
          </div>
        </Link>

        <Link to="/projects/hospitality" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon amber">
              <i className="fa-solid fa-hotel"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.hospitality}</span>
              <span className="admin-stat-label">Hospitality</span>
            </div>
          </div>
        </Link>

        <Link to="/projects/villa-residential" style={{ textDecoration: 'none' }}>
          <div className="admin-stat-card">
            <div className="admin-stat-icon gold">
              <i className="fa-solid fa-house"></i>
            </div>
            <div className="admin-stat-meta">
              <span className="admin-stat-value">{counts.residential}</span>
              <span className="admin-stat-label">Villa & Residential</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Two Column Section: Recent Projects & Quick Navigation */}
      <div className="row g-4 mt-1">
        <div className="col-lg-7">
          <div className="admin-card-box h-100">
            <div className="admin-card-header-flex">
              <h3 className="admin-card-title-text">Recent Projects</h3>
              <Link to="/projects/retail" className="admin-btn admin-btn-outline py-1 px-3" style={{ fontSize: '0.8rem' }}>
                View All
              </Link>
            </div>

            {stats?.recentProjects && stats.recentProjects.length > 0 ? (
              <div className="table-responsive">
                <table className="admin-custom-table" style={{ minWidth: '100%' }}>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Category</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentProjects.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.title}</td>
                        <td>
                          <span className="admin-badge admin-badge-primary">
                            {p.category_label || p.category}
                          </span>
                        </td>
                        <td style={{ color: 'var(--admin-text-muted)' }}>{p.place}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--admin-text-muted)' }}>No projects found.</p>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="admin-card-box h-100">
            <div className="admin-card-header-flex">
              <h3 className="admin-card-title-text">Quick CMS Actions</h3>
            </div>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/contact"
                className="p-3 rounded border text-decoration-none d-flex align-items-center justify-content-between"
                style={{ background: '#f8fafc', color: 'var(--admin-text-dark)', borderColor: 'var(--admin-border)' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-stat-icon blue" style={{ width: 40, height: 40, fontSize: '1rem' }}>
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Contact Info & Leads</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>Update phones, email, map, and view quote proposals</div>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-right" style={{ color: 'var(--admin-secondary)' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



