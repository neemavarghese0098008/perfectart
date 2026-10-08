import React, { useState } from 'react';
import ServiceModal from './ServiceModal';

const ServicesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('Design & Build');

  const services = [
    {
      title: 'Design & Build',
      img: '/assets/img/service/service_2_1.jpg',
      desc: 'End-to-end project delivery, from concept development and planning to construction and final handover for commercial, hospitality, and residential spaces.'
    },
    {
      title: 'Interior Fit-Out',
      img: '/assets/img/service/service_2_2.jpg',
      desc: 'Complete interior fit-out solutions for retail, F&B, corporate offices, health clubs, hospitality, and luxury villa projects with exceptional attention to detail.'
    },
    {
      title: 'MEP Works',
      img: '/assets/img/service/service_2_3.jpg',
      desc: 'Mechanical, electrical, and plumbing systems professionally engineered, installed, tested, and commissioned in compliance with Saudi industry standards.'
    },
    {
      title: 'Custom Interiors & Furniture',
      img: '/assets/img/service/service_2_4.jpg',
      desc: 'Bespoke joinery and custom furniture manufactured in-house to deliver premium craftsmanship, seamless quality, and a consistent finish across every project.'
    }
  ];

  const handleOpenModal = (serviceTitle) => {
    setActiveService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <section className="services-section overflow-hidden position-relative py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">

        {/* Section Heading */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-10">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>OUR SERVICES</span>
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Complete Interior &amp; <span className="text-theme">Construction Solutions</span>
              </h2>
              <p className="mt-3 fs-5" style={{ maxWidth: '850px', margin: '0 auto', color: '#556b8e' }}>
                We provide comprehensive design, fit-out, engineering, and manufacturing services for commercial, hospitality, and residential projects with a commitment to quality, precision, and timely delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="row g-4">
          {services.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div className="service-card hover-item h-100 p-3 bg-white-card rounded" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                
                <div className="service-img mb-3 overflow-hidden rounded" style={{ maxHeight: '220px' }}>
                  <img src={item.img} alt={item.title} className="img-fluid w-100 h-100 object-fit-cover" />
                </div>

                <div className="service-content d-flex flex-column flex-grow-1">
                  <h3 className="text-primary-blue fw-bold fs-4 mb-3" style={{ color: '#0d2d5c' }}>{item.title}</h3>
                  <p className="flex-grow-1 mb-4" style={{ lineHeight: '1.6', color: '#556b8e' }}>
                    {item.desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleOpenModal(item.title)}
                    className="th-btn style3 info-popup-btn w-100 text-center py-2"
                  >
                    More Information
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedService={activeService} 
      />
    </section>
  );
};

export default ServicesSection;
