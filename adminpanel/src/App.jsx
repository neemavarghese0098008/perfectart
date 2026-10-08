import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectsCategoryPage from './pages/ProjectsCategoryPage';
import VendorRegistrationsPage from './pages/VendorRegistrationsPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';

const AdminApp = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/retail" element={<ProjectsCategoryPage explicitCategory="retail" />} />
        <Route path="/projects/fnb" element={<ProjectsCategoryPage explicitCategory="fnb" />} />
        <Route path="/projects/corporate-office" element={<ProjectsCategoryPage explicitCategory="corporate-office" />} />
        <Route path="/projects/health-club-spa" element={<ProjectsCategoryPage explicitCategory="health-club-spa" />} />
        <Route path="/projects/hospitality" element={<ProjectsCategoryPage explicitCategory="hospitality" />} />
        <Route path="/projects/villa-residential" element={<ProjectsCategoryPage explicitCategory="villa-residential" />} />
        <Route path="/projects/:categorySlug" element={<ProjectsCategoryPage />} />
        <Route path="/vendor-registrations" element={<VendorRegistrationsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/inquiries" element={<ContactPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default AdminApp;
