import React, { useState } from 'react';

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: '1. What services does Perfect Art Contracting Company provide?',
      a: 'Design & Build, Interior Fit-Out, MEP Works, and Custom Interiors and Furniture, plus in-house manufacturing through PACE Workshop and elevator installation through Pace Elevators.'
    },
    {
      q: '2. Does Perfect Art Contracting Company work on residential projects?',
      a: 'Yes, residential and commercial projects are equally core to our work, including villa fit-out and custom furniture.'
    },
    {
      q: '3. Where is Perfect Art Contracting Company based?',
      a: 'Riyadh, with projects across Jeddah, Abha, Dammam, Madina, Al Khobar, Tabuk, Al Kharj, and Qiddiya, and active operations in the UAE and Bahrain.'
    },
    {
      q: '4. Is Perfect Art Contracting Company certified?',
      a: 'Yes, ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified.'
    },
    {
      q: '5. How long has Perfect Art Contracting Company been operating?',
      a: 'Established in 2013, with more than 200 projects completed across the region.'
    },
    {
      q: '6. Does Perfect Art Contracting Company install elevators?',
      a: 'Yes, through Pace Elevators, our dedicated division for elevator supply, installation and commissioning, covering passenger and service elevators for commercial, residential, and villa projects.'
    }
  ];

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="overflow-hidden space py-5 bg-white-section" id="faq-sec" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">
        <div className="row gy-4 gx-80 align-items-center">
          
          <div className="col-lg-6">
            <div className="title-area text-left mb-4">
              <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>FAQ's</span>
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Have Any <span className="text-theme">Question?</span>
              </h2>
            </div>

            <div className="faq-area3">
              <div className="accordion-area accordion">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="accordion-card mb-3 bg-white-card rounded" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 4px 15px rgba(13, 45, 92, 0.05)' }}>
                    <div className="accordion-header">
                      <button
                        className={`accordion-button w-100 text-start p-3 bg-transparent fw-bold border-0 ${
                          openIdx === idx ? '' : 'collapsed'
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(idx)}
                        style={{ color: '#0d2d5c' }}
                      >
                        <span className="fs-6">{faq.q}</span>
                      </button>
                    </div>
                    {openIdx === idx && (
                      <div className="accordion-body p-3 pt-0" style={{ borderTop: '1px solid rgba(13, 45, 92, 0.1)' }}>
                        <p className="faq-text m-0 leading-relaxed fs-6" style={{ color: '#556b8e' }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="faq-image style2 global-img rounded overflow-hidden shadow-lg" style={{ maxHeight: '550px' }}>
              <img src="/reactdemo/assets/img/normal/faq-img2.jpg" alt="FAQ Image" className="img-fluid w-100 h-100 object-fit-cover" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQSection;
