package com.project.Quisine.dto;

import lombok.Data;

@Data
public class Customer {

    private int userId;
	private String userName;
	private String userEmail;
	private String userPass;
	private String userImg;
	private String userContact;
	private String userAddress;
	private String userCity;
	private String userState;
	private int userPin;
	private String role;
}
