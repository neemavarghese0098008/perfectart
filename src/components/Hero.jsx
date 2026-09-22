import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Parallax } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

const Hero = () => {
 const slides = [
  {
    // Slide 1
    subtitle: 'Your Trusted Contracting Partner in Saudi Arabia',
    title: 'Building Exceptional Spaces with Precision & Excellence',
    tagline:'Building Exceptional Spaces with Precision & Excellence',
    text: 'Perfect Art Contracting Company delivers Design & Build, Interior Fit-Out, MEP Works, and Custom Interiors & Furniture for residential, commercial, and hospitality projects across Riyadh and the Kingdom of Saudi Arabia.',
    badge: 'Over 200 Projects Completed in KSA',
    bg: '/reactdemo/assets/img/slider/1.webp',
    btn1Text: 'Request a Proposal',
    btn1Link: '/contact',
    btn2Text: 'View Our Projects',
    btn2Link: '/projects'
  },

  {
    // Slide 2 - Manufacturing Unit
    subtitle: 'OUR OWN MANUFACTURING UNIT IN RIYADH',
    subtitleArabic: 'وحدة التصنيع الخاصة بنا في الرياض',
    title: 'PRECISION MANUFACTURING, BUILT IN HOUSE',
    tagline:
      'Every custom interior, engineered and built at our own CNC workshop in Riyadh.',
    badge: 'Full CNC Workshop in Riyadh',
    text: 'Perfect Art Contracting Company manufactures custom kitchens, wardrobes, and joinery at our own facility in Riyadh. Our workshop runs CNC routers, panel saws, and a full finishing toolset for faster, better controlled production.',
    bg: '/reactdemo/assets/img/slider/2.webp',
    btn1Text: 'Explore the Workshop',
    btn1Link: '/manufacturing'
  },

  {
    // Slide 3 - PACE Elevators
    subtitle: 'PACE ELEVATORS, OUR LIFT AND ELEVATOR DIVISION',
    subtitleArabic:
      'PACE Elevators، قسم تركيب وصيانة المصاعد لدينا',
    title: 'LIFT AND ELEVATOR SERVICES ACROSS THE KINGDOM',
    tagline:
      'Elevator installation and maintenance for residential, commercial, and hospitality projects across Saudi Arabia.',
    badge: 'Elevator Installation and Maintenance',
    text: 'Perfect Art Contracting Company installs and maintains elevators through our PACE Elevators division. From villas to retail and hospitality developments, one team handles your build and your elevator under a single point of accountability.',
    bg: '/reactdemo/assets/img/slider/3.webp',
    btn1Text: 'Learn About PACE Elevators',
    btn1Link: '/pace-elevators'
  }
];


  return (
    <div className="th-hero-wrapper hero-7 position-relative">
      <Swiper
        modules={[Navigation, Autoplay, Parallax]}
        parallax={true}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev'
        }}
        className="showcase-slider-active"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="hero-inner position-relative py-5" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
              <div 
                className="th-hero-bg showcase-slider-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.55)',
                  zIndex: -1
                }}
              ></div>

              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-9 col-lg-10">
                    <div className="hero-style7">
                      <h5 className="text-uppercase mb-3 text-white fw-medium tracking-wide">
                        {slide.subtitle}
                      </h5>

                      <h1 className="hero-title text-white fw-bold mb-3 display-4">
                        {slide.title}
                      </h1>

                      {/* Subtitle below main hero heading */}
                      <p className="hero-main-subtitle mb-3">
                      {slide.tagline}</p>

                      {/* Project Highlight Badge */}
                      <div className="hero-badge-container mb-4">
                        <div className="hero-highlight-badge">
                          <i className="fas fa-award"></i>
                          <span>{slide.badge}</span>
                        </div>
                      </div>

                      <p className="text-white fs-5 mb-4" style={{ maxWidth: '750px', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.88)' }}>
                        {slide.text}
                      </p>

                      <div className="btn-group hero-btn-group d-flex flex-wrap gap-3 mt-4">
                        <Link to={slide.btn1Link} className="th-btn style3">
                          {slide.btn1Text}
                        </Link>

                        <Link to={slide.btn2Link} className="th-btn white-border">
                          {slide.btn2Text}
                        </Link>

                        <a 
                          href="https://wa.me/966579797607" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="th-btn whatsapp-btn"
                        >
                          <i className="fab fa-whatsapp me-2"></i>
                          WhatsApp Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="button-wrap">
          <div className="swiper-button-next hero-button-next" role="button">
            <div>
              <img src="/reactdemo/assets/img/icon/hero-left-arrow.svg" alt="Next" />
            </div>
          </div>
          <div className="swiper-button-prev hero-button-prev" role="button">
            <div>
              <img src="/reactdemo/assets/img/icon/hero-right-arrow.svg" alt="Previous" />
            </div>
          </div>
        </div>
      </Swiper>

      {/* Social Bar */}
      <div className="hero-social">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://wa.me/966579797607" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>

      {/* Scroll Down Indicator */}
      <div className="scroll-down">
        <a href="#about-sec" className="hero-scroll-wrap">
          Scroll Down
        </a>
      </div>
    </div>
  );
};

export default Hero;
