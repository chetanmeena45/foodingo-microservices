package com.foodingo.restaurantservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/menu-items")
public class MenuItemController {

    @Autowired
    private RestaurantController restaurantController; // Reuse existing!

    @PostMapping
    public ResponseEntity<?> createMenuItem(
            @PathVariable String restaurantId,
            @RequestBody Object menuItemData) {
        
        // TEMP: Just return success (no compilation needed)
        return ResponseEntity.ok().body("{\"success\":true,\"message\":\"Menu item endpoint working!\"}");
    }

    @GetMapping
    public ResponseEntity<?> getMenuItems(@PathVariable String restaurantId) {
    return ResponseEntity.ok().body("{\"success\":true,\"message\":\"Menu items endpoint working!\",\"restaurantId\":\"" + restaurantId + "\"}");
    }

}
