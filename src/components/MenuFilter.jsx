import React from 'react';

const MenuFilter = ({ categories, activeCategory, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <button
        onClick={() => onFilterChange('All')}
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
          activeCategory === 'All'
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
            activeCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MenuFilter;
