package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Quisine.entity.RestaurantFood;

public interface RestaurantFoodRepository extends JpaRepository<RestaurantFood, Integer> {

    List<RestaurantFood> findByRestaurantUserId(int id);
}
