import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { getTestimonials } from '../services/api';

import 'swiper/css';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: 'Michael',
      role: 'Commercial Client',
      text: 'Throughout the project, the team was incredibly responsive and professional. They kept me informed about the progress, answered any questions I had, and provided valuable guidance along the way. Their attention to detail was exceptional, ensuring that every aspect of the design was meticulously executed.'
    },
    {
      name: 'John',
      role: 'Corporate Client',
      text: 'First and foremost, the team took the time to understand my vision and personal style. They asked thoughtful questions and really listened to my needs and preferences. This initial consultation gave me confidence that they would be able to create a space that reflected my personality and met my functional requirements.'
    },
    {
      name: 'Sandra',
      role: 'Villa & Residential Client',
      text: 'Once the design phase began, I was blown away by the team\'s creativity. They presented me with a range of ideas, color schemes, and furniture options that perfectly captured the look and feel I had envisioned. Their ability to combine different elements and create a cohesive design was truly impressive.'
    }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      const data = await getTestimonials();
      if (isMounted && data && data.length > 0) {
        setTestimonials(data);
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
            Testimonials
          </span>
          <h2 className="sec-title display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
            What Our <span className="text-theme" style={{ color: '#b68c5a' }}>Client's</span> Have To Say
          </h2>
        </div>

        {/* Slider */}
        <div className="slider-area">
          <Swiper
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
                      src="/reactdemo/assets/img/icon/quote2.svg" 
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
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
