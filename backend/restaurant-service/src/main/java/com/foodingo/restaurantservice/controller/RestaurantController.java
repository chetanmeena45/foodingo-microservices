package com.foodingo.restaurantservice.controller;

import com.foodingo.restaurantservice.dto.ApiResponse;
import com.foodingo.restaurantservice.dto.RestaurantRequest;
import com.foodingo.restaurantservice.dto.RestaurantResponse;
import com.foodingo.restaurantservice.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    
    private final RestaurantService restaurantService;
    
    // Helper method to get current authenticated user email
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : null;
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createRestaurant(@RequestBody RestaurantRequest request) {
        RestaurantResponse response = restaurantService.createRestaurant(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Restaurant created successfully", response));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse> getAllRestaurants() {
        List<RestaurantResponse> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(ApiResponse.success("Restaurants fetched successfully", restaurants));
    }
    
    @GetMapping("/active")
    public ResponseEntity<ApiResponse> getActiveRestaurants() {
        List<RestaurantResponse> restaurants = restaurantService.getActiveRestaurants();
        return ResponseEntity.ok(ApiResponse.success("Active restaurants fetched successfully", restaurants));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRestaurantById(@PathVariable String id) {
        RestaurantResponse restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.ok(ApiResponse.success("Restaurant fetched successfully", restaurant));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateRestaurant(
            @PathVariable String id,
            @RequestBody RestaurantRequest request) {
        RestaurantResponse updatedRestaurant = restaurantService.updateRestaurant(id, request);
        return ResponseEntity.ok(ApiResponse.success("Restaurant updated successfully", updatedRestaurant));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteRestaurant(@PathVariable String id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.ok(ApiResponse.success("Restaurant deactivated successfully", null));
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Restaurant Service is working! ✅");
    }
}
