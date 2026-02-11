package com.foodingo.orderservice.controller;

import com.foodingo.orderservice.dto.*;
import com.foodingo.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")  // ← USERS can create orders
    public ResponseEntity<ApiResponse> createOrder(@RequestBody OrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order created successfully", response));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable String id) {
        OrderResponse order = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.success("Order fetched successfully", order));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getOrdersByUser(@PathVariable String userId) {
        List<OrderResponse> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(ApiResponse.success("Orders fetched successfully", orders));
    }
    
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ApiResponse> getOrdersByRestaurant(@PathVariable String restaurantId) {
        List<OrderResponse> orders = orderService.getOrdersByRestaurant(restaurantId);
        return ResponseEntity.ok(ApiResponse.success("Restaurant orders fetched successfully", orders));
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('RESTAURANT') OR hasRole('ADMIN')")  // ← Restaurant owners + ADMIN
    public ResponseEntity<ApiResponse> updateOrderStatus(
            @PathVariable String id,
            @RequestBody StatusUpdateRequest request) {
        OrderResponse updatedOrder = orderService.updateOrderStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", updatedOrder));
    }
    
    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity<ApiResponse> getUserOrder(
            @PathVariable String id,
            @PathVariable String userId) {
        OrderResponse order = orderService.getOrderByIdAndUserId(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Order fetched successfully", order));
    }
    
    @GetMapping("/test")
    public String test() {
        return "Order Service is working! ✅";
    }
}
