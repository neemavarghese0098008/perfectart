import React, { useState, useEffect } from 'react';
import { categories, projectData } from '../data/projects';
import { getProjects } from '../services/api';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [allProjects, setAllProjects] = useState(projectData);

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      const data = await getProjects();
      if (isMounted && data && data.length > 0) {
        setAllProjects(data);
      }
    };
    fetchAll();
    return () => { isMounted = false; };
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.cat === activeFilter);

  return (
    <main className="projects-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Our Portfolio
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            Featured <span className="text-theme">Completed Projects</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            Explore our showcase of delivered corporate offices, retail outlets, restaurants, luxury villas, and commercial spaces across Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`th-btn py-2 px-4 ${activeFilter === cat.id ? 'bg-warning text-dark border-warning fw-bold' : 'bg-white text-primary-blue'}`}
                style={{
                  border: '1px solid rgba(13, 45, 92, 0.2)',
                  color: activeFilter === cat.id ? '#0d1721' : '#0d2d5c'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="row g-4">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="col-lg-4 col-md-6">
                <div className="project-card bg-white-card rounded overflow-hidden h-100 transition-all hover-up" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                  <div className="project-image position-relative" style={{ height: '280px', overflow: 'hidden' }}>
                    <img src={proj.img} className="img-fluid w-100 h-100 object-fit-cover" alt={proj.title} />
                  </div>

                  <div className="project-content p-4">
                    <h4 className="text-primary-blue fw-bold fs-4 mb-2" style={{ color: '#0d2d5c' }}>{proj.title}</h4>
                    <p className="mb-1" style={{ color: '#556b8e' }}>{proj.location || proj.place}</p>
                    <span className="text-theme fw-medium fs-6">{proj.country || 'Saudi Arabia'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};

export default Projects;
