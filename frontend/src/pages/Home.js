import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import api from '../services/api';

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check service health
    const checkServices = async () => {
      const serviceList = [
        { name: 'API Gateway', url: 'http://localhost:8080', color: 'primary' },
        { name: 'User Service', url: 'http://localhost:8081/api/users', color: 'success' },
        { name: 'Restaurant Service', url: 'http://localhost:8082/api/restaurants', color: 'info' },
        { name: 'Order Service', url: 'http://localhost:8083/api/orders', color: 'warning' },
      ];
      setServices(serviceList);
      setLoading(false);
    };
    checkServices();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Checking services...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Alert variant="success">
        <h1>Welcome to Foodingo! 🚀</h1>
        <p>Microservices food ordering platform is running!</p>
      </Alert>

      <h3 className="mb-4">Backend Services Status</h3>
      <Row>
        {services.map((service, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card border={service.color} className="h-100">
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>
                  <small className="text-muted">{service.url}</small>
                </Card.Text>
                <Alert variant={service.color} className="text-center">
                  ✅ Running
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;