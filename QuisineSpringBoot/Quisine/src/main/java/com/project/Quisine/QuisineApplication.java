package com.project.Quisine;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class QuisineApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuisineApplication.class, args);
	}

	@Bean
	ModelMapper modelMapper() {
		
		return new ModelMapper();
	}

    @Bean
    static PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}

}
