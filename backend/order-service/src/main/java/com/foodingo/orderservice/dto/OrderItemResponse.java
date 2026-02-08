package com.foodingo.orderservice.dto;
import lombok.Data;
import java.math.BigDecimal;
@Data
public class OrderItemResponse {
    private String id, menuItemId, name; private Integer quantity; private BigDecimal price;
}
