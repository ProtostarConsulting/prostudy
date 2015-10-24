package com.protostar.billingnstock.cust.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.cust.entities.Customer;
import com.protostar.billnstock.until.data.EMF;
import com.protostar.billnstock.until.data.ServerMsg;




@Api(name = "customerService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.cust.services", ownerName = "com.protostar.billingnstock.stock.cust.services", packagePath = ""))
public class CustomerService
{
	
	@ApiMethod(name="addCustomer")
	public ServerMsg addCustomer(Customer stockCustomer)
	{
		ServerMsg msgBean=new ServerMsg();
		EntityManager em=null;		
		try 
		{
			Customer stockCustomer2=new Customer();
			if(stockCustomer.getId()!=null)
			{			
				stockCustomer2.setId(stockCustomer.getId());			
			
			}
			
			stockCustomer2.setCust_Name(stockCustomer.getCust_Name());
			stockCustomer2.setMobile(stockCustomer.getMobile());
			stockCustomer2.setEmail(stockCustomer.getEmail());
			stockCustomer2.setAddress(stockCustomer.getAddress());
		//	msgBean.setToken("S");
			
			em=EMF.get().createEntityManager();
			em.persist(stockCustomer2);
			msgBean.setMsg("Customer Records Added successfully"+" "+stockCustomer2.getCust_Name());
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}		
		return msgBean;
	}

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
			System.out.println("Got getAllCustomers: " + customerList.size() );
			
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
		
	}//end of getAllStockServices

}//end of CustomerService
