import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedMenu from '../components/Featured-manue';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* Featured Menu Items */}
      <FeaturedMenu />      
      {/* About Section */}
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Home;
