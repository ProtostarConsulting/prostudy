package com.protostar.crm.server.data;

public class CustomerInfoUtil {

	public static CustomerInfo toCustomerInfo(Customer c) {
	
		CustomerInfo customerInfo = new CustomerInfo();
		customerInfo.setId(c.getCust_id());
		customerInfo.setFirstName(c.getFirstName());
		customerInfo.setLastName(c.getLastName());
		customerInfo.setMobileNo(c.getMobileNo());
		customerInfo.setEmail(c.getEmail());
//		customerInfo.setAddress1(c.getAddress1());
//		customerInfo.setAddress2(c.getAddress2());
		
		customerInfo.setAddress(c.getAddress());
		customerInfo.setCity(c.getCity());
		customerInfo.setPin(c.getPin());
		
		return customerInfo;
	}

	public static Customer toCustomer(CustomerInfo ci) {
	
		Customer customer = new Customer();
		customer.setCust_id(ci.getId());
		customer.setFirstName(ci.getFirstName());
		customer.setLastName(ci.getLastName());
		customer.setMobileNo(ci.getMobileNo());
		customer.setEmail(ci.getEmail());
//		customer.setAddress1(ci.getAddress1());
//		customer.setAddress2(ci.getAddress2());
		
		customer.setAddress(ci.getAddress());
		customer.setCity(ci.getCity());
		customer.setPin(ci.getPin());
		
		return customer;

	}

}
