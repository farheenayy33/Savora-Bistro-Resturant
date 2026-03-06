import React from 'react'
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import MenuItemCard from '../components/MenuItemCard';
import AnimatedSection from '../components/AnimatedSection';

const FeaturedMenu = () => {
  const { menuItems } = useApp();
  const featuredItems = menuItems.slice(0, 3);
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeSlideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Dishes
              </h2>
              <p className="text-gray-600 text-lg">
                Discover our chef's special selections
              </p>
            </div>
          </AnimatedSection>

          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredItems.map((item, index) => (
                <AnimatedSection key={item.id} animation="scaleUp" delay={index * 0.1}>
                  <MenuItemCard item={item} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No menu items available yet.</p>
              <Link to="/admin">
                <AnimatedButton variant="primary">Add Menu Items</AnimatedButton>
              </Link>
            </div>
          )}

          <AnimatedSection animation="fadeSlideUp" delay={0.3}>
            <div className="text-center">
              <Link to="/menu">
                <AnimatedButton variant="primary" className="text-lg">
                  View Full Menu
                </AnimatedButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}

export default FeaturedMenu
