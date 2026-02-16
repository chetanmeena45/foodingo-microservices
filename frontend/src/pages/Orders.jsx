import { useEffect } from 'react';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/features/orders/OrderCard';

const Orders = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error, cancelOrder } = useOrders();

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading your orders...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Orders</h2>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Alert variant="info">
          <p className="mb-3">You haven't placed any orders yet.</p>
          <Button variant="primary" onClick={() => navigate('/restaurants')}>
            Browse Restaurants
          </Button>
        </Alert>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={cancelOrder}
          />
        ))
      )}
    </Container>
  );
};

export default Orders;
