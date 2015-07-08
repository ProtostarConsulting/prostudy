package com.protostar.billingnstock.data.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.Invoice;
import com.protostar.billingnstock.data.MyBean;

@Api(name = "billingServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class BillingServices {
	

	@ApiMethod(name="createBill")
	public MyBean createBill(Invoice invoice)
	{
		
		MyBean mybean = new MyBean();
		EntityManager em=null;
		try 
		{
			em = EMF.get().createEntityManager();
			em.persist(invoice);
			mybean.setMyData("Bill Created successefully.."+invoice.getInvoice_id());
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return mybean;
	}
	
	
	@ApiMethod(name="getallfetchbills")
	public List<Invoice> getallfetchbills()
	{
		List<Invoice> allInvoice = new ArrayList<Invoice>();
		EntityManager em=null;
		try 
		{
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select i from Invoice i",Invoice.class);
			allInvoice= q.getResultList();
		}
		catch (Exception e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		return allInvoice;
		
	}
	
	
	
		
}
