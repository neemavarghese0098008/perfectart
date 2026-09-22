import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="overflow-hidden contact-section py-5 position-relative" id="contact-sec" style={{ backgroundColor: '#0d2d5c', backgroundImage: "url('/reactdemo/assets/img/bg/service_bg_1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Subtle dark overlay to ensure high text contrast while keeping background image visible */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(13, 23, 33, 0.72)', pointerEvents: 'none' }}></div>
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-5">

          {/* CTA Content */}
          <div className="col-xl-7 col-lg-7">
            <div className="pe-xl-5">
              <div className="title-area mb-4">
                <span className="sub-title text-warning fw-bold text-uppercase tracking-wider" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
                  Let's Build Something Great
                </span>

                <h2 className="sec-title text-white display-5 fw-bold mt-2" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)' }}>
                  Work With Saudi Arabia's Trusted Contracting Partner
                </h2>

                <p className="contact-text text-white fs-5 mt-3" style={{ lineHeight: '1.7', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
                  Tell us about your residential or commercial project. Our experienced team will review your requirements and respond within one business day with the right solution.
                </p>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/quote" className="th-btn bg-warning text-dark fw-bold px-4 py-3 border-0 shadow">
                  Request a Proposal
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>

                <a 
                  href="https://wa.me/966579797607" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="th-btn style-border text-white border-white px-4 py-3 shadow-sm"
                  style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info Box */}
          <div className="col-xl-5 col-lg-5">
            <div className="contact-info-box p-4 p-md-5 rounded border border-secondary shadow-lg" style={{ backgroundColor: 'rgba(13, 23, 33, 0.85)', backdropFilter: 'blur(8px)', width: '100%', minHeight: '280px' }}>

              <div className="contact-item mb-4 pb-3 border-bottom border-secondary">
                <span className="contact-label text-warning fw-bold fs-6 text-uppercase">
                  Call Us
                </span>

                <h6 className="text-white mt-2 mb-1">
                  <a 
                    href="tel:+966579797607" 
                    className="text-white "
                    style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                  >
                    +966 57 979 7607
                  </a>
                </h6>

                <h6 className="text-white mb-0">
                  <a 
                    href="tel:+966114560555" 
                    className="text-white"
                    style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                  >
                    +966 11 456 0555
                  </a>
                </h6>
              </div>

              <div className="contact-item">
                <span className="contact-label text-warning fw-bold fs-6 text-uppercase">
                  Email
                </span>

                <h5 className="mt-2 mb-0">
                  <a 
                    href="mailto:info@perfectartcontracting.com" 
                    className="text-white"
                    style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                  >
                    info@perfectartcontracting.com
                  </a>
                </h5>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTASection;
