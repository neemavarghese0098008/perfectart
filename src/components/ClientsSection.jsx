import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const clients = [
  {
    name: 'Centrepoint',
    file: 'client1-1.png',
  },
  {
    name: 'Sport Zone',
    file: 'client1-2.png',
  },
  {
    name: 'Tim Hortons',
    file: 'client2-1.png',
  },
  {
    name: 'Landmark Group',
    file: 'client3-1.png',
  },
  {
    name: "Nando's",
    file: 'client4-1.png',
  },
  {
    name: 'Shoe Express',
    file: 'client5-1.png',
  },
  {
    name: 'Marriott',
    file: 'client6-1.png',
  },
  {
    name: 'Max',
    file: 'client7-1.png',
  },
  {
    name: 'Adidas',
    file: 'client8-1.png',
  },
  {
    name: 'Home Centre',
    file: 'client9-1.png',
  },
  {
    name: 'Bossini',
    file: 'client10-1.png',
  },
  {
    name: 'Koton',
    file: 'client11-1.png',
  },
  {
    name: 'New Look',
    file: 'client12-1.png',
  },
  {
    name: 'Steve Madden',
    file: 'client13.png',
  },
  {
    name: 'EQL',
    file: 'eql.jpg',
  },
  {
    name: 'GymNation',
    file: 'gymn.jpg',
  },
];

const ClientsSection = () => {
  return (
    <section
      className="clients-section"
      aria-labelledby="clients-title"
    >
      <div className="container">

        {/* Heading */}
        <div className="clients-section__heading">
          <div>
            <span className="clients-section__eyebrow">
              Trusted partnerships
            </span>

            <h2 id="clients-title">
              Built for brands <span>that lead</span>
            </h2>
          </div>

          <p>
            From high-footfall retail to hospitality and fitness,
            our teams deliver spaces that perform for ambitious businesses.
          </p>
        </div>

        {/* Client Slider */}
        <div className="clients-section__slider-wrap">
          <Swiper
            className="clients-section__slider"
            modules={[Autoplay]}
            autoplay={{
              delay: 2200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            loop={true}
            slidesPerView={1}
            spaceBetween={14}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 22,
              },
            }}
          >
            {clients.map((client, index) => (
              <SwiperSlide key={`${client.name}-${index}`}>
                <div className="client-logo-card">

                  <div className="client-logo-card__image">
                    <img
                      src={`/reactdemo/assets/img/clients/${client.file}`}
                      alt={`${client.name} logo`}
                      loading="lazy"
                    />
                  </div>

                  <span>{client.name}</span>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer */}
        <div className="clients-section__footer">
          <span
            className="clients-section__rule"
            aria-hidden="true"
          ></span>

          <span>
            Commercial spaces. Lasting impressions.
          </span>

          <span
            className="clients-section__rule"
            aria-hidden="true"
          ></span>
        </div>

      </div>
    </section>
  );
};

export default ClientsSection;