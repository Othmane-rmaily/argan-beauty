import api from './api';

const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  getCategoryProducts: async (id) => {
    try {
      const response = await api.get(`/categories/${id}/products`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${id}:`, error);
      throw error;
    }
  },

  searchCategories: async (query) => {
    try {
      const response = await api.get(`/categories/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
};

export default CategoryService;