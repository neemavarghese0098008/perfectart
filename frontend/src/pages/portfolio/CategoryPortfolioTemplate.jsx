import React, { useState, useEffect } from 'react';
import { getProjectsByCategory } from '../../services/api';
import { Link } from 'react-router-dom';
import { slugify } from '../../services/api';

const CategoryPortfolioTemplate = ({ categoryId, pageTitle, pageDescription }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProjectsByCategory(categoryId);
        if (isMounted) setProjects(data);
      } catch (requestError) {
        if (isMounted) setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProjects();
    return () => { isMounted = false; };
  }, [categoryId]);

  return (
    <main className="portfolio-category-page">
      {/* Page Hero Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Our Portfolio
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            {pageTitle}
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">
          {loading ? <p className="text-center py-5">Loading projects...</p> : error ? (
            <div className="alert alert-danger text-center">Unable to load projects. <button type="button" className="btn btn-link" onClick={() => window.location.reload()}>Retry</button></div>
          ) : projects.length > 0 ? (
            <div className="row g-4">
              {projects.map((proj) => (
                <div key={proj.id} className="col-lg-4 col-md-6">
                  <Link to={`/projects/${proj.id}-${slugify(proj.title)}`} className="project-card bg-white-card rounded overflow-hidden h-100 transition-all hover-up d-block text-decoration-none" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                    <div className="project-image position-relative" style={{ height: '280px', overflow: 'hidden' }}>
                      <img loading="lazy" src={proj.img} className="img-fluid w-100 h-100 object-fit-cover" alt={proj.title} />
                    </div>

                    <div className="project-content p-4">
                      <h4 className="text-primary-blue fw-bold fs-4 mb-2" style={{ color: '#0d2d5c' }}>{proj.title}</h4>
                      <p className="mb-1" style={{ color: '#556b8e' }}>{proj.location || proj.place}</p>
                      <span className="text-theme fw-medium fs-6">{proj.country || 'Saudi Arabia'}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="text-primary-blue fw-bold mb-3" style={{ color: '#0d2d5c' }}>Projects Coming Soon</h3>
              <p style={{ color: '#556b8e' }}>We are currently updating our portfolio for this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPortfolioTemplate;
