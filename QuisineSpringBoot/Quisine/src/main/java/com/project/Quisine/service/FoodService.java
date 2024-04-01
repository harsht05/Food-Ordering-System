package com.project.Quisine.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Quisine.entity.Food;
import com.project.Quisine.repository.FoodRepository;

@Service
public class FoodService {
    @Autowired FoodRepository foodRepository;
	
	public Food addFood(Food food) {
		
		return foodRepository.save(food);
	}
	
	public List<Food> getAllFood() {
		
		return foodRepository.findAll();
	}
	
	public Food getByfoodName(String food) {
		
		return foodRepository.getByFoodName(food);
	}
    
}
