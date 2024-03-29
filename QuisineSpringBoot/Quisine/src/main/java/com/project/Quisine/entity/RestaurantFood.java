package com.project.Quisine.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class RestaurantFood {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
	@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private UserEntity restaurant;
    
	@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;
    
    private float rate;
}