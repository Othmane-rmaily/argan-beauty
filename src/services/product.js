import api from './api';

class ProductService {
  getAllProducts = async () => {
    try {
      const response = await api.get('http://127.0.0.1:8000/api/produits/');
      // Check if response.data is an array or if it has a data property containing the array
      return Array.isArray(response.data) ? response.data : response.data.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return empty array on error
    }
  };

  getProductById = async (id) => {
    try {
      const response = await api.get(`http://127.0.0.1:8000/api/produits/${id}`);
      // Check if response.data is the product object or if it has a data property
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
  };
}

export default new ProductService();