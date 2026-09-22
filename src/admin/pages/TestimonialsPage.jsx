import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const TestimonialsPage = () => {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    message: '',
    is_active: 1
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (err) {
      setFeedback({ message: 'Error loading testimonials: ' + err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleOpenAdd = () => {
    setSelectedTestimonial(null);
    setFormData({ name: '', role: '', message: '', is_active: 1 });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedTestimonial(item);
    setFormData({
      name: item.name,
      role: item.role,
      message: item.message,
      is_active: item.is_active
    });
    setIsFormOpen(true);
  };

  const handleOpenView = (item) => {
    setSelectedTestimonial(item);
    setIsViewOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedTestimonial(item);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) {
      setFeedback({ message: 'Please complete all required fields.', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      const url = selectedTestimonial
        ? `http://localhost:5000/api/testimonials/${selectedTestimonial.id}`
        : 'http://localhost:5000/api/testimonials';
      const method = selectedTestimonial ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        setFeedback({
          message: selectedTestimonial ? 'Testimonial updated!' : 'Testimonial added successfully!',
          type: 'success'
        });
        setIsFormOpen(false);
        fetchTestimonials();
      } else {
        setFeedback({ message: result.message || 'Save failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTestimonial) return;
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${selectedTestimonial.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Testimonial deleted.', type: 'success' });
        setIsDeleteOpen(false);
        fetchTestimonials();
      } else {
        setFeedback({ message: result.message || 'Delete failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{val}</div>
          {row.is_active === 1 ? (
            <span className="admin-badge admin-badge-success" style={{ fontSize: '0.7rem' }}>Active</span>
          ) : (
            <span className="admin-badge admin-badge-danger" style={{ fontSize: '0.7rem' }}>Inactive</span>
          )}
        </div>
      )
    },
    {
      key: 'role',
      label: 'Designation / Role',
      sortable: true
    },
    {
      key: 'message',
      label: 'Message',
      sortable: false,
      render: (val) => (
        <div style={{ maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={val}>
          "{val}"
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      width: '140px',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className="admin-btn-icon admin-btn-icon-primary"
            onClick={() => handleOpenView(row)}
            title="View Details"
          >
            <i className="fa-regular fa-eye"></i>
          </button>
          <button
            type="button"
            className="admin-btn-icon admin-btn-icon-success"
            onClick={() => handleOpenEdit(row)}
            title="Edit Testimonial"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="admin-btn-icon admin-btn-icon-danger"
            onClick={() => handleOpenDelete(row)}
            title="Delete Testimonial"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="admin-testimonials-page">
      <div className="admin-card-box">
        <div className="admin-card-header-flex">
          <div>
            <h2 className="admin-card-title-text" style={{ fontSize: '1.4rem' }}>
              Testimonials Management
            </h2>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              Manage client endorsements and ratings featured in the homepage slider.
            </p>
          </div>

          <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
            <i className="fa-solid fa-plus"></i> Add Testimonial
          </button>
        </div>

        {feedback.message && (
          <div className={`alert alert-${feedback.type} alert-dismissible fade show`} role="alert">
            {feedback.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setFeedback({ message: '', type: '' })}
              aria-label="Close"
            ></button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--admin-primary)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
            <p>Loading testimonials...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={testimonials}
            searchKeys={['name', 'role', 'message']}
            emptyMessage="No testimonials found. Add your first testimonial above."
          />
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedTestimonial ? `Edit Testimonial: ${selectedTestimonial.name}` : 'Add New Testimonial'}
      >
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Client / Reviewer Name *</label>
            <input
              type="text"
              className="admin-form-control"
              placeholder="e.g. Michael"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Designation / Role *</label>
            <input
              type="text"
              className="admin-form-control"
              placeholder="e.g. Commercial Client"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Testimonial Message / Feedback *</label>
            <textarea
              rows="5"
              className="admin-form-control"
              placeholder="Write client endorsement text..."
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.is_active === 1}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
              />
              <span style={{ fontWeight: 600 }}>Active (Display on website homepage)</span>
            </label>
          </div>

          <div className="admin-modal-footer mt-4" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--admin-border)' }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : selectedTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      {selectedTestimonial && (
        <Modal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title={`Testimonial: ${selectedTestimonial.name}`}
          footer={
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsViewOpen(false)}>
              Close
            </button>
          }
        >
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: '#0d2d5c', lineHeight: 1.7 }}>
              "{selectedTestimonial.message}"
            </p>
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '0.75rem' }}>
              <h4 style={{ margin: 0, fontWeight: 700, color: '#0d2d5c' }}>{selectedTestimonial.name}</h4>
              <span style={{ color: '#556b8e', fontSize: '0.85rem' }}>{selectedTestimonial.role}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedTestimonial && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirm Delete Testimonial"
          footer={
            <>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={handleConfirmDelete}>
                <i className="fa-regular fa-trash-can"></i> Confirm Delete
              </button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p>
              Are you sure you want to permanently delete the testimonial from <strong>"{selectedTestimonial.name}"</strong>?
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TestimonialsPage;
