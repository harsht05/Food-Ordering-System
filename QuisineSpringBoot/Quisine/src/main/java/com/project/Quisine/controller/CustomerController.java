package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.entity.Orders;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.service.OrdersService;
import com.project.Quisine.service.UserEntityService;

public class CustomerController {

    @Autowired
	private UserEntityService userEntityService;
	
	@Autowired 
	private OrdersService ordersService;

    @PostMapping("placeOrder")
	public ResponseEntity<Orders> placeOrder(@RequestBody Orders order) {
		
		return new ResponseEntity<Orders>(ordersService.addOrder(order), HttpStatus.CREATED);
	}

    @GetMapping("getCustomerOrders/{id}")
	public ResponseEntity<List<OrdersDTO>> getCustomerOrders(@PathVariable int id) {
		
		return new ResponseEntity<List<OrdersDTO>>(ordersService.getCustomerOrders(id), HttpStatus.OK);
	}

    @PostMapping("updateCustomer")
	public void updateCustomer(@RequestBody UserEntity customer) {
		
		userEntityService.updateCustomerCustom(customer.getUserId(), customer.getUserName(), customer.getUserContact());
	}
}
