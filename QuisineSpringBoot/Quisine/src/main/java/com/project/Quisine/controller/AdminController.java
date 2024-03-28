package com.project.Quisine.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.dto.Customer;
import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.service.OrdersService;
import com.project.Quisine.service.UserEntityService;

@RestController
@RequestMapping("/admin/")
public class AdminController {
	
	@Autowired
	private UserEntityService userEntityService;
	
	@Autowired
	private OrdersService ordersService;
	
	@GetMapping("getAllCustomers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		
		return new ResponseEntity<List<Customer>>(userEntityService.getAllCustomers(), HttpStatus.OK);
	}
	@GetMapping("getCustomerById/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
		
		return new ResponseEntity<Customer>(userEntityService.getCustomerDetailsById(id), HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteCustomer/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable int customerId)
	{
		userEntityService.deleteCustomer(customerId);
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
	

	@DeleteMapping(path ="/deleteRestaurant/{restId}")
	public ResponseEntity<String> deleteRestaurant(@PathVariable int restId)
	{
		userEntityService.deleteRestaurant(restId);
		return new ResponseEntity<String>("Restaurant Deleted!", HttpStatus.OK);
	}
	
	//Orders
	@GetMapping("getAllOrders")
	public ResponseEntity<List<OrdersDTO>> getAllOrders() {
		
		return new ResponseEntity<List<OrdersDTO>>(ordersService.getAllCustomerOrders(), HttpStatus.OK);
	}


}
