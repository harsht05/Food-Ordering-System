package com.project.Quisine.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class UserEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	private String userName;
	private String userEmail;
	private String userPass;
	private String userImg;
	private String restOwnerName;
	private String userContact;
	private String userAddress;
	private String userCity;
	private String userState;
	private int userPin;
	private String role;

	private String userImage;
	
	@JsonIgnore
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RestaurantFood> restaurantFoods;
	
	@JsonIgnore
	@OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> restaurantOrders;
	
	@JsonIgnore
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orders> customerOrders;
}
