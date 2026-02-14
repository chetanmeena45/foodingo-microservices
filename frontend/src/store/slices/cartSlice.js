import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
  totalItems: 0,
  subtotal: 0,
  deliveryFee: 2.99,
  tax: 0,
  total: 0
};

const calculateTotals = (state) => {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  state.tax = state.subtotal * 0.08; // 8% tax
  state.total = state.subtotal + state.deliveryFee + state.tax;
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity, restaurantId, restaurantName, imageUrl } = action.payload;

      if (state.items.length > 0 && state.restaurantId !== restaurantId) {
        if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
          return;
        }
        state.items = [];
      }

      state.restaurantId = restaurantId;
      state.restaurantName = restaurantName;

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        toast.success(`Updated ${name} quantity in cart`);
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity,
          imageUrl
        });
        toast.success(`Added ${name} to cart`);
      }

      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      state.items = state.items.filter(item => item.id !== itemId);
      
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      
      toast.success(`Removed ${item?.name} from cart`);
      calculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      
      if (quantity < 1) return;
      
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        toast.success(`Updated ${item.name} quantity`);
      }
      
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      calculateTotals(state);
      toast.success('Cart cleared');
    },

    applyPromoCode: (state, action) => {
      const code = action.payload;
      if (code === 'FOOD10') {
        state.subtotal *= 0.9;
        toast.success('Promo code applied: 10% off');
      } else if (code === 'FOOD20') {
        state.subtotal *= 0.8;
        toast.success('Promo code applied: 20% off');
      } else {
        toast.error('Invalid promo code');
      }
      calculateTotals(state);
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  applyPromoCode 
} = cartSlice.actions;
export default cartSlice.reducer;
