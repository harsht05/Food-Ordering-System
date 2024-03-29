package com.project.Quisine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.algorithm.SendEmail;
import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.service.UserEntityService;

@RestController
@RequestMapping("/user/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserEntityController {
	
	@Autowired
	private UserEntityService userEntityService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	static int verifyOtp = 0;
	
	@PostMapping("sendOtp")
	public ResponseEntity<Integer> sendOtp(@RequestBody String email) {
		
		Random random = new Random();
		int otp = random.nextInt(100000, 999999);
		verifyOtp = otp;
		
		SendEmail.sendOtpEmail(email, otp);
		
		return new ResponseEntity<Integer>(1, HttpStatus.OK);
	}

	
	@PostMapping("verifyOtp") 
	public ResponseEntity<Boolean> verifyOtpMethod(@RequestBody int otp) {
		
		if(otp == verifyOtp) {
			
			verifyOtp = 0;
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	

	@PostMapping("addUser")
	public ResponseEntity<UserEntity> addUser(@RequestBody UserEntity userEntity) {
		
		return new ResponseEntity<UserEntity>(userEntityService.addUser(userEntity), HttpStatus.CREATED);
	}

	@GetMapping("getUserById/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
		
		return new ResponseEntity<UserEntity>(userEntityService.getUserById(id), HttpStatus.OK);
	}
	
	@PostMapping("userLogin")
	public ResponseEntity<UserEntity> userLogin(@RequestBody UserEntity userEntity) {
		
		String userEmail = userEntity.getUserEmail();
	    String userPassword = userEntity.getUserPass();

	    UserEntity userFromDatabase = userEntityService.findByEmail(userEmail);
	    
	    if (userFromDatabase != null && passwordEncoder.matches(userPassword, userFromDatabase.getUserPass())) {
	       
	        return new ResponseEntity<UserEntity>(userFromDatabase, HttpStatus.OK);
	    } 
	    else {

	        return new ResponseEntity<>(null, HttpStatus.OK);
	    }
	}
	
	@PostMapping("forgotPassword")
	public ResponseEntity<UserEntity> setNewPassword(@RequestBody UserEntity user) {
		
		user.setUserPass(passwordEncoder.encode(user.getUserPass()));
		return new ResponseEntity<UserEntity>(userEntityService.updatePassword(user), HttpStatus.OK);
	}
	
	@PostMapping("findByEmail")
	public ResponseEntity<UserEntity> getUserByEmail(@RequestBody String email) {
		

		return new ResponseEntity<UserEntity>(userEntityService.findByEmail(email), HttpStatus.OK);
	}
	
	@GetMapping("getAllUsers")
	public ResponseEntity<List<UserEntity>> getAllUsers() {
		
		return new ResponseEntity<List<UserEntity>>(userEntityService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping("getRestaurantById/{id}")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable int id) {
		
		return new ResponseEntity<Restaurant>(userEntityService.getRestaurantById(id), HttpStatus.OK);
	}
	
	@GetMapping("getAllRestaurants")
	public ResponseEntity<List<Restaurant>> customerDashboard() {
		
		return new ResponseEntity<List<Restaurant>>(userEntityService.getAllRestaurants(), HttpStatus.OK);
	}

	
}
