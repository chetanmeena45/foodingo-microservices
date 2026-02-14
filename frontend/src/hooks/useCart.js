import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode
} from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const addItem = useCallback((item) => {
    dispatch(addToCart(item));
  }, [dispatch]);

  const removeItem = useCallback((itemId) => {
    dispatch(removeFromCart(itemId));
  }, [dispatch]);

  const updateItemQuantity = useCallback((itemId, quantity) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  }, [dispatch]);

  const emptyCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const applyPromo = useCallback((code) => {
    dispatch(applyPromoCode(code));
  }, [dispatch]);

  const cartItemsCount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  const cartSubtotal = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart.items]);

  const isCartEmpty = cart.items.length === 0;

  return {
    ...cart,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyCart,
    applyPromo,
    cartItemsCount,
    cartSubtotal,
    isCartEmpty
  };
};
