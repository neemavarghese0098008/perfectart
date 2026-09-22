import React, { useState } from 'react';

const ServiceModal = ({ isOpen, onClose, selectedService = 'Design & Build' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: selectedService,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div 
      className="modal fade show d-block service-info-modal" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content service-modal-content p-4" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.2)', borderRadius: '8px', boxShadow: '0 15px 40px rgba(13, 45, 92, 0.15)' }}>
          
          <div className="modal-header service-modal-header d-flex justify-content-between align-items-center pb-3 mb-3" style={{ borderBottom: '1px solid rgba(13, 45, 92, 0.1)' }}>
            <div>
              <h3 className="modal-title mb-1 text-primary-blue fw-bold" style={{ color: '#0d2d5c' }}>
                Get More Information
              </h3>
              <p className="mb-0 fs-6" style={{ color: '#556b8e' }}>
                Fill out the form below and our engineering team will contact you shortly.
              </p>
            </div>
            <button 
              type="button" 
              className="btn-close bg-transparent border-0 fs-4" 
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className="modal-body">
            {submitted ? (
              <div className="alert alert-success text-center py-4" role="alert">
                <i className="fas fa-check-circle fs-1 mb-3 text-success"></i>
                <h4 className="alert-heading text-dark fw-bold">Enquiry Submitted Successfully!</h4>
                <p className="mb-0 text-dark">Thank you for reaching out. We will respond within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control service-form-control p-2" 
                      placeholder="Enter your full name" 
                      required 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-control service-form-control p-2" 
                      placeholder="+966 XX XXX XXXX" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control service-form-control p-2" 
                      placeholder="name@company.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Service Required *</label>
                    <select 
                      className="form-select service-form-control p-2"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Design & Build">Design &amp; Build</option>
                      <option value="Interior Fit-Out">Interior Fit-Out</option>
                      <option value="MEP Works">MEP Works</option>
                      <option value="Custom Interiors & Furniture">Custom Interiors &amp; Furniture</option>
                      <option value="PACE Workshop">PACE Workshop</option>
                      <option value="PACE Lifts">PACE Lifts</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Project Details / Message</label>
                    <textarea 
                      rows="4" 
                      className="form-control service-form-control p-2" 
                      placeholder="Specify your project type, location in Saudi Arabia, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="service-submit-btn w-100 py-3 text-uppercase fw-bold">
                      Submit Enquiry
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
