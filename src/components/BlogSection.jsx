import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([
    {
      title: 'Vision 2030 and the Interior Fit-Out Boom: What Saudi Arabia\'s Construction Market Looks Like Right Now',
      date: 'Aug 27, 2025',
      img: '/reactdemo/assets/img/blog/blog_1_1.jpg'
    },
    {
      title: 'Custom Interiors and Furniture in Riyadh: Designed for Your Home, Built in Our Own Workshop',
      date: 'Aug 27, 2025',
      img: '/reactdemo/assets/img/blog/blog_1_2.jpg'
    }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      const data = await getArticles();
      if (isMounted && data && data.length > 0) {
        setBlogs(data);
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

        <div className="row gy-4 gx-4">
          {blogs.map((blog, idx) => (
            <div key={idx} className="col-lg-6">
              <div className="blog-card bg-white-card p-4 rounded h-100 d-flex flex-column" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 10px 30px rgba(13, 45, 92, 0.08)' }}>
                <div className="box-img global-img rounded overflow-hidden mb-3" style={{ height: '260px' }}>
                  <img src={blog.img} alt={blog.title} className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
                <div className="box-content flex-grow-1">
                  <h3 className="box-title text-primary-blue fw-bold fs-4 mb-3" style={{ lineHeight: '1.4', color: '#0d2d5c' }}>
                    {blog.title}
                  </h3>
                </div>
                <div className="box-wrapp d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(13, 45, 92, 0.15)' }}>
                  <span className="date fs-6" style={{ color: '#556b8e' }}>{blog.date}</span>
                  <Link to="/contact" className="th-btn style3 py-2 px-3">
                    Read More <i className="fa-regular fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
