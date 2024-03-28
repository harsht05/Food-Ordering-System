package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import com.project.Quisine.entity.UserEntity;

import jakarta.transaction.Transactional;

public interface UserEntityRepository extends JpaRepository<UserEntity, Integer> {

	UserEntity findByUserEmail(String email);
	
	List<UserEntity> findByRole(String role);

    
	
	 UserEntity findByUserEmailAndUserPass(String userEmail, String userPass);
	 
	 @Modifying
	 @Transactional
	 @Query("UPDATE UserEntity u SET u.userName = :userName, u.userContact = :userContact, u.userAddress = :userAddress, u.userCity = :userCity, u.userState = :userState, u.userPin = :userPin WHERE u.userId = :userId")
	    int updateUserNameAndContact(Integer userId, String userName, String userContact, String userAddress, String userCity, String userState, int userPin);


	 boolean existsByUserEmail(String userEmail);


}
