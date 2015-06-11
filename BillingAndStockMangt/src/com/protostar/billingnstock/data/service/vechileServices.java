package com.protostar.billingnstock.data.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;





import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.MyBean;
import com.protostar.billingnstock.data.VechileServicesEnitity;

@Api(name = "vechileServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.medical.records.server.endpoint", ownerName = "com.protostar.medical.records.server.endpoint", packagePath = ""))
public class vechileServices {
	
	@ApiMethod(name="addVechile")
	public MyBean addVechile(VechileServicesEnitity vechileServicesEnitity)
	{
	
		MyBean mybean = new MyBean();
		
		EntityManager en=null;
		try 
		{
			en=EMF.get().createEntityManager();
			en.persist(vechileServicesEnitity);
		}
		finally 
		{
			en.close();
		}
		mybean.setData("registeration successefully.."+vechileServicesEnitity.getOwner_Name());
		
		return mybean;		
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllVechile")
	public List<VechileServicesEnitity> getAllVechile()
	{
		List<VechileServicesEnitity> vechileServicesEnitity = new ArrayList<VechileServicesEnitity>();
		EntityManager en;
		
		try {
			
			en=EMF.get().createEntityManager();
			Query query = en.createQuery("select v from VechileServicesEnitity v",VechileServicesEnitity.class);
			vechileServicesEnitity=query.getResultList();
			
		} 
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
	   return vechileServicesEnitity;	
	}

}
