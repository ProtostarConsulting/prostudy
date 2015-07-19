package com.protostar.billingnstock.cust.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billingnstock.data.EMF;
import com.protostar.until.data.ServerMsg;




@Api(name = "customerService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.cust.services", ownerName = "com.protostar.billingnstock.cust.services", packagePath = ""))
public class CustomerService
{
	@ApiMethod(name="addCustomer")
	public ServerMsg addCustomer(Customer customer)
	{
		
		System.out.println("customer:" + customer);
		ServerMsg msgBean=new ServerMsg();
				
		EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(customer);
			msgBean.setMsg("Customer Records Added successfully"+" "+customer.getFirstName());
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
				
		return msgBean;
		
	}//end of addCustomerServices
	
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllCustomers")
	public List<Customer> getAllCustomers()
	{
		System.out.println("In side getAllCustomers " );
		List<Customer> customerList= new ArrayList<Customer>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from Customer c");
			customerList=q.getResultList();
			System.out.println("Got List: " + customerList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return customerList;
		
	}//end of getAllCustomers

}//end of CustomerService
