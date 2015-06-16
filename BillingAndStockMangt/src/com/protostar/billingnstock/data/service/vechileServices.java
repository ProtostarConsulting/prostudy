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
		VechileServicesEnitity vechileServicesEnitity2 = new VechileServicesEnitity();
				
		EntityManager en=null;
		try 
		{
			if(vechileServicesEnitity.getId() == null)
			{
			vechileServicesEnitity2.setDate_Time_Recevied(vechileServicesEnitity.getDate_Time_Recevied());
			vechileServicesEnitity2.setNotes(vechileServicesEnitity.getNotes());
			vechileServicesEnitity2.setOwner_Name(vechileServicesEnitity.getOwner_Name());
			vechileServicesEnitity2.setVechile_No(vechileServicesEnitity.getVechile_No());
			mybean.setMyData("registeration successefully.."+vechileServicesEnitity.getOwner_Name());
			mybean.setToken("R");
			}
			else
			{
				vechileServicesEnitity2.setId(vechileServicesEnitity.getId());
				vechileServicesEnitity2.setDate_Time_Recevied(vechileServicesEnitity.getDate_Time_Recevied());
				vechileServicesEnitity2.setNotes(vechileServicesEnitity.getNotes());
				vechileServicesEnitity2.setOwner_Name(vechileServicesEnitity.getOwner_Name());
				vechileServicesEnitity2.setVechile_No(vechileServicesEnitity.getVechile_No());
				mybean.setMyData("Updation successefully.."+vechileServicesEnitity.getOwner_Name());
				mybean.setToken("U");
			}
			en=EMF.get().createEntityManager();
			en.persist(vechileServicesEnitity2);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

		finally 
		{
			en.close();
		}
		
		
		return mybean;		
	}
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllVechile")
	public List<VechileServicesEnitity> getAllVechile()
	{
		
		
		List<VechileServicesEnitity> resultList = new ArrayList<VechileServicesEnitity>();
		EntityManager em = null;

		
		try {
			em = EMF.get().createEntityManager();
			Query q =em.createQuery("SELECT c FROM VechileServicesEnitity c", VechileServicesEnitity.class); 
	
			resultList = q.getResultList();
		}
		
	
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
	   return resultList;	
	}

}
