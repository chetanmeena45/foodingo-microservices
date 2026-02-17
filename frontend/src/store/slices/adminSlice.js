import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

// Dashboard Stats
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

// Orders Management
export const fetchAllOrders = createAsyncThunk(
  'admin/fetchAllOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateOrderStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order');
    }
  }
);

// Restaurants Management
export const fetchAllRestaurants = createAsyncThunk(
  'admin/fetchAllRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllRestaurants();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
    }
  }
);

export const createRestaurant = createAsyncThunk(
  'admin/createRestaurant',
  async (restaurantData, { rejectWithValue }) => {
    try {
      const response = await adminService.createRestaurant(restaurantData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create restaurant');
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  'admin/updateRestaurant',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateRestaurant(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update restaurant');
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  'admin/deleteRestaurant',
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteRestaurant(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete restaurant');
    }
  }
);

// Menu Items Management
export const createMenuItem = createAsyncThunk(
  'admin/createMenuItem',
  async ({ restaurantId, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.createMenuItem(restaurantId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create menu item');
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'admin/updateMenuItem',
  async ({ restaurantId, itemId, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateMenuItem(restaurantId, itemId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update menu item');
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'admin/deleteMenuItem',
  async ({ restaurantId, itemId }, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteMenuItem(restaurantId, itemId);
      return { restaurantId, itemId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete menu item');
    }
  }
);

const initialState = {
  stats: {
    totalOrders: 0,
    totalRevenue: 0,
    totalRestaurants: 0,
    totalUsers: 0,
    recentOrders: []
  },
  orders: [],
  restaurants: [],
  selectedRestaurant: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  },
  isLoading: false,
  error: null,
  success: false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    clearAdminError: (state) => {
      state.error = null;
    },
    setAdminPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Orders Management
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders || action.payload;
        state.pagination.total = action.payload.total || state.orders.length;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      // Restaurants Management
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.restaurants.unshift(action.payload);
        state.success = true;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.restaurants.findIndex(r => r.id === updated.id);
        if (index !== -1) {
          state.restaurants[index] = updated;
        }
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(r => r.id !== action.payload.id);
      });
  }
});

export const { setSelectedRestaurant, clearAdminError, setAdminPage } = adminSlice.actions;
export default adminSlice.reducer;