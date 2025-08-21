import React, { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from '../contexts/ThemeContext';

const ProductCard = ({ product }) => {
  const { darkMode } = useContext(ThemeContext);

  // Fallback for missing product data to prevent crashes
  if (!product) {
    return null;
  }

  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <LazyLoadImage
        alt={product.name || 'Product Image'}
        src={product.imageUrl || 'https://via.placeholder.com/300'} // Fallback image
        effect="blur"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className={`text-lg font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name || 'Product Name'}
        </h3>
        <p className={`text-sm mt-1 truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {product.description || 'No description available.'}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </span>
          <button className={`px-3 py-1 text-sm font-semibold rounded-md transition ${darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;