package com.foodingo.restaurantservice.dto;

import lombok.Data;

@Data
public class RestaurantRequest {
    private String name;
    private String address;
    private String phone;
    private String cuisineType;
}
