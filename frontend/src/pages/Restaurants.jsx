import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantCard from '../components/features/restaurants/RestaurantCard';

const Restaurants = () => {
  const { restaurants, isLoading, error, filters, updateFilters } = useRestaurants();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: searchTerm });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, updateFilters]);

  const cuisineTypes = [...new Set(restaurants.map(r => r.cuisineType).filter(Boolean))];

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Restaurants Near You</h1>

      {/* Search and Filter Bar */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Cuisine Filters */}
      {cuisineTypes.length > 0 && (
        <div className="mb-4 text-center">
          <Button
            variant={!filters.cuisine ? 'primary' : 'outline-primary'}
            size="sm"
            className="me-2 mb-2"
            onClick={() => updateFilters({ cuisine: '' })}
          >
            All
          </Button>
          {cuisineTypes.map(cuisine => (
            <Button
              key={cuisine}
              variant={filters.cuisine === cuisine ? 'primary' : 'outline-primary'}
              size="sm"
              className="me-2 mb-2"
              onClick={() => updateFilters({ cuisine })}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading restaurants...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Restaurants Grid */}
      {!isLoading && !error && (
        <>
          {restaurants.length === 0 ? (
            <Alert variant="info" className="text-center">
              No restaurants found. Try adjusting your search.
            </Alert>
          ) : (
            <Row>
              {restaurants.map((restaurant) => (
                <Col key={restaurant.id} lg={4} md={6} className="mb-4">
                  <RestaurantCard restaurant={restaurant} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Restaurants;
