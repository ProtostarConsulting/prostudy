package com.protostar.billingnstock.user.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.proadmin.entities.AccountType;
import com.protostar.billnstock.entity.Address;

@Entity
public class BusinessEntity {

	private Ref<AccountType> accounttype;

	@Id
	private Long id;

	private String businessName;
	private String registerDate;
	private Integer totalUser = 1;
	
	private Address address;
	private String status="active" ;
	private String theme;

	@Index
	private String LogBlobKey;
	
 

	public String getLogBlobKey() {
		return LogBlobKey;
	}

	public void setLogBlobKey(String logBlobKey) {
		LogBlobKey = logBlobKey;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRegisterDate() {
		return registerDate;
	}

	public AccountType getAccounttype() {
		return accounttype.get();
	}

	public void setAccounttype(AccountType accounttype) {
		this.accounttype = Ref.create(accounttype);
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

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	

}
