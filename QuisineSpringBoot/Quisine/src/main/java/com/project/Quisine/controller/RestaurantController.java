package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.Quisine.dto.RestaurantFoodDTO;
import com.project.Quisine.service.RestaurantFoodService;

public class RestaurantController {
    
    @Autowired
	private RestaurantFoodService restaurantFoodService;
	
    @GetMapping("getRestaurantFoods/{id}")
	public ResponseEntity<List<RestaurantFoodDTO>> getRestaurantFoods(@PathVariable int id) {
		
		return new ResponseEntity<List<RestaurantFoodDTO>>(restaurantFoodService.getRestaurantFood(id), HttpStatus.OK);
	}
}
