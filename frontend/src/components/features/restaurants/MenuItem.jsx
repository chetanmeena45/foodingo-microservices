import { useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../hooks/useCart';

const MenuItem = ({ item, restaurantId, restaurantName }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      restaurantId,
      restaurantName,
      imageUrl: item.imageUrl
    });
    setQuantity(1);
  };

  return (
    <Card className="mb-3 shadow-sm hover-shadow">
      <Row className="g-0">
        <Col md={3}>
          <Card.Img
            src={item.imageUrl || 'https://via.placeholder.com/200x200?text=Menu+Item'}
            style={{ height: '150px', objectFit: 'cover' }}
            className="rounded-start"
          />
        </Col>
        <Col md={9}>
          <Card.Body>
            <Row>
              <Col md={8}>
                <Card.Title className="h5">{item.name}</Card.Title>
                <Card.Text className="text-muted small">
                  {item.description || 'No description available'}
                </Card.Text>
                <div className="mb-2">
                  <Badge bg="secondary" className="me-2">
                    {item.category || 'General'}
                  </Badge>
                  {!item.isAvailable && (
                    <Badge bg="danger">Not Available</Badge>
                  )}
                </div>
              </Col>
              <Col md={4} className="text-end">
                <h4 className="text-primary mb-3">
                  ${item.price?.toFixed(2)}
                </h4>
                
                {item.isAvailable && (
                  <div>
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-3 fw-bold">{quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddToCart}
                      className="w-100"
                    >
                      <FaShoppingCart className="me-1" />
                      Add to Cart
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default MenuItem;
