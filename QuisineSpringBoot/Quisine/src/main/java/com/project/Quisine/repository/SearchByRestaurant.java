package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Quisine.entity.UserEntity;


public interface SearchByRestaurant extends JpaRepository<UserEntity, Integer>{
    List<UserEntity> findByUserNameContainingAndRole(String username, String role);
	

}
