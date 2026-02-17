import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchDashboardStats,
  fetchAllOrders,
  updateOrderStatus,
  fetchAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setSelectedRestaurant
} from '../store/slices/adminSlice';

export const useAdmin = () => {
  const dispatch = useAppDispatch();
  const {
    stats,
    orders,
    restaurants,
    selectedRestaurant,
    pagination,
    isLoading,
    error,
    success
  } = useAppSelector((state) => state.admin);

  // Dashboard
  const loadDashboardStats = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Orders Management
  const loadAllOrders = useCallback((params = {}) => {
    dispatch(fetchAllOrders(params));
  }, [dispatch]);

  const updateStatus = useCallback((id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  }, [dispatch]);

  // Restaurants Management
  const loadAllRestaurants = useCallback(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  const addRestaurant = useCallback((data) => {
    dispatch(createRestaurant(data));
  }, [dispatch]);

  const editRestaurant = useCallback((id, data) => {
    dispatch(updateRestaurant({ id, data }));
  }, [dispatch]);

  const removeRestaurant = useCallback((id) => {
    dispatch(deleteRestaurant(id));
  }, [dispatch]);

  // Menu Items Management
  const addMenuItem = useCallback((restaurantId, data) => {
    dispatch(createMenuItem({ restaurantId, data }));
  }, [dispatch]);

  const editMenuItem = useCallback((restaurantId, itemId, data) => {
    dispatch(updateMenuItem({ restaurantId, itemId, data }));
  }, [dispatch]);

  const removeMenuItem = useCallback((restaurantId, itemId) => {
    dispatch(deleteMenuItem({ restaurantId, itemId }));
  }, [dispatch]);

  // Select restaurant for menu management
  const selectRestaurant = useCallback((restaurant) => {
    dispatch(setSelectedRestaurant(restaurant));
  }, [dispatch]);

  // Auto-load data
  useEffect(() => {
    loadDashboardStats();
    loadAllOrders({ limit: 5 });
    loadAllRestaurants();
  }, [loadDashboardStats, loadAllOrders, loadAllRestaurants]);

  return {
    stats,
    orders,
    restaurants,
    selectedRestaurant,
    pagination,
    isLoading,
    error,
    success,
    loadDashboardStats,
    loadAllOrders,
    updateStatus,
    loadAllRestaurants,
    addRestaurant,
    editRestaurant,
    removeRestaurant,
    addMenuItem,
    editMenuItem,
    removeMenuItem,
    selectRestaurant
  };
};