import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  createOrder,
  fetchMyOrders,
  fetchOrderById,
  cancelOrder,
  fetchAllOrders,
  updateOrderStatus,
  clearCurrentOrder,
  setOrderPage
} from '../store/slices/orderSlice';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAuth();
  const {
    orders,
    currentOrder,
    pagination,
    isLoading,
    error,
    success
  } = useAppSelector((state) => state.orders);

  // Load user orders
  const loadMyOrders = useCallback(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // Load single order
  const loadOrderById = useCallback((id) => {
    dispatch(fetchOrderById(id));
  }, [dispatch]);

  // Place new order
  const placeOrder = useCallback(async (orderData) => {
    return await dispatch(createOrder(orderData)).unwrap();
  }, [dispatch]);

  // Cancel order
  const cancelUserOrder = useCallback((id) => {
    dispatch(cancelOrder(id));
  }, [dispatch]);

  // Admin: Load all orders
  const loadAllOrders = useCallback((params = {}) => {
    if (isAdmin) {
      dispatch(fetchAllOrders(params));
    }
  }, [dispatch, isAdmin]);

  // Admin: Update order status
  const updateStatus = useCallback((id, status) => {
    if (isAdmin) {
      dispatch(updateOrderStatus({ id, status }));
    }
  }, [dispatch, isAdmin]);

  // Clear current order
  const clearOrder = useCallback(() => {
    dispatch(clearCurrentOrder());
  }, [dispatch]);

  // Change page
  const changePage = useCallback((page) => {
    dispatch(setOrderPage(page));
  }, [dispatch]);

  // Auto-load orders on mount
  useEffect(() => {
    loadMyOrders();
  }, [loadMyOrders]);

  return {
    orders,
    currentOrder,
    pagination,
    isLoading,
    error,
    success,
    loadMyOrders,
    loadOrderById,
    placeOrder,
    cancelOrder: cancelUserOrder,
    loadAllOrders,
    updateStatus,
    clearOrder,
    changePage,
    isAdmin
  };
};
