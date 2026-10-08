import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getTestimonials } from '../services/api';
import { googleReviewsConfig } from '../data/googleReviewsConfig';

import 'swiper/css';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getTestimonials();
        if (isMounted) setTestimonials(data);
      } catch (requestError) {
        if (isMounted) setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchReviews();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="testimonial-area-three testimonial-section bg-white-section overflow-hidden py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Section Heading */}
        <div className="title-area text-center mb-5">
          <span className="sub-title style2 text-anime text-primary-blue fw-bold text-uppercase tracking-wider">
            Client Feedback
          </span>
          <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
            What Our <span className="text-theme" style={{ color: '#b68c5a' }}>Clients Say</span>
          </h2>
        </div>

        {/* Slider */}
        <div className="slider-area">
          {loading && <p className="text-center py-5">Loading testimonials...</p>}
          {!loading && error && <div className="alert alert-danger text-center">Unable to load testimonials. <button type="button" className="btn btn-link" onClick={() => window.location.reload()}>Retry</button></div>}
          {!loading && !error && <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  className="testi-card style2 p-5 rounded text-center bg-white-card" 
                  style={{ 
                    maxWidth: '800px', 
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(13, 45, 92, 0.15)',
                    boxShadow: '0 12px 35px rgba(13, 45, 92, 0.08)'
                  }}
                >
                  <div className="box-quote mb-4">
                    <img 
                      src="/assets/img/icon/quote2.svg" 
                      alt="quote icon" 
                      style={{ 
                        width: '40px',
                        filter: 'invert(16%) sepia(54%) saturate(2225%) hue-rotate(201deg) brightness(91%) contrast(97%)'
                      }} 
                    />
                  </div>

                  {/* Body Paragraph Text in Perfect Art Primary Blue */}
                  <p 
                    className="box-text fs-5 italic mb-4" 
                    style={{ 
                      color: '#0d2d5c', 
                      lineHeight: '1.8',
                      fontWeight: '500' 
                    }}
                  >
                    "{item.text}"
                  </p>

                  {/* Reviewer Details in Primary Blue */}
                  <div className="box-info">
                    <h3 className="box-title fw-bold mb-1 fs-4" style={{ color: '#0d2d5c' }}>
                      {item.name}
                    </h3>
                    <span className="box-desig fs-6 fw-medium" style={{ color: '#556b8e' }}>
                      {item.role}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>}
        </div>

        <div className="text-center mt-4">
          {Number.isFinite(googleReviewsConfig.rating) && googleReviewsConfig.rating >= 0 && googleReviewsConfig.rating <= 5 && <p className="mb-3" style={{ color: '#556b8e' }}>Google Reviews · {googleReviewsConfig.rating} / 5</p>}
          <a className="google-reviews-link" href={googleReviewsConfig.url} target="_blank" rel="noopener noreferrer">View all reviews on Google <span aria-hidden="true">→</span></a>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
