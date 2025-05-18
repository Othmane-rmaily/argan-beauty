import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductService from '../services/product';
import CategoryService from '../services/category';
import zellijPattern from '../assets/zellij-pattern.png';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-darkBg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center dark:bg-darkBg">
        <p className="text-xl text-red-500">{error || 'Product not found'}</p>
      </div>
    );
  }

  // Add safety check for price
  const formattedPrice = product && product.prix !== undefined && product.prix !== null
    ? `$${Number(product.prix).toFixed(2)}`
    : 'Price not available';

  return (
    <div className="bg-light dark:bg-darkBg min-h-screen pt-24 pb-12 relative transition-colors duration-300">
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: `url(${zellijPattern})` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white dark:bg-darkCard rounded-lg shadow-lg overflow-hidden p-6 md:p-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img 
                src={product.image_principale || 'https://via.placeholder.com/600x400?text=No+Image'} 
                alt={product.nom_produit || 'Product image'} 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-serif font-bold text-dark dark:text-darkText mb-4">
                {product.nom_produit || 'Product Name'}
              </h1>
              
              <p className="text-2xl text-primary font-bold mb-6">{formattedPrice}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-medium text-dark dark:text-darkText mb-2">Description</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description_complete || product.description_courte || 'No description available'}
                </p>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-dark dark:text-darkText mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-dark dark:text-darkText">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-secondary hover:bg-primary text-white py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
              >
                Add to Cart
              </button>
              
              {/* Stock Information */}
              {product.stock !== undefined && (
                <div className="mt-4 text-gray-700 dark:text-gray-300">
                  <p>Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
                </div>
              )}
              
              {/* Weight Information */}
              {product.poids !== undefined && (
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  <p>Weight: {product.poids} {product.unite_poids || 'g'}</p>
                </div>
              )}
              
              {/* Certification */}
              {product.certification && (
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  <p>Certification: {product.certification}</p>
                </div>
              )}
              
              {/* Origin */}
              {product.origine && (
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  <p>Origin: {product.origine}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;