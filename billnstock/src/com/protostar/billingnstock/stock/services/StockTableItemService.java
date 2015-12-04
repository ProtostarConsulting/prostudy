package com.protostar.billingnstock.stock.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.protostar.billingnstock.stock.entities.StockTableItemEntity;
import com.protostar.billnstock.until.data.EMF;
import com.protostar.billnstock.until.data.ServerMsg;


@Api(name = "addItemInBillServices", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.billingnstock.stock.services", ownerName = "com.protostar.billingnstock.stock.services", packagePath = ""))
public class StockTableItemService
{


	@ApiMethod(name="addItemInBill")
	public ServerMsg  addItemInBill(StockTableItemEntity stockTableItemEntity)
	{
		System.out.println("stockTableItemEntity:" + stockTableItemEntity);
		ServerMsg msgBean=new ServerMsg();
		
		StockTableItemEntity stockItemEntity2=new StockTableItemEntity();
		
		if(stockTableItemEntity.getBill_No()!=null)
		{
			stockItemEntity2.setBill_No(stockTableItemEntity.getBill_No());
		}
		stockItemEntity2.setSr_No(stockTableItemEntity.getSr_No());
		stockItemEntity2.setItem_Name(stockTableItemEntity.getItem_Name());
		stockItemEntity2.setQty(stockTableItemEntity.getQty());
		stockItemEntity2.setRate(stockTableItemEntity.getRate());
		stockItemEntity2.setDiscount(stockTableItemEntity.getDiscount());
		
	EntityManager em=null;
		
		try {
			em=EMF.get().createEntityManager();
			em.persist(stockTableItemEntity);
			msgBean.setMsg("Item Added in Bill successfully"+" "+stockTableItemEntity.getItem_Name());
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
	@ApiMethod(name="getItemBills")
	public List<StockTableItemEntity> getItemBills()
	{
		System.out.println("In side getAllStockServices " );
		List<StockTableItemEntity> billList= new ArrayList<StockTableItemEntity>();
		EntityManager em= null;
		try 
		{
			
			em = EMF.get().createEntityManager();
			
			Query q= em.createQuery("select s from StockTableItemEntity s");
			billList=q.getResultList();
			System.out.println("Got Bill Items: " + billList.size() );
			
		} catch (Exception e) 
	
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			em.close();
		}
		
		return billList;
		
	}//end of getAllStockServices

}//end of StockServices
