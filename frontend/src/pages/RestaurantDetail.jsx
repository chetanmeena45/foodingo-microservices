import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useRestaurants } from '../hooks/useRestaurants';
import MenuItem from '../components/features/restaurants/MenuItem';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRestaurant, menuItems, isLoading, error, loadRestaurantById } = useRestaurants();

  useEffect(() => {
    if (id) {
      loadRestaurantById(id);
    }
  }, [id, loadRestaurantById]);

  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading restaurant details...</p>
      </Container>
    );
  }

  if (error || !selectedRestaurant) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || 'Restaurant not found'}
        </Alert>
        <Button variant="primary" onClick={() => navigate('/restaurants')}>
          Back to Restaurants
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="link" 
        className="text-decoration-none mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-1" /> Back to Restaurants
      </Button>

      <div className="mb-5">
        <Row>
          <Col md={4}>
            <img
              src={selectedRestaurant.imageUrl || 'https://via.placeholder.com/400x300'}
              alt={selectedRestaurant.name}
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h1 className="display-5">{selectedRestaurant.name}</h1>
            <p className="text-muted mb-2">{selectedRestaurant.address}</p>
            <p className="mb-2">
              <span className="badge bg-info me-2">{selectedRestaurant.cuisineType}</span>
              {selectedRestaurant.phone && (
                <span className="badge bg-secondary">{selectedRestaurant.phone}</span>
              )}
            </p>
            {!selectedRestaurant.isActive && (
              <Alert variant="warning" className="mt-2">
                This restaurant is currently closed
              </Alert>
            )}
          </Col>
        </Row>
      </div>

      <h3 className="mb-4">Our Menu</h3>
      
      {menuItems.length === 0 ? (
        <Alert variant="info">
          No menu items available for this restaurant.
        </Alert>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-5">
            <h4 className="mb-3 pb-2 border-bottom">{category}</h4>
            {items.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item}
                restaurantId={selectedRestaurant.id}
                restaurantName={selectedRestaurant.name}
              />
            ))}
          </div>
        ))
      )}
    </Container>
  );
};

export default RestaurantDetail;
