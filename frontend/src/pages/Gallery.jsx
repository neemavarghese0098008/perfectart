import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, categoryLabel, slugify } from '../services/api';

const filters = [
  ['all', 'All Photos'], ['retail', 'Retails and F&B'], ['fnb', 'Retails and F&B'],
  ['corporate', 'Corporate Offices'], ['spa', 'Health Clubs & Spa'],
  ['hospitality', 'Hospitality'], ['residential', 'Villa & Residential']
];
export default function Gallery() {
  const [filter, setFilter] = useState('all'); const [projects, setProjects] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let alive = true; getProjects().then((data) => alive && setProjects(data)).catch((e) => alive && setError(e.message)).finally(() => alive && setLoading(false)); return () => { alive = false; }; }, []);
  const filtered = projects.filter((project) => filter === 'all' || project.category === filter || (filter === 'retail' && project.category === 'fnb'));
  const uniqueFilters = filters.filter((tab, i) => i === 0 || tab[0] !== 'fnb');
  return <main className="gallery-page"><section className="page-hero py-5 text-center" style={{ borderBottom: '1px solid rgba(13,45,92,.15)', background: '#fff' }}><div className="container py-4"><span className="text-uppercase fw-bold" style={{ color: '#0d2d5c' }}>Visual Portfolio</span><h1 className="display-4 fw-bold mt-2" style={{ color: '#0d2d5c' }}>Project <span className="text-theme">Gallery</span></h1><p className="fs-5 mt-3" style={{ color: '#556b8e' }}>Explore completed work from across our project portfolio.</p></div></section><section className="py-5" style={{ background: '#fff' }}><div className="container-fluid"><div className="d-flex flex-wrap justify-content-center gap-2 mb-5">{uniqueFilters.map(([id, label]) => <button key={id} type="button" onClick={() => setFilter(id)} className={`th-btn py-2 px-4 ${filter === id ? 'bg-warning text-dark' : 'bg-white text-primary-blue'}`} style={{ border: '1px solid rgba(13,45,92,.2)' }}>{label}</button>)}</div>{loading && <p className="text-center py-5">Loading projects…</p>}{error && <p className="alert alert-danger text-center">Unable to load projects: {error}</p>}{!loading && !error && !filtered.length && <p className="text-center py-5">No projects in this category yet.</p>}<div className="row g-4">{filtered.map((project) => <div key={project.id} className="col-lg-4 col-md-6"><Link to={`/projects/${project.id}-${slugify(project.title)}`} className="d-block h-100 text-decoration-none rounded overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(13,45,92,.15)', boxShadow: '0 10px 30px rgba(13,45,92,.08)' }}><img loading="lazy" src={project.img || '/assets/img/og-image.png'} alt={project.title} className="w-100" style={{ height: 280, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/assets/img/og-image.png'; }} /><div className="p-3"><h2 className="h5 fw-bold mb-1" style={{ color: '#0d2d5c' }}>{project.title}</h2><span className="text-theme">{categoryLabel(project.category)}</span></div></Link></div>)}</div></div></section></main>;
}
