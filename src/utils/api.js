import axios from 'axios';

// Create an axios instance with base URL
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all products
export const getProducts = async () => {
  try {
    // For development, you might want to return mock data
    // In production, uncomment the API call
    
    // const response = await api.get('/products');
    // return response.data;
    
    // Mock data for development
    return [
      {
        id: 1,
        name: 'Pure Argan Oil',
        price: 29.99,
        image: 'https://via.placeholder.com/300',
        short_description: 'Organic cold-pressed argan oil for face, hair, and body.',
        description: 'Our 100% pure argan oil is cold-pressed from the kernels of the argan tree. Rich in vitamin E and essential fatty acids, it nourishes and hydrates skin, hair, and nails.',
        category: 'skincare',
        benefits: [
          'Deeply moisturizes skin',
          'Reduces appearance of fine lines',
          'Nourishes and strengthens hair',
          'Non-greasy formula'
        ]
      },
      {
        id: 2,
        name: 'Argan Shampoo',
        price: 19.99,
        image: 'https://via.placeholder.com/300',
        short_description: 'Hydrating shampoo with pure argan oil.',
        description: 'This luxurious shampoo is infused with pure argan oil to cleanse and nourish your hair. It helps restore shine and manageability while protecting against environmental damage.',
        category: 'haircare',
        benefits: [
          'Gently cleanses hair',
          'Adds shine and softness',
          'Helps repair damaged hair',
          'Suitable for all hair types'
        ]
      },
      {
        id: 3,
        name: 'Argan Body Butter',
        price: 24.99,
        image: 'https://via.placeholder.com/300',
        short_description: 'Rich body butter with argan oil and shea butter.',
        description: 'Our luxurious body butter combines argan oil with shea butter for intense hydration. The rich formula absorbs quickly to leave skin soft, smooth, and nourished.',
        category: 'body',
        benefits: [
          'Provides deep hydration',
          'Improves skin elasticity',
          'Soothes dry, rough skin',
          'Non-greasy formula'
        ]
      },
      {
        id: 4,
        name: 'Argan Face Cream',
        price: 34.99,
        image: 'https://via.placeholder.com/300',
        short_description: 'Anti-aging face cream with argan oil and vitamin C.',
        description: 'This powerful face cream combines argan oil with vitamin C to hydrate, brighten, and protect your skin. It helps reduce the appearance of fine lines and improves skin texture.',
        category: 'face',
        benefits: [
          'Reduces appearance of fine lines',
          'Brightens complexion',
          'Provides antioxidant protection',
          'Suitable for all skin types'
        ]
      }
    ];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    // For development, you might want to return mock data
    // In production, uncomment the API call
    
    // const response = await api.get(`/products/${id}`);
    // return response.data;
    
    // Mock data for development
    const products = await getProducts();
    return products.find(product => product.id === parseInt(id));
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Get a single product (without ID parameter)
export const getProduct = async () => {
  try {
    const products = await getProducts();
    return products[0]; // Return the first product
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// User authentication functions
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Create an order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

export default api;