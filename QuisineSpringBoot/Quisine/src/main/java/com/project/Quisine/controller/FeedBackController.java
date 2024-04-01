package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.entity.Feedback;
import com.project.Quisine.service.FeedBackService;

@RestController
@RequestMapping("/customer/")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedBackController {

	@Autowired
	private FeedBackService feedBackService;

	@PostMapping("addFeedback")
	public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
		return new ResponseEntity<Feedback>(feedBackService.addFeedback(feedback), HttpStatus.CREATED);
	}

	@GetMapping("getcounts")
	public ResponseEntity<List<Integer>> getCountsByExperience() {
		return new ResponseEntity<List<Integer>>(feedBackService.getCountsByExperience(), HttpStatus.OK);
	}

}
