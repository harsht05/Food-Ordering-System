package com.project.Quisine.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.algorithm.PdfGeneration;
import com.project.Quisine.algorithm.SendEmail;
import com.project.Quisine.dto.Customer;
import com.project.Quisine.dto.OrdersDTO;
import com.project.Quisine.entity.Orders;
import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.service.OrdersService;
import com.project.Quisine.service.UserEntityService;


@RestController
@RequestMapping("/customer/")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {
	

    @Autowired
	private UserEntityService userEntityService;
	
	@Autowired 
	private OrdersService ordersService;

    @PostMapping("placeOrder")
	public ResponseEntity<Orders> placeOrder(@RequestBody Orders order) {
		
		return new ResponseEntity<Orders>(ordersService.addOrder(order), HttpStatus.CREATED);
	}

    @GetMapping("getCustomerOrders/{id}")
	public ResponseEntity<List<OrdersDTO>> getCustomerOrders(@PathVariable int id) {
		
    	System.out.println(ordersService.getCustomerOrders(id));
		return new ResponseEntity<List<OrdersDTO>>(ordersService.getCustomerOrders(id), HttpStatus.OK);
	}

    @GetMapping("getCustomerById/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable int id)
    {
		return new ResponseEntity<Customer>(userEntityService.getCustomerDetailsById(id), HttpStatus.OK);

    }
    @PostMapping("updateCustomer")
	public void updateCustomer(@RequestBody UserEntity customer) {
		
		userEntityService.updateCustomerCustom(customer.getUserId(), customer.getUserName(), customer.getUserContact(),customer.getUserAddress(),customer.getUserCity(),customer.getUserState(),customer.getUserPin(),customer.getUserImg());
	}

	@PostMapping("sendOrderDetails")
	public  ResponseEntity<Integer> sendOrderDetails(@RequestBody List<OrdersDTO> orders) {
		
		StringBuffer msg = new StringBuffer();
		String customerEmail = "";
		String customerName = "";
		float totalAmt = 0;
		
		msg.append("\n\n*****************Order Details*****************\n\n");
		
		for(OrdersDTO order : orders) {
			
			if(customerEmail.equals((""))) customerEmail = order.getCustomer().getUserEmail();
			
			if(customerName.equals((""))) customerName = order.getCustomer().getUserName();
			
			totalAmt += order.getTotalPrice();
			
			msg.append("Order ID : " + order.getOrderId() + "\nFood Item : " + order.getFood().getFoodName() + "\nRestaurant Name : " + order.getRestaurant().getUserName() + "\nOrder Date and Time : " + order.getDate() + "\nDelivery Address : " + order.getDeliveryAddress() + ", " + order.getCustomer().getUserCity() + ", " + order.getCustomer().getUserState() + ", " + order.getCustomer().getUserPin());
			msg.append("\n\n***********************************************\n\n");
		}
		
		msg.append("Sub Total : Rs. " +totalAmt);
		msg.append("\nDelivery Charges : Rs. 40");
		msg.append("\nConvinience Fee : Rs. 20");
		msg.append("\nTotal Amount : Rs. " +(totalAmt + 60));
		
		msg.insert(0, "Hi " + customerName + " , Your order has been placed successfully! Here are details:\n\n");
		
		
		String filePath = PdfGeneration.generateOrderSummaryPDF(msg.toString());
		
		try {
			
			SendEmail.sendEmailWithAttachment(filePath, customerEmail, customerName);
			System.out.println("Sent, I think");
		}
		
		catch (Exception e) {

			return new ResponseEntity<Integer>(-1, HttpStatus.OK);
		}
		
		return new ResponseEntity<Integer>(1, HttpStatus.OK);
	}
	
	@DeleteMapping("deleteOrder/{id}")
	public ResponseEntity<Boolean> deleteOrder(@PathVariable int id) {
		
		OrdersDTO order = ordersService.getOrderById(id);
		
		StringBuffer msg = new StringBuffer();
		
		msg.append("Hi " +order.getCustomer().getUserName() + " , Your order with Order Id : " + order.getOrderId() + " has been cancelled. Here are details:");
		
		msg.append("\n\n*****************Order Details*****************\n\n");
		msg.append("Order ID : " + order.getOrderId() + "\nFood Item : " + order.getFood().getFoodName() + "\nRestaurant Name : " + order.getRestaurant().getUserName() + "\nOrder Date and Time : " + order.getDate() + "\nDelivery Address : " + order.getDeliveryAddress() + ", " + order.getCustomer().getUserCity() + ", " + order.getCustomer().getUserState() + ", " + order.getCustomer().getUserPin());
		msg.append("\n\n***********************************************\n\n");
		msg.append("\nTotal Amount : Rs. " +order.getTotalPrice());
		
		String filePath = PdfGeneration.generateOrderSummaryPDF(msg.toString());
		
		try {
			
			SendEmail.cancelOrder(filePath, order.getCustomer().getUserEmail(), order.getCustomer().getUserName());
			System.out.println("Sent, I think");
		}
		
		catch (Exception e) {

			System.out.println("Not Sent, I think");
		}
		
		if(!ordersService.deleteOrderById(id)) {
			
			
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}

		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
}
