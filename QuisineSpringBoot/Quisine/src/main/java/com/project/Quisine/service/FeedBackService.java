package com.project.Quisine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Quisine.entity.Feedback;
import com.project.Quisine.repository.FeedBackRepository;

@Service
public class FeedBackService {

	@Autowired
	private FeedBackRepository feedBackRepository;

	public Feedback addFeedback(Feedback feedback) {
		return feedBackRepository.save(feedback);
	}

	public List<Feedback> getAllFeedback() {

		return feedBackRepository.findAll();
	}

	public List<Integer> getCountsByExperience() {
		return feedBackRepository.getCountsByExperience();
	}


}
