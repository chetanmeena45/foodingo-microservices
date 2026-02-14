import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={restaurant.imageUrl || 'https://via.placeholder.com/300x200?text=Restaurant'}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {restaurant.rating > 0 && (
          <Badge 
            bg="success" 
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: '1rem' }}
          >
            <FaStar className="me-1" />
            {restaurant.rating.toFixed(1)}
          </Badge>
        )}
      </div>

      <Card.Body>
        <Card.Title className="h5 mb-2">{restaurant.name}</Card.Title>
        
        <div className="mb-2 text-muted small">
          <FaMapMarkerAlt className="me-1" />
          {restaurant.address?.substring(0, 50)}...
        </div>
        
        <div className="mb-3">
          <Badge bg="info" className="me-1">
            <FaUtensils className="me-1" />
            {restaurant.cuisineType || 'Various'}
          </Badge>
          {!restaurant.isActive && (
            <Badge bg="danger">Closed</Badge>
          )}
        </div>

        <Button 
          variant="primary" 
          className="w-100"
          onClick={handleViewMenu}
          disabled={!restaurant.isActive}
        >
          {restaurant.isActive ? 'View Menu & Order' : 'Currently Closed'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;

