package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.Quisine.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findByCustomerUserId(int id);
    
    List<Orders> findByRestaurantUserId(int id);
    
    @Query("SELECT Date(o.date) AS order_date, COUNT(*) AS order_count FROM Orders o GROUP BY Date(o.date)")
    List<Object> getOrderCountsByDate();

} 