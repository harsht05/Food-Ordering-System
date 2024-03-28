package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.Customer;
import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.repository.UserEntityRepository;


@Service
public class UserEntityService {

	@Autowired
	private UserEntityRepository userEntityRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public UserEntity addUser(UserEntity userEntity) {
		
		userEntity.setUserPass(passwordEncoder.encode(userEntity.getUserPass()));
		return userEntityRepository.save(userEntity);
	}
	
	public UserEntity findByEmail(String email) {
		
		return userEntityRepository.findByUserEmail(email);
	}
	
	
	public UserEntity findUserByEmailAndPass(String email, String pass) {
		
		return userEntityRepository.findByUserEmailAndUserPass(email, pass);
	}
	
	
	
	public int updateCustomerCustom(Integer userId, String userName, String userContact, String userAddress, String userCity, String userState, int userPin, String userImg) {
		
		return userEntityRepository.updateUserNameAndContact(userId, userName, userContact, userAddress, userCity, userState, userPin, userImg);
	}
	
	
	public UserEntity updatePassword(UserEntity user) {
		 
	    UserEntity existingUser = userEntityRepository.findByUserEmail(user.getUserEmail());

	    existingUser.setUserPass(user.getUserPass());
	    return userEntityRepository.save(existingUser);
	    
	}

	public UserEntity getUserById(int id) {
		
		return userEntityRepository.findById(id).get();
	}

	public List<Restaurant> getAllRestaurants() {
		
		return userEntityRepository.findByRole("restaurant").stream().map(rest->modelMapper.map(rest, Restaurant.class)).collect(Collectors.toList());
	}
	
	

	public List<UserEntity> getAllUsers() {

		return userEntityRepository.findAll();
	}

	public List<UserEntity> getUserByRole(String role) {

		return userEntityRepository.findByRole(role);
	}

	public List<Customer> getAllCustomers() {

		return userEntityRepository.findByRole("customer").stream()
				.map(customer -> modelMapper.map(customer, Customer.class)).collect(Collectors.toList());
	}

	public Restaurant getRestaurantById(int id) {

		return modelMapper.map(userEntityRepository.findById(id).get(), Restaurant.class);
	}

	
}
