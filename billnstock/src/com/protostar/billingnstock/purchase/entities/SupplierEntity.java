package com.protostar.billingnstock.purchase.entities;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.tax.entities.TaxEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;
import com.protostar.billingnstock.user.entities.UserEntity;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class SupplierEntity extends BaseEntity{

	private String supplierName;
	private String contactFName;
	private String contactLName;
	private String email;
	private String address;
	private Integer phone1 ;
	private Integer mobile;
	
	
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getContactFName() {
		return contactFName;
	}
	public void setContactFName(String contactFName) {
		this.contactFName = contactFName;
	}
	public String getContactLName() {
		return contactLName;
	}
	public void setContactLName(String contactLName) {
		this.contactLName = contactLName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getPhone1() {
		return phone1;
	}
	public void setPhone1(Integer phone1) {
		this.phone1 = phone1;
	}
	public Integer getMobile() {
		return mobile;
	}
	public void setMobile(Integer mobile) {
		this.mobile = mobile;
	}
	

}
