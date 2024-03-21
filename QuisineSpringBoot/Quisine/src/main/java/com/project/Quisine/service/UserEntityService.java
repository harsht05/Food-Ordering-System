package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.repository.UserEntityRespository;

@Service
public class UserEntityService {

	@Autowired
	private UserEntityRespository userEntityRepository;

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

	public UserEntity getUserById(int id) {
		
		return userEntityRepository.findById(id).get();
	}

	public List<Restaurant> getAllRestaurants() {
		
		return userEntityRepository.findByRole("restaurant").stream().map(rest->modelMapper.map(rest, Restaurant.class)).collect(Collectors.toList());
	}

	public int updateCustomerCustom(Integer userId, String userName, String userContact) {
		
		return userEntityRepository.updateUserNameAndContact(userId, userName, userContact);
	}
}
