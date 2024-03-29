package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Quisine.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findByCustomerUserId(int id);
    
    List<Orders> findByRestaurantUserId(int id);

} 
