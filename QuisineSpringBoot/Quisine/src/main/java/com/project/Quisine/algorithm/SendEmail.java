package com.project.Quisine.algorithm;

import java.util.Properties;


import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
public class SendEmail {
public boolean sendOtpEmail(String to, int otp) {
		
		String from = "freshertraining@evolvingsols.com", sub = "Verify OTP", msg = "Hi, Your OTP for verification is : "+otp;
		
//		Smtp properties : 
		
		Properties props = new Properties();

		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.host", "webmail.evolvingsols.com");
		props.put("mail.smtp.auth", "true");
		
		final String username = "freshertraining@evolvingsols.com";
		final String password = "!ndiaWin@2024#";
		
//		Get Session : 
		
		Session session = Session.getInstance(props, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				
				return new PasswordAuthentication(username, password);
			}
		});
		
		
		try {
			
//			Create message :  
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			
			message.setSubject(sub);
			
			message.setText(msg);
			
			Transport.send(message);
			
			return true;
		}
		catch (Exception e) {

			System.out.println(e);
			e.printStackTrace();
			
			return false;
		}
	}
	
	
	public boolean sendOrderDetailsByEmail(String to, String orderDetails) {
		
		String from = "freshertraining@evolvingsols.com", sub = "Your Order Details : ";
		
//		Smtp properties : 
		
		Properties props = new Properties();

		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.host", "webmail.evolvingsols.com");
		props.put("mail.smtp.auth", "true");
		
		final String username = "freshertraining@evolvingsols.com";
		final String password = "!ndiaWin@2024#";
		
//		Get Session : 
		
		Session session = Session.getInstance(props, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				
				return new PasswordAuthentication(username, password);
			}
		});
		
		
		try {
			
//			Create message :  
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			
			message.setSubject(sub);
			
			message.setText(orderDetails);
			
			Transport.send(message);
			
			return true;
		}
		catch (Exception e) {

			System.out.println(e);
			e.printStackTrace();
			
			return false;
		}
	}
}
