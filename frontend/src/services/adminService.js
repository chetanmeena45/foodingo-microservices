import api from './api';

const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },

  // Orders Management
  getAllOrders: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/api/admin/orders?${queryParams}` : '/api/admin/orders';
    const response = await api.get(url);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/api/admin/orders/${id}/status`, { status });
    return response.data;
  },

  // Restaurants Management
  getAllRestaurants: async () => {
    const response = await api.get('/api/admin/restaurants');
    return response.data;
  },

  createRestaurant: async (restaurantData) => {
    const response = await api.post('/api/admin/restaurants', restaurantData);
    return response.data;
  },

  updateRestaurant: async (id, restaurantData) => {
    const response = await api.put(`/api/admin/restaurants/${id}`, restaurantData);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/admin/restaurants/${id}`);
    return response.data;
  },

  // Menu Items Management
  createMenuItem: async (restaurantId, menuItemData) => {
    const response = await api.post(`/api/admin/restaurants/${restaurantId}/menu`, menuItemData);
    return response.data;
  },

  updateMenuItem: async (restaurantId, itemId, menuItemData) => {
    const response = await api.put(`/api/admin/restaurants/${restaurantId}/menu/${itemId}`, menuItemData);
    return response.data;
  },

  deleteMenuItem: async (restaurantId, itemId) => {
    const response = await api.delete(`/api/admin/restaurants/${restaurantId}/menu/${itemId}`);
    return response.data;
  },

  // Users Management
  getAllUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.put(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  }
};

export default adminService;