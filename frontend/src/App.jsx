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
import ProjectDetail from './pages/ProjectDetail';
import { BlogList, BlogDetail } from './pages/Blog';

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
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <BackToTop />
        <Routes>
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
            <Route path="/portfolio" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/portfolio/retail" element={<RetailProjects />} />
            <Route path="/portfolio/fnb" element={<FnbProjects />} />
            <Route path="/portfolio/corporate" element={<CorporateProjects />} />
            <Route path="/portfolio/health-clubs-spa" element={<HealthClubsSpaProjects />} />
            <Route path="/portfolio/hospitality" element={<HospitalityProjects />} />
            <Route path="/portfolio/villa-residential" element={<VillaResidentialProjects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/pace-lifts" element={<PaceLifts />} />
            <Route path="/pace-ELEVATORS/" element={<PaceLifts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
