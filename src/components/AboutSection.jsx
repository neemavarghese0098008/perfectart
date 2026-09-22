import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <div className="about-area about-section overflow-hidden py-5 bg-white-section" id="about-sec" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">
        <div className="row gy-5 align-items-center">

          {/* Images */}
          <div className="col-xxl-7 mb-30 mb-xl-0">
            <div className="img-box2">
              <div className="img-box2_wrapp d-flex gap-3">
                <div className="img1 img-anim-top flex-fill">
                  <img src="/reactdemo/assets/img/normal/about_2_1.jpg" alt="Perfect Art Contracting" className="img-fluid rounded" />
                </div>
                <div className="img2 img-anim-right flex-fill d-flex flex-column gap-3">
                  <img src="/reactdemo/assets/img/normal/about_light_1.jpg" alt="Residential Interior Design" className="img-fluid rounded" />
                  <img src="/reactdemo/assets/img/normal/about_6_1.jpg" alt="Commercial Interior Design" className="img-fluid rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="col-xxl-5">
            <div className="ps-xxl-5 ms-xxl-2">
              <div className="title-area mb-30 pe-xxl-5">
                <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>About Perfect Art Contracting Company</span>

                <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                  Reliable Execution You Can Trust,{' '}
                  <span className="text-theme">From Planning to Final Handover</span>
                </h2>
              </div>

              <p className="fs-18 mb-35 leading-relaxed" style={{ color: '#556b8e' }}>
                Perfect Art Contracting Company is a Riyadh-based contractor delivering residential and commercial projects across Saudi Arabia. With over a decade of experience, we provide interior fit-out contracting, design and build solutions, custom interiors, and in-house manufacturing across retail, F&amp;B, hospitality, corporate offices, health clubs, and villa projects.
              </p>

              <div className="btn-group mt-4 wow fadeInUp" data-wow-delay=".8s">
                <Link to="/about" className="th-btn style2">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="shape-mockup d-none d-xxl-block" style={{ position: 'absolute', top: 0, left: 0 }}>
        <img src="/reactdemo/assets/img/shape/element-1.png" alt="Shape element" />
      </div>
    </div>
  );
};

export default AboutSection;
