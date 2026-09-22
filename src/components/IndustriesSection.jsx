import React from 'react';

const IndustriesSection = () => {
  const industries = [
    { title: 'Retail Outlets', icon: 'fa-store' },
    { title: 'F&B', icon: 'fa-mug-hot' },
    { title: 'Health Clubs & Spa', icon: 'fa-heart-pulse' },
    { title: 'Corporate Offices', icon: 'fa-building' },
    { title: 'Villa & Residential', icon: 'fa-house' },
    { title: 'Hospitality', icon: 'fa-hotel' }
  ];

  return (
    <section className="industries-section py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">
        
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>Industries We Serve</span>
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Purpose-Built for <span className="text-theme">Every Sector</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {industries.map((ind, idx) => (
            <div key={idx} className="col-lg-2 col-md-4 col-6">
              <div className="industry-card bg-white-card p-4 rounded text-center h-100 d-flex flex-column align-items-center justify-content-center transition-all hover-up" style={{ minHeight: '160px', backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="industry-icon text-theme fs-1 mb-3">
                  <i className={`fa-solid ${ind.icon}`}></i>
                </div>
                <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>{ind.title}</h5>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesSection;
