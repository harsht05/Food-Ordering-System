package com.project.Quisine.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
}
