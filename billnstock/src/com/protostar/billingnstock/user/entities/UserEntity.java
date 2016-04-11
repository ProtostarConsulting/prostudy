package com.protostar.billingnstock.user.entities;

import java.util.List;

import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.protostar.billnstock.entity.Address;
import com.protostar.billnstock.entity.BaseEntity;

@Entity
public class UserEntity extends BaseEntity{

	/*@Id
	private Long id;
	@Index
	private Ref<BusinessEntity> business;*/

	private String firstName;
	private String lastName;
	
	private String status="active" ;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Index
	private String email_id;
	private List<String> authority;
	private Boolean isGoogleUser = true;
	
	private Address address;

	public Boolean getIsGoogleUser() {
		return isGoogleUser;
	}

	public void setIsGoogleUser(Boolean isGoogleUser) {
		this.isGoogleUser = isGoogleUser;
	}

	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getAuthority() {
		return authority;
	}

	public void setAuthority(List<String> authority) {
		this.authority = authority;
	}

	/*public void setId(Long id) {
		this.id = id;
	}*/

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/*public Long getId() {
		return id;
	}*/

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	/*public BusinessEntity getBusiness() {
		return business.get();
	}

	public void setBusiness(BusinessEntity business) {
		this.business = Ref.create(business);
	}*/

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

}
