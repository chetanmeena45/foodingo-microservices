import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Spinner
} from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency, formatDate } from '../../utils/helpers';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, isLoading } = useAdmin();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const found = orders.find(o => o.id === id);
    if (found) setOrder(found);
  }, [id, orders]);

  if (isLoading || !order) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Button variant="link" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </Button>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>Order #{order.id.substring(0,8)}</Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
