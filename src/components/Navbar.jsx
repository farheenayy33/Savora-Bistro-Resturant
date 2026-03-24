import React, { memo, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Extracted NavLink component for reusability
const NavLink = memo(({ to, label, onClick, activeMobile }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-semibold text-lg"
  >
    {label}
  </Link>
));

NavLink.displayName = 'NavLink';

// Extracted MobileNavLink component
const MobileNavLink = memo(({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300 font-semibold text-lg"
  >
    {label}
  </Link>
));

MobileNavLink.displayName = 'MobileNavLink';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { adminLoggedIn, logoutAdmin, cart } = useApp();
  const navigate = useNavigate();

  // Memoize cart item count calculation
  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const handleCartClick = () => {
    navigate('/cart');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

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
            <NavLink to="/" label="Home" />
            <NavLink to="/menu" label="Menu" />
            <NavLink to="/contact" label="Contact" />
            {adminLoggedIn && <NavLink to="/admin" label="Admin" />}
            
            <button
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-orange-500 transition-colors duration-300 font-semibold text-lg"
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
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-orange-500 focus:outline-none"
            aria-label="Toggle menu"
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
            <MobileNavLink to="/" label="Home" onClick={closeMobileMenu} />
            <MobileNavLink to="/menu" label="Menu" onClick={closeMobileMenu} />
            <MobileNavLink to="/contact" label="Contact" onClick={closeMobileMenu} />
            {adminLoggedIn && (
              <MobileNavLink to="/admin" label="Admin" onClick={closeMobileMenu} />
            )}
            
            <button
              onClick={handleCartClick}
              className="block w-full text-left px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-300 font-semibold text-lg"
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

export default memo(Navbar);
