package com.protostar.crm.server.data;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

//@Entity
//@Table(name = "CUSTOMER")
public class Customer implements Serializable {

	private static final Long serialVersionUID = 1L;

//	 @Id
//	 @GeneratedValue(strategy = GenerationType.AUTO)

//	@PrimaryKey
//	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private int cust_id;

	/*
	 * @OneToMany
	 * 
	 * @JoinTable(name = "CUSTOMER_ADDRESS_MAPPING", joinColumns =
	 * @JoinColumn(name = "cust_id"), inverseJoinColumns = @JoinColumn(name =
	 * "add_id")) // its optional using for name configuration of the join table
	 */

//	@OneToMany(targetEntity = Address.class)
	private Set<Address> address = new HashSet<Address>();

	public Set<Address> getAddress() {
		return address;
	}

	public void setAddress(Set<Address> address) {
		this.address = address;
	}

	private String firstName;
	private String lastName;
	private String mobileNo;
	private String email;
	// private String address1;
	// private String address2;
	private String city;
	private String pin;

	public int getCust_id() {
		return cust_id;
	}

	public void setCust_id(int cust_id) {
		this.cust_id = cust_id;
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

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/*
	 * public String getAddress1() { return address1; } public void
	 * setAddress1(String address1) { this.address1 = address1; } public String
	 * getAddress2() { return address2; } public void setAddress2(String
	 * address2) { this.address2 = address2; }
	 */
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

	public static Long getSerialversionuid() {
		return serialVersionUID;
	}

}
