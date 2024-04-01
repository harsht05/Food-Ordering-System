package com.project.Quisine.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.project.Quisine.entity.Feedback;

import jakarta.transaction.Transactional;

public interface FeedBackRepository extends JpaRepository<Feedback, Integer>{
	
	@Transactional
	@Modifying
	@Query("SELECT COUNT(*) AS count FROM Feedback WHERE experience IN ('Excellent', 'Good','Average','Bad','Very Bad') GROUP BY experience")
    List<Integer> getCountsByExperience();

    
    
}
