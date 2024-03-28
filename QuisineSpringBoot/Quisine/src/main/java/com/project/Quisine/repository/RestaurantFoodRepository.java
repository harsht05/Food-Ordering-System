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

    @Transactional
    @Modifying
    @Query("UPDATE RestaurantFood rf SET rf.rate = :rate WHERE rf.id = :id")
    void updateRateById(@Param("id") int id, @Param("rate") float rate);
}
