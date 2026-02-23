import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white py-16 md:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Welcome to Savora Bistro 🍽️
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl animate-slide-up">
              Experience fine dining at its best. Fresh ingredients, exquisite flavors, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-slide-up">
              <Link to="/menu">
                <AnimatedButton variant="secondary" className="text-lg">
                  View Menu
                </AnimatedButton>
              </Link>
              <Link to="/contact">
                <AnimatedButton variant="primary" className="text-lg bg-white text-orange-600 hover:bg-orange-50">
                  Book a Table
                </AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Right - Animated Food Image */}
          <div className="flex-1 hidden md:flex justify-center items-center animate-fade-in">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop"
                alt="Delicious Food"
                className="relative w-full drop-shadow-2xl rounded-lg"
                style={{
                  animation: 'float 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
