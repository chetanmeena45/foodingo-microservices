import { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Spinner
} from 'react-bootstrap';
import {
  FaShoppingBag,
  FaDollarSign,
  FaStore,
  FaUsers,
  FaEye
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency, formatDate } from '../../utils/helpers';
import OrderStatusBadge from '../../components/features/orders/OrderStatusBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, orders, isLoading, loadDashboardStats, loadAllOrders } = useAdmin();

  useEffect(() => {
    loadDashboardStats();
    loadAllOrders({ limit: 5 });
  }, [loadDashboardStats, loadAllOrders]);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <FaShoppingBag size={32} />,
      bg: 'primary',
      path: '/admin/orders'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: <FaDollarSign size={32} />,
      bg: 'success',
      path: '/admin/orders'
    },
    {
      title: 'Restaurants',
      value: stats?.totalRestaurants || 0,
      icon: <FaStore size={32} />,
      bg: 'info',
      path: '/admin/restaurants'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <FaUsers size={32} />,
      bg: 'warning',
      path: '/admin/users'
    }
  ];

  if (isLoading && !stats.totalOrders) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading dashboard...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <Row className="mb-4">
        {statCards.map((card, index) => (
          <Col key={index} md={3} className="mb-3">
            <Card
              className={`bg-${card.bg} text-white shadow-sm h-100 cursor-pointer`}
              onClick={() => navigate(card.path)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-white-50 mb-2">{card.title}</h6>
                    <h3 className="mb-0">{card.value}</h3>
                  </div>
                  <div className="opacity-75">
                    {card.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Orders */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Button
                variant="link"
                onClick={() => navigate('/admin/orders')}
                className="text-decoration-none"
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td>
                        <small>#{order.id?.substring(0, 8)}</small>
                      </td>
                      <td>{order.userEmail || 'N/A'}</td>
                      <td>{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td>
                        <small>{formatDate(order.orderDate)}</small>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(`/admin/orders/${order.id}`)}
                        >
                          <FaEye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Button
                variant="primary"
                className="w-100 mb-2"
                onClick={() => navigate('/admin/restaurants/new')}
              >
                Add New Restaurant
              </Button>
              <Button
                variant="info"
                className="w-100 mb-2 text-white"
                onClick={() => navigate('/admin/restaurants')}
              >
                Manage Restaurants
              </Button>
              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={() => navigate('/admin/orders')}
              >
                View All Orders
              </Button>
              <Button
                variant="warning"
                className="w-100"
                onClick={() => navigate('/admin/users')}
              >
                Manage Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;