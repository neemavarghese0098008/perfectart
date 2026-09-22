import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper footer-layout2" style={{ backgroundImage: "url('/reactdemo/assets/img/bg/gallery_bg_1.jpg')" }}>
      <div className="widget-area">
        <div className="container-fluid">
          <div className="row">
            
            <div className="col-lg-7">
              <div className="row justify-content-between">
                
                {/* Column 1: Logo & Overview */}
                <div className="col-md-5">
                  <div className="widget widget_nav_menu footer-line footer-widget">
                    <div className="footter-logo mb-3">
                      <img src="/reactdemo/assets/img/logofooter.png" className="foot-logo" alt="Perfect Art logo" style={{ maxHeight: '60px' }} />
                    </div>
                    <div className="menu-all-pages-container">
                      <p className="text-justify text-white-50">
                        Perfect Art Contracting Company: Riyadh's trusted contractor for Design &amp; Build, Interior Fit-Out, MEP, and Custom Interiors since 2013.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2: Stay In Touch */}
                <div className="col-md-5">
                  <div className="widget footer-widget">
                    <h3 className="widget_title text-white">Stay In Touch</h3>
                    <div className="th-widget-about">
                      <p className="footer-info text-white-50">
                        <i className="fa-regular fa-location-dot me-2 text-theme"></i>
                        Building 3547, Hafsah Bint Omar, Al Nahdah District, Riyadh 13221, Kingdom of Saudi Arabia
                      </p>
                      <p className="footer-info text-white-50">
                        <i className="fa-sharp fa-solid fa-phone me-2 text-theme"></i>
                        <span>
                          <a className="text-inherit d-block text-white" href="tel:+966579797607">
                            +966 57 979 7607 / +966 11 456 0555
                          </a>
                        </span>
                      </p>
                      <p className="footer-info text-white-50">
                        <i className="fa-sharp fa-solid fa-envelope me-2 text-theme"></i>
                        <span>
                          <a className="text-inherit text-white" href="mailto:info@perfectartcontracting.com">
                            info@perfectartcontracting.com
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Quick Links */}
                <div className="col-md-2">
                  <div className="widget widget_nav_menu footer-widget">
                    <h3 className="widget_title text-white">Quick Links</h3>
                    <div className="menu-all-pages-container">
                      <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/manufacturing">PACE Workshop</Link></li>
                        <li><Link to="/pace-lifts">PACE Elevators</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 4: Branding Graphic & Social Links */}
            <div className="col-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="gsap-cursor">
                    <h3 className="box-title text-white">
                      ICONIC <span className="text-theme">LIVING.</span> OWNIT.
                    </h3>
                  </div>
                  <div className="footer-right mt-4">
                    <div className="social-links d-flex gap-2">
                      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-white">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="text-white">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="https://wa.me/966579797607" target="_blank" rel="noreferrer" className="text-white">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                      <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="text-white">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-wrap bg-dark py-3">
        <div className="container-fluid text-center">
          <p className="footer-copyright mb-0 text-white-50">
            &copy; {currentYear} All Rights Reserved.{' '}
            <strong className="text-white">Perfect Art Contracting Company</strong>. Powered by{' '}
            <a href="https://affinityopus.com/" target="_blank" rel="noopener noreferrer" className="text-theme fw-bold">
              Affinity Interactive
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
