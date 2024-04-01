package com.project.Quisine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.dto.Restaurant;
import com.project.Quisine.service.SearchByRestaurantService;


@RestController
@RequestMapping("/customers/")
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {
	
	@Autowired
	private SearchByRestaurantService searchByRestaurantService;
	
	@GetMapping("searchByName")
    public ResponseEntity<List<Restaurant>> searchByName(@RequestParam("query") String name) {
        List<Restaurant> restaurants = searchByRestaurantService.searchByName(name);
        return ResponseEntity.ok(restaurants);
    }
}
