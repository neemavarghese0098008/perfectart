import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import resolveImageUrl from '../utils/resolveImageUrl';
import { API_BASE_URL } from '../utils/apiConfig';

const CATEGORY_CONFIG = {
  retail: { label: 'Retails and F&B', title: 'Retails and F&B', dbCategory: 'retail' },
  fnb: { label: 'Retails and F&B', title: 'Retails and F&B', dbCategory: 'fnb' },
  'corporate-office': { label: 'Corporate Offices', title: 'Corporate Offices', dbCategory: 'corporate' },
  'health-club-spa': { label: 'Health Clubs & Spa', title: 'Health Club & Spa Facilities', dbCategory: 'spa' },
  hospitality: { label: 'Hospitality', title: 'Hospitality & Hotels', dbCategory: 'hospitality' },
  'villa-residential': { label: 'Villa & Residential', title: 'Villa & Residential Interiors', dbCategory: 'residential' }
};

const ProjectsCategoryPage = ({ explicitCategory }) => {
  const { categorySlug } = useParams();
  const activeSlug = explicitCategory || categorySlug || 'retail';
  const config = CATEGORY_CONFIG[activeSlug] || {
    label: activeSlug,
    title: activeSlug,
    dbCategory: activeSlug
  };
  const apiBaseUrl = API_BASE_URL;

  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Active item for Edit/View/Delete
  const [selectedProject, setSelectedProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    place: '',
    country: 'Saudi Arabia',
    category_label: config.label,
    featured: false,
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [relatedFiles, setRelatedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Projects for this category
  const fetchCategoryProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/projects/category/${config.dbCategory}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (err) {
      setFeedback({ message: 'Failed to load projects: ' + err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, [config.dbCategory]);

  useEffect(() => {
    fetchCategoryProjects();
  }, [fetchCategoryProjects]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setSelectedProject(null);
    setFormData({
      title: '',
      place: '',
      country: 'Saudi Arabia',
      category_label: config.label,
      featured: false,
      description: ''
    });
    setImageFile(null);
    setPreviewUrl('');
    setRelatedFiles((files) => { files.forEach(({ url }) => URL.revokeObjectURL(url)); return []; }); setExistingImages([]); setRemovedImages([]);
    setIsFormOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = async (project) => {
    try {
      const response = await fetch(`${apiBaseUrl}/projects/${project.id}`, { headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json();
      if (result.success) project = result.data;
    } catch (error) { setFeedback({ message: error.message, type: "danger" }); }
    setSelectedProject(project);
    setFormData({
      title: project.title,
      place: project.place,
      country: project.country || 'Saudi Arabia',
      category_label: project.category_label || config.label,
      featured: Boolean(project.featured),
      description: project.description || ''
    });
    setImageFile(null);
    setPreviewUrl(resolveImageUrl(project.img));
    let parsed = []; try { parsed = Array.isArray(project.images) ? project.images : JSON.parse(project.images || '[]'); } catch { parsed = []; }
    setExistingImages(parsed); setRemovedImages([]); setRelatedFiles((files) => { files.forEach(({ url }) => URL.revokeObjectURL(url)); return []; });
    setIsFormOpen(true);
  };

  // Open View Modal
  const handleOpenView = (project) => {
    setSelectedProject(project);
    setIsViewOpen(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  // Image Selection Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleRelatedChange = (e) => setRelatedFiles((files) => [...files, ...Array.from(e.target.files || []).map((file) => ({ file, url: URL.createObjectURL(file) }))]);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.place.trim()) {
      setFeedback({ message: 'Please fill in all required fields.', type: 'danger' });
      return;
    }

    if (!selectedProject && !imageFile) {
      setFeedback({ message: 'Please select a main project image.', type: 'danger' });
      return;
    }

    setSubmitting(true);
    setFeedback({ message: '', type: '' });

    try {
      const data = new FormData();
      data.append('category', config.dbCategory);
      data.append('category_label', formData.category_label);
      data.append('title', formData.title);
      data.append('place', formData.place);
      data.append('country', formData.country);
      data.append('featured', formData.featured ? '1' : '0');
      data.append('description', formData.description || '');

      if (imageFile) {
        data.append('mainImage', imageFile);
      } else if (selectedProject) {
        data.append('img', selectedProject.img);
      }
      relatedFiles.forEach(({ file }) => data.append('relatedImages', file));
      data.append('removeImages', JSON.stringify(removedImages));

      const url = selectedProject
        ? `${apiBaseUrl}/projects/${selectedProject.id}`
        : `${apiBaseUrl}/projects`;

      const method = selectedProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setFeedback({
          message: selectedProject ? 'Project updated successfully!' : 'Project created successfully!',
          type: 'success'
        });
        setIsFormOpen(false);
        fetchCategoryProjects();
      } else {
        setFeedback({ message: result.message || 'Error saving project', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: 'Network error: ' + err.message, type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!selectedProject) return;
    try {
      const res = await fetch(`${apiBaseUrl}/projects/${selectedProject.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Project deleted successfully.', type: 'success' });
        setIsDeleteOpen(false);
        fetchCategoryProjects();
      } else {
        setFeedback({ message: result.message || 'Failed to delete project', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    }
  };

  const columns = [
    {
      key: 'img',
      label: 'Image',
      sortable: false,
      width: '80px',
      render: (val, row) => {
        const imgSrc = resolveImageUrl(val);
        return (
          <img
            src={imgSrc}
            alt={row.title}
            className="admin-table-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = resolveImageUrl('/assets/img/projects/brands_for_less_store.jpeg');
            }}
          />
        );
      }
    },
    {
      key: 'title',
      label: 'Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--admin-text-dark)' }}>{val}</div>
          {row.featured === 1 && (
            <span className="admin-badge admin-badge-warning" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginTop: '0.2rem' }}>
              ★ Featured on Home
            </span>
          )}
        </div>
      )
    },
    {
      key: 'place',
      label: 'Place',
      sortable: true
    },
    {
      key: 'country',
      label: 'Country Name',
      sortable: true,
      render: (val) => val || 'Saudi Arabia'
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
            title="Edit Project"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="admin-btn-icon admin-btn-icon-danger"
            onClick={() => handleOpenDelete(row)}
            title="Delete Project"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="admin-projects-page">
      {/* Page Header Card */}
      <div className="admin-card-box">
        <div className="admin-card-header-flex">
          <div>
            <span className="admin-badge admin-badge-primary mb-2">{config.label}</span>
            <h2 className="admin-card-title-text" style={{ fontSize: '1.4rem' }}>
              {config.title} Management
            </h2>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              Manage and update portfolio showcase items displayed on the public website.
            </p>
          </div>

          <div>
            <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
              <i className="fa-solid fa-plus"></i> Add New Project
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {feedback.message && (
          <div
            className={`alert alert-${feedback.type} alert-dismissible fade show`}
            role="alert"
            style={{ marginBottom: '1.5rem' }}
          >
            {feedback.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setFeedback({ message: '', type: '' })}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Data Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--admin-primary)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
            <p>Loading {config.title}...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={projects}
            searchKeys={['title', 'place', 'country']}
            emptyMessage={`No ${config.title} found. Click "Add New Project" to create one.`}
          />
        )}
      </div>

      {/* Add / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedProject ? `Edit Project: ${selectedProject.title}` : `Add Project to ${config.title}`}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-8">
              <div className="admin-form-group">
                <label className="admin-form-label">Project Name / Title *</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Brands for Less - Store"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="admin-form-group">
                <label className="admin-form-label">Category Label</label>
                <input
                  type="text"
                  className="admin-form-control"
                  readOnly
                  value={formData.category_label}
                  onChange={(e) => setFormData({ ...formData, category_label: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Place / Location *</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Sahara Mall, Riyadh"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Country Name *</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Saudi Arabia"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="admin-form-group">
                <label className="admin-form-label">Main Project Image *</label>
                <div className="admin-file-upload-box" onClick={() => document.getElementById('project-file-input').click()}>
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--admin-secondary)', marginBottom: '0.5rem' }}></i>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--admin-text-dark)' }}>
                    Click to browse or upload image (JPEG, PNG, WebP)
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                    Max size: 15MB. Recommended resolution: 1200x800.
                  </p>
                  <input
                    id="project-file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>

                {previewUrl && (
                  <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Image Preview:
                    </span>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="admin-preview-thumbnail"
                      style={{ maxHeight: '180px', width: 'auto', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="admin-form-group">
                <label className="admin-form-label">Multiple Images</label>
                <p className="small text-muted">Choose as many related project images as needed. They are saved with this project.</p>
                <input className="admin-form-control" type="file" accept="image/*" multiple onChange={handleRelatedChange} />
                <p className="small mt-2">{existingImages.length - removedImages.length + relatedFiles.length} related image(s) selected</p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {existingImages.map((image, index) => !removedImages.includes(image) && <div key={`${image}-${index}`} style={{ position: 'relative' }}><img src={resolveImageUrl(image)} alt={`Related ${index + 1}`} style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 6 }} /><button type="button" className="btn btn-sm btn-danger" aria-label="Remove existing image" onClick={() => setRemovedImages((items) => [...items, image])} style={{ position: 'absolute', right: 0, top: 0 }}>×</button></div>)}
                  {relatedFiles.map(({ file, url }, index) => <div key={`${file.name}-${index}`} style={{ position: 'relative' }}><img src={url} alt={file.name} style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 6 }} /><button type="button" className="btn btn-sm btn-danger" aria-label="Remove selected image" onClick={() => { URL.revokeObjectURL(relatedFiles[index].url); setRelatedFiles((items) => items.filter((_, i) => i !== index)); }} style={{ position: 'absolute', right: 0, top: 0 }}>×</button></div>)}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="admin-form-group">
                <label className="admin-form-label">Project Description / Scope (Optional)</label>
                <textarea
                  rows="3"
                  className="admin-form-control"
                  placeholder="Additional architectural, fit-out, or joinery details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="col-12">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  Feature this project on the Homepage "Recent Projects We're Proud Of" section
                </span>
              </label>
            </div>
          </div>

          <div className="admin-modal-footer mt-4" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--admin-border)' }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => setIsFormOpen(false)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                </>
              ) : selectedProject ? (
                'Update Project'
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Project Modal */}
      {selectedProject && (
        <Modal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title={`Project Details: ${selectedProject.title}`}
          footer={
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsViewOpen(false)}>
              Close
            </button>
          }
        >
          <div>
            <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '1.25rem', maxHeight: '300px', textAlign: 'center', background: '#0b131b' }}>
              <img
                src={
                  selectedProject.img.startsWith('http')
                    ? selectedProject.img
                    : resolveImageUrl(selectedProject.img)
                }
                alt={selectedProject.title}
                style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th style={{ width: '35%', background: '#f8fafc' }}>Project Title</th>
                  <td><strong>{selectedProject.title}</strong></td>
                </tr>
                <tr>
                  <th style={{ background: '#f8fafc' }}>Category</th>
                  <td>{selectedProject.category_label || config.label}</td>
                </tr>
                <tr>
                  <th style={{ background: '#f8fafc' }}>Location / Place</th>
                  <td>{selectedProject.place}</td>
                </tr>
                <tr>
                  <th style={{ background: '#f8fafc' }}>Country</th>
                  <td>{selectedProject.country || 'Saudi Arabia'}</td>
                </tr>
                <tr>
                  <th style={{ background: '#f8fafc' }}>Featured on Homepage</th>
                  <td>{selectedProject.featured === 1 ? 'Yes' : 'No'}</td>
                </tr>
                {selectedProject.description && (
                  <tr>
                    <th style={{ background: '#f8fafc' }}>Description</th>
                    <td>{selectedProject.description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedProject && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirm Delete Project"
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
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--admin-danger-light)', color: 'var(--admin-danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h4 style={{ fontWeight: 700, color: 'var(--admin-text-dark)' }}>Are you sure?</h4>
            <p style={{ color: 'var(--admin-text-muted)', margin: '0.5rem 0 0' }}>
              You are about to permanently delete <strong>"{selectedProject.title}"</strong>. This action will immediately remove it from the public portfolio showcase and cannot be undone.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsCategoryPage;





