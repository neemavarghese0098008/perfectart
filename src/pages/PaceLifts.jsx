import React from 'react';

const PaceLifts = () => {
  return (
    <main className="pace-lifts-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            PACE ELEVATORS
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            PACE ELEVATORS, <span className="text-theme">Complete Vertical Transportation Solutions</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            From elevator design consulting to sales, installation, maintenance, modernisation, and cabin interiors, PACE ELEVATORS delivers complete vertical transportation solutions for buildings across Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>ABOUT PACE ELEVATORS</span>
                <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                  Complete <span className="text-theme">Elevator Solutions</span>
                </h2>
                <p className="fs-6 leading-relaxed mt-3" style={{ color: '#556b8e' }}>
                  <strong>PACE ELEVATORS</strong> is the dedicated elevator division of Perfect Art Contracting Company, providing complete vertical transportation solutions, from design consulting through sales, installation, maintenance, modernisation, and cabin interiors, for commercial, residential, and villa buildings across Saudi Arabia.
                </p>
                <p className="fs-6 leading-relaxed" style={{ color: '#556b8e' }}>
                  As part of Perfect Art Contracting Company, PACE ELEVATORS draws on the same ISO 9001, ISO 14001, and ISO 45001 certified processes, the same in-house team, and the same focus on precision and timeliness that has delivered more than 200 projects since 2013.
                </p>

                <div className="row g-3 mt-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-elevator text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Elevator Design &amp; Consulting</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>Expert consulting that integrates safety and performance from the earliest design stage.</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-house-user text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Sales, Installation &amp; Maintenance</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>Elevators, escalators, dumbwaiters, AMC programs, and technical support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rounded overflow-hidden shadow-lg" style={{ border: '1px solid rgba(13, 45, 92, 0.15)' }}>
                <img src="/reactdemo/assets/img/process/process-img-2.jpg" alt="PACE Lifts Division" className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lift Types Grid */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="title-area text-center mb-5">
            <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>WHAT WE OFFER</span>
            <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
              Vertical Transportation <span className="text-theme">For Every Building</span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-building"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Passenger Elevators</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Standard elevators for office, retail, residential, and hospitality buildings.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-home"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Panoramic &amp; Home Elevators</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Glass-sided elevators for public spaces and compact lifts sized for private villas.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-truck-ramp-box"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Dumbwaiters &amp; Freight Elevators</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Solutions for moving food, goods, equipment, and materials in commercial buildings.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-wrench"></i>
                </div>
                <h4 className="text-primary-blue fw-bold fs-5 mb-2" style={{ color: '#0d2d5c' }}>Escalators, Modernisation &amp; AMC</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Moving walks, existing lift upgrades, preventive maintenance, and technical support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaceLifts;
