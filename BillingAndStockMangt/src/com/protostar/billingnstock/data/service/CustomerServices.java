package com.protostar.billingnstock.data.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.CustomerServicesEntity;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.MyBean;




@Api(name = "customerServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class CustomerServices
{

	@ApiMethod(name="addCustomerServices")
	public MyBean addCustomerServices(CustomerServicesEntity customerServicesEntity)
	{
		MyBean myBean=new MyBean();
		
		CustomerServicesEntity customerServicesEntity2 = new CustomerServicesEntity();
		
		EntityManager em=null;
		
		if(customerServicesEntity.getId()==null)
		{
			customerServicesEntity2.setAddress(customerServicesEntity.getAddress());
			customerServicesEntity2.setEmail_Id(customerServicesEntity.getEmail_Id());
			customerServicesEntity2.setMobile(customerServicesEntity.getMobile());
			customerServicesEntity2.setName(customerServicesEntity.getName());
			myBean.setToken("R");
			
		}
		else 
		{
			customerServicesEntity2.setId(customerServicesEntity.getId());
			customerServicesEntity2.setAddress(customerServicesEntity.getAddress());
			customerServicesEntity2.setEmail_Id(customerServicesEntity.getEmail_Id());
			customerServicesEntity2.setMobile(customerServicesEntity.getMobile());
			customerServicesEntity2.setName(customerServicesEntity.getName());
			myBean.setToken("U");
		}
		try {
			em=EMF.get().createEntityManager();
			em.persist(customerServicesEntity2);
			myBean.setMyData("Customer Records Added successfully"+" "+customerServicesEntity.getName());
		} 
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		
		
		
		return myBean;
		
	}//end of addCustomerServices
	
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getCustomerServices")
	public List<CustomerServicesEntity> getCustomerServices()
	{
		List<CustomerServicesEntity> customerServicesEntity= new ArrayList<CustomerServicesEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery(" select c from CustomerServicesEntity c",CustomerServicesEntity.class);
			customerServicesEntity=q.getResultList();
			
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return customerServicesEntity;
		
	}//end of getCustomerServices
	
	

}//end of CustomerServices
