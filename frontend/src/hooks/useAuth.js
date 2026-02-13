import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout, getProfile } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user?.role === 'ADMIN';
  const isUser = user?.role === 'USER';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    isUser,
    logout: handleLogout
  };
};
