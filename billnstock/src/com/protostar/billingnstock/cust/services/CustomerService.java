package com.protostar.billingnstock.cust.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Ref;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;
import com.protostar.billingnstock.user.entities.BusinessEntity;

@Api(name = "customerService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class CustomerService {
	
	@ApiMethod(name = "addCustomer")
	public void addCustomer(Customer customer) {
			
		
		Key<Customer> cust = ofy().save().entity(customer).now();
	
	}

	@ApiMethod(name = "getAllCustomersByBusiness")
	public List<Customer> getAllCustomersByBusiness(@Named("id") Long busiId) {
		
		List<Customer> filteredCustomers = ofy()
				.load()
				.type(Customer.class)
				.filter("business",
						Ref.create(Key.create(BusinessEntity.class, busiId)))
				.list();
							
		return filteredCustomers;
	}

	@ApiMethod(name = "getCustomerByID")
	public Customer getCustomerByID(@Named("Id") Long Id) {

		Customer customerById = ofy().load().type(Customer.class).id(Id).now();

		return customerById;
	}

	@ApiMethod(name = "updateCustomer")
	public void updateCustomer(Customer customer) {
			
		Key<Customer> cust = ofy().save().entity(customer).now();
	
	}

}// end of CustomerService
