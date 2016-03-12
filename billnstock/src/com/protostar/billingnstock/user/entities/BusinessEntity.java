package com.protostar.billingnstock.user.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.proadmin.entities.AccountType;

@Entity
public class BusinessEntity {

	
	private Ref<AccountType> accounttype;

	public AccountType getAccounttype() {
		return accounttype.get();
	}

	public void setAccounttype(AccountType accounttype) {
		this.accounttype = Ref.create(accounttype);
	}
	
	@Id
	private Long id;

	

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
	private String registerDate;
	private Integer totalUser = 1;

	public String getRegisterDate() {
		return registerDate;
	}

	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}

	public Integer getTotalUser() {
		return totalUser;
	}

	public void setTotalUser(Integer totalUser) {
		this.totalUser = totalUser;
	}

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
