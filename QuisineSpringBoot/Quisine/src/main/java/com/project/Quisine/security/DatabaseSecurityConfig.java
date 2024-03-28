package com.project.Quisine.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class DatabaseSecurityConfig {

	@Autowired
	private UserLoginService userLoginService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
			.authorizeHttpRequests(authorizeRequest -> 
			authorizeRequest
			.requestMatchers(requestMatcher("/user/**"))
			.permitAll()
			.requestMatchers(requestMatcher("/customer/**"))
//			.hasRole("customer")
			.permitAll()
			.requestMatchers(requestMatcher("/restaurant/**"))
//			.hasRole("restaurant")
			.permitAll()
//			.hasRole("Admin")
//			.hasAnyRole("Admin", "User")
				.anyRequest().authenticated())
				.formLogin(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.logout(Customizer.withDefaults());
		
		
		return http.build();
	}
	
	@Bean
	AuthenticationProvider authenticationProvider() {
		
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(userLoginService);
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
		
		return daoAuthenticationProvider;
	}
	
	@Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
	
	private RequestMatcher requestMatcher(String pattern) {
		
		return new AntPathRequestMatcher(pattern);
	}
}