import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API_BASE_URL } from '../utils/apiConfig';

const ContactPage = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'inquiries', 'quotes'

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone_primary: '',
    phone_secondary: '',
    email: '',
    whatsapp: '',
    map_iframe_url: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    youtube_url: ''
  });
  const [savingInfo, setSavingInfo] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Inquiries & Quotes Data
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch Contact Info
  const apiBaseUrl = API_BASE_URL;

  const fetchContactInfo = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/contact`);
      const data = await res.json();
      if (data.success && data.data) {
        setContactInfo(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fetch Inquiries
  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/contact/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  // Fetch Quotes
  const fetchQuotes = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/contact/quotes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setQuotes(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchContactInfo();
    fetchInquiries();
    fetchQuotes();
  }, [fetchContactInfo, fetchInquiries, fetchQuotes]);

  // Save Contact Info
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    setFeedback({ message: '', type: '' });

    try {
      const res = await fetch(`${apiBaseUrl}/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(contactInfo)
      });
      const result = await res.json();
      if (result.success) {
        setFeedback({ message: 'Contact information updated successfully! Public website updated.', type: 'success' });
        setContactInfo(result.data);
      } else {
        setFeedback({ message: result.message || 'Update failed', type: 'danger' });
      }
    } catch (err) {
      setFeedback({ message: err.message, type: 'danger' });
    } finally {
      setSavingInfo(false);
    }
  };

  // Inquiry Table Columns
  const inquiryColumns = [
    { key: 'name', label: 'Name', sortable: true, render: (val) => <strong>{val}</strong> },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    {
      key: 'created_at',
      label: 'Received',
      sortable: true,
      render: (val) => new Date(val).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          type="button"
          className="admin-btn-icon admin-btn-icon-primary"
          onClick={() => setSelectedMessage({ type: 'inquiry', data: row })}
          title="Read Message"
        >
          <i className="fa-regular fa-envelope-open"></i>
        </button>
      )
    }
  ];

  // Quote Requests Table Columns
  const quoteColumns = [
    { key: 'name', label: 'Contact Name', sortable: true, render: (val) => <strong>{val}</strong> },
    { key: 'company', label: 'Company / Brand', sortable: true, render: (val) => val || '—' },
    { key: 'city', label: 'City', sortable: true },
    { key: 'service', label: 'Service Requested', sortable: true },
    { key: 'budget', label: 'Estimated Budget', sortable: true, render: (val) => val || '—' },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          type="button"
          className="admin-btn-icon admin-btn-icon-primary"
          onClick={() => setSelectedMessage({ type: 'quote', data: row })}
          title="View RFP Details"
        >
          <i className="fa-regular fa-file-lines"></i>
        </button>
      )
    }
  ];

  return (
    <div className="admin-contact-page">
      <div className="admin-card-box">
        <div className="admin-card-header-flex">
          <div>
            <h2 className="admin-card-title-text" style={{ fontSize: '1.4rem' }}>
              Contact & Inquiries Hub
            </h2>
            <p style={{ margin: '0.35rem 0 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>
              Manage public contact details and review inbound project requests and consultations.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className={`admin-btn ${activeTab === 'info' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
              onClick={() => setActiveTab('info')}
            >
              <i className="fa-solid fa-pen-to-square"></i> Company Contact Info
            </button>
            <button
              type="button"
              className={`admin-btn ${activeTab === 'inquiries' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <i className="fa-regular fa-envelope"></i> Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              className={`admin-btn ${activeTab === 'quotes' ? 'admin-btn-primary' : 'admin-btn-outline'}`}
              onClick={() => setActiveTab('quotes')}
            >
              <i className="fa-solid fa-file-invoice-dollar"></i> RFPs / Quotes ({quotes.length})
            </button>
          </div>
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

        {/* TAB 1: Company Contact Information Form */}
        {activeTab === 'info' && (
          <form onSubmit={handleSaveInfo} className="mt-3">
            <div className="row g-4">
              <div className="col-12">
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--admin-primary)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem' }}>
                  Headquarters & Communication Lines
                </h4>
              </div>

              <div className="col-12">
                <div className="admin-form-group">
                  <label className="admin-form-label">Headquarters Physical Address *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  />
                  <small style={{ color: 'var(--admin-text-muted)' }}>
                    Displayed on Contact Us cards, TopBar, and Footer.
                  </small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Primary Phone (Mobile / Hotlines) *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={contactInfo.phone_primary}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone_primary: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Secondary Phone (Landline)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={contactInfo.phone_secondary}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone_secondary: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Public Email Address *</label>
                  <input
                    type="email"
                    className="admin-form-control"
                    required
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">WhatsApp Contact Number *</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12">
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--admin-primary)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
                  Google Maps Location Embed
                </h4>
              </div>

              <div className="col-12">
                <div className="admin-form-group">
                  <label className="admin-form-label">Google Maps Embed URL (iframe src)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={contactInfo.map_iframe_url}
                    onChange={(e) => setContactInfo({ ...contactInfo, map_iframe_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12">
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--admin-primary)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
                  Social Media Links
                </h4>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    className="admin-form-control"
                    value={contactInfo.linkedin_url || ''}
                    onChange={(e) => setContactInfo({ ...contactInfo, linkedin_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Twitter / X URL</label>
                  <input
                    type="url"
                    className="admin-form-control"
                    value={contactInfo.twitter_url || ''}
                    onChange={(e) => setContactInfo({ ...contactInfo, twitter_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Facebook URL</label>
                  <input
                    type="url"
                    className="admin-form-control"
                    value={contactInfo.facebook_url || ''}
                    onChange={(e) => setContactInfo({ ...contactInfo, facebook_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">YouTube URL</label>
                  <input
                    type="url"
                    className="admin-form-control"
                    value={contactInfo.youtube_url || ''}
                    onChange={(e) => setContactInfo({ ...contactInfo, youtube_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="admin-btn admin-btn-primary py-3 px-4" disabled={savingInfo}>
                  {savingInfo ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Updating...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Save Contact Information
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: Inbound Messages / Inquiries */}
        {activeTab === 'inquiries' && (
          <DataTable
            columns={inquiryColumns}
            data={inquiries}
            searchKeys={['name', 'email', 'phone', 'subject', 'message']}
            emptyMessage="No contact inquiries received yet."
          />
        )}

        {/* TAB 3: Quote Requests / Proposals */}
        {activeTab === 'quotes' && (
          <DataTable
            columns={quoteColumns}
            data={quotes}
            searchKeys={['name', 'company', 'phone', 'city', 'service', 'details']}
            emptyMessage="No quote requests received yet."
          />
        )}
      </div>

      {/* Message Reader Modal */}
      {selectedMessage && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedMessage(null)}
          title={selectedMessage.type === 'inquiry' ? 'Contact Message' : 'Project RFP Proposal'}
          footer={
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setSelectedMessage(null)}>
              Close
            </button>
          }
        >
          {selectedMessage.type === 'inquiry' ? (
            <div>
              <p><strong>From:</strong> {selectedMessage.data.name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${selectedMessage.data.email}`}>{selectedMessage.data.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedMessage.data.phone}`}>{selectedMessage.data.phone}</a></p>
              <p><strong>Subject:</strong> {selectedMessage.data.subject || '—'}</p>
              <hr />
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{selectedMessage.data.message}</p>
              </div>
            </div>
          ) : (
            <div>
              <p><strong>Contact:</strong> {selectedMessage.data.name} {selectedMessage.data.company && `(${selectedMessage.data.company})`}</p>
              <p><strong>Email:</strong> <a href={`mailto:${selectedMessage.data.email}`}>{selectedMessage.data.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${selectedMessage.data.phone}`}>{selectedMessage.data.phone}</a></p>
              <p><strong>Target City:</strong> {selectedMessage.data.city}</p>
              <p><strong>Requested Service:</strong> {selectedMessage.data.service}</p>
              <p><strong>Estimated Budget:</strong> {selectedMessage.data.budget || 'Not specified'}</p>
              <hr />
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
                <strong>Scope & Specifications:</strong>
                <p style={{ margin: '0.5rem 0 0', whiteSpace: 'pre-wrap' }}>{selectedMessage.data.details || 'No additional scope details provided.'}</p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ContactPage;
