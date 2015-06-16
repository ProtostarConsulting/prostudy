package com.protostar.medical.records.server.data;

import java.io.Serializable;

public class EmployeeInfo  implements Serializable{

	private static final long serialVersionUID = -4452717789384194334L;
	private long id;
	private String firstName;
	private String lastName;
	private String addressLine1;
	private String addressLine2;
	private String moboileNo;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAddressLine1() {
		return addressLine1;
	}
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	public String getAddressLine2() {
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}
	public String getMoboileNo() {
		return moboileNo;
	}
	public void setMoboileNo(String moboileNo) {
		this.moboileNo = moboileNo;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	private String city;
	private String pin;

}
