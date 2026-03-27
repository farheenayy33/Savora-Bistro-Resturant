import React, { memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import AnimatedButton from './AnimatedButton';

const MenuItemCard = memo(({ item }) => {
  const { addToCart } = useApp();

  const handleAddToCart = useCallback(() => {
    addToCart(item);
  }, [item, addToCart]);

  const handleImageError = useCallback((e) => {
    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
  }, []);

  return (
    <div className="card overflow-hidden group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden h-72 bg-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-orange-600 font-bold">${Number(item.price).toFixed(2)}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{item.description}</p>
        <AnimatedButton
          onClick={handleAddToCart}
          variant="primary"
          className="w-full"
          ariaLabel={`Add ${item.name} to cart`}
        >
          Add to Cart
        </AnimatedButton>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Optimize re-render: only update if item changes
  return prevProps.item.id === nextProps.item.id &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.image === nextProps.item.image;
});

MenuItemCard.displayName = 'MenuItemCard';

export default MenuItemCard;
