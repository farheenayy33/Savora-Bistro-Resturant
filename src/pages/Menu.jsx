import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MenuItemCard from '../components/MenuItemCard';
import MenuFilter from '../components/MenuFilter';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedSection from '../components/AnimatedSection';
const Menu = () => {
  const { menuItems, cart, removeFromCart, updateCartQuantity, getCartTotal, showCart, setShowCart, showToastMessage, clearCart } = useApp();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map(item => item.category))];
    return cats;
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === activeCategory);
  }, [menuItems, activeCategory]);

  const cartTotal = getCartTotal();

  const handleCheckout = () => {
    showToastMessage('🎉 Congratulations! Your order has been placed successfully!');
    clearCart();
    setShowCart(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection animation="fadeSlideUp">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Menu
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our delicious selection of dishes
            </p>
          </div>
        </AnimatedSection>

        {/* Cart Toggle Button */}
        {cart.length > 0 && (
          <AnimatedSection animation="fadeSlideUp" delay={0.1}>
            <div className="mb-6 text-center">
              <AnimatedButton
                onClick={() => setShowCart(!showCart)}
                variant="primary"
              >
                {showCart ? 'Hide' : 'View'} Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
              </AnimatedButton>
            </div>
          </AnimatedSection>
        )}

        {/* Cart Sidebar */}
        {showCart && cart.length > 0 && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowCart(false)}
            ></div>
            <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-up">
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">🛒 Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">${item.price.toFixed(2)} each</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2 text-gray-600 pb-2">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-gray-600 pb-4 border-b">
                    <span>Items: {cart.reduce((total, item) => total + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-orange-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <AnimatedButton variant="primary" className="w-full mb-2" onClick={handleCheckout}>
                    Proceed to Checkout
                  </AnimatedButton>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Filter */}
        <AnimatedSection animation="fadeSlideUp" delay={0.15}>
          <MenuFilter
            categories={categories}
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
        </AnimatedSection>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {activeCategory === 'All'
                ? 'No menu items available yet.'
                : `No items in ${activeCategory} category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} animation="scaleUp" delay={index * 0.05}>
                <MenuItemCard item={item} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
