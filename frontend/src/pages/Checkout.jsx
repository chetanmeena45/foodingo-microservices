import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';

const checkoutSchema = z.object({
  deliveryAddress: z.string().min(10, 'Please enter complete delivery address'),
  customerPhone: z.string().min(10, 'Please enter valid phone number'),
  specialInstructions: z.string().optional()
});

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, restaurantId, subtotal, deliveryFee, tax, total, emptyCart } = useCart();
  const { placeOrder, isLoading, success, currentOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryAddress: '',
      customerPhone: '',
      specialInstructions: ''
    }
  });

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    if (success && currentOrder) {
      emptyCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${currentOrder.id}`);
    }
  }, [success, currentOrder, emptyCart, navigate]);

  const onSubmit = async (data) => {
    const orderData = {
      restaurantId,
      deliveryAddress: data.deliveryAddress,
      customerPhone: data.customerPhone,
      specialInstructions: data.specialInstructions,
      paymentMethod,
      items: items.map(item => ({
        menuItemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      await placeOrder(orderData);
    } catch (error) {
      toast.error(error || 'Failed to place order');
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Checkout</h2>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Delivery Details</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your complete delivery address"
                    {...register('deliveryAddress')}
                    isInvalid={!!errors.deliveryAddress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryAddress?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your contact number"
                    {...register('customerPhone')}
                    isInvalid={!!errors.customerPhone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.customerPhone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Special Instructions (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="e.g., Gate code, delivery instructions, etc."
                    {...register('specialInstructions')}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="cash"
                      label="Cash on Delivery"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="card"
                      label="Credit/Debit Card"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      disabled
                    />
                    <small className="text-muted d-block mt-1">
                      * Card payment coming soon
                    </small>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr />

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
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <Button
                variant="success"
                size="lg"
                className="w-100"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
