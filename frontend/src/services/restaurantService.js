import api from './api';

const restaurantService = {
  // Get all restaurants with filters
  getAllRestaurants: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/api/restaurants?${queryParams}` : '/api/restaurants';
    const response = await api.get(url);
    return response.data;
  },

  // Get active restaurants
  getActiveRestaurants: async () => {
    const response = await api.get('/api/restaurants/active');
    return response.data;
  },

  // Get restaurant by ID
  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  // Get menu items for a restaurant
  getMenuItems: async (restaurantId) => {
    const response = await api.get(`/api/restaurants/${restaurantId}/menu`);
    return response.data;
  },

  // Create restaurant (admin only)
  createRestaurant: async (restaurantData) => {
    const response = await api.post('/api/restaurants', restaurantData);
    return response.data;
  },

  // Update restaurant (admin only)
  updateRestaurant: async (id, restaurantData) => {
    const response = await api.put(`/api/restaurants/${id}`, restaurantData);
    return response.data;
  },

  // Delete restaurant (admin only)
  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.data;
  },

  // Create menu item (admin only)
  createMenuItem: async (restaurantId, menuItemData) => {
    const response = await api.post(`/api/restaurants/${restaurantId}/menu`, menuItemData);
    return response.data;
  },

  // Update menu item (admin only)
  updateMenuItem: async (restaurantId, menuItemId, menuItemData) => {
    const response = await api.put(`/api/restaurants/${restaurantId}/menu/${menuItemId}`, menuItemData);
    return response.data;
  },

  // Delete menu item (admin only)
  deleteMenuItem: async (restaurantId, menuItemId) => {
    const response = await api.delete(`/api/restaurants/${restaurantId}/menu/${menuItemId}`);
    return response.data;
  }
};

export default restaurantService;
