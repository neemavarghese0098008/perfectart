import { projectData as fallbackProjects } from '../data/projects';

const API_BASE_URL = 'http://localhost:5000/api';

const fallbackTestimonials = [
  {
    name: 'Michael',
    role: 'Commercial Client',
    text: 'Throughout the project, the team was incredibly responsive and professional. They kept me informed about the progress, answered any questions I had, and provided valuable guidance along the way. Their attention to detail was exceptional, ensuring that every aspect of the design was meticulously executed.'
  },
  {
    name: 'John',
    role: 'Corporate Client',
    text: 'First and foremost, the team took the time to understand my vision and personal style. They asked thoughtful questions and really listened to my needs and preferences. This initial consultation gave me confidence that they would be able to create a space that reflected my personality and met my functional requirements.'
  },
  {
    name: 'Sandra',
    role: 'Villa & Residential Client',
    text: "Once the design phase began, I was blown away by the team's creativity. They presented me with a range of ideas, color schemes, and furniture options that perfectly captured the look and feel I had envisioned. Their ability to combine different elements and create a cohesive design was truly impressive."
  }
];

const fallbackArticles = [
  {
    title: "Vision 2030 and the Interior Fit-Out Boom: What Saudi Arabia's Construction Market Looks Like Right Now",
    date: 'Aug 27, 2025',
    img: '/reactdemo/assets/img/blog/blog_1_1.jpg'
  },
  {
    title: 'Custom Interiors and Furniture in Riyadh: Designed for Your Home, Built in Our Own Workshop',
    date: 'Aug 27, 2025',
    img: '/reactdemo/assets/img/blog/blog_1_2.jpg'
  }
];

const fallbackGallery = [
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

const fallbackContact = {
  address: 'Building 3547, Hafsah Bint Omar, Al Nahdah District, Riyadh 13221, Kingdom of Saudi Arabia',
  phone_primary: '+966 57 979 7607',
  phone_secondary: '+966 11 456 0555',
  email: 'info@perfectartcontracting.com',
  whatsapp: '+966579797607',
  map_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.577265882329!2d46.77258957608821!3d24.707106451480112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f038f830bbefb%3A0x8e8331d22227d884!2sHafsah%20Bint%20Omar%2C%20Al%20Nahdah%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
  facebook_url: 'https://www.facebook.com/',
  twitter_url: 'https://www.twitter.com/',
  linkedin_url: 'https://www.linkedin.com/',
  youtube_url: 'https://www.youtube.com/'
};

// Image URL Resolver
export const resolveImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads')) return `http://localhost:5000${img}`;
  return img;
};

// Projects API
export const getProjects = async (category = '') => {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE_URL}/projects?category=${category}`
      : `${API_BASE_URL}/projects`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(p => ({
        ...p,
        cat: p.category,
        location: `${p.place}, ${p.country || 'Saudi Arabia'}`,
        img: resolveImageUrl(p.img)
      }));
    }
    return fallbackProjects;
  } catch (err) {
    console.warn('Backend unavailable, falling back to static projects:', err.message);
    return fallbackProjects;
  }
};

export const getProjectsByCategory = async (category) => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/category/${category}`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(p => ({
        ...p,
        cat: p.category,
        location: `${p.place}, ${p.country || 'Saudi Arabia'}`,
        img: resolveImageUrl(p.img)
      }));
    }
    return fallbackProjects.filter(p => p.cat === category);
  } catch (err) {
    console.warn(`Backend unavailable for category ${category}, using fallback:`, err.message);
    return fallbackProjects.filter(p => p.cat === category);
  }
};

export const getFeaturedProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects?featured=1`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(p => ({
        title: p.title,
        category: p.category_label || p.category,
        location: `${p.place}, ${p.country || 'Saudi Arabia'}`,
        img: resolveImageUrl(p.img)
      }));
    }
  } catch (err) {
    console.warn('Using fallback featured projects:', err.message);
  }
  return [
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
  ];
};

// Testimonials API
export const getTestimonials = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials?activeOnly=true`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(t => ({
        name: t.name,
        role: t.role,
        text: t.message
      }));
    }
  } catch (err) {
    console.warn('Using fallback testimonials:', err.message);
  }
  return fallbackTestimonials;
};

// Articles API
export const getArticles = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/articles?status=published`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(a => ({
        ...a,
        img: resolveImageUrl(a.img)
      }));
    }
  } catch (err) {
    console.warn('Using fallback articles:', err.message);
  }
  return fallbackArticles;
};

// Gallery API
export const getGallery = async (category = 'all') => {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE_URL}/gallery?category=${category}`
      : `${API_BASE_URL}/gallery`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      return data.data.map(g => ({
        id: g.id,
        cat: g.category,
        title: g.title,
        src: resolveImageUrl(g.src)
      }));
    }
  } catch (err) {
    console.warn('Using fallback gallery:', err.message);
  }
  return fallbackGallery;
};

// Contact API
export const getContactInfo = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`);
    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn('Using fallback contact info:', err.message);
  }
  return fallbackContact;
};

// Inquiry & Quote Submissions
export const submitContactInquiry = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/contact/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

export const submitQuoteRequest = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/contact/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

export default {
  resolveImageUrl,
  getProjects,
  getProjectsByCategory,
  getFeaturedProjects,
  getTestimonials,
  getArticles,
  getGallery,
  getContactInfo,
  submitContactInquiry,
  submitQuoteRequest
};
