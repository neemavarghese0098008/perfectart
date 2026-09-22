import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'fitout', label: 'Interior Fit-Out' },
  { id: 'corporate', label: 'Corporate Offices' },
  { id: 'retail', label: 'Retail & F&B' },
  { id: 'villa', label: 'Villa & Residential' }
];

const GalleryPage = () => {
  const { token } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('fitout');
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Edit Caption Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('fitout');

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Lightbox View State
  const [activePreview, setActivePreview] = useState(null);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const url = activeTab === 'all'
        ? 'http://localhost:5000/api/gallery'
        : `http://localhost:5000/api/gallery?category=${activeTab}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setGallery(data.data);
      }
    } catch (err) {
      setFeedback({ message: 'Failed to load gallery photos: ' + err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Multiple File Selection
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles(files);
    const previews = files.map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      url: URL.createObjectURL(file)
    }));
    setFilePreviews(previews);
  };

  // Submit Multiple Uploads
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) {
      setFeedback({ message: 'Please select at least one image to upload.', type: 'danger' });
      return;
    }

    setUploading(true);
    setFeedback({ message: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('category', uploadCategory);
      if (uploadTitle.trim()) {
        formData.append('title', uploadTitle.trim());
      }

      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const res = await fetch('http://localhost:5000/api/gallery/multiple', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const result = await res.json();
      if (result.success) {
        setFeedback({ message: result.message || 'Photos uploaded successfully!', type: 'success' });
        setIsUploadOpen(false);
        setSelectedFiles([]);
        setFilePreviews([]);
        setUploadTitle('');
        fetchGallery();
      } else {
        setFeedback({ message: result.message || 'Upload failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    } finally {
      setUploading(false);
    }
  };

  // Open Edit Item
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setIsEditOpen(true);
  };

  // Save Edit Item
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: editTitle, category: editCategory })
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Photo metadata updated.', type: 'success' });
        setIsEditOpen(false);
        fetchGallery();
      } else {
        setFeedback({ message: result.message || 'Update failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    }
  };

  // Open Delete
  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${itemToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Photo deleted.', type: 'success' });
        setIsDeleteOpen(false);
        fetchGallery();
      } else {
        setFeedback({ message: result.message || 'Delete failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    }
  };

  return (
    <div className="admin-gallery-page">
      <div className="admin-card-box">
        <div className="admin-card-header-flex">
          <div>
            <h2 className="admin-card-title-text" style={{ fontSize: '1.4rem' }}>
              Photo Gallery Management
            </h2>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              Upload and organize authentic site execution photography showcased in the photo gallery.
            </p>
          </div>

          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => {
              setSelectedFiles([]);
              setFilePreviews([]);
              setUploadTitle('');
              setIsUploadOpen(true);
            }}
          >
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload Multiple Photos
          </button>
        </div>

        {/* Feedback Alerts */}
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

        {/* Category Filter Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {GALLERY_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-btn ${activeTab === tab.id ? 'admin-btn-primary' : 'admin-btn-outline'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--admin-primary)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
            <p>Loading photos...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--admin-text-muted)' }}>
            <i className="fa-regular fa-images" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block' }}></i>
            <p>No photos found in this category. Click "Upload Multiple Photos" to add some.</p>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {gallery.map((item) => {
              const imgSrc = item.src.startsWith('http')
                ? item.src
                : item.src.startsWith('/uploads')
                ? `http://localhost:5000${item.src}`
                : item.src;

              return (
                <div key={item.id} className="admin-gallery-card">
                  <div className="admin-gallery-img-wrap" onClick={() => setActivePreview(item)} style={{ cursor: 'pointer' }}>
                    <img
                      src={imgSrc}
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/reactdemo/assets/img/gallery/gallery_2_1.jpg';
                      }}
                    />
                    <div style={{ position: 'absolute', top: 8, right: 8 }}>
                      <span className="admin-badge admin-badge-primary" style={{ fontSize: '0.7rem' }}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="admin-gallery-card-body">
                    <h5 className="admin-gallery-card-title" title={item.title}>
                      {item.title}
                    </h5>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>ID #{item.id}</span>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="admin-btn-icon admin-btn-icon-primary"
                          style={{ width: 28, height: 28, fontSize: '0.75rem' }}
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Title & Category"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className="admin-btn-icon admin-btn-icon-danger"
                          style={{ width: 28, height: 28, fontSize: '0.75rem' }}
                          onClick={() => handleOpenDelete(item)}
                          title="Delete Photo"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Multiple Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Batch Upload Gallery Photos"
        size="lg"
      >
        <form onSubmit={handleUploadSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Category Destination *</label>
                <select
                  className="admin-form-control"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                >
                  <option value="fitout">Interior Fit-Out</option>
                  <option value="corporate">Corporate Offices</option>
                  <option value="retail">Retail & F&B</option>
                  <option value="villa">Villa & Residential</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Base Title / Caption (Optional)</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Riyadh Site Handover"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                />
                <small style={{ color: 'var(--admin-text-muted)', fontSize: '0.78rem' }}>
                  If left blank, filenames will be formatted automatically.
                </small>
              </div>
            </div>

            <div className="col-12">
              <div className="admin-form-group">
                <label className="admin-form-label">Select Images (Select one or multiple) *</label>
                <div className="admin-file-upload-box" onClick={() => document.getElementById('multi-gallery-input').click()}>
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '2.5rem', color: 'var(--admin-primary)', marginBottom: '0.75rem' }}></i>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--admin-text-dark)' }}>
                    Click here to browse files or drag & drop
                  </h4>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                    Supports: JPG, PNG, WEBP. Max 20 files per upload batch.
                  </p>
                  <input
                    id="multi-gallery-input"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFilesSelected}
                  />
                </div>
              </div>
            </div>

            {/* Selected File Previews */}
            {filePreviews.length > 0 && (
              <div className="col-12">
                <label className="admin-form-label">{filePreviews.length} Image(s) Ready to Upload:</label>
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                  {filePreviews.map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 90,
                        flexShrink: 0,
                        border: '1px solid var(--admin-border)',
                        borderRadius: 6,
                        overflow: 'hidden',
                        textAlign: 'center',
                        background: '#f8fafc'
                      }}
                    >
                      <img src={p.url} alt={p.name} style={{ width: '100%', height: 65, objectFit: 'cover' }} />
                      <div style={{ fontSize: '0.7rem', padding: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="admin-modal-footer mt-4" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--admin-border)' }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Uploading {selectedFiles.length} images...
                </>
              ) : (
                `Upload ${selectedFiles.length || 0} Photo(s)`
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Metadata Modal */}
      {editingItem && (
        <Modal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Photo Details"
        >
          <form onSubmit={handleSaveEdit}>
            <div className="admin-form-group">
              <label className="admin-form-label">Photo Title / Caption *</label>
              <input
                type="text"
                className="admin-form-control"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Gallery Category *</label>
              <select
                className="admin-form-control"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="fitout">Interior Fit-Out</option>
                <option value="corporate">Corporate Offices</option>
                <option value="retail">Retail & F&B</option>
                <option value="villa">Villa & Residential</option>
              </select>
            </div>

            <div className="admin-modal-footer mt-4" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--admin-border)' }}>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsEditOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirm Delete Photo"
          footer={
            <>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={handleConfirmDelete}>
                <i className="fa-regular fa-trash-can"></i> Delete Photo
              </button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p>Are you sure you want to permanently delete photo <strong>"{itemToDelete.title}"</strong>?</p>
          </div>
        </Modal>
      )}

      {/* Lightbox Preview Modal */}
      {activePreview && (
        <Modal
          isOpen={true}
          onClose={() => setActivePreview(null)}
          title={activePreview.title}
          size="lg"
          footer={
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setActivePreview(null)}>
              Close
            </button>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src={
                activePreview.src.startsWith('http')
                  ? activePreview.src
                  : activePreview.src.startsWith('/uploads')
                  ? `http://localhost:5000${activePreview.src}`
                  : activePreview.src
              }
              alt={activePreview.title}
              style={{ maxHeight: '65vh', maxWidth: '100%', borderRadius: 8, objectFit: 'contain' }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GalleryPage;
