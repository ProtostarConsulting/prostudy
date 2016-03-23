package com.protostar.billingnstock.user.entities;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.protostar.billingnstock.proadmin.entities.AccountType;

@Entity
public class BusinessEntity {

	private Ref<AccountType> accounttype;

	@Id
	private Long id;

	private String businessName;
	private String registerDate;
	private Integer totalUser = 1;
	private String address1 ;
	private String address2 ;

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

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

}
