package com.protostar.billingnstock.stock.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.stock.entities.StockItemEntity;
import com.protostar.billnstock.until.data.EMF;
import com.protostar.billnstock.until.data.ServerMsg;


@Api(name = "stockServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class StockItemService
{


	@ApiMethod(name="addStock")
	public ServerMsg  addStock(StockItemEntity stockItemEntity)
	{
		System.out.println("stockItemEntity:" + stockItemEntity);
		ServerMsg msgBean=new ServerMsg();
		
		StockItemEntity stockItemEntity2=new StockItemEntity();
		
		if(stockItemEntity.getId()!=null)
		{
			stockItemEntity2.setId(stockItemEntity.getId());
		}
		
		stockItemEntity2.setItem_Name(stockItemEntity.getItem_Name());
		stockItemEntity2.setCategory(stockItemEntity.getCategory());
		stockItemEntity2.setItem_Id(stockItemEntity.getItem_Id());
		stockItemEntity2.setQty(stockItemEntity.getQty());
		stockItemEntity2.setPrice(stockItemEntity.getPrice());
		stockItemEntity2.setThreshold_value(stockItemEntity.getThreshold_value());
		stockItemEntity2.setNotes(stockItemEntity.getNotes());
		
	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(stockItemEntity);
			msgBean.setMsg("Stock Records Added successfully"+" "+stockItemEntity.getItem_Name());
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
	@ApiMethod(name="getAllStock")
	public List<StockItemEntity> getAllStock()
	{
		System.out.println("In side getAllStock " );
		List<StockItemEntity> stockList= new ArrayList<StockItemEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select s from StockItemEntity s");
			stockList=q.getResultList();
			System.out.println("Got AllList: " + stockList.size() );
			
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
	
/*	@SuppressWarnings("unchecked")
	@ApiMethod(name="reportByThreshold")
	public List<StockItemEntity> reportByThreshold()
	{
		System.out.println("In side reportByThreshold " );
		List<StockItemEntity> stockList= new ArrayList<StockItemEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select s from StockItemEntity where threshold = totalstock ");
			stockList=q.getResultList();
			System.out.println("Got AllList: " + stockList.size() );
			
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
*/}//end of StockServices
