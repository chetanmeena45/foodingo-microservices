package com.foodingo.orderservice.dto;
import lombok.Data;
import java.math.BigDecimal;
@Data
public class OrderItemRequest {
    private String menuItemId; private String name; private Integer quantity; private BigDecimal price;
}
