import { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useRestaurants } from '../hooks/useRestaurants';
import MenuItem from '../components/features/restaurants/MenuItem';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    selectedRestaurant, 
    menuItems, 
    isLoading, 
    error, 
    loadRestaurantById,
    clearSelected 
  } = useRestaurants();

  useEffect(() => {
    if (id) {
      loadRestaurantById(id);
    }
    return () => clearSelected();
  }, [id, loadRestaurantById, clearSelected]);

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading restaurant...</p>
      </Container>
    );
  }

  if (error || !selectedRestaurant) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Restaurant not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/restaurants')}>
          <FaArrowLeft className="me-1" /> Restaurants
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{selectedRestaurant.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-5">
        <Col md={4}>
          <img
            src={selectedRestaurant.imageUrl || 'https://via.placeholder.com/400x300?text=Restaurant'}
            alt={selectedRestaurant.name}
            className="img-fluid rounded shadow"
            style={{ height: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={8}>
          <h1>{selectedRestaurant.name}</h1>
          <p className="lead text-muted">{selectedRestaurant.address}</p>
          <div>
            <span className="badge bg-primary fs-6 me-2">{selectedRestaurant.cuisineType}</span>
            <span className="badge bg-success fs-6">
              {selectedRestaurant.isActive ? 'Open' : 'Closed'}
            </span>
          </div>
        </Col>
      </Row>

      <h2>Menu ({menuItems.length} items)</h2>
      {menuItems.length === 0 ? (
        <Alert variant="info">No menu items available</Alert>
      ) : (
        <Row>
          {menuItems.map((item) => (
            <Col key={item.id} lg={6} className="mb-4">
              <MenuItem item={item} restaurantId={id} restaurantName={selectedRestaurant.name} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RestaurantDetail;
