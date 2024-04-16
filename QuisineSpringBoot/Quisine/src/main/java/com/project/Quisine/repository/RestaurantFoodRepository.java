package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.Quisine.entity.RestaurantFood;

import jakarta.transaction.Transactional;

public interface RestaurantFoodRepository extends JpaRepository<RestaurantFood, Integer> {

    List<RestaurantFood> findByRestaurantUserId(int id);

    List<RestaurantFood> findByRestaurantUserName(String name);
    
    @Query("SELECT MIN(rf.rate) FROM RestaurantFood rf WHERE rf.restaurant.userName = :userName")
    Float findMinRateByRestaurantUserName(String userName);
    
    @Query("SELECT MAX(rf.rate) FROM RestaurantFood rf WHERE rf.restaurant.userName = :userName")
    Float findMaxRateByRestaurantUserName(String userName);
    
    @Query("SELECT rf FROM RestaurantFood rf WHERE rf.restaurant.userCity = :city ORDER BY rf.rate ASC LIMIT 1")
    RestaurantFood findCheapestRestaurantFoodByCity(String city);
    
    @Transactional
    @Modifying
    @Query("UPDATE RestaurantFood rf SET rf.rate = :rate WHERE rf.id = :id")
    void updateRateById(@Param("id") int id, @Param("rate") float rate);
}
