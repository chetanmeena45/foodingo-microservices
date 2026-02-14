import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../store/hooks';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BSNavbar bg="primary" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold">
          ��� Foodingo
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/orders">My Orders</Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center">
            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              {cartItems?.length > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  {user?.name?.split(' ')[0]}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  <FaSignOutAlt />
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
