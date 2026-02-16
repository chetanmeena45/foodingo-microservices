import api from './api';

const orderService = {
  // User endpoints
  createOrder: async (orderData) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/api/orders/my-orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.put(`/api/orders/${id}/cancel`);
    return response.data;
  },

  // Admin endpoints
  getAllOrders: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/api/orders/admin?${queryParams}` : '/api/orders/admin';
    const response = await api.get(url);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/api/orders/${id}/status`, { status });
    return response.data;
  }
};

export default orderService;
