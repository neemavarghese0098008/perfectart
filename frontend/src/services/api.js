const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const API_BASE_URL = `${API_ORIGIN}/api`;
const PUBLIC_ORIGIN = (import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '');
const PUBLIC_BASE_PATH = (import.meta.env.VITE_PUBLIC_BASE_PATH || import.meta.env.BASE_URL || '/').replace(/\\/g, '/').replace(/\/?$/, '/');

const requestJSON = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
};

export const resolveImageUrl = (img) => {
  if (!img || typeof img !== 'string') return '';

  const value = img.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) return value;

  const normalized = value.startsWith('/') ? value : `/${value}`;

  if (normalized.startsWith('/uploads')) {
    return `${API_ORIGIN}${normalized}`;
  }

  const publicRelative = normalized.replace(/^\/+/, '');
  return `${PUBLIC_ORIGIN}${PUBLIC_BASE_PATH}${publicRelative}`;
};

export const getProjects = async (category = '') => {
  const url = category && category !== 'all'
    ? `${API_BASE_URL}/projects?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/projects`;
  const data = await requestJSON(url);
  return data.data.map((project) => ({
    ...project,
    cat: project.category,
    location: `${project.place}, ${project.country || 'Saudi Arabia'}`,
    img: resolveImageUrl(project.img), images: parseImages(project.images), categoryLabel: project.category_label || categoryLabel(project.category)
  }));
};

const parseImages = (images) => {
  if (Array.isArray(images)) return images.map(resolveImageUrl);
  try { return JSON.parse(images || '[]').map(resolveImageUrl); } catch { return []; }
};
export const categoryLabel = (category) => ({ retail: 'Retails and F&B', fnb: 'Retails and F&B', corporate: 'Corporate Offices', spa: 'Health Clubs & Spa', hospitality: 'Hospitality', residential: 'Villa & Residential' }[category] || category || 'Uncategorised');
export const getProject = async (id) => {
  const response = await requestJSON(`${API_BASE_URL}/projects/${encodeURIComponent(id)}`);
  const project = response.data;
  return { ...project, img: resolveImageUrl(project.img), images: parseImages(project.images), categoryLabel: categoryLabel(project.category) };
};

export const getProjectsByCategory = async (category) => {
  const data = await requestJSON(`${API_BASE_URL}/projects/category/${encodeURIComponent(category)}`);
  return data.data.map((project) => ({
    ...project,
    cat: project.category,
    location: `${project.place}, ${project.country || 'Saudi Arabia'}`,
    img: resolveImageUrl(project.img)
  }));
};

export const getFeaturedProjects = async () => {
  const data = await requestJSON(`${API_BASE_URL}/projects?featured=1`);
  return data.data.map((project) => ({
    title: project.title,
    category: project.category_label || project.category,
    location: `${project.place}, ${project.country}`,
    img: resolveImageUrl(project.img)
  }));
};

export const getTestimonials = async () => {
  const data = await requestJSON(`${API_BASE_URL}/testimonials?activeOnly=true`);
  return data.data.map((testimonial) => ({
    name: testimonial.name,
    role: testimonial.role,
    text: testimonial.message
  }));
};

export const getArticles = async () => {
  const data = await requestJSON(`${API_BASE_URL}/articles?status=published`);
  return data.data.map((article) => ({ ...article, img: resolveImageUrl(article.img), slug: article.slug || slugify(article.title) }));
};
export const getArticle = async (slug) => {
  const response = await requestJSON(`${API_BASE_URL}/articles/${encodeURIComponent(slug)}`);
  const article = response.data;
  return { ...article, img: resolveImageUrl(article.img), images: parseImages(article.images), slug: article.slug || slugify(article.title), content: article.content || article.description };
};
export const slugify = (value = '') => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getGallery = async (category = 'all') => {
  const url = category && category !== 'all'
    ? `${API_BASE_URL}/gallery?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/gallery`;
  const data = await requestJSON(url);
  return data.data.map((item) => ({
    id: item.id,
    cat: item.category,
    title: item.title,
    src: resolveImageUrl(item.src)
  }));
};

export const getContactInfo = async () => {
  const data = await requestJSON(`${API_BASE_URL}/contact`);
  return data.data;
};

export const submitContactInquiry = (formData) => requestJSON(`${API_BASE_URL}/contact/inquiry`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

export const submitVendorRegistration = (formData) => requestJSON(`${API_BASE_URL}/vendor-registrations`, {
  method: 'POST', body: formData
});

export const submitQuoteRequest = (formData) => requestJSON(`${API_BASE_URL}/contact/quote`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

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
