import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';

import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Manufacturing from './pages/Manufacturing';
import PaceLifts from './pages/PaceLifts';
import Contact from './pages/Contact';
import Quote from './pages/Quote';

import DesignBuild from './pages/services/DesignBuild';
import InteriorBuild from './pages/services/InteriorBuild';
import InteriorFitOut from './pages/services/InteriorFitOut';
import MEPWorks from './pages/services/MEPWorks';
import CustomInteriorFurniture from './pages/services/CustomInteriorFurniture';
import KitchenCabinets from './pages/services/KitchenCabinets';
import Bedroom from './pages/services/Bedroom';
import LivingRoom from './pages/services/LivingRoom';
import DiningRoom from './pages/services/DiningRoom';
import KidsRoom from './pages/services/KidsRoom';

import RetailProjects from './pages/portfolio/RetailProjects';
import FnbProjects from './pages/portfolio/FnbProjects';
import CorporateProjects from './pages/portfolio/CorporateProjects';
import HealthClubsSpaProjects from './pages/portfolio/HealthClubsSpaProjects';
import HospitalityProjects from './pages/portfolio/HospitalityProjects';
import VillaResidentialProjects from './pages/portfolio/VillaResidentialProjects';

// Admin Imports
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProjectsCategoryPage from './admin/pages/ProjectsCategoryPage';
import TestimonialsPage from './admin/pages/TestimonialsPage';
import ArticlesPage from './admin/pages/ArticlesPage';
import GalleryPage from './admin/pages/GalleryPage';
import ContactPage from './admin/pages/ContactPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 320);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

// Public Website Layout wrapper preserving existing styles exactly
const PublicLayout = () => {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0b131b' }}>
      <TopBar />
      <Navbar />
      <div className="content-wrapper" style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <BackToTop />
        <Routes>
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin CMS Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects/retail" element={<ProjectsCategoryPage explicitCategory="retail" />} />
            <Route path="projects/fnb" element={<ProjectsCategoryPage explicitCategory="fnb" />} />
            <Route path="projects/corporate-office" element={<ProjectsCategoryPage explicitCategory="corporate-office" />} />
            <Route path="projects/health-club-spa" element={<ProjectsCategoryPage explicitCategory="health-club-spa" />} />
            <Route path="projects/hospitality" element={<ProjectsCategoryPage explicitCategory="hospitality" />} />
            <Route path="projects/villa-residential" element={<ProjectsCategoryPage explicitCategory="villa-residential" />} />
            <Route path="projects/:categorySlug" element={<ProjectsCategoryPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="inquiries" element={<ContactPage />} />
          </Route>

          {/* Public Website Routes (Wrapped with original TopBar, Navbar, Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/design-build" element={<DesignBuild />} />
            <Route path="/services/interior-build" element={<InteriorBuild />} />
            <Route path="/services/interior-fit-out" element={<InteriorFitOut />} />
            <Route path="/services/mep-works" element={<MEPWorks />} />
            <Route path="/services/custom-interior-furniture" element={<CustomInteriorFurniture />} />
            <Route path="/services/kitchen-cabinets" element={<KitchenCabinets />} />
            <Route path="/services/bedroom" element={<Bedroom />} />
            <Route path="/services/living-room" element={<LivingRoom />} />
            <Route path="/services/dining-room" element={<DiningRoom />} />
            <Route path="/services/kids-room" element={<KidsRoom />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio/retail" element={<RetailProjects />} />
            <Route path="/portfolio/fnb" element={<FnbProjects />} />
            <Route path="/portfolio/corporate" element={<CorporateProjects />} />
            <Route path="/portfolio/health-clubs-spa" element={<HealthClubsSpaProjects />} />
            <Route path="/portfolio/hospitality" element={<HospitalityProjects />} />
            <Route path="/portfolio/villa-residential" element={<VillaResidentialProjects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/pace-lifts" element={<PaceLifts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
