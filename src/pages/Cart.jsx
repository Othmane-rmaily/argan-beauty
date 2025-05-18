import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useCart } from '../context/CartContext';
import zellijPattern from '../assets/zellij-pattern.png';

const Cart = () => {
  const { cart: cartItems, removeCartItem, updateCartItem, clearCart, total, loading, error: cartError } = useCart();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price || item.product?.prix || 0);
    return sum + (price * item.quantity);
  }, 0);
  const taxRate = 0.20; // 20% tax rate
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + taxAmount;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="bg-light dark:bg-dark min-h-screen pt-24 pb-12 relative transition-colors duration-300">
        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{ backgroundImage: `url(${zellijPattern})` }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl font-serif font-bold text-primary dark:text-accent mb-6">Your Cart</h1>
          <div className="bg-white dark:bg-dark rounded-lg shadow-md p-8 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-secondary text-light hover:text-white px-6 py-3 rounded-md font-medium transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen pt-24 pb-12 relative transition-colors duration-300">
      <div 
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: `url(${zellijPattern})` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl font-serif font-bold text-primary dark:text-accent mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark rounded-lg shadow-md overflow-hidden transition-colors duration-300">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-primary dark:text-accent">Shopping Cart ({cartItems?.length || 0} items)</h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {Array.isArray(cartItems) && cartItems.map(item => (
                  <div key={item.product_id} className="p-4 flex flex-col sm:flex-row transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-lg">
                    <div 
                      className="sm:w-24 sm:h-24 mb-4 sm:mb-0 cursor-pointer transition-transform duration-300 hover:scale-105" 
                      onClick={() => navigate(`/products/${item.product_id}`)}
                    >
                      <img 
                        src={item.product?.image_principale || 'https://via.placeholder.com/300?text=No+Image'} 
                        alt={item.product?.nom_produit} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 sm:ml-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 
                            className="text-lg font-medium text-primary dark:text-accent cursor-pointer hover:underline transition-colors duration-300 hover:text-secondary dark:hover:text-accent"
                            onClick={() => navigate(`/products/${item.product_id}`)}
                          >
                            {item.product?.nom_produit || 'Product'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${parseFloat(item.price || item.product?.prix || 0).toFixed(2)}</p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                            <button 
                              onClick={() => updateCartItem(item.product_id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <span className="px-3 py-1 text-center text-dark dark:text-light border-x border-gray-300 dark:border-gray-600 min-w-[40px]">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateCartItem(item.product_id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm font-medium text-dark dark:text-light">
                          Total: <span className="text-primary dark:text-accent">${(parseFloat(item.price || item.product?.prix || 0) * item.quantity).toFixed(2)}</span>
                        </p>
                        <button 
                          onClick={() => {
                            setItemToDelete(item.product_id);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none transition-colors duration-300"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark rounded-lg shadow-md p-6 sticky top-24 transition-colors duration-300">
              <h2 className="text-lg font-medium text-primary dark:text-accent mb-4">Cart Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-dark dark:text-light">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-dark dark:text-light">
                  <span>Tax (20%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between font-medium text-lg text-primary dark:text-accent">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/payment')}
                disabled={loading}
                className="w-full bg-secondary hover:bg-primary text-dark hover:text-light py-3 rounded-md font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
              
              <div className="mt-6">
                <Link 
                  to="/products" 
                  className="block text-center text-primary dark:text-accent hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (itemToDelete) {
            removeCartItem(itemToDelete);
            setDeleteModalOpen(false);
            setItemToDelete(null);
          }
        }}
      />
    </div>
  );
};

export default Cart;