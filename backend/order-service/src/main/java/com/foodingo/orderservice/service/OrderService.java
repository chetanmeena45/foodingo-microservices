package com.foodingo.orderservice.service;

import com.foodingo.orderservice.dto.*;
import com.foodingo.orderservice.model.*;
import com.foodingo.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public OrderResponse createOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setRestaurantId(request.getRestaurantId());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setSpecialInstructions(request.getSpecialInstructions());
        order.setStatus(OrderStatus.CREATED);
        order.setOrderDate(LocalDateTime.now());
        
        // ✅ FIXED: Mutable ArrayList (not immutable List.of())
        order.setItems(new ArrayList<>());
        
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(itemRequest.getMenuItemId());
            orderItem.setName(itemRequest.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(itemRequest.getPrice());
            orderItem.setOrder(order);
            
            totalAmount = totalAmount.add(itemRequest.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
            order.getItems().add(orderItem);
        }
        order.setTotalAmount(totalAmount);
        
        Order savedOrder = orderRepository.save(order);
        return mapToOrderResponse(savedOrder);
    }
    
    public OrderResponse getOrderById(String id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponse(order);
    }
    
    public List<OrderResponse> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId).stream().map(this::mapToOrderResponse).collect(Collectors.toList());
    }
    
    public List<OrderResponse> getOrdersByRestaurant(String restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId).stream().map(this::mapToOrderResponse).collect(Collectors.toList());
    }
    
    public OrderResponse getOrderByIdAndUserId(String id, String userId) {
        return orderRepository.findByIdAndUserId(id, userId)
                .map(this::mapToOrderResponse)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    
    public OrderResponse updateOrderStatus(String id, StatusUpdateRequest request) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(request.getStatus());
        return mapToOrderResponse(orderRepository.save(order));
    }
    
    private OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUserId());
        response.setRestaurantId(order.getRestaurantId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setDeliveryAddress(order.getDeliveryAddress());
        response.setCustomerPhone(order.getCustomerPhone());
        response.setSpecialInstructions(order.getSpecialInstructions());
        response.setOrderDate(order.getOrderDate());
        response.setItems(order.getItems().stream().map(item -> {
            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setId(item.getId());
            itemResponse.setMenuItemId(item.getMenuItemId());
            itemResponse.setName(item.getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setPrice(item.getPrice());
            return itemResponse;
        }).collect(Collectors.toList()));
        return response;
    }
}
