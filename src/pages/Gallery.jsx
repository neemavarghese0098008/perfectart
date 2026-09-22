import React, { useState, useEffect } from 'react';
import { getGallery } from '../services/api';

const initialGalleryItems = [
  { id: 1, cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_1.jpg', title: 'Luxury Commercial Fit-Out' },
  { id: 2, cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_2.jpg', title: 'Interior Architecture Execution' },
  { id: 3, cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_2_3.jpg', title: 'Corporate Headquarters Office' },
  { id: 4, cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_2_4.jpg', title: 'Executive Boardroom Interiors' },
  { id: 5, cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_2_5.jpg', title: 'Retail Storefront & Joinery' },
  { id: 6, cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_2_6.jpg', title: 'F&B Dining Space Fit-Out' },
  { id: 7, cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_2_7.jpg', title: 'Custom Villa Living Interior' },
  { id: 8, cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_2_8.jpg', title: 'Master Bedroom Custom Cabinetry' },
  { id: 9, cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_2_9.jpg', title: 'Acoustic Ceiling & Lighting' },
  { id: 10, cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_5_1.jpg', title: 'Modern Office Reception Area' },
  { id: 11, cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_5_2.jpg', title: 'High-End Retail Display Cabinets' },
  { id: 12, cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_5_3.jpg', title: 'Private Villa Bespoke Kitchen' },
  { id: 13, cat: 'fitout', src: '/reactdemo/assets/img/gallery/gallery_7_1.jpg', title: 'Health Club & Spa Interior' },
  { id: 14, cat: 'corporate', src: '/reactdemo/assets/img/gallery/gallery_7_2.jpg', title: 'Executive Conference Suite' },
  { id: 15, cat: 'retail', src: '/reactdemo/assets/img/gallery/gallery_8_1.jpg', title: 'Boutique Showroom Fit-Out' },
  { id: 16, cat: 'villa', src: '/reactdemo/assets/img/gallery/gallery_9_1.jpg', title: 'Luxury Residential Dining Concept' }
];

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);

  useEffect(() => {
    let isMounted = true;
    const fetchPhotos = async () => {
      const data = await getGallery();
      if (isMounted && data && data.length > 0) {
        setGalleryItems(data);
      }
    };
    fetchPhotos();
    return () => { isMounted = false; };
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'fitout', label: 'Interior Fit-Out' },
    { id: 'corporate', label: 'Corporate Offices' },
    { id: 'retail', label: 'Retail & F&B' },
    { id: 'villa', label: 'Villa & Residential' }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === selectedFilter || item.category === selectedFilter);

  return (
    <main className="gallery-page">
      
      {/* Banner */}
      <section className="page-hero py-5 bg-white-section text-center position-relative" style={{ borderBottom: '1px solid rgba(13,45,92,0.15)', backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <span className="sub-title text-primary-blue fw-bold text-uppercase tracking-wider" style={{ color: '#0d2d5c' }}>
            Visual Portfolio
          </span>
          <h1 className="display-4 fw-bold text-primary-blue mt-2" style={{ color: '#0d2d5c' }}>
            Project <span className="text-theme">Photo Gallery</span>
          </h1>
          <p className="fs-5 mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: '#556b8e' }}>
            Browse authentic site photography showcasing our interior fit-out craftsmanship, corporate offices, retail spaces, and luxury residential projects across Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 bg-white-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid">

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`th-btn py-2 px-4 ${selectedFilter === tab.id ? 'bg-warning text-dark border-warning fw-bold' : 'bg-white text-primary-blue'}`}
                style={{
                  border: '1px solid rgba(13, 45, 92, 0.2)',
                  color: selectedFilter === tab.id ? '#0d1721' : '#0d2d5c'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                <div 
                  className="gallery-card bg-white-card rounded overflow-hidden hover-zoom-img cursor-pointer"
                  style={{ height: '260px', position: 'relative', border: '1px solid rgba(13, 45, 92, 0.15)', boxShadow: '0 8px 25px rgba(13, 45, 92, 0.08)' }}
                  onClick={() => setActiveImage(item)}
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/reactdemo/assets/img/gallery/gallery_2_1.jpg';
                    }}
                  />
                  <div 
                    className="gallery-overlay position-absolute bottom-0 start-0 end-0 p-3"
                    style={{ background: 'linear-gradient(to top, rgba(13,23,33,0.9), transparent)' }}
                  >
                    <h5 className="text-white fw-bold fs-6 m-0">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }}
          onClick={() => setActiveImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-white p-3" style={{ border: '1px solid rgba(13, 45, 92, 0.2)', boxShadow: '0 15px 40px rgba(13, 45, 92, 0.15)' }}>
              <div className="modal-header border-0 pb-0 justify-content-between">
                <h5 className="fw-bold m-0" style={{ color: '#0d2d5c' }}>{activeImage.title}</h5>
                <button type="button" className="btn-close" onClick={() => setActiveImage(null)}>✕</button>
              </div>
              <div className="modal-body text-center p-3">
                <img src={activeImage.src} alt={activeImage.title} className="img-fluid rounded max-h-75vh" style={{ maxHeight: '75vh' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
