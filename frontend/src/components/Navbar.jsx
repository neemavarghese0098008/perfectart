import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenus, setMobileSubmenus] = useState({});
  const [isSticky, setIsSticky] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenus({});
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSubmenus({});
  };

  const toggleMobileSubmenu = (menuName) => {
    setMobileSubmenus((current) => ({
      ...current,
      [menuName]: !current[menuName]
    }));
  };

  return (
    <>
      {/* Mobile Side Menu */}
      <div
        className={`th-menu-wrapper ${mobileMenuOpen ? 'th-body-visible' : ''}`}
        onClick={(event) => event.target === event.currentTarget && closeMobileMenu()}
      >
        <div className="th-menu-area text-center" role="dialog" aria-label="Mobile navigation">
          <button className="th-menu-toggle" onClick={toggleMobileMenu} aria-label="Close menu">
            <i className="fal fa-times"></i>
          </button>
          <div className="mobile-logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img src="/assets/img/logo.png" alt="Perfect Art logo" />
            </Link>
          </div>
          <div className="th-mobile-menu">
            <ul>
              <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink></li>
              <li><NavLink to="/blog" onClick={closeMobileMenu}>BLOG</NavLink></li>
              <li className={`mobile-menu-item-has-children${mobileSubmenus.services ? ' is-open' : ''}`}>
                <div className="mobile-menu-parent">
                  <NavLink to="/services" onClick={closeMobileMenu}>Core Services</NavLink>
                  <button type="button" onClick={() => toggleMobileSubmenu('services')} aria-label="Toggle Core Services submenu" aria-expanded={Boolean(mobileSubmenus.services)}>
                    <i className="fas fa-chevron-down" aria-hidden="true"></i>
                  </button>
                </div>
                <ul className="mobile-submenu">
                  <li><NavLink to="/services/design-build" onClick={closeMobileMenu}>Design &amp; Build</NavLink></li>
                  <li><NavLink to="/services/interior-build" onClick={closeMobileMenu}>Interior &amp; Build</NavLink></li>
                  <li><NavLink to="/services/interior-fit-out" onClick={closeMobileMenu}>Interior Fit-Out</NavLink></li>
                  <li><NavLink to="/services/mep-works" onClick={closeMobileMenu}>MEP Works</NavLink></li>
                  <li className={`mobile-menu-item-has-children${mobileSubmenus.customFurniture ? ' is-open' : ''}`}>
                    <div className="mobile-menu-parent">
                      <NavLink to="/services/custom-interior-furniture" onClick={closeMobileMenu}>Custom Interiors &amp; Furniture</NavLink>
                      <button type="button" onClick={() => toggleMobileSubmenu('customFurniture')} aria-label="Toggle Custom Interiors submenu" aria-expanded={Boolean(mobileSubmenus.customFurniture)}>
                        <i className="fas fa-chevron-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <ul className="mobile-submenu">
                      <li><NavLink to="/services/kitchen-cabinets" onClick={closeMobileMenu}>Kitchen Cabinets</NavLink></li>
                      <li><NavLink to="/services/bedroom" onClick={closeMobileMenu}>Bedroom</NavLink></li>
                      <li><NavLink to="/services/living-room" onClick={closeMobileMenu}>Living Room</NavLink></li>
                      <li><NavLink to="/services/dining-room" onClick={closeMobileMenu}>Dining Room</NavLink></li>
                      <li><NavLink to="/services/kids-room" onClick={closeMobileMenu}>Kids Room</NavLink></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={`mobile-menu-item-has-children${mobileSubmenus.portfolio ? ' is-open' : ''}`}>
                <div className="mobile-menu-parent">
                  <NavLink to="/projects" onClick={closeMobileMenu}>Portfolio</NavLink>
                  <button type="button" onClick={() => toggleMobileSubmenu('portfolio')} aria-label="Toggle Portfolio submenu" aria-expanded={Boolean(mobileSubmenus.portfolio)}>
                    <i className="fas fa-chevron-down" aria-hidden="true"></i>
                  </button>
                </div>
                <ul className="mobile-submenu">
                  <li><NavLink to="/portfolio/retail" onClick={closeMobileMenu}>Retail Outlets</NavLink></li>
                  <li><NavLink to="/portfolio/fnb" onClick={closeMobileMenu}>F&amp;B</NavLink></li>
                  <li><NavLink to="/portfolio/corporate" onClick={closeMobileMenu}>Corporate Offices</NavLink></li>
                  <li><NavLink to="/portfolio/health-clubs-spa" onClick={closeMobileMenu}>Health Clubs &amp; Spa</NavLink></li>
                  <li><NavLink to="/portfolio/hospitality" onClick={closeMobileMenu}>Hospitality</NavLink></li>
                  <li><NavLink to="/portfolio/villa-residential" onClick={closeMobileMenu}>Villa &amp; Residential</NavLink></li>
                </ul>
              </li>
              <li><NavLink to="/gallery" onClick={closeMobileMenu}>Gallery</NavLink></li>
              <li><NavLink to="/manufacturing" onClick={closeMobileMenu}>Manufacturing</NavLink></li>
              <li><NavLink to="/pace-lifts" onClick={closeMobileMenu}>PACE Elevators</NavLink></li>
              <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink></li>
              <li><NavLink to="/quote" onClick={closeMobileMenu}>Request a Quote</NavLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Sticky Header Header Layout 7 */}
      <header className={`th-header header-layout7${isSticky ? ' is-sticky' : ''}`}>
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`}>
          <div className="container-fluid">
            <div className="menu-area">
              <div className="row align-items-center w-100 m-0">
                
                {/* Left Side: Desktop Main Nav + Request a Quote Button */}
                <div className="col-lg-9 p-0 d-flex align-items-center gap-3 gap-xl-4">
                  <nav className="main-menu d-none d-lg-inline-block">
                    <ul>
                      <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Home
                        </NavLink>
                      </li>

                      {/* Core Services Dropdown */}
                      <li className="menu-item-has-children">
                        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Core Services
                        </NavLink>
                        <ul className="sub-menu">
                          <li><Link to="/services/design-build">Design &amp; Build</Link></li>
                          <li><Link to="/services/interior-fit-out">Interior Fit-Out</Link></li>
                          <li><Link to="/services/mep-works">MEP Works</Link></li>
                          <li className="menu-item-has-children">
                            <Link to="/services/custom-interior-furniture">Custom Interiors &amp; Furniture</Link>
                            <ul className="sub-menu">
                              <li><Link to="/services/kitchen-cabinets">Kitchen Cabinets</Link></li>
                              <li><Link to="/services/bedroom">Bedroom</Link></li>
                              <li><Link to="/services/living-room">Living Room</Link></li>
                              <li><Link to="/services/dining-room">Dining Room</Link></li>
                              <li><Link to="/services/kids-room">Kids Room</Link></li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      {/* Portfolio Dropdown */}
                      <li className="menu-item-has-children">
                        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Portfolio
                        </NavLink>
                        <ul className="sub-menu">
                          <li><Link to="/portfolio/retail">Retail Outlets</Link></li>
                          <li><Link to="/portfolio/fnb">F&amp;B</Link></li>
                          <li><Link to="/portfolio/corporate">Corporate Offices</Link></li>
                          <li><Link to="/portfolio/health-clubs-spa">Health Clubs &amp; Spa</Link></li>
                          <li><Link to="/portfolio/hospitality">Hospitality</Link></li>
                          <li><Link to="/portfolio/villa-residential">Villa &amp; Residential</Link></li>
                        </ul>
                      </li>

                      {/* Gallery */}
                      <li>
                        <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Gallery
                        </NavLink>
                      </li>

                      {/* Manufacturing */}
                      <li>
                        <NavLink to="/manufacturing" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Manufacturing
                        </NavLink>
                      </li>

                      {/* PACE Elevators */}
                      <li>
                        <NavLink to="/pace-lifts" className={({ isActive }) => (isActive ? 'active' : '')}>
                          PACE Elevators
                        </NavLink>
                      </li>

                      {/* About */}
                      <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                          About Us
                        </NavLink>
                      </li>

                      {/* Contact */}
                      <li><NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>BLOG</NavLink></li>
                      <li>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>
                  </nav>

                  <div className="header-button d-none d-lg-flex">
                    <Link to="/quote" className="th-btn th-border">
                      Request a Quote
                    </Link>
                  </div>
                </div>

                {/* Right Side: Mobile Toggle + White Background Blue Logo Container */}
                <div className="col-lg-3 p-0">
                  <div className="header-button d-lg-none">
                    <button type="button" onClick={toggleMobileMenu} className="th-menu-toggle d-inline-block" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
                      <i className="far fa-bars"></i>
                    </button>
                  </div>

                  <div className="header-logo float-end header-logo-white-bg">
                    <Link to="/">
                      <img src="/assets/img/logo.png" className="logo-imgs" alt="Perfect Art logo" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

