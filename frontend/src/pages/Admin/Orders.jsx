import { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Card,
  Badge,
  Button,
  Dropdown,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
  Pagination
} from 'react-bootstrap';
import {
  FaEye,
  FaFilter,
  FaRefresh,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaClock,
  FaCheck
} from 'react-icons/fa';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency, formatDate } from '../../utils/helpers';

const statusOptions = [
  { value: 'CREATED', label: 'Created', variant: 'secondary' },
  { value: 'CONFIRMED', label: 'Confirmed', variant: 'info' },
  { value: 'PREPARING', label: 'Preparing', variant: 'warning' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', variant: 'primary' },
  { value: 'DELIVERED', label: 'Delivered', variant: 'success' },
  { value: 'CANCELLED', label: 'Cancelled', variant: 'danger' }
];

const statusIcons = {
  CREATED: <FaClock />,
  CONFIRMED: <FaCheckCircle />,
  PREPARING: <FaClock />,
  OUT_FOR_DELIVERY: <FaTruck />,
  DELIVERED: <FaCheck />,
  CANCELLED: <FaTimesCircle />
};

const Orders = () => {
  const { orders, isLoading, error, loadAllOrders, updateStatus } = useAdmin();
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    loadAllOrders(filters);
  }, [loadAllOrders, filters]);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateStatus(orderId, newStatus);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusBadge = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return (
      <Badge bg={option?.variant || 'secondary'} className="px-3 py-2">
        {statusIcons[status]} {option?.label || status}
      </Badge>
    );
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id.substring(0,8)}</td>
                    <td>{order.userEmail}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{formatDate(order.orderDate)}</td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => window.location.href=`/admin/orders/${order.id}`}
                      >
                        <FaEye />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Orders;
