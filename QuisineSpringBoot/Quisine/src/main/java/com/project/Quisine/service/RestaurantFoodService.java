package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.project.Quisine.dto.RestaurantFoodDTO;
import com.project.Quisine.repository.RestaurantFoodRepository;

public class RestaurantFoodService {
    
    @Autowired
	private RestaurantFoodRepository restaurantFoodRepository;
	
	@Autowired
	private ModelMapper modelMapper;

    public List<RestaurantFoodDTO> getRestaurantFood(int id) {
		
		return restaurantFoodRepository.findByRestaurantUserId(id).stream().map(restFood->modelMapper.map(restFood, RestaurantFoodDTO.class)).collect(Collectors.toList());
	}
}
