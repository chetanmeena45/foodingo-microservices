package com.foodingo.restaurantservice.repository;

import com.foodingo.restaurantservice.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
    List<MenuItem> findByRestaurantIdAndIsAvailableTrue(String restaurantId);
    List<MenuItem> findByRestaurantId(String restaurantId);
    Optional<MenuItem> findByIdAndRestaurantId(String id, String restaurantId);
}
