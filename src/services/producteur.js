import api from './api';

const ProducteurService = {
  getAllProducteurs: async () => {
    try {
      const response = await api.get('/producteurs');
      return response.data;
    } catch (error) {
      console.error('Error fetching producteurs:', error);
      throw error;
    }
  },

  getProducteurById: async (id) => {
    try {
      const response = await api.get(`/producteurs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching producteur ${id}:`, error);
      throw error;
    }
  },

  getProducteurProducts: async (id) => {
    try {
      const response = await api.get(`/producteurs/${id}/products`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for producteur ${id}:`, error);
      throw error;
    }
  },

  createProducteur: async (producteurData) => {
    try {
      const response = await api.post('/producteurs', producteurData);
      return response.data;
    } catch (error) {
      console.error('Error creating producteur:', error);
      throw error;
    }
  },

  updateProducteur: async (id, producteurData) => {
    try {
      const response = await api.put(`/producteurs/${id}`, producteurData);
      return response.data;
    } catch (error) {
      console.error(`Error updating producteur ${id}:`, error);
      throw error;
    }
  },

  deleteProducteur: async (id) => {
    try {
      const response = await api.delete(`/producteurs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting producteur ${id}:`, error);
      throw error;
    }
  }
};

export default ProducteurService;