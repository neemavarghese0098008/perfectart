import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from '../../components/ServiceModal';

const RoomServiceTemplate = ({ service }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="room-service-page bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <section className="room-service-hero page-hero py-5 text-center" style={{ backgroundColor: '#0d2d5c' }}>
        <div className="container py-4">
          <span className="sub-title fw-bold text-uppercase text-white">{service.categoryTag}</span>
          <h1 className="display-4 fw-bold text-white mt-2">{service.title}</h1>
          <p className="fs-5 mt-3 mx-auto text-white-50" style={{ maxWidth: '780px' }}>{service.subtitle}</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link to="/quote" className="th-btn bg-warning text-dark fw-bold px-4 py-3 border-0">Request a Proposal</Link>
            <Link to="/projects" className="th-btn white-border px-4 py-3">View Our Projects</Link>
            <a href="https://wa.me/966579797607" target="_blank" rel="noreferrer" className="th-btn whatsapp-btn px-4 py-3">
              <i className="fab fa-whatsapp me-2" aria-hidden="true"></i>WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <span className="sub-title fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>ABOUT {service.title}</span>
              <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Made for Your Space</h2>
              <p className="fs-5 mt-3" style={{ color: '#556b8e', lineHeight: 1.7 }}>{service.description}</p>
            </div>
            <div className="col-lg-6">
              <img src={service.mainImage} alt={service.title} className="w-100 rounded object-fit-cover" style={{ maxHeight: '430px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="sub-title fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>WHAT WE OFFER</span>
            <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Designed, Manufactured and Installed</h2>
          </div>
          <div className="row g-4">
            {service.offers.map((offer) => (
              <div className="col-lg-4" key={offer.title}>
                <article className="h-100 p-4 rounded bg-white" style={{ border: '1px solid rgba(13,45,92,0.15)' }}>
                  <i className="fas fa-check-circle text-theme fs-3 mb-3" aria-hidden="true"></i>
                  <h3 className="fs-4 fw-bold" style={{ color: '#0d2d5c' }}>{offer.title}</h3>
                  <p className="m-0" style={{ color: '#556b8e', lineHeight: 1.65 }}>{offer.text}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-5">
              <span className="sub-title fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>WHY CHOOSE US</span>
              <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>PACE Workshop Quality</h2>
            </div>
            <div className="col-lg-7">
              <ul className="list-unstyled m-0">
                {service.whyChooseUs.map((reason) => (
                  <li className="d-flex align-items-start mb-3" key={reason}>
                    <i className="fas fa-check-circle text-theme me-3 mt-1" aria-hidden="true"></i>
                    <span style={{ color: '#556b8e' }}>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <span className="sub-title fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>CITIES WE SERVE</span>
          <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Across Saudi Arabia</h2>
          <p className="fs-5 mt-3 mb-0" style={{ color: '#556b8e' }}>Riyadh, Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, manufactured from our Riyadh workshop.</p>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="sub-title fw-bold text-uppercase" style={{ color: '#0d2d5c' }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Questions About {service.title}</h2>
          </div>
          <div className="row g-4">
            {service.faqs.map((faq) => (
              <div className="col-lg-6" key={faq.question}>
                <article className="h-100 p-4 rounded" style={{ border: '1px solid rgba(13,45,92,0.15)' }}>
                  <h3 className="fs-5 fw-bold mb-3" style={{ color: '#0d2d5c' }}>{faq.question}</h3>
                  <p className="m-0" style={{ color: '#556b8e' }}>{faq.answer}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 room-service-final-cta" style={{ backgroundColor: '#0d2d5c' }}>
        <div className="container text-center">
          <h2 className="display-6 fw-bold text-white">{service.finalCta}</h2>
          <p className="fs-5 text-white-50 mt-3">Tell us about your space. Our team responds within one business day.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <button type="button" onClick={() => setModalOpen(true)} className="th-btn bg-warning text-dark fw-bold px-4 py-3 border-0">Request a Proposal</button>
            <a href="tel:+966579797607" className="th-btn white-border px-4 py-3">Call: +966 57 979 7607</a>
            <a href="mailto:info@perfectartcontracting.com" className="th-btn white-border px-4 py-3">Email Us</a>
            <a href="https://wa.me/966579797607" target="_blank" rel="noreferrer" className="th-btn whatsapp-btn px-4 py-3">WhatsApp</a>
          </div>
        </div>
      </section>

      <ServiceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedService={service.title} />
    </main>
  );
};

export default RoomServiceTemplate;
