import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float-1">🍕</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-2">🍔</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-float-3">🍜</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float-1">🍽️</div>
        <div className="absolute top-1/3 left-1/4 text-4xl opacity-20 animate-float-2">🥗</div>
        <div className="absolute top-1/2 right-1/3 text-4xl opacity-20 animate-float-3">🍰</div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{
              animation: isVisible ? 'fadeSlideUp 1s ease-out 0.3s forwards' : 'none',
              opacity: 0,
            }}
          >
            Delicious Food For Your Life
          </h1>

          <p
            className="text-gray-200 mt-6 text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{
              animation: isVisible ? 'fadeSlideUp 1s ease-out 0.6s forwards' : 'none',
              opacity: 0,
            }}
          >
            Experience fine dining at its best. Fresh ingredients, exquisite flavors, and exceptional service crafted with love for you.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            style={{
              animation: isVisible ? 'fadeSlideUp 1s ease-out 0.9s forwards' : 'none',
              opacity: 0,
            }}
          >
            <Link to="/menu">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30">
                View Menu
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Book A Table
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float-1 {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float 4s ease-in-out infinite 0.5s;
        }
        .animate-float-3 {
          animation: float 3.5s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
