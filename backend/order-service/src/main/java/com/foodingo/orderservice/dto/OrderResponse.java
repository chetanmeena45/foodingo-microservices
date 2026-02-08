package com.foodingo.orderservice.dto;
import com.foodingo.orderservice.model.OrderStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class OrderResponse {
    private String id, userId, restaurantId, deliveryAddress, customerPhone, specialInstructions;
    private OrderStatus status; private BigDecimal totalAmount; private LocalDateTime orderDate;
    private List<OrderItemResponse> items;
}
