package com.project.Quisine.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.dto.Customer;
import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.entity.Feedback;
import com.project.Quisine.repository.OrdersRepository;
import com.project.Quisine.service.FeedBackService;
import com.project.Quisine.service.OrdersService;
import com.project.Quisine.service.UserEntityService;

@RestController
@RequestMapping("/admin/")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
	
	@Autowired
	private UserEntityService userEntityService;
	
	@Autowired
	private OrdersService ordersService;
	
	@Autowired
	private FeedBackService feedBackService;
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	
	@GetMapping(path="getAllCustomers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		
		return new ResponseEntity<List<Customer>>(userEntityService.getAllCustomers(), HttpStatus.OK);
	}
	@GetMapping(path="getCustomerById/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
		
		return new ResponseEntity<Customer>(userEntityService.getCustomerDetailsById(id), HttpStatus.OK);
	}
	
	@PutMapping(path="/deleteCustomer/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable int customerId,@RequestBody Boolean blockValue) throws Exception
	{
		userEntityService.deleteCustomer(customerId,blockValue);
		return new ResponseEntity<String>("Customer Deleted!", HttpStatus.OK);
	}
	
	//Restaurant Admin Access
	
	
	@GetMapping("getAllRestaurants")
	public ResponseEntity<List<Restaurant>> getAllRestaurant() {
		return new ResponseEntity<List<Restaurant>>(userEntityService.getAllRestaurants(), HttpStatus.OK);
	}
	
	@GetMapping("getRestaurantById/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable int id) {
		
		return new ResponseEntity<Restaurant>(userEntityService.getRestaurantById(id), HttpStatus.OK);
	}
	

	@PutMapping(path ="deleteRestaurant/{restId}")
	public ResponseEntity<String> deleteRestaurant(@PathVariable int restId ,@RequestBody Boolean blockValue) throws Exception
	{
		userEntityService.deleteRestaurant(restId,blockValue);
		return new ResponseEntity<String>("Restaurant Deleted!", HttpStatus.OK);
	}
	
	//Orders
	@GetMapping(path="getAllOrders")
	public ResponseEntity<List<OrdersDTO>> getAllOrders() {
		
		return new ResponseEntity<List<OrdersDTO>>(ordersService.getAllCustomerOrders(), HttpStatus.OK);
	}

	@GetMapping(path="getAllFeedback")
	public ResponseEntity<List<Feedback>> getAllFeedback() {
		return new ResponseEntity<List<Feedback>>(feedBackService.getAllFeedback(), HttpStatus.OK);
	}
	
	 @GetMapping("orderCountsByDate")
	 public ResponseEntity<List<Object[]>> getOrderCountsByDate() {
		    List<Object[]> results = ordersRepository.getOrderCountsByDate();
		    return ResponseEntity.ok().body(results);
		}


}
