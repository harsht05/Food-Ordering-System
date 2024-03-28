package com.project.Quisine.algorithm;

import java.util.Properties;

import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.Authenticator;
import jakarta.mail.BodyPart;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;


public class SendEmail {
	
	public static boolean sendOtpEmail(String to, int otp) {
		
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

	public static void sendEmailWithAttachment(String filePath, String recipientEmail, String name) {
		
		String from = "freshertraining@evolvingsols.com", sub = "Order Summary";
		
	//	Smtp properties : 
		
		Properties props = new Properties();
	
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.host", "webmail.evolvingsols.com");
		props.put("mail.smtp.auth", "true");
		
		final String username = "freshertraining@evolvingsols.com";
		final String password = "!ndiaWin@2024#";
		
	//	Get Session : 
		
		Session session = Session.getInstance(props, new Authenticator() {
	
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				
				return new PasswordAuthentication(username, password);
			}
		});
	
	    try {
	        Message message = new MimeMessage(session);
	        message.setFrom(new InternetAddress(username));
	        message.setRecipients(Message.RecipientType.TO,
	                InternetAddress.parse(recipientEmail));
	        message.setSubject(sub);
	
	        // Create the message body part
	        BodyPart messageBodyPart = new MimeBodyPart();
	        messageBodyPart.setText("Hi " + name + ", find the attached Order Details : ");
	
	        // Create a multipart message
	        Multipart multipart = new MimeMultipart();
	        multipart.addBodyPart(messageBodyPart);
	
	        // Add PDF attachment
	        messageBodyPart = new MimeBodyPart();
	        DataSource source = new FileDataSource(filePath);
	        messageBodyPart.setDataHandler(new DataHandler(source));
	        messageBodyPart.setFileName(source.getName());
	        multipart.addBodyPart(messageBodyPart);
	
	        // Set the complete message parts
	        message.setContent(multipart);
	
	        // Send the message
	        Transport.send(message);
	
	        System.out.println("Email sent successfully.");
	    } 
	    catch (MessagingException e) {
	    
	    	e.printStackTrace();
	    }
	}
	
	public static void cancelOrder(String filePath, String recipientEmail, String name) {
		
		String from = "freshertraining@evolvingsols.com", sub = "Order Cancelled!";
		
	//	Smtp properties : 
		
		Properties props = new Properties();
	
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.host", "webmail.evolvingsols.com");
		props.put("mail.smtp.auth", "true");
		
		final String username = "freshertraining@evolvingsols.com";
		final String password = "!ndiaWin@2024#";
		
	//	Get Session : 
		
		Session session = Session.getInstance(props, new Authenticator() {
	
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				
				return new PasswordAuthentication(username, password);
			}
		});
	
	    try {
	        Message message = new MimeMessage(session);
	        message.setFrom(new InternetAddress(username));
	        message.setRecipients(Message.RecipientType.TO,
	                InternetAddress.parse(recipientEmail));
	        message.setSubject(sub);
	
	        // Create the message body part
	        BodyPart messageBodyPart = new MimeBodyPart();
	        messageBodyPart.setText("Hi " + name + ", your order has been cancelled successfully, your amount will be credited into your account within 24 hours, find the attached Order Cancellation Details : ");
	
	        // Create a multipart message
	        Multipart multipart = new MimeMultipart();
	        multipart.addBodyPart(messageBodyPart);
	
	        // Add PDF attachment
	        messageBodyPart = new MimeBodyPart();
	        DataSource source = new FileDataSource(filePath);
	        messageBodyPart.setDataHandler(new DataHandler(source));
	        messageBodyPart.setFileName(source.getName());
	        multipart.addBodyPart(messageBodyPart);
	
	        // Set the complete message parts
	        message.setContent(multipart);
	
	        // Send the message
	        Transport.send(message);
	
	        System.out.println("Email sent successfully.");
	    } 
	    catch (MessagingException e) {
	    
	    	e.printStackTrace();
	    }
	}
}
