package com.foodingo.orderservice.repository;
import com.foodingo.orderservice.model.Order;
import com.foodingo.orderservice.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUserId(String userId);
    List<Order> findByRestaurantId(String restaurantId);
    List<Order> findByUserIdAndStatus(String userId, OrderStatus status);
    Optional<Order> findByIdAndUserId(String id, String userId);
}
