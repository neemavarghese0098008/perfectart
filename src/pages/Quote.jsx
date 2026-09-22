import React, { useState } from 'react';

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: 'Riyadh',
    service: 'Design & Build',
    budget: '',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="quote-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Request a Quote / Proposal
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            Let's Estimate Your <span className="text-theme">Project</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            Fill in your project specifications below. Our estimation and engineering team in Riyadh will review your bill of quantities (BOQ) or requirements and provide a detailed proposal.
          </p>
        </div>
      </section>

      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="p-4 p-md-5 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                
                {submitted ? (
                  <div className="alert alert-success text-center py-5">
                    <i className="fas fa-check-circle display-1 text-success mb-3"></i>
                    <h3 className="text-dark fw-bold">Quote Request Received!</h3>
                    <p className="text-dark fs-5 mb-0">Our commercial team will get in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      
                      <div className="col-md-6">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control service-form-control p-2" 
                          placeholder="Contact person name" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Company / Organization Name</label>
                        <input 
                          type="text" 
                          className="form-control service-form-control p-2" 
                          placeholder="Entity or brand name" 
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-control service-form-control p-2" 
                          placeholder="+966 5X XXX XXXX" 
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
                          placeholder="email@domain.com" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Project City *</label>
                        <select 
                          className="form-select service-form-control p-2"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                          <option value="Riyadh">Riyadh</option>
                          <option value="Jeddah">Jeddah</option>
                          <option value="Dammam">Dammam</option>
                          <option value="Abha">Abha</option>
                          <option value="Madina">Madina</option>
                          <option value="Al Khobar">Al Khobar</option>
                          <option value="Tabuk">Tabuk</option>
                          <option value="Al Kharj">Al Kharj</option>
                          <option value="Qiddiya">Qiddiya</option>
                          <option value="Other KSA">Other (Saudi Arabia)</option>
                          <option value="UAE">UAE</option>
                          <option value="Bahrain">Bahrain</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Service Category *</label>
                        <select 
                          className="form-select service-form-control p-2"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          <option value="Design & Build">Design &amp; Build</option>
                          <option value="Interior Fit-Out">Interior Fit-Out</option>
                          <option value="MEP Works">MEP Works</option>
                          <option value="Custom Furniture / Joinery">Custom Furniture / Joinery</option>
                          <option value="PACE Lifts">PACE Lifts</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Estimated Budget (SAR)</label>
                        <input 
                          type="text" 
                          className="form-control service-form-control p-2" 
                          placeholder="e.g. 250,000 SAR" 
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label text-primary-blue fw-medium" style={{ color: '#0d2d5c' }}>Project Scope &amp; Specifications</label>
                        <textarea 
                          rows="5" 
                          className="form-control service-form-control p-2" 
                          placeholder="Describe the space dimensions, floor area (sqm), structural requirements, timeline, or BOQ summary..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="col-12 text-center mt-4">
                        <button type="submit" className="service-submit-btn w-100 py-3 text-uppercase fw-bold fs-5">
                          Submit Request for Proposal
                        </button>
                      </div>

                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Quote;
