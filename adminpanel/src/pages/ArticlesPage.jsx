import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import resolveImageUrl from '../utils/resolveImageUrl';
import { API_BASE_URL } from '../utils/apiConfig';

const ArticlesPage = () => {
  const { token } = useAuth();
  const apiBaseUrl = API_BASE_URL;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    description: '',
    content: '',
    category: '',
    status: 'published'
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/articles`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (err) {
      setFeedback({ message: 'Error loading articles: ' + err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleOpenAdd = () => {
    setSelectedArticle(null);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: '',
    content: '',
    category: '',
    status: 'published'
    });
    setImageFile(null);
    setPreviewUrl('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = async (item) => {
    try { const response = await fetch(`${apiBaseUrl}/articles/${item.id}`, { headers: { Authorization: `Bearer ${token}` } }); const result = await response.json(); if (result.success) item = result.data; } catch { /* retain list data if detail fetch fails */ }
    setSelectedArticle(item);
    setFormData({
      title: item.title,
      date: item.date,
      description: item.description || '',
      content: item.content || item.description || '',
      category: item.category || '',
      status: item.status || 'published'
    });
    setImageFile(null);
    setPreviewUrl(resolveImageUrl(item.img));
    setIsFormOpen(true);
  };

  const handleOpenView = (item) => {
    setSelectedArticle(item);
    setIsViewOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedArticle(item);
    setIsDeleteOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date.trim()) {
      setFeedback({ message: 'Title and Date are required.', type: 'danger' });
      return;
    }

    if (!selectedArticle && !imageFile) {
      setFeedback({ message: 'Please select a thumbnail image.', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('date', formData.date);
      data.append('description', formData.description);
      data.append('content', formData.content || formData.description);
      data.append('category', formData.category);
      data.append('status', formData.status);

      if (imageFile) {
        data.append('image', imageFile);
      } else if (selectedArticle) {
        data.append('img', selectedArticle.img);
      }

      const url = selectedArticle
        ? `${apiBaseUrl}/articles/${selectedArticle.id}`
        : `${apiBaseUrl}/articles`;
      const method = selectedArticle ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setFeedback({
          message: selectedArticle ? 'Article updated successfully!' : 'Article created successfully!',
          type: 'success'
        });
        setIsFormOpen(false);
        fetchArticles();
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
    if (!selectedArticle) return;
    try {
      const res = await fetch(`${apiBaseUrl}/articles/${selectedArticle.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Article deleted.', type: 'success' });
        setIsDeleteOpen(false);
        fetchArticles();
      } else {
        setFeedback({ message: result.message || 'Delete failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    }
  };

  const columns = [
    {
      key: 'img',
      label: 'Thumbnail',
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
              e.target.src = resolveImageUrl('/assets/img/blog/blog_1_1.jpg');
            }}
          />
        );
      }
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (val) => <div style={{ fontWeight: 600, maxWidth: '320px' }}>{val}</div>
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      width: '120px'
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      render: (val) => (
        <div style={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={val}>
          {val || '—'}
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
            title="Edit Article"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="admin-btn-icon admin-btn-icon-danger"
            onClick={() => handleOpenDelete(row)}
            title="Delete Article"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="admin-articles-page">
      <div className="admin-card-box">
        <div className="admin-card-header-flex">
          <div>
            <h2 className="admin-card-title-text" style={{ fontSize: '1.4rem' }}>
              Articles & News Management
            </h2>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              Publish market insights, Vision 2030 updates, and manufacturing news.
            </p>
          </div>

          <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
            <i className="fa-solid fa-plus"></i> Add Article
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
            <p>Loading articles...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={articles}
            searchKeys={['title', 'description', 'date']}
            emptyMessage="No articles found. Click 'Add Article' to publish a new post."
          />
        )}
      </div>

      {/* Add / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedArticle ? `Edit Article: ${selectedArticle.title}` : 'Add New Article'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Article Title *</label>
            <input
              type="text"
              className="admin-form-control"
              placeholder="e.g. Vision 2030 and the Interior Fit-Out Boom"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Publish Date *</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Aug 27, 2025"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Publication Status</label>
                <select
                  className="admin-form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Thumbnail Image {!selectedArticle && '*'}</label>
            <div className="admin-file-upload-box" onClick={() => document.getElementById('article-file-input').click()}>
              <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--admin-secondary)', marginBottom: '0.5rem' }}></i>
              <p style={{ margin: 0, fontWeight: 500 }}>Click to select article thumbnail</p>
              <input
                id="article-file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>

            {previewUrl && (
              <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                <img src={previewUrl} alt="Thumbnail preview" className="admin-preview-thumbnail" style={{ maxHeight: '160px', width: 'auto' }} />
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Article Description / Summary *</label>
            <textarea
              rows="5"
              className="admin-form-control"
              placeholder="Article summary, insights, or body content..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Article Category</label>
            <input type="text" className="admin-form-control" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Optional category" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Full Article Content *</label>
            <textarea rows="12" className="admin-form-control" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Full article text or HTML content" />
          </div>          <div className="admin-modal-footer mt-4" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--admin-border)' }}>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : selectedArticle ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Article Modal */}
      {selectedArticle && (
        <Modal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          title={`Article Preview: ${selectedArticle.title}`}
          footer={
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsViewOpen(false)}>
              Close
            </button>
          }
        >
          <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', maxHeight: '240px', background: '#f8fafc', textAlign: 'center' }}>
            <img
              src={
                selectedArticle.img.startsWith('http')
                  ? selectedArticle.img
                  : resolveImageUrl(selectedArticle.img)
              }
              alt={selectedArticle.title}
              style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'cover' }}
            />
          </div>
          <span className="admin-badge admin-badge-primary mb-2">{selectedArticle.date}</span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0d2d5c' }}>{selectedArticle.title}</h3>
          <p style={{ color: '#556b8e', lineHeight: 1.7, marginTop: '0.75rem' }}>{selectedArticle.description}</p>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {selectedArticle && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirm Delete Article"
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
              Are you sure you want to permanently delete article <strong>"{selectedArticle.title}"</strong>?
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ArticlesPage;



