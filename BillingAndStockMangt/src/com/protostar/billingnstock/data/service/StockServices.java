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
import com.protostar.billingnstock.data.StockServicesEntity;


@Api(name = "stockServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.data.service", ownerName = "com.protostar.billingnstock.data.service", packagePath = ""))
public class StockServices
{


	@ApiMethod(name="addStockServices")
	public MyBean addStockServices(StockServicesEntity stockServicesEntity)
	{
		System.out.println("Come to server side");
		MyBean mybean= new MyBean();
		
		
		
		EntityManager em=null;
		StockServicesEntity stockServicesEntity1=new StockServicesEntity();
		
		if(stockServicesEntity.getId()==null)
		{
			
			//stockServicesEntity1.setId(stockServicesEntity.getId());
			stockServicesEntity1.setSr_No(stockServicesEntity.getSr_No());
			stockServicesEntity1.setItem_Name(stockServicesEntity.getItem_Name());
			stockServicesEntity1.setCategories(stockServicesEntity.getCategories());
			stockServicesEntity1.setQty(stockServicesEntity.getQty());
			stockServicesEntity1.setPrice(stockServicesEntity.getPrice());
			stockServicesEntity1.setNotes(stockServicesEntity.getNotes());
		mybean.setToken("R");	
		}
		else
		{
			stockServicesEntity1.setId(stockServicesEntity.getId());
			stockServicesEntity1.setSr_No(stockServicesEntity.getSr_No());
			stockServicesEntity1.setItem_Name(stockServicesEntity.getItem_Name());
			stockServicesEntity1.setCategories(stockServicesEntity.getCategories());
			stockServicesEntity1.setQty(stockServicesEntity.getQty());
			stockServicesEntity1.setPrice(stockServicesEntity.getPrice());
			stockServicesEntity1.setNotes(stockServicesEntity.getNotes());
			mybean.setToken("U");
		}
        
			try {
				em=EMF.get().createEntityManager();
				
				em.persist(stockServicesEntity1);
			}
			catch (Exception e) 
			{
				e.printStackTrace();
			}
			finally
			{
				em.close();
			}
          
        
      
	       
      
        mybean.setMyData("Records added successfully.."+stockServicesEntity.getItem_Name());

			return mybean;
		
	}//end of addStockServices

	
	@ApiMethod(name = "getAllStockServices")
	public List<StockServicesEntity> getAllStockServices()  
	{

		List<StockServicesEntity> stockServicesEntity = new ArrayList<StockServicesEntity>();
		EntityManager em = null;

		
		try {
			em = EMF.get().createEntityManager();

			Query q = em.createQuery("select p from StockServicesEntity p");
			stockServicesEntity = q.getResultList();
		

		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		finally {
			em.close();
		}
		return stockServicesEntity;
	}//end of getAllStockServices
	
	
	
}//end of StockServices
