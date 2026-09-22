import React from 'react';

const MarqueeSection = () => {
  const isoItems = [
    'ISO 9001:2015 Quality Management',
    'ISO 14001:2015 Environmental Management',
    'ISO 45001:2018 Occupational Health & Safety'
  ];

  return (
    <div className="marquee-area2 marquee-section overflow-hidden py-3" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid rgba(13, 45, 92, 0.15)', borderBottom: '1px solid rgba(13, 45, 92, 0.15)' }}>
      <div className="marquee-content position-relative overflow-hidden">
        <div className="d-flex align-items-center justify-content-around flex-wrap gap-4 py-2">
          {isoItems.map((item, idx) => (
            <div key={idx} className="item d-flex align-items-center gap-2">
              <img src="/reactdemo/assets/img/icon/star3.svg" alt="star icon" style={{ width: '20px', filter: 'hue-rotate(200deg)' }} />
              <span className="fw-bold tracking-wide fs-5" style={{ color: '#0d2d5c' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSection;
