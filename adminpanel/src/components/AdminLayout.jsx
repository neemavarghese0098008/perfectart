import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

const PROJECT_CATEGORIES = [
  { id: 'retail', label: 'Retail Outlets', path: '/projects/retail', icon: 'fa-store' },
  { id: 'fnb', label: 'F&B', path: '/projects/fnb', icon: 'fa-utensils' },
  { id: 'corporate', label: 'Corporate Office', path: '/projects/corporate-office', icon: 'fa-building' },
  { id: 'spa', label: 'Health Club & Spa', path: '/projects/health-club-spa', icon: 'fa-spa' },
  { id: 'hospitality', label: 'Hospitality', path: '/projects/hospitality', icon: 'fa-hotel' },
  { id: 'residential', label: 'Villa & Residential', path: '/projects/villa-residential', icon: 'fa-house' }
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const publicSiteHref = import.meta.env.DEV ? 'http://localhost:5173/' : '/reactdemo/';

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(true);

  const toggleSidebar = () => {
    if (window.innerWidth <= 991) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const p = location.pathname.replace(/\/+$/, '') || '/';
    if (p === '/' || p === '/dashboard') return 'Dashboard Overview';
    if (p.includes('/projects/retail')) return 'Projects — Retail Outlets';
    if (p.includes('/projects/fnb')) return 'Projects — F&B';
    if (p.includes('/projects/corporate-office')) return 'Projects — Corporate Offices';
    if (p.includes('/projects/health-club-spa')) return 'Projects — Health Club & Spa';
    if (p.includes('/projects/hospitality')) return 'Projects — Hospitality';
    if (p.includes('/projects/villa-residential')) return 'Projects — Villa & Residential';
    if (p.includes('/vendor-registrations')) return 'Vendor Registrations';
    if (p.includes('/articles')) return 'Articles & News';
    if (p.includes('/contact') || p.includes('/inquiries')) return 'Contact Information & Inquiries';
    return 'Admin Panel';
  };

  return (
    <div
      className={`admin-app-root ${isSidebarCollapsed ? 'sidebar-collapsed' : ''} ${
        isMobileSidebarOpen ? 'sidebar-mobile-open' : ''
      }`}
    >
      {/* Mobile Drawer Overlay */}
      <div className="admin-sidebar-overlay" onClick={closeMobileSidebar} />

      {/* Sidebar Drawer */}
      <aside className="admin-sidebar">
        {/* Brand */}
        <NavLink to="/" className="admin-sidebar-brand" onClick={closeMobileSidebar}>
          <div className="admin-brand-icon">
            <span>PA</span>
          </div>
          <div className="admin-brand-text">
            Perfect Art
            <span>CMS Portal</span>
          </div>
        </NavLink>

        {/* Nav Links */}
        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-title">Core</div>

          <NavLink
            to="/"
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileSidebar}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>Dashboard</span>
          </NavLink>

          <div className="admin-nav-section-title">Portfolio Modules</div>

          {/* Projects Group with accordion */}
          <div>
            <button
              type="button"
              className="admin-nav-item"
              onClick={() => setProjectsMenuOpen(!projectsMenuOpen)}
            >
              <i className="fa-solid fa-diagram-project"></i>
              <span style={{ flex: 1 }}>Projects</span>
              <i
                className={`fa-solid fa-chevron-${projectsMenuOpen ? 'down' : 'right'}`}
                style={{ fontSize: '0.75rem', width: 'auto' }}
              ></i>
            </button>

            {projectsMenuOpen && (
              <div className="admin-nav-sub-items">
                {PROJECT_CATEGORIES.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={cat.path}
                    className={({ isActive }) => `admin-nav-sub-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileSidebar}
                  >
                    <span>
                      <i className={`fa-solid ${cat.icon} me-2`} style={{ fontSize: '0.8rem', opacity: 0.8 }}></i>
                      {cat.label}
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="admin-nav-section-title">Content & Media</div>

          <NavLink
            to="/articles"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileSidebar}
          >
            <i className="fa-solid fa-newspaper"></i>
            <span>Articles & News</span>
          </NavLink>


          <div className="admin-nav-section-title">Communication</div>

          <NavLink
            to="/contact"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileSidebar}
          >
            <i className="fa-solid fa-address-book"></i>
            <span>Contact & Inquiries</span>
          </NavLink>
          <NavLink to="/vendor-registrations" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobileSidebar}>
            <i className="fa-solid fa-truck-field"></i><span>Vendor Registrations</span>
          </NavLink>
        </nav>

        {/* Footer with Logout */}
        <div className="admin-sidebar-footer">
          <button type="button" className="admin-logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <button
            type="button"
            className="admin-hamburger-btn"
            onClick={toggleSidebar}
            aria-label="Toggle navigation drawer"
            title="Toggle Sidebar"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <h1 className="admin-page-title">{getPageTitle()}</h1>
        </div>

        <div className="admin-header-right">
          <a
            href={publicSiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-view-site-btn"
            title="Open Live Public Site in new tab"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Website</span>
          </a>

          <div className="admin-profile-pill">
            <div className="admin-avatar-circle">
              {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-profile-meta d-none d-sm-flex">
              <span className="admin-profile-name">{admin?.name || 'Administrator'}</span>
              <span className="admin-profile-role">{admin?.role || 'Super Admin'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="admin-main-content">
        <div className="admin-view-container">
          <Outlet />
        </div>

        <footer className="admin-footer">
          &copy; {new Date().getFullYear()} Perfect Art Contracting Company — Admin CMS Portal. Visual design reference inspired by BKS Mumbai.
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
