package com.project.Quisine.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.entity.Orders;
import com.project.Quisine.repository.OrdersRepository;
import com.project.Quisine.repository.UserEntityRepository;

@Service
public class OrdersService {

	@Autowired
	private OrdersRepository ordersRepository;
	@Autowired
	private UserEntityRepository userEntityRespository;
	
	@Autowired
	private ModelMapper modelMapper;

	public Orders addOrder(Orders order) {

		return ordersRepository.save(order);
	}

	public List<OrdersDTO> getCustomerOrders(int id) {

		return ordersRepository.findByCustomerUserId(id).stream().map(order -> modelMapper.map(order, OrdersDTO.class))
				.collect(Collectors.toList());
	}

	public List<OrdersDTO> getRestaurantOrders(int id) {

		return ordersRepository.findByRestaurantUserId(id).stream().map(order -> modelMapper.map(order, OrdersDTO.class))
				.collect(Collectors.toList());
	}
	public List<OrdersDTO> getAllCustomerOrders() {
		
		return userEntityRespository.findByRole("customer").stream().map(order->modelMapper.map(order, OrdersDTO.class)).collect(Collectors.toList());
	}

}
