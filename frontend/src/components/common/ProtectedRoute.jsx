import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, isLoading, isAdmin, isUser } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => {
      if (role === 'ADMIN') return isAdmin;
      if (role === 'USER') return isUser;
      return false;
    });

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
