package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.dto.RestaurantFoodDTO;
import com.project.Quisine.entity.Food;
import com.project.Quisine.entity.RestaurantFood;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.service.FoodService;
import com.project.Quisine.service.RestaurantFoodService;
import com.project.Quisine.service.UserEntityService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/restaurant/")
@CrossOrigin(origins = "http://localhost:4200")
public class RestaurantController {

	@Autowired
	private UserEntityService userEntityService;

	@Autowired
	private FoodService foodService;
    
    @Autowired
	private RestaurantFoodService restaurantFoodService;
	
    @GetMapping("getRestaurantFoods/{id}")
	public ResponseEntity<List<RestaurantFoodDTO>> getRestaurantFoods(@PathVariable int id) {
		
		return new ResponseEntity<List<RestaurantFoodDTO>>(restaurantFoodService.getRestaurantFood(id), HttpStatus.OK);
	}



	@GetMapping("getAllRestaurants")
	public ResponseEntity<List<Restaurant>> customerDashboard() {

		return new ResponseEntity<List<Restaurant>>(userEntityService.getAllRestaurants(), HttpStatus.OK);
	}

	@PostMapping("addRestaurantFood")
	public ResponseEntity<RestaurantFood> addRestaurantFood(@RequestBody RestaurantFood restaurantFood) {

		Food food = foodService.getByfoodName(restaurantFood.getFood().getFoodName());

		if (food == null) {

			food = foodService.addFood(restaurantFood.getFood());
		}

		restaurantFood.setFood(food);

		return new ResponseEntity<RestaurantFood>(restaurantFoodService.addRestaurantFood(restaurantFood),
				HttpStatus.CREATED);
	}

	

//	@GetMapping("getRestaurantOrders/{restaurantId}")
//	public ResponseEntity<List<Orders>> getRestaurantOrders(@PathVariable int restaurantId) {
//		Restaurant restaurant = userEntityService.getRestaurantById(restaurantId);
//
//		if (restaurant == null) {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//
//		List<OrdersDTO> restaurantOrders = restaurant.getRestaurantOrders();
//		return new ResponseEntity<>(restaurantOrders, HttpStatus.OK);
//	}

	@DeleteMapping("deleteRestaurantFood/{foodId}")
	public ResponseEntity<?> deleteRestaurantFood(@PathVariable int foodId) {
		try {
			restaurantFoodService.deleteRestaurantFood(foodId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to delete food item", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("getFoodItem/{foodId}")
	public ResponseEntity<?> getFoodItem(@PathVariable int foodId) {
		try {
			RestaurantFood restaurantFood = restaurantFoodService.getFoodItem(foodId);
			System.out.println(restaurantFood);
			if (restaurantFood != null) {
				return new ResponseEntity<>(restaurantFood, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to retrieve food item", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("getRestaurantById/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable int id) {

		return new ResponseEntity<Restaurant>(userEntityService.getRestaurantById(id), HttpStatus.OK);
	}

//	Unnecessary methods : 
	@GetMapping("getAllRestaurantFoods")
	public ResponseEntity<List<RestaurantFoodDTO>> getAllRestaurantFoods() {

		return new ResponseEntity<List<RestaurantFoodDTO>>(restaurantFoodService.getAllRestaurantFood(), HttpStatus.OK);
	}

	@GetMapping("getAllFoods")
	public ResponseEntity<List<Food>> getAllFoods() {

		return new ResponseEntity<List<Food>>(foodService.getAllFood(), HttpStatus.OK);
	}

	@GetMapping("getRestaurantFoodById/{id}")
	public ResponseEntity<RestaurantFoodDTO> getRestaurantFoodById(@PathVariable int id) {

		return new ResponseEntity<RestaurantFoodDTO>(restaurantFoodService.getRestaurantFoodItemById(id),
				HttpStatus.OK);
	}

	@PutMapping("updateRestaurantFoodRate")
	public ResponseEntity<?> updateRestaurantFoodRate(@RequestParam("foodId") int foodId,
			@RequestParam("updatedRate") float updatedRate, @RequestBody RestaurantFoodDTO updateInfo) {
		System.out.println("Food Id: " + foodId + " updatedRate: " + updatedRate);
		try {
			restaurantFoodService.updateRateById(foodId, updatedRate);
			return new ResponseEntity<>("Restaurant food item rate updated successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to update restaurant food item rate", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("updateRestaurant/{id}")
	@Transactional
	public ResponseEntity<UserEntity> updateRestaurant(@PathVariable int id, @RequestBody UserEntity userEntity) {
	    UserEntity existingUserEntity = userEntityService.getUserById(id);
	    System.out.println("hujhguihuihuihuihihihuihiuhui");
	    
	        existingUserEntity.setUserName(userEntity.getUserName());
	        existingUserEntity.setUserContact(userEntity.getUserContact());
	        existingUserEntity.setUserCity(userEntity.getUserCity());
	        existingUserEntity.setUserState(userEntity.getUserState());
	        existingUserEntity.setUserPin(userEntity.getUserPin());
	        existingUserEntity.setUserImage(userEntity.getUserImage());
	        
	        userEntityService.addUser(existingUserEntity); // Save the updated entity
	        
	        return new ResponseEntity<>(existingUserEntity, HttpStatus.OK);
	    
	}
}
