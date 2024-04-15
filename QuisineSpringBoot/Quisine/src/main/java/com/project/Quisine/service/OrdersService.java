package com.project.Quisine.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.entity.Orders;
import com.project.Quisine.repository.OrdersRepository;
import com.project.Quisine.repository.UserEntityRepository;

import jakarta.transaction.Transactional;

@Service
public class OrdersService {

	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	public Orders addOrder(Orders order) {

		return ordersRepository.save(order);
	}

	public List<OrdersDTO> getCustomerOrders(int id) {

		return ordersRepository.findByCustomerUserIdOrderByOrderIdDesc(id).stream().map(order -> modelMapper.map(order, OrdersDTO.class))
				.collect(Collectors.toList());
	}

	public List<OrdersDTO> getRestaurantOrders(int id) {

		return ordersRepository.findByRestaurantUserIdOrderByOrderIdDesc(id).stream().map(order -> modelMapper.map(order, OrdersDTO.class))
				.collect(Collectors.toList());
	}
	public List<OrdersDTO> getAllCustomerOrders() {
		
		return ordersRepository.findAll().stream().map(order->modelMapper.map(order, OrdersDTO.class)).collect(Collectors.toList());
	}
	
	@Transactional
    public Map<String, Integer> getOrderCountsByDate() {
        List<Object[]> results = ordersRepository.getOrderCountsByDate();

        Map<String, Integer> orderCountsByDate = new HashMap<>();
        for (Object result : results) {
                
        	String date = result.toString();    
        	Integer count = ((Number) result).intValue();
            orderCountsByDate.put(date, count);
        }
            
        return orderCountsByDate;
    }
	
	public OrdersDTO getOrderById(int id) {

		return modelMapper.map(ordersRepository.findById(id).get(), OrdersDTO.class);
	}
    	
    public boolean deleteOrderById(int id) {
    		
    	ordersRepository.deleteById(id);
    	return ordersRepository.existsById(id);
    }
}

