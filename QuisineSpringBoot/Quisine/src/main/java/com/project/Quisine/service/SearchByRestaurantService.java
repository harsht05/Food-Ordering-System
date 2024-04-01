package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.repository.UserEntityRepository;

@Service
public class SearchByRestaurantService {
	@Autowired
	private UserEntityRepository userEntityRepository;

	@Autowired
	private ModelMapper modelMapper;

	public List<Restaurant> searchByName(String name) {
		List<UserEntity> restaurants = userEntityRepository.findByRole("restaurant");

		return restaurants.stream().filter(user -> user.getUserName().toLowerCase().contains(name.toLowerCase()))
				.map(restaurant -> modelMapper.map(restaurant, Restaurant.class)).collect(Collectors.toList());
	}
}
