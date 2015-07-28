package com.protostar.billingnstock.bill.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.bill.entities.Invoice;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.Invoice1;
import com.protostar.billingnstock.data.MyBean;
import com.protostar.until.data.ServerMsg;

@Api(name = "billingServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class BillingServices {
	

	@ApiMethod(name="createBill")
	public ServerMsg createBill(Invoice invoice)
	{
		
		ServerMsg serverMsg = new ServerMsg();
		EntityManager em=null;
		try 
		{
			em = EMF.get().createEntityManager();
			em.persist(invoice);
			serverMsg.setMsg("Bill Created successefully.."+invoice.getInvoice_id());
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return serverMsg;
	}
	
	
	@ApiMethod(name="getallfetchbills")
	public List<Invoice1> getallfetchbills()
	{
		List<Invoice1> allInvoice = new ArrayList<Invoice1>();
		EntityManager em=null;
		try 
		{
			em = EMF.get().createEntityManager();
			Query q = em.createQuery("select i from Invoice i",Invoice1.class);
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
