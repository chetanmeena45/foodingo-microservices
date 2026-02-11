package com.foodingo.restaurantservice.dto;

import lombok.Data;
import java.util.List;

@Data
public class RestaurantResponse {
    private String id;
    private String name;
    private String address;
    private String phone;
    private String cuisineType;
    private Double rating;
    private Boolean isActive;
    private List<MenuItemResponse> menuItems;
}
