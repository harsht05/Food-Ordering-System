package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Quisine.entity.UserEntity;

public interface UserEntityRespository extends JpaRepository<UserEntity, Integer>{

	UserEntity findByUserEmail(String email);
	
	List<UserEntity> findByRole(String role);
}
