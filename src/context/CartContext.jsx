import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import CartService from '../services/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState(null);

  // Fetch cart data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // If not authenticated, load cart from localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // Ensure the cart has the expected structure
          setCart({
            items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
            total: parsedCart.total || 0
          });
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCart({ items: [], total: 0 });
        }
      }
    }
  }, [isAuthenticated]);

  // Save cart to localStorage when it changes (for non-authenticated users)
  useEffect(() => {
    if (!isAuthenticated && cart && cart.items && cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await CartService.getCart();
      // Ensure the response has the expected structure
      if (response.data && typeof response.data === 'object') {
        setCart({
          items: Array.isArray(response.data.items) ? response.data.items : [],
          total: response.data.total || 0
        });
      } else {
        console.error('Unexpected response format from getCart:', response.data);
        setCart({ items: [], total: 0 });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      if (!product || !product.prix) {
        throw new Error('Invalid product data');
      }

      if (isAuthenticated) {
        // Add to server cart if authenticated
        const response = await CartService.addToCart(product.id_produit, quantity);
        setCart(response.data);
      } else {
        // Add to local cart if not authenticated
        const existingItem = cart.items.find(item => item.product_id === product.id_produit);
        
        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = cart.items.map(item => 
            item.product_id === product.id_produit
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
          
          const newTotal = calculateTotal(updatedItems);
          setCart({ items: updatedItems, total: newTotal });
        } else {
          // Add new item
          const newItem = {
            product_id: product.id_produit,
            product: product,
            quantity,
            price: parseFloat(product.prix)
          };
          
          const updatedItems = [...cart.items, newItem];
          const newTotal = calculateTotal(updatedItems);
          setCart({ items: updatedItems, total: newTotal });
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        // Update server cart if authenticated
        const response = await api.put(`/cart/${itemId}`, { quantity });
        setCart(response.data);
      } else {
        // Update local cart if not authenticated
        const updatedItems = cart.items.map(item => 
          item.product_id === itemId 
            ? { ...item, quantity } 
            : item
        );
        
        const newTotal = calculateTotal(updatedItems);
        setCart({ items: updatedItems, total: newTotal });
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (itemId) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        // Remove from server cart if authenticated
        const response = await api.delete(`/cart/${itemId}`);
        setCart(response.data);
      } else {
        // Remove from local cart if not authenticated
        const updatedItems = cart.items.filter(item => item.product_id !== itemId);
        const newTotal = calculateTotal(updatedItems);
        setCart({ items: updatedItems, total: newTotal });
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        // Clear server cart if authenticated
        const response = await api.delete('/cart');
        setCart(response.data);
      } else {
        // Clear local cart if not authenticated
        setCart({ items: [], total: 0 });
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate cart total
  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price || item.product?.prix || 0);
      return sum + (price * item.quantity);
    }, 0);
  };

  // Get the total number of items in cart
  const itemCount = cart && cart.items && Array.isArray(cart.items) 
    ? cart.items.reduce((count, item) => count + item.quantity, 0) 
    : 0;

  const value = {
    cart: cart && cart.items && Array.isArray(cart.items) ? cart.items : [],
    total: cart && typeof cart.total === 'number' ? cart.total : 0,
    loading,
    error,
    itemCount,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;