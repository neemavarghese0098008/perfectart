import React from 'react';
import Hero from '../components/Hero';
import CounterSection from '../components/CounterSection';
import AboutSection from '../components/AboutSection';
import MarqueeSection from '../components/MarqueeSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedCapabilities from '../components/FeaturedCapabilities';
import FeaturedProjects from '../components/FeaturedProjects';
import ClientsSection from '../components/ClientsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IndustriesSection from '../components/IndustriesSection';
import CitiesSection from '../components/CitiesSection';
import FAQSection from '../components/FAQSection';
import BlogSection from '../components/BlogSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <CounterSection />
      <AboutSection />
      <MarqueeSection />
      <ServicesSection />
      <FeaturedCapabilities />
      <FeaturedProjects />
      <ClientsSection />
      <TestimonialsSection />
      <IndustriesSection />
      <CitiesSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </main>
  );
};

export default Home;
