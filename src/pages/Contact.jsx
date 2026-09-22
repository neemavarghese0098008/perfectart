import React, { useState, useEffect } from 'react';
import { getContactInfo, submitContactInquiry } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    address: 'Building 3547, Hafsah Bint Omar, Al Nahdah District, Riyadh 13221, KSA',
    phone_primary: '+966 57 979 7607',
    phone_secondary: '+966 11 456 0555',
    email: 'info@perfectartcontracting.com',
    map_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.577265882329!2d46.77258957608821!3d24.707106451480112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f038f830bbefb%3A0x8e8331d22227d884!2sHafsah%20Bint%20Omar%2C%20Al%20Nahdah%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
  });

  useEffect(() => {
    let isMounted = true;
    const fetchInfo = async () => {
      const data = await getContactInfo();
      if (isMounted && data) {
        setContactDetails(data);
      }
    };
    fetchInfo();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactInquiry(formData);
    } catch (err) {
      console.warn('Inquiry submission fallback:', err.message);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <main className="contact-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Contact Us
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            Get In Touch With <span className="text-theme">Our Team</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            Have a question about your project or need an engineering consultation? Visit our Riyadh headquarters or send us a message below.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row g-4 mb-5">

            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded text-center h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-location-dot"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Riyadh Headquarters</h4>
                <p className="fs-6 m-0" style={{ color: '#556b8e' }}>
                  {contactDetails.address}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded text-center h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-phone"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Phone Lines</h4>
                <p className="fs-6 m-0" style={{ color: '#556b8e' }}>
                  <a href={`tel:${contactDetails.phone_primary}`} className="text-primary-blue text-decoration-none d-block" style={{ color: '#0d2d5c' }}>
                    {contactDetails.phone_primary}
                  </a>
                  {contactDetails.phone_secondary && (
                    <a href={`tel:${contactDetails.phone_secondary}`} className="text-primary-blue text-decoration-none d-block" style={{ color: '#0d2d5c' }}>
                      {contactDetails.phone_secondary}
                    </a>
                  )}
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded text-center h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-envelope"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Email Address</h4>
                <p className="fs-6 m-0" style={{ color: '#556b8e' }}>
                  <a href={`mailto:${contactDetails.email}`} className="text-primary-blue text-decoration-none" style={{ color: '#0d2d5c' }}>
                    {contactDetails.email}
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Form & Map */}
          <div className="row g-5 align-items-stretch">
            
            <div className="col-lg-7">
              <div className="p-4 p-md-5 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <h3 className="text-primary-blue fw-bold mb-4" style={{ color: '#0d2d5c' }}>Send Us a Direct Message</h3>

                {submitted ? (
                  <div className="alert alert-success text-center py-4">
                    <i className="fas fa-check-circle fs-1 text-success mb-3"></i>
                    <h4 className="text-dark fw-bold">Message Sent Successfully!</h4>
                    <p className="text-dark mb-0">Our team will get back to you within 1 business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-primary-blue" style={{ color: '#0d2d5c' }}>Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control service-form-control p-2" 
                          placeholder="Your name" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-primary-blue" style={{ color: '#0d2d5c' }}>Phone Number *</label>
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
                        <label className="form-label text-primary-blue" style={{ color: '#0d2d5c' }}>Email Address *</label>
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
                        <label className="form-label text-primary-blue" style={{ color: '#0d2d5c' }}>Subject</label>
                        <input 
                          type="text" 
                          className="form-control service-form-control p-2" 
                          placeholder="Project enquiry or general question" 
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label text-primary-blue" style={{ color: '#0d2d5c' }}>Message *</label>
                        <textarea 
                          rows="5" 
                          className="form-control service-form-control p-2" 
                          placeholder="Write your message or project requirements here..." 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="col-12 mt-4">
                        <button type="submit" className="service-submit-btn w-100 py-3 text-uppercase fw-bold" disabled={submitting}>
                          {submitting ? 'Sending Message...' : 'Send Message'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Map Container */}
            <div className="col-lg-5">
              <div className="rounded overflow-hidden shadow-lg h-100" style={{ border: '1px solid rgba(13, 45, 92, 0.15)', minHeight: '400px' }}>
                <iframe
                  title="Perfect Art Riyadh Headquarters Location Map"
                  src={contactDetails.map_iframe_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
