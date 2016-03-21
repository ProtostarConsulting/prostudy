package com.protostar.billingnstock.cust.services;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.invoice.entities.InvoiceEntity;

@Api(name = "customerService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class CustomerService {
	
	@ApiMethod(name = "addCustomer")
	public void addCustomer(Customer customer) {
			
		
		Key<Customer> cust = ofy().save().entity(customer).now();
	
	}

	@ApiMethod(name = "getAllCustomersByBusiness")
	public List<Customer> getAllCustomersByBusiness(@Named("id") Long id) {
		
		List<Customer> customer=ofy().load().type(Customer.class).list();
		List<Customer> filteredCustomers = new ArrayList<Customer>();
		
		
		for(int i=0;i<customer.size();i++)
		{				
			 if(customer.get(i).getUserBusiness().getId().equals(id))
			 {
				 System.out.println("Got the record:" + customer.get(i) );
				 filteredCustomers.add(customer.get(i));
			 }
			 
//			 System.out.println("id:" + id);
//			 System.out.println("Recored found:" + customer.get(i).getCurrentUser().getId());
		}
		
		return filteredCustomers;
	//	return ofy().load().type(Customer.class).list();
	}

	@ApiMethod(name = "getCustomerByID")
	public Customer getCustomerByID(@Named("Id") Long Id) {

		Customer customerById = ofy().load().type(Customer.class).id(Id).now();

		System.out.println("Searched Recored is:"
				+ customerById.getFirstName());

		return customerById;
	}

	@ApiMethod(name = "updateCustomer")
	public void updateCustomer(Customer customer) {
			
		
		Key<Customer> cust = ofy().save().entity(customer).now();
	
	}

}// end of CustomerService
