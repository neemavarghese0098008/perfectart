import React from 'react';

const CounterSection = () => {
  const stats = [
    {
      title: 'Years in Business',
      count: '10+',
      desc: 'Delivering quality contracting, construction, and interior solutions across Saudi Arabia.'
    },
    {
      title: 'Projects Delivered',
      count: '200+',
      desc: 'Successfully completed residential, commercial, hospitality, and corporate projects.'
    },
    {
      title: 'In-House Professionals',
      count: '50+',
      desc: 'A dedicated team of engineers, designers, project managers, and skilled craftsmen.'
    },
    {
      title: 'Countries Served',
      count: '3',
      desc: 'Delivering exceptional contracting and fit-out services across multiple international markets.'
    }
  ];

  return (
    <div className="counter-section overflow-hidden py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">
        <div className="counter-card_wrapp style2">
          {stats.map((stat, idx) => (
            <div key={idx} className="counter-card style2 wow fadeInUp" data-wow-delay={`${(idx + 1) * 0.2}s`}>
              <span className="sub-title style2 text-primary-blue" style={{ color: '#0d2d5c' }}>{stat.title}</span>
              <h3 className="box-number" style={{ color: '#0d2d5c' }}>
                <span className="counter-number" style={{ color: '#0d2d5c' }}>{stat.count}</span>
              </h3>
              <p className="box-text" style={{ color: '#556b8e', fontWeight: '500' }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
