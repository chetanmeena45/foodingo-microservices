package com.foodingo.orderservice.dto;
import com.foodingo.orderservice.model.OrderStatus;
import lombok.Data;
@Data
public class StatusUpdateRequest { private OrderStatus status; }
