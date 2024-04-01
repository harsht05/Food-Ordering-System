package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.RestaurantFoodDTO;
import com.project.Quisine.entity.RestaurantFood;
import com.project.Quisine.repository.RestaurantFoodRepository;

@Service
public class RestaurantFoodService {
    
    @Autowired
	private RestaurantFoodRepository restaurantFoodRepository;
	
	@Autowired
	private ModelMapper modelMapper;

    public List<RestaurantFoodDTO> getRestaurantFood(int id) {
		
		return restaurantFoodRepository.findByRestaurantUserId(id).stream().map(restFood->modelMapper.map(restFood, RestaurantFoodDTO.class)).collect(Collectors.toList());
	}

	public RestaurantFood addRestaurantFood(RestaurantFood restaurantFood) {

		return restaurantFoodRepository.save(restaurantFood);
	}

	public List<RestaurantFoodDTO> getAllRestaurantFood() {

		return restaurantFoodRepository.findAll().stream()
				.map(restFood -> modelMapper.map(restFood, RestaurantFoodDTO.class)).collect(Collectors.toList());
	}

	public void deleteRestaurantFood(int id) {

		restaurantFoodRepository.deleteById(id);

	}

	public RestaurantFood getFoodItem(int foodId) {
		return restaurantFoodRepository.findById(foodId).get();
	}

	public RestaurantFoodDTO getRestaurantFoodItemById(int id) {

		return modelMapper.map(restaurantFoodRepository.findById(id).get(), RestaurantFoodDTO.class);
	}

	public void updateRestaurantFood(RestaurantFoodDTO restaurantFoodDTO) {
		RestaurantFood restaurantFood = modelMapper.map(restaurantFoodDTO, RestaurantFood.class);
		restaurantFoodRepository.save(restaurantFood);
	}
	
	 public void updateRateById(int id, float rate) {
	        restaurantFoodRepository.updateRateById(id, rate);
	}

}
