import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCapabilities = () => {
  return (
    <section className="overflow-hidden position-relative services-section py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid mb-4">

        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="title-area text-center mb-5">
              <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>FEATURED CAPABILITIES</span>
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Delivering Excellence Through <span className="text-theme">Specialized Capabilities</span>
              </h2>
              <p className="mt-3 fs-5" style={{ color: '#556b8e' }}>
                Our specialized divisions combine in-house manufacturing expertise and advanced elevator solutions to deliver complete, high-quality project execution across Saudi Arabia.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* PACE Workshop Card */}
          <div className="col-lg-6">
            <div className="process-item bg-white-card p-4 rounded h-100 d-flex flex-column flex-md-row gap-4 align-items-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
              <div className="process-img flex-shrink-0" style={{ width: '220px', height: '180px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src="/reactdemo/assets/img/process/process-img-1.jpg" alt="PACE Workshop" className="img-fluid w-100 h-100 object-fit-cover" />
              </div>
              <div className="box-content flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark fw-bold">01</span>
                  <h3 className="box-title text-primary-blue fw-bold m-0 fs-3" style={{ color: '#0d2d5c' }}>PACE Workshop</h3>
                </div>
                <p className="box-text mb-3" style={{ lineHeight: '1.6', color: '#556b8e' }}>
                  Our in-house manufacturing facility in Riyadh produces premium joinery, bespoke furniture, cabinetry, and finishing elements used across our commercial, hospitality, and residential projects.
                </p>
                <Link to="/manufacturing" className="th-btn style2 py-2 px-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* PACE Lifts Card */}
          <div className="col-lg-6">
            <div className="process-item bg-white-card p-4 rounded h-100 d-flex flex-column flex-md-row gap-4 align-items-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
              <div className="process-img flex-shrink-0" style={{ width: '220px', height: '180px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src="/reactdemo/assets/img/process/process-img-2.jpg" alt="PACE Lifts" className="img-fluid w-100 h-100 object-fit-cover" />
              </div>
              <div className="box-content flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark fw-bold">02</span>
                  <h3 className="box-title text-primary-blue fw-bold m-0 fs-3" style={{ color: '#0d2d5c' }}>PACE Elevators</h3>
                </div>
                <p className="box-text mb-3" style={{ lineHeight: '1.6', color: '#556b8e' }}>
                  Our dedicated elevator division provides complete supply, installation, testing, and commissioning services throughout Saudi Arabia for passenger elevators, service lifts, and luxury villas.
                </p>
                <Link to="/pace-elevators" className="th-btn style2 py-2 px-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCapabilities;
