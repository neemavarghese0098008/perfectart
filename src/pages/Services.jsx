import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Design & Build');

  const openEnquiry = (serviceName) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const serviceList = [
    {
      id: 'design-build',
      title: 'Design & Build',
      icon: 'fa-compass-drafting',
      img: '/reactdemo/assets/img/service/service_details.jpg',
      desc: 'Our Design & Build service integrates architectural design, engineering development, spatial planning, material selection, and site construction under a single point of responsibility. We deliver turnkey projects for commercial retail, corporate headquarters, F&B outlets, and private luxury villas across Saudi Arabia.',
      features: [
        'Turnkey Architectural & Interior Design',
        '3D Visualization & VR Walkthroughs',
        'Regulatory Approvals & Permit Management',
        'Complete Construction & Project Delivery'
      ]
    },
    {
      id: 'interior-fit-out',
      title: 'Interior Fit-Out',
      icon: 'fa-couch',
      img: '/reactdemo/assets/img/service/service_details_2.jpg',
      desc: 'We provide specialized interior fit-out solutions engineered for high-traffic commercial venues, high-end retail brands, health clubs, restaurants, corporate offices, and luxury residential villas. From acoustic ceiling installation to marble flooring and custom partition walls.',
      features: [
        'Retail Outlets & Showroom Fit-Out',
        'Corporate Office Workplace Transformation',
        'F&B Restaurant & Cafe Fit-Out',
        'Hospitality & Villa Luxury Interiors'
      ]
    },
    {
      id: 'interior-build',
      title: 'Interior & Build',
      icon: 'fa-building',
      img: '/reactdemo/assets/img/service/service_details_2.jpg',
      desc: 'Structural civil works and architectural interior construction, including partitions, ceilings, flooring, wall finishes, and space transformations for commercial and residential projects.',
      features: [
        'Structural Alterations & Civil Works',
        'Drywall Partitions & Acoustic Ceilings',
        'Flooring, Wall Finishes & Cladding',
        'Safe, Coordinated Project Execution'
      ]
    },
    {
      id: 'mep-works',
      title: 'MEP Works (Mechanical, Electrical, Plumbing)',
      icon: 'fa-gears',
      img: '/reactdemo/assets/img/service/service_details_3.jpg',
      desc: 'Our MEP division designs, installs, tests, and commissions mechanical, electrical, plumbing, HVAC, fire-fighting, and low-voltage systems in full compliance with Saudi Building Codes, SASO guidelines, and international engineering standards.',
      features: [
        'HVAC & Air Conditioning Installation',
        'Electrical Distribution & Lighting Systems',
        'Plumbing, Drainage & Water Supply',
        'Fire Fighting & Alarm Systems'
      ]
    },
    {
      id: 'custom-interior-furniture',
      title: 'Custom Interiors & Bespoke Furniture',
      icon: 'fa-hammer',
      img: '/reactdemo/assets/img/service/service_details_4.jpg',
      desc: 'Powered by our in-house PACE Workshop in Riyadh, we craft bespoke joinery, kitchen cabinetry, bedroom headboards, executive office desks, vanity units, wall paneling, and custom loose furniture with premium wood veneers, metals, and fine finishes.',
      features: [
        'Modular & Custom Kitchen Cabinets',
        'Luxury Master Bedrooms & Wardrobes',
        'Living Room & Wall Paneling Concepts',
        'Dining Room Tables & Executive Desk Suites'
      ]
    }
  ];

  return (
    <main className="services-page">
      
      {/* Page Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Turnkey Contracting &amp; Fit-Out Services
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            Comprehensive <span className="text-theme">Contracting Solutions</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            From Design &amp; Build execution to specialized MEP engineering, custom joinery, and elevator installations across the Kingdom of Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row g-5">
            {serviceList.map((service, idx) => (
              <div key={idx} id={service.id} className="col-12">
                <div className="p-4 p-md-5 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                  <div className="row align-items-center gy-4">
                    <div className={`col-lg-6 ${idx % 2 === 1 ? 'order-lg-2' : ''}`}>
                      <div className="rounded overflow-hidden shadow-lg hover-zoom-img" style={{ border: '1px solid rgba(13, 45, 92, 0.15)', maxHeight: '380px' }}>
                        <img src={service.img} alt={service.title} className="img-fluid w-100 h-100 object-fit-cover" />
                      </div>
                    </div>

                    <div className={`col-lg-6 ${idx % 2 === 1 ? 'order-lg-1' : ''}`}>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="icon-box text-theme fs-2 p-3 rounded" style={{ backgroundColor: '#f8f9fa', border: '1px solid rgba(13, 45, 92, 0.15)' }}>
                          <i className={`fa-solid ${service.icon}`}></i>
                        </div>
                        <h2 className="text-primary-blue fw-bold fs-2 m-0" style={{ color: '#0d2d5c' }}>{service.title}</h2>
                      </div>

                      <p className="fs-6 leading-relaxed mb-4" style={{ color: '#556b8e' }}>
                        {service.desc}
                      </p>

                      <h5 className="text-primary-blue fw-bold fs-6 mb-3" style={{ color: '#0d2d5c' }}>Key Capabilities:</h5>
                      <ul className="list-unstyled row g-2 mb-4">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="col-sm-6 d-flex align-items-center gap-2" style={{ color: '#556b8e' }}>
                            <i className="fas fa-check-circle text-theme fs-6"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="d-flex flex-wrap gap-3">
                        <Link to={`/services/${service.id}`} className="th-btn style3 py-2 px-4">
                          View {service.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEnquiry(service.title)}
                          className="th-btn style-border py-2 px-4"
                        >
                          Request Proposal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedService={selectedService} 
      />
    </main>
  );
};

export default Services;
