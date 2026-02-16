import { Badge } from 'react-bootstrap';

const statusConfig = {
  CREATED: { bg: 'secondary', text: 'Created' },
  CONFIRMED: { bg: 'info', text: 'Confirmed' },
  PREPARING: { bg: 'warning', text: 'Preparing' },
  OUT_FOR_DELIVERY: { bg: 'primary', text: 'Out for Delivery' },
  DELIVERED: { bg: 'success', text: 'Delivered' },
  CANCELLED: { bg: 'danger', text: 'Cancelled' }
};

const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || { bg: 'secondary', text: status };
  
  return (
    <Badge bg={config.bg} className="px-3 py-2">
      {config.text}
    </Badge>
  );
};

export default OrderStatusBadge;
