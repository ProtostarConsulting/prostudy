package com.protostar.billingnstock.cust.entities;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Customer {

	@Id
	private Long id;
	@Index
	private String customerId;
	@Index
	private String customerName;
	private String mobile;
	private String email;
	private String customerAddress;

	public Long getId() {
		return id;
	}

	public void setId(Long Id) {
		this.id = Id;
	}
	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	/*
	 * @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * Address address;
	 * 
	 * @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * List<CreditCard> credits;
	 * 
	 * @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL) private
	 * List<Tag> tags;
	 */

}
