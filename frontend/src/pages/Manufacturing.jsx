import React from 'react';

const Manufacturing = () => {
  return (
    <main className="manufacturing-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            PACE Workshop
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            PACE Workshop, <span className="text-theme">In-House Manufacturing in Riyadh</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            A fully equipped joinery and manufacturing facility in Riyadh, producing custom kitchens, wardrobes, furniture, and retail fixtures for Perfect Art Contracting Company projects across Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Main Feature */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="rounded overflow-hidden shadow-lg" style={{ border: '1px solid rgba(13, 45, 92, 0.15)' }}>
                <img src="/assets/img/process/process-img-1.jpg" alt="PACE Workshop Manufacturing" className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="ps-lg-4">
                <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>ABOUT PACE WORKSHOP</span>
                <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                  In-House Joinery &amp; <span className="text-theme">Furniture Manufacturing</span>
                </h2>
                <p className="fs-6 leading-relaxed mt-3" style={{ color: '#556b8e' }}>
                  <strong>PACE Workshop</strong> is the in-house manufacturing facility of Perfect Art Contracting Company, based in Riyadh. The facility is anchored by a CNC router and a comprehensive suite of precision woodworking machinery, producing custom joinery and furniture for commercial and residential clients across Saudi Arabia.
                </p>
                <p className="fs-6 leading-relaxed" style={{ color: '#556b8e' }}>
                  Because manufacturing happens on our own floor, we control quality, lead times, and cost directly, rather than depending on third-party suppliers for custom pieces.
                </p>

                <div className="row g-3 mt-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-hammer text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Custom Kitchens</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>Kitchen cabinetry manufactured and finished to fit each space precisely.</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-kitchen-set text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Wardrobes &amp; Bedroom Furniture</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>Bespoke wardrobes and bedroom furniture, built to match a project's interior design.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Capabilities List */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="title-area text-center mb-5">
            <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>OUR EQUIPMENT</span>
            <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
              Precision Equipment &amp; <span className="text-theme">In-House Production</span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="p-4 bg-white-card rounded h-100 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <i className="fas fa-draw-polygon text-theme fs-1 mb-3"></i>
                <h4 className="text-primary-blue fw-bold fs-5" style={{ color: '#0d2d5c' }}>CNC Router Machine</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Precision routing for custom joinery and furniture components.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-4 bg-white-card rounded h-100 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <i className="fas fa-paint-roller text-theme fs-1 mb-3"></i>
                <h4 className="text-primary-blue fw-bold fs-5" style={{ color: '#0d2d5c' }}>Panel Saw</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Accurate panel cutting for kitchens, wardrobes, and furniture.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-4 bg-white-card rounded h-100 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <i className="fas fa-border-all text-theme fs-1 mb-3"></i>
                <h4 className="text-primary-blue fw-bold fs-5" style={{ color: '#0d2d5c' }}>Edge Banding Machine</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Clean, durable edges for a consistent finished result.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-4 bg-white-card rounded h-100 text-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <i className="fas fa-cubes text-theme fs-1 mb-3"></i>
                <h4 className="text-primary-blue fw-bold fs-5" style={{ color: '#0d2d5c' }}>Finishing Toolset</h4>
                <p className="fs-6" style={{ color: '#556b8e' }}>Thickness planing, band sawing, sanding, drilling, and full finishing tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Manufacturing;
