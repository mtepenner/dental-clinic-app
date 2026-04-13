import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    // Save the JWT token to local storage for future authenticated requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  // Used on initial load to see if a returning user's token is still valid
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
