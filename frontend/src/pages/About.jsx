import React from 'react';
import CounterSection from '../components/CounterSection';
import MarqueeSection from '../components/MarqueeSection';

const About = () => {
  return (
    <main className="about-page">
      
      {/* Page Hero Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            About Perfect Art Contracting Company
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            About Perfect Art <span className="text-theme">Contracting Company</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            A Riyadh-based contractor with over a decade of experience delivering residential and commercial projects across Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Main Overview & History */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>OUR STORY &amp; VISION</span>
                <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                  Our Story: <span className="text-theme">Trusted Project Delivery</span>
                </h2>
                <p className="fs-6 leading-relaxed mt-3" style={{ color: '#556b8e' }}>
                  <strong>Perfect Art Contracting Company</strong> was founded in Riyadh in 2013. Over more than a decade, we have grown into one of Saudi Arabia's leading contractors, delivering residential and commercial projects across the Kingdom, the UAE, and Bahrain.
                </p>
                <p className="fs-6 leading-relaxed" style={{ color: '#556b8e' }}>
                  We are trusted by names including GymNation, Marriott, Tim Hortons, Adidas, Nando's, Fitness First, Steve Madden, Brands for Less, and Home Box, while still treating every villa and every home project with the same attention as our largest commercial contracts.
                </p>

                <div className="row g-3 mt-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-certificate text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Our Certifications</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>ISO 9001:2015 Quality Management, ISO 14001:2015 Environmental Management, and ISO 45001:2018 Occupational Health &amp; Safety.</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.06)' }}>
                      <i className="fas fa-city text-theme fs-3 mb-2"></i>
                      <h5 className="text-primary-blue fw-bold fs-6 m-0" style={{ color: '#0d2d5c' }}>Where We Operate</h5>
                      <p className="fs-7 m-0 mt-1" style={{ color: '#556b8e' }}>Headquartered in Riyadh, with projects across Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, Qiddiya, the UAE, and Bahrain.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rounded overflow-hidden shadow-lg" style={{ border: '1px solid rgba(13, 45, 92, 0.15)' }}>
                <img src="/assets/img/normal/about_2_1.jpg" alt="About Perfect Art" className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CounterSection />
      <MarqueeSection />

      {/* Core Values Section */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          <div className="title-area text-center mb-5">
            <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>OUR FOUNDATION</span>
            <h2 className="sec-title text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
              Driven by <span className="text-theme">Core Principles</span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h4 className="text-primary-blue fw-bold mb-3" style={{ color: '#0d2d5c' }}>Precision &amp; Quality</h4>
                <p className="leading-relaxed mb-0" style={{ color: '#556b8e' }}>
                  Every project is executed with rigorous engineering standards, premium materials, and obsessive attention to detail from planning to handover.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-clock"></i>
                </div>
                <h4 className="text-primary-blue fw-bold mb-3" style={{ color: '#0d2d5c' }}>On-Time Handover</h4>
                <p className="leading-relaxed mb-0" style={{ color: '#556b8e' }}>
                  We respect project timelines and commercial deadlines, maintaining structured project management schedules for seamless execution.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-white-card rounded h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="text-theme fs-1 mb-3">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <h4 className="text-primary-blue fw-bold mb-3" style={{ color: '#0d2d5c' }}>Safety &amp; Compliance</h4>
                <p className="leading-relaxed mb-0" style={{ color: '#556b8e' }}>
                  Adhering strictly to Saudi Building Codes and international safety frameworks, we prioritize site safety for workers and occupants alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
