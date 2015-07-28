package com.protostar.billingnstock.stock.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.data.EMF;
import com.protostar.billingnstock.data.MyBean;
import com.protostar.billingnstock.data.TaxEntity;
import com.protostar.billingnstock.stock.entities.StockServicesEntity;
import com.protostar.until.data.ServerMsg;


@Api(name = "stockServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class StockServices
{


	@ApiMethod(name="addStockServices")
	public ServerMsg  addStockServices(StockServicesEntity stockServicesEntity)
	{
		System.out.println("stockServicesEntity:" + stockServicesEntity);
		ServerMsg msgBean=new ServerMsg();
		
		
		
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
	@ApiMethod(name="getAllStockServices")
	public List<StockServicesEntity> getAllStockServices()
	{
		System.out.println("In side getAllStockServices " );
		List<StockServicesEntity> stockList= new ArrayList<StockServicesEntity>();
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
