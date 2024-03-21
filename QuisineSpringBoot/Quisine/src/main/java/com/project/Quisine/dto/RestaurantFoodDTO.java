package com.project.Quisine.dto;

import lombok.Data;

@Data
public class RestaurantFoodDTO {
 
    private int id;
	
	private FoodDTO food;
	private Restaurant restaurant;
	private float rate;
}
