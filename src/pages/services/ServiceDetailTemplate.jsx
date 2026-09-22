import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from '../../components/ServiceModal';
import RoomServiceTemplate from './RoomServiceTemplate';

const ServiceDetailTemplate = ({ service }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  if (!service) return null;
  if (service.pageType === 'room') return <RoomServiceTemplate service={service} />;

  return (
    <main className="service-detail-page bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            {service.categoryTag}
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            {service.title}
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            {service.subtitle}
          </p>
          <div className="mt-4">
            <span className="badge bg-light text-primary-blue border px-3 py-2 fs-6">
              <Link to="/" className="text-decoration-none text-secondary me-2">Home</Link> / 
              <Link to="/services" className="text-decoration-none text-secondary mx-2">Core Services</Link> / 
              <span className="text-theme fw-bold ms-2">{service.title}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Overview & Image Section */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <span className="sub-title style2 text-primary-blue fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>
                  OVERVIEW &amp; CAPABILITIES
                </span>
                <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                  Excellence in <span className="text-theme">{service.title}</span>
                </h2>
                <p className="fs-6 leading-relaxed mt-3" style={{ color: '#556b8e' }}>
                  {service.description}
                </p>

                <div className="mt-4">
                  <h4 className="fs-5 fw-bold mb-3" style={{ color: '#0d2d5c' }}>Key Service Features:</h4>
                  <ul className="list-unstyled">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="d-flex align-items-start mb-3">
                        <i className="fas fa-check-circle text-theme me-3 fs-5 mt-1"></i>
                        <span className="fs-6" style={{ color: '#556b8e' }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                  <button 
                    type="button" 
                    className="th-btn bg-warning text-dark fw-bold px-4 py-3 border-0 shadow"
                    onClick={() => setModalOpen(true)}
                  >
                    Enquire About {service.title}
                    <i className="fas fa-arrow-right ms-2"></i>
                  </button>

                  <Link to="/quote" className="th-btn style-border px-4 py-3" style={{ color: '#0d2d5c', borderColor: 'rgba(13,45,92,0.3)' }}>
                    Request Proposal
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rounded overflow-hidden shadow-lg position-relative" style={{ border: '1px solid rgba(13, 45, 92, 0.15)' }}>
                <img 
                  src={service.mainImage} 
                  alt={service.title} 
                  className="w-100 object-fit-cover" 
                  style={{ maxHeight: '520px', minHeight: '380px' }} 
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ background: 'linear-gradient(to top, rgba(13,45,92,0.85), transparent)' }}>
                  <span className="text-white fw-bold fs-6">Official Perfect Art Contracting Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.whyChooseUs && (
        <section className="py-4 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="p-4 rounded text-center" style={{ backgroundColor: '#f8f9fa', border: '1px solid rgba(13,45,92,0.12)' }}>
              <h2 className="fs-4 fw-bold mb-2" style={{ color: '#0d2d5c' }}>Why Choose Us for {service.title}</h2>
              <p className="m-0 fs-5" style={{ color: '#556b8e' }}>{service.whyChooseUs}</p>
            </div>
          </div>
        </section>
      )}

      {/* Execution Process Steps */}
      {service.processSteps && (
        <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(13,45,92,0.08)' }}>
          <div className="container-fluid">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 text-primary-blue fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>METHODOLOGY</span>
              <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Our Execution <span className="text-theme">Process</span>
              </h2>
            </div>

            <div className="row g-4">
              {service.processSteps.map((stepItem, idx) => (
                <div key={idx} className="col-lg-3 col-md-6">
                  <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="display-6 fw-bold text-theme">{stepItem.step}</span>
                      <i className="fas fa-tasks text-theme fs-4"></i>
                    </div>
                    <h4 className="fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>{stepItem.title}</h4>
                    <p className="fs-6 m-0" style={{ color: '#556b8e' }}>{stepItem.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(13,45,92,0.08)' }}>
          <div className="container">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>COMMON QUESTIONS</span>
              <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>About {service.title}</h2>
            </div>
            <div className="row g-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="col-lg-4">
                  <article className="h-100 p-4 rounded" style={{ border: '1px solid rgba(13,45,92,0.15)', boxShadow: '0 8px 25px rgba(13,45,92,0.06)' }}>
                    <h3 className="fs-5 fw-bold mb-3" style={{ color: '#0d2d5c' }}>{faq.question}</h3>
                    <p className="m-0" style={{ color: '#556b8e' }}>{faq.answer}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Image Gallery */}
      {service.images && service.images.length > 0 && (
        <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(13,45,92,0.08)' }}>
          <div className="container-fluid">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 text-primary-blue fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>PROJECT SHOWCASE</span>
              <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Authentic Site <span className="text-theme">Photography</span>
              </h2>
            </div>

            <div className="row g-4">
              {service.images.map((imgObj, idx) => (
                <div key={idx} className="col-lg-3 col-md-6">
                  <div 
                    className="gallery-card bg-white-card rounded overflow-hidden hover-zoom-img cursor-pointer"
                    style={{ height: '260px', position: 'relative', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.08)' }}
                    onClick={() => setActiveImage(imgObj)}
                  >
                    <img 
                      src={imgObj.src} 
                      alt={imgObj.title} 
                      className="w-100 h-100 object-fit-cover"
                    />
                    <div 
                      className="gallery-overlay position-absolute bottom-0 start-0 end-0 p-3"
                      style={{ background: 'linear-gradient(to top, rgba(13,23,33,0.9), transparent)' }}
                    >
                      <h5 className="text-white fw-bold fs-6 m-0">{imgObj.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.serviceAreas && (
        <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(13,45,92,0.08)' }}>
          <div className="container text-center">
            <span className="sub-title style2 fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>SERVICE COVERAGE</span>
            <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Serving Projects Across Saudi Arabia</h2>
            <p className="fs-5 mt-3 mb-0" style={{ color: '#556b8e' }}>{service.serviceAreas.join(' | ')}</p>
          </div>
        </section>
      )}

      {/* Service Contact Action Banner */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(13,45,92,0.1)' }}>
        <div className="container">
          <div className="p-4 p-md-5 bg-white-card rounded text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.2)', boxShadow: '0 15px 40px rgba(13, 45, 92, 0.1)' }}>
            <h3 className="display-6 fw-bold mb-3" style={{ color: '#0d2d5c' }}>
              Ready to Start Your <span className="text-theme">{service.title}</span> Project?
            </h3>
            <p className="fs-5 mb-4" style={{ color: '#556b8e', maxWidth: '750px', margin: '0 auto' }}>
              Our commercial estimation and engineering team in Riyadh is ready to review your bill of quantities (BOQ) or schedule a site visit.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button 
                type="button" 
                className="th-btn bg-warning text-dark fw-bold px-4 py-3 border-0 shadow"
                onClick={() => setModalOpen(true)}
              >
                Get Free Consultation
              </button>
              <Link to="/quote" className="th-btn style-border px-4 py-3" style={{ color: '#0d2d5c', borderColor: 'rgba(13,45,92,0.3)' }}>
                Submit Detailed RFQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }}
          onClick={() => setActiveImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-white p-3" style={{ border: '1px solid rgba(13, 45, 92, 0.2)', boxShadow: '0 15px 40px rgba(13, 45, 92, 0.15)' }}>
              <div className="modal-header border-0 pb-0 justify-content-between">
                <h5 className="fw-bold m-0" style={{ color: '#0d2d5c' }}>{activeImage.title}</h5>
                <button type="button" className="btn-close" onClick={() => setActiveImage(null)}>✕</button>
              </div>
              <div className="modal-body text-center p-3">
                <img src={activeImage.src} alt={activeImage.title} className="img-fluid rounded max-h-75vh" style={{ maxHeight: '75vh' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Service Modal */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedService={service.title} 
      />
    </main>
  );
};

export default ServiceDetailTemplate;
