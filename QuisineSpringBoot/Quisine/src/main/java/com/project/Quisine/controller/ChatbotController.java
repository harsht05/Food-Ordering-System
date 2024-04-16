package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.dto.RestaurantFoodDTO;
import com.project.Quisine.service.RestaurantFoodService;
import com.project.Quisine.service.UserEntityService;

@RestController
@RequestMapping("/chatbot/")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatbotController {

	@Autowired
	private UserEntityService userEntityService;
	
	@Autowired
	private RestaurantFoodService restaurantFoodService;
	
	@GetMapping("getRestaurantByCity/{city}")
	public ResponseEntity<List<Restaurant>> findRestaurantByCityName(@PathVariable String city) {
		
		return new ResponseEntity<List<Restaurant>>(userEntityService.getRestaurantByCity(city.toLowerCase()), HttpStatus.OK);
	}
	
	@GetMapping("getRestaurantFoodByName/{name}")
	public ResponseEntity<List<RestaurantFoodDTO>> getRestaurantFoodById(@PathVariable String name) {
		
		return new ResponseEntity<List<RestaurantFoodDTO>>(restaurantFoodService.getRestaurantFoodByName(name), HttpStatus.OK);
	}
	
	@GetMapping("getMinFoodPrice/{name}")
	public ResponseEntity<Float> getMinRestaurantFoodPrice(@PathVariable String name) {
		
		return new ResponseEntity<Float>(restaurantFoodService.getMinPrice(name), HttpStatus.OK);
	}
	
	@GetMapping("getMaxFoodPrice/{name}")
	public ResponseEntity<Float> getMaxRestaurantFoodPrice(@PathVariable String name) {
		
		return new ResponseEntity<Float>(restaurantFoodService.getMaxPrice(name), HttpStatus.OK);
	}
	
	@GetMapping("getCheapHotelInCity/{name}")
	public ResponseEntity<RestaurantFoodDTO> getCheapHotelInCity(@PathVariable String name) {
		
		System.out.println(name);
		return new ResponseEntity<RestaurantFoodDTO>(restaurantFoodService.getCheapRestaurantFoodByCity(name), HttpStatus.OK);
	}
}
