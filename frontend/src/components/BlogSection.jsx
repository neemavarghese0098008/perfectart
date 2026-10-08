import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getArticles();
        if (isMounted) setBlogs(data);
      } catch (requestError) {
        if (isMounted) setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchNews();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="overflow-hidden space py-5 bg-white-section" id="blog-sec" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        
        <div className="row justify-content-center mb-4">
          <div className="col-lg-9 col-xxl-7">
            <div className="title-area mb-3 text-center">
              <h2 className="sec-title split-text text-primary-blue display-6 fw-bold" style={{ color: '#0d2d5c' }}>
                Browse Our Latest <span className="text-theme">Articles &amp; News</span>
              </h2>
            </div>
          </div>
        </div>

        {loading && <p className="text-center py-5">Loading articles...</p>}
        {!loading && error && <div className="alert alert-danger text-center">Unable to load articles. <button type="button" className="btn btn-link" onClick={() => window.location.reload()}>Retry</button></div>}
        {!loading && !error && <div className="row gy-4 gx-4">
          {blogs.map((blog, idx) => (
            <div key={idx} className="col-lg-6">
              <div className="blog-card bg-white-card p-4 rounded h-100 d-flex flex-column" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="box-img global-img rounded overflow-hidden mb-3" style={{ height: '260px' }}>
                  <img src={blog.img} alt={blog.title} className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
                <div className="box-content flex-grow-1">
                  <h3 className="box-title text-primary-blue fw-bold fs-4 mb-3" style={{ lineHeight: '1.4', color: '#0d2d5c' }}>
                    <Link to={`/blog/${blog.slug}`} className="text-decoration-none" style={{ color: '#0d2d5c' }}>{blog.title}</Link>
                  </h3>
                </div>
                <div className="box-wrapp d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(13, 45, 92, 0.15)' }}>
                  <span className="date fs-6" style={{ color: '#556b8e' }}>{blog.date}</span>
                  <Link to={`/blog/${blog.slug}`} className="th-btn style3 py-2 px-3">
                    Read More <i className="fa-regular fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>}

      </div>
    </section>
  );
};

export default BlogSection;
