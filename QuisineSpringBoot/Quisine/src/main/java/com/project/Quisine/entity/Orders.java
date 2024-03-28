package com.project.Quisine.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int orderId; 

	private int quantity;
	private float totalPrice;
	private Date date;
	private String deliveryAddress;
	
	@ManyToOne
	@JoinColumn(name = "rest_id")
	private UserEntity restaurant;
	
	@ManyToOne
	@JoinColumn(name = "cust_id")
	private UserEntity customer;

	@ManyToOne
	@JoinColumn(name = "food_id")
	private Food food;
}
