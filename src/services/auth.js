import api from './api';

class AuthService {
  login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  logout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user'); // Still remove from local storage even if API call fails
      return false;
    }
  };

  register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  isAuthenticated = async () => {
    try {
      // Try to get the user data from the API
      await this.refreshUserData();
      return true;
    } catch (error) {
      return false;
    }
  };

  refreshUserData = async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();