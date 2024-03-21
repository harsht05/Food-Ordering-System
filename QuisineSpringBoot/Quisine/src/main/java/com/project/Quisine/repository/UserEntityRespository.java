package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.Quisine.entity.UserEntity;

import jakarta.transaction.Transactional;

public interface UserEntityRespository extends JpaRepository<UserEntity, Integer>{

	UserEntity findByUserEmail(String email);
	
	List<UserEntity> findByRole(String role);

	@Modifying
	@Transactional
    @Query("UPDATE UserEntity u SET u.userName = :userName, u.userContact = :userContact WHERE u.userId = :userId")
    int updateUserNameAndContact(Integer userId, String userName, String userContact);
}
