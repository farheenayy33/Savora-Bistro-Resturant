import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { adminLoggedIn, logoutAdmin, cart, showCart, setShowCart } = useApp();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate('/menu');
    setShowCart(true);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Savora Bistro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
            {adminLoggedIn && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {adminLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition-colors duration-300 font-medium"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-orange-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300"
            >
              Menu
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300"
            >
              Contact
            </Link>
            {adminLoggedIn && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300"
              >
                Admin
              </Link>
            )}
            <button
              onClick={() => {
                handleCartClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300"
            >
              Cart ({cartItemCount})
            </button>
            {adminLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
