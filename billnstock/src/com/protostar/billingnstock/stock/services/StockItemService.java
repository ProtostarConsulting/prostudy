package com.protostar.billingnstock.stock.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.stock.entities.StockServiceEntity;
import com.protostar.billnstock.until.data.EMF;
import com.protostar.billnstock.until.data.ServerMsg;


@Api(name = "stockServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class StockItemService
{


	@ApiMethod(name="addStockService")
	public ServerMsg  addStockService(StockServiceEntity stockServicesEntity)
	{
		System.out.println("stockServicesEntity:" + stockServicesEntity);
		ServerMsg msgBean=new ServerMsg();
		
		StockServiceEntity stockServicesEntity2=new StockServiceEntity();
		
		if(stockServicesEntity.getId()!=null)
		{
			stockServicesEntity2.setId(stockServicesEntity.getId());
		}
		
		stockServicesEntity2.setItem_Name(stockServicesEntity.getItem_Name());
		stockServicesEntity2.setCategory(stockServicesEntity.getCategory());
		stockServicesEntity2.setItem_Id(stockServicesEntity.getItem_Id());
		stockServicesEntity2.setQty(stockServicesEntity.getQty());
		stockServicesEntity2.setPrice(stockServicesEntity.getPrice());
		stockServicesEntity2.setNotes(stockServicesEntity.getNotes());
		
	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(stockServicesEntity);
			msgBean.setMsg("Stock Records Added successfully"+" "+stockServicesEntity.getItem_Name());
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
		
	}//end of addTaxServices
	
	@SuppressWarnings("unchecked")
	@ApiMethod(name="getAllStockService")
	public List<StockServiceEntity> getAllStockService()
	{
		System.out.println("In side getAllStockServices " );
		List<StockServiceEntity> stockList= new ArrayList<StockServiceEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select c from StockServicesEntity c");
			stockList=q.getResultList();
			System.out.println("Got AllTaxList: " + stockList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return stockList;
		
	}//end of getAllStockServices

}//end of StockServices
