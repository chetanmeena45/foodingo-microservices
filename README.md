<div align="center">
  <h1>🍔 Foodingo - Microservices Food Ordering Platform</h1>
</div>


## 📋 Table of Contents

- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Microservices](#-microservices)
- [API Documentation](#-api-documentation)
- [Frontend](#-frontend)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Monitoring](#-monitoring)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🏗 Architecture

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Frontend  │────▶│ API Gateway  │────▶│  User Service   │
│   (React)   │◀────│              │◀────│  (Auth/JWT)     │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │                       │
                           │                       │
                           ▼                       ▼
                    ┌─────────────────┐     ┌─────────────────┐
                    │ Restaurant Svc  │     │   Order Service │
                    │   (CRUD/Menu)   │     │  (Orders/Status)│
                    └─────────────────┘     └─────────────────┘
                                                   │
                                                   │
                                                   ▼
                                        ┌─────────────────┐
                                        │ Notification Svc│
                                        │   (Messaging)   │
                                        └─────────────────┘


## 🛠 Tech Stack

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Core language |
| Spring Boot | 3.2.0 | Application framework |
| Spring Cloud Gateway | 2023.0.0 | API Gateway |
| Spring Security | 6.2.0 | Authentication & authorization |
| JWT | 0.12.5 | Token-based authentication |
| Spring Data JPA | 3.2.0 | Database ORM |
| Hibernate | 6.3.1 | JPA implementation |
| PostgreSQL | 16 | Production database |
| H2 Database | 2.2.224 | Development database |
| RabbitMQ | 3.12 | Message broker |
| Lombok | 1.18.30 | Boilerplate code reduction |
| MapStruct | 1.5.5 | DTO mapping |
| Maven | 3.9.0 | Build tool |

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| Vite | 5.0.0 | Build tool |
| React Router | 6.20.0 | Routing |
| Redux Toolkit | 2.0.0 | State management |
| React Hook Form | 7.48.0 | Form handling |
| Zod | 3.22.0 | Validation |
| Axios | 1.6.0 | HTTP client |
| Bootstrap | 5.3.0 | UI components |
| React Bootstrap | 2.9.0 | Bootstrap React components |
| React Hot Toast | 2.4.0 | Notifications |
| React Icons | 4.12.0 | Icons |

### **DevOps & Tools**
| Tool | Version | Purpose |
|------|---------|---------|
| Docker | 24.0 | Containerization |
| Docker Compose | 2.23 | Multi-container orchestration |
| Git | 2.43 | Version control |
| Maven | 3.9 | Build automation |
| Postman | Latest | API testing |
| Swagger/OpenAPI | 2.3.0 | API documentation |
| JUnit | 5.10 | Unit testing |
| Mockito | 5.7 | Mocking framework |

## ✨ Features

### **User Features**
- ✅ JWT-based authentication & authorization
- ✅ User registration & login
- ✅ Role-based access (USER, ADMIN)
- ✅ Profile management
- ✅ Order history & tracking

### **Restaurant Features**
- ✅ Browse restaurants with filters
- ✅ Search by cuisine, name, location
- ✅ View restaurant details & menu
- ✅ Real-time availability status

### **Order Features**
- ✅ Add to cart with quantity control
- ✅ Apply promo codes
- ✅ Multiple payment methods (COD, card)
- ✅ Real-time order status updates
- ✅ Order cancellation
- ✅ Email notifications (RabbitMQ)

### **Admin Features**
- ✅ Dashboard with analytics
- ✅ Restaurant CRUD operations
- ✅ Menu item management
- ✅ Order status management
- ✅ User management
- ✅ Revenue tracking

## 📁 Project Structure

```bash
foodingo/
├── backend/
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/foodingo/gateway/
│   │   │   │   │   ├── config/
│   │   │   │   │   ├── filter/
│   │   │   │   │   └── ApiGatewayApplication.java
│   │   │   │   └── resources/
│   │   │   │       └── application.yml
│   │   │   └── test/
│   │   └── pom.xml
│   │
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/foodingo/userservice/
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   ├── repository/
│   │   │   │   │   ├── model/
│   │   │   │   │   ├── dto/
│   │   │   │   │   ├── config/
│   │   │   │   │   └── UserServiceApplication.java
│   │   │   │   └── resources/
│   │   │   │       └── application.yml
│   │   │   └── test/
│   │   └── pom.xml
│   │
│   ├── restaurant-service/
│   │   └── [similar structure to user-service]
│   │
│   ├── order-service/
│   │   └── [similar structure to user-service]
│   │
│   └── docker-compose.yml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── ui/
│   │   │   └── features/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── restaurant/
│   │   │   ├── order/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── store/
│   │   │   └── slices/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── api/
│   ├── database/
│   └── deployment/
│
├── scripts/
│   ├── start-dev.sh
│   ├── build.sh
│   └── deploy.sh
│
├── .gitignore
├── .env.example
├── README.md
└── LICENSE


## 📦 Prerequisites

- **Java JDK 21** or higher
- **Node.js 18** or higher
- **Maven 3.9** or higher
- **Docker** & **Docker Compose** (optional)
- **PostgreSQL 16** (if running locally)
- **RabbitMQ 3.12** (if running locally)
- **Git**

## 🚀 Quick Start

### **Clone Repository**
```bash
git clone https://github.com/chetanmeena45/foodingo-microservices.git
cd foodingo-microservices
```

### **Backend Setup**

#### Option 1: Using Docker (Recommended)
```bash
cd backend
docker-compose up -d
```

#### Option 2: Manual Setup
```bash
# Start PostgreSQL and RabbitMQ locally first

# Terminal 1 - User Service
cd backend/user-service
./mvnw spring-boot:run

# Terminal 2 - Restaurant Service
cd ../restaurant-service
./mvnw spring-boot:run

# Terminal 3 - Order Service
cd ../order-service
./mvnw spring-boot:run

# Terminal 4 - API Gateway
cd ../api-gateway
./mvnw spring-boot:run
```

### **Frontend Setup**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### **Access Applications**
| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| API Gateway | http://localhost:8080 | - |
| User Service | http://localhost:8081/api/users | - |
| Restaurant Service | http://localhost:8082/api/restaurants | - |
| Order Service | http://localhost:8083/api/orders | - |
| H2 Console (User) | http://localhost:8081/api/users/h2-console | sa/password |
| RabbitMQ Management | http://localhost:15672 | guest/guest |
| Swagger UI (User) | http://localhost:8081/api/users/swagger-ui.html | - |

### **Default Admin Credentials**
```
Email: admin@foodingo.com
Password: admin123
```

## 🏗 Microservices

### **1. API Gateway (Port: 8080)**
- Routes requests to appropriate services
- JWT validation filter
- Rate limiting
- CORS configuration
- Request/response logging

### **2. User Service (Port: 8081)**
- User registration & login
- JWT token generation
- Role-based access control
- Profile management
- H2 console for development

### **3. Restaurant Service (Port: 8082)**
- Restaurant CRUD operations
- Menu item management
- Cuisine categorization
- Availability status
- Search & filter functionality

### **4. Order Service (Port: 8083)**
- Order creation & management
- Real-time status updates
- Order history
- Inter-service communication
- Event publishing

### **5. RabbitMQ Event Bus**
- Order placed events
- Notification service (optional)
- Async communication
- Message persistence

## 📚 API Documentation

### **User Service Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login & get JWT | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}
```

### **Restaurant Service Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/restaurants` | Get all restaurants | No |
| GET | `/api/restaurants/{id}` | Get restaurant by ID | No |
| GET | `/api/restaurants/active` | Get active restaurants | No |
| POST | `/api/restaurants` | Create restaurant | Yes (ADMIN) |
| PUT | `/api/restaurants/{id}` | Update restaurant | Yes (ADMIN) |
| DELETE | `/api/restaurants/{id}` | Delete restaurant | Yes (ADMIN) |
| GET | `/api/restaurants/{id}/menu` | Get menu items | No |
| POST | `/api/restaurants/{id}/menu` | Add menu item | Yes (ADMIN) |

### **Order Service Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders/my-orders` | Get user orders | Yes |
| GET | `/api/orders/{id}` | Get order by ID | Yes |
| PUT | `/api/orders/{id}/status` | Update order status | Yes (ADMIN) |
| PUT | `/api/orders/{id}/cancel` | Cancel order | Yes |

## 🎨 Frontend

### **Pages & Components**

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured restaurants |
| Login | `/login` | User login form |
| Register | `/register` | User registration |
| Restaurants | `/restaurants` | Browse all restaurants |
| Restaurant Detail | `/restaurants/:id` | View restaurant & menu |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Order checkout |
| Orders | `/orders` | Order history |
| Profile | `/profile` | User profile |
| Admin Dashboard | `/admin` | Admin analytics |
| Admin Orders | `/admin/orders` | Manage orders |
| Admin Restaurants | `/admin/restaurants` | Manage restaurants |

### **State Management (Redux Toolkit)**

```javascript
// Example: Using Redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../store/slices/restaurantSlice';

const RestaurantsPage = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector(state => state.restaurants);
  
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);
  
  // ...
};
```

### **Custom Hooks**

```javascript
// useAuth.js
export const useAuth = () => {
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = !!user;
  
  const login = async (credentials) => {
    // Login logic
  };
  
  return { user, isAuthenticated, login };
};
```

## 📊 Database Schema

### **User Service**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Restaurant Service**
```sql
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50),
    cuisine_type VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Order Service**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    restaurant_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'CREATED',
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_address TEXT NOT NULL,
    customer_phone VARCHAR(50),
    special_instructions TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50)
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

## 🧪 Testing

### **Backend Tests**
```bash
# Run all tests
cd backend
mvn clean test

# Run specific service tests
cd user-service
mvn test -Dtest=UserServiceTest

# Run integration tests
mvn verify
```

### **Frontend Tests**
```bash
cd frontend
npm run test
npm run test:coverage
npm run test:e2e
```

## 🚢 Deployment

### **Docker Deployment**
```bash
# Build all images
cd backend
docker-compose build

# Run containers
docker-compose up -d

# Scale a service
docker-compose up -d --scale order-service=3
```

### **Production Deployment (Render)**

1. **Backend Services**
   - Create new Web Service for each microservice
   - Set build command: `./mvnw clean package`
   - Set start command: `java -jar target/*.jar`
   - Add environment variables

2. **Frontend (Vercel)**
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

### **Environment Variables**

Create `.env` file in each service:

```properties
# Database
DB_URL=jdbc:postgresql://localhost:5432/foodingo
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRATION=86400000

# RabbitMQ
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest

# Service URLs
USER_SERVICE_URL=http://user-service:8081
RESTAURANT_SERVICE_URL=http://restaurant-service:8082
ORDER_SERVICE_URL=http://order-service:8083
```

## 📈 Monitoring

### **Health Checks**
```bash
# API Gateway health
curl http://localhost:8080/actuator/health

# Service metrics
curl http://localhost:8080/actuator/metrics

# Gateway routes
curl http://localhost:8080/actuator/gateway/routes
```

### **Logging**
```yaml
# application.yml
logging:
  level:
    com.foodingo: DEBUG
    org.springframework.web: INFO
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 30
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Pull Request Guidelines**
- Update documentation
- Add tests for new features
- Follow code style
- Keep PRs focused on single feature

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**Chetan Meena**
- GitHub: [@chetanmeena45](https://github.com/chetanmeena45)
- Project Link: [https://github.com/chetanmeena45/foodingo-microservices](https://github.com/chetanmeena45/foodingo-microservices)

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Microservices.io](https://microservices.io/)
- [12 Factor App](https://12factor.net/)

---

<div align="center">
  <sub>Built with ❤️ by Chetan Meena</sub>
  <br />
  <sub>© 2026 Foodingo. All rights reserved.</sub>
</div>
```

This README is now ready to be added directly to your repository. Just copy the entire content and replace the existing `README.md` file in your repository.
