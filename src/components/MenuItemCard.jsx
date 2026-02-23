import React from 'react';
import { useApp } from '../context/AppContext';
import AnimatedButton from './AnimatedButton';

const MenuItemCard = ({ item }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-orange-600 font-bold">${item.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <AnimatedButton
          onClick={handleAddToCart}
          variant="primary"
          className="w-full"
        >
          Add to Cart
        </AnimatedButton>
      </div>
    </div>
  );
};

export default MenuItemCard;
