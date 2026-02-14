import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import restaurantService from '../../services/restaurantService';

// Async thunks
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getAllRestaurants(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getRestaurantById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurant');
    }
  }
);

export const fetchMenuItems = createAsyncThunk(
  'restaurants/fetchMenuItems',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getMenuItems(restaurantId);
      return { restaurantId, items: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch menu');
    }
  }
);

export const createRestaurant = createAsyncThunk(
  'restaurants/create',
  async (restaurantData, { rejectWithValue }) => {
    try {
      const response = await restaurantService.createRestaurant(restaurantData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create restaurant');
    }
  }
);

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  menuItems: [],
  filters: {
    cuisine: '',
    search: '',
    rating: null
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  },
  isLoading: false,
  error: null
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSelectedRestaurant: (state) => {
      state.selectedRestaurant = null;
      state.menuItems = [];
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload.data || action.payload;
        state.pagination.total = action.payload.total || state.restaurants.length;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Single Restaurant
      .addCase(fetchRestaurantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedRestaurant = action.payload.data || action.payload;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Menu Items
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.menuItems = action.payload.items.data || action.payload.items;
      })
      
      // Create Restaurant
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.restaurants.unshift(action.payload.data || action.payload);
      });
  }
});

export const { setFilters, clearFilters, clearSelectedRestaurant, setPage } = restaurantSlice.actions;
export default restaurantSlice.reducer;
