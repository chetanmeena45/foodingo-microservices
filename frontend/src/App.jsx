import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';

// Protected Pages
import Orders from './pages/Orders';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageRestaurants from './pages/admin/ManageRestaurants';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />

              {/* Protected Routes - Any Authenticated User */}
              <Route element={<ProtectedRoute />}>
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/restaurants" element={<ManageRestaurants />} />
              </Route>
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
