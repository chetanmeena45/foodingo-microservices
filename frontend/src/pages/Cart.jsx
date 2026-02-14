import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  InputGroup,
  Alert
} from 'react-bootstrap';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaPercent } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    items,
    restaurantName,
    subtotal,
    deliveryFee,
    tax,
    total,
    removeItem,
    updateItemQuantity,
    emptyCart,
    applyPromo,
    isCartEmpty
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      applyPromo(promoCode.trim());
      setPromoApplied(true);
      setPromoCode('');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };

  if (isCartEmpty) {
    return (
      <Container className="py-5 text-center">
        <Card className="shadow-sm p-5">
          <FaShoppingBag size={64} className="text-muted mx-auto mb-3" />
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added any items yet.</p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </Button>
        </Card>
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
        <FaArrowLeft className="me-1" /> Back
      </Button>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Your Cart</h4>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={emptyCart}
                >
                  <FaTrash className="me-1" /> Clear Cart
                </Button>
              </div>
              {restaurantName && (
                <div className="mt-2">
                  <span className="badge bg-primary">From: {restaurantName}</span>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Table responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imageUrl || 'https://via.placeholder.com/50x50'}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="rounded me-3"
                          />
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td style={{ width: '150px' }}>
                        <InputGroup size="sm">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="text-center"
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </td>
                      <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-white">
              <h4 className="mb-0">Order Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <label className="form-label fw-semibold">Promo Code</label>
                <InputGroup>
                  <Form.Control
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="outline-primary"
                    onClick={handleApplyPromo}
                  >
                    <FaPercent />
                  </Button>
                </InputGroup>
                {promoApplied && (
                  <Alert variant="success" className="mt-2 mb-0 py-2 small">
                    Promo code applied successfully!
                  </Alert>
                )}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => navigate(`/restaurants/${items[0]?.restaurantId}`)}
              >
                Add More Items
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
