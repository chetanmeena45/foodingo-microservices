package com.foodingo.restaurantservice.service;

import com.foodingo.restaurantservice.dto.MenuItemRequest;
import com.foodingo.restaurantservice.dto.MenuItemResponse;
import com.foodingo.restaurantservice.model.MenuItem;
import com.foodingo.restaurantservice.model.Restaurant;
import com.foodingo.restaurantservice.repository.MenuItemRepository;
import com.foodingo.restaurantservice.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuItemService {
    
    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;
    
    public MenuItemResponse createMenuItem(String restaurantId, MenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + restaurantId));
        
        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(request.getCategory());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setRestaurant(restaurant);
        
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return mapToMenuItemResponse(savedMenuItem);
    }
    
    public List<MenuItemResponse> getMenuItemsByRestaurant(String restaurantId) {
        return menuItemRepository.findByRestaurantIdAndIsAvailableTrue(restaurantId).stream()
                .map(this::mapToMenuItemResponse)
                .collect(Collectors.toList());
    }
    
    public List<MenuItemResponse> getAllMenuItemsByRestaurant(String restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId).stream()
                .map(this::mapToMenuItemResponse)
                .collect(Collectors.toList());
    }
    
    public MenuItemResponse getMenuItemById(String restaurantId, String menuItemId) {
        MenuItem menuItem = menuItemRepository.findByIdAndRestaurantId(menuItemId, restaurantId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        return mapToMenuItemResponse(menuItem);
    }
    
    public MenuItemResponse updateMenuItem(String restaurantId, String menuItemId, MenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findByIdAndRestaurantId(menuItemId, restaurantId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(request.getCategory());
        menuItem.setImageUrl(request.getImageUrl());
        
        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);
        return mapToMenuItemResponse(updatedMenuItem);
    }
    
    public void deleteMenuItem(String restaurantId, String menuItemId) {
        MenuItem menuItem = menuItemRepository.findByIdAndRestaurantId(menuItemId, restaurantId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        menuItem.setIsAvailable(false);
        menuItemRepository.save(menuItem);
    }
    
    private MenuItemResponse mapToMenuItemResponse(MenuItem menuItem) {
        MenuItemResponse response = new MenuItemResponse();
        response.setId(menuItem.getId());
        response.setName(menuItem.getName());
        response.setDescription(menuItem.getDescription());
        response.setPrice(menuItem.getPrice());
        response.setCategory(menuItem.getCategory());
        response.setIsAvailable(menuItem.getIsAvailable());
        response.setImageUrl(menuItem.getImageUrl());
        return response;
    }
}
