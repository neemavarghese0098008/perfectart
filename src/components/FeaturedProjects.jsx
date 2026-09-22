import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../services/api';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([
    {
      title: 'Brands For Less Group – E Commerce Office',
      category: 'Corporate Office',
      location: 'Riyadh, Saudi Arabia',
      img: '/reactdemo/assets/img/projects/bfl_ecommerce_office.jpg'
    },
    {
      title: 'Brands for Less - Store',
      category: 'Retail',
      location: 'Riyadh, Saudi Arabia',
      img: '/reactdemo/assets/img/projects/brands_for_less_store.jpeg'
    },
    {
      title: 'Fitness First (Ladies)',
      category: 'Healthcare & Retail',
      location: 'Riyadh, Saudi Arabia',
      img: '/reactdemo/assets/img/projects/fitness_first_ladies.png'
    }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      const data = await getFeaturedProjects();
      if (isMounted && data && data.length > 0) {
        setProjects(data);
      }
    };
    fetchFeatured();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="featured-projects py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-fluid">

        {/* Heading */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-8">
            <div className="title-area text-left mb-2">
              <span className="sub-title style2 text-anime text-primary-blue" style={{ color: '#0d2d5c' }}>FEATURED PROJECTS</span>
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold mt-2" style={{ color: '#0d2d5c' }}>
                Recent Projects <span className="text-theme">We're Proud Of</span>
              </h2>
            </div>
          </div>

          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <Link to="/projects" className="view-project-btn text-theme fw-bold text-decoration-none fs-5 d-inline-flex align-items-center gap-2">
              View All Projects
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="row g-4">
          {projects.map((proj, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="project-card bg-white-card rounded overflow-hidden h-100" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="project-image position-relative" style={{ height: '260px', overflow: 'hidden' }}>
                  <img src={proj.img} className="img-fluid w-100 h-100 object-fit-cover" alt={proj.title} />
                  <span className="project-tag">
                    {proj.category}
                  </span>
                </div>

                <div className="project-content p-4">
                  <h4 className="text-primary-blue fw-bold fs-4 mb-2" style={{ color: '#0d2d5c' }}>{proj.title}</h4>
                  <p className="mb-1" style={{ color: '#556b8e', fontWeight: '500' }}>{proj.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
