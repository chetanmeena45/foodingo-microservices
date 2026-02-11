package com.foodingo.restaurantservice.service;

import com.foodingo.restaurantservice.dto.RestaurantRequest;
import com.foodingo.restaurantservice.dto.RestaurantResponse;
import com.foodingo.restaurantservice.dto.MenuItemResponse;
import com.foodingo.restaurantservice.model.Restaurant;
import com.foodingo.restaurantservice.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    
    private final RestaurantRepository restaurantRepository;
    
    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhone(request.getPhone());
        restaurant.setCuisineType(request.getCuisineType());
        
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return mapToRestaurantResponse(savedRestaurant);
    }
    
    public List<RestaurantResponse> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(this::mapToRestaurantResponse)
                .collect(Collectors.toList());
    }
    
    public List<RestaurantResponse> getActiveRestaurants() {
        return restaurantRepository.findByIsActiveTrue().stream()
                .map(this::mapToRestaurantResponse)
                .collect(Collectors.toList());
    }
    
    public RestaurantResponse getRestaurantById(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
        return mapToRestaurantResponse(restaurant);
    }
    
    public RestaurantResponse updateRestaurant(String id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
        
        restaurant.setName(request.getName());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhone(request.getPhone());
        restaurant.setCuisineType(request.getCuisineType());
        
        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return mapToRestaurantResponse(updatedRestaurant);
    }
    
    public void deleteRestaurant(String id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
        
        restaurant.setIsActive(false);
        restaurantRepository.save(restaurant);
    }
    
    private RestaurantResponse mapToRestaurantResponse(Restaurant restaurant) {
        RestaurantResponse response = new RestaurantResponse();
        response.setId(restaurant.getId());
        response.setName(restaurant.getName());
        response.setAddress(restaurant.getAddress());
        response.setPhone(restaurant.getPhone());
        response.setCuisineType(restaurant.getCuisineType());
        response.setRating(restaurant.getRating());
        response.setIsActive(restaurant.getIsActive());
        
        if (restaurant.getMenuItems() != null) {
            response.setMenuItems(restaurant.getMenuItems().stream()
                    .map(menuItem -> {
                        MenuItemResponse itemResponse = new MenuItemResponse();
                        itemResponse.setId(menuItem.getId());
                        itemResponse.setName(menuItem.getName());
                        itemResponse.setDescription(menuItem.getDescription());
                        itemResponse.setPrice(menuItem.getPrice());
                        itemResponse.setCategory(menuItem.getCategory());
                        itemResponse.setIsAvailable(menuItem.getIsAvailable());
                        itemResponse.setImageUrl(menuItem.getImageUrl());
                        return itemResponse;
                    })
                    .collect(Collectors.toList()));
        }
        
        return response;
    }
}
