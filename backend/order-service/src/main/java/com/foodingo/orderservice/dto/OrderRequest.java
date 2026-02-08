package com.foodingo.orderservice.dto;
import lombok.Data;
import java.util.List;
@Data
public class OrderRequest {
    private String userId; private String restaurantId; private String deliveryAddress;
    private String customerPhone; private String specialInstructions; private List<OrderItemRequest> items;
}
