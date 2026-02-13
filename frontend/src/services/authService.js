import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
