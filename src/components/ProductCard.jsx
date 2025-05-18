import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Add safety check for price
  const formattedPrice = product && product.prix !== undefined && product.prix !== null
    ? `$${Number(product.prix).toFixed(2)}`
    : 'Price not available';

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 dark:text-darkText">
      <Link to={`/products/${product.id_produit}`}>
        <img 
          src={product.image_principale || 'https://via.placeholder.com/300?text=No+Image'} 
          alt={product.nom_produit} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id_produit}`}>
          <h3 className="text-lg font-medium text-dark dark:text-darkText mb-2">{product.nom_produit}</h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description_courte || (product.description_complete && product.description_complete.substring(0, 100)) || 'No description available'}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{formattedPrice}</span>
          
          <button 
            onClick={handleAddToCart}
            className="bg-secondary hover:bg-primary text-white px-3 py-1 rounded-md transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;