import { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import OrderStatusBadge from './OrderStatusBadge';
import { formatDate, formatCurrency } from '../../../utils/helpers';

const OrderCard = ({ order, onCancel, showActions = true }) => {
  const [open, setOpen] = useState(false);

  const canCancel = ['CREATED', 'CONFIRMED'].includes(order.status);

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-2">Order #{order.id?.substring(0, 8)}</h6>
            <div className="d-flex align-items-center gap-3">
              <OrderStatusBadge status={order.status} />
              <small className="text-muted">
                {formatDate(order.orderDate)}
              </small>
            </div>
          </div>
          <div className="text-end">
            <h5 className="text-primary mb-2">
              {formatCurrency(order.totalAmount)}
            </h5>
            <Button
              variant="link"
              size="sm"
              onClick={() => setOpen(!open)}
              className="text-decoration-none"
            >
              {open ? <FaChevronUp /> : <FaChevronDown />} Details
            </Button>
          </div>
        </div>

        <Collapse in={open}>
          <div className="mt-3">
            <hr />
            <h6>Items:</h6>
            {order.items?.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-1">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            
            <hr />
            
            <div className="row mt-2">
              <div className="col-md-6">
                <small>
                  <strong>Delivery Address:</strong><br />
                  {order.deliveryAddress}
                </small>
              </div>
              {order.specialInstructions && (
                <div className="col-md-6">
                  <small>
                    <strong>Special Instructions:</strong><br />
                    {order.specialInstructions}
                  </small>
                </div>
              )}
            </div>

            {showActions && canCancel && (
              <Button
                variant="outline-danger"
                size="sm"
                className="mt-3"
                onClick={() => onCancel(order.id)}
              >
                Cancel Order
              </Button>
            )}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
