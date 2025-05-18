import api from './api';

const ProductService = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  }
};

export default ProductService;