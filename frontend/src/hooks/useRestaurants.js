import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchRestaurants,
  fetchRestaurantById,
  fetchMenuItems,
  createRestaurant,
  setFilters,
  setPage,
  clearSelectedRestaurant
} from '../store/slices/restaurantSlice';
import { useAuth } from './useAuth';

export const useRestaurants = () => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAuth();
  const {
    restaurants,
    selectedRestaurant,
    menuItems,
    filters,
    pagination,
    isLoading,
    error
  } = useAppSelector((state) => state.restaurants);

  // Load restaurants with current filters
  const loadRestaurants = useCallback(() => {
    dispatch(fetchRestaurants({
      ...filters,
      page: pagination.page,
      limit: pagination.limit
    }));
  }, [dispatch, filters, pagination.page, pagination.limit]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // Load single restaurant
  const loadRestaurantById = useCallback(async (id) => {
    await dispatch(fetchRestaurantById(id));
    await dispatch(fetchMenuItems(id));
  }, [dispatch]);

  // Create new restaurant (admin only)
  const addRestaurant = useCallback(async (restaurantData) => {
    if (!isAdmin) throw new Error('Unauthorized');
    return await dispatch(createRestaurant(restaurantData)).unwrap();
  }, [dispatch, isAdmin]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  // Change page
  const changePage = useCallback((page) => {
    dispatch(setPage(page));
  }, [dispatch]);

  // Clear selected restaurant
  const clearSelected = useCallback(() => {
    dispatch(clearSelectedRestaurant());
  }, [dispatch]);

  return {
    restaurants,
    selectedRestaurant,
    menuItems,
    filters,
    pagination,
    isLoading,
    error,
    loadRestaurants,
    loadRestaurantById,
    addRestaurant,
    updateFilters,
    changePage,
    clearSelected,
    isAdmin
  };
};
