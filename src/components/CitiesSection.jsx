import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const CitiesSection = () => {
  const cities = [
    {
      name: 'Riyadh',
      badge: 'Head Office',
      desc: 'Perfect Art Contracting Company is headquartered in Riyadh, at Building 3547, Hafsah Bint Omar, Al Nahdah District. We deliver Design & Build, Fit-Out, MEP, PACE Workshop & Lifts.'
    },
    {
      name: 'Jeddah',
      desc: 'Providing Design & Build and Interior Fit-Out services for retail, corporate, and hospitality businesses on Saudi Arabia\'s west coast.'
    },
    {
      name: 'Abha',
      desc: 'Serving commercial and residential clients in Abha, delivering interior fit-out and Design & Build services across the Aseer region.'
    },
    {
      name: 'Dammam',
      desc: 'Businesses in Dammam rely on Perfect Art for commercial and residential fit-out, along with MEP Works, across the Eastern Province.'
    },
    {
      name: 'Madina',
      desc: 'Delivering commercial fit-out and interior design services for hospitality and retail clients across Madina.'
    },
    {
      name: 'Al Khobar',
      desc: 'Supporting retail, corporate, and hospitality clients in Al Khobar with fit-out and MEP services across the Eastern Province.'
    },
    {
      name: 'Tabuk',
      desc: 'Providing Design & Build and Interior Fit-Out services for commercial clients in Saudi Arabia\'s northwest region.'
    },
    {
      name: 'Al Kharj',
      desc: 'Supporting commercial and residential clients in Al Kharj, south of Riyadh, with fit-out and construction services.'
    },
    {
      name: 'Qiddiya',
      desc: 'Providing interior fit-out and Design & Build services supporting Qiddiya\'s giga-project entertainment developments.'
    }
  ];

  return (
    <section className="cities-section py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">

        <div className="row text-center mb-4">
          <div className="title-area col-lg-12 text-center mb-0">
            <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>Cities We Serve</span>
            <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
              Present Across <span className="text-theme">the Kingdom</span>
            </h2>
            <p className="mt-3 fs-5" style={{ maxWidth: '850px', margin: '0 auto', color: '#556b8e' }}>
              Delivering Design &amp; Build, Interior Fit-Out, MEP Works, Custom Furniture, PACE Workshop Manufacturing and Pace Elevators throughout Saudi Arabia.
            </p>
          </div>
        </div>

        <div className="slider-area mt-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={30}
            speed={800}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 }
            }}
          >
            {cities.map((city, idx) => (
              <SwiperSlide key={idx}>
                <div className="city-card bg-white-card p-4 rounded h-100 d-flex flex-column" style={{ minHeight: '260px', backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                  <div className="city-icon text-theme fs-2 mb-3">
                    <i className="fas fa-location-dot me-2"></i>
                  </div>

                  <h4 className="text-primary-blue fw-bold fs-4 mb-3 d-flex align-items-center justify-content-between" style={{ color: '#0d2d5c' }}>
                    {city.name}
                    {city.badge && (
                      <span className="badge bg-warning text-dark fs-6 font-normal ms-2">
                        {city.badge}
                      </span>
                    )}
                  </h4>

                  <p className="flex-grow-1 mb-3" style={{ color: '#556b8e', lineHeight: '1.6', fontWeight: '500' }}>
                    {city.desc}
                  </p>

                  <div className="text-theme fw-bold mt-auto d-flex align-items-center gap-2">
                    <span>Contractor in {city.name}</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="country-info text-center mt-5 pt-3" style={{ borderTop: '1px solid rgba(13, 45, 92, 0.15)' }}>
          <p className="mb-0 fs-5" style={{ color: '#556b8e' }}>
            <strong style={{ color: '#0d2d5c' }}>Perfect Art Contracting Company</strong> also maintains active operations in the <strong className="text-theme">United Arab Emirates</strong> and the <strong className="text-theme">Kingdom of Bahrain</strong>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CitiesSection;
