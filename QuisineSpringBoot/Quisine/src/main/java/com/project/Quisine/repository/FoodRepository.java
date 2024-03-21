package com.project.Quisine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Quisine.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Integer> {

	Food getByFoodName(String food);
}
