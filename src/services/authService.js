import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:8000';

// Configure axios to always include credentials
axios.defaults.withCredentials = true;

// Authentication service
const authService = {
  // Get CSRF cookie - only fetch once per session
  getCsrfCookie: (() => {
    let tokenFetched = false;
    let fetchPromise = null;
    
    return async () => {
      if (!tokenFetched) {
        if (!fetchPromise) {
          fetchPromise = axios.get(`${API_URL}/sanctum/csrf-cookie`);
          try {
            await fetchPromise;
            tokenFetched = true;
          } catch (error) {
            console.error('Error fetching CSRF token:', error);
            fetchPromise = null;
            throw error;
          }
        } else {
          await fetchPromise;
        }
      }
      return true;
    };
  })(),
  
  // Login user
  login: async (email, password) => {
    await authService.getCsrfCookie();
    
    return axios.post(`${API_URL}/api/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },
  
  // Register user
  register: async (name, email, password, password_confirmation) => {
    await authService.getCsrfCookie();
    
    return axios.post(`${API_URL}/api/register`, {
      name,
      email,
      password,
      password_confirmation
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },
  
  // Logout user
  logout: async () => {
    return axios.post(`${API_URL}/api/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  },
  
  // Get authenticated user
  getUser: async () => {
    return axios.get(`${API_URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
};

export default authService;