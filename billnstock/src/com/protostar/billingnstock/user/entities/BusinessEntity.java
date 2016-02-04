package com.protostar.billingnstock.user.entities;


import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class BusinessEntity {

	@Id
	private Long id;
	
	//private Long businessAccountID;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	private String businessName;
	@Index
	private String adminGmailId;
	private String adminFirstName;
	private String adminLastName;
	
	
	public String getBusinessName() {
		return businessName;
	}
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}
	public String getAdminGmailId() {
		return adminGmailId;
	}
	public void setAdminGmailId(String adminGmailId) {
		this.adminGmailId = adminGmailId;
	}
	public String getAdminFirstName() {
		return adminFirstName;
	}
	public void setAdminFirstName(String adminFirstName) {
		this.adminFirstName = adminFirstName;
	}
	public String getAdminLastName() {
		return adminLastName;
	}
	public void setAdminLastName(String adminLastName) {
		this.adminLastName = adminLastName;
	}
	
	
	
	



}
