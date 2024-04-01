package com.project.Quisine.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Quisine.entity.UserEntity;
import com.project.Quisine.response.PayementLinkResponse;
import com.project.Quisine.service.UserEntityService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payement/")
@CrossOrigin(value = "http://localhost:4200")
public class PayementController {
    
    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;
    
    @Autowired
    private UserEntityService userEntityService;
    
    @PostMapping("generateLink/{totalAmt}")
    public ResponseEntity<PayementLinkResponse> createPaymentLink(@RequestBody int custId, @PathVariable float totalAmt)
            throws RazorpayException {

    	UserEntity userEntity = userEntityService.getUserById(custId);
    	
        try {
        	
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", totalAmt * 100);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", userEntity.getUserName());
            customer.put("contact", userEntity.getUserContact());
            customer.put("email", userEntity.getUserEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("sms", true);
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);

            paymentLinkRequest.put("callback_url", "http://localhost:4200/customer/orderSummary");
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PayementLinkResponse response = new PayementLinkResponse(paymentLinkUrl, paymentLinkId);

            return ResponseEntity.ok(response);
        } 
        catch (RazorpayException e) {
        
            throw new RazorpayException("Error creating payment link: " + e.getMessage());
        }
    }
}
