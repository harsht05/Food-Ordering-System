package com.project.Quisine.dto;

import java.util.Date;

import lombok.Data;

@Data
public class OrdersDTO {
    
    private int orderId; 
	private int quantity;
	private float totalPrice;
	private Date date;
	private String deliveryAddress;
	
	private Customer customer;
	private Restaurant restaurant;
	private FoodDTO food;
	
	private boolean cancelledOrder;
}
